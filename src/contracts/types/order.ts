import { ShelleyAddress } from "@helios-lang/ledger";

interface OrderDatum {
  owner_key_hash: string;
  requested_handle: string; // hex string without asset label
  destination_address: ShelleyAddress;
  is_legacy: bigint;
  is_virtual: bigint;
}

export type { OrderDatum };
