import { TxOutputDatum } from "@helios-lang/ledger";
import { NetworkName } from "@helios-lang/tx-utils";
import {
  expectByteArrayData,
  expectConstrData,
  expectIntData,
  makeByteArrayData,
  makeConstrData,
  makeIntData,
  UplcData,
} from "@helios-lang/uplc";

import { invariant } from "../../helpers/index.js";
import { OrderDatum } from "../types/index.js";
import { buildAddressData, decodeAddressFromData } from "./common.js";

const decodeOrderDatum = (
  datum: TxOutputDatum | undefined,
  network: NetworkName
): OrderDatum => {
  invariant(
    datum?.kind == "InlineTxOutputDatum",
    "OrderDatum must be inline datum"
  );
  const datumData = datum.data;
  const orderConstrData = expectConstrData(datumData, 0, 5);

  const owner_key_hash = expectByteArrayData(orderConstrData.fields[0]).toHex();
  const requested_handle = expectByteArrayData(
    orderConstrData.fields[1]
  ).toHex();
  const destination_address = decodeAddressFromData(
    orderConstrData.fields[2],
    network
  );

  const is_legacy = expectIntData(orderConstrData.fields[3]).value;
  const is_virtual = expectIntData(orderConstrData.fields[4]).value;

  return {
    owner_key_hash,
    requested_handle,
    destination_address,
    is_legacy,
    is_virtual,
  };
};

const buildOrderData = (order: OrderDatum): UplcData => {
  const { owner_key_hash, destination_address, requested_handle } = order;
  return makeConstrData(0, [
    makeByteArrayData(owner_key_hash),
    makeByteArrayData(requested_handle),
    buildAddressData(destination_address),
    makeIntData(order.is_legacy),
    makeIntData(order.is_virtual),
  ]);
};

const buildOrderExecuteRedeemer = (): UplcData => {
  return makeConstrData(0, []);
};

const buildOrderCancelRedeemer = (): UplcData => {
  return makeConstrData(1, []);
};

export {
  buildOrderCancelRedeemer,
  buildOrderData,
  buildOrderExecuteRedeemer,
  decodeOrderDatum,
};
