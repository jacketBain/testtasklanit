import { BASE_URL, commonApi } from "../common/commonApi";
import {
  IBranch,
  IContentRepositoryQuery,
  IRepository,
  IRepositoryContent,
  IRepositoryQuery,
} from "./interface";

export const reposApi = commonApi
  .enhanceEndpoints({
    addTagTypes: ["Repos", "ReposItem", "ReposContent", "ReposBranches"],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllUserRepositories: build.query<IRepository[], string>({
        query: () => ({
          url: `${BASE_URL}/user/repos`,
        }),
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({
                  type: "Repos" as const,
                  id,
                })),
                { type: "Repos", id: "LIST" },
              ]
            : [{ type: "Repos", id: "LIST" }],
      }),
      getUserRepository: build.query<IRepository, IRepositoryQuery>({
        query: (params) => ({
          url: `${BASE_URL}/repos/${params.username}/${params.name}`,
        }),
        providesTags: [{ type: "ReposItem", id: "LIST" }],
      }),
      getUserRepositoryBranches: build.query<IBranch[], IRepositoryQuery>({
        query: (params) => ({
          url: `${BASE_URL}/repos/${params.username}/${params.name}/branches`,
        }),
        providesTags: [{ type: "ReposBranches", id: "LIST" }],
      }),
      getUserRepositoryContent: build.query<
        IRepositoryContent[],
        IContentRepositoryQuery
      >({
        query: (params) => ({
          url: `${BASE_URL}/repos/${params.username}/${params.name}/contents/${params.path}`,
          params: {
            ref: params.branch,
          },
        }),
        providesTags: [{ type: "ReposContent", id: "LIST" }],
      }),
      getUserRepositoryTree: build.query<any, any>({
        query: (params) => ({
          url: `${BASE_URL}/repos/${params.username}/${params.name}/git/trees/master`,
        }),
        providesTags: [{ type: "ReposContent", id: "LIST" }],
      }),
    }),
  });

export const {
  useGetAllUserRepositoriesQuery,
  useGetUserRepositoryQuery,
  useGetUserRepositoryBranchesQuery,
  useGetUserRepositoryTreeQuery,
  useGetUserRepositoryContentQuery,
  useLazyGetUserRepositoryContentQuery,
} = reposApi;
