use aiken/transaction/credential.{Address, Inline, VerificationKeyCredential}
use common/address.{convert_address_from_bytearray}

test addr_1() {
  let addr_hex =
    #"0194c9a441cf18dc13672799404c4ade1472f33a5a46f31264e827b78efcece68581bca44047e1e231b2d3ddb3ddbfad7dfc63b4701f3f0d67"
  convert_address_from_bytearray(addr_hex) == Address {
    payment_credential: VerificationKeyCredential(
      #"94c9a441cf18dc13672799404c4ade1472f33a5a46f31264e827b78e",
    ),
    stake_credential: Some(
      Inline(
        VerificationKeyCredential(
          #"fcece68581bca44047e1e231b2d3ddb3ddbfad7dfc63b4701f3f0d67",
        ),
      ),
    ),
  }
}
