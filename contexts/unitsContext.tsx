import React, { createContext, useContext, useState } from "react";
import { Unit } from "../types/types";

interface UnitsContextProps {
  units: Unit[];
  setUnits: React.Dispatch<React.SetStateAction<Unit[]>>;
  getUnitByNo: (unitNo: string) => Unit | undefined;
}

const UnitsContext = createContext<UnitsContextProps | undefined>(undefined);

export const UnitsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [units, setUnits] = useState<Unit[]>([]);

  const getUnitByNo = (unitNo: string): Unit | undefined => {
    return units.find((unit) => unit.unitNo === unitNo);
  };

  return (
    <UnitsContext.Provider value={{ units, setUnits, getUnitByNo }}>
      {children}
    </UnitsContext.Provider>
  );
};

export const useUnits = (): UnitsContextProps => {
  const context = useContext(UnitsContext);
  if (!context) {
    throw new Error("useUnits must be used within a UnitsProvider");
  }
  return context;
};
