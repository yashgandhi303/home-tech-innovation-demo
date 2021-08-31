import { ApolloProvider } from '@apollo/react-hooks'
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from 'apollo-boost'
import { ErrorResponse, onError } from 'apollo-link-error'
import withApollo from 'next-with-apollo'
import NextApp from 'next/app'
import React from 'react'
import { initCache } from '../lib/apollo/init-cache'
import { GraphQLError } from 'graphql'
import '../css/tailwind.scss'

interface Props {
  apollo: ApolloClient<{}>;
}

class App extends NextApp<Props> {
  render(): JSX.Element  {
    const { Component, pageProps, apollo } = this.props

    return (
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  }
}

interface GraphQLErrorExtend extends GraphQLError {
  statusCode?: number;
}

interface ExtendError extends ErrorResponse {
  graphQLErrors?: readonly GraphQLErrorExtend[];
}

const errorLink = onError(({ graphQLErrors }: ExtendError) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, statusCode }) => {
      console.log('message: ', message)
      if (statusCode === 401) {
        // signOut(client)
      }
    })
  }
})

const authLink = new ApolloLink((operation, forward) => {
  if (typeof window === 'undefined') {
    return forward(operation)
  }

  const token = localStorage.getItem('token')

  if (token) {
    const authorization = `Bearer ${token}`

    operation.setContext({
      headers: { authorization }
    })
  }

  return forward(operation)
})

const httpLink = new HttpLink({
  uri: 'https://countries.trevorblades.com',
  credentials: 'same-origin',
  fetch
})

export default withApollo(
  ({ initialState }) => {
    const cache = initCache(new InMemoryCache().restore(initialState || {}))
    const client = new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: errorLink.concat(authLink.concat(httpLink)),
      resolvers: {},
      defaultOptions: {
        query: {
          errorPolicy: 'all'
        }
      },
      cache
    })

    client.onResetStore(async () => cache.writeData(initialState || {}))
    return client
  },
  {
    /* eslint-disable react/display-name */
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      )
    }
  }
)(App)
