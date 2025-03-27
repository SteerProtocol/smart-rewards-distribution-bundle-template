# Steer Protocol LP Distribution Bundle - AssemblyScript

This repository contains a WASM-based data distribution for [Steer Protocol](https://steer.finance) that handles liquidity pool reward distributions. The wasm bundle is written in AssemblyScript and provides functionality to calculate and distribute rewards based on user shares in liquidity pools.

## Features

- Automated reward distribution calculations
- Support for campaign-based reward systems
- Blacklist functionality for excluding addresses
- Integration with Steer Protocol's liquidity pools
- WASM-based execution for efficient processing

## Project Structure

The data connector implements three core functions that are called by Keeper nodes during runtime:

1. `initialize(config: string)`: Sets up the execution configuration
2. `execute()`: Handles the reward distribution logic
3. `config()`: Provides the configuration schema for the frontend

Key files and directories:

```
├── assembly/           # Source code for the distribution engine
│   ├── index.ts       # Main implementation logic
│   └── config.ts      # Configuration types and interfaces
├── build/             # Output of the build process (yarn asbuild)
├── coverage/          # Coverage report for testing
├── tests/             # Test files with built-in test runner
├── asconfig.json      # AssemblyScript configuration
├── index.js          # JavaScript entrypoint for testing
└── package.json      # Project dependencies
```

## Configuration

The data connector accepts a configuration object with the following key components:

- Campaign settings (start/end blocks, distribution amounts, etc.)
- Pool context (pool address, chain ID, etc.)
- User list with share allocations
- Blacklist for excluded addresses

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/SteerProtocol/smart-rewards-distribution-bundle-template.git
cd smart-rewards-distribution-bundle-template
```

2. Install dependencies:
```bash
yarn install
```

3. Run tests:
```bash
yarn run build:debug && node index.js
```

## Testing

The project includes a test suite that verifies the distribution engine functionality. Tests can be run using:

```bash
yarn test
```

Example test implementation can be found in `tests/index.test.ts`.

## Development

To implement your own modifications:

1. Update the configuration in `assembly/config.ts`
2. Modify the execution logic in `assembly/index.ts`
3. Add test cases in `tests/index.test.ts`
4. Build and test your changes

## Technical Details

The data connector uses:
- AssemblyScript for WASM compilation
- JSON parsing for configuration handling
- BigNum operations for precise calculations
- Steer Protocol's app-loader for WASM execution

For more information on developing data connectors, please refer to the [Steer Protocol Documentation](https://docs.steer.finance/data-connectors/writing-a-data-connector).
