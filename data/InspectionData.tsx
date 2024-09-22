const InspectionData: {
  [unitNo: string]: {
    category: string;
    room: string;
    option: string;
  }[];
} = {
  "101": [
    {
      category: "Electrical Fittings",
      room: "Living Room",
      option: "Replace light bulbs",
    },
    {
      category: "Main Door",
      room: "Living Room",
      option: "Fix door hinges",
    },
  ],
  "102": [
    {
      category: "Wall",
      room: "Bedroom",
      option: "Paint touch up",
    },
  ],
  // Add more units and their inspection history here...
};

export const getInspectionDataByUnitNo = (unitNo: string) => {
  console.log("unit No", unitNo);
  return InspectionData[unitNo] || [];
};

export default InspectionData;
