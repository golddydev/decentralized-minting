use aiken/bytearray
use aiken/math
use aiken/merkle_patricia_forestry as mpt
use aiken/transaction.{InlineDatum, Input, Output}
use aiken/transaction/credential.{Address, ScriptCredential}
use aiken/transaction/value.{PolicyId, Value}
use common/cip68.{prefix_000, prefix_100, prefix_222}
use common/handle.{parse_handle_name}
use common/hashes.{ScriptHash}
use common/utils.{parse_bool_from_int}
use decentralized_minting/handle_price.{HandlePriceInfo, get_handle_price}
use decentralized_minting/orders.{OrderDatum}
use decentralized_minting/settings_v1.{min_treasury_fee}
use decentralized_minting/sub_handle.{
  DumbOwnerSettings, get_dumb_root_handle_settings, get_sub_handle_price,
  get_sub_handle_settings_and_payment_address,
}
use validations/minting_data/types.{Proof}

const max_handle_length = 15

const max_sub_handle_length = 28

// This function also check handle_name is valid or not
pub fn all_orders_are_satisfied(
  order_script_hash: ScriptHash,
  inputs: List<Input>,
  outputs: List<Output>,
  reference_inputs: List<Input>,
  new_policy_id: PolicyId,
  legacy_policy_id: PolicyId,
  pz_script_address: Address,
  handle_price_info: HandlePriceInfo,
  nft_sub_handle_minter_fee: Int,
  virtual_sub_handle_minter_fee: Int,
  proofs: List<Proof>,
  root: mpt.MerklePatriciaForestry,
  expected_mint_value: Value,
  total_handles_price: Int,
  total_sub_handle_minter_fee: Int,
  continuation: fn(mpt.MerklePatriciaForestry, Value, Int, Int) -> result,
) -> result {
  // go through inputs and process order UTxO
  when inputs is {
    [] ->
      continuation(
        root,
        expected_mint_value,
        total_handles_price,
        total_sub_handle_minter_fee,
      )
    [order_input, ..rest_inputs] -> {
      let Output { address, datum, value: order_value, .. } = order_input.output
      let is_order = is_order_script_address(address, order_script_hash)
      when is_order is {
        True -> {
          // parse order datum
          expect InlineDatum(datum) = datum
          expect datum: OrderDatum = datum
          let OrderDatum {
            requested_handle,
            destination_address,
            is_legacy,
            is_virtual,
            ..
          } = datum

          let is_legacy_bool = parse_bool_from_int(is_legacy)
          let is_virtual_bool = parse_bool_from_int(is_virtual)

          // get minting policy id (new or legacy)
          let minting_handle_policy_id =
            get_minting_handle_policy_id(
              is_legacy_bool,
              new_policy_id,
              legacy_policy_id,
            )

          // parse proofs
          expect [proof, ..rest_proofs] = proofs
          let Proof { mpt_proof, root_handle_settings_index } = proof

          // check handle validity and get price
          // and root handle payment address 
          // if sub handle
          let (is_sub_handle, price, root_handle_payment_address_opt) =
            check_handle_validity_and_get_price(
              requested_handle,
              is_virtual_bool,
              handle_price_info,
              fn(root_handle_name) -> DumbOwnerSettings {
                get_dumb_root_handle_settings(
                  reference_inputs,
                  root_handle_settings_index,
                  root_handle_name,
                  new_policy_id,
                  legacy_policy_id,
                )
              },
            )

          // check order is enough for price
          let order_is_enough = value.lovelace_of(order_value) >= price
          expect order_is_enough

          // extract ref & user output (or virtual output)
          // check minted assets are correctly sent to correct address
          // and returns rest_outputs to continue processing
          let rest_outputs: List<Output> =
            check_ref_and_user_and_virtual_and_root_handle_payment_outputs(
              outputs,
              minting_handle_policy_id,
              requested_handle,
              price,
              is_sub_handle,
              is_virtual_bool,
              pz_script_address,
              destination_address,
              root_handle_payment_address_opt,
            )

          // update root
          // NOTE:
          // for now we assume that all order is for minting (not burning)
          let new_root = update_root(root, requested_handle, 1, mpt_proof)

          let new_mint_value =
            update_mint_value(
              expected_mint_value,
              minting_handle_policy_id,
              requested_handle,
              is_virtual_bool,
              1,
            )

          // update total handle price
          // only add up handle prices (not sub handle)
          let new_total_handles_price =
            if is_sub_handle {
              total_handles_price
            } else {
              total_handles_price + price
            }

          // update total sub handle minter fee
          let new_total_sub_handle_minter_fee =
            if is_sub_handle {
              let sub_handle_minter_fee =
                if is_virtual_bool {
                  virtual_sub_handle_minter_fee
                } else {
                  nft_sub_handle_minter_fee
                }
              total_sub_handle_minter_fee + sub_handle_minter_fee
            } else {
              total_sub_handle_minter_fee
            }

          all_orders_are_satisfied(
            order_script_hash,
            rest_inputs,
            rest_outputs,
            reference_inputs,
            new_policy_id,
            legacy_policy_id,
            pz_script_address,
            handle_price_info,
            nft_sub_handle_minter_fee,
            virtual_sub_handle_minter_fee,
            rest_proofs,
            new_root,
            new_mint_value,
            new_total_handles_price,
            new_total_sub_handle_minter_fee,
            continuation,
          )
        }

        False ->
          all_orders_are_satisfied(
            order_script_hash,
            rest_inputs,
            outputs,
            reference_inputs,
            new_policy_id,
            legacy_policy_id,
            pz_script_address,
            handle_price_info,
            nft_sub_handle_minter_fee,
            virtual_sub_handle_minter_fee,
            proofs,
            root,
            expected_mint_value,
            total_handles_price,
            total_sub_handle_minter_fee,
            continuation,
          )
      }
    }
  }
}

fn is_order_script_address(
  address: Address,
  order_script_hash: ScriptHash,
) -> Bool {
  when address.payment_credential is {
    ScriptCredential(sc) -> sc == order_script_hash
    _ -> False
  }
}

fn get_minting_handle_policy_id(
  is_legacy_handle: Bool,
  new_policy_id: PolicyId,
  legacy_policy_id: PolicyId,
) -> PolicyId {
  when is_legacy_handle is {
    True -> legacy_policy_id
    False -> new_policy_id
  }
}

// This function checks if handle is valid or not
// returns is_sub_handle
// and the price of the handle or sub handle
// and root_handle_payment_address if is_sub_handle
//
pub fn check_handle_validity_and_get_price(
  handle_name: ByteArray,
  is_virtual: Bool,
  handle_price_info: HandlePriceInfo,
  get_owner_settings: fn(ByteArray) -> DumbOwnerSettings,
) -> (Bool, Int, Option<Address>) {
  // parse handle name
  // get root handle name and is sub handle
  let (root_handle_name, is_sub_handle, sub_handle_name) =
    parse_handle_name(handle_name)
  let handle_length = bytearray.length(handle_name)
  let root_handle_length = bytearray.length(root_handle_name)
  let sub_handle_length = bytearray.length(sub_handle_name)

  if is_sub_handle {
    expect handle_length <= max_sub_handle_length
    expect root_handle_length <= max_handle_length
    expect root_handle_length > 0
    expect sub_handle_length > 0

    // get owner settings (root handle settings)
    let dumb_root_handle_settings = get_owner_settings(root_handle_name)

    // get sub handle settings
    // and payment address
    let (sub_handle_settings, root_handle_payment_address) =
      get_sub_handle_settings_and_payment_address(
        dumb_root_handle_settings,
        is_virtual,
      )

    // get sub handle price
    let sub_handle_price =
      get_sub_handle_price(sub_handle_settings, sub_handle_length)

    (True, sub_handle_price, Some(root_handle_payment_address))
  } else {
    expect handle_length <= max_handle_length
    expect handle_length > 0

    // if not sub handle, it should not be virtual
    expect !is_virtual

    let (current_price, prev_price) =
      get_handle_price(handle_price_info, handle_length)
    let handle_price = math.min(current_price, prev_price)
    (False, handle_price, None)
  }
}

fn update_root(
  root: mpt.MerklePatriciaForestry,
  handle_name: ByteArray,
  amount: Int,
  mpt_proof: mpt.Proof,
) -> mpt.MerklePatriciaForestry {
  when amount is {
    1 ->
      // mint
      mpt.insert(root, handle_name, #"", mpt_proof)
    -1 ->
      // burn
      mpt.delete(root, handle_name, #"", mpt_proof)
    _ -> fail @"INVALID_AMOUNT"
  }
}

fn check_ref_and_user_and_virtual_and_root_handle_payment_outputs(
  outputs: List<Output>,
  minting_handle_policy_id: PolicyId,
  requested_handle: ByteArray,
  price: Int,
  is_sub_handle: Bool,
  is_virtual: Bool,
  pz_script_address: Address,
  destination_address: Address,
  root_handle_payment_address_opt: Option<Address>,
) -> List<Output> {
  // make ref asset name and user asset name from requested_handle
  let ref_asset_name = bytearray.concat(prefix_100, requested_handle)
  let user_asset_name = bytearray.concat(prefix_222, requested_handle)
  let virtual_asset_name = bytearray.concat(prefix_000, requested_handle)

  // check ref and user and virtual outputs
  let rest_outputs: List<Output> =
    when is_virtual is {
      True -> {
        expect [virtual_output, ..rest_outputs] = outputs
        let Output {
          address: virtual_output_address,
          value: virtual_output_value,
          reference_script: virtual_output_reference_script,
          ..
        } = virtual_output

        // check virtual output
        expect virtual_output_address == pz_script_address
        let expected_virtual_value =
          value.zero()
            |> value.add(minting_handle_policy_id, virtual_asset_name, 1)
        expect
          value.without_lovelace(virtual_output_value) == expected_virtual_value
        // virtual asset's datum is set by minter
        expect virtual_output_reference_script == None

        rest_outputs
      }
      False -> {
        expect [ref_output, user_output, ..rest_outputs] = outputs
        let Output {
          address: ref_output_address,
          value: ref_output_value,
          reference_script: ref_output_reference_script,
          ..
        } = ref_output
        let Output {
          address: user_output_address,
          value: user_output_value,
          ..
        } = user_output

        // check ref output
        expect ref_output_address == pz_script_address
        let expected_ref_value =
          value.zero()
            |> value.add(minting_handle_policy_id, ref_asset_name, 1)
        expect value.without_lovelace(ref_output_value) == expected_ref_value
        // ref asset's datum is set by minter
        expect ref_output_reference_script == None

        // check user output
        expect user_output_address == destination_address
        // user output value = min_lovelace + minted handle (user)
        let user_output_value_has_handle =
          value.quantity_of(
            user_output_value,
            minting_handle_policy_id,
            user_asset_name,
          ) == 1
        expect user_output_value_has_handle

        rest_outputs
      }
    }

  // check root handle payment address payout
  // if sub handle
  if is_sub_handle {
    // parse rest outputs again
    expect [root_handle_payment_output, ..rest_outputs_after] = rest_outputs

    // parse root handle payment address option
    expect Some(payment_address) = root_handle_payment_address_opt

    // check root handle payment output
    let Output {
      address: root_handle_payment_output_address,
      value: root_handle_payment_output_value,
      ..
    } = root_handle_payment_output
    expect root_handle_payment_output_address == payment_address
    let is_root_handle_payment_enough =
      value.lovelace_of(root_handle_payment_output_value) >= price
    expect is_root_handle_payment_enough

    rest_outputs_after
  } else {
    rest_outputs
  }
}

fn update_mint_value(
  mint_value: Value,
  minting_policy_id: PolicyId,
  handle_name: ByteArray,
  is_virtual: Bool,
  amount: Int,
) -> Value {
  if is_virtual {
    mint_value
      |> value.add(
          minting_policy_id,
          bytearray.concat(prefix_000, handle_name),
          amount,
        )
  } else {
    mint_value
      |> value.add(
          minting_policy_id,
          bytearray.concat(prefix_100, handle_name),
          amount,
        )
      |> value.add(
          minting_policy_id,
          bytearray.concat(prefix_222, handle_name),
          amount,
        )
  }
}

pub fn calculate_treasury_fee_and_minter_fee(
  total_handles_price: Int,
  treasury_fee_percentage: Int,
) -> (Int, Int) {
  expect treasury_fee_percentage >= 0
  expect treasury_fee_percentage <= 100

  let treasury_fee =
    math.max(
      total_handles_price * treasury_fee_percentage / 100,
      min_treasury_fee,
    )
  let minter_fee = math.max(total_handles_price - treasury_fee, 0)
  (treasury_fee, minter_fee)
}
