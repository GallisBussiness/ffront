import React from 'react'
import { Tab } from '@headlessui/react';
import { Button } from '@mui/material';
import InsPatient from './InsPatient';
import InsMedecin from './InsMedecin';

function TabIns() {
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

        <Tab as={Button} disableRipple>
          {({ selected }) => (
            <div
              className={
                selected ? 
                'z-10 -ml-14 bg-blue-500 text-white font-bold uppercase text-sm px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150' : 
                'z-0 pl-12 text-blue-500 bg-white font-bold uppercase text-sm pr-3 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150'
              }
            >
              Medecin
            </div>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
       <InsPatient />
        </Tab.Panel>
        <Tab.Panel>
        <InsMedecin />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
        </>
    )
}

export default TabIns
