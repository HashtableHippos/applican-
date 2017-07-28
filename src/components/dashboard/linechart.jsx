import React from 'react';
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';


const LineChart = (props) => {
  const dateCount = props.jobs.reduce((acc, curr) => {
    const dateString = new Date(curr.updatedAt).toDateString();
    (acc[dateString]) ? acc[dateString] += 1 : acc[dateString] = 1;
    return acc;
  }, {});
  const keys = Object.keys(dateCount);
  const values = Object.values(dateCount);
  const data = keys.reduce((acc, curr, idx) => {
    acc.push({ x: new Date(curr), y: values[idx] });
    return acc;
  }, []);
  return (
    <div>
      <h3> I-Can-Do <sup>&reg;</sup> Progress Tracker </h3>
      <VictoryChart
        scale={{ x: 'time' }}
      >
        <VictoryLine
          style={{
            data: { stroke: 'tomato' },
          }}
          interpolation="basis"
          data={data}
        />
        <VictoryAxis />
      </VictoryChart>
    </div>
  );
};
export default LineChart;
