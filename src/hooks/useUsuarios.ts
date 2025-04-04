import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import { LOGIN_ADMIN, LOGIN_PERSONAL, LOGIN_TEACHER } from "../graphql/mutations/login"
import { GET_USUARIOS } from "../graphql/queries/getUsers"
import { useUserStore } from "../store/UserStorage"
import { client } from "../api/client" // Tu configuración de ApolloClient

export type LoginData = {
  email: string
  password: string
}

export type LoginResponse = {
  access_token: string
}

export const useUsuarios = {
  loginAdmin: async (data: LoginData): Promise<LoginResponse> => {
    const { data: response } = await client.mutate({
      mutation: LOGIN_ADMIN,
      variables: data,
    })
    const access_token = response.loginAdmin.access_token
    useUserStore.getState().setUserData({
      access_token,
      role: "admin",
      email: data.email,
    })
    return { access_token }
  },

  loginPersonal: async (data: LoginData): Promise<LoginResponse> => {
    const { data: response } = await client.mutate({
      mutation: LOGIN_PERSONAL,
      variables: data,
    })
    const access_token = response.loginParent.access_token
    useUserStore.getState().setUserData({
      access_token,
      role: "parent",
      email: data.email,
    })
    return { access_token }
  },

  loginTeacher: async (data: LoginData): Promise<LoginResponse> => {
    const { data: response } = await client.mutate({
      mutation: LOGIN_TEACHER,
      variables: data,
    })
    const access_token = response.loginTeacher.access_token
    useUserStore.getState().setUserData({
      access_token,
      role: "teacher",
      email: data.email,
    })
    return { access_token }
  },

  obtenerUsuarios: async () => {
    const token = useUserStore.getState().getAccessToken()

    const authClient = new ApolloClient({
      uri: import.meta.env.VITE_API_URL,
      cache: new InMemoryCache(),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const { data } = await authClient.query({
      query: GET_USUARIOS,
      fetchPolicy: "network-only",
    })

    return data.obtenerUsuarios
  },
}
