use aiken/list
use aiken/transaction.{ScriptContext, Spend, Transaction}
use aiken/transaction/value.{PolicyId}
use decentralized_minting/orders.{OrderDatum}
use validations/orders/validation.{is_order_fulfilled}

type OrderRedeemer {
  Execute
  Cancel
}

validator(new_policy_id: PolicyId, legacy_policy_id: PolicyId) {
  fn spend(
    datum: OrderDatum,
    redeemer: OrderRedeemer,
    ctx: ScriptContext,
  ) -> Bool {
    let ScriptContext(Transaction { extra_signatories, mint, .. }, purpose) =
      ctx
    expect Spend(_) = purpose

    when redeemer is {
      Execute -> {
        let fulfilled =
          is_order_fulfilled(
            datum,
            value.from_minted_value(mint),
            new_policy_id,
            legacy_policy_id,
          )
        expect fulfilled
        True
      }
      Cancel -> {
        expect list.has(extra_signatories, datum.owner_key_hash)
        True
      }
    }
  }
}
