import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Unit } from "@/types/types";
import DisplayLabels from "@/components/ui/DisplayLabels";
import InspectionHistory from "@/components/InspectionHistory"; // Assuming this is a valid import
import { RootStackParamList } from "@/types/navigationTypes"; // Import the navigation types
import { StackNavigationProp } from "@react-navigation/stack"; // Import StackNavigationProp
import { useUser } from "@/contexts/userContext";

const ViewUnit = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ViewUnit">>();
  const unit = route.params.unit;
  const { user } = useUser();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "ViewUnit">>();

  const handleStartInspection = () => {
    if (user?.role === "QA") {
      navigation.navigate("Inspection", { unit });
    } else {
      navigation.navigate("UpdateInspection", { unit });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.infoContainer}>
          <DisplayLabels label="unit no" text={unit.unitNo} />
          <DisplayLabels label="Type" text={unit.unitType} />
          <DisplayLabels label="Status" text={unit.unitStatus} />
        </View>
        <View style={styles.hr}></View>
        <InspectionHistory unit={unit} />
      </ScrollView>
      {user?.role === "QA" ? (
        <TouchableOpacity style={styles.button} onPress={handleStartInspection}>
          <Text style={styles.buttonText}>Start Inspection</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleStartInspection}>
          <Text style={styles.buttonText}>Review & Update</Text>
        </TouchableOpacity>
      )}
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
    paddingBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  hr: {
    borderBottomWidth: 2,
    borderBottomColor: "#928aff",
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

export default ViewUnit;
