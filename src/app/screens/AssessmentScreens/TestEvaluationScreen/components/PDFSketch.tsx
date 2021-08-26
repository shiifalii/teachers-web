import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { pdfjs } from 'react-pdf';
import { SketchField } from '@tarik.djurdjevic/react-sketch';
import { Flex, HiddenMobile } from 'app/components/atoms';
import Toolbar from './Toolbar';
import {
  navigate,
  inititalisePDFSketch,
  fetchPdfAndLoadPages,
  setSketchTool,
  clearPDFPage,
  pdfModified,
} from '../../assessments.actions';
import { PdfAreaContainer, PdfCount } from '../styles';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import LoaderWrapper from 'app/components/common/loader.wrapper.component';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/
${pdfjs.version}/pdf.worker.js`;

interface Props {
  url: string;
  pdfPages: Page[];
  currentPDFPageIndex: number;
  sketchRef: any;
  navigate: any;
  fetchPdfAndLoadPages: any;
  selectedSketchTool: any;
  setSketchTool: any;
  inititalisePDFSketch: any;
  clearPDFPage: any;
  pdfModified: any;
  isFullScreen: boolean;
}

interface Page {
  data: any;
  aspectRatio: {
    width: number;
    height: number;
  };
}

function PDFSketch(props: Props) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const reference = useRef<any>(null);
  const hiddenReference = useRef<any>(null);
  const {
    inititalisePDFSketch,
    fetchPdfAndLoadPages,
    currentPDFPageIndex,
    sketchRef,
    navigate,
    pdfPages,
    selectedSketchTool,
    clearPDFPage,
    url,
    pdfModified,
    isFullScreen,
  } = props;

  useEffect(() => {
    setPdfLoading(true);
  }, []);

  useEffect(() => {
    if (currentPDFPageIndex > -1) {
      setPdfLoading(false);
    }
  }, [currentPDFPageIndex]);

  useEffect(() => {
    if (currentPDFPageIndex !== -1 && sketchRef) {
      sketchRef.clear();
      sketchRef.setBackgroundFromDataUrl('');
      // sketchRef.addImg(pdfPages[currentPDFPageIndex].data, {
      //   left: 0,
      //   top: 0,
      //   scale: 1,
      // });
      if (typeof pdfPages[currentPDFPageIndex].data === 'string') {
        sketchRef.setBackgroundFromDataUrl(pdfPages[currentPDFPageIndex].data);
      } else {
        sketchRef.fromJSON(pdfPages[currentPDFPageIndex].data);
      }
      sketchRef._fc.setViewportTransform([1, 0, 0, 1, 0, 0]);
    }
  }, [currentPDFPageIndex, sketchRef, pdfPages]);

  useEffect(() => {
    if (url) {
      fetchPdfAndLoadPages({ url });
    }
  }, [url]);

  useEffect(() => {
    if (!pdfLoading) {
      inititalisePDFSketch({
        sketchRef: reference.current,
        hiddenSketchRef: hiddenReference.current,
      });
    }
  }, [pdfLoading, reference.current, hiddenReference.current]);
  return (
    <div>
      <HiddenMobile>
        <Toolbar />
      </HiddenMobile>
      {!pdfLoading && (
        <div>
          <Flex justify="center" align="center">
            <PdfCount>
              <span style={{ cursor: 'pointer' }}>
                {' '}
                {currentPDFPageIndex > 0 && (
                  <ArrowLeftIcon onClick={() => navigate({ step: -1 })} />
                )}
              </span>
              Page&nbsp;
              {currentPDFPageIndex > -1 && (
                <div>
                  {currentPDFPageIndex + 1}/{pdfPages.length}
                </div>
              )}
              <span style={{ cursor: 'pointer' }}>
                {' '}
                {currentPDFPageIndex < pdfPages.length - 1 && (
                  <ArrowRightIcon onClick={() => navigate({ step: 1 })} />
                )}{' '}
              </span>
            </PdfCount>
          </Flex>
        </div>
      )}

      <PdfAreaContainer isFullScreen={isFullScreen}>
        <LoaderWrapper isLoading={pdfLoading}>
          <SketchField
            id="canvas"
            ref={reference}
            tool={selectedSketchTool.tool}
            lineColor={selectedSketchTool.lineColor || 'black'}
            lineWidth={selectedSketchTool.lineWidth || 3}
            height={
              currentPDFPageIndex > -1 &&
              pdfPages[currentPDFPageIndex].aspectRatio.height
            }
            onObjectAdded={() => pdfModified()}
          />
        </LoaderWrapper>
      </PdfAreaContainer>

      {/* Hidden, used for combining pdf */}
      <HiddenAway>
        <SketchField
          id="canvas-hidden"
          ref={hiddenReference}
          tool={selectedSketchTool.tool}
          lineColor={selectedSketchTool.lineColor || 'black'}
          lineWidth={selectedSketchTool.lineWidth || 3}
          width={
            currentPDFPageIndex > -1 &&
            pdfPages[currentPDFPageIndex].aspectRatio.width
          }
          height={
            currentPDFPageIndex > -1 &&
            pdfPages[currentPDFPageIndex].aspectRatio.height
          }
        />
      </HiddenAway>
    </div>
  );
}

const HiddenAway = styled.div`
  position: fixed;
  left: -30000px;
  visibility: hidden;
  opacity: 0;
`;

const mapStateToProps = (state: any) => {
  return {
    pdfPages: state.subjectiveAssessment.testEvaluation.data.pdfPages,
    currentPDFPageIndex:
      state.subjectiveAssessment.testEvaluation.data.currentPDFPageIndex,
    sketchRef: state.subjectiveAssessment.testEvaluation.data.sketchRef,
    selectedSketchTool:
      state.subjectiveAssessment.testEvaluation.data.selectedSketchTool,
    isFullScreen: state.subjectiveAssessment.testEvaluation.data.isFullScreen,
  };
};

const mapDispatchToProps = {
  navigate,
  inititalisePDFSketch,
  setSketchTool,
  clearPDFPage,
  fetchPdfAndLoadPages,
  pdfModified,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(PDFSketch));
