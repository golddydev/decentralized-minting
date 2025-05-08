interface MainSubHandleSettings {
  valid_contracts: string[];
  admin_creds: string[];
  virtual_price: bigint;
  base_price: bigint;
  buy_down_prices: bigint[][];
  payment_address: string;
  expiry_duration: bigint;
  renewal_window: bigint;
}

export type { MainSubHandleSettings };
