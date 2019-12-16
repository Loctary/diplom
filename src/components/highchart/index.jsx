import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
// import $ from 'jquery';
// Import Highcharts
import Highcharts from 'highcharts/highmaps';
import drilldow from 'highcharts/modules/drilldown';
import dataModule from 'highcharts/modules/data';
import HighchartsReact from 'highcharts-react-official';
import './uaAll';

drilldow(Highcharts);
dataModule(Highcharts);

const data = Highcharts.geojson(Highcharts.maps['countries/ua/ua-all']);
const separators = Highcharts.geojson(Highcharts.maps['countries/ua/ua-all'], 'mapline');
console.log(data);

// Set drilldown pointers
data.forEach((el, i) => {
  el.drilldown = el.properties['hc-key'];
  el.value = 26 - i; // Non-random bogus data
});

window.Highcharts = Highcharts;

const options = {
  chart: {
    // events: {
    //     drilldown(e) {
    //         if (!e.seriesOptions) {
    //             const chart = this;
    //             const mapKey = `countries/ua/${e.point.drilldown}-all`;
    //             // Handle error, the timeout is cleared on success
    //             var fail = setTimeout(function () {
    //                 if (!Highcharts.maps[mapKey]) {
    //                     chart.showLoading(`<i class="icon-frown"></i> Failed loading ${e.point.name}`);
    //                     fail = setTimeout(function () {
    //                         chart.hideLoading();
    //                     }, 1000);
    //                 }
    //             }, 3000);

    //             // Show the spinner
    //             chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

    //             // Load the drilldown map
    //             $.getScript(`https://code.highcharts.com/mapdata/${mapKey}.js`, function () {
    //                 data = Highcharts.geojson(Highcharts.maps[mapKey]);

    //                 // Set a non-random bogus value
    //                 $.each(data, function (i) {
    //                     this.value = i;
    //                 });

    //                 // Hide loading and add series
    //                 chart.hideLoading();
    //                 clearTimeout(fail);
    //                 chart.addSeriesAsDrilldown(e.point, {
    //                     name: e.point.name,
    //                     data,
    //                     dataLabels: {
    //                         enabled: true,
    //                         format: '{point.name}',
    //                     },
    //                 });
    //             });
    //         }

    //         this.setTitle(null, { text: e.point.name });
    //     },
    //     drillup() {
    //         this.setTitle(null, { text: '' });
    //     },
    // },
  },
  title: {
    text: 'Custom Chart Title',
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },

  colorAxis: {
    min: 0,
    max: 25,
    tickInterval: 1,
    stops: [[0, '#F1EEF6'], [0.65, '#900037'], [1, '#500007']],
    labels: {
      format: '{value}',
    },
  },

  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom',
    },
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

  series: [
    {
      data,
      name: 'Україна',
      dataLabels: {
        enabled: true,
        format: '{point.properties.postal-code}',
      },
    },
    {
      type: 'mapline',
      data: separators,
      color: 'silver',
      enableMouseTracking: false,
      animation: {
        duration: 500,
      },
    },
  ],

  drilldown: {
    activeDataLabelStyle: {
      color: '#FFFFFF',
      textDecoration: 'none',
      textOutline: '1px #000000',
    },
    drillUpButton: {
      relativeTo: 'spacingBox',
      position: {
        x: 0,
        y: 60,
      },
    },
  },
};

const mapStateToProps = (state) => ({
  reduxData: state.data,
});

const CustomHighcharts = (props) => {
  const { reduxData } = useSelector(mapStateToProps, shallowEqual);

  const setMaxValue = (data) => {
    const values = Object.values(data);
    const maxValue = Math.max(...values);
    options.colorAxis.max = maxValue;
    options.colorAxis.tickInterval = maxValue / 5;
  };

  const setMapValues = (data) => {
    const newData = {
      ...data,
      'ua-dt': 0,
      'ua-lh': 0,
      'ua-kr': 0,
      'ua-sc': 0,
    };
    const dataKeys = Object.keys(newData);
    for (const item of options.series[0].data) {
      if (dataKeys.includes(item.drilldown)) {
        item.value = newData[item.drilldown];
      }
    }
  };

  const setTitle = (title) => {
    options.title.text = title || '';
  };

  setMaxValue(props.data);
  setMapValues(props.data);
  setTitle(props.title);
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} constructorType="mapChart" />
    </div>
  );
};

export default CustomHighcharts;
