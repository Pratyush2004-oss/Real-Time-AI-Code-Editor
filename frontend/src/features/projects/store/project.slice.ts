import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProjectState, ProjectType } from "../types";

const initialState: ProjectState = {
    projectList: [],
    starredProjects: [],
    selectedProject: null
}

const ProjectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setProjectList: (state, action: PayloadAction<ProjectType[]>) => {
            state.projectList = action.payload
        },
        setSelectedProject: (state, action: PayloadAction<ProjectType>) => {
            state.selectedProject = action.payload
        },
        setStarredProjects: (state, action: PayloadAction<ProjectType[]>) => {
            state.starredProjects = action.payload
        },
    }
})

export const { setProjectList, setSelectedProject, setStarredProjects } = ProjectSlice.actions;

export default ProjectSlice.reducer;