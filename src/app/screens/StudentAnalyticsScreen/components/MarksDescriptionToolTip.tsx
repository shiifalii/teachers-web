import React from 'react';
import InfoToolTip from 'app/components/common/info.tooltip';

function MarksDescriptionToolTip() {
  return (
    <InfoToolTip
      title={
        <p style={{ padding: '0.5rem' }}>
          The <span style={{ color: '#77BD30' }}>Green</span> colour denotes
          marks <span style={{ color: '#77BD30' }}>&gt;75%</span> ,{' '}
          <span style={{ color: '#FF850B' }}>Orange</span> denotes marks between{' '}
          <span style={{ color: '#FF850B' }}>(35-75)%</span> and{' '}
          <span style={{ color: '#E15050' }}>Red</span> denotes marks{' '}
          <span style={{ color: '#E15050' }}>&lt; 35%</span>
        </p>
      }
    />
  );
}

export default MarksDescriptionToolTip;
