import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { ClassCount } from 'app/components/common/common.screen.styles';
import { CardListing } from 'app/screens/StudentAnalyticsScreen/styles';
import { Grid } from 'app/components/common/common.screen.styles';
import { makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import { Flex } from 'app/components/atoms';
import { Container } from 'app/components';

export const useStyles = makeStyles({
  table: {
    minWidth: 650,
    '@media (max-width: 768px)': {
      width: '100%',
      minWidth: '100%',
    },
    '& .MuiTableCell-root': {
      fontWeight: 'normal',
      fontSize: '16px',
      border: '1px solid #E1E1E1',
    },
    '& .MuiTableHead-root': {
      backgroundColor: '#EFF6FF',
      color: '#333',
    },
    // '& .MuiTableRow-root':{
    //   display: 'grid',
    //   gridTemplateColumns: 'auto auto auto',
    // },
  },
});

export const FullScreenContainer = styled(Container as any)<{
  isFullScreen?: boolean;
}>`
${({ isFullScreen }) => {
  if (isFullScreen) {
    return `
    position: fixed;
    top: 5%;
    left: 50%;
    transform: translate(-50%) scaleY(1);  
    z-index: 2;

    @media(max-width: 768px) {
      top: 0;
    }
    `;
  }
}}
}
`;

export const PdfContainer = styled.div`
  display: grid;
  grid-template-columns: 75% 1fr;
  position: relative;
  @media (max-width: 768px) {
    display: block;
    margin-bottom: 100px;
  }
`;

export const MarksTitle = styled.h3`
  background: #e9e9e9;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 20px;
  font-weight: normal;
  color: #333;
  margin-top: -15px;
  margin-right: -15px;
  margin-left: -5px;

  span:nth-of-type(2) {
    font-weight: normal;
    font-size: 14px;
    color: #1d7dea;
    cursor: pointer;
  }
`;

export const TotalMarksPill = styled.div`
  background: rgba(0, 0, 0, 0.15);
  border-radius: 62px;
  color: #fff;
  padding: 10px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  span {
    margin-left: 5px;
  }
`;

export const TotalMarksPdf = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SaveIcon = styled.div<{ disabled: boolean }>`
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  cursor: pointer;
  ${({ disabled }) => {
    if (disabled) {
      return `
        opacity: 0.4;
      `;
    }
  }}
`;

export const ButtonEdit = styled(Button)`
  background-color: #fff;
  color: #1d7dea;
  padding: 8px 40px;
  font-weight: normal;
  border: 1px solid #1d7dea;
  box-shadow: none;
  text-transform: capitalize;
  &:hover {
    background-color: #fff;
    box-shadow: none;
  }
`;

export const GridEdit = styled(Grid as any)`
  grid-template-columns: 50% 50%;
`;

export const SelectTitle = styled.h3`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #333333;
  padding: 0 10px;
`;

export const MarksAwarded = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  padding: 10px;
  margin: 15px 0;
  > div:nth-of-type(1) {
    font-size: 16px;
    line-height: 19px;
  }
  span {
    color: #1d7dea;
    font-size: 16px;
  }

  > div:nth-of-type(2) {
    font-size: 14px;
    line-height: 19px;
  }
`;

export const BoxEdit = styled(Box)`
  padding: 10px;
  display: grid;
  grid-template-columns: 50% 50%;

  button {
    margin: 5px;
    text-transform: capitalize;
    padding: 0px 40px;
  }
`;

export const QuestionPanel = styled.div`
  background: #eef6ff;
  padding: 20px;
  @media (max-width: 768px) {
    margin-top: 30px;
  }
  h3 {
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
  }
`;

export const QuestionItem = styled.span`
  display: inline-block;
  text-align: center;
  font-size: 12px;
  div {
    text-align: center;
    margin: 10px 10px 0 0;
  }
  span {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid #999999;
    font-size: 14px;
    background-color: #fff;
    cursor: pointer;
  }
  .active {
    background-color: var(--brand-color);
    color: #fff;
    border: none;
  }
  .active-green {
    background-color: #4dcf38;
    color: #fff;
    border: none;
  }
`;

export const MobileToolbar = styled.div<{
  expanded: boolean;
  isFullScreen?: boolean;
}>`
  position: fixed;
  bottom: 0;
  background-color: white;
  width: 100%;
  left: 0;
  padding: 15px 10px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: all 0.4s ease-in-out;
  z-index: 10;
  @media (max-width: 768px) {
    bottom: ${({ isFullScreen }) => (isFullScreen ? '-30px' : '-155px')};
  }

  ${({ expanded }) => {
    if (expanded) {
      return `
        height: calc(100vh + 20px);
        top: -20px;
        bottom: 0;
        padding-top: 30px;
      `;
    }
  }}
`;

export const MobileToolbarHeader = styled.div<{ expanded: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .muted {
    color: #999;
  }
  .bold {
    color: #333;
  }
  .navigation {
    margin-left: auto;
  }
`;

export const MobileToolbarBody = styled.div`
  margin-top: 10px;

  button {
    text-transform: capitalize;
  }
`;

export const MobileToolbarIcon = styled.div`
  position: fixed;
  top: 50%;
  transform: translate(-25%, -20%);

  @media (max-width: 768px) {
    display: flex;
    position: relative;
    transform: none;
    justify-content: space-between;
    align-items: center;
  }
`;
export const UndoRedoIconContainer = styled(Flex as any)`
  margin: 5px 10px;
  cursor: pointer;
  @media (max-width: 768px) {
    background: #ffffff;
    border: 1px solid #999999;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
  }
`;
export const ExpandableToolContainer = styled.div<{
  isExpanded: boolean;
  hideOnMobile?: boolean;
}>`
  margin: 10px 0;
  ${({ isExpanded, hideOnMobile }) => {
    if (hideOnMobile) {
      return `
        @media(max-width: 768px) {
          display: none;
        }
      `;
    }
    if (isExpanded) {
      return `
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #ffffff;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.250651);
      border-radius: 25px;

      @media(max-width: 768px) {
        box-shadow: none;
        width: 100%;
        flex-direction: row-reverse;
        justify-content: flex-start;
      }
      `;
    }
  }}
  @media (max-width: 768px) {
    margin: 0 5px;
  }
`;
export const ToolbarIconContainer = styled.div<{ hideOnMobile?: boolean }>`
  margin: 10px 0;
  @media (max-width: 768px) {
    margin: 0 5px;
    ${({ hideOnMobile }) => {
      if (hideOnMobile) {
        return `
          display: none;
        `;
      }
    }}
  }
`;
export const ToolbarIcon = styled.div`
  margin-left: auto;
  background: #ffffff;
  border: 1px solid #999999;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    transform: scale(0.8);
  }
`;

export const InputMarks = styled.div`
  display: inline-block;
  input {
    border: 1px solid #999999;
    border-radius: 4px;
    padding: 10px;
    max-width: 90px;
    margin-right: 5px;
    font-size: 12px;
  }
  span {
    font-weight: normal;
    font-size: 2rem;
    color: #333;
  }
`;

export const SlideUpToggle = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #1d7dea;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -40%);
  img {
    transform: scale(0.9);
  }
`;

export const MainContainer = styled.div`
  border-left: 1px solid #e9e9e9;
`;

export const QuestionControlPanelContainer = styled.div`
  max-width: 300px;
  padding-left: 5px;
`;

export const Mark = styled.span<{
  type: 'Pill' | 'Round';
  active?: boolean;
  children?: any;
  onClick?: any;
}>`
  font-size: 12px;
  cursor: pointer;
  margin: 5px;

  ${({ active }) => {
    if (active) {
      // styles when marks is active
      return `
        background-color: var(--brand-color);
        color: #fff;
        border: 1px solid var(--brand-color);
      `;
    }
    // styles when marks is inactive
    return `
      border: 1px solid #999999;
    `;
  }}

  ${({ type }) => {
    if (type === 'Pill') {
      // styles when Pill shape
      return `
        padding: 3px 25px;
        border-radius: 50px;
      `;
    }
    // styles when Round shape
    return `
      display: flex;
      height: 40px;
      width: 40px;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    `;
  }}
`;

// test evaluation summary styles

export const HeaderContainer = styled(ClassCount as any)`
  display: flex;
  justify-content: flex-start;

  @media (min-width: 768px) {
    margin-top: 1.5rem;
  }
`;

export const Title = styled.h3`
  margin: 10px 0 20px 0;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #333333;
  @media (max-width: 768px) {
    color: #333333;
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 400;
    line-height: 19px;
  }
`;

export const CardListingEdit = styled(CardListing as any)`
  padding: 0;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    background-color: #f4f8f9;
    padding: 0;
  }
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.15);
  color: #333;
  padding: 18px 0;
  @media (max-width: 360px) {
    padding: 5px 0;
  }
`;

export const FooterItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  @media (max-width: 768px) {
    font-size: 10px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const FooterItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    justify-content: flex-start;
    margin: 5px 0;
  }

  span {
    display: flex;
    img {
      margin-right: 5px;
    }
  }
`;

export const SummaryList = styled.div`
  font-size: 12px;
  background: #fff;
  padding: 10px;
  border-bottom: 1px solid #e9e9e9;
  @media (max-width: 360px) {
    font-size: 10px;
  }
`;

export const SummaryItem = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

export const SummaryTitle = styled.div`
  font-size: 14px;
`;

export const TextMuted = styled.span`
  color: #999999;
`;

export const SummaryItemFooter = styled.span`
  color: #999999;
  font-size: 12px;
`;

export const TotalMarks = styled.div`
  margin: 10px 0;
  position: fixed;
  bottom: -15px;
  width: calc(100% - 30px);
  background-color: #fff;
  padding: 15px 10px;
  left: 15px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e9e9e9;

  span:nth-of-type(2) {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #333333;
  }
`;

export const TabsEdit = styled.div`
  background: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  div {
    border: none;
  }
`;

export const Checked = styled.span`
  color: #3db413;
  text-transform: capitalize;
`;

export const NotChecked = styled.span`
  color: #666666;
`;

export const StickyFooterBar = styled.div`
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  padding: 10px;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.15);
  button {
    text-transform: capitalize;
  }
`;

export const MarkContainer = styled.div`
  margin: 15px 0;
  span {
    padding: 7px 12px;
  }
`;

export const PdfAreaContainer = styled.div<{ isFullScreen?: boolean }>`
  max-height: 600px;
  overflow-y: scroll;
  border: 10px solid #dadada;
  border-radius: 5px;
  margin: 15px 30px;
  @media (max-width: 768px) {
    margin: 15px;
  }

  ${({ isFullScreen }) => {
    if (isFullScreen) {
      return `
      height: 90vh;
      max-height: 90vh;
      `;
    }
  }}
`;

export const PdfCount = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 30px;
  color: #fff;
  position: absolute;
  bottom: 50px;
  z-index: 2;
  min-width: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  @media (max-width: 768px) {
    position: initial;
  }

  span {
    display: flex;
  }
`;

export const ButtonCapitalize = styled(Button)`
  text-transform: capitalize;
`;

export const FlexNew = styled(Flex)`
  position: absolute;
  left: -75px;
  background: #fff;
  border-radius: 30px;
  z-index: -1;
  @media (max-width: 768px) {
    left: 65px;
    background: #fff;
    z-index: 1;
    position: initial;
  }
  @media (max-width: 360px) {
    z-index: 1;
    left: 30px;
    position: initial;
  }
`;
