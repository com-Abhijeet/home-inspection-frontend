import React, { useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useProjects } from "../contexts/projectContext";
import ProjectCard from "../components/ProjectCard";
import { useUser } from "../contexts/userContext";
import fetchProjects from "../api/fetchProjects";
import { useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

const ProjectScreen = () => {
  const { projects, setProjects } = useProjects();
  const { user } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      fetchProjects(user._id)
        .then((projects) => {
          setProjects(projects);
        })
        .catch((error) => {
          console.error("Unhandled promise rejection:", error);
        });
    }
  }, [user]);

  return (
    <View>
      <View style={styles.headerContainer}>
        <Icon name="file" style={styles.icon} />
        <Text style={styles.header}>My Projects</Text>
      </View>
      <ScrollView>
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              projectId={project._id}
              projectName={project.name}
              developerName={project.developer}
              location={project.location}
              date={project.createdAt}
              navigation={navigation}
            />
          ))
        ) : (
          <View>
            <Text>No projects available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#ffe5e5",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    elevation: 20,
  },
  icon: {
    fontSize: 22,
    paddingHorizontal: 10,
    color: "#5405ff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProjectScreen;
