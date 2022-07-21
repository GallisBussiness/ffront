import * as React from 'react';
import { Tabs, Tab, Box, Divider } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`panel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}
export default function CabinetTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="tabulation"
      >
        <Tab  value={0} label="Présentation de la structure" />
        <Tab  value={1} label="Calendrier" />
        <Tab  value={2} label="Team" />
      </Tabs>
       <Box>
       <TabPanel value={value} index={0}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe provident eveniet dolorum corrupti 
        eos recusandae exercitationem atque, asperiores voluptas odit.
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="flex items-center justify-evenly w-2/3">
          <div className="text-lg font-medium">
            Lundi:
          </div>
          <div className="text-lg font-medium">
            08H-OO / 18H 30
          </div>
        </div>
        <div className="flex items-center justify-evenly w-2/3">
          <div className="text-lg font-medium">
            Mardi:
          </div>
          <div className="text-lg font-medium">
            08H-OO / 18H 30
          </div>
        </div>
        <div className="flex items-center justify-evenly w-2/3">
          <div className="text-lg font-medium">
            Mercredi:
          </div>
          <div className="text-lg font-medium">
            08H-OO / 18H 30
          </div>
        </div>
        <div className="flex items-center justify-evenly w-2/3">
          <div className="text-lg font-medium">
            Jeudi:
          </div>
          <div className="text-lg font-medium">
            08H-OO / 18H 30
          </div>
        </div>
        <div className="flex items-center justify-evenly w-2/3">
          <div className="text-lg font-medium">
            Vendredi:
          </div>
          <div className="text-lg font-medium">
            08H-OO / 18H 30
          </div>
        </div>
        <div className="flex items-center justify-evenly w-2/3">
          <div className="text-lg font-medium">
            Samedi:
          </div>
          <div className="text-lg font-medium">
            08H-OO / 18H 30
          </div>
        </div>
        <div className="flex items-center justify-evenly w-2/3">
          <div className="text-lg font-medium">
            Dimanche:
          </div>
          <div className="text-lg font-medium">
            08H-OO / 18H 30
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
       <div className="flex items-center mb-3">
         <h1>Généraliste</h1>
         <Divider component="div" variant="inset" className="w-2/3" />
       </div>
       <div className="w-full flex items-center">
<div class="w-300 py-4 px-8 bg-white shadow-3xl rounded-lg my-14 mr-3">
  <div class="flex justify-center -mt-16">
    <img class="w-20 h-20 object-cover rounded-full border-4 border-white" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="profile medecin" />
  </div>
  <div>
    <h2 class="text-primary text-lg text-center font-normal mb-6">Salimata Tall</h2>
    <div className="flex items-center justify-between">
    <h2 class="text-primary text-lg text-center font-normal">Spécialité :</h2>
    <h2 class="text-gray-400 text-lg text-center font-normal">Généraliste</h2>
    </div>
  </div>
  <div class="flex justify-center mt-4">
  <button className=" bg-primary text-white active:bg-blue-600 font-semibold uppercase text-xs mb-3 px-6 py-2 rounded-3xl shadow hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150" type="button">
                voir medecin
    </button>
  </div>
</div>
<div class="w-300 py-4 px-8 bg-white shadow-3xl rounded-lg my-14 mr-3">
  <div class="flex justify-center -mt-16">
    <img class="w-20 h-20 object-cover rounded-full border-4 border-white" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="profile medecin" />
  </div>
  <div>
    <h2 class="text-blue-800 text-lg text-center font-normal mb-6">Aminata Diop</h2>
    <div className="flex items-center justify-between">
    <h2 class="text-blue-800 text-lg text-center font-normal">Spécialité :</h2>
    <h2 class="text-gray-400 text-lg text-center font-normal">Généraliste</h2>
    </div>
  </div>
  <div class="flex justify-center mt-4">
  <button className=" bg-primary text-white active:bg-blue-600 font-semibold uppercase text-xs mb-3 px-6 py-2 rounded-3xl shadow hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150" type="button">
                voir medecin
    </button>
  </div>
</div>

       </div>



       <div className="flex items-center mb-3">
         <h1>Cardiologue</h1>
         <Divider component="div" variant="inset" className="w-2/3" />
       </div>
       <div className="w-full flex items-center">
<div class="w-300 py-4 px-8 bg-white shadow-3xl rounded-lg my-14 mr-3">
  <div class="flex justify-center -mt-16">
    <img class="w-20 h-20 object-cover rounded-full border-4 border-white" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="profile medecin" />
  </div>
  <div>
    <h2 class="text-blue-800 text-lg text-center font-normal mb-6">Salimata Tall</h2>
    <div className="flex items-center justify-between">
    <h2 class="text-blue-800 text-lg text-center font-normal">Spécialité :</h2>
    <h2 class="text-gray-400 text-lg text-center font-normal">Cardiologue</h2>
    </div>
  </div>
  <div class="flex justify-center mt-4">
  <button className=" bg-primary text-white active:bg-blue-600 font-semibold uppercase text-xs mb-3 px-6 py-2 rounded-3xl shadow hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150" type="button">
                voir medecin
    </button>
  </div>
</div>
<div class="w-300 py-4 px-8 bg-white shadow-3xl rounded-lg my-14 mr-3">
  <div class="flex justify-center -mt-16">
    <img class="w-20 h-20 object-cover rounded-full border-4 border-white" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="profile medecin" />
  </div>
  <div>
    <h2 class="text-primary text-lg text-center font-normal mb-6">Aminata Diop</h2>
    <div className="flex items-center justify-between">
    <h2 class="text-primary text-lg text-center font-normal">Spécialité :</h2>
    <h2 class="text-gray-400 text-lg text-center font-normal">Cardiologue</h2>
    </div>
  </div>
  <div class="flex justify-center mt-4">
  <button className=" bg-primary text-white active:bg-blue-600 font-semibold uppercase text-xs mb-3 px-6 py-2 rounded-3xl shadow hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150" type="button">
                voir medecin
    </button>
  </div>
</div>

       </div>
      </TabPanel>
       </Box>
    </Box>
  );
}
