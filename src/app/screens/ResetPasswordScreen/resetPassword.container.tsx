import ResetPasswordScreen from './resetPassword.screen';
import AuthHoc from '../../components/hoc/auth.hoc';
import { connect } from 'react-redux';
import { ROUTE_TYPE } from '../../constants/route.constant';
import { resetPasswordActions } from './resetPassword.reducer';
import { RootState } from '../../stores/configure.store';

// TODO - add state type later
const mapState = (state: RootState) => ({
  newPassword: state.resetPassword.resetPassword.newPassword,
  confirmPassword: state.resetPassword.resetPassword.confirmPassword,
  isPasswordResetSuccessful:
    state.resetPassword.resetPassword.isPasswordResetSuccessful,
});
const mapDispatch = {
  setNewPassword: resetPasswordActions.setNewPassword,
  setConfirmPassword: resetPasswordActions.setConfirmPassword,
  resetState: resetPasswordActions.resetState,
  setIsPasswordResetSuccessful:
    resetPasswordActions.setIsPasswordResetSuccessful,
};
const authLayer = AuthHoc({
  type: ROUTE_TYPE.public,
  screen: ResetPasswordScreen,
});
const conector = connect(mapState, mapDispatch);
export default conector(authLayer);
