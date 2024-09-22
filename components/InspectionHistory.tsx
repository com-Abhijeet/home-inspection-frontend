import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Unit, Defect, Inspection } from "@/types/types"; // Import types
import { getStatusColor } from "@/hooks/useGetStatusColor";
import ViewImages from "./ViewImages";
import Icon from "react-native-vector-icons/FontAwesome5";

interface InspectionHistoryProps {
  unit: Unit;
}

const InspectionHistory: React.FC<InspectionHistoryProps> = ({ unit }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [expandedInspectionIndex, setExpandedInspectionIndex] = useState<
    number | null
  >(null);
  const [selectedInspection, setSelectedInspection] =
    useState<Inspection | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedInspectionIndex(
      expandedInspectionIndex === index ? null : index
    );
  };
  const handleViewImages = (inspection: Inspection) => {
    navigation.navigate("ViewImages", {
      unit: unit,
      inspection: inspection,
    });
  };

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyContainerHeader}>Inspection History</Text>
      <View style={styles.hr} />
      {unit.inspections ? (
        unit.inspections.map((inspection, index) => (
          <View
            key={index}
            style={[
              styles.inspectionCard,
              {
                borderLeftColor: getStatusColor(inspection?.reviewStatus ?? ""),
              },
            ]}
          >
            <Text style={styles.inspectionDate}>
              Inspection Date:{" "}
              {new Date(inspection.inspectionDate).toLocaleDateString("en-GB")}
            </Text>
            {inspection.reviewDate ? (
              <Text style={styles.reviewDate}>
                Review Date:{" "}
                {new Date(inspection.reviewDate).toLocaleDateString("en-GB")}
              </Text>
            ) : (
              <Text style={styles.reviewDate}>
                Review Date: Not Reviewed Yet
              </Text>
            )}
            {inspection.reviewStatus ? (
              <Text style={styles.reviewStatus}>
                Review Status: {inspection.reviewStatus}
              </Text>
            ) : (
              <Text style={styles.reviewStatus}>
                Review Status: Not Reviewed Yet
              </Text>
            )}
            <View style={styles.actionContainer}>
              <TouchableOpacity
                onPress={() => toggleExpand(index)}
                style={styles.actionButton}
              >
                <Icon name="tools" style={styles.toolsIcon} />
                <Text style={styles.expandText}>
                  {expandedInspectionIndex === index
                    ? "Hide Defects"
                    : "Show Defects"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleViewImages(inspection)}
                style={styles.actionButton}
              >
                <Icon name="image" style={styles.imageIcon} />
                <Text style={styles.expandText}>View Images</Text>
              </TouchableOpacity>
            </View>

            {expandedInspectionIndex === index &&
              inspection.defects &&
              inspection.defects.length > 0 && (
                <View style={styles.defectsContainer}>
                  {inspection.defects.map((defect, defectIndex) => (
                    <View key={defectIndex} style={styles.defectCard}>
                      <Text style={styles.defectText}>Room: {defect.room}</Text>
                      <Text style={styles.defectText}>
                        Category: {defect.category}
                      </Text>
                      {defect.options.map((option, optionIndex) => (
                        <Text key={optionIndex} style={styles.defectText}>
                          Option: {option.name}
                        </Text>
                      ))}
                      <Text style={styles.defectText}>
                        Status: {defect.status}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
          </View>
        ))
      ) : (
        <Text>No inspection history available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  historyContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  historyContainerHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  hr: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  inspectionCard: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    borderLeftWidth: 8, // Add this line for a thick left border
    borderLeftColor: "#000", // Change the color as needed
  },
  inspectionDate: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewDate: {
    fontSize: 14,
    color: "#555",
  },
  reviewStatus: {
    fontSize: 14,
    color: "#555",
  },
  expandText: {
    fontSize: 16,
    color: "#555",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  toolsIcon: {
    color: "red",
    marginRight: 5,
    fontSize: 16,
  },
  imageIcon: {
    color: "blue",
    marginRight: 5,
    fontSize: 16,
  },
  defectsContainer: {
    marginTop: 10,
  },
  defectCard: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    marginBottom: 10,
  },
  defectText: {
    fontSize: 14,
  },
});

export default InspectionHistory;
