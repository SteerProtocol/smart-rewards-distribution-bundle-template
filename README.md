# Steer Protocol Data Connector Template - Assemblyscript

Access off-chain data within [Steer Protocol](https://steer.finance) Applications with our AssemblyScript data connector template. Expand your smart contract capabilities with off-chain data! More info can be found here: [Documentation](https://docs.steer.finance/data-connectors/writing-a-data-connector)

## TIP
The Steer Protocol Strategy Template for AssemblyScript can be found here: [https://github.com/SteerProtocol/app-template-assemblyscript](https://github.com/SteerProtocol/app-template-assemblyscript)

Project Structure
Data Connectors have 3 functions that will be directly called by the Keeper nodes during runtime. These functions are necessary along with configuration form function, other helper functions and classes will likely be helpful. For more information please see the Data Connector Interface. However, this design means that as a developer you only need to implement the methods which are required for the data connector to work.

Below are the significant files and folders which you will want to get familiar with:
```
├── assembly      // Source code for the data connector
├── build         // Output of the build process aka `yarn asbuild`
├── coverage      // Coverage report for testing
├── tests         // Test files with a built in test runner
├── asconfig.json // Assemblyscript config
├── index.js      // Javascript entrypoint for the data connector when running tests
├── package.json  // Dependencies for the data connector
```

## TIP
Bindings to [CCXT](https://www.npmjs.com/package/ccxt) and [Asyncify](https://web.dev/articles/asyncify) are built into [@steerprotocol/app-loader](https://npmjs.com/@steerprotocol/app-loader).

# Project Setup

First, you need to clone the repository

```
git clone https://github.com/SteerProtocol/data-connector-template-assemblyscript

cd data-connector-template-assemblyscript
```

Install the required dependencies

```
yarn install
```

And take it for a test run.

```
yarn run build:debug && node index.js
```

## INFO
You will notice that there is a post-install script which will compile the ./assembly source folder and populate the ./build folder. This is done to make it easier to run the tests. We will cover this later.

Once you have set up your project, you can begin defining your data connector.
