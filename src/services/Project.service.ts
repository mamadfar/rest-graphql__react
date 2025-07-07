import type { IResponse } from "../types/Common.type";
import type { IProject } from "../types/Project.type";
import { axiosInstance } from "../utils/axios.util";

export const getProjects = async (
  signal?: AbortSignal
): Promise<IProject[]> => {
  return axiosInstance.get(`/posts`, { signal });
};

export const getProjectById = async (
  id: number,
  signal?: AbortSignal
): Promise<IResponse<IProject>> => {
  return axiosInstance.get(`/posts/${id}`, { signal });
};

export const createProject = async (
  newProject: Omit<IProject, "id">,
  signal?: AbortSignal
): Promise<IResponse<IProject>> => {
  return axiosInstance.post(`/posts`, newProject, { signal });
};

export const updateProject = async (
  id: number,
  updatedProject: Partial<IProject>,
  signal?: AbortSignal
): Promise<IResponse<IProject>> => {
  return axiosInstance.put(`/posts/${id}`, updatedProject, { signal });
};

export const deleteProject = async (
  id: number,
  signal?: AbortSignal
): Promise<IResponse<null>> => {
  return axiosInstance.delete(`/posts/${id}`, { signal });
};
