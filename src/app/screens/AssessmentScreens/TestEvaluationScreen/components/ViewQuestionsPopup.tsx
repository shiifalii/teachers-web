import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { TabsEdit } from '../../StudentSummaryScreen/styles';
import Tabs, { TabTypes } from './Tabs';
import { Document, Page, pdfjs } from 'react-pdf';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Loader } from 'app/components/common/loader.wrapper.component';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/
${pdfjs.version}/pdf.worker.js`;
interface Props {
  questionPdf: string;
  solutionPdf?: string;
  open: boolean;
  onClose: () => void;
}

const DialogBodyText = styled.div`
  > div:nth-of-type(2) {
    border: none;
  }
  @media (max-width: 768px) {
    br {
      display: none;
    }
  }
`;

const DialogTitleEdit = styled.div`
  font-weight: normal;
  font-size: 24px;
  line-height: 34px;
  color: #333;
`;

const PdfArea = styled.div`
  background-color: #f5f5f5;
  padding: 10px;

  .react-pdf__Page {
    width: 100%;
    overflow-x: auto;
    margin: 0 auto;
  }
`;

const TabsEditTab = styled(TabsEdit as any)`
  div {
    background-color: #fff;
    color: #1d7dea;
    padding: 0;
    margin-right: 20px;
    margin-bottom: 10px;
    line-height: 30px;
    @media (max-width: 768px) {
      display: flex;
      width: 100%;
      justify-content: space-evenly;
      margin-right: 0;
    }
  }
`;

const ZoomOut = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #666666;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    fill: #666666;
  }
`;

const ZoomIn = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #666666;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    fill: #666666;
  }
`;

const TabsEditTabNoBorder = styled(TabsEditTab as any)`
  border: none;
  @media (max-width: 769px) {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(141, 141, 141, 0.25);
    position: sticky;
    top: -15px;
    z-index: 99;
    width: calc(100vw - 1px);
    margin-left: -10px;
  }
`;

const PdfControl = styled.div`
  max-width: 95px;
  width: 100%initial;
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: 45px;
  z-index: 999;
  bottom: 50px;
  width: 100%;
  align-items: center;
`;

const DialogEdit = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    max-width: 883px;
    width: 100%;
    @media (max-width: 768px) {
      width: 100%;
      margin: 0;
      max-height: 100%;
    }
  }
  .MuiDialogContent-root {
    @media (max-width: 768px) {
      padding: 10px;
    }
  }
`;

let INITIAL_ZOOM_SIZE = 0.7;
// update scale based on device width
if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
  INITIAL_ZOOM_SIZE = 0.4;
}

function ViewQuestionsPopup(props: Props) {
  const { open, onClose, questionPdf, solutionPdf } = props;
  const [loading, setLoading] = useState(false);
  const [zoomSize, setZoomSize] = useState<number>(INITIAL_ZOOM_SIZE);

  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.View_Questions);
  const [totalQuestionPDFPages, setTotalQuestionPDFPages] = useState(0);
  const [totalSolutionPDFPages, setTotalSolutionPDFPages] = useState(0);
  const [questionPDFBlob, setQuestionPDFBlob] = useState<Blob | null>(null);
  const [solutionPDFBlob, setSolutionPDFBlob] = useState<Blob | null>(null);

  const STEP_SIZE = 0.1;

  const isQuestionTabActive = activeTab === TabTypes.View_Questions;
  const isSolutionTabActive = activeTab === TabTypes.View_Solutions;

  function zoomPlus(zoomSize: any) {
    setZoomSize(zoomSize + STEP_SIZE);
  }
  function zoomMinus(zoomSize: any) {
    if (zoomSize > 0.2) {
      setZoomSize(zoomSize - STEP_SIZE);
    }
  }

  function handleTabChange(tab: TabTypes) {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setZoomSize(INITIAL_ZOOM_SIZE);
    }
  }

  function onDocumentLoadSuccess(pdf: any, tab: TabTypes) {
    const { numPages } = pdf;
    if (tab === TabTypes.View_Questions) {
      setTotalQuestionPDFPages(numPages);
    } else {
      setTotalSolutionPDFPages(numPages);
    }
  }

  async function fetchPDFBlobs(tab: TabTypes, url: string) {
    try {
      setLoading(true);
      const blob = await fetch(url).then(res => res.blob());

      if (tab === TabTypes.View_Questions) {
        setQuestionPDFBlob(blob);
      }
      if (tab === TabTypes.View_Solutions) {
        setSolutionPDFBlob(blob);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (open) {
      setActiveTab(TabTypes.View_Questions);
      setZoomSize(INITIAL_ZOOM_SIZE);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    if (isQuestionTabActive && !questionPDFBlob && questionPdf) {
      fetchPDFBlobs(TabTypes.View_Questions, questionPdf);
    }
  }, [open, isQuestionTabActive, questionPDFBlob, questionPdf]);

  useEffect(() => {
    if (!open) {
      return;
    }
    if (isSolutionTabActive && !solutionPDFBlob && solutionPdf) {
      fetchPDFBlobs(TabTypes.View_Solutions, solutionPdf);
    }
  }, [open, isSolutionTabActive, solutionPDFBlob, solutionPdf]);

  if (!open) {
    return null;
  }

  return (
    <DialogEdit onClose={onClose} aria-labelledby="publish-result" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        <DialogTitleEdit> Questions</DialogTitleEdit>
      </DialogTitle>
      <DialogContent>
        <DialogBodyText>
          {/* <HiddenMobile> */}
          <TabsEditTabNoBorder>
            <Tabs
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              isSolutionPdfPresent={!!solutionPdf}
            />
          </TabsEditTabNoBorder>
          {/* </HiddenMobile> */}
          <PdfArea>
            {loading && <Loader />}
            {!loading && isQuestionTabActive && (
              <Document
                file={questionPDFBlob}
                onLoadSuccess={pdf =>
                  onDocumentLoadSuccess(pdf, TabTypes.View_Questions)
                }
                loading={<Loader />}
                noData={<Loader />}
              >
                {Array.apply(null, Array(totalQuestionPDFPages))
                  .map((_, i) => i + 1)
                  .map(page => (
                    <Page
                      key={page}
                      pageNumber={page}
                      scale={zoomSize}
                      loading={<Loader />}
                    />
                  ))}
              </Document>
            )}
            {!loading && isSolutionTabActive && (
              <Document
                file={solutionPDFBlob}
                onLoadSuccess={pdf =>
                  onDocumentLoadSuccess(pdf, TabTypes.View_Solutions)
                }
                loading={<Loader />}
                noData={<Loader />}
              >
                {Array.apply(null, Array(totalSolutionPDFPages))
                  .map((_, i) => i + 1)
                  .map(page => (
                    <Page
                      key={page}
                      pageNumber={page}
                      scale={zoomSize}
                      loading={<Loader />}
                    />
                  ))}
              </Document>
            )}
          </PdfArea>
          <PdfControl>
            <ZoomIn onClick={() => zoomPlus(zoomSize)}>
              <AddIcon />
            </ZoomIn>
            <ZoomOut onClick={() => zoomMinus(zoomSize)}>
              <RemoveIcon />
            </ZoomOut>
          </PdfControl>
        </DialogBodyText>
      </DialogContent>
      <DialogActions></DialogActions>
      <br />
    </DialogEdit>
  );
}

const styles = () =>
  createStyles({
    root: {
      margin: 0,
      padding: '1rem',
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      right: '0.5rem',
      top: '0.5rem',
      color: '#666666',
    },
  });

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
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

const DialogContent = withStyles(() => ({
  root: {
    padding: '1rem 2rem',
    textAlign: 'center',
  },
}))(MuiDialogContent);

const DialogActions = withStyles(() => ({
  root: {
    margin: 0,
    padding: '0.5rem',
    justifyContent: 'center',
  },
}))(MuiDialogActions);

export default ViewQuestionsPopup;
