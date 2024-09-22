import { Inspection, Unit } from "./types";

export type RootStackParamList = {
    Login: undefined;
    Projects: undefined;
    UnitScreen: { projectId: string };
    ViewUnit: { unit: Unit };
    Inspection: { unit: Unit };
    UpdateInspection: { unit: Unit };
    Success: {unit : Unit};
    ViewImages: { inspection: Inspection; unit:Unit};
  };