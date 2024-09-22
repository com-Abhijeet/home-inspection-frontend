import { getStatusColor } from "@/hooks/useGetStatusColor";
import { useGetStatusIcon } from "@/hooks/useGetStatusIcon";
import { View, Text, StyleSheet } from "react-native";

const DisplayLabels = ({ label, text }: { label: string; text: string }) => {
  const statusIcon = useGetStatusIcon(text);

  if (label === "Status") {
    return (
      <View style={styles.displayLabel}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.statusContainer}>
          {statusIcon}
          <Text
            style={[
              styles.labelText,
              { color: getStatusColor(text), paddingHorizontal: 2 },
            ]}
          >
            {text}
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.displayLabel}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.labelText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  displayLabel: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 18,
    color: "#6f6767",
    fontWeight: "bold",
    marginRight: 8, // Add some margin to separate the labels
    flexShrink: 1,
  },
  labelText: {
    fontSize: 20,
    color: "#191919",
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DisplayLabels;
