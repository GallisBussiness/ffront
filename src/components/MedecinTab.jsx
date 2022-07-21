import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
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
export default function MedecinTab({medecin}) {
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
        <Tab  value={0} label="Présentation" />
        <Tab  value={1} label="Pricing" />
        <Tab  value={2} label="Assurance" />
        <Tab value={3} label="Calendrier"/>
      </Tabs>
       <Box>
       <TabPanel value={value} index={0}>
       {medecin?.description}
      </TabPanel>
      <TabPanel value={value} index={1}>
         Pricing
      </TabPanel>
      <TabPanel value={value} index={2}>
         Assurance
      </TabPanel>
      <TabPanel value={value} index={3}>
       schedule
      </TabPanel>
       </Box>
    </Box>
  );
}
