import React from 'react'
import { Tab } from '@headlessui/react';
import { Button } from '@mui/material';
import InsPatientApp from './InsPatientApp';

function TabInsApp() {
    return (
        <>
       <Tab.Group>
      <Tab.List className="text-center">
        <Tab as={Button} disableRipple>
          {({ selected }) => (
            <div
              className={
                selected ? 
                'z-10 -mr-14 bg-blue-500 text-white font-bold uppercase text-sm px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150' : 
                'z-0 pr-12 text-blue-500 bg-white font-bold uppercase text-sm pl-3 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
              }
            >
              Patient
            </div>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
       <InsPatientApp />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
        </>
    )
}

export default TabInsApp
