use aiken/builtin
use aiken/bytearray

// parse handle name
// get root handle name and is sub handle and sub handle name
// sub handle name is empty when it is not sub handle
pub fn parse_handle_name(handle_name: ByteArray) -> (ByteArray, Bool, ByteArray) {
  when index_of_at_symbol(handle_name) is {
    Some(idx) -> {
      // if handle_name contains @ symbol, it is a sub handle
      let root_handle_name = bytearray.drop(handle_name, idx + 1)
      // root_handle_name should not contain @ symbol
      expect index_of_at_symbol(root_handle_name) == None
      // sub handle name is [0, idx)
      let sub_handle_name = bytearray.take(handle_name, idx)
      (root_handle_name, True, sub_handle_name)
    }
    None -> (#"", False, #"")
  }
}

fn index_of_at_symbol(handle_name: ByteArray) -> Option<Int> {
  let length = bytearray.length(handle_name)
  do_index_of_at_symbol(handle_name, 0, length)
}

fn do_index_of_at_symbol(
  handle_name: ByteArray,
  idx: Int,
  length: Int,
) -> Option<Int> {
  if idx >= length {
    None
  } else {
    if builtin.index_bytearray(handle_name, idx) == 0x40 {
      Some(idx)
    } else {
      do_index_of_at_symbol(handle_name, idx + 1, length)
    }
  }
}
