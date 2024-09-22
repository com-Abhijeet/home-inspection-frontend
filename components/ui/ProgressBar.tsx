import React from "react";
import { View, StyleSheet } from "react-native";

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.bar,
          step >= 1 && styles.activeBar,
          step === 1 && styles.currentBar,
        ]}
      />
      <View
        style={[
          styles.bar,
          step >= 2 && styles.activeBar,
          step === 2 && styles.currentBar,
        ]}
      />
      <View
        style={[
          styles.bar,
          step >= 3 && styles.activeBar,
          step === 3 && styles.currentBar,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  bar: {
    flex: 1,
    height: 5,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 5,
  },
  activeBar: {
    backgroundColor: "green",
  },
  currentBar: {
    backgroundColor: "yellow",
  },
});

export default ProgressBar;
