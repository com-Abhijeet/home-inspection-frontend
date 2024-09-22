import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

interface ProjectCardProps {
  projectId: string | null | undefined;
  projectName: string;
  developerName: string;
  location: string;
  date: string; // Add date prop
  navigation: NavigationProp<any>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectId,
  projectName,
  developerName,
  location,
  date,
  navigation,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate("UnitScreen", { projectId: projectId });
      }}
    >
      <View style={styles.row}>
        <Icon name="home" size={20} color="#000" />
        <Text style={styles.projectName}>{projectName} </Text>
      </View>
      <View style={styles.row}>
        <Icon name="user" size={20} color="#000" />
        <Text style={styles.developerName}>Developer: {developerName}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="map-marker" size={20} color="#000" />
        <Text style={styles.location}>Location: {location}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="calendar" size={20} color="#000" />
        <Text style={styles.date}>Date: {formatDate(date)}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Function to convert MongoDB Date.now() format to DD/MM/YY
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  developerName: {
    fontSize: 16,
    marginLeft: 10,
  },
  location: {
    fontSize: 16,
    marginLeft: 10,
  },
  date: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProjectCard;
