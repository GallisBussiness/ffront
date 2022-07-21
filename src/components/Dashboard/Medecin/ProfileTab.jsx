import { Tabs, Tab, Box } from "@mui/material";
import InformationTab from "./InformationTab";
import ConsultationTab from "./ConsultationTab";
import LocalisationTab from "./LocalisationTab";
import React, { useState } from "react";
import { useCallback } from "react";


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

function ProfileTab({auth}) {

  const [value, setValue] = useState(0);

  const handleChange = useCallback((_, newValue) => setValue(newValue),[]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{color: 'black'}}
        indicatorColor="primary"
        aria-label="tabulation"
        className="w-1/2 mx-auto bg-white rounded-bl-lg rounded-br-lg"
      >
        <Tab value={0} label="Informations Personnelles"/>
        <Tab value={1} label="Actes Médicaux" />
        <Tab value={2} label="Localisation" />
      </Tabs>
      <Box>
        <TabPanel value={value} index={0}>
         <InformationTab auth={auth} />
        </TabPanel>
        <TabPanel value={value} index={1}>
        <ConsultationTab auth={auth} />
        </TabPanel>
        <TabPanel value={value} index={2}>
        <LocalisationTab auth={auth} />
        </TabPanel>
      </Box>
    </Box>
  );
}

export default ProfileTab;
