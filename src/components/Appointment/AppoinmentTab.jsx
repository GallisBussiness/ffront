import { Tabs, Tab, Box, Badge} from '@mui/material';
import RecevedAppointment from './Tabs/RecevedAppointment';
import ValidateAppointment from './Tabs/ValidateAppointment';
import { useState } from 'react';
import CancelledAppointment from './Tabs/CancelledAppointment';
import { useTabStore } from './tabStore';
import shallow from 'zustand/shallow';

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
export default function AppoinmentTab({auth}) {
  const [value, setValue] = useState(0);

   const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const {receved,accepted,rejected} = useTabStore( state => ({receved: state.receved, accepted: state.accepted, rejected: state.rejected}),shallow)

  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="tabulation"
      >
        <Tab  value={0} label={<Badge badgeContent={receved} color="primary">
                         Reçus
                </Badge>} />
        <Tab  value={1} label={<Badge badgeContent={accepted} color="success">
                         Validés
                </Badge>} />
        <Tab  value={2} label={<Badge badgeContent={rejected} color="error">
                         Refusés
                </Badge>} />
      </Tabs>
       <Box>
       <TabPanel value={value} index={0}>
         
      <RecevedAppointment auth={auth} />
      </TabPanel>
      <TabPanel value={value} index={1}>
          <ValidateAppointment auth={auth} />
      </TabPanel>
      <TabPanel value={value} index={2}>
       <CancelledAppointment auth={auth} />
      </TabPanel>
       </Box>
    </Box>
    </>
  );
}
