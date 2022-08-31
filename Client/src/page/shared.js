import React, { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@material-ui/core';
import LocationShared from '../components/MyShare/Location';
import ServiceShared from '../components/MyShare/Service';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function MyShare() {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    document.title = 'Đóng góp của tôi';
  });

  return (
    <div style={{ marginTop: 120, marginInline: 30 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        style={{ marginInline: 50 }}
      >
        <Tab label="Địa điểm" {...a11yProps(0)} />
        <Tab label="Dịch vụ" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <LocationShared />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ServiceShared />
      </TabPanel>
    </div>
  );
}
