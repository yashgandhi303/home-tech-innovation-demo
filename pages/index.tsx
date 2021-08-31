import React, { useState } from 'react'
import { NextPage } from 'next'
import classnames from 'classnames'
import { css } from 'linaria'
import { useCountries } from 'hook'
import { Head, CountryDetails } from '../components'

const Home: NextPage<any> = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const {
    countries,
    countryError,
    countryLoading,
    emptyCountriesList,
    countryErrorMessage,
    getCountriesBySearchKey,
  } = useCountries()

  if (countryError) {
    <>{countryErrorMessage}</>
  }

  const handleOnChange = (event: any) => {
    const inputText: string = event?.target?.value
    if (inputText.length >= 2) {
      getCountriesBySearchKey(inputText.toUpperCase())
      return
    }
    if (!inputText.length) {
      emptyCountriesList()
      getCountriesBySearchKey('')
      setSelectedCountry('')
    }
  }

  const handleOnSelectCountry = (code: string) => setSelectedCountry(code)

  return (
    <div className='h-screen container mx-auto'>
      <Head title='React - Tailwind - Apollo' />
      <h1 className='text-2xl text-center mx-auto m-4'>
        React - Tailwind - Apollo GraphQL in Next.js with Server Side Rendering
      </h1>

      <div className='p-8'>
        <div className='bg-white flex items-center rounded-full shadow-xl'>
          <input
            className='rounded-l-full w-full 
            py-4 px-6 text-gray-700 
            leading-tight focus:outline-none'
            id='search'
            type='text'
            placeholder='Search Country Code...'
            onChange={handleOnChange}
          />
          <div className='p-4'>
            <button
              className='bg-blue-500 rounded-full text-white p-2 
            hover:bg-blue-400 focus:outline-none 
            w-12 h-12 flex items-center justify-center'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {' '}
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />{' '}
              </svg>
            </button>
          </div>
        </div>
        {(countries && countries?.length > 0 && (
          <div className=''>
            {countries.map((data: any) => (
              <ul
                className='ml-0 md:list-disc'
                key={data?.code}
                onClick={() => handleOnSelectCountry(data?.code)}
              >
                <li
                  className={classnames([
                    'cursor-pointer p-2 m-2',
                    'text-primary l1rhmy4 transition duration-500',
                    'ease-in-out transform hover:-translate-y-1',
                    'hover:shadow-lg rounded-full-sm px-3 py-3',
                    'cursor-pointer hover:text-white hover:bg-blue-600',
                    'p-2 m-2 text-primary',
                    css`
                      margin-left: 24px;
                    `,
                  ])}
                >
                  {data?.name}
                </li>
              </ul>
            ))}
          </div>
        )) ||
          (countryLoading && 'Loading...')}
      </div>
      {selectedCountry && <CountryDetails countryCode={selectedCountry} />}
    </div>
  )
}

export default Home
