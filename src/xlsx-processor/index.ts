import { ImporterFactory } from 'xlsx-import/lib/ImporterFactory';
import mongoose from 'mongoose';

import config from './config';
import { Contract, Track } from '../schema';
import { TrackRecord, TrackHeader } from '../types';

class XLSXProcessor {
  static factory = new ImporterFactory();

  static async validateImportFileHeaders(path: string): Promise<void> {
    const xlsx = await XLSXProcessor.factory.from(path);
    const trackHeaders: TrackHeader = xlsx.getFirstItem<TrackHeader>(
      config.trackHeaders,
    );

    const KeyToLabelValues = [
      'ID',
      'Title',
      'Version',
      'Artist',
      'ISRC',
      'P Line',
      'Aliases',
      'Contract',
    ];

    const isValid = Object.keys(trackHeaders).every((key: string) => {
      const index = parseInt(key);
      return trackHeaders[index] === KeyToLabelValues[index - 1];
    });

    if (!isValid) {
      throw new Error('Invalid column headers');
    }
  }

  static async importTracks(path: string): Promise<Array<TrackRecord>> {
    await XLSXProcessor.validateImportFileHeaders(path);
    const xlsx = await XLSXProcessor.factory.from(path);
    const tracks: Array<TrackRecord> = xlsx.getAllItems<TrackRecord>(
      config.trackRecords,
    );
    return tracks;
  }
}

const getTrackContract = async (
  contractName: string,
): Promise<mongoose.Document> => {
  const trackContract = await Contract.findOne({
    name: contractName,
  });

  if (!trackContract) {
    throw new Error('Contract not found');
  }

  return trackContract;
};

const importTracks = async (path: string): Promise<string[]> => {
  const errors = [];

  try {
    await Contract.findOneAndUpdate(
      { name: 'Contract 1' },
      { name: 'Contract 1' },
      { upsert: true, new: true },
    );

    const tracks: TrackRecord[] = await XLSXProcessor.importTracks(path);

    if (tracks?.length === 0) {
      throw new Error('No tracks to process');
    }

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
          }`,
        );
      }
    }
  } catch (error) {
    errors.push(error.message);
  }

  return errors;
};

export default importTracks;
