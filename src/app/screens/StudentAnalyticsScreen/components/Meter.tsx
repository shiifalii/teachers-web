import React from 'react';
import { MeterContainer, MeterBar, MeterContainerEdit } from '../styles';

const colorMappings = {
  lowScore: {
    // for <35%
    primaryColor: '#E15050',
    secondaryColor: '#FFF5F2',
  },
  mediumScore: {
    // for <75%
    primaryColor: '#FF850B',
    secondaryColor: '#FFEAD4',
  },
  highScore: {
    // for >75%
    primaryColor: '#77BD30',
    secondaryColor: '#E5FFE8',
  },
};

const getTypeOfScore = (score: number, total: number) => {
  if (score < 0.35 * total) {
    return 'lowScore';
  } else if (score < 0.75 * total) {
    return 'mediumScore';
  } else {
    return 'highScore';
  }
};

interface MeterProps {
  score: number;
  total: number;
}

function Meter(props: MeterProps) {
  const { total, score } = props;
  const typeOfScore = getTypeOfScore(score, total);
  const { primaryColor, secondaryColor } = colorMappings[typeOfScore];
  const width = score <= 0 ? '0px' : `${(score / total) * 100}%`;
  return (
    <MeterContainerEdit color={secondaryColor}>
      <MeterBar color={primaryColor} width={width} />
    </MeterContainerEdit>
  );
}

export default Meter;
