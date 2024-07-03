import readline from "readline";
import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";

import importTracks from "./xlsx-processor";

dotenv.config();
mongoose.connect(process.env.MONGO_DB_URL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("Please Enter a full path of the excel file to process: ");
rl.prompt();

rl.on("line", async (path) => {
  if (!fs.existsSync(path) || !path.toLowerCase().endsWith(".xlsx")) {
    console.error("Invalid file path or file.");
    rl.prompt();
  } else {
    const errors = await importTracks(path);
    console.error({ errors });
    rl.close();
  }
}).on("close", function () {
  process.exit(0);
});
