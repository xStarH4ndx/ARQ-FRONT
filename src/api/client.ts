import { setContext } from '@apollo/client/link/context'
import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client'

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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
