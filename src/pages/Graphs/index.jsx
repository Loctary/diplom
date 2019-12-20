import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Select, FormControl, InputLabel, MenuItem, makeStyles,
} from '@material-ui/core';
import Chart from '../../components/chart';
import { storage, regionsUkrEng, regionsEngUrk } from '../../constants';


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

const Graphs = () => {
  const classes = useStyles();
  const { data } = useSelector(mapStateToProps, shallowEqual);
  const [year, setYear] = React.useState(2019);
  const [industry, setIndustry] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const [region1, setRegion1] = React.useState(null);
  const [region2, setRegion2] = React.useState(null);


  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleChangeIdustry = (event) => {
    setIndustry(event.target.value);
    if (value) setValue(null);
  };

  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  const handleChangeRegion1 = (event) => {
    setRegion1(event.target.value);
  };

  const handleChangeRegion2 = (event) => {
    setRegion2(event.target.value);
  };

  const reg1Data = value && region1 ? [
    { x: 2015, y: data[2015][industry][value][region1] },
    { x: 2016, y: data[2016][industry][value][region1] },
    { x: 2017, y: data[2017][industry][value][region1] },
    { x: 2018, y: data[2018][industry][value][region1] },
    { x: 2019, y: data[2019][industry][value][region1] },
  ] : [];

  const reg2Data = value && region2 ? [
    { x: 2015, y: data[2015][industry][value][region2] },
    { x: 2016, y: data[2016][industry][value][region2] },
    { x: 2017, y: data[2017][industry][value][region2] },
    { x: 2018, y: data[2018][industry][value][region2] },
    { x: 2019, y: data[2019][industry][value][region2] },
  ] : [];


  return (
    <div>
      {/* <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label1">Рік</InputLabel>
        <Select
          labelId="demo-simple-select-label1"
          id="demo-simple-select1"
          value={year}
          onChange={handleChangeYear}
        >
          <MenuItem value={2019}>2019</MenuItem>
          <MenuItem value={2018}>2018</MenuItem>
          <MenuItem value={2017}>2017</MenuItem>
          <MenuItem value={2016}>2016</MenuItem>
          <MenuItem value={2015}>2015</MenuItem>
        </Select>
      </FormControl> */}
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label2">Індустрія</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="demo-simple-select2"
          value={industry}
          onChange={handleChangeIdustry}
        >
          <MenuItem value="activity">Діяльність регіону</MenuItem>
          <MenuItem value="demographic">Демографічні показники</MenuItem>
          <MenuItem value="market">Ринкові відносини</MenuItem>
          <MenuItem value="risks">Ризики</MenuItem>
        </Select>
      </FormControl>
      {industry && (
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label3">Показник</InputLabel>
        <Select
          labelId="demo-simple-select-label3"
          id="demo-simple-select3"
          value={value}
          onChange={handleChangeValue}
        >
          {Object.keys(storage[industry]).map((item) => (
            storage[industry][item].title && (
            <MenuItem
              key={item}
              value={item}
            >
              {storage[industry][item].title}
            </MenuItem>
            )
          ))}
        </Select>
      </FormControl>
      )}
      {value && (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label4">Регіон 1</InputLabel>
          <Select
            labelId="demo-simple-select-label4"
            id="demo-simple-select4"
            value={region1}
            onChange={handleChangeRegion1}
          >
            {Object.keys(regionsUkrEng).map((item, index) => (
              <MenuItem
                key={`${item}-1`}
                value={regionsUkrEng[item]}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label5">Регіон 2</InputLabel>
          <Select
            labelId="demo-simple-select-label5"
            id="demo-simple-select5"
            value={region2}
            onChange={handleChangeRegion2}
          >
            {Object.keys(regionsUkrEng).map((item, index) => (
              <MenuItem
                key={`${item}-2`}
                value={regionsUkrEng[item]}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      )}


      { value && (region1 || region2)
      && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Chart
            data1={reg1Data}
            data2={reg2Data}
            format={storage[industry][value].format}
            chartTitle={storage[industry].title}
            title={`${storage[industry][value].title}${storage[industry][value].note ? '*' : ''}`}
            name1={regionsEngUrk[region1]}
            name2={regionsEngUrk[region2]}
          />
          {storage[industry][value].note && <span style={{ alignSelf: 'center', marginTop: '20px' }}><i>{storage[industry][value].note}</i></span>}
        </div>
      )}
    </div>
  );
};

export default Graphs;
