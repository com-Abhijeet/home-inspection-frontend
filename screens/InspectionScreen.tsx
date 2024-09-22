import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import CategorySelection from "../components/CategorySelection";
import ReviewScreen from "../components/Review";
import ConfirmationScreen from "../components/Confirmation";
import { Unit, Defect, Inspection } from "@/types/types";
import { updateUnit } from "../api/fetchUpdateUnit";
import io from "socket.io-client";
import RepairOptions from "@/data/RepairOptions";
import DisplayLabels from "@/components/ui/DisplayLabels";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigationTypes";
import ProgressBar from "@/components/ui/ProgressBar";
import * as FileSystem from "expo-file-system";
import Loader from "@/components/ui/Loader";

const socket = io("http://192.168.1.2:3000"); // Replace with your actual backend URL

const InspectionScreen = () => {
  const route = useRoute<RouteProp<{ params: { unit: Unit } }, "params">>();
  const { unit } = route.params;
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Inspection">>();
  const data = RepairOptions;

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: boolean;
  }>({});
  const [inspectionData, setInspectionData] = useState<Inspection[]>([]);
  const [updatedUnit, setUpdatedUnit] = useState<Unit>(unit);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    socket.on("unitUpdated", (updatedUnit) => {
      if (updatedUnit.unitNo === unit.unitNo) {
        setUpdatedUnit(updatedUnit);
      }
    });

    return () => {
      socket.off("unitUpdated");
    };
  }, []);

  useEffect(() => {
    const newInspection: Inspection = {
      inspectionDate: new Date().toISOString(),
      defects: [],
    };
    setInspectionData([newInspection]);
  }, []);

  const handleSelectedRoom = (room: string) => {
    setSelectedRoom(selectedRoom === room ? null : room);
  };

  const handleCheckboxChange = (
    room: string,
    category: string,
    option: string,
    value: boolean
  ) => {
    const key = `${room}-${category}-${option}`;
    console.log(key);
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: value,
    }));

    setInspectionData((prevInspections) => {
      const updatedInspections = [...prevInspections];
      const inspectionIndex = 0;

      const defectIndex = updatedInspections[
        inspectionIndex
      ].defects?.findIndex(
        (defect) => defect.room === room && defect.category === category
      );

      if (defectIndex !== undefined && defectIndex !== -1) {
        const optionIndex = updatedInspections[inspectionIndex].defects![
          defectIndex
        ].options.findIndex((opt) => opt.name === option);

        if (optionIndex !== -1) {
          if (value) {
            updatedInspections[inspectionIndex].defects![defectIndex].options[
              optionIndex
            ].name = option;

            console.log(
              "option is : ",
              updatedInspections[inspectionIndex].defects![defectIndex].options[
                optionIndex
              ].name
            );
          } else {
            updatedInspections[inspectionIndex].defects![
              defectIndex
            ].options.splice(optionIndex, 1);
          }
        } else if (value) {
          updatedInspections[inspectionIndex].defects![
            defectIndex
          ].options.push({
            name: option,
            status: "",
          });
        }
      } else if (value) {
        updatedInspections[inspectionIndex].defects?.push({
          room,
          category,
          options: [
            {
              name: option,
              status: "",
            },
          ],
          status: "Pending",
        });
      }

      return updatedInspections;
    });
  };

  const handleAddImage = async (
    room: string,
    category: string,
    option: string,
    uri: string
  ) => {
    try {
      const fileInfo = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const base64String = `data:image/jpeg;base64,${fileInfo}`;

      if (!base64String.startsWith("data:image/jpeg;base64,")) {
        console.error("Invalid base64 string for image");
        return;
      }

      setInspectionData((prevInspections) => {
        const updatedInspections = [...prevInspections];
        const inspectionIndex = 0;

        const defectIndex = updatedInspections[
          inspectionIndex
        ].defects?.findIndex(
          (defect) => defect.room === room && defect.category === category
        );

        if (defectIndex !== undefined && defectIndex !== -1) {
          const optionIndex = updatedInspections[inspectionIndex].defects![
            defectIndex
          ].options.findIndex((opt) => opt.name === option);

          if (optionIndex !== -1) {
            updatedInspections[inspectionIndex].defects![defectIndex].options[
              optionIndex
            ].localUri = base64String;
          } else {
            updatedInspections[inspectionIndex].defects![
              defectIndex
            ].options.push({
              name: option,
              localUri: base64String,
              status: "",
            });
          }
        } else {
          updatedInspections[inspectionIndex].defects?.push({
            room,
            category,
            options: [
              {
                name: option,
                localUri: base64String,
                status: "",
              },
            ],
            status: "Pending",
          });
        }

        return updatedInspections;
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };

  const handleRemoveOption = (
    room: string,
    category: string,
    option: string
  ) => {
    handleCheckboxChange(room, category, option, false);
  };

  const handleSubmit = async () => {
    const hasDefects = inspectionData.some(
      (inspection) => inspection.defects && inspection.defects.length > 0
    );

    const newInspection = inspectionData[0];

    const newUpdatedUnit = {
      unitNo: unit.unitNo,
      unitStatus: "Flagged",
      latestInspection: hasDefects ? newInspection : null,
    };

    // Log the inspection data
    console.log(
      "Inspection data before submission:",
      JSON.stringify(inspectionData, null, 2)
    );

    try {
      const updatedUnitFromServer = await updateUnit(
        newUpdatedUnit,
        setIsLoading
      );
      setUpdatedUnit(updatedUnitFromServer);
      setSelectedRoom(null);
      setSelectedOptions({});
      navigation.navigate("Success", { unit: updatedUnitFromServer });
    } catch (error) {
      console.error("Failed to update unit:", error);
    }
  };
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
        <ProgressBar step={step} />

        {step === 1 && (
          <CategorySelection
            data={data}
            selectedRoom={selectedRoom}
            selectedOptions={selectedOptions}
            handleSelectedRoom={handleSelectedRoom}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}
        {step === 2 && (
          <ReviewScreen
            inspectionData={inspectionData}
            handleRemoveOption={handleRemoveOption}
            handleAddImage={handleAddImage}
          />
        )}
        {step === 3 && (
          <ConfirmationScreen
            inspectionData={inspectionData}
            handleSubmit={handleSubmit}
          />
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity
            style={[
              styles.button,
              styles.backButton,
              step === 2 && styles.backButtonWithMargin,
            ]}
            onPress={() => setStep(step - 1)}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        {step < 3 && (
          <TouchableOpacity
            style={[styles.button, step === 2 && styles.nextButtonWithMargin]}
            onPress={() => setStep(step + 1)}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: "#ffffff",
  },
  scrollViewContent: {
    padding: 15,
    paddingBottom: 60, // Add some padding to avoid content being hidden behind the button
  },
  infoContainer: {
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  hr: {
    borderBottomWidth: 2,
    borderBottomColor: "#928aff",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 15,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    alignItems: "center",
    flex: 1,
    // marginHorizontal: 5,
  },
  backButton: {
    backgroundColor: "#c61b1b",
  },
  backButtonWithMargin: {
    marginRight: 5,
    borderTopRightRadius: 15,
  },
  nextButtonWithMargin: {
    marginLeft: 5,
    borderTopLeftRadius: 15,
  },
  nextButton: {
    marginLeft: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InspectionScreen;
