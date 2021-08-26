import { Container } from 'app/components';
import {
  BackIcon,
  CardHeader,
  CppListingContainer,
  ClassCount,
  CommonScreenBackground,
} from 'app/components/common/common.screen.styles';
import HeaderComponent from 'app/components/common/header.component';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid1, Heading, useStyles } from './styles';

interface ICppCompletePaperScreen {}

export default function CppCompletePaperScreen({}: ICppCompletePaperScreen) {
  const history = useHistory();
  const classes = useStyles();
  return (
    <>
      <HeaderComponent />
      <CommonScreenBackground>
        <CardHeader>
          <Container>
            <br />
            <Grid1>
              <ClassCount>
                <BackIcon>
                  <img
                    src={
                      'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/back-icon.svg'
                    }
                    alt="back-icon"
                    onClick={() => history.goBack()}
                  />
                </BackIcon>
                <span>
                  <Heading>Create CPP</Heading>
                </span>
              </ClassCount>
            </Grid1>
          </Container>
        </CardHeader>
        <Container>
          <CppListingContainer>
            <div className={classes.questionListing}>
              <h5 className="questionsettingHeading">5. Question Settings </h5>
              <p>Select the correct answer for every question</p>
              <div className="subSectionContainer">
                <div className="secListContainer">
                  <ul className="secList">
                    <li className="active">
                      <span>Sec - I</span>
                    </li>
                    <li>
                      <span>Sec - II</span>
                    </li>
                    <li>
                      <span>Sec - III</span>
                    </li>
                  </ul>
                  <div className="upload-btn-wrapper">
                    <button className="btn">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.00026 0L4.17366 2.89738C3.89215 3.1793 3.95474 3.37807 4.34799 3.37807H5.92554L5.92527 6.89875C5.92527 7.50664 6.40609 8 6.99972 8C7.59308 8 8.07417 7.50692 8.07417 6.89875L8.07444 3.3778H9.6528C10.0455 3.37807 10.1076 3.17875 9.82632 2.89683L7.00026 0Z"
                          fill="#1D7DFE"
                        />
                        <path
                          d="M13.7043 7H11.9137C11.7497 7 11.6177 7.11595 11.6177 7.25939V11.9127H2.38262V7.25939C2.38262 7.11595 2.2503 7 2.08661 7H0.296014C0.132318 7 0 7.11595 0 7.25939V12.5676C0 13.3575 0.73382 14 1.63518 14H12.3651C13.2668 14 14 13.357 14 12.5676V7.25939C14.0003 7.11595 13.8683 7 13.7043 7Z"
                          fill="#1D7DFE"
                        />
                      </svg>
                      Upload Solutions
                    </button>
                    <input type="file" name="myfile" />
                  </div>
                </div>

                <Accordion className="subSectionAccordion">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="questionPaperAccordionHeading"
                  >
                    <h3>Sub Section - 1 ( Questions 04 )</h3>
                    <p>Type : MMCQ , Marks : +4, -1</p>
                  </AccordionSummary>
                  <AccordionDetails className="accordionDetails">
                    <p className="selectAnswer">
                      <b>
                        Q 1.<span>*</span>
                      </b>
                      Select the correct answer
                    </p>

                    <div className="answerOption">
                      <span className="active">
                        A
                        <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/checkIcon.svg" />
                      </span>
                      <span>B</span>
                      <span>C</span>
                      <span>D</span>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
            <div className={classes.pageInfoListing}></div>
          </CppListingContainer>
        </Container>
      </CommonScreenBackground>
      {/*       
      <SimpleSnackbar
        mode="error"
        state={isApiFailed(studentListData.apiState)}
        onClose={resetStudentSearchResultsApi}
        message={'Unable to fetch student list for the test.'}
      /> */}
    </>
  );
}
