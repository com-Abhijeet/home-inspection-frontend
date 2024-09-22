import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigationTypes"; // Import the navigation types
import { useUser } from "@/contexts/userContext";
import { useUnits } from "@/contexts/unitsContext";
import fetchUnits from "@/api/fetchUnits";

type SuccessScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Success"
>;
type SuccessScreenRouteProp = RouteProp<RootStackParamList, "Success">;

type Props = {
  navigation: SuccessScreenNavigationProp;
  route: SuccessScreenRouteProp;
};

const SuccessScreen: React.FC<Props> = ({ route, navigation }) => {
  const { unit } = route.params;
  const { units, setUnits } = useUnits();
  const [unitsFetched, setUnitsFetched] = useState(false);
  const projectId = unit.projectId;
  const unitsFetchedRef = useRef(false); // Use useRef to track if units have been fetched
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUnits = async () => {
      if (!unitsFetchedRef.current) {
        try {
          const fetchedUnits = await fetchUnits(projectId, setIsLoading);
          setUnits(fetchedUnits);
          unitsFetchedRef.current = true; // Set ref to true after fetching
        } catch (error) {
          console.error("Failed to fetch units", error);
        }
      }
    };

    loadUnits();
  }, [projectId, setUnits]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("UnitScreen", { projectId: projectId });
    }, 3000); // Duration of the animation

    return () => clearTimeout(timer);
  }, [navigation, unit]);

  return (
    <View style={styles.container}>
      {/* <LottieView
        source={require("@/assets/success.json")} // Path to your Lottie animation file
        autoPlay
        loop={false}
        style={styles.animation}
      /> */}
      <Text style={styles.text}>Update Successful!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  animation: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default SuccessScreen;
