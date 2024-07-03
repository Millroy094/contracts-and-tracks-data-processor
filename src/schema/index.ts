import { isEmpty } from "lodash";
import { model, Schema } from "mongoose";

const contractSchema = new Schema({
  _id: Object,
  name: { type: String, required: true },
});

const trackSchema = new Schema({
  title: {
    type: String,
    validate: {
      validator: (v) => !isEmpty(v),
      message: "{PATH} is required",
    },
  },
  version: { type: String },
  artist: { type: String },
  isrc: {
    type: String,
    validate: {
      validator: (v) => !isEmpty(v),
      message: "{PATH} is required",
    },
  },
  p_line: { type: String },
  aliases: { type: [String] },
  contract_id: {
    type: Schema.Types.ObjectId,
    ref: "Contract",
  },
});

export const Track = model("Track", trackSchema);
export const Contract = model("Contract", contractSchema);
