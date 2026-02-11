import type { VoiceLine } from "./voice-line.entity";

export interface Ability {
  slot: string;
  displayName: string; // localized
  description: string; // localized
  displayIcon: string;
  voiceLine: VoiceLine;
}
