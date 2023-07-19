export interface IRepositoryInfo {
  name: string;
  language: string;
  visibility: string;
  branch: string;
  onBranchChange: (value: string) => void;
}
