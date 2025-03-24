// import { u128 } from "as-bignum/assembly";
import { JSON } from "json-as/assembly";
import {
  Claim,
  ExecutionConfig
} from "./config";
import { u128 } from "as-bignum/assembly";

// @ts-ignore: Decorator valid here
let executionConfig: ExecutionConfig | null = null;
let totalUpdates: Claim[] = [];

/**
 * Recieves config from host
 */
export function initialize(config: string): void {
  executionConfig = JSON.parse<ExecutionConfig>(config);
  // if (!configObj!.isValid()) throw new Error("Config not properly formatted");
}

function initializeExecutionConfig(): ExecutionConfig {
  if (!executionConfig) {
    throw new Error("Execution config must be set before use.");
  }
  return  changetype<ExecutionConfig>(executionConfig); // Here, executionConfig is guaranteed non-null
}

const divider = u128.fromString("10000000000000000000");

/**
 * Handles the execution logic
 */
export function execute(): string {
  const config = initializeExecutionConfig();
  if (
    config.currentExecutionBlock < config.campaign.startBlock ||
    config.lastDistributionExecutionBlock >= config.campaign.endBlock
  ) {
    return "[]";
  }

  const campaign = config.campaign;

  const startBlock =
    f64(parseFloat(campaign.startBlock) > parseFloat(config.lastDistributionExecutionBlock)
      ? parseFloat(campaign.startBlock)
      : parseFloat(config.lastDistributionExecutionBlock));
  const endBlock =
    f64(parseFloat(config.currentExecutionBlock) < parseFloat(campaign.endBlock)
      ? parseFloat(config.currentExecutionBlock)
      : parseFloat(campaign.endBlock));

  const campaignBlockRange = parseFloat(campaign.endBlock) - parseFloat(campaign.startBlock);
  const intervalBlockRange = endBlock - startBlock;


  let distributionAmount = (parseFloat(campaign.distributionAmount));
  let intervalBlockRangeU128 = (intervalBlockRange);
  let campaignBlockRangeU128 = (campaignBlockRange);
  
  // First calculate total rewards to allocate for this period
  const rewardsToAllocate = (distributionAmount * intervalBlockRangeU128) / campaignBlockRangeU128;

  const userList = config.userList;

  let claimList: Claim[] = [];
  for (let i = 0; i < userList.length; i++) {
    const additionalAmount = u128.mul(u128.fromF64(rewardsToAllocate), u128.fromString(userList[i].share))
    
    const additionalAmountDivided = u128.div(additionalAmount, divider);
    claimList.push(new Claim(userList[i].user, additionalAmountDivided.toF64(), config.campaign.liquidityPool));
  }


  return JSON.stringify(claimList);
}


// An example of what the config object will look like after being created via the configForm
export function exampleConfig(): string {
  return `{"campaign":{"id":1,"liquidityPool":"0xAC4494e30a85369e332BDB5230d6d694d4259DbC","rewardToken":"0xEfE1A4a97181d37d9Fd2aacb306E9a2dB956Ccdd","creator":"0xe7Ba75196f5D69122EB10c301Ae7Fc289E368c25","startBlock":"56238516","endBlock":"69823266","distributionAmount":"47500000000000000000.00","abandonedDeadline":"77228980","cumulativeAllocated":"0","lastBlockUpdatedTo":56713281,"paused":false,"closed":false,"ipfsHash":"QmbPz8Rq48UdFNmEBDFbSkH6osiY2CgaxCQkaEJYAefWRV","chainId":137,"ponderDbIdentifier":"ponder-db-instance-1","executionBundle":"QmNSdSVwSS1WnyLKSUtvEz1vm6vdnjaMcrMYvoraZCnbEM","executionParams":"{}","desc":"1619827200","created_at":"2024-05-07T13:11:50.042Z","updated_at":"2024-05-07T13:11:50.042Z","campaignEventId":"0xa08bf090b87f13ceb8d05f4aebe4e6ee1af395cbd7f73ee613444b7a2dda5062-0x3b7","campaignId":"0"},"poolContext":{"poolAddress":"0xAC4494e30a85369e332BDB5230d6d694d4259DbC","chainId":137,"eventBlock":56713281,"dbIdentifier":"ponder-db-instance-1"},"lastUpdatedBlockNumber":"56713281","ponderDbIdentifier":"ponder-db-instance-1","eventBlockNumber":56713281}`;
}

// Renders the config object in JSON Schema format, which is used
// by the frontend to display input value options and validate user input.
export function config(): string {
  return `{
    "title": "Steer Smart Rewards Distribution Bundle",
    "description": "This configuration manages the distribution of rewards across various blockchain addresses. It includes settings for handling reward tokens, creator addresses, and blacklist filtering to prevent certain addresses from receiving rewards.",
    "type": "object",
    "required": ["blacklist"],
    "properties": {
      "blacklist": {
        "type": "array",
        "title": "Blacklist",
        "description": "List of addresses that should not receive rewards.",
        "items": {
          "type": "string"
        }
      }
    }
  }`;
}

export function version(): i32 {
  return 3;
}

// @ts-ignore: Decorator valid here
