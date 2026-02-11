import type { Media } from "./media.entity";

export interface VoiceLine {
  minDuration: number; // float
  maxDuration: number; // float
  mediaList: Media[];
}
