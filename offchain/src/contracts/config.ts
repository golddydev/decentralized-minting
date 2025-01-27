import {
  makeAddress,
  makeAssetClass,
  makeMintingPolicyHash,
  makeRegistrationDCert,
  makeStakingAddress,
  makeStakingValidatorHash,
  makeValidatorHash,
  TxOutputId,
} from "@helios-lang/ledger";

import { NETWORK, SETTINGS_UTF8_ASSET_NAME } from "../configs/index.js";
import {
  getMintProxyMintUplcProgram,
  getMintV1WithdrawUplcProgram,
  getOrderSpendUplcProgram,
  getSettingsProxyMintUplcProgram,
  getSettingsProxySpendUplcProgram,
  getSettingsV1StakeUplcProgram,
} from "./validators.js";

const buildContractsConfig = (initialTxOutputId: TxOutputId) => {
  const isMainnet = NETWORK == "mainnet";

  const settingsProxySpendUplcProgram =
    getSettingsProxySpendUplcProgram(initialTxOutputId);
  const settingsProxyMintUplcProgram =
    getSettingsProxyMintUplcProgram(initialTxOutputId);
  const settingsProxyPolicyHash = makeMintingPolicyHash(
    settingsProxyMintUplcProgram.hash()
  );
  const settingsProxyAssetClass = makeAssetClass(
    settingsProxyPolicyHash,
    Buffer.from(SETTINGS_UTF8_ASSET_NAME)
  );
  const settingsProxyScriptAddress = makeAddress(
    isMainnet,
    makeValidatorHash(settingsProxyMintUplcProgram.hash())
  );

  const settingsV1StakeUplcProgram = getSettingsV1StakeUplcProgram();
  const settingsV1ValidatorHash = makeValidatorHash(
    settingsV1StakeUplcProgram.hash()
  );
  const settingsV1StakingAddress = makeStakingAddress(
    isMainnet,
    makeStakingValidatorHash(settingsV1StakeUplcProgram.hash())
  );
  const settingsV1RegistrationDCert = makeRegistrationDCert(
    settingsV1StakingAddress.stakingCredential
  );

  const orderSpendUplcProgram = getOrderSpendUplcProgram(
    settingsProxyPolicyHash.toHex()
  );
  const orderScriptHash = makeValidatorHash(orderSpendUplcProgram.hash());
  const orderScriptAddress = makeAddress(isMainnet, orderScriptHash);

  const mintProxyMintUplcProgram = getMintProxyMintUplcProgram(
    settingsProxyPolicyHash.toHex()
  );
  const mintProxyPolicyHash = makeMintingPolicyHash(
    mintProxyMintUplcProgram.hash()
  );
  const handlePolicyHash = mintProxyPolicyHash;

  const mintV1WithdrawUplcProgram = getMintV1WithdrawUplcProgram(
    settingsProxyPolicyHash.toHex(),
    orderScriptHash.toHex()
  );
  const mintV1ValiatorHash = makeValidatorHash(
    mintV1WithdrawUplcProgram.hash()
  );
  const mintV1StakingAddress = makeStakingAddress(
    isMainnet,
    makeStakingValidatorHash(mintV1WithdrawUplcProgram.hash())
  );
  const mintV1RegistrationDCert = makeRegistrationDCert(
    mintV1StakingAddress.stakingCredential
  );

  return {
    settingsProxy: {
      settingsProxySpendUplcProgram,
      settingsProxyMintUplcProgram,
      settingsProxyPolicyHash,
      settingsProxyAssetClass,
      settingsProxyScriptAddress,
    },
    settingsV1: {
      settingsV1StakeUplcProgram,
      settingsV1ValidatorHash,
      settingsV1StakingAddress,
      settingsV1RegistrationDCert,
    },
    order: {
      orderSpendUplcProgram,
      orderScriptHash,
      orderScriptAddress,
    },
    mintProxy: {
      mintProxyMintUplcProgram,
      mintProxyPolicyHash,
    },
    mintV1: {
      mintV1WithdrawUplcProgram,
      mintV1ValiatorHash,
      mintV1StakingAddress,
      mintV1RegistrationDCert,
    },
    handlePolicyHash,
  };
};

export { buildContractsConfig };
