import { useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { CountryProps } from './types'

const COUNTRIES = gql`
  query countries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      name
      code
    }
  }
`

export const useCountries = () => {
  const [countries, setCountries] = useState<Array<CountryProps>>([])
  const [countryLoading, setCountryLoading] = useState(false)
  const [countryError, setCountryError] = useState(null)
  const [countryErrorMessage, setCountryErrorMessage] = useState('')

  const [getCountriesQuery]: any = useLazyQuery(COUNTRIES, {
    onCompleted: (data) => {
      const retrievedCountries: Array<CountryProps> = data?.countries || []
      setCountries(retrievedCountries)
      setCountryLoading(false)
      setCountryError(null)
      setCountryErrorMessage('')
    },
    onError: (error: any) => {
      console.log(error)
      setCountries([])
      setCountryLoading(false)
      setCountryError(error)
      setCountryErrorMessage(error?.message)
    },
  })

  const getCountriesBySearchKey = (searchKey: string) => {
    setCountryLoading(true)
    getCountriesQuery({
      variables: {
        filter: {
          code: {
            in: searchKey,
          },
        },
      },
    })
  }

  const emptyCountriesList = () => {
    setCountries([])
  }

  return {
    countries,
    countryError,
    countryLoading,
    emptyCountriesList,
    countryErrorMessage,
    getCountriesBySearchKey,
  }
}
