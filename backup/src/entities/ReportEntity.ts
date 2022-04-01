export type ReportTimeSerieEntity = {
  date: string;
  value: number;
};

export interface ReportEntity {
  type: "indexed" | "not-indexed" | "not-processed" | "pending";
  percentage: number;
  value: number;
}
