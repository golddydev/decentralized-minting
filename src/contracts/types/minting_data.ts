import { MPTProof } from "./mpt.js";

interface MintingData {
  mpt_root_hash: string;
}

type Proof = {
  mpt_proof: MPTProof;
  // root handle settings index in reference inputs
  // this will be -1 when handle is not sub handle
  root_handle_settings_index: bigint;
};

export type { MintingData, Proof };
