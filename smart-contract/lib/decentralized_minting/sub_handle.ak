use aiken/bytearray
use aiken/list
use aiken/transaction.{InlineDatum, Input, Output}
use aiken/transaction/credential.{Address}
use aiken/transaction/value.{PolicyId}
use common/address.{convert_address_from_bytearray}
use common/cip68.{prefix_001}

const main_sub_handle_settings_policy_id =
  #"f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"

// sh_settings
// hold main sub handle settings
//
const main_sub_handle_settings_asset_name = #"000de14073685f73657474696e6773"

// struct MainSubHandleSettings { 
//     valid_contracts: []ByteArray
//     admin_creds: []ByteArray
//     virtual_price: Int
//     base_price: Int
//     buy_down_prices: [][]Int
//     payment_address: ByteArray
//     expiry_duration: Int
//     renewal_window: Int
// }
pub type DumbMainSubHandleSettings =
  (Data, Data, Data, Data, Data, Data, Data, Data)

// struct SubHandleSettings {
//     public_minting_enabled: Int
//     pz_enabled: Int
//     tier_pricing: [][]Int
//     default_styles: Data
//     save_original_address: Int
// }
pub type SubHandleSettings =
  (Int, Int, List<(Int, Int)>, Data, Int)

// struct OwnerSettings {
//     nft: SubHandleSettings
//     virtual: SubHandleSettings
//     buy_down_price: Int
//     buy_down_paid: Int
//     buy_down_percent: Int
//     agreed_terms: Data
//     migrate_sig_required: Int
//     payment_address: ByteArray
// }
pub type DumbOwnerSettings =
  (Data, Data, Data, Data, Data, Data, Data, Data)

pub type OwnerSettings =
  (SubHandleSettings, SubHandleSettings, Int, Int, Int, Data, Int, ByteArray)

pub fn get_dumb_main_sub_handle_settings(
  reference_inputs: List<Input>,
  main_sub_handle_settings_index: Int,
) -> DumbMainSubHandleSettings {
  expect Some(main_sub_handle_settings_input) =
    list.at(reference_inputs, main_sub_handle_settings_index)
  let Input { output: main_sub_handle_settings_output, .. } =
    main_sub_handle_settings_input
  let Output { value: output_value, datum, .. } =
    main_sub_handle_settings_output

  // check input has main sub handle settings asset
  expect
    value.quantity_of(
      output_value,
      main_sub_handle_settings_policy_id,
      main_sub_handle_settings_asset_name,
    ) == 1
  expect InlineDatum(inline_datum) = datum
  expect dumb_main_sub_handle_settings: DumbMainSubHandleSettings = inline_datum
  dumb_main_sub_handle_settings
}

// This functions returns
// base minter_fee when mint sub handles
// (nft_sub_handle_minter_fee, virtual_sub_handle_minter_fee)
pub fn get_main_sub_handle_minter_fees(
  dumb_main_sub_handle_settings: DumbMainSubHandleSettings,
) -> (Int, Int) {
  let (_, _, dumb_virtual_minter_fee, dumb_nft_minter_fee, _, _, _, _) =
    dumb_main_sub_handle_settings
  expect nft_sub_handle_minter_fee: Int = dumb_nft_minter_fee
  expect virtual_sub_handle_minter_fee: Int = dumb_virtual_minter_fee
  (nft_sub_handle_minter_fee, virtual_sub_handle_minter_fee)
}

pub fn get_dumb_root_handle_settings(
  reference_inputs: List<Input>,
  root_handle_settings_index: Int,
  root_handle_name: ByteArray,
  new_policy_id: PolicyId,
  legacy_policy_id: PolicyId,
) -> DumbOwnerSettings {
  expect Some(reference_input) =
    list.at(reference_inputs, root_handle_settings_index)

  // check if reference input has root handle 001 NFT
  // root handle settings asset can be
  // either new policy id or legacy policy id
  // but must be only one
  let settings_asset_name = bytearray.concat(prefix_001, root_handle_name)
  let Input { output: Output { value: v, .. }, .. } = reference_input
  let quantity_if_new = value.quantity_of(v, new_policy_id, settings_asset_name)
  let quantity_if_legacy =
    value.quantity_of(v, legacy_policy_id, settings_asset_name)
  let root_handle_settings_asset_quantity = quantity_if_new + quantity_if_legacy
  expect root_handle_settings_asset_quantity == 1

  // parse datum
  expect InlineDatum(inline_datum) = reference_input.output.datum
  expect dumb_owner_settings: DumbOwnerSettings = inline_datum
  dumb_owner_settings
}

// get sub handle settings from owner settings
// and get payment_address (converted from hex bytes)
//
pub fn get_sub_handle_settings_and_payment_address(
  dumb_root_handle_settings: DumbOwnerSettings,
  is_virtual: Bool,
) -> (SubHandleSettings, Address) {
  let (
    dumb_nft_sub_handle_settings,
    dumb_virtual_sub_handle_settings,
    _,
    _,
    _,
    _,
    _,
    dumb_hex_payment_address,
  ) = dumb_root_handle_settings
  expect hex_payment_address: ByteArray = dumb_hex_payment_address

  if is_virtual {
    expect virtual_sub_handle_settings: SubHandleSettings =
      dumb_virtual_sub_handle_settings
    (
      virtual_sub_handle_settings,
      convert_address_from_bytearray(hex_payment_address),
    )
  } else {
    expect nft_sub_handle_settings: SubHandleSettings =
      dumb_nft_sub_handle_settings
    (
      nft_sub_handle_settings,
      convert_address_from_bytearray(hex_payment_address),
    )
  }
}

//
// this function returns sub handle price
// from tier_pricing
//
pub fn get_sub_handle_price(
  sub_handle_settings: SubHandleSettings,
  sub_handle_length: Int,
) -> Int {
  let (_, _, tier_pricing, _, _) = sub_handle_settings
  get_sub_handle_price_from_tier_pricing(tier_pricing, sub_handle_length)
}

pub fn get_sub_handle_price_from_tier_pricing(
  tier_pricing: List<(Int, Int)>,
  sub_handle_length: Int,
) -> Int {
  let sub_handle_price =
    do_get_sub_handle_price_from_tier_pricing(
      tier_pricing,
      sub_handle_length,
      0,
    )
  expect sub_handle_price > 0
  sub_handle_price
}

fn do_get_sub_handle_price_from_tier_pricing(
  tier_pricing: List<(Int, Int)>,
  sub_handle_length: Int,
  prev_tier_price: Int,
) -> Int {
  when tier_pricing is {
    [] -> prev_tier_price
    [pricing, ..rest] -> {
      let (length, price) = pricing
      if sub_handle_length < length {
        prev_tier_price
      } else {
        do_get_sub_handle_price_from_tier_pricing(
          rest,
          sub_handle_length,
          price,
        )
      }
    }
  }
}
