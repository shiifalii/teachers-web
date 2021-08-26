import { connect } from 'react-redux';

import { ROUTE_TYPE } from 'app/constants/route.constant';
import { RootState } from 'app/stores/configure.store';
import AuthHoc from 'app/components/hoc/auth.hoc';
import CppCompletePaperScreen from './cppCompletePaper.screen';

const mapState = (state: RootState) => {
  return {
    // State data
  };
};

const mapDispatch = {
  // State methods
};

const authLayer = AuthHoc({
  type: ROUTE_TYPE.private,
  screen: CppCompletePaperScreen,
});

const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
