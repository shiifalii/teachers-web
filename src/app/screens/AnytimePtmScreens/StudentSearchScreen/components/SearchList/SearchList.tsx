import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { useStyles } from '../../styles';

interface ISearchList {
  studentList: any[];
  handleClick: any;
}

const SearchList = React.forwardRef(
  ({ studentList, handleClick }: ISearchList, ref: any) => {
    // !!!!!!!!!! Use memo later to restrict re-rendering
    const classes = useStyles();

    return (
      <List ref={ref} component="nav" className={classes.searchStudentList}>
        {studentList.map(({ _id, name, batchName, enrollmentNo }: any) => (
          <ListItem button key={_id} onClick={() => handleClick(_id)}>
            <div className={classes.searchStudentName}>
              <h3>{name}</h3>
              <span>Class {batchName}</span> . <span>ID - {enrollmentNo}</span>
            </div>

            {/* 
          <div>
            <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/cross-icon.svg" />
          </div>
           */}
          </ListItem>
        ))}
      </List>
    );
  },
);

export default SearchList;
