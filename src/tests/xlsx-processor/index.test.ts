import { describe, it, before, afterEach, after } from "mocha";
import { expect } from "chai";
import InMemoryMongoDb from "../in-memory-mongodb";
import importTracks from "../../xlsx-processor";

describe("Tracks & Contract Excel File Processor", () => {
  before(async () => await InMemoryMongoDb.connect());

  afterEach(async () => await InMemoryMongoDb.clearDatabase());

  after(async () => await InMemoryMongoDb.closeDatabase());

  it("should error when headers are wrong", async () => {
    const path = `${__dirname}/test-excel-files/invalid-headers.xlsx`;
    const errors = await importTracks(path);
    expect(errors).to.eql(["Invalid column headers"]);
  });

  it("should error when there is no data supplier", async () => {
    const path = `${__dirname}/test-excel-files/no-data.xlsx`;
    const errors = await importTracks(path);
    expect(errors).to.eql(["No tracks to process"]);
  });

  it("should error when on rows that have an invalid contract name supplied", async () => {
    const path = `${__dirname}/test-excel-files/invalid-contract-name.xlsx`;
    const errors = await importTracks(path);
    expect(errors).to.eql([
      "there is an issue uploading data for row 4. Error - Contract not found",
    ]);
  });

  it("should error when on rows that missing mandatory information", async () => {
    const path = `${__dirname}/test-excel-files/missing-mandatory-fields.xlsx`;
    const errors = await importTracks(path);
    expect(errors).to.eql([
      "there is an issue uploading data for row 3. Error - Track validation failed: isrc: isrc is required",
      "there is an issue uploading data for row 4. Error - Track validation failed: title: title is required",
    ]);
  });

  it("should process all rows without errors when all information provided is correct", async () => {
    const path = `${__dirname}/test-excel-files/valid-data.xlsx`;
    const errors = await importTracks(path);
    expect(errors).to.eql([]);
  });
});
