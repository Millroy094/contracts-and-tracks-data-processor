import { ImporterFactory } from "xlsx-import/lib/ImporterFactory";
import config from "./config";
import { TrackRecord, TrackHeader } from "../types";

class Importer {
  static factory = new ImporterFactory();

  static async validateImportFileHeaders(path: string): Promise<void> {
    const xlsx = await Importer.factory.from(path);
    const trackHeaders: TrackHeader = xlsx.getFirstItem<TrackHeader>(
      config.trackHeaders
    );

    const KeyToLabelValues: Record<string, string> = {
      id: "ID",
      title: "Title",
      version: "Version",
      artist: "Artist",
      isrc: "ISRC",
      p_line: "P Line",
      aliases: "Aliases",
      contract: "Contract",
    };

    const isValid = Object.keys(trackHeaders).every(
      (key: string) => trackHeaders[key] === KeyToLabelValues[key]
    );

    if (!isValid) {
      throw new Error("Invalid column headers");
    }
  }

  static async importTracks(path: string): Promise<Array<TrackRecord>> {
    await Importer.validateImportFileHeaders(path);
    const xlsx = await Importer.factory.from(path);
    const tracks: Array<TrackRecord> = xlsx.getAllItems<TrackRecord>(
      config.trackRecords
    );
    return tracks;
  }
}

export default Importer;
