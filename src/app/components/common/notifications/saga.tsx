import createSaga from '../../../helpers/sagas.helper';
import { notificationReducerName } from './reducer';

export const fetchNotifications = createSaga(notificationReducerName);
