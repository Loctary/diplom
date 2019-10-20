import React, { Component } from 'react';
import { findDOMNode, render } from 'react-dom';
import Highcharts from 'highcharts';
import HighMaps from 'highcharts/highmaps';
import drilldown from 'highcharts/modules/drilldown';
import map from 'highcharts/modules/map';
import uaAll from './uaAll';

class CustomHighMap extends Component {
  componentDidMount() {
    // load modules
    drilldown(Highcharts);

    const data = [
      ['ua-my', 0],
      ['ua-ks', 1],
      ['ua-kc', 2],
      ['ua-zt', 3],
      ['ua-sm', 4],
      ['ua-dt', 5],
      ['ua-dp', 6],
      ['ua-kk', 7],
      ['ua-lh', 8],
      ['ua-pl', 9],
      ['ua-zp', 10],
      ['ua-sc', 11],
      ['ua-kr', 12],
      ['ua-ch', 13],
      ['ua-rv', 14],
      ['ua-cv', 15],
      ['ua-if', 16],
      ['ua-km', 17],
      ['ua-lv', 18],
      ['ua-tp', 19],
      ['ua-zk', 20],
      ['ua-vo', 21],
      ['ua-ck', 22],
      ['ua-kh', 23],
      ['ua-kv', 24],
      ['ua-mk', 25],
      ['ua-vi', 26],
    ];

    const options = {
      title: {
        text: 'HighMap Test',
      },
      plotOptions: {
        map: {
          states: {
            hover: {
              color: '#EEDD66',
            },
          },
        },
      },
      colorAxis: {
        min: 0,
        minColor: '#E6E7E8',
        maxColor: '#005645',
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },

      subtitle: {
        text: 'USA',
        floating: true,
        align: 'right',
        y: 50,
        style: {
          fontSize: '16px',
        },
      },
      series: [
        {
          mapData: uaAll,
          data,
          name: 'USA',
          dataLabels: {
            enabled: true,
            format: '{point.name}',
          },
        },
      ],
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom',
        },
      },
    };

    this.chart = new HighMaps.Map(findDOMNode(this), options);
  }

  componentWillUnmount() {
    // this.chart.destroy();
  }

  render() {
    return <div className="in-highchart" />;
  }
}

export default CustomHighMap;
