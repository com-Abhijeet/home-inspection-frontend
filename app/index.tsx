import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import StackNavigator from "../components/navigation/StackNavigator";
import { UserProvider } from "@/contexts/userContext";
import { ProjectProvider } from "@/contexts/projectContext";
import Background from "@/components/Background";
import ErrorBoundary from "@/components/errorBoundry/ErrorBoundry";
import useUserLoggedIn from "@/hooks/useUserLoggedIn";
import { UnitsProvider } from "@/contexts/unitsContext";

export default function Page() {
  const isLoggedIn = useUserLoggedIn();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Page component useEffect triggered");
    const timer = setTimeout(() => {
      if (isLoggedIn !== null) {
        setIsLoading(false);
      }
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [isLoggedIn]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <UserProvider>
      <UnitsProvider>
        <ProjectProvider>
          <ErrorBoundary>
            <SafeAreaView style={styles.container}>
              <StackNavigator isLoggedIn={isLoggedIn} />
            </SafeAreaView>
          </ErrorBoundary>
        </ProjectProvider>
      </UnitsProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
