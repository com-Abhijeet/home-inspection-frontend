import React, { createContext, useContext, useState, ReactNode } from "react";

interface Project {
  createdAt: string;
  _id: string | null | undefined;
  id: string;
  name: string;
  developer: string;
  location: string;
}

interface ProjectContextType {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
