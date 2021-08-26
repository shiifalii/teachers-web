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
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100vw',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    '@media (max-width: 768px)': {
      width: '100vw',
      minWidth: '100%',
    },
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
      borderBottom: '1px solid #e9e9e9',
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
      borderBottom: '1px solid #e9e9e9',
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
    paddingLeft: theme.spacing(4),
  },
}));

interface IStudentFilterList {
  courses: any[];
  handleClose: any;
  handleApply: any;
}

export default function StudentFilterList({
  courses: targetExams,
  handleClose,
  handleApply,
}: IStudentFilterList) {
  const classes = useStyles();

  const [selectedTargetExam, setSelectedTargetExam] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Filter
          <button onClick={handleClose}>
            <CloseIcon />
          </button>
        </ListSubheader>
      }
      className={classes.root}
    >
      {targetExams.map(({ _id, name, subjects }: any) => (
        <div key={_id}>
          <ListItem
            style={{ width: '100%' }}
            className="listItems"
            button
            onClick={() => setSelectedTargetExam(_id)}
          >
            <ListItemText
              primary={
                <div>
                  <p>{name}</p>
                  <span className="subjectName">
                    {subjects.length} Subjects
                  </span>
                </div>
              }
            />
            <Radio checked={selectedTargetExam === _id} />
          </ListItem>
          <Collapse
            in={selectedTargetExam === _id}
            timeout="auto"
            unmountOnExit
          >
            <List className="subList" component="div" disablePadding>
              {subjects.map(({ _id, name, selected = false }: any) => (
                <ListItem
                  onClick={() => setSelectedSubject(_id)}
                  key={_id}
                  button
                  className={`${classes.nested} ${
                    selectedSubject === _id ? 'active' : ''
                  }`}
                >
                  <ListItemText className="nestedList" primary={name} />
                  <Radio checked={selectedSubject === _id} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}

      <div className="drawerFooter">
        <button className="cancelBtn" onClick={handleClose}>
          Cancel
        </button>
        <button
          disabled={selectedTargetExam === '' || selectedSubject === ''}
          className={`applyBtn ${
            selectedTargetExam === '' || selectedSubject === ''
              ? 'disabled'
              : ''
          }`}
          onClick={() =>
            handleApply({
              targetExam: selectedTargetExam,
              subject: selectedSubject,
            })
          }
        >
          Apply
        </button>
      </div>
    </List>
  );
}
