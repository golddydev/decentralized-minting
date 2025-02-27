import { bytesToHex } from "@helios-lang/codec-utils";
import { makeTxOutputId, TxInput } from "@helios-lang/ledger";
import { BlockfrostV0Client, NetworkName } from "@helios-lang/tx-utils";
import { decodeUplcProgramV2FromCbor, UplcProgramV2 } from "@helios-lang/uplc";
import { ScriptDetails, ScriptType } from "@koralabs/kora-labs-common";
import { Err, Ok, Result } from "ts-res";

import {
  buildContracts,
  makeMintingDataProxyUplcProgramParameterDatum,
  makeMintingDataV1UplcProgramParameterDatum,
  makeMintProxyUplcProgramParameterDatum,
} from "../contracts/index.js";
import { convertError, invariant } from "../helpers/index.js";
import { fetchDeployedScript } from "../utils/contract.js";

/**
 * @interface
 * @typedef {object} DeployParams
 * @property {NetworkName} network Network
 * @property {bigint} mintVersion Mint Version - Parameter in Mint Proxy validator
 * @property {string} legacyPolicyId Legacy Handle's Policy ID
 * @property {string} godVerificationKeyHash God Verification Key  Hash - Parameter in Minting Data V1 Validator
 * @property {string} contractName Contract Name to Deploy
 */
interface DeployParams {
  network: NetworkName;
  mintVersion: bigint;
  legacyPolicyId: string;
  godVerificationKeyHash: string;
  contractName: string;
}

interface DeployData {
  optimizedCbor: string;
  unOptimizedCbor?: string;
  datumCbor?: string;
  validatorHash: string;
}

/**
 * @description Deploy one of De-Mi contracts
 * @param {DeployParams} params
 * @returns {Promise<DeployData>} Deploy Data
 */
const deploy = async (params: DeployParams): Promise<DeployData> => {
  const {
    network,
    mintVersion,
    legacyPolicyId,
    godVerificationKeyHash,
    contractName,
  } = params;

  const contractsConfig = buildContracts({
    network,
    mint_version: mintVersion,
    legacy_policy_id: legacyPolicyId,
    god_verification_key_hash: godVerificationKeyHash,
  });
  const {
    mintProxy: mintProxyConfig,
    mintV1: mintV1Config,
    mintingDataProxy: mintingDataProxyConfig,
    mintingDataV1: mintingDataV1Config,
    orders: ordersConfig,
  } = contractsConfig;

  switch (contractName) {
    case "mint_proxy.mint":
      return {
        ...extractScriptCborsFromUplcProgram(
          mintProxyConfig.mintProxyMintUplcProgram
        ),
        datumCbor: bytesToHex(
          makeMintProxyUplcProgramParameterDatum(mintVersion).data.toCbor()
        ),
        validatorHash: mintProxyConfig.mintProxyPolicyHash.toHex(),
      };
    case "mint_v1.withdraw":
      return {
        ...extractScriptCborsFromUplcProgram(
          mintV1Config.mintV1WithdrawUplcProgram
        ),
        validatorHash: mintV1Config.mintV1ValiatorHash.toHex(),
      };
    case "minting_data_proxy.spend":
      return {
        ...extractScriptCborsFromUplcProgram(
          mintingDataProxyConfig.mintingDataProxySpendUplcProgram
        ),
        datumCbor: bytesToHex(
          makeMintingDataProxyUplcProgramParameterDatum(
            mintingDataV1Config.mintingDataV1ValidatorHash.toHex()
          ).data.toCbor()
        ),
        validatorHash:
          mintingDataProxyConfig.mintingDataProxyValidatorHash.toHex(),
      };
    case "minting_data_v1.withdraw":
      return {
        ...extractScriptCborsFromUplcProgram(
          mintingDataV1Config.mintingDataV1WithdrawUplcProgram
        ),
        datumCbor: bytesToHex(
          makeMintingDataV1UplcProgramParameterDatum(
            legacyPolicyId,
            godVerificationKeyHash
          ).data.toCbor()
        ),
        validatorHash: mintingDataV1Config.mintingDataV1ValidatorHash.toHex(),
      };
    case "orders.spend":
      return {
        ...extractScriptCborsFromUplcProgram(
          ordersConfig.ordersSpendUplcProgram
        ),
        validatorHash: ordersConfig.ordersValidatorHash.toHex(),
      };
    default:
      throw new Error(
        `Contract name must be one of "mint_proxy.mint" | "mint_v1.withdraw" | "minting_data_proxy.spend" | "minting_data_v1.withdraw" | "orders.spend"`
      );
  }
};

const extractScriptCborsFromUplcProgram = (
  uplcProgram: UplcProgramV2
): { optimizedCbor: string; upOptimizedCbor?: string } => {
  return {
    optimizedCbor: bytesToHex(uplcProgram.toCbor()),
    upOptimizedCbor: uplcProgram.alt
      ? bytesToHex(uplcProgram.alt.toCbor())
      : undefined,
  };
};

interface DeployedScripts {
  mintProxyScriptDetails: ScriptDetails;
  mintProxyScriptTxInput: TxInput;
  mintV1ScriptDetails: ScriptDetails;
  mintV1ScriptTxInput: TxInput;
  mintingDataProxyScriptDetails: ScriptDetails;
  mintingDataProxyScriptTxInput: TxInput;
  mintingDataV1ScriptDetails: ScriptDetails;
  mintingDataV1ScriptTxInput: TxInput;
  ordersScriptDetails: ScriptDetails;
  ordersScriptTxInput: TxInput;
}

const fetchAllDeployedScripts = async (
  blockfrostV0Client: BlockfrostV0Client
): Promise<Result<DeployedScripts, string>> => {
  try {
    const mintProxyScriptDetails = await fetchDeployedScript(
      ScriptType.DEMI_MINT_PROXY
    );
    invariant(
      mintProxyScriptDetails.refScriptUtxo,
      "Mint Proxy has no Ref script UTxO"
    );
    const mintProxyScriptTxInput = await blockfrostV0Client.getUtxo(
      makeTxOutputId(mintProxyScriptDetails.refScriptUtxo)
    );
    if (mintProxyScriptDetails.unoptimizedCbor)
      mintProxyScriptTxInput.output.refScript = (
        mintProxyScriptTxInput.output.refScript as UplcProgramV2
      )?.withAlt(
        decodeUplcProgramV2FromCbor(mintProxyScriptDetails.unoptimizedCbor)
      );

    const mintV1ScriptDetails = await fetchDeployedScript(ScriptType.DEMI_MINT);
    invariant(
      mintV1ScriptDetails.refScriptUtxo,
      "Mint V1 has no Ref script UTxO"
    );
    const mintV1ScriptTxInput = await blockfrostV0Client.getUtxo(
      makeTxOutputId(mintV1ScriptDetails.refScriptUtxo)
    );
    if (mintV1ScriptDetails.unoptimizedCbor)
      mintV1ScriptTxInput.output.refScript = (
        mintV1ScriptTxInput.output.refScript as UplcProgramV2
      )?.withAlt(
        decodeUplcProgramV2FromCbor(mintV1ScriptDetails.unoptimizedCbor)
      );

    const mintingDataProxyScriptDetails = await fetchDeployedScript(
      ScriptType.DEMI_MINTING_DATA_PROXY
    );
    invariant(
      mintingDataProxyScriptDetails.refScriptUtxo,
      "Minting Data Proxy has no Ref script UTxO"
    );
    const mintingDataProxyScriptTxInput = await blockfrostV0Client.getUtxo(
      makeTxOutputId(mintingDataProxyScriptDetails.refScriptUtxo)
    );
    if (mintingDataProxyScriptDetails.unoptimizedCbor)
      mintingDataProxyScriptTxInput.output.refScript = (
        mintingDataProxyScriptTxInput.output.refScript as UplcProgramV2
      )?.withAlt(
        decodeUplcProgramV2FromCbor(
          mintingDataProxyScriptDetails.unoptimizedCbor
        )
      );

    const mintingDataV1ScriptDetails = await fetchDeployedScript(
      ScriptType.DEMI_MINTING_DATA
    );
    invariant(
      mintingDataV1ScriptDetails.refScriptUtxo,
      "Minting Data V1 has no Ref script UTxO"
    );
    const mintingDataV1ScriptTxInput = await blockfrostV0Client.getUtxo(
      makeTxOutputId(mintingDataV1ScriptDetails.refScriptUtxo)
    );
    if (mintingDataV1ScriptDetails.unoptimizedCbor)
      mintingDataV1ScriptTxInput.output.refScript = (
        mintingDataV1ScriptTxInput.output.refScript as UplcProgramV2
      )?.withAlt(
        decodeUplcProgramV2FromCbor(mintingDataV1ScriptDetails.unoptimizedCbor)
      );

    const ordersScriptDetails = await fetchDeployedScript(
      ScriptType.DEMI_ORDERS
    );
    invariant(
      ordersScriptDetails.refScriptUtxo,
      "Orders has no Ref script UTxO"
    );
    const ordersScriptTxInput = await blockfrostV0Client.getUtxo(
      makeTxOutputId(ordersScriptDetails.refScriptUtxo)
    );
    if (ordersScriptDetails.unoptimizedCbor)
      ordersScriptTxInput.output.refScript = (
        ordersScriptTxInput.output.refScript as UplcProgramV2
      )?.withAlt(
        decodeUplcProgramV2FromCbor(ordersScriptDetails.unoptimizedCbor)
      );

    return Ok({
      mintProxyScriptDetails,
      mintProxyScriptTxInput,
      mintV1ScriptDetails,
      mintV1ScriptTxInput,
      mintingDataProxyScriptDetails,
      mintingDataProxyScriptTxInput,
      mintingDataV1ScriptDetails,
      mintingDataV1ScriptTxInput,
      ordersScriptDetails,
      ordersScriptTxInput,
    });
  } catch (err) {
    return Err(convertError(err));
  }
};

export type { DeployedScripts, DeployParams };
export { deploy, fetchAllDeployedScripts };
