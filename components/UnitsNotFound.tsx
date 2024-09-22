import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { StyleSheet, Text, View } from "react-native";

const UnitsNotFound = () => {
  return (
    <View style={styles.container}>
      <Icon
        name="exclamation-triangle"
        size={30}
        color="#900"
        style={styles.icon}
      />
      <Text style={styles.text}>Unit not found</Text>
      <Text style={styles.subtext}>Please Contact Project Manager </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  icon: {
    marginBottom: 10,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 16,
    color: "#5b5b5b",
  },
});

export default UnitsNotFound;
