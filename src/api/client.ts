import { setContext } from '@apollo/client/link/context'
import { createHttpLink, ApolloClient, InMemoryCache, ServerError } from '@apollo/client'
import { onError } from "@apollo/client/link/error";
import { useUserStore } from '../store/UserStorage';

const apiUrl = import.meta.env.VITE_API_URL

const httpLink = createHttpLink({
  uri: apiUrl,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("access_token")
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const errorLink = onError(({ networkError }) => {
  const status = (networkError as ServerError)?.statusCode;
  if (status === 401) {
    useUserStore.getState().logout();
    alert("Ha expirado su sesión. Por favor, inicie sesión nuevamente.");
    window.location.href = "/login";
  }
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache()
});
