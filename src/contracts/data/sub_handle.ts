import { TxOutputDatum } from "@helios-lang/ledger";
import {
  expectByteArrayData,
  expectIntData,
  expectListData,
} from "@helios-lang/uplc";

import { invariant } from "../../helpers/index.js";
import { MainSubHandleSettings } from "../types/index.js";

const decodeMainSubHandleSettings = (
  datum: TxOutputDatum | undefined
): MainSubHandleSettings => {
  invariant(
    datum?.kind == "InlineTxOutputDatum",
    "OrderDatum must be inline datum"
  );
  const datumData = datum.data;
  const listData = expectListData(
    datumData,
    "Main Sub Handle Settings Datum must be List"
  );

  const valid_contracts = expectListData(listData.items[0]).items.map((item) =>
    expectByteArrayData(item).toHex()
  );
  const admin_creds = expectListData(listData.items[1]).items.map((item) =>
    expectByteArrayData(item).toHex()
  );
  const virtual_price = expectIntData(listData.items[2]).value;
  const base_price = expectIntData(listData.items[3]).value;
  const buy_down_prices = expectListData(listData.items[4]).items.map((item) =>
    expectListData(item).items.map((item) => expectIntData(item).value)
  );
  const payment_address = expectByteArrayData(listData.items[5]).toHex();
  const expiry_duration = expectIntData(listData.items[6]).value;
  const renewal_window = expectIntData(listData.items[7]).value;

  return {
    valid_contracts,
    admin_creds,
    virtual_price,
    base_price,
    buy_down_prices,
    payment_address,
    expiry_duration,
    renewal_window,
  };
};

export { decodeMainSubHandleSettings };
