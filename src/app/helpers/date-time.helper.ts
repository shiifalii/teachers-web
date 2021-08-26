export const monthNames = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const formatDateWithMonthName = (date: string) => {
  const convertedDate = new Date(date);
  return (
    convertedDate.getDate() +
    ' ' +
    monthNames[convertedDate.getMonth()] +
    ' ' +
    convertedDate.getFullYear()
  );
};

export const getFormattedTime = (date: string) => {
  const convertedDate = new Date(date);
  return (
    (convertedDate.getHours() % 12) +
    ':' +
    (convertedDate.getMinutes() > 9
      ? convertedDate.getMinutes()
      : '0' + convertedDate.getMinutes()) +
    ' ' +
    (convertedDate.getHours() > 11 ? 'PM' : 'AM')
  );
};

export const formatDateDDMMYYYY = (date: string, separator = '/') => {
  const convertedDate = new Date(date);
  return (
    convertedDate.getDate() +
    separator +
    (convertedDate.getMonth() + 1) +
    separator +
    convertedDate.getFullYear()
  );
};

export const formatDateToTimePassed = (date: string) => {
  // created AT string
  let nowTime = new Date().getTime() / 1000;
  let createdTime = new Date(date).getTime() / 1000;
  let diffTime = nowTime - createdTime;
  let seconds = diffTime;
  let minutes = diffTime / 60;
  let hours = minutes / 60;
  let days = hours / 24;
  let createdAtString = '';
  if (Math.floor(days) > 1) {
    createdAtString = Math.floor(days) + ' days ago';
  } else if (Math.floor(days) === 1) {
    createdAtString = Math.floor(days) + ' day ago';
  } else if (Math.floor(days) === 0 && Math.floor(hours) > 1) {
    createdAtString = Math.floor(hours) + ' hours ago';
  } else if (Math.floor(days) === 0 && Math.floor(hours) === 1) {
    createdAtString = Math.floor(hours) + ' hour ago';
  } else if (Math.floor(hours) === 0 && Math.floor(minutes) > 1) {
    createdAtString = Math.floor(minutes) + ' minutes ago';
  } else if (Math.floor(hours) === 0 && Math.floor(minutes) === 1) {
    createdAtString = Math.floor(hours) + ' minute ago';
  } else if (Math.floor(minutes) === 0 && Math.floor(seconds) > 1) {
    createdAtString = Math.floor(seconds) + ' seconds ago';
  } else if (Math.floor(minutes) === 0 && Math.floor(seconds) === 1) {
    createdAtString = Math.floor(seconds) + ' second ago';
  }
  return createdAtString;
  // end created At string
};
