import React, { useEffect } from 'react'
import { useCountry } from 'hook'

interface Props {
  countryCode: string;
}

export const CountryDetails: React.FC<Props> = ({ countryCode }) => {
  const {
    country,
    getCountry,
    countryError,
    countryLoading,
    countryErrorMessage,
  } = useCountry()

  if (countryError || !countryCode) {
    <>{countryErrorMessage}</>
  }

  if (countryLoading) {
    <>{'Loading...'}</>
  }

  useEffect(() => {
    if (countryCode) {
      getCountry(countryCode)
    }
  }, [countryCode])

  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-lg'>
      <div className='px-4 py-5 sm:px-6'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          Country Details
        </h3>
      </div>
      <div className='border-t border-gray-200'>
        <dl>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              Name of the country
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {country?.name}
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              The capital of the country
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {country?.capital}
            </dd>
          </div>
          <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>Currency</dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              {country?.currency}
            </dd>
          </div>
          <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
            <dt className='text-sm font-medium text-gray-500'>
              List of languages used
            </dt>
            <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
              <ul
                role='list'
                className='border border-gray-200 rounded-md divide-y divide-gray-200'
              >
                {country?.languages?.map((language: any, index: number) => (
                  <li
                    key={index}
                    className='pl-3 pr-4 py-3 flex 
                  items-center justify-between text-sm'
                  >
                    <div className='w-0 flex-1 flex items-center'>
                      <svg
                        className='flex-shrink-0 h-5 w-5 text-gray-400'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fillRule='evenodd'
                          d='M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 
                          0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 
                          0v4a1 1 0 102 0V7a3 3 0 00-3-3z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <span className='ml-2 flex-1 w-0 truncate'>
                        [{language?.code}] : {language?.name}
                      </span>
                    </div>
                    <div className='ml-4 flex-shrink-0'>
                      <a
                        href='#'
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                      >
                        {language?.native}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
