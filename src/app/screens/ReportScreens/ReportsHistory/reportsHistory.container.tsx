import { connect } from 'react-redux';
import { REPORTS_HISTORY_ROUTE } from '../../../constants/route.constant';
import AuthHoc from '../../../components/hoc/auth.hoc';
import ReportsHistory from './reportsHistory.screen';
import { getHistory } from './reportsHistory.actions';

// TODO - add state type later
const mapState = (state: any) => {
  return {
    reportsHistory: state.reportsHistory.reportsHistory.data,
  };
};
//@ts-ignore
const mapDispatch = {
  getHistory,
};

const authLayer = AuthHoc({
  type: REPORTS_HISTORY_ROUTE.type,
  screen: ReportsHistory,
});
const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
