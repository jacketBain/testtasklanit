import { IUser } from "../auth/interface";
import { commonApi } from "../common/commonApi";
import { BASE_URL } from "../http";

export const userApi = commonApi
  .enhanceEndpoints({ addTagTypes: ["User"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getUser: build.query<IUser, string | null>({
        query: () => ({
          url: `${BASE_URL}/user`,
        }),
      }),
    }),
  });

export const { useGetUserQuery } = userApi;
