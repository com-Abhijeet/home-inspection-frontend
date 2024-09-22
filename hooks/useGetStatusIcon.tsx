import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export const useGetStatusIcon = (status: string) => {
  switch (status.toUpperCase()) {
    case "OK":
      return <Icon name="check-circle" size={20} color="#00bd00" />;
    case "RFI":
      return <Icon name="hourglass-half" size={20} color="#001eff" />;
    case "FLAGGED":
      return <Icon name="flag" size={20} color="#b70000" />;
    default:
      return null;
  }
};
