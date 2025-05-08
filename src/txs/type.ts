import { ShelleyAddress } from "@helios-lang/ledger";

interface Handle {
  // without asset name label
  hexName: string;
  utf8Name: string;
  destinationAddress: ShelleyAddress;
  isLegacy: boolean;
  isVirtual: boolean;
  // price in lovelace
  price: bigint;
}

export type { Handle };
