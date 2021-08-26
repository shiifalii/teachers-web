import styled from 'styled-components';
import makeStyles from '@material-ui/core/styles/makeStyles';
// import { constants } from 'zlib';

export const useStyles = makeStyles({
  searchBatchStyle: {
    padding: '5px 15px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    border: '1px solid #E9E9E9',
    '@media (max-width: 768px)': {
      backgroundColor: '#fff',
      width: 'calc(100vw - 75px)',
      margin: '1em 0 0 0;',
    },
  },
});

export const FilterIcon = styled.div`
  cursor: pointer;
  margin-left: 20px;
  color: #fff;
  @media (max-width: 768px) {
    display: inline-block;
    margin-left: 6px;
  }
`;

export const StudentAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.8em;
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;

export const MarksHeading = styled.h3`
  font-weight: normal;
  font-size: 1.1rem;
  .marksScored {
    color: #333;
  }
  .totalMarks {
    color: #999;
  }
`;

export const MeterContainer = styled.div<{
  color: string;
  children: JSX.Element;
}>`
  width: 100%;
  max-width: 150px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
`;

export const MeterContainerEdit = styled(MeterContainer)`
  @media (max-width: 768px) {
    height: 4px;
    width: 20vw;
  }
`;

export const MeterBar = styled.div<{ color: string; width: string }>`
  width: ${({ width }) => (width ? width : '100%')};
  height: 100%;
  border-radius: 4px;
  background-color: ${({ color }) => color};
`;

export const AvatarContainer = styled.div`
  position: relative;
`;

export const RankBadge = styled.div`
  position: absolute;
  bottom: 0;
  right: 5px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 0.7rem;
  background-color: #1d7dea;
  @media (max-width: 768px) {
    height: 15px;
    width: 15px;
  }
`;

export const StudentAnalyticsScreenBackground = styled.div`
  background-color: #f4f8f9;
  color: #fff;
  padding-bottom: 2em;
  min-height: calc(100vh - 70px);
`;
export const CardHeader = styled.div`
  min-height: 165px;
  background-color: var(--brand-color);
  @media (max-width: 768px) {
    min-height: initial;
    padding: 1em 0;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 75% 25%;
  justify-content: center;
  align-items: center;
  margin-top: 1.2em;
  @media (max-width: 768px) {
    grid-template-columns: 70% 30%;
    margin-top: 0px;
    padding-top: 10px;
    
    }
  }
`;

export const ClassCount = styled.div`
  font-size: 1.5em;
  /* margin-top: 1em; */
  @media (max-width: 768px) {
    font-size: 1em;
  }
  span:nth-of-type(2) {
    font-size: 1em;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  span:nth-of-type(3) {
    font-size: 16px;
  }
`;

export const BackIcon = styled.span`
  cursor: pointer;
  width: 26px;
  height: 21px;
  margin: 0 1em 0 0;
  @media (max-width: 768px) {
    margin: 0 0.3em 0 0;
    transform: scale(0.8);
  }
`;

export const CardListing = styled.div`
  background-color: #fff;
  margin-top: -3em;
  color: var(--text-color);
  border-radius: 4px;
  @media (max-width: 768px) {
    margin-top: 1em;
  }
  .MobileviewHeading {
    padding: 15px 10px 15px 30px;
    border-bottom: 1px solid #e9e9e9;
    display: grid;
    grid-template-columns: 82% 13% 5%;
    align-items: center;
    @media (max-width: 768px) {
      padding: 15px 10px 15px 20px;
      grid-template-columns: 68% 24% 8%;
    }
  }
  .studentName {
    color: #666666;
    font-size: 16px;
  }
  .MuiIconButton-root {
    @media (max-width: 768px) {
      padding: 0px;
    }
  }
`;

export const Listing = styled.ul`
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #f5f5f5;
    transition: all 0.4s ease-in-out;
  }
  &:last-child() {
    border: none;
  }

  li {
    display: grid;
    grid-template-columns: 83% 14% 4%;
    padding: 1.5em;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      grid-template-columns: 70% 20% 10%;
      padding-right: 0;
    }
    .infoicon {
      @media (max-width: 768px) {
        display: none;
      }
    }
    .studentName {
      font-size: 16px;
      color: #333333;
    }
    .enrollmentNo {
      font-size: 13px;
      color: #999999;
      line-height: 13px;
    }
    .scoreDiv {
      width: 80%;
    }
    .notattempt {
      font-size: 14px;
    }
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  display: block;
  margin: 4px 2px;
  height: 40px;
  width: 40px;
  vertical-align: bottom;

  @media (max-width: 768px) {
    width: 30px;
    display: inline-block;
    div {
      display: inline-block;
    }
  }

  .searchbutton {
    position: absolute;
    font-size: 22px;
    width: 100%;
    margin: 0;
    padding: 0;
    border-radius: 4px;
  }

  .search:focus + .searchbutton {
    transition-duration: 0.4s;
    background-color: white;
    color: black;
  }

  .expandright {
    left: auto;
    right: 0; /* Button width-1px */
  }

  .expandright:focus {
    padding: 0 10px 0 16px;
  }
`;

export const Inputstyle = styled.input`
  position: absolute;
  left: 0; /* Button width-1px (Not 50px/100% because that will sometimes show a 1px line between the search box and button) */
  background-color: white;
  outline: none;
  border: none;
  padding: 0;
  width: 0;
  height: 100%;
  z-index: 10;
  transition-duration: 0.4s;

  &:focus {
    max-width: 363px;
    width: calc(100vw - 63px);
    padding: 0 16px 0;
    background-color: #fff;
  }
`;

export const LabelButton = styled.label`
  display: inline-block;
  margin: 1px 2px;
  background-color: #fff;
  font-size: 14px;
  padding-left: 32px;
  padding-right: 32px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #444;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  @media (max-width: 768px) {
    height: 34px;
    line-height: 34px;
  }

  &:hover {
    transition-duration: 0.4s;
    color: black;
  }
`;

export const GlassIcon = styled.span`
  display: inline-block;
  pointer-events: none;
  transform: rotate(-45deg) scale(1.8);
  color: #1d7dea;
  @media (max-width: 768px) {
    transform: rotate(-45deg) scale(1.5);
  }
`;

export const StudentHeading = styled.span`
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
