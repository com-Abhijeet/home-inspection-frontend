import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Unit } from "@/types/types";
import { RootStackParamList } from "@/types/navigationTypes"; // Import the navigation types
import { updateUnit } from "@/api/fetchUpdateUnit"; // Import the updateUnit function
import { StackNavigationProp } from "@react-navigation/stack";
import DisplayLabels from "@/components/ui/DisplayLabels";
import { getStatusColor } from "@/hooks/useGetStatusColor";
import Loader from "@/components/ui/Loader";
import { updateUnitStatus } from "@/api/fetchUpdateStatus";

const UpdateInspection = () => {
  const route = useRoute<RouteProp<RootStackParamList, "UpdateInspection">>();
  const unit = route.params.unit;
  const [unitStatus, setUnitStatus] = useState(unit.unitStatus);
  const [inspections, setInspections] = useState(unit.inspections);
  const [expandedInspectionIndex, setExpandedInspectionIndex] = useState<
    number | null
  >(null);
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, "UpdateInspection">
    >();
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = (
    inspectionIndex: number,
    defectIndex: number,
    status: string
  ) => {
    const updatedInspections = inspections ? [...inspections] : [];
    if (
      updatedInspections[inspectionIndex].defects &&
      updatedInspections[inspectionIndex].defects[defectIndex]
    ) {
      updatedInspections[inspectionIndex].defects[defectIndex].status = status;

      // Check if all defects are fixed
      const allDefectsFixed = updatedInspections[inspectionIndex].defects.every(
        (defect) => defect.status === "Fixed"
      );

      if (allDefectsFixed) {
        updatedInspections[inspectionIndex].reviewStatus = "Complete";
      } else if (
        updatedInspections[inspectionIndex].reviewStatus === "Complete"
      ) {
        // If inspectionStatus is Complete, change it to Partial Complete
        updatedInspections[inspectionIndex].reviewStatus = "Partial Complete";
      }

      updatedInspections[inspectionIndex].reviewDate = new Date().toISOString(); // Update reviewDate to today's date
    }
    setInspections(updatedInspections);
  };

  const handleInspectionStatusChange = (
    inspectionIndex: number,
    status: string
  ) => {
    const updatedInspections = inspections ? [...inspections] : [];
    if (updatedInspections[inspectionIndex]) {
      const inspection = updatedInspections[inspectionIndex];

      // Check if all defects are fixed
      const allDefectsFixed = inspection.defects
        ? inspection.defects.every((defect) => defect.status === "Fixed")
        : true;

      if (status === "Complete" && !allDefectsFixed) {
        alert(
          "Not all defects are fixed. Setting status to 'Partial Complete'."
        );
        inspection.reviewStatus = "Partial Complete";
      } else {
        inspection.reviewStatus = status;
      }

      inspection.reviewDate = new Date().toISOString(); // Update reviewDate to today's date
    }
    setInspections(updatedInspections);
    console.log(
      "unit inspection status : ",
      updatedInspections[inspectionIndex].reviewStatus
    );
  };

  const handleUnitStatusChange = (status: string) => {
    setUnitStatus(status);
  };

  const handleSave = async () => {
    try {
      const latestInspection =
        inspections && inspections.length > 0 ? inspections[0] : null;
      const updatedUnit = {
        ...unit,
        unitStatus,
        inspections,
        latestInspection,
      };
      await updateUnitStatus(updatedUnit, setIsLoading);
      console.log("Unit updated successfully");
      navigation.navigate("Success", { unit: updatedUnit }); // Navigate to the SuccessScreen
    } catch (error) {
      console.error("Failed to update unit:", error);
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedInspectionIndex(
      expandedInspectionIndex === index ? null : index
    );
  };
  // const sortedInspections = unit.inspections
  //   ? [...unit.inspections].sort((a, b) => {
  //       const dateA = new Date(a.inspectionDate.split("/").reverse().join("-"));
  //       const dateB = new Date(b.inspectionDate.split("/").reverse().join("-"));
  //       return dateB.getTime() - dateA.getTime();
  //     })
  //   : [];
  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.infoContainer}>
          <DisplayLabels label="unit no" text={unit.unitNo} />
          <DisplayLabels label="Type" text={unit.unitType} />
          <DisplayLabels label="Status" text={unit.unitStatus} />
        </View>
        <View style={styles.hr}></View>
        <View style={styles.unitStatusContainer}>
          <Text style={styles.unitStatusLabel}>Update Unit Status:</Text>
          <Picker
            selectedValue={unitStatus}
            style={styles.picker}
            onValueChange={(itemValue) => handleUnitStatusChange(itemValue)}
          >
            <Picker.Item label="Flagged" value="Flagged" />
            <Picker.Item label="RFI" value="RFI" />
            <Picker.Item label="OK" value="OK" />
          </Picker>
        </View>
        <Text style={styles.subText}>Please select a inspection to update</Text>
        {inspections &&
          inspections.map((inspection, inspectionIndex) => (
            <View
              key={inspectionIndex}
              style={[
                styles.inspectionCard,
                {
                  borderLeftColor: getStatusColor(
                    inspection.reviewStatus ?? ""
                  ),
                },
              ]}
            >
              <TouchableOpacity onPress={() => toggleExpand(inspectionIndex)}>
                <Text style={styles.inspectionDate}>
                  Inspection Date:{" "}
                  {new Date(inspection.inspectionDate).toLocaleDateString(
                    "en-GB"
                  )}
                </Text>
                <Text style={styles.reviewStatus}>
                  Review Status: {inspection.reviewStatus || "Not reviewed yet"}
                </Text>
              </TouchableOpacity>
              {expandedInspectionIndex === inspectionIndex && (
                <>
                  <View style={styles.hr}></View>
                  <Text style={styles.label}>Review Status:</Text>
                  <Picker
                    selectedValue={inspection.reviewStatus}
                    onValueChange={(itemValue) =>
                      handleInspectionStatusChange(inspectionIndex, itemValue)
                    }
                  >
                    <Picker.Item label="Reviewed" value="Reviewed" />
                    <Picker.Item label="Pending" value="Pending" />
                    <Picker.Item
                      label="Partial Complete"
                      value="Partial Complete"
                    />
                    <Picker.Item label="Complete" value="Complete" />
                  </Picker>
                  {inspection.defects &&
                    inspection.defects.map((defect, defectIndex) => (
                      <View key={defectIndex} style={styles.defectCard}>
                        <Text style={styles.defectText}>
                          Room: {defect.room}
                        </Text>
                        <Text style={styles.defectText}>
                          Category: {defect.category}
                        </Text>
                        {defect.options.map((option, optionIndex) => (
                          <Text key={optionIndex} style={styles.defectText}>
                            Option: {option.name}
                          </Text>
                        ))}
                        <Text style={styles.label}>Status:</Text>
                        <Picker
                          selectedValue={defect.status}
                          onValueChange={(itemValue) =>
                            handleStatusChange(
                              inspectionIndex,
                              defectIndex,
                              itemValue
                            )
                          }
                        >
                          <Picker.Item label="Fixed" value="Fixed" />
                          <Picker.Item label="Pending" value="Pending" />
                          <Picker.Item label="Reviewed" value="Reviewed" />
                          <Picker.Item
                            label="In Progress"
                            value="In Progress"
                          />
                        </Picker>
                      </View>
                    ))}
                </>
              )}
            </View>
          ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollViewContent: {
    padding: 15,
    paddingBottom: 60, // Add some padding to avoid content being hidden behind the button
  },
  infoContainer: {
    marginBottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  hr: {
    borderBottomWidth: 2,
    borderBottomColor: "#928aff",
    marginVertical: 20,
  },
  unitStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  unitStatusLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  picker: {
    flex: 1,
    height: 40,
  },
  subText: {
    fontSize: 16,
    marginBottom: 5,
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
    borderLeftColor: "#000",
  },
  inspectionDate: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewStatus: {
    fontSize: 14,
    color: "#555",
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
  button: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#007bff",
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UpdateInspection;
