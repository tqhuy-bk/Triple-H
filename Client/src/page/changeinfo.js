import React from 'react';
import {
  Box,
  Tab,
  Tabs,
  Container,
  useMediaQuery,
  useTheme,
  Grid
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { profileStyles } from '../style';
import ChangePassword from '../components/Forms/ChangePassword';
import ChangeInfo from '../components/Forms/ChangeInfo';
import ConfirmAccount from '../components/Forms/ConfirmAccount';
import { getToken } from '../utils/token';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

export default function Change_info(props) {
  const classes = profileStyles();

  const { token } = useSelector(state => state.auth);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));

  const rfToken = getToken();
  if (!rfToken) return <Redirect to="/login" />;

  return (
    <div>
      <Container className={classes.root}>
        <Grid container>
          <Grid item md={3} sm={12} xs={12}>
            <div className={classes.tabsWrap}>
              <Tabs
                orientation={downSm ? 'horizontal' : 'vertical'}
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                <Tab
                  className={classes.tab}
                  label="Thay đổi thông tin"
                  {...a11yProps(0)}
                />
                <Tab
                  className={classes.tab}
                  label="Thay đổi mật khẩu"
                  {...a11yProps(1)}
                />
                <Tab
                  className={classes.tab}
                  label="Xác nhận tài khoản"
                  {...a11yProps(2)}
                />
              </Tabs>
            </div>
          </Grid>
          <Grid item md={9} sm={12} xs={12}>
            <TabPanel value={value} index={0} className={classes.tabPanel}>
              {token && <ChangeInfo />}
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.tabPanel}>
              <ChangePassword />
            </TabPanel>
            <TabPanel value={value} index={2} className={classes.tabPanel}>
              <ConfirmAccount />
            </TabPanel>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
