import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { HiddenDesktop, HiddenMobile } from 'app/components';
const Container = styled.div`
  position: relative;
  .x-axis {
    text-align: center;
    padding-top: 36px;
  }
  .y-axis {
    transform: rotate(-90deg);
    position: absolute;
    top: 45%;
    left: -6%;
  }

  .y-axis-line {
    position: absolute;
    min-height: 250px;
  }

  .y-axis-container {
    position: absolute;
    bottom: 17px;
    width: 38px;
    border-right: 1px solid #e9e9e9;
    text-align: right;
    padding-right: 13px;
  }

  .dataItem-bar-yaxis {
    position: relative;
    top: 8px;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  .dataItem-bar-yaxis::after {
    content: '';
    width: 20px;
    background: #e9e9e9;
    height: 1px;
    position: absolute;
    margin-top: 11px;
    left: 28px;
    border: none;
    @media (max-width: 768px) {
      width: 10px;
      left: 32px;
    }
  }

  @media (max-width: 768px) {
    .x-axis-label {
      font-size: 12px;
      line-height: 14px;
      color: #999;
      text-align: center;
      padding-top: 18px;
    }
    .x-axis,
    .y-axis {
      font-size: 0.8rem;
    }
    .x-axis {
      padding-top: 6px;
    }
    .y-axis {
      left: -10%;
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
  padding: 0 15px;
  .dataItem-heading {
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 3px;
  }

  @media (max-width: 768px) {
    min-height: 200px;
    margin-left: 28px;
    .dataItem-heading {
      font-size: 10px;
    }
  }
`;

const Bars = styled.div`
  position: absolute;
  bottom: -15px;
  width: calc(100% - 30px);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 33.33% 33.33% 33.33%;
  }

  .dataItem-bar {
    width: initial;
    @media (max-width: 768px) {
      // width: 70px;
    }
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
  // count: number;
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

function StudentAnalyticsChart(props: IProps) {
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
    widthOfDataItem = ((containerDimensions.width - 30) / noOfDataItems) * 0.82;
    maxHeightOfDataItem = containerDimensions.height * 0.8;
  }

  const maxValueDataItem = Math.max(findMax(data), 60);

  // const heightMultiplier = maxHeightOfDataItem / maxValueDataItem;
  const heightMultiplier = 4;

  const rangeList = (steps: number, upperLimit: number) => {
    const list = [];
    for (let i = 0; i < upperLimit + steps; i += steps) list.push(i);
    return list.reverse();
  };

  return (
    <Container>
      <div className="y-axis">{yaxis}</div>
      <div
        className="y-axis-line"
        style={{ height: 50 + maxValueDataItem * heightMultiplier }}
      >
        <div className="y-axis-container">
          {rangeList(5, maxValueDataItem).map((item: any, index: number) => (
            <div
              key={index}
              className="dataItem-bar-yaxis"
              style={{
                height: 5 * heightMultiplier || 2, // show 2px height when no value available
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <ChartContainer
        style={{ ...style, height: 50 + maxValueDataItem * heightMultiplier }}
        ref={containerRef}
      >
        <Bars>
          {data.map(({ value, backgroundColor, label }) => (
            <div className="dataItem-container" key={label}>
              <div className="dataItem-heading"></div>
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
                  <HiddenMobile>
                    <LabelName>{label} Performance</LabelName>
                  </HiddenMobile>
                  <HiddenDesktop>
                    <LabelName>{label}</LabelName>
                  </HiddenDesktop>
                </LabelContainer>
              )}
            </div>
          ))}
        </Bars>
      </ChartContainer>
      <HiddenDesktop>
        <div className="x-axis-label">Performance</div>
      </HiddenDesktop>
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

export default React.memo(StudentAnalyticsChart);
