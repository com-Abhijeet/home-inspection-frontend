import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import units from "../data/Units"; // Import the units array
import { Picker } from "@react-native-picker/picker";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import fetchUnits from "@/api/fetchUnits";
import UnitsNotFound from "../components/UnitsNotFound";
import { getStatusColor } from "@/hooks/useGetStatusColor";
import { Unit } from "@/types/types";
import { useUnits } from "@/contexts/unitsContext";
import Loader from "@/components/ui/Loader";

const UnitScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  // const [units, setUnits] = useState<Unit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [viewType, setViewType] = useState("serial");
  const route =
    useRoute<RouteProp<{ params: { projectId: string } }, "params">>();
  const { projectId } = route.params;
  const { units, setUnits } = useUnits();
  const unitsFetchedRef = useRef(false); // Use useRef to track if units have been fetched
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect triggered");
    console.log("projectId:", projectId);
    console.log("unitsFetchedRef.current:", unitsFetchedRef.current);

    const loadUnits = async () => {
      if (!unitsFetchedRef.current) {
        try {
          console.log("Fetching units...");
          const fetchedUnits = await fetchUnits(projectId, setIsLoading);
          setUnits(fetchedUnits);
          unitsFetchedRef.current = true; // Set ref to true after fetching
          console.log("Units fetched successfully");
        } catch (error) {
          console.error("Failed to fetch units", error);
        }
      }
    };

    loadUnits();
  }, [projectId, units]);

  const groupedUnits = units.reduce((acc: { [key: string]: Unit[] }, unit) => {
    if (!acc[unit.unitStatus]) {
      acc[unit.unitStatus] = [];
    }
    acc[unit.unitStatus].push(unit);
    return acc;
  }, {});

  const sortedUnits = [...units].sort((a, b) => {
    const statusOrder = ["RFI", "OK", "DMG"];
    return (
      statusOrder.indexOf(a.unitStatus) - statusOrder.indexOf(b.unitStatus)
    );
  });

  const groupedByFloor = units.reduce(
    (acc: { [key: string]: Unit[] }, unit) => {
      const floor = Math.floor(parseInt(unit.unitNo) / 100).toString();
      if (!acc[floor]) {
        acc[floor] = [];
      }
      acc[floor].push(unit);
      return acc;
    },
    {}
  );

  // console.log(units.length);
  if (isLoading && units.length === 0) {
    console.log(isLoading);
    return <Loader />;
    // return <Loader />;
  }
  if (!isLoading && units.length === 0) {
    return <UnitsNotFound />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.unitHeader}>Please select the inspection unit!</Text>

      <Picker
        selectedValue={viewType}
        style={styles.picker}
        onValueChange={(itemValue) => setViewType(itemValue)}
      >
        <Picker.Item label="Floor View" value="serial" />
        <Picker.Item label="Status View" value="sorted" />
      </Picker>

      <View style={styles.unitContainer}>
        {viewType === "serial"
          ? Object.keys(groupedByFloor).map((floor) => (
              <View key={floor} style={styles.statusGroup}>
                <Text style={styles.statusHeader}>Floor {floor}</Text>
                <View style={styles.unitGroup}>
                  {groupedByFloor[floor].map((unit) => (
                    <TouchableOpacity
                      key={unit.unitNo}
                      style={[
                        styles.unitCard,
                        { borderColor: getStatusColor(unit.unitStatus) },
                      ]}
                      onPress={() =>
                        navigation.navigate("ViewUnit", {
                          unit,
                        })
                      }
                    >
                      <Text style={styles.unitCardText}>{unit.unitNo}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))
          : Object.keys(groupedUnits).map((status) => (
              <View key={status} style={styles.statusGroup}>
                <Text style={styles.statusHeader}>{status}</Text>
                <View style={styles.unitGroup}>
                  {groupedUnits[status].map((unit) => (
                    <TouchableOpacity
                      key={unit.unitNo}
                      style={[
                        styles.unitCard,
                        { borderColor: getStatusColor(unit.unitStatus) },
                      ]}
                      onPress={() =>
                        navigation.navigate("ViewUnit", {
                          unit,
                        })
                      }
                    >
                      <Text style={styles.unitCardText}>{unit.unitNo}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  unitHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "50%",
    marginBottom: 20,
  },
  unitContainer: {
    marginBottom: 30,
  },
  statusGroup: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#636363",
    padding: 10,
    borderRadius: 10,
  },
  statusHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    paddingBottom: 5,
    textDecorationLine: "underline",
  },
  unitGroup: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  unitCard: {
    width: "22%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  unitCardText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#332e2e",
  },
});

export default UnitScreen;
