const units = [
  {
    unitNo: "101",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "102",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "103",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "104",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "105",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "106",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "107",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "108",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "201",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "202",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "203",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "204",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "205",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "206",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "207",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "208",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  // Continue this pattern for floors 3 to 10
  {
    unitNo: "301",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "302",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "303",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "304",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "305",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "306",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "307",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "308",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "401",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "402",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "403",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "404",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "405",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "406",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "407",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "408",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "501",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "502",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "503",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "504",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "505",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "506",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "507",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "508",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "601",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "602",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "603",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "604",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "605",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "606",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "607",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "608",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "701",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "702",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "703",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "704",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "705",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "706",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "707",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "708",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "801",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "802",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "803",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "804",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "805",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "806",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "807",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "808",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "901",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "902",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "903",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "904",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "905",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "906",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "907",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "908",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "1001",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "1002",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "1003",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "1004",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "1005",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
  {
    unitNo: "1006",
    unitType: "Apartment",
    unitStatus: "DMG",
  },
  {
    unitNo: "1007",
    unitType: "Apartment",
    unitStatus: "OK",
  },
  {
    unitNo: "1008",
    unitType: "Apartment",
    unitStatus: "RFI",
  },
];

export default units;
