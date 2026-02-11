import type { Ability } from "./ability.entity";
import type { RecruitmentData } from "./recruitment-data.entity";
import type { Role } from "./role.entity";

export interface IAgent {
  uuid: string;
  displayName: string; // localized
  description: string; // localized
  developerName: string;
  releaseDate: string; // dateTime (ISO string)
  characterTags: string[]; // localized
  displayIcon: string;
  displayIconSmall: string;
  bustPortrait: string;
  fullPortrait: string;
  fullPortraitV2: string;
  killfeedPortrait: string;
  minimapPortrait: string;
  homeScreenPromoTileImage: string;
  background: string;
  backgroundGradientColors: string[];
  assetPath: string;
  isFullPortraitRightFacing: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest: boolean;
  isBaseContent: boolean;
  role: Role;
  recruitmentData: RecruitmentData;
  abilities: Ability[];
}
