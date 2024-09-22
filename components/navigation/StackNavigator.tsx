import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import LoginScreen from "../../screens/LoginScreen";
import UnitScreen from "../../screens/UnitScreen";
import ProjectScreen from "@/screens/ProjectScreen";
import InspectionScreen from "@/screens/InspectionScreen";
import ViewUnit from "../../screens/ViewUnit";
import UpdateInspection from "@/screens/UpdateInspection";
import SuccessScreen from "@/screens/SuccessScreen";
import { RootStackParamList } from "@/types/navigationTypes"; // Import the navigation types
import ViewImages from "../ViewImages";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator<RootStackParamList>();

interface StackNavigatorProps {
  isLoggedIn: boolean;
}

const StackNavigator: React.FC<StackNavigatorProps> = ({ isLoggedIn }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("token");
              navigation.navigate("Login");
            } catch (error) {
              console.error("Error removing token:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? "Projects" : "Login"} // Set initial route based on user existence
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: "center",
        headerTitle: "Home Inspection",
        headerStatusBarHeight: 5, // Set the app name as the header title
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="sign-out-alt" color="red" style={styles.logoutButton} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }} // Hide header for LoginScreen
      />
      <Stack.Screen name="UnitScreen" component={UnitScreen} />
      <Stack.Screen name="Projects" component={ProjectScreen} />
      <Stack.Screen name="ViewUnit" component={ViewUnit} />
      <Stack.Screen name="Inspection" component={InspectionScreen} />
      <Stack.Screen name="UpdateInspection" component={UpdateInspection} />
      <Stack.Screen name="Success" component={SuccessScreen} />
      <Stack.Screen name="ViewImages" component={ViewImages} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f8f8f8",
  },
  headerTitle: {
    fontWeight: "bold",
  },
  logoutButton: {
    marginRight: 15,
    fontSize: 18,
  },
});

export default StackNavigator;
