export default class Storage {
  static setItem(key: string) {}
}
export const LOGIN_TOKEN_KEY = 'token';
const USER_NAME_KEY = 'name';
const USER_COURSES_KEY = 'courses';
const ORG_TYPE = 'org_type';
const CENTRE_DATA_KEY = 'centreData';
const HIDE_UNREAD_NOTIFICATION_COUNT = 'hide_unread_notification_count';
export const LOGOUT_REDIRECT_URL = 'logout_redirect_url';

export const setOrgTypeInStorage = function(orgType: string) {
  return localStorage.setItem(ORG_TYPE, orgType);
};

export const getOrgTypeInStorage = function() {
  return localStorage.getItem(ORG_TYPE);
};

export const setUserNameInStorage = function(name: string) {
  return localStorage.setItem(USER_NAME_KEY, name);
};

export const setCentreDataInStorage = function(name: string) {
  return localStorage.setItem(CENTRE_DATA_KEY, name);
};

export const getUserNameFromStorage = function() {
  return localStorage.getItem(USER_NAME_KEY);
};

export const getCentreDataFromStorage = function() {
  return localStorage.getItem(CENTRE_DATA_KEY);
};

export const setUsersCoursesInStorage = function(courseIds: string) {
  return localStorage.setItem(USER_COURSES_KEY, courseIds);
};

export const getUsersCoursesFromStorage = function() {
  const courses = localStorage.getItem(USER_COURSES_KEY);
  if (courses) {
    return JSON.parse(courses);
  }
  return [];
};

export const setHideUnreadNotificationCountFlag = function() {
  return localStorage.setItem(HIDE_UNREAD_NOTIFICATION_COUNT, 'true');
};

export const getHideUnreadNotificationCountFlag = function() {
  return localStorage.getItem(HIDE_UNREAD_NOTIFICATION_COUNT);
};

export const isLogin = function() {
  const token = localStorage.getItem(LOGIN_TOKEN_KEY);
  return !!token;
};

export const removeTokensOnLogout = function() {
  localStorage.removeItem(LOGIN_TOKEN_KEY);
  localStorage.removeItem(HIDE_UNREAD_NOTIFICATION_COUNT);
  localStorage.removeItem(ORG_TYPE);
};

export const setLogoutRedirectUrl = (url: string) => {
  localStorage.setItem(LOGOUT_REDIRECT_URL, url);
};

export const getLogoutRedirectUrl = () => {
  return localStorage.getItem(LOGOUT_REDIRECT_URL);
};

export const getCourseNameById = function(
  courseId: string,
  isFullName: boolean = false,
) {
  try {
    const courses = getUsersCoursesFromStorage();
    const course: any = courses.find((course: any) => course._id === courseId);
    return isFullName ? course.name : course.name.split('-')[0].trim();
  } catch (err) {
    console.error(err);
  }
  return '';
};
