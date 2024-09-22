export interface Option {
  status: string;
  name: string;
  localUri?: string;
  cloudinaryUrl?: string;
}

export interface Defect {
  category: string;
  room: string;
  options: Option[];
  status: string;
}

export interface Inspection {
  defects: Defect[] | null;
  inspectionDate: string;
  reviewDate?: string;
  reviewStatus?: string;
}

export interface Unit {
  projectId: string;
  unitNo: string;
  unitType: string;
  unitStatus: string;
  inspections: Inspection[] | null;
}