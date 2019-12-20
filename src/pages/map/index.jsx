import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Select, FormControl, InputLabel, MenuItem,
} from '@material-ui/core';
import Highchart from '../../components/highchart';
import Table1 from '../../components/table';
import { regionsEngUrk } from '../../constants';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const mapStateToProps = (state) => ({
  data: state.data,
});

const getIntrgralValue = (key, data) => data[key] / Object.values(data).reduce((a, b) => a + b, 0);
const getNegativeIntegralValue = (key, data) => 1 - getIntrgralValue(key, data);

const negativeIndexes = [
  'unprofitableCompanies',
  'crimes',
  'emission',
];

const Map = () => {
  const classes = useStyles();
  const [year, setYear] = React.useState(2019);


  const handleChange = (event) => {
    setYear(event.target.value);
  };

  const { data } = useSelector(mapStateToProps, shallowEqual);

  const evaluateAttractivenessIndex = (regionName) => {
    const currentData = data[year];
    const keys = Object.keys(currentData);
    const indexes = keys.reduce((res, curr, currIndex) => {
      const keys1 = Object.keys(currentData[keys[currIndex]]);
      const integralValue = keys1.reduce((res1, curr1, currIndex1) => ({
        ...res1,
        [keys1[currIndex1]]: negativeIndexes.includes(keys1[currIndex1])
          ? getNegativeIntegralValue(
            regionName, currentData[keys[currIndex]][keys1[currIndex1]],
          ) * (1 / keys1.length)
          : getIntrgralValue(
            regionName, currentData[keys[currIndex]][keys1[currIndex1]],
          ) * (1 / keys1.length),
      }), {});
      return {
        ...res,
        [keys[currIndex]]: Object.values(integralValue).reduce((a, b) => a + b, 0),
      };
    }, {});
    return indexes;
  };

  const evaluateFinalIndex = (regionName) => {
    const attractiveness = evaluateAttractivenessIndex(regionName);
    return (attractiveness.activity * 0.4
      + attractiveness.demographic * 0.2
      + attractiveness.market * 0.25
      + attractiveness.risks * 0.15);
  };

  const cityCodes = Object.keys(regionsEngUrk);
  const finalData = cityCodes.reduce((res, curr, currIndex) => ({
    ...res,
    [cityCodes[currIndex]]: Math.round(evaluateFinalIndex(curr) * 10000000) / 10000000,
  }), {});

  console.log(finalData);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <div style={{ alignSelf: 'center' }}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Рік</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            onChange={handleChange}
          >
            <MenuItem value={2019}>2019</MenuItem>
            <MenuItem value={2018}>2018</MenuItem>
            <MenuItem value={2017}>2017</MenuItem>
            <MenuItem value={2016}>2016</MenuItem>
            <MenuItem value={2015}>2015</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Highchart data={finalData} key={year} title="Індекс інвестиційної привабливості регіонів*" />
        <span style={{ alignSelf: 'center', marginTop: '20px', fontSize: '8px' }}><i>* Дані наведено без урахування тимчасово окупованої території Автономної Республіки Крим, м.Севастополя та частини тимчасово окупованих територій у Донецькій та Луганській областях.</i></span>
      </div>
      <div>
        <Table1 names={Object.keys(finalData)} values={Object.values(finalData)} />
      </div>
    </div>
  );
};

export default Map;
