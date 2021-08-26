import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Radio,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {
  CPP_SUBJECT_ICON_MATHEMATICS,
  CPP_SUBJECT_ICON_HINDI,
  CPP_SUBJECT_ICON_PHYSICS,
  CPP_SUBJECT_ICON_CHEMISTRY,
  CPP_SUBJECT_ICON_ENGLISH,
  CPP_SUBJECT_ICON_SOCIAL_SCIENCE,
  CPP_SUBJECT_ICON_SCIENCE,
  CPP_SUBJECT_ICON_MAT,
  CPP_SUBJECT_ICON_POLITICAL_SCIENCE,
  CPP_SUBJECT_ICON_GEOGRAPHY,
  CPP_SUBJECT_ICON_TAMIL,
  CPP_SUBJECT_ICON_HISTORY,
  CPP_SUBJECT_ICON_TELEGU,
  CPP_SUBJECT_ICON_KANNADA,
  CPP_SUBJECT_ICON_COMMUNICATIVE_ENGLISH,
  CPP_SUBJECT_ICON_NUTRITION_DIETETICS,
  CPP_SUBJECT_ICON_SANSKRIT,
  CPP_SUBJECT_ICON_BIO_BOTANY,
  CPP_SUBJECT_ICON_PHYSICAL_EDUCATION,
  CPP_SUBJECT_ICON_BIO_CHEMISTRY,
  CPP_SUBJECT_ICON_BIO_ZOOLOGY,
  CPP_SUBJECT_ICON_ACCOUNTS,
  CPP_SUBJECT_ICON_BUSINESS_MATHS,
  CPP_SUBJECT_ICON_BUSINESS_MATHS_STATISTICS,
  CPP_SUBJECT_ICON_BIOLOGY,
  CPP_SUBJECT_ICON_ZOOLOGY,
  CPP_SUBJECT_ICON_COMPUTER_SCIENCE,
  CPP_SUBJECT_ICON_COMPUTER_TECHNOLOGY,
  CPP_SUBJECT_ICON_COMPUTER_APPLICATIONS,
  CPP_SUBJECT_ICON_ECONOMICS,
  CPP_SUJECT_ICON_COMMERCE,
  CPP_SUBJECT_ICON_BUSINESS_STUDIES,
  CPP_SUBJECT_ICON_AUDIT,
} from 'app/constants/s3-images.constants';
import { HiddenDesktop } from 'app/components';

const useStyles = makeStyles(theme => ({
  root: {
    '& button': {
      background: 'transparent',
      border: 0,
    },
    '& #nested-list-subheader': {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid #e9e9e9',
      fontSize: '16px',
      lineHeight: '16px',
      color: '#333',
      padding: '15px',
      alignItems: 'center',
    },
    '& .listItems': {
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '17px',
      color: '#333',
      backgroundColor: '#fff',
      marginBottom: '12px',
      borderRadius: '4px',
      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.1)',
      '& .ListItemContent': {
        display: 'flex',
        alignItems: 'center',
        '& img': {
          paddingRight: '16px',
        },
      },
      '& .subjectName': {
        fontSize: '12px',
        lineHeight: '14px',
        color: '#999',
      },
      '&>last-child': {
        marginBottom: '150px',
      },
    },
    '& .subList': {
      backgroundColor: '#fff',
      marginTop: '-12px',
      marginBottom: '12px',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '17px',
      color: '#333',
    },
    '& .drawerFooter': {
      position: 'fixed',
      bottom: 0,
      padding: '20px 15px',
      width: '100%',
      backgroundColor: '#fff',
      boxShadow: '0px -1px 4px rgba(198, 198, 198, 0.5)',
      display: 'flex',
      justifyContent: 'space-around',
      '& .cancelBtn': {
        background: '#FFFFFF',
        border: '1px solid #1D7DEA',
        borderRadius: '4px',
        color: '#1D7DEA',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '14px',
        padding: '12px 20px',
        width: '120px',
      },
      '& .applyBtn': {
        background: '#1D7DEA',
        border: '1px solid #1D7DEA',
        width: '120px',
        borderRadius: '4px',
        color: '#fff',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '14px',
        padding: '12px 20px',
        '&.disabled': {
          opacity: '.6',
        },
      },
    },
  },

  nested: {
    padding: '16px 26px',
    borderTop: '1px solid #e9e9e9',
    '&.active': {
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '4px',
        height: '68px',
        left: '0px',
        borderRadius: '0px 7px 7px 0',
        backgroundColor: '#1d7dea',
        '@media (max-width: 768px)': {
          display: 'none',
        },
      },
    },
    '& img': {
      paddingRight: '16px',
    },
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
}));

interface IGoalsList {
  goals: any[];
  changeSubject: any;
  isMobileMode: boolean;
}

export default function GoalsList({
  goals: targetExams,
  changeSubject,
  isMobileMode,
}: IGoalsList) {
  const classes = useStyles();

  const [selectedTargetExam, setSelectedTargetExam] = useState(
    targetExams[0]._id,
  );
  const [selectedSubject, setSelectedSubject] = useState(
    targetExams[0].subjects[0]._id,
  );
  const [openendTargetExam, setOpenTargetExam] = useState('');

  const handleTargetExamClick = (id: string) => {
    if (openendTargetExam === id) setOpenTargetExam('');
    else setOpenTargetExam(id);
  };

  const handleSubjectClick = (id: string, targetId: string) => {
    setSelectedSubject(id);
    setSelectedTargetExam(targetId);
    changeSubject({ subjectId: id, targetExamId: targetId });
  };

  const subjectImages: Map<string, string> = new Map(
    Object.entries({
      Chemistry: CPP_SUBJECT_ICON_CHEMISTRY,
      English: CPP_SUBJECT_ICON_ENGLISH,
      Hindi: CPP_SUBJECT_ICON_HINDI,
      Physics: CPP_SUBJECT_ICON_PHYSICS,
      Science: CPP_SUBJECT_ICON_SCIENCE,
      'Social Science': CPP_SUBJECT_ICON_SOCIAL_SCIENCE,
      Mathematics: CPP_SUBJECT_ICON_MATHEMATICS,
      MAT: CPP_SUBJECT_ICON_MAT,
      History: CPP_SUBJECT_ICON_HISTORY,
      'Political Science': CPP_SUBJECT_ICON_POLITICAL_SCIENCE,
      Geography: CPP_SUBJECT_ICON_GEOGRAPHY,
      Sanskrit: CPP_SUBJECT_ICON_SANSKRIT,
      Tamil: CPP_SUBJECT_ICON_TAMIL,
      Telegu: CPP_SUBJECT_ICON_TELEGU,
      Kannada: CPP_SUBJECT_ICON_KANNADA,
      'Communicative English': CPP_SUBJECT_ICON_COMMUNICATIVE_ENGLISH,
      'Physical Education': CPP_SUBJECT_ICON_PHYSICAL_EDUCATION,
      'Nutrition and Dietetics': CPP_SUBJECT_ICON_NUTRITION_DIETETICS,
      Biology: CPP_SUBJECT_ICON_BIOLOGY,
      // Botany: CPP_SUBJECT_ICON_BIO_BOTANY Image not found
      Zoology: CPP_SUBJECT_ICON_ZOOLOGY,
      'Bio-Chemistry': CPP_SUBJECT_ICON_BIO_CHEMISTRY,
      'Bio-Botany': CPP_SUBJECT_ICON_BIO_BOTANY,
      'Bio-Zoology': CPP_SUBJECT_ICON_BIO_ZOOLOGY,
      'Computer Science': CPP_SUBJECT_ICON_COMPUTER_SCIENCE,
      'Computer Technology': CPP_SUBJECT_ICON_COMPUTER_TECHNOLOGY,
      'Computer Applications': CPP_SUBJECT_ICON_COMPUTER_APPLICATIONS,
      Accounts: CPP_SUBJECT_ICON_ACCOUNTS,
      'Business Mathematics': CPP_SUBJECT_ICON_BUSINESS_MATHS,
      'Business Mathematics and Statistics': CPP_SUBJECT_ICON_BUSINESS_MATHS_STATISTICS,
      Economics: CPP_SUBJECT_ICON_ECONOMICS,
      Commerce: CPP_SUJECT_ICON_COMMERCE,
      'Business Studies': CPP_SUBJECT_ICON_BUSINESS_STUDIES,
      Auditing: CPP_SUBJECT_ICON_AUDIT,
    }),
  );

  useEffect(() => {
    if (!isMobileMode) {
      setOpenTargetExam(targetExams[0]._id);
    } else {
      setOpenTargetExam('');
    }
  }, [isMobileMode]);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {targetExams.map(({ _id, name, subjects }: any) => (
        <div key={_id}>
          <ListItem
            style={{ width: '100%' }}
            className="listItems"
            button
            onClick={() => handleTargetExamClick(_id)}
          >
            <ListItemText
              primary={
                <div className="ListItemContent">
                  <div>
                    <img
                      alt={`Goal Icon - ${name}`}
                      src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/goal_icon.svg"
                    />
                  </div>
                  <div>
                    <p>{name}</p>
                    <span className="subjectName">
                      {subjects.length} Subjects
                    </span>
                  </div>
                </div>
              }
            />
            {openendTargetExam === _id ? <RemoveIcon /> : <AddIcon />}
          </ListItem>
          <Collapse in={openendTargetExam === _id} timeout="auto" unmountOnExit>
            <List className="subList" component="div" disablePadding>
              {subjects.map(
                ({ _id: subjectId, name, selected = false }: any) => (
                  <ListItem
                    onClick={() => handleSubjectClick(subjectId, _id)}
                    key={subjectId}
                    button
                    className={`${classes.nested} ${
                      selectedSubject === subjectId ? 'active' : ''
                    }`}
                  >
                    <img alt={name} src={subjectImages.get(name)} />
                    <ListItemText primary={name} />
                    <HiddenDesktop>
                      <svg
                        width="8"
                        height="12"
                        viewBox="0 0 8 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.999999 1L6 6L0.999999 11"
                          stroke="#999999"
                          strokeWidth="2"
                        />
                      </svg>
                    </HiddenDesktop>
                  </ListItem>
                ),
              )}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
}
