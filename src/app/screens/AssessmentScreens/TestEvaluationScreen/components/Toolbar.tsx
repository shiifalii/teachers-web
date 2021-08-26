import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Tools } from '@tarik.djurdjevic/react-sketch';
import {
  MobileToolbarIcon,
  ToolbarIcon,
  ExpandableToolContainer,
  ToolbarIconContainer,
  UndoRedoIconContainer,
  FlexNew,
} from '../styles';
import { Flex, HiddenMobile } from 'app/components/atoms';
import {
  setSketchTool,
  undo,
  redo,
  zoomIn,
  zoomOut,
  clearPDFPage,
  toggleFullScreen,
} from '../../assessments.actions';
import AttentionPopup from './AttentionPopup';
import { INITIAL_SKETCH_TOOL } from '../../assessments.reducer';

interface Props {
  selectedSketchTool: any;
  setSketchTool: any;
  zoomIn: any;
  zoomOut: any;
  sketchRef: any;
  undo: any;
  redo: any;
  clearPDFPage: any;
  toggleFullScreen: any;
  isFullScreen: boolean;
}

function Toolbar(props: Props) {
  const [showAllClearPopup, setShowAllClearPopup] = useState(false);
  const {
    setSketchTool,
    selectedSketchTool,
    zoomIn,
    zoomOut,
    undo,
    redo,
    sketchRef,
    clearPDFPage,
    isFullScreen,
    toggleFullScreen,
  } = props;

  function _zoomIn() {
    setSketchTool({ tool: Tools.Pan });

    zoomIn();
  }
  function _zoomOut() {
    setSketchTool({ tool: Tools.Pan });

    zoomOut();
  }

  function _undo() {
    if (sketchRef.canUndo()) {
      undo();
    }
  }
  function _redo() {
    if (sketchRef.canRedo()) {
      redo();
    }
  }

  function setTool(data: any) {
    if (selectedSketchTool.tool === data.tool) {
      setSketchTool(INITIAL_SKETCH_TOOL);
    } else {
      setSketchTool(data);
    }
  }

  function onConfirm() {
    clearPDFPage();
    setShowAllClearPopup(false);
  }

  function renderUndoRedo() {
    return (
      <FlexNew align="center">
        <UndoRedoIconContainer
          style={{ margin: '5px 10px', cursor: 'pointer' }}
          align="center"
          onClick={_undo}
        >
          <UndoSvg />
        </UndoRedoIconContainer>
        <HiddenMobile>|</HiddenMobile>
        <UndoRedoIconContainer
          style={{ margin: '5px 10px', cursor: 'pointer' }}
          align="center"
          onClick={_redo}
        >
          <RedoSvg />
        </UndoRedoIconContainer>
      </FlexNew>
    );
  }
  const isPencilToolSelected = selectedSketchTool.tool === Tools.Pencil;
  const isHighlighterSelected = selectedSketchTool.tool === Tools.Highlighter;
  const canToolExpand = selectedSketchTool.canExpand;
  return (
    <>
      <MobileToolbarIcon>
        <ExpandableToolContainer
          isExpanded={isPencilToolSelected && canToolExpand}
          hideOnMobile={isHighlighterSelected && canToolExpand}
        >
          {isPencilToolSelected && canToolExpand && renderUndoRedo()}
          <ToolbarIcon
            onClick={() =>
              setTool({
                tool: Tools.Pencil,
                lineColor: '#F21D1D',
                canExpand: true,
              })
            }
          >
            <PencilSvg selected={isPencilToolSelected} />
          </ToolbarIcon>
        </ExpandableToolContainer>
        <ExpandableToolContainer
          isExpanded={isHighlighterSelected && canToolExpand}
          hideOnMobile={isPencilToolSelected && canToolExpand}
        >
          {isHighlighterSelected && canToolExpand && renderUndoRedo()}
          <ToolbarIcon
            onClick={() =>
              setTool({
                tool: Tools.Highlighter,
                lineColor: '#FFCC00',
                lineWidth: 20,
                canExpand: true,
              })
            }
          >
            <HighlighterSvg selected={isHighlighterSelected} />
          </ToolbarIcon>
        </ExpandableToolContainer>
        <ToolbarIconContainer hideOnMobile={canToolExpand}>
          <ToolbarIcon onClick={() => setShowAllClearPopup(true)}>
            <EraserSvg />
          </ToolbarIcon>
        </ToolbarIconContainer>
        <ToolbarIconContainer hideOnMobile={canToolExpand}>
          <ToolbarIcon onClick={_zoomIn}>
            <ZoomInSvg />
          </ToolbarIcon>
        </ToolbarIconContainer>
        <ToolbarIconContainer hideOnMobile={canToolExpand}>
          <ToolbarIcon onClick={_zoomOut}>
            <ZoomOutSvg />
          </ToolbarIcon>
        </ToolbarIconContainer>
        <ToolbarIconContainer hideOnMobile={canToolExpand}>
          <ToolbarIcon onClick={toggleFullScreen}>
            <FullscreenSvg selected={isFullScreen} />
          </ToolbarIcon>
        </ToolbarIconContainer>
      </MobileToolbarIcon>
      <AttentionPopup
        open={showAllClearPopup}
        onClose={() => setShowAllClearPopup(false)}
        onConfirm={onConfirm}
        title="Sure to proceed?"
        body="All the pen and highlighter marks on this page will be cleared. This Step cannot be undone."
        positiveCTAText="Yes, Proceed"
      />
    </>
  );
}

const FullscreenSvg = ({ selected }: { selected: boolean }) => {
  return selected ? (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="16" fill="#1D7DEA" />
      <path
        d="M18.0748 23.6665H19.1314C19.3251 23.6665 19.4836 23.508 19.4836 23.3143V19.4401H23.3138C23.5075 19.4401 23.666 19.2816 23.666 19.0879V18.0313C23.666 17.8376 23.5075 17.6791 23.3138 17.6791H18.427C18.0374 17.6791 17.7226 17.9939 17.7226 18.3835V23.3143C17.7226 23.508 17.8811 23.6665 18.0748 23.6665Z"
        fill="white"
      />
      <path
        d="M14.239 14.9873H9.35216C9.15845 14.9873 8.99996 14.8288 8.99996 14.6351V13.5785C8.99996 13.3848 9.15845 13.2263 9.35216 13.2263H13.1824V9.35208C13.1824 9.15837 13.3408 8.99988 13.5346 8.99988H14.5912C14.7849 8.99988 14.9434 9.15837 14.9434 9.35208V14.2829C14.9434 14.6725 14.6286 14.9873 14.239 14.9873Z"
        fill="white"
      />
      <path
        d="M13.1824 19.4401H9.35216C9.15845 19.4401 8.99996 19.2816 8.99996 19.0879V18.0313C8.99996 17.8376 9.15845 17.6791 9.35216 17.6791H14.239C14.6286 17.6791 14.9434 17.9939 14.9434 18.3835V23.3143C14.9434 23.508 14.7849 23.6665 14.5912 23.6665H13.5346C13.3408 23.6665 13.1824 23.508 13.1824 23.3143V19.4401Z"
        fill="white"
      />
      <path
        d="M17.7012 9.37417V14.261C17.7012 14.6506 18.016 14.9654 18.4056 14.9654H23.3364C23.5301 14.9654 23.6886 14.8069 23.6886 14.6132V13.5566C23.6886 13.3629 23.5301 13.2044 23.3364 13.2044H19.4622V9.37417C19.4622 9.18046 19.3037 9.02197 19.11 9.02197H18.0534C17.8597 9.02197 17.7012 9.18046 17.7012 9.37417Z"
        fill="white"
      />
    </svg>
  ) : (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="15.5"
        fill="white"
        stroke="#999999"
      />
      <path
        d="M12.7925 8H8.60377C8.26981 8 8 8.26981 8 8.60377V12.8302C8 12.9962 8.13585 13.1321 8.30189 13.1321H9.20755C9.37358 13.1321 9.50943 12.9962 9.50943 12.8302V9.50943H12.7925C12.9585 9.50943 13.0943 9.37358 13.0943 9.20755V8.30189C13.0943 8.13585 12.9585 8 12.7925 8ZM23.6981 18.8679H22.7925C22.6264 18.8679 22.4906 19.0038 22.4906 19.1698V22.4906H19.2075C19.0415 22.4906 18.9057 22.6264 18.9057 22.7925V23.6981C18.9057 23.8642 19.0415 24 19.2075 24H23.3962C23.7302 24 24 23.7302 24 23.3962V19.1698C24 19.0038 23.8642 18.8679 23.6981 18.8679ZM12.7925 22.4906H9.50943V19.1698C9.50943 19.0038 9.37358 18.8679 9.20755 18.8679H8.30189C8.13585 18.8679 8 19.0038 8 19.1698V23.3962C8 23.7302 8.26981 24 8.60377 24H12.7925C12.9585 24 13.0943 23.8642 13.0943 23.6981V22.7925C13.0943 22.6264 12.9585 22.4906 12.7925 22.4906ZM23.3962 8H19.2075C19.0415 8 18.9057 8.13585 18.9057 8.30189V9.20755C18.9057 9.37358 19.0415 9.50943 19.2075 9.50943H22.4906V12.8302C22.4906 12.9962 22.6264 13.1321 22.7925 13.1321H23.6981C23.8642 13.1321 24 12.9962 24 12.8302V8.60377C24 8.26981 23.7302 8 23.3962 8Z"
        fill="#666666"
      />
    </svg>
  );
};

const HighlighterSvg = ({ selected }: { selected: boolean }) => {
  return selected ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
    >
      <rect width="36" height="36" rx="18" fill="#1D7DEA" />
      <g clip-path="url(#clip2)">
        <path
          d="M20.5928 10.5962C20.318 10.5962 20.0536 10.6947 19.8514 10.8969L16.8388 13.9147L19.7684 16.8443L22.7862 13.8317C23.1854 13.4273 23.1854 12.774 22.7862 12.3643L21.3136 10.8969C21.1114 10.6947 20.8521 10.5962 20.5928 10.5962ZM16.8388 13.9147L13.2506 17.4977C12.8462 17.9021 12.8462 18.5554 13.261 18.9755C12.6284 19.6132 11.9854 20.251 11.3477 20.8888H14.2825L14.7284 20.4429C15.1328 20.8369 15.781 20.8317 16.1854 20.4325L19.7684 16.8443"
          fill="#1D7DEA"
        />
        <path
          d="M16.8388 13.9147L19.8514 10.8969C20.0536 10.6947 20.318 10.5962 20.5928 10.5962C20.8521 10.5962 21.1114 10.6947 21.3136 10.8969L22.7862 12.3643C23.1854 12.774 23.1854 13.4273 22.7862 13.8317L19.7684 16.8443M16.8388 13.9147L19.7684 16.8443M16.8388 13.9147L13.2506 17.4977C12.8462 17.9021 12.8462 18.5555 13.261 18.9755C12.6284 19.6132 11.9854 20.251 11.3477 20.8888H14.2825L14.7284 20.4429C15.1328 20.8369 15.781 20.8317 16.1854 20.4325L19.7684 16.8443"
          stroke="white"
        />
        <path d="M11 21.5557H24.3333V23.3334H11V21.5557Z" fill="#FFCC00" />
      </g>
      <defs>
        <clipPath id="clip2">
          <rect
            width="13.3333"
            height="16"
            fill="white"
            transform="translate(11 10)"
          />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M9.59284 0.596191C9.31803 0.596191 9.05358 0.69471 8.85136 0.896932L5.83877 3.91471L8.7684 6.84434L11.7862 3.83175C12.1854 3.4273 12.1854 2.77397 11.7862 2.36434L10.3136 0.896932C10.1114 0.69471 9.8521 0.596191 9.59284 0.596191ZM5.83877 3.91471L2.25062 7.49767C1.84617 7.90212 1.84617 8.55545 2.26099 8.97545C1.6284 9.61323 0.985434 10.251 0.347656 10.8888H3.28247L3.7284 10.4429C4.13284 10.8369 4.78099 10.8317 5.18543 10.4325L8.7684 6.84434"
          fill="white"
        />
        <path
          d="M5.83877 3.91471L8.85136 0.896932C9.05358 0.69471 9.31803 0.596191 9.59284 0.596191C9.8521 0.596191 10.1114 0.69471 10.3136 0.896932L11.7862 2.36434C12.1854 2.77397 12.1854 3.4273 11.7862 3.83175L8.7684 6.84434M5.83877 3.91471L8.7684 6.84434M5.83877 3.91471L2.25062 7.49767C1.84617 7.90212 1.84617 8.55545 2.26099 8.97545C1.6284 9.61323 0.985434 10.251 0.347656 10.8888H3.28247L3.7284 10.4429C4.13284 10.8369 4.78099 10.8317 5.18543 10.4325L8.7684 6.84434"
          stroke="#1D7DEA"
        />
        <path d="M0 11.5557H13.3333V13.3334H0V11.5557Z" fill="#FFCC00" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="13.3333" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const EraserSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="none">
      <path
        d="M15.605 4.94L10.669.336a.844.844 0 00-1.192.042L1.422 9.015a.844.844 0 00.042 1.193l3.341 3.119H.406a.282.282 0 00-.281.281c0 .155.127.281.281.281h7.887c.039 0 .075-.008.11-.022.008-.003.013-.008.019-.014.025-.014.05-.028.073-.05 0 0 .003 0 .003-.004l4.12-4.418 1.879-2.016.003-.003 1.147-1.232a.83.83 0 00.228-.605.83.83 0 00-.27-.585zm-7.436 8.387h-2.54l-3.783-3.53a.286.286 0 01-.014-.399L4.71 6.313l5.35 4.989-1.89 2.025zm7.068-7.58l-.96 1.03-5.346-4.99.956-1.026a.281.281 0 01.4-.014l4.935 4.604a.28.28 0 01.015.396z"
        fill="#1D7DEA"
      />
    </svg>
  );
};

const PencilSvg = ({ selected }: { selected: boolean }) => {
  return selected ? (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="18" fill="#1D7DEA" />
      <path
        d="M10.0434 25.954L10.0464 25.957C10.1276 26.0387 10.224 26.1036 10.3303 26.1479C10.4365 26.1922 10.5505 26.215 10.6656 26.2151C10.7625 26.2151 10.8587 26.1991 10.9504 26.1679L15.9428 24.4743L25.5229 14.8942C26.1085 14.3085 26.4375 13.5142 26.4375 12.6859C26.4374 11.8576 26.1084 11.0633 25.5227 10.4776C24.937 9.89195 24.1426 9.56295 23.3143 9.56299C22.486 9.56302 21.6917 9.89209 21.106 10.4778L11.526 20.0579L9.83256 25.0501C9.77922 25.2054 9.7707 25.3725 9.80799 25.5324C9.84528 25.6922 9.92687 25.8383 10.0434 25.954ZM21.9016 11.2733C22.2768 10.9009 22.7842 10.6925 23.3128 10.6935C23.8414 10.6945 24.348 10.9049 24.7218 11.2787C25.0956 11.6525 25.306 12.1591 25.307 12.6877C25.308 13.2163 25.0995 13.7237 24.7271 14.0989L23.4673 15.3587L20.6417 12.5331L21.9016 11.2733ZM12.5072 20.6677L19.8463 13.3285L22.6719 16.1542L15.3328 23.4932L11.0566 24.9439L12.5072 20.6677Z"
        fill="white"
      />
    </svg>
  ) : (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M13.3198 1.51129L16.6554 1.62432L16.9899 4.96029L5.30919 15.6965L1.55718 16.5172L2.42961 12.7769L13.3198 1.51129Z"
          fill="white"
        />
        <path
          d="M1.04339 16.954L1.04645 16.957C1.12755 17.0387 1.22401 17.1036 1.33027 17.1479C1.43653 17.1922 1.5505 17.215 1.66562 17.2151C1.76249 17.2151 1.85869 17.1991 1.95039 17.1679L6.94279 15.4743L16.5229 5.89423C17.1085 5.30853 17.4375 4.51416 17.4375 3.68588C17.4374 2.8576 17.1084 2.06326 16.5227 1.4776C15.937 0.891949 15.1426 0.562952 14.3143 0.562988C13.486 0.563025 12.6917 0.892092 12.106 1.4778L2.52596 11.0579L0.832558 16.0501C0.779216 16.2054 0.770701 16.3725 0.807991 16.5324C0.845281 16.6922 0.926865 16.8383 1.04339 16.954ZM12.9016 2.27328C13.2768 1.90095 13.7842 1.69247 14.3128 1.69348C14.8414 1.6945 15.348 1.90493 15.7218 2.27869C16.0956 2.65246 16.306 3.15911 16.307 3.68769C16.308 4.21627 16.0995 4.72371 15.7271 5.09889L14.4673 6.35868L11.6417 3.53307L12.9016 2.27328ZM3.50718 11.6677L10.8463 4.32855L13.6719 7.15416L6.33275 14.4932L2.05656 15.9439L3.50718 11.6677Z"
          fill="#1D7DEA"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const ZoomOutSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z"
      stroke="#1D7DEA"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5 11.5L15 15"
      stroke="#1D7DEA"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 7H9"
      stroke="#1D7DEA"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ZoomInSvg = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z"
      stroke="#1D7DEA"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5 11.5L15 15"
      stroke="#1D7DEA"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 7H9"
      stroke="#1D7DEA"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 9V5"
      stroke="#1D7DEA"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UndoSvg = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.502 15.4902H15.4873C15.3701 15.4902 15.2749 15.4515 15.2017 15.3741C15.1284 15.2967 15.0869 15.1951 15.0771 15.0694C15.0674 14.934 15.0356 14.7575 14.9819 14.5398C14.9282 14.3222 14.7573 13.9716 14.4692 13.4879C14.1812 13.0043 13.8076 12.5739 13.3486 12.1966C12.8896 11.8194 12.1938 11.4809 11.2612 11.181C10.3286 10.8812 9.24707 10.7312 8.0166 10.7312V13.4009C8.0166 13.4492 8.00928 13.4928 7.99463 13.5315C7.97998 13.5701 7.96289 13.6088 7.94336 13.6475C7.92383 13.6862 7.89697 13.7201 7.86279 13.7491C7.82861 13.7781 7.79199 13.8023 7.75293 13.8216C7.56738 13.9087 7.40137 13.8893 7.25488 13.7636L1.17578 8.77253C1.11719 8.72417 1.07324 8.66855 1.04395 8.60568C1.01465 8.5428 1 8.47751 1 8.40981C1 8.26472 1.05859 8.14381 1.17578 8.04708L7.25488 3.11405C7.40137 2.9883 7.56494 2.96654 7.74561 3.04876C7.92627 3.13097 8.0166 3.27365 8.0166 3.47677V6.07387C8.40723 6.09321 8.7832 6.12465 9.14453 6.16818C9.50586 6.2117 9.85742 6.26974 10.1992 6.34228C10.541 6.41483 10.8682 6.5043 11.1807 6.6107C11.4932 6.7171 11.791 6.84042 12.0742 6.98068C12.3574 7.12093 12.626 7.27327 12.8799 7.43771C13.1338 7.60214 13.373 7.7835 13.5977 7.98179C13.8223 8.18008 14.0322 8.39046 14.2275 8.61293C14.6475 9.09656 14.9917 9.65032 15.2603 10.2742C15.5288 10.8981 15.7119 11.4615 15.8096 11.9645C15.9072 12.4675 15.9658 12.9801 15.9854 13.5024C16.0049 14.0248 16.0073 14.3923 15.9927 14.6051C15.978 14.8179 15.9609 14.9824 15.9414 15.0984C15.9219 15.2145 15.873 15.3088 15.7949 15.3813C15.7168 15.4539 15.6191 15.4902 15.502 15.4902ZM7.54785 9.80266C8.30957 9.80266 9.0127 9.84135 9.65723 9.91873C10.3018 9.99612 10.8682 10.1098 11.3564 10.2597C11.8447 10.4096 12.2817 10.5741 12.6675 10.753C13.0532 10.9319 13.3975 11.1399 13.7002 11.3769C14.0029 11.6139 14.2568 11.8387 14.4619 12.0515C14.667 12.2643 14.8623 12.5013 15.0479 12.7625C14.8623 11.36 14.3496 10.1799 13.5098 9.22231C12.2305 7.74239 10.2432 7.00244 7.54785 7.00244C7.4209 7.00244 7.31104 6.95649 7.21826 6.8646C7.12549 6.77272 7.0791 6.6639 7.0791 6.53815V4.44887L2.20117 8.40981L7.0791 12.4143V10.2669C7.0791 10.1412 7.12305 10.03 7.21094 9.93324C7.24023 9.90423 7.27441 9.88004 7.31348 9.8607C7.35254 9.84135 7.3916 9.82684 7.43066 9.81717C7.46973 9.8075 7.50879 9.80266 7.54785 9.80266Z"
      fill="#1D7DEA"
    />
  </svg>
);

const RedoSvg = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.49805 15.4902H2.5127C2.62988 15.4902 2.7251 15.4515 2.79834 15.3741C2.87158 15.2967 2.91309 15.1951 2.92285 15.0694C2.93262 14.934 2.96436 14.7575 3.01807 14.5398C3.07178 14.3222 3.24268 13.9716 3.53076 13.4879C3.81885 13.0043 4.19238 12.5739 4.65137 12.1966C5.11035 11.8194 5.80615 11.4809 6.73877 11.181C7.67139 10.8812 8.75293 10.7312 9.9834 10.7312V13.4009C9.9834 13.4492 9.99072 13.4928 10.0054 13.5315C10.02 13.5701 10.0371 13.6088 10.0566 13.6475C10.0762 13.6862 10.103 13.7201 10.1372 13.7491C10.1714 13.7781 10.208 13.8023 10.2471 13.8216C10.4326 13.9087 10.5986 13.8893 10.7451 13.7636L16.8242 8.77253C16.8828 8.72417 16.9268 8.66855 16.9561 8.60568C16.9854 8.5428 17 8.47751 17 8.40981C17 8.26472 16.9414 8.14381 16.8242 8.04708L10.7451 3.11405C10.5986 2.9883 10.4351 2.96654 10.2544 3.04876C10.0737 3.13097 9.9834 3.27365 9.9834 3.47677V6.07387C9.59277 6.09321 9.2168 6.12465 8.85547 6.16818C8.49414 6.2117 8.14258 6.26974 7.80078 6.34228C7.45898 6.41483 7.13184 6.5043 6.81934 6.6107C6.50684 6.7171 6.20898 6.84042 5.92578 6.98068C5.64258 7.12093 5.37402 7.27327 5.12012 7.43771C4.86621 7.60214 4.62695 7.7835 4.40234 7.98179C4.17773 8.18008 3.96777 8.39046 3.77246 8.61293C3.35254 9.09656 3.0083 9.65032 2.73975 10.2742C2.47119 10.8981 2.28809 11.4615 2.19043 11.9645C2.09277 12.4675 2.03418 12.9801 2.01465 13.5024C1.99512 14.0248 1.99268 14.3923 2.00732 14.6051C2.02197 14.8179 2.03906 14.9824 2.05859 15.0984C2.07812 15.2145 2.12695 15.3088 2.20508 15.3813C2.2832 15.4539 2.38086 15.4902 2.49805 15.4902ZM10.4521 9.80266C9.69043 9.80266 8.9873 9.84135 8.34277 9.91873C7.69824 9.99612 7.13184 10.1098 6.64355 10.2597C6.15527 10.4096 5.71826 10.5741 5.33252 10.753C4.94678 10.9319 4.60254 11.1399 4.2998 11.3769C3.99707 11.6139 3.74316 11.8387 3.53809 12.0515C3.33301 12.2643 3.1377 12.5013 2.95215 12.7625C3.1377 11.36 3.65039 10.1799 4.49023 9.22231C5.76953 7.74239 7.75684 7.00244 10.4521 7.00244C10.5791 7.00244 10.689 6.95649 10.7817 6.8646C10.8745 6.77272 10.9209 6.6639 10.9209 6.53815V4.44887L15.7988 8.40981L10.9209 12.4143V10.2669C10.9209 10.1412 10.877 10.03 10.7891 9.93324C10.7598 9.90423 10.7256 9.88004 10.6865 9.8607C10.6475 9.84135 10.6084 9.82684 10.5693 9.81717C10.5303 9.8075 10.4912 9.80266 10.4521 9.80266Z"
      fill="#1D7DEA"
    />
  </svg>
);

const mapStateToProps = (state: any) => {
  return {
    selectedSketchTool:
      state.subjectiveAssessment.testEvaluation.data.selectedSketchTool,
    sketchRef: state.subjectiveAssessment.testEvaluation.data.sketchRef,
    isFullScreen: state.subjectiveAssessment.testEvaluation.data.isFullScreen,
  };
};

const mapDispatchToProps = {
  setSketchTool,
  zoomIn,
  zoomOut,
  undo,
  redo,
  clearPDFPage,
  toggleFullScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
