import { useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { CountryProps } from './types'

const COUNTRY = gql`
  query country($code: ID!) {
    country(code: $code) {
      name
      currency
      languages {
        code
        name
        native
        rtl
      }
    }
  }
`

export const useCountry = () => {
  const [country, setCountry] = useState<CountryProps>({})
  const [countryLoading, setCountryLoading] = useState(false)
  const [countryError, setCountryError] = useState(null)
  const [countryErrorMessage, setCountryErrorMessage] = useState('')

  const [getCountryQuery]: any = useLazyQuery(COUNTRY, {
    onCompleted: (data) => {
      setCountry(data?.country)
      setCountryLoading(false)
      setCountryError(null)
      setCountryErrorMessage('')
    },
    onError: (error: any) => {
      console.log(error)
      setCountry({})
      setCountryLoading(false)
      setCountryError(error)
      setCountryErrorMessage(error?.message)
    },
  })

  const getCountry = (selectedCountry: string) => {
    console.log(selectedCountry)

    setCountryLoading(true)
    getCountryQuery({
      variables: {
        code: selectedCountry,
      },
    })
  }

  return {
    country,
    countryError,
    countryLoading,
    countryErrorMessage,
    getCountry,
  }
}
