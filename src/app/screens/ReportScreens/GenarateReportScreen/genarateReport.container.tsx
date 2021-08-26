import { connect } from 'react-redux';
import { GENARATE_REPORTS_ROUTE } from '../../../constants/route.constant';
import AuthHoc from '../../../components/hoc/auth.hoc';
import GenarateReportScreen from './genarateReport.screen';
import {
  fetchAllBatches,
  fetchAllAssignments,
} from './redux/genarateReport.action';

// TODO - add state type later
const mapState = (state: any) => {
  return {
    allAssignments: state.reports.getAssignments.data,
    allBatches: state.reports.getBatches.data,
  };
};
//@ts-ignore
const mapDispatch = {
  fetchAllAssignments,
  fetchAllBatches,
};

const authLayer = AuthHoc({
  type: GENARATE_REPORTS_ROUTE.type,
  screen: GenarateReportScreen,
});
const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
