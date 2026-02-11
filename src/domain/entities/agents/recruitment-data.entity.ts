export interface RecruitmentData {
  counterId: string;
  milestoneId: string;
  milestoneThreshold: number;
  useLevelVpCostOverride: boolean;
  levelVpCostOverride: number;
  startDate: string; // dateTime
  endDate: string;   // dateTime
}
