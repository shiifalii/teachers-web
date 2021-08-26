import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { Theme, withStyles } from '@material-ui/core/styles';
import { Styles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from '../styles';
import LoaderWrapper from 'app/components/common/loader.wrapper.component';
import { isLoading } from 'app/helpers/comman.helper';
import { TEACHERSV2_URL } from 'app/constants/config.constant';
import { LOGIN_TOKEN_KEY } from 'app/helpers/local.storage.helper';
const styles: Styles<Theme, any, string> = (theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props: any) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div className={classes.typographyHeading}>{children}</div>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

interface ICppDetailDialog {
  onClose: any;
  open: any;
  dataPassed: any;
}

export interface ITestData {
  _id: string;
  name: string;
  chapter: string;
  goal: string;
  status: string;
  questions: number;
  marks: number;
  duration: number;
  createdBy: string | null;
  sectionsInfo: any;
  updatedAt: any;
  timeString: string;
}

function getSelectedGoal(id: any) {
  const localCourses: string | null = localStorage.getItem('courses');
  let parsedCourses = JSON.parse(localCourses ? localCourses : '');
  for (let i = 0; i < parsedCourses.length; i++) {
    if (id === parsedCourses[i]._id) {
      return parsedCourses[i].name;
    }
  }
  return '';
}

function getTimeString(dateString: any) {
  let nowTime = new Date().getTime() / 1000;
  let createdTime = new Date(dateString).getTime() / 1000;
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
}

export default function CppDetailDialog({
  onClose,
  open,
  dataPassed,
}: ICppDetailDialog) {
  const handleClose = () => {
    onClose();
  };
  let testData: ITestData = {
    name: '',
    chapter: '',
    goal: '',
    status: '',
    questions: 0,
    marks: 0,
    duration: 0,
    createdBy: '',
    sectionsInfo: [],
    updatedAt: '',
    timeString: '',
    _id: '',
  };
  if (dataPassed && dataPassed.data && dataPassed.data.test) {
    const testInfo = dataPassed.data.test;
    testData = {
      name: testInfo.name || '',
      chapter:
        (testInfo.courseSyllabus.chapterData &&
          testInfo.courseSyllabus.chapterData.length &&
          testInfo.courseSyllabus.chapterData[0] &&
          testInfo.courseSyllabus.chapterData[0].chapters &&
          testInfo.courseSyllabus.chapterData[0].chapters.length &&
          testInfo.courseSyllabus.chapterData[0].chapters[0].name) ||
        '',
      goal: getSelectedGoal(testInfo.courses[0]),
      status: testInfo.status,
      questions: testInfo.settings.noOfQuestions,
      marks: testInfo.settings.totalMarks,
      duration: testInfo.settings.duration,
      createdBy: localStorage.getItem('name'),
      sectionsInfo: testInfo.data,
      updatedAt: testInfo.updatedAt,
      timeString: getTimeString(testInfo.updatedAt),
      _id: testInfo._id,
    };
  }
  const classes = useStyles();
  const authToken = localStorage.getItem(LOGIN_TOKEN_KEY);

  const handleCppCompletePaperPreview = (testId: string) => {
    window.open(
      // `${TEACHERSV2_URL}/public/login?token=${authToken}&redirectUrl=tests/${testId}&testName=${testData.name}`,
      // `http://localhost:4505/public/login?token=${authToken}&redirectUrl=cpp/${testId}`,
      `${TEACHERSV2_URL}/public/login?token=${authToken}&redirectUrl=cpp/${testId}`,
      '_blank',
    );
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      classes={{ paper: classes.dialogpaper1 }}
    >
      <LoaderWrapper isLoading={isLoading(dataPassed.apiState)}>
        <DialogTitle
          className={classes.DialogHeaderDetails}
          onClose={handleClose}
        >
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/test-Icon.svg" />
          <div className={classes.headingContainer}>
            <div className={classes.detailsHeading}>
              <h5>{testData.name}</h5>
              <span className={classes.publishText}>{testData.status}</span>
              <span className={classes.daysText}>{testData.timeString}</span>
            </div>
            <div>
              <span className={classes.daysText}>Goal: {testData.goal}</span>
              <span className={classes.daysText}> Ch: {testData.chapter}</span>
            </div>
          </div>
          <p className={classes.quesDetails} style={{ paddingLeft: '0' }}>
            <span>
              <b>Questions</b> : {testData.questions}
            </span>
            <span>
              <b>Marks</b> : {testData.marks}
            </span>
            <span>
              <b>Duration</b> : {testData.duration} min
            </span>
            <span>
              <b>Created By</b> : {testData.createdBy}
            </span>
          </p>
        </DialogTitle>
        <DialogContent className={classes.DialogContentList}>
          <SubSectionItem
            dataPassed={testData.sectionsInfo}
            classesPassed={classes}
          />
        </DialogContent>
        <DialogActions className={classes.dialogFooter1}>
          <Button
            onClick={() => handleCppCompletePaperPreview(testData._id)}
            color="primary"
          >
            View Complete Paper
          </Button>
        </DialogActions>
      </LoaderWrapper>
    </Dialog>
  );
}
function getAllTaggedConcepts(questionData: any) {
  let returnedData: any[] = [];
  for (let i = 0; i < questionData.length; i++) {
    for (let j = 0; j < questionData[i].concepts.length; j++) {
      returnedData.push(questionData[i].concepts[j].name);
    }
  }
  returnedData = returnedData.filter(function(item, pos) {
    return returnedData.indexOf(item) == pos;
  });
  return returnedData;
}
const SubSectionItem = ({ dataPassed, classesPassed }: any) => {
  let sectionObj = {
    subSecName: '',
    secName: '',
    subSecType: '',
    totalQuestions: 0,
    positiveMarks: 0,
    negativeMarks: 0,
    taggedConcepts: [''],
  };
  let allSubSectionData: any = [];
  if (dataPassed && dataPassed.sections && dataPassed.sections.length > 0) {
    for (let i = 0; i < dataPassed.sections.length; i++) {
      for (let j = 0; j < dataPassed.sections[i].subSection.length; j++) {
        sectionObj = {
          subSecName: dataPassed.sections[i].subSection[j].name,
          secName: dataPassed.sections[i].name,
          subSecType:
            dataPassed.sections[i].subSection[j].questions[0].questionType,
          totalQuestions: dataPassed.sections[i].subSection[j].noOfQuestions,
          positiveMarks: dataPassed.sections[i].subSection[j].positiveMarks,
          negativeMarks: dataPassed.sections[i].subSection[j].negativeMarks,
          taggedConcepts: getAllTaggedConcepts(
            dataPassed.sections[i].subSection[j].questions,
          ),
        };
        allSubSectionData.push(sectionObj);
      }
    }
  }
  return (
    <ul className={classesPassed.detailListContainer}>
      {allSubSectionData &&
        allSubSectionData.length &&
        allSubSectionData.map((subSectData: any, i: any) => (
          <li key={i}>
            <p>
              <b>{subSectData.subSecName}</b>
              <svg
                width="4"
                height="4"
                viewBox="0 0 4 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="2" cy="2" r="2" fill="#666666" />
              </svg>
              <span>{subSectData.subSecType}</span>
              <svg
                width="4"
                height="4"
                viewBox="0 0 4 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="2" cy="2" r="2" fill="#666666" />
              </svg>
              <span>{subSectData.totalQuestions} Questions</span>
              <svg
                width="4"
                height="4"
                viewBox="0 0 4 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="2" cy="2" r="2" fill="#666666" />
              </svg>
              <span>
                Marks : +{subSectData.positiveMarks}, -
                {subSectData.negativeMarks}
              </span>
            </p>
            <h6>Tagged Concepts</h6>

            {subSectData.taggedConcepts &&
              subSectData.taggedConcepts.length > 0 &&
              subSectData.taggedConcepts.map((concept: any, i: any) => (
                <div className="tagChapterName" key={i}>
                  {concept}
                </div>
              ))}
          </li>
        ))}
    </ul>
  );
};
