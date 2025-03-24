import { WasmModule, loadWasm } from "@steerprotocol/app-loader";
import fs from 'fs';
import {
  local_config
} from "./utils";

jest.setTimeout(60000);

describe("Data Connector Test Suite", () => {
  let bundle: WasmModule;
  beforeEach(async () => {
    bundle = await loadWasm(fs.readFileSync(__dirname + "/../build/debug.wasm"), {})
  });

  

  test.only("Bundle can execute and transform data", async () => {
    bundle.initialize(local_config);
    await bundle.execute();
  });
});