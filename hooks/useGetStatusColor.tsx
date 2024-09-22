export const getStatusColor = (status: string) => {
  switch (status) {
    case "RFI":
      return "#001eff";
    case "OK":
      return "#00bd00";
    case "DMG":
      return "#b70000";
    case "Flagged":
      return "#b70000";
    case "Partial Complete":
      return "#E7F237";
    case "Reviewed":
      return "#378FF2";
    case "Pending":
      return "#ED3A1E";
    case "Complete":
      return "#1EED21";
    case "":
      return "#6f6767";
    default:
      return "#FFFFFF";
  }
};
