import React from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { Inspection } from "@/types/types"; // Import the Inspection type

interface ConfirmationScreenProps {
  inspectionData: Inspection[];
  handleSubmit: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  inspectionData,
  handleSubmit,
}) => {
  return (
    <ScrollView style={styles.container}>
      {inspectionData.map((inspection, index) => (
        <View key={index} style={styles.inspectionContainer}>
          <Text style={styles.inspectionHeader}>Inspection {index + 1}</Text>
          {inspection.defects?.map((defect, defectIndex) => (
            <View key={defectIndex} style={styles.defectContainer}>
              <Text style={styles.defectHeader}>
                {defect.room} - {defect.category}
              </Text>
              {defect.options.map((option, optionIndex) => (
                <Text key={optionIndex} style={styles.optionText}>
                  {option.name}
                </Text>
              ))}
            </View>
          ))}
        </View>
      ))}
      <Button title="Submit Inspection" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  inspectionContainer: {
    marginBottom: 20,
  },
  inspectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  defectContainer: {
    marginBottom: 10,
  },
  defectHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  optionText: {
    marginLeft: 10,
  },
});

export default ConfirmationScreen;
