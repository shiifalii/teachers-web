export const sliderProps = {
  images: [
    'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web-img/assets-img.svg',
    'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/slide-3.png',
    'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/slide-2.png',
  ],
  captions: ['Track Chapters & Topics', 'Unlock Tests', 'Analyze Performance'],
  descriptions: [
    'Easily track what Syllabus, Chapters, and Topics have been covered in your Class or Batch. This helps you to plan better.',
    'Easily unlock any test for your Class or Batch in a single tap.',
    'Easily track your Class or Batch or any individual student’s performance. Know which Chapters and Topics require further improvement.',
  ],
};

export const PASSWORD_IMAGES = (state: boolean) => {
  if (state) {
    return 'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/eye-closed-icon.png';
  } else {
    return 'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/open-eye.png';
  }
};

export const reportTypes = {
  type: ['Single', 'Consolidated'],
};
