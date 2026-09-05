import { useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryClient } from "../../../app/queryClient";
import { createProjectService, deleteProjectService, getProjectByIdService, getProjectListService, getStarredProjectListService, toggleProjectStarService } from "../services/project.api.service";
import type { CreateProjectInputType, ProjectResponseType, ProjectType } from "../types";

const ProjectSessionKeys = ["project", "session"] as const;
const StarredProjectKeys = ["project", "starred"] as const;
const signleProjectInfoKey = (projectId: string) => ["project", "info", projectId] as const;
/**
 * @useCreateProjectMutation
 * @description create project
 * @returns {UseMutationResult<ProjectResponseType, Error, CreateProjectInputType>}
 */
export const useCreateProjectMutation = (): UseMutationResult<ProjectResponseType, Error, CreateProjectInputType> => {
    return useMutation<ProjectResponseType, Error, CreateProjectInputType>({
        mutationFn: async ({ name, description }: CreateProjectInputType) => {
            const response = await createProjectService(name, description);
            if (typeof response === "string") throw new Error(response);
            return response;
        },
        onSuccess: (data: ProjectResponseType) => {
            toast.success(data.message);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ProjectSessionKeys })
        }
    })
}

export const useGetProjectListQuery = (): UseQueryResult<ProjectType[], Error> => {
    const cacheData = queryClient.getQueryData<ProjectType[]>(ProjectSessionKeys);
    return useQuery<ProjectType[], Error>({
        queryKey: ProjectSessionKeys,
        queryFn: async () => {
            const response = await getProjectListService();
            if (typeof response === "string") throw new Error(response);
            return response;
        },
        initialData: cacheData,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5
    })
}

export const useGetStarredProjectListQuery = (): UseQueryResult<ProjectType[], Error> => {
    const cacheData = queryClient.getQueryData<ProjectType[]>(StarredProjectKeys);
    return useQuery({
        queryKey: StarredProjectKeys,
        queryFn: async () => {
            const response = await getStarredProjectListService();
            if (typeof response === "string") throw new Error(response);
            return response;
        },
        initialData: cacheData,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5
    })
}

export const useGetSingleProjectInformationQuery = (projectId: string): UseQueryResult<ProjectType, Error> => {
    const cacheData = queryClient.getQueryData<ProjectType>(signleProjectInfoKey(projectId));
    return useQuery<ProjectType, Error>({
        queryKey: signleProjectInfoKey(projectId),
        queryFn: async () => {
            const response = await getProjectByIdService(projectId);
            if (typeof response === "string") throw new Error(response);
            return response;
        },
        initialData: cacheData,
        enabled: !!projectId,
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5 // 5 minutes
    })
}

export const useToggleStarProjectMutation = (projectId: string): UseMutationResult<ProjectResponseType, Error, void> => {
    return useMutation<ProjectResponseType, Error>({
        mutationFn: async () => {
            const response = await toggleProjectStarService(projectId);
            if (typeof response === "string") throw new Error(response);
            return response;
        },
        onSuccess: (data: ProjectResponseType) => {
            toast.success(data.message);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ProjectSessionKeys });
            queryClient.invalidateQueries({ queryKey: signleProjectInfoKey(projectId) });
        }
    })

}

export const useDeleteProjectMutation = (projectId: string): UseMutationResult<ProjectResponseType, Error, void> => {
    return useMutation<ProjectResponseType, Error, void>({
        mutationFn: async () => {
            const response = await deleteProjectService(projectId);
            if (typeof response === "string") throw new Error(response);
            return response;
        },
        onSuccess: (data: ProjectResponseType) => {
            toast.success(data.message);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ProjectSessionKeys });
            queryClient.invalidateQueries({ queryKey: StarredProjectKeys });
            queryClient.invalidateQueries({
                queryKey: signleProjectInfoKey(projectId),
            });
        }
    })
}