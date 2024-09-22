import { baseUrl } from "./baseUrl";

const fetchProjects = async (userId: string) => {
  try {
    const response = await fetch(`${baseUrl}/project/getprojects/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.projects; // Return the projects
    } else {
      console.error("Failed to fetch projects");
      return [];
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export default fetchProjects;
