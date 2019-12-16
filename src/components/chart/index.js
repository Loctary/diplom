/* App.js */
import React from 'react';
import CanvasJSReact from '../../libs/canvasjs.react';

// eslint-disable-next-line prefer-destructuring
const { CanvasJSChart } = CanvasJSReact;

class App extends React.PureComponent {
  render() {
    const {
      data1, data2, format, title, name1, name2, chartTitle,
    } = this.props;
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: 'light2', // "light1", "dark1", "dark2"
      title: {
        text: chartTitle,
      },
      axisY: {
        title,
        includeZero: false,
        suffix: `${format.slice(3)}`,
      },
      axisX: {
        title: 'Рік',
        prefix: '',
        interval: 1,
      },
      data: [{
        type: 'line',
        toolTipContent: `{x} рік: ${format}`,
        dataPoints: data1,
        name: name1,
        showInLegend: true,
      }, {
        type: 'line',
        toolTipContent: `{x} рік: ${format}`,
        dataPoints: data2,
        name: name2,
        showInLegend: true,
      }],
    };
    return (
      <div>
        <CanvasJSChart options={options} />
        {/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
      </div>
    );
  }
}
export default App;
