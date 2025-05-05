use aiken/list
use aiken/transaction/value.{PolicyId, Value}
use decentralized_minting/orders.{OrderDatum}

pub fn is_order_fulfilled(
  datum: OrderDatum,
  minted_value: Value,
  new_policy_id: PolicyId,
  legacy_policy_id: PolicyId,
) -> Bool {
  let OrderDatum { is_legacy, .. } = datum
  when is_legacy is {
    1 ->
      value.policies(minted_value)
        |> list.has(legacy_policy_id)
    0 ->
      value.policies(minted_value)
        |> list.has(new_policy_id)
    _ -> fail @"invalid is_legacy"
  }
}
