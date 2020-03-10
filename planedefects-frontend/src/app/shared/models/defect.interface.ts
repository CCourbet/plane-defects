import { DefectTypes } from "./defect-types.enum";

export interface Defect {
  id?: number;
  xcoordinate: number;
  ycoordinate: number;
  zcoordinate: number;
  defecttype: DefectTypes;
  comment: string;
}