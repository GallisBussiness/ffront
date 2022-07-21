import { Tab } from '@headlessui/react'
import { Button } from '@mui/material'

import ConnectApp from './ConnectApp';
import TabInsApp from './TabInsApp';

function TabConApp({close}) {
  return <>
   <Tab.Group>
      <div className="flex flex-col w-full">
        <Tab.List className="self-end mb-3 -mr-6">
        <Tab as={Button} disableRipple>
        {({ selected }) => (
            <div
              className={
                selected ? 
                'z-10 -mr-14 bg-blue-500 text-white font-bold uppercase text-sm px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150' : 
                'z-0 pr-12 text-blue-500 bg-white font-bold uppercase text-sm pl-3 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
              }
            >
              Se Connecter
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
              S'inscrire
            </div>
          )}
        </Tab>
      </Tab.List>  
      
        <Tab.Panels>
        <Tab.Panel>
          <ConnectApp close={close} />
        </Tab.Panel>
        <Tab.Panel className="rounded-3xl w-full bg-gray-100 px-6 pt-3">
         <TabInsApp close={close} />
        </Tab.Panel>
      </Tab.Panels>
      </div>
    </Tab.Group>
  </>;
}

export default TabConApp;
