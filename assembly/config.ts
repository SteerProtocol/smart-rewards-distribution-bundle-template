import { JSON } from "json-as/assembly";

// @ts-ignore: Decorator valid here
@serializable
class PoolContext {
    poolAddress: string;
    eventBlock: u64;
    chainId: u64;
    dbIdentifier: string;

    constructor() {
        this.poolAddress = ""; // Default construction, adjust based on Address definition
        this.eventBlock = 0;
        this.chainId = 0;
        this.dbIdentifier = "";
    }

    isValid(): boolean {
        // if (!this.subgraphEndpoint) return false;
        // if (!this.poolAddress) return false;
        // if (!this.candleWidth) return false;
        // if (!this.lookback) return false;
        // if (!this.executionContext) return false;
        // if (!this.executionContext!.epochTimestamp) return false;
        return true;
    }
}

// @ts-ignore: Decorator valid here
@serializable
class Campaign {
    id: u64 = 0;
    liquidityPool: string = "";
    rewardToken: string = "";
    creator: string = "";
    startBlock: string = "";
    endBlock: string = "";
    // startBlock: f64 = 0;
    // endBlock: f64 = 0;
    distributionAmount: string = "";
    // distributionAmount: f64 = 0;
    abandonedDeadline: u64 = 0;
    cumulativeAllocated: f64 = 0;
    lastBlockUpdatedTo: u64 = 0;
    paused: bool = false;
    closed: bool = false;
    ipfsHash: string = "";
    chainId: u64 = 0;
    ponderDbIdentifier: string = "";
    executionBundle: string = "";
    executionParams: string = "";
    desc: string = "";
    campaignEventId: string = "";
    campaignId: u64 = 0;

    constructor() {
        // Initialize or assert defaults as needed
    }

    isValid(): boolean {
        // if (!this.subgraphEndpoint) return false;
        // if (!this.poolAddress) return false;
        // if (!this.candleWidth) return false;
        // if (!this.lookback) return false;
        // if (!this.executionContext) return false;
        // if (!this.executionContext!.epochTimestamp) return false;
        return true;
    }
}


@serializable
export class User {
    user: string;
    share: string;

    constructor() {
        this.user = "";
        this.share = "";
    }
}

// @ts-ignore: Decorator valid here
@serializable
export class ExecutionConfig {
    // General info
    poolContext: PoolContext;
    campaign: Campaign;
    blacklist: string[] = [];
    description: string = "";
    apiBaseUrl: string = "";
    ponderDbIdentifier: string = "";
    authToken: string = "";

    // schedule execution info
    lastPublishedBlockNumber: f64;
    lastPublishedTimestamp: f64;
    lastDistributionExecutionTimestamp: f64;
    lastDistributionExecutionBlock: string;
    currentExecutionTimestamp: f64;
    currentExecutionBlock: string;

    userList: User[] = [];

    constructor() {
        this.poolContext = new PoolContext();
        this.campaign = new Campaign();
        this.userList = [];
        // this.eventBlockNumber = 0;
        this.description = "";
        this.apiBaseUrl = "";
        this.ponderDbIdentifier = "";
        this.authToken = "";
        this.lastPublishedBlockNumber = 0;
        this.lastDistributionExecutionTimestamp = 0;
        this.lastDistributionExecutionBlock = "";
        this.lastPublishedTimestamp = 0;
        this.currentExecutionTimestamp = 0;
        this.currentExecutionBlock = "";
    }

    isValid(): boolean {
        // can check if config is valid ie:
        if (!this.apiBaseUrl) return false;
        return true;
    }
}


// @ts-ignore: Decorator valid here
@serializable
export class Claim {
    user: string = "";
    additionalAmount: f64 = 0
    vault: string | null = null

    constructor(_user: string, _amount: f64, _vault: string | null) {
        this.user = _user
        this.additionalAmount = _amount
        this.vault = _vault
      }
}

// New interfaces for the updated API endpoints

