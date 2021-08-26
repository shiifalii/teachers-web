import LoginScreen from './login.screen';
import AuthHoc from '../../components/hoc/auth.hoc';
import { connect } from 'react-redux';
import { ROUTE_TYPE } from '../../constants/route.constant';
import { loginActions } from './login.reducer';
import { resetPasswordActions } from '../ResetPasswordScreen/resetPassword.reducer';
import { RootState } from '../../stores/configure.store';
// TODO - add state type later
const mapState = (state: RootState) => ({
  userId: state.login.login.userId,
  password: state.login.login.password,
  userIdForgetPassword: state.login.login.userIdForgetPassword,
  isLoggedIn: state.login.login.isLoggedIn,
  isPasswordResetSuccessful:
    state.resetPassword.resetPassword.isPasswordResetSuccessful,
});
const mapDispatch = {
  setUserId: loginActions.setUserId,
  setPassword: loginActions.setPassword,
  setUserIdForgetPassword: loginActions.setUserIdForgetPassword,
  resetState: loginActions.resetState,
  setIsLoggedIn: loginActions.setIsLoggedIn,
  clearResetPasswordState: resetPasswordActions.resetState,
};
const authLayer = AuthHoc({ type: ROUTE_TYPE.public, screen: LoginScreen });
const conector = connect(mapState, mapDispatch);
export default conector(authLayer);
