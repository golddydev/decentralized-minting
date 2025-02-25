import { UplcData } from "@helios-lang/uplc";

interface Settings {
  mint_governor: string; // withdrawl script hash
  mint_version: bigint;
  data: UplcData; // settings v1 data
}

export type { Settings };
