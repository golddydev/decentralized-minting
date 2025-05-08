import { TxOutputDatum } from "@helios-lang/ledger";
import {
  expectConstrData,
  expectIntData,
  expectListData,
  makeConstrData,
  makeIntData,
  makeListData,
  UplcData,
} from "@helios-lang/uplc";

import { invariant } from "../../helpers/index.js";

type HandlePriceData = bigint[];

type HandlePriceInfo = {
  current_data: HandlePriceData;
  prev_data: HandlePriceData;
  updated_at: bigint;
};

// this is human readable handle prices
// in ada
type HandlePrices = {
  basic: number;
  common: number;
  rare: number;
  ultraRare: number;
};

const buildHandlePriceInfoData = (
  handlePriceInfo: HandlePriceInfo
): UplcData => {
  const { current_data, prev_data, updated_at } = handlePriceInfo;
  return makeConstrData(0, [
    buildHandlePriceData(current_data),
    buildHandlePriceData(prev_data),
    makeIntData(updated_at),
  ]);
};

const buildHandlePriceData = (handlePriceData: HandlePriceData): UplcData => {
  invariant(
    handlePriceData.length == 4,
    "Handle Price Data must be 4, ultraRare, rare, common, basic"
  );

  return makeListData(handlePriceData.map(makeIntData));
};

const decodeHandlePriceInfoDatum = (
  datum: TxOutputDatum | undefined
): HandlePriceInfo => {
  invariant(
    datum?.kind == "InlineTxOutputDatum",
    "Minting Data Datum must be inline datum"
  );
  const datumData = datum.data;
  const handlePriceInfoConstrData = expectConstrData(datumData, 0, 3);

  const current_data = expectListData(
    handlePriceInfoConstrData.fields[0],
    "handle price info current data must be List"
  ).items.map((item) => expectIntData(item).value);

  const prev_data = expectListData(
    handlePriceInfoConstrData.fields[1],
    "handle price info prev data must be List"
  ).items.map((item) => expectIntData(item).value);

  const updated_at = expectIntData(
    handlePriceInfoConstrData.fields[2],
    "handle price info updated_at must be Int"
  ).value;

  return { current_data, prev_data, updated_at };
};

const convertHandlePricesToHandlePriceData = (
  handlePrices: HandlePrices
): HandlePriceData => {
  return [
    BigInt(handlePrices.ultraRare * 1_000_000),
    BigInt(handlePrices.rare * 1_000_000),
    BigInt(handlePrices.common * 1_000_000),
    BigInt(handlePrices.basic * 1_000_000),
  ];
};

const convertHandlePriceDataToHandlePrices = (
  handlePriceData: HandlePriceData
): HandlePrices => {
  return {
    basic: Number(handlePriceData[0]) / 1_000_000,
    common: Number(handlePriceData[1]) / 1_000_000,
    rare: Number(handlePriceData[2]) / 1_000_000,
    ultraRare: Number(handlePriceData[3]) / 1_000_000,
  };
};

export {
  buildHandlePriceData,
  buildHandlePriceInfoData,
  convertHandlePriceDataToHandlePrices,
  convertHandlePricesToHandlePriceData,
  decodeHandlePriceInfoDatum,
};
export type { HandlePriceInfo };
