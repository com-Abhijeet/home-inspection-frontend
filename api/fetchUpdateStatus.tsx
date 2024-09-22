import { Inspection, Unit } from "@/types/types";
import { baseUrl } from "./baseUrl";

interface UpdateUnitPayload {
  unitNo: string;
  unitStatus: string;
  latestInspection: Inspection | null;
}

export const updateUnitStatus = async (
  payload: UpdateUnitPayload,
  setIsLoading: (isLoading: boolean) => void
) => {
  console.log("api Payload ", payload);
  try {
    setIsLoading(true);
    const response = await fetch(
      `${baseUrl}/unit/updateStatus/${payload.unitNo}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.statusText} - ${errorText}`);
    }

    const updatedUnit = await response.json();
    setIsLoading(false);
    return updatedUnit;
  } catch (error) {
    setIsLoading(false);
    console.error("Failed to update unit:", error);
    throw error;
  }
};