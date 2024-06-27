import { parseAbi } from "viem";

export { generateNetworkingKeys } from "./helpers";

// move to constants? // also for anvil/optimism
export const KINOMAP: `0x${string}` = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
export const MULTICALL: `0x${string}` = "0xcA11bde05977b3631167028862bE2a173976CA11";
export const KINO_ACCOUNT_IMPL: `0x${string}` = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
export const DOTOS: `0x${string}` = "0xB3244529432b9C6dB0Bdc5282cB8Fde8418E00a6";
export const DOTDEV: `0x${string}` = "0x69C30C0Cf0e9726f9eEF50bb74FA32711fA0B02D";


export const multicallAbi = parseAbi([
    `function aggregate(Call[] calls) external payable returns (uint256 blockNumber, bytes[] returnData)`,
    `struct Call { address target; bytes callData; }`,
]);

export const kinomapAbi = parseAbi([
    "function mint(address, bytes calldata, bytes calldata, bytes calldata, address) external returns (address tba)",
    "function note(bytes calldata,bytes calldata) external returns (bytes32)",
    "function get(bytes32 node) external view returns (address tokenBoundAccount, address tokenOwner, bytes memory note)",
]);

export const mechAbi = parseAbi([
    "function execute(address to, uint256 value, bytes calldata data, uint8 operation) returns (bytes memory returnData)",
    "function token() external view returns (uint256,address,uint256)"
])



// export const public_client =