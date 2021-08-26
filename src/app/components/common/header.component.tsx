import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
// import NotificationsIcon from './notifications/notification-icon/container';

import {
  getUserNameFromStorage,
  LOGIN_TOKEN_KEY,
  getCourseNameById,
  getLogoutRedirectUrl,
  LOGOUT_REDIRECT_URL,
} from '../../helpers/local.storage.helper';
import { Container, Dropdown, Button } from '../index';
import { getNameByOrgType, logout } from 'app/helpers/comman.helper';
import { UserAvatar } from '../atoms/user-avatar';
// import NotificationCenter from './notifications/container';
import {
  TEACHERSV2_URL,
  ONLINE_CLASSES_URL,
} from 'app/constants/config.constant';
import {
  Drawer,
  duration,
  makeStyles,
  Theme,
  createStyles,
  Hidden,
  Box,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      '@media screen and (max-width: 768px)': {
        width: '85%',
      },
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    colorChange: {
      color: '#fff',
      width: '1.3em',
      height: '1.3em',
      marginRight: '.5em',
    },
    downloadButton: {
      minWidth: 'calc(100% - 40px)',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);

const Header = styled.div`
  background-color: #fff;
  @media (max-width: 768px) {
    background-color: #1d7dea;
    padding: 10px 0;
  }
`;

const Logo = styled.img`
  margin-right: 4em;
  transform: scale(0.9);
  @media (max-width: 768px) {
    margin-right: 1em;
  }
`;

const NavigationRight = styled.ul`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: end;
  align-items: center;
`;

const Navigation = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  justify-content: center;
  align-items: center;

  img {
    @media (max-width: 768px) {
      margin-left: 1em;
      transform: scale(1.35);
    }
  }

  > ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    li {
      &:not(:first-child) {
        margin-right: 2.5em;
        line-height: 70px;
        height: 70px;
        @media (max-width: 768px) {
          margin-right: 1em;
          height: 50px;
        }
      }
      a {
        text-decoration: none;
        color: var(--text-color);
      }
      a.logoImg {
        display: inline;
      }
    }
    li.active {
      border-bottom: 2px solid var(--brand-color);
    }
  }
`;

const NavigationMobile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 1.5em;

  > ul {
    @media (max-width: 768px) {
      display: block;
    }

    li {
      &:first-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1em;
        border-bottom: 0.5px solid #d8d8d8;
        padding: 10px;
      }
      a {
        text-decoration: none;
        color: var(--text-color);
      }
      a.logoImg {
        display: inline;
      }
    }
    li {
      padding: 0 20px;
      &:not(:first-child) {
        margin-right: 3em;
        line-height: 70px;
        height: 70px;
      }
      a {
        text-decoration: none;
        color: var(--text-color);
      }
      a.logoImg {
        display: inline;
      }
    }
    li.active {
      border: none;
      a {
        color: #1d7dea;
      }
    }
  }
`;

const UsserName = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const UsserNameMobile = styled(UsserName as any)`
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    line-height: 30px;
    text-align: right;
    margin-right: 10px;
  }
`;

const CustomHidden = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;

const UserAvatarEdit = styled(UserAvatar as any)`
  display: block;
  h4 {
    flex-direction: row-reverse;
  }
  img {
    margin-left: 0.5em;
  }
`;

const HeaderComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  function handleClickReports() {
    history.push('/reports/genarate');
  }
  function handleClickCpp() {
    history.push('/cpp');
  }
  const logoutUser = async function() {
    await logout();
    const redirectUrl = getLogoutRedirectUrl();
    if (redirectUrl) {
      //@ts-ignore
      window.location = redirectUrl;
    } else {
      history.push('/login');
    }
    localStorage.removeItem(LOGOUT_REDIRECT_URL);
  };
  const profileName = getUserNameFromStorage();
  const authToken = localStorage.getItem(LOGIN_TOKEN_KEY);
  const [drowerState, setDrowerState] = useState(false);

  return (
    <div>
      <Header>
        <Container>
          <Navigation>
            <ul>
              <CustomHidden>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <li
                    onClick={() => {
                      setDrowerState(true);
                    }}
                  >
                    <MenuIcon className={classes.colorChange} />
                    <Logo src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/teacherv3-white-logo.svg"></Logo>
                  </li>
                </Box>
              </CustomHidden>
              <Hidden only={['xs', 'sm']}>
                <li>
                  <a href="/" className="">
                    <Logo
                      src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/mypat-teachers-logo.svg"
                      alt=""
                    />
                  </a>
                </li>
                <li
                  className={`${
                    location.pathname === '/' ||
                    location.pathname.includes('chapter') ||
                    location.pathname.includes('concept')
                      ? 'active'
                      : ''
                  }`}
                >
                  <a href="/">{getNameByOrgType()}</a>
                </li>
                <li
                  className={`${
                    location.pathname.includes('anytime') ? 'active' : ''
                  }`}
                >
                  <a href="/anytime-ptm/student-search">Anytime PTM</a>
                </li>
                <li
                  className={`${
                    location.pathname.includes('reports') ? 'active' : ''
                  }`}
                >
                  <a
                    // href="javascrip:void(0)"
                    // onClick={handleClickReports}
                    href="/reports/genarate"
                    rel="noopener noreferrer"
                  >
                    Reports
                  </a>
                </li>
                <li>
                  <a
                    href={`${TEACHERSV2_URL}/public/login?token=${authToken}&redirectUrl=assignments`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Assignments
                  </a>
                </li>
                <li
                  className={`${
                    location.pathname.includes('cpp') ? 'active' : ''
                  }`}
                >
                  <a
                    href="/cpp"
                    // onClick={handleClickCpp}
                    rel="noopener noreferrer"
                  >
                    CPP
                  </a>
                </li>
                <li>
                  <a
                    href={`${ONLINE_CLASSES_URL}/?token=${authToken}&host=teacher`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    VoD
                  </a>
                </li>
              </Hidden>
            </ul>
            <div>
              <NavigationRight>
                {/* <li>
                  <Dropdown>
                    <NotificationsIcon />
                    <ul>
                      <li>
                        <NotificationCenter />
                      </li>
                    </ul>
                  </Dropdown>
                </li> */}
                <li>
                  <Dropdown>
                    <UserAvatar>
                      <h4>
                        <Hidden only="lg">
                          <span>{profileName && profileName[0]}</span>
                        </Hidden>

                        <UsserName>{profileName} &nbsp; </UsserName>
                        <Hidden only="xs">
                          <img
                            width="15"
                            src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/angle-down.svg"
                            alt=""
                          />
                        </Hidden>
                      </h4>
                    </UserAvatar>

                    <ul>
                      <li>
                        <Dropdown>
                          <a href="#" onClick={logoutUser}>
                            Logout{' '}
                          </a>
                        </Dropdown>
                      </li>
                    </ul>
                  </Dropdown>
                </li>
              </NavigationRight>
            </div>
          </Navigation>
        </Container>
      </Header>

      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor={'left'}
        className={classes.drawer}
        open={drowerState}
        onClose={() => {
          setDrowerState(false);
        }}
      >
        <NavigationMobile>
          <ul>
            <li>
              <a href="/" className="">
                <Logo
                  src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/mypat-teachers-logo.svg"
                  alt=""
                />
              </a>

              <Dropdown>
                <UserAvatarEdit>
                  <h4>
                    <img
                      width="15"
                      src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/angle-down.svg"
                      alt=""
                    />
                    <UsserNameMobile>{profileName} &nbsp; </UsserNameMobile>
                  </h4>
                </UserAvatarEdit>

                <ul>
                  <li>
                    <a href="#" onClick={logoutUser}>
                      Logout{' '}
                    </a>
                  </li>
                </ul>
              </Dropdown>
            </li>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <a href="/">Classes</a>
            </li>
            <li
              className={
                location.pathname.includes('anytime-ptm') ? 'active' : ''
              }
            >
              <a href="/anytime-ptm/student-search">Anytime PTM</a>
            </li>
            <li
              className={location.pathname.includes('reports') ? 'active' : ''}
            >
              <a href="/reports/genarate">Reports</a>
            </li>
            <li>
              <a
                href={`${TEACHERSV2_URL}/public/login?token=${authToken}&redirectUrl=assignments`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Assignments
              </a>
            </li>
            <li>
              <a
                // href={`${TEACHERSV2_URL}/public/login?token=${authToken}&redirectUrl=tests`}
                href="/cpp"
              >
                CPP
              </a>
            </li>
            <li>
              <a
                href={`http://online-classes.mypat.in/?token=${authToken}&host=teacher`}
                target="_blank"
                rel="noopener noreferrer"
              >
                VoD
              </a>
            </li>
          </ul>
          <Button className={classes.downloadButton}>
            <img
              src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/play-icon.svg"
              alt=""
            />
            &nbsp; Download our App
          </Button>
        </NavigationMobile>
      </Drawer>
    </div>
  );
};

export default HeaderComponent;
