import { baseUrl } from "./baseUrl";
import { Unit } from "../types/types"; // Import the Unit type from types.ts

const fetchUnits = async (
  projectId: string,
  setIsLoading: (isLoading: boolean) => void
): Promise<Unit[]> => {
  console.log(projectId);
  try {
    setIsLoading(true);
    const response = await fetch(`${baseUrl}/unit/getUnits/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data: Unit[] = await response.json();
      const formattedData = data.map(
        ({ unitNo, unitStatus, unitType, projectId, inspections }: Unit) => ({
          unitNo,
          unitStatus,
          unitType,
          projectId,
          inspections: inspections || [], // Ensure inspections is always an array
        })
      );
      setIsLoading(false);
      console.table(formattedData);
      // console.log(data); // Use console.table to display data in table format
      return formattedData; // Return the formatted data
    } else {
      console.error("Failed to fetch units");
      setIsLoading(false);
      return [];
    }
  } catch (error) {
    setIsLoading(false);
    console.error("Error fetching units:", error);
    return [];
  }
};

export default fetchUnits;
