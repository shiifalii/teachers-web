import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from 'app/components/atoms/button';
import { loginUser } from 'app/helpers/public.api.helper';
import { useHistory } from 'react-router-dom';
import { sliderProps, PASSWORD_IMAGES } from 'app/constants/data.constants';
import Slider from 'app/components/atoms/slider/slider.component';
import {
  LOGIN_TOKEN_KEY,
  setUserNameInStorage,
  setUsersCoursesInStorage,
  setCentreDataInStorage,
  setLogoutRedirectUrl,
  setOrgTypeInStorage,
  LOGOUT_REDIRECT_URL,
} from 'app/helpers/local.storage.helper';
import ModalComponent from 'app/components/common/modal.component';
import { Loading } from 'app/components';
import ForgetPasswordComponent from 'app/components/common/forget.password.component';
import {
  LoginContainer,
  ErrorMsgEdit,
  FormEdit,
  GridContainer,
  InputContainerEdit,
  LoginCard,
  ShowPassword,
  RightEdit,
} from 'app/components/common/login.styled.components';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
// import { isApiFailed } from 'app/helpers/comman.helper';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import { Right } from 'app/components';
import { LoginAnalyticEvent } from 'app/helpers/analytics.helper';
import {
  combineField,
  fetchAndSaveUserSettings,
} from 'app/helpers/comman.helper';
import { SCHOOLS_URL } from 'app/constants/config.constant';

export interface IOption {
  label: string;
  value: string;
}

const ForgotPassword = styled.div`
  text-align: right;
  margin: 11px 0 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    font-size: 14px;
    text-decoration: none;
  }
`;

const getSnackbarMessage = (
  isLoggedIn: boolean,
  isPasswordResetSuccessful: boolean,
) => {
  if (isLoggedIn) {
    return 'You have been successfully Logged out.';
  } else if (isPasswordResetSuccessful) {
    return 'You have successfully reset your password.';
  } else {
    return '';
  }
};

const getSnackBarMode = (
  isLoggedIn: boolean,
  isPasswordResetSuccessful: boolean,
) => {
  if (isLoggedIn || isPasswordResetSuccessful) {
    return 'success';
  } else {
    return 'error';
  }
};

const createSubjectString = (courses: any[]) => {
  if (courses) {
    const allSubjects = courses.reduce(
      (acc: any[], obj: any) => acc.concat(obj.subjects),
      [],
    );
    const subjectIdSet = new Set();
    const filteredSubjects = allSubjects.filter(({ _id }) => {
      if (subjectIdSet.has(_id)) {
        return false;
      }
      subjectIdSet.add(_id);
      return true;
    });
    return combineField(filteredSubjects, 'name');
  }
  return '';
};

const LoginScreen = function(props: any) {
  const {
    userId,
    password,
    userIdForgetPassword,
    isLoggedIn,
    isPasswordResetSuccessful,
  } = props;
  const {
    setUserId,
    setPassword,
    setUserIdForgetPassword,
    resetState,
    setIsLoggedIn,
    clearResetPasswordState,
  } = props;
  const [isPassword, setIsPassword] = useState(true);
  const [signInError, setSignInError] = useState('');
  const [modalState, setModalState] = useState(false);
  const [redirectedError, setRedirectedError] = useState('');

  const history = useHistory();

  useEffect(() => {
    const query = new URLSearchParams(history.location.search);
    const redirected = query.get('redirected');
    const error = query.get('error') || '';
    if (redirected === 'true') {
      setRedirectedError(error);
    }
  }, []);

  const isSnackbarActive: boolean =
    isLoggedIn || isPasswordResetSuccessful || redirectedError;

  const snackBarMessage = getSnackbarMessage(
    isLoggedIn,
    isPasswordResetSuccessful,
  );

  const snackBarMode = getSnackBarMode(isLoggedIn, isPasswordResetSuccessful);

  const query = new URLSearchParams(history.location.search);
  const authToken = query.get('token');

  const getUserSettings = async (authToken: string) => {
    try {
      const res = await fetchAndSaveUserSettings(authToken);
      if (res.data.code === 200) {
        setIsLoggedIn(true);
        // Store redirect Url upon logout
        setLogoutRedirectUrl(SCHOOLS_URL);

        history.push('/');
      } else {
        history.push('/login');
        setSignInError(res.data.message);
      }
    } catch (error) {
      history.push('/login');
      setSignInError(error.message);
    }
  };

  useEffect(() => {
    if (authToken) {
      getUserSettings(authToken);
    }
  }, []);

  const handleSnackbarClose = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
    if (isPasswordResetSuccessful) {
      clearResetPasswordState();
    }
    if (redirectedError) {
      setRedirectedError('');
    }
  };

  const login = async (e: any) => {
    e.preventDefault();
    setSignInError('');
    const res = await loginUser({
      username: userId.toUpperCase(),
      password: password,
      osType: 'web',
      device: 'desktop',
    });
    if (res.data.code === 200) {
      localStorage.setItem(LOGIN_TOKEN_KEY, res.data.data.auth_token);
      setUserNameInStorage(res.data.data.name);
      setOrgTypeInStorage(res.data.data.orgType);
      localStorage.removeItem(LOGOUT_REDIRECT_URL);
      const { courses, role, batchData, centerData } = res.data.data;
      if (courses) {
        setUsersCoursesInStorage(JSON.stringify(courses));
      }
      setCentreDataInStorage(JSON.stringify(centerData));

      // Trigger analytics - Event Name = Login
      LoginAnalyticEvent({
        employeeId: userId,
        role,
        classId: combineField(batchData, '_id'),
        class: combineField(batchData, 'name'),
        centre: combineField(centerData, 'name'),
        subject: createSubjectString(courses),
      });
      resetState();
      history.push('/');
      setIsLoggedIn(true);
    } else {
      setSignInError(res.data.message);
    }
  };

  const validation = function() {
    if (userId.length > 0 && password.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const showPassword = () => {
    return {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => {
              setIsPassword(!isPassword);
            }}
          >
            <ShowPassword src={PASSWORD_IMAGES(isPassword)} alt="" />
          </IconButton>
        </InputAdornment>
      ),
    };
  };

  if (authToken) {
    return <Loading />;
  }

  return (
    <div>
      <LoginContainer>
        <LoginCard>
          <ModalComponent
            isOpen={modalState}
            onClose={() => setModalState(!modalState)}
          >
            <ForgetPasswordComponent
              onClose={() => setModalState(!modalState)}
              userId={userIdForgetPassword}
              setUserId={setUserIdForgetPassword}
            />
          </ModalComponent>

          <img
            src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/mypat-teachers-logo.svg"
            alt=""
          />
          <GridContainer>
            <div>
              <Slider height={450} width={535} sliderProps={sliderProps} />
            </div>
            <div>
              <FormEdit>
                <h1>Welcome</h1>
                <p>Sign in to continue</p>

                <InputContainerEdit>
                  <FormControl fullWidth={true}>
                    <TextField
                      label="User ID"
                      type={'text'}
                      value={userId}
                      onChange={e => {
                        setUserId(e.target.value);
                      }}
                      variant="outlined"
                      fullWidth={true}
                    />
                  </FormControl>
                </InputContainerEdit>

                <InputContainerEdit>
                  <FormControl fullWidth={true}>
                    <TextField
                      label="Password"
                      type={isPassword ? 'password' : 'text'}
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value.trim());
                      }}
                      variant="outlined"
                      fullWidth={true}
                      InputProps={showPassword()}
                    />
                  </FormControl>
                </InputContainerEdit>

                <ForgotPassword>
                  <span>
                    {signInError && <ErrorMsgEdit>{signInError}</ErrorMsgEdit>}
                  </span>

                  <a href="#" onClick={() => setModalState(true)}>
                    Forgot Password ?{' '}
                  </a>
                </ForgotPassword>

                <RightEdit>
                  <Button onClick={login} disabled={validation()}>
                    Login
                  </Button>
                </RightEdit>
              </FormEdit>
            </div>
          </GridContainer>
        </LoginCard>
        {isSnackbarActive ? (
          <SimpleSnackbar
            mode={snackBarMode}
            state={isSnackbarActive}
            message={snackBarMessage || redirectedError}
            onClose={handleSnackbarClose}
          />
        ) : null}
      </LoginContainer>
    </div>
  );
};

export default LoginScreen;
