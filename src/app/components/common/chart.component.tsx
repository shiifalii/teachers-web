import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  .x-axis {
    text-align: center;
    padding-top: 15px;
  }
  .y-axis {
    transform: rotate(-90deg);
    position: absolute;
    top: 45%;
    left: -6%;
  }

  @media (max-width: 768px) {
    .x-axis,
    .y-axis {
      font-size: 0.8rem;
    }
    .y-axis {
      left: -15%;
    }
  }

  .dataItem-container {
    margin: 0 auto;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  min-height: 250px;
  margin-left: 15px;
  position: relative;

  .dataItem-heading {
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 3px;
  }

  @media (max-width: 768px) {
    min-height: 200px;
    .dataItem-heading {
      font-size: 10px;
    }
  }
`;

const Bars = styled.div`
  position: absolute;
  bottom: -15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
  }

  .dataItem-bar {
    width: initial;
  }
`;

const LabelContainer = styled.div`
  margin-top: 10px;
  display: flex;
  @media (max-width: 768px) {
    margin: 0 0.2rem;
  }
  align-items: center;
  justify-content: center;
  .label-icon {
    height: 10px;
    width: 10px;
    margin-right: 6px;
    display: inline-block;
    border-radius: 50%;
    @media (max-width: 768px) {
      margin-right: 2px;
    }
  }
  @media (max-width: 768px) {
    justify-content: flex-start;
    font-size: 0.7em;
  }
`;

const LabelName = styled.div`
  font-size: 0.8em;
`;

interface ChartDataItem {
  value: number;
  count: number;
  backgroundColor?: string;
  label?: string;
}

interface IProps {
  data: ChartDataItem[];
  height?: number;
  width?: number;
  style?: object;
  showLegend?: boolean;
  axisLabels: {
    xaxis: string | JSX.Element;
    yaxis: string | JSX.Element;
  };
}

function Chart(props: IProps) {
  const [containerDimensions, setContainerDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }
  }, []);

  const {
    data,
    style = {},
    showLegend = true,
    axisLabels: { xaxis, yaxis },
  } = props;
  const noOfDataItems = data.length;

  let widthOfDataItem = 0;
  let maxHeightOfDataItem = 0;

  if (containerDimensions.height && containerDimensions.width) {
    widthOfDataItem = (containerDimensions.width / noOfDataItems) * 0.82;
    maxHeightOfDataItem = containerDimensions.height * 0.8;
  }

  const maxValueDataItem = findMax(data);

  const heightMultiplier = maxHeightOfDataItem / maxValueDataItem;

  return (
    <Container>
      <div className="y-axis">{yaxis}</div>
      <ChartContainer style={{ ...style }} ref={containerRef}>
        <Bars>
          {data.map(({ value, backgroundColor, label, count }) => (
            <div className="dataItem-container" key={label}>
              <div className="dataItem-heading">
                {count} ({value}%)
              </div>
              <div
                className="dataItem-bar"
                style={{
                  backgroundColor: backgroundColor || '#d3d3d3',
                  width: widthOfDataItem,
                  height: value * heightMultiplier || 2, // show 2px height when no value available
                }}
              />
              {showLegend && (
                <LabelContainer key={label}>
                  <span
                    className="label-icon"
                    style={{
                      backgroundColor: backgroundColor || '#d3d3d3',
                    }}
                  />
                  <LabelName>{label}</LabelName>
                </LabelContainer>
              )}
            </div>
          ))}
        </Bars>
      </ChartContainer>
      <div className="x-axis">{xaxis}</div>
    </Container>
  );
}

function findMax(data: ChartDataItem[]) {
  let max = 0;
  data.forEach(({ value }) => {
    if (value > max) {
      max = value;
    }
  });
  return max;
}

export default React.memo(Chart);
