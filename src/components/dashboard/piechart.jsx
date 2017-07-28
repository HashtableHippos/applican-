import React from 'react';
import { VictoryPie } from 'victory';
import { connect } from 'react-redux';
import getPieData from '../../selectors/charts';

const PieChart = props => (
  <div>
    <h3> % Job in Progress </h3>
    <VictoryPie
      data={props.data}
      colorScale={['gold', 'cyan', 'navy', 'green']}
      height={300}
    />
  </div>
);

const mapStateToProps = state => ({ data: getPieData(state) });
export default connect(mapStateToProps, null)(PieChart);


