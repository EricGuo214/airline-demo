import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import image1 from '../image1.jpg';
import { set, useForm } from 'react-hook-form';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

function Step1({setAirline, setFlightNumber, airline, flightNumber, setAirlineQuery, setFlightQuery, filteredAirlines, filteredFlights, handleNextStep}) {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
      } = useForm();
    
    return (
      <>
      <div className="step-container page-1 bg-white">
        <div className="image-placeholder">
          <img src={image1} alt="Image 1" className="rounded-full w-36 h-36 object-cover mx-auto mb-5" />
        </div>
        <div className="input-container flex justify-center items-center space-x-4 absolute inset-x-0 top-1/2">
          <Combobox as="div" value={airline} onChange={setAirline}>
            <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Select Airline</Combobox.Label>
            <div className="relative mt-2">
              <ComboboxInput
                className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                onChange={(event) => setAirlineQuery(event.target.value)}
                displayValue={(airline) => airline?.name}
              />
              <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </ComboboxButton>

              {filteredAirlines.length > 0 && (
                <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredAirlines.map((airline) => (
                    <ComboboxOption
                      key={airline.id}
                      value={airline}
                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-red-600 data-[focus]:text-white"
                    >
                      <span className="block truncate group-data-[selected]:font-semibold">{airline.name}</span>
                      <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-red-600 group-data-[selected]:flex group-data-[focus]:text-white">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              )}
            </div>
          </Combobox>

          <Combobox as="div" value={flightNumber} onChange={setFlightNumber}>
            <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Select Flight Number</Combobox.Label>
            <div className="relative mt-2">
              <ComboboxInput
                className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                onChange={(event) => setFlightQuery(event.target.value)}
                displayValue={(flightNumber) => flightNumber}
              />
              <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </ComboboxButton>

              {filteredFlights.length > 0 && (
                <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredFlights.map((flight, index) => (
                    <ComboboxOption
                      key={index}
                      value={flight}
                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-red-600 data-[focus]:text-white"
                    >
                      <span className="block truncate group-data-[selected]:font-semibold">{flight}</span>
                      <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-red-600 group-data-[selected]:flex group-data-[focus]:text-white">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              )}
            </div>
          </Combobox>

        </div>

        <button
          type="button"
          className="rounded-full bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={handleSubmit(handleNextStep)}
        >
          Get Flight Info
        </button>

      </div>
    </>
  )
  }

export default Step1;