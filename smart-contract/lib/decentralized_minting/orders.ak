use aiken/transaction/credential.{Address}

// OrderDatum now consists of owner_key_hash (to close order), 
// requested_handle (handle name - any string)
// and destination_address (for now it is address)
// is_legacy (handle is legacy or not)
// is_virtual (handle is virtual or not)
//
// TODO:
// In order datum, will have info for what kinda handle they mint (subhandle, root handle, ...)
// Using this information, validator can calculate handle's price

pub type OrderDatum {
  // the verification key hash of the wallet that 
  // placed the order that is used for cancelling the order
  owner_key_hash: ByteArray,
  // without asset name label
  requested_handle: ByteArray,
  // the payment credential in the address that the Handle should be sent to
  destination_address: Address,
  // whether order for legacy handle or not (1: legacy handle, 0: new handle)
  is_legacy: Int,
  // whether order for virtual sub handle or not (1: virtual, 0: not)
  is_virtual: Int,
}
