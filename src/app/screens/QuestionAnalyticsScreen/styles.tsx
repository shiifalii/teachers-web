import styled from 'styled-components';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

export const ViewSolutionContainer = styled.div`
  margin-top: 0.8rem;
  border: 1px solid #e9e9e9;
  font-size: 1.1rem;
`;

export const FullWidthButton = styled(Button)({
  display: 'block',
  width: '100%',
  padding: '1rem 0',
  fontWeight: 'normal',
});

export const FlexPaper = styled(Paper)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1em;
  margin-bottom: 10px;
  width: 35vw;
  @media (max-width: 768px) {
    width: 100vw;
  }
  .heading {
    font-size: 1.3rem;
  }
`;

export const AlignedIconButton = styled(IconButton)({
  alignSelf: 'flex-start',
  position: 'absolute',
  top: '50%',
  left: '0',
  transform: 'translateY(-50%)',
});

export const SolutionContainer = styled.div`
  width: 100%;
  padding: 1rem;
  .heading {
    margin: 0.5rem 0;
    font-size: 1.2rem;
  }
  .overflowContainer {
    width: 100%;
    overflow: auto;
    height: 100%;
  }
`;

export const ChoicesGridStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingBottom: '1rem',
    },
    choice: {
      padding: '10px 1rem',
      color: '#666666',
      fontSize: '14px',
      background: '#FDFDFD',
      minHeight: '64px',
      overflow: 'auto',
    },
  }),
);

export const Page = styled.div`
  background-color: #fff;
  margin-top: -3em;
  color: var(--text-color);
  border-radius: 4px;
  position: relative;
  @media (max-width: 768px) {
    margin-top: 1em;
  }
`;

export const QuestionContainer = styled.div`
  padding: 1rem;
  .qNo {
    margin-right: 5px;
  }
  .question-heading {
    display: grid;
    grid-template-columns: 41% 15% 15% 15% 16%;
    width: 100%;
  }
  .question-preview {
    white-space: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90%;
    display: flex;
    height: 26px;
    @media (max-width: 768px) {
      white-space: initial;
      max-width: 200px;
    }
  }
  .MuiAccordionSummary-root {
    margin-bottom: 0.5rem;
  }
`;

export const QuestionHeader = styled.div`
  display: grid;
  grid-template-columns: 40% 15% 15% 15% 15%;
  padding: 1rem 1rem 0 1rem;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
  div:first-of-type {
    justify-content: left;
  }
  div {
    display: flex;
    justify-content: center;
  }
`;

export const Tag = styled.span`
  background: #f6f6f6;
  display: inline-block;
  opacity: 0.5;
  border: 1px solid #d3d3d3;
  box-sizing: border-box;
  border-radius: 26px;
  margin-right: 10px;
  font-size: 12px;
  padding: 0 10px;
`;

export const Bold = styled.span`
  font-weight: 500;
`;

export const QuestionNavigationContainer = styled.div`
  padding: 1rem 0;
  min-width: 20%;
  display: flex;

  > div {
    margin: 0 10px;
    cursor: pointer;
  }
`;

export const FilterIcon = styled.div`
  cursor: pointer;
  color: #fff;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const CorrectAns = styled.span`
  min-width: 20px;
`;

export const DesktopListing = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileListing = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: grid;
    .question-preview img {
      max-width: 100% !important;
    }
  }
  > div:nth-of-type(2) {
    @media (max-width: 768px) {
      display: grid;
      grid-template-columns: 50% 50%;
      margin-top: 10px;
    }
  }
`;

export const TextMuted = styled.div`
  font-size: 13px;
  color: #999;
  margin-bottom: 10px;
`;

export const QuestionAnalyticeDetail = styled.div`
  .QuestionAnalticsMain{
    display:inline-block;
    width:25%;
    @media (min-width:500px) and (max-width:768px){
      width:50%;
      margin-top: 10px;
    }
    @media (min-width:320px) and (max-width:499px){
      width:100%;
      margin-top: 10px;
  }
  .QuestionTagimg{
    display:inline-block;
    height:41px;
    
  }
    .QuestionTagname{
      display:inline-block;
       padding-left:6px;
      span{
        font-size:13px;
        line-height:13px;
      }
    }
    .tooltip button{
      padding:0px;
    }
    .QuestionAnalyticsDetail{
      display:block;
    }
  `;
