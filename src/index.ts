import mongoose from "mongoose";
import dotenv from "dotenv";
import Importer from "./importer";
import { TrackRecord } from "./types";
import { Contract, Track } from "./schema";

dotenv.config();
mongoose.connect(process.env.MONGO_DB_URL);

const getTrackContract = async (
  contractName: string
): Promise<mongoose.Document> => {
  const trackContract = await Contract.findOne({
    name: contractName,
  });

  if (!trackContract) {
    throw new Error("Contract not found");
  }

  return trackContract;
};

const importTracks = async () => {
  await Contract.findOneAndUpdate(
    { name: "Contract 1" },
    { name: "Contract 1" },
    { upsert: true, new: true }
  );

  const tracks: TrackRecord[] = await Importer.importTracks(
    `${__dirname}/test.xlsx`
  );

  if (tracks?.length === 0) {
    throw new Error("No tracks to process");
  }

  const errors: string[] = [];

  for (const [index, track] of tracks.entries()) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = {
        title: track.title,
        isrc: track.isrc,
        artist: track.artist,
        version: track.version,
        aliases: track.aliases,
        p_line: track.p_line,
      };

      const { contract: contractName } = track;

      if (contractName) {
        const trackContract = await getTrackContract(contractName);
        data.contract_id = trackContract;
      }

      await Track.findByIdAndUpdate(track.id, data, {
        upsert: true,
        new: true,
      });
    } catch (error) {
      errors.push(
        `there is an issue uploading data for row ${index + 3}. Error - ${
          error.message
        }`
      );
    }
  }
  console.log(errors);
  process.exit(0);
};

importTracks();
