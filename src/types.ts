export interface TrackRecord {
  id?: string;
  title: string;
  version?: string;
  artist?: string;
  isrc: string;
  p_line?: string;
  aliases?: string[];
  contract?: string;
}

export interface TrackHeader {
  id: string;
  title: string;
  version: string;
  artist: string;
  isrc: string;
  p_line: string;
  aliases: string;
  contract: string;
}
