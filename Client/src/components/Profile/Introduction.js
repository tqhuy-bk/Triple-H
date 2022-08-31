import React from 'react';
import {
  Home,
  RssFeed,
  AlarmOn,
  Email,
  Wc,
  Cake,
  LibraryMusic
} from '@material-ui/icons';
import {
  Box,
  Tab,
  Tabs,
  Container,
  useMediaQuery,
  Typography,
  useTheme,
  Grid,
  Chip
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { profileStyles } from '../../style';
import { convertDateToStr, timeAgoShort } from '../../utils/date';
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

const GENDER = {
  male: 'Nam',
  female: 'Nữ',
  other: 'Khác'
};

export default function Introduction(props) {
  const { user } = props;
  const classes = profileStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {user && (
        <Container>
          <div className={classes.introContainer}>
            <Typography variant="h5" className={classes.introHeader}>
              Giới thiệu
            </Typography>
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
                      label="Tổng quan"
                      {...a11yProps(0)}
                    />
                    <Tab
                      className={classes.tab}
                      label="Thông tin liên hệ"
                      {...a11yProps(1)}
                    />
                    <Tab
                      className={classes.tab}
                      label="Sở thích"
                      {...a11yProps(2)}
                    />
                  </Tabs>
                </div>
              </Grid>
              <Grid item md={9} sm={12} xs={12}>
                <TabPanel
                  value={value}
                  index={0}
                  className={classes.introTabPanel}
                >
                  {user?.address && (
                    <div className={classes.introTabPanelItem}>
                      <Home className={classes.introTabPanelIcon} />
                      <Typography>
                        Sống tại{' '}
                        <span style={{ fontWeight: 600 }}>{user.address}</span>
                      </Typography>
                    </div>
                  )}

                  <div className={classes.introTabPanelItem}>
                    <RssFeed className={classes.introTabPanelIcon} />
                    <Typography>
                      Có{' '}
                      <span style={{ fontWeight: 600 }}>
                        {user.followings?.length}
                      </span>{' '}
                      người theo dõi
                    </Typography>
                  </div>
                  <div className={classes.introTabPanelItem}>
                    <AlarmOn className={classes.introTabPanelIcon} />
                    <Typography>
                      Tham gia vào{' '}
                      <span style={{ fontWeight: 600 }}>
                        {timeAgoShort(new Date(user.createdAt))}
                      </span>
                    </Typography>
                  </div>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={1}
                  className={classes.introTabPanel}
                >
                  <div className={classes.introTabPanelItem}>
                    <Email className={classes.introTabPanelIcon} />
                    <Typography>
                      Email{' '}
                      <span style={{ fontWeight: 600 }}>{user.email}</span>
                    </Typography>
                  </div>
                  {user?.gender && (
                    <div className={classes.introTabPanelItem}>
                      <Wc className={classes.introTabPanelIcon} />
                      <Typography>
                        Giới tính{' '}
                        <span style={{ fontWeight: 600 }}>
                          {GENDER[user.gender]}
                        </span>
                      </Typography>
                    </div>
                  )}

                  {user?.birthday && (
                    <div className={classes.introTabPanelItem}>
                      <Cake className={classes.introTabPanelIcon} />
                      <Typography>
                        {' '}
                        Sinh nhật{' '}
                        <span style={{ fontWeight: 600 }}>
                          {convertDateToStr(user?.birthday)}
                        </span>
                      </Typography>
                    </div>
                  )}
                </TabPanel>
                <TabPanel
                  value={value}
                  index={2}
                  className={classes.introTabPanel}
                >
                  <div className={classes.introTabPanelItem}>
                    {user.hobbies ? (
                      <div>
                        {user.hobbies?.split(',').map((item, index) => (
                          <div key={index}>
                            <Chip
                              color="primary"
                              label={item}
                              style={{ margin: 5 }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <LibraryMusic className={classes.introTabPanelIcon} />
                        <Typography> Không có Sở thích để hiển thị.</Typography>
                      </>
                    )}
                  </div>
                </TabPanel>
              </Grid>
            </Grid>
          </div>
        </Container>
      )}
    </>
  );
}
