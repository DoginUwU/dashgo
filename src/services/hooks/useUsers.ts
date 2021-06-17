import { useQuery } from "react-query";
import { User } from "../../@types/User";
import { api } from "../api";

interface GetUsersProp {
  users: User[];
  total: number;
}

export async function getUsers(page: number) {
  const { data } = await api.get<GetUsersProp>("users", {
    params: {
      page,
    },
  });

  const totalCount = Number(data.total);

  const users = data.users.map((user) => {
    return {
      ...user,
      createdAt: new Date(user.created_at).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return {
    users,
    totalCount,
  };
}

export async function getUserById(userId: string) {
  const response = await api.get<User>(`users/${userId}`);

  return response.data;
}

export async function createUser(user: User) {
  const response = await api.post(`users`, {
    user: {
      ...user,
      created_at: new Date(),
    },
  });

  return response.data.user;
}

export function useUsers(page: number) {
  return useQuery(["users", page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, //10m,
  });
}
