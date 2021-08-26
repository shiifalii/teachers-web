import axios from 'axios';
import { API_BASE_URL, API_AUTH_BASE_URL } from '../constants/config.constant';
import {
  LOGIN_TOKEN_KEY,
  LOGOUT_REDIRECT_URL,
  getOrgTypeInStorage,
  setUserNameInStorage,
  setUsersCoursesInStorage,
  setOrgTypeInStorage,
  getLogoutRedirectUrl,
  setCentreDataInStorage,
  removeTokensOnLogout,
} from './local.storage.helper';
import { API_STATE } from 'app/stores/api.reducer';
import { Notification } from 'app/types/notification.types';
import {
  getConcept,
  logoutConcurrentSession,
} from 'app/helpers/private.api.helper';
import { getUserSettingsFromToken } from 'app/helpers/public.api.helper';
import debounce from 'app/helpers/debounce.helper';

/**
 *
 * @param listingData {data: [], filter: {key, value}}
 */

interface color {
  [key: string]: string;
}

export interface IListObj {
  apiState: number;
  data: any[];
  error?: string;
}

export interface IBatch {
  id: string;
  name: string;
  subjects: IChapter[];
}

export interface Chapter {
  ids: string[];
  name: string;
  proficiency: string;
  topics: {
    total: number;
    unlocked: number;
  };
}

export interface IChapter {
  chapters: Chapter[];
  subjects: {
    name: string;
    proficiency: string;
    topics: {
      total: number;
      unlocked: number;
    };
  };
}

export interface IStudent {
  id: string;
  name: string;
  enrollmentNo: string;
  submissions: { total: number; count: number };
  proficiency: string;
}

export function getSearchedData(
  data: any,
  searchKey: string | string[],
  searchText: string,
) {
  let finalData: any[] = [];
  finalData = filterData({
    data,
    filter: { key: searchKey, value: searchText },
  });
  // finalData = sortProficiencyFunction(finalData);
  return finalData;
}

export function filterData(listingData: any) {
  const { data = [], filter = {} } = listingData;
  const { key, value } = filter;
  const regexValue = new RegExp(value, 'i');
  const filteredData = data.filter((el: any) => {
    const val = typeof key === 'string' ? el[key] : get(key, el);
    return regexValue.exec(val);
  });
  return filteredData;
}

export function get(path: string[], obj: { [key: string]: any }) {
  return path.reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export function isEquivalent(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  arr1 = [...arr1].sort();
  arr2 = [...arr2].sort();
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

export function titleCase(str: string) {
  if (!str) {
    return '';
  }
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function combineField(arr: any[], key: string, seperator = ',') {
  const extractedKeys = arr.map(obj => obj[key]);
  return extractedKeys.join(seperator);
}

const colorList: color = {
  a: '#ffbc58',
  b: '#420420',
  c: '#bada55',
  d: '#002060',
  e: '#d3ffce',
  f: '#b6fcd5',
  g: '#b4eeb4',
  h: '#a0db8e',
  i: '#00ff00',
  j: '#7f00ff',
  k: '#d4af37',
  l: '#094276',
  m: '#505c5e',
  n: '#000000',
  o: '#317256',
  p: '#FFE3E3',
  q: '#99cccc',
  r: '#954bff',
  s: '#D1EAFF',
  t: '#d9a0c6',
  u: '#d0a0d9',
  v: '#a9d9a0',
  w: '#024500',
  x: '#301d12',
  y: '#596e78',
  z: '#a8d3ee',
};

export const getColorCode = (color: string) => colorList[color];

export function sortProficiencyFunction(list: any[]) {
  return list.sort((item1: any, item2: any) => {
    if (item1.proficiency === 'NA') {
      return -1;
    } else {
      return (
        item1.proficiency.replace(/[%]/g, '') -
        item2.proficiency.replace(/[%]/g, '')
      );
    }
  });
}

export const API_REQUEST_TIMEOUT = 30000;

// creating axios instance
export const publicAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_REQUEST_TIMEOUT,
});
export const createPrivateAxiosInstance = function(
  baseURL = API_AUTH_BASE_URL,
) {
  // TODO - add a way to skip this step in every call
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem(LOGIN_TOKEN_KEY),
    },
    timeout: API_REQUEST_TIMEOUT,
  });
};

function extractCount(list: any[], key: string) {
  return list.reduce((acc, obj) => {
    let total = 0;
    if (obj.stats) {
      const {
        stats: { submissions },
      } = obj;
      total = (submissions && submissions[key]) || 0;
    }
    return acc + total;
  }, 0);
}

export function extractAttemptsAndTotal(list: any[]) {
  const data = {
    totalCount: 0,
    attempted: 0,
  };
  if (list && list.length > 0) {
    data.totalCount = extractCount(list, 'total');
    data.attempted = extractCount(list, 'count');
  }
  return data;
}

export const isLoading = (state: number) => state === API_STATE.LOADING;

export const isApiFailed = (state: number) =>
  state === API_STATE.ERROR || state === API_STATE.FAILED;

const checkIfConceptIsLocked = async (
  conceptList: any[],
  chapterIds: string,
  batchId: string,
  conceptIds: string,
) => {
  const conceptArr = conceptIds.split(',');

  // Check if concept is already loaded in reduz store
  const foundConcept = conceptList.find(({ ids }: { ids: string[] }) =>
    isEquivalent(ids, conceptArr),
  );
  if (foundConcept) {
    return foundConcept.isLocked;
  }
  // If not in store then fetch from API
  const response = (await getConcept({
    chapterIds: `parentIds=${chapterIds}`,
    batchId,
  })) as {
    data: any;
  };
  const concept = response.data as { data: { list: any[] } };

  const isLocked = concept.data.list.find(({ ids }) =>
    isEquivalent(ids, conceptArr),
  )?.isLocked;
  return isLocked;
};

export const buildTestRoute = async (
  notification: Notification,
  conceptList: any[],
) => {
  try {
    const {
      _id,
      data: {
        conceptIds,
        conceptName,
        batchId,
        batchName,
        chapterIds,
        chapterName,
      },
    } = notification;

    const isConceptLocked = await checkIfConceptIsLocked(
      conceptList,
      chapterIds,
      batchId,
      conceptIds,
    );
    if (isConceptLocked) {
      return `/tests/${batchId}/${conceptIds}/${conceptName}/${isConceptLocked}/${batchName}/${conceptIds}/${chapterIds}/${chapterName}`;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPriorDateByDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const getNameByOrgType = () => {
  const orgType = getOrgTypeInStorage();
  if (orgType === 'institute') {
    return 'Batches';
  }
  return 'Classes';
};

export const intersection = (arr1: any[], arr2: any[]) => {
  const set = new Set(arr2);
  return arr1.reduce((acc, item) => {
    if (set.has(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
};

export const fetchAndSaveUserSettings = async (authToken: string) => {
  const res = await getUserSettingsFromToken({ authToken });
  if (res.data.code === 200) {
    const {
      data: { name, courses, orgType, centerData },
    } = res.data;
    localStorage.setItem(LOGIN_TOKEN_KEY, authToken!);
    setUserNameInStorage(name);
    setUsersCoursesInStorage(JSON.stringify(courses));
    setOrgTypeInStorage(orgType);
    setCentreDataInStorage(JSON.stringify(centerData));
  }
  return res;
};

export function secondsToHms(d: number) {
  d = Number(d);
  if (d === 0) {
    return '0s';
  }
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + 'h ' : '';
  var mDisplay = m > 0 ? m + 'm ' : '';
  var sDisplay = s > 0 ? s + 's' : '';
  return hDisplay + mDisplay + sDisplay;
}

export function roundOffPercentages(arr: number[]) {
  const resultArr = [...arr];
  const originalSum = resultArr.reduce((acc, val) => acc + val, 0);
  if (originalSum === 0) {
    return resultArr;
  }
  const flooredArr = resultArr.map((num, index) => ({
    num: Math.floor(num),
    index,
  }));
  const sortedArr = flooredArr.sort((a, b) => {
    const decimalPartA = resultArr[a.index] - Math.floor(a.num);
    const decimalPartB = resultArr[b.index] - Math.floor(b.num);

    if (decimalPartA < decimalPartB) {
      return -1;
    } else if (decimalPartB < decimalPartA) {
      return 1;
    }
    return 0;
  });
  const flooredTotalSum = sortedArr.reduce((acc, val) => acc + val.num, 0);
  let diff = 100 - flooredTotalSum;
  let index = sortedArr.length - 1;
  while (diff > 0 && index > -1) {
    sortedArr[index].num += 1;
    index -= 1;
    diff -= 1;
  }
  sortedArr.forEach(val => {
    resultArr[val.index] = val.num;
  });
  return resultArr;
}

function redirectOnSessionExpiry(message: string) {
  const redirectUrl = getLogoutRedirectUrl();
  if (redirectUrl) {
    //@ts-ignore
    window.location = `${redirectUrl}?redirected=true&error=${message}`;
  } else {
    window.location.assign(`/login?redirected=true&error=${message}`);
  }
  localStorage.removeItem(LOGOUT_REDIRECT_URL);
}

export const redirectOnSessionExpired = debounce(redirectOnSessionExpiry, 250);

export async function logout() {
  try {
    // logout from other sessions (like teachersv2)
    await logoutConcurrentSession();

    // remove tokens from localStorage
    removeTokensOnLogout();
  } catch (error) {
    console.log(error);

    // remove tokens from localStorage
    removeTokensOnLogout();
  }
}

export async function logoutAndRedirectOnSessionExpiry(message: string) {
  await logout();
  redirectOnSessionExpired(message);
}

export function asyncDelay(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export function getFormattedDate(date: Date) {
  return `${date.getDate()} ${date.toLocaleString('default', {
    month: 'short',
  })} ${date.getFullYear()}`;
}

export function getFormattedTime(date: Date) {
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000);
}
