import { model, Schema } from "mongoose";

const contractSchema = new Schema({
  _id: Object,
  name: { type: String, required: true },
});

const trackSchema = new Schema({
  _id: Object,
  title: { type: String, required: true },
  version: { type: String },
  artist: { type: String },
  isrc: { type: String, required: true },
  p_line: { type: String },
  aliases: { type: [String] },
  contract_id: {
    type: Schema.Types.ObjectId,
    ref: "Contract",
  },
});

export const Track = model("Track", trackSchema);
export const Contract = model("Contract", contractSchema);
