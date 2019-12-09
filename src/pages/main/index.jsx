import React, { Component } from 'react';
import Highcart from 'components/highchart';
import XLSX from 'xlsx';

const fetchData = async () => {
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://cors-anywhere.herokuapp.com/http://ukrstat.gov.ua/operativ/operativ2013/fin/kp_reg/kp_reg_u/xls_u/kp_reg_u_2018.xlsx');
  // .then((byteStream) => byteStream.json())
  // .then((decodedData) => console.log(decodedData));
  return response;
};

class Main extends Component {
  async componentDidMount() {
    // fetchData();
    const stream = await fetchData();
    const text = await stream.blob();
    console.log(text);
    // const reader = await stream.body.getReader();
    // console.log(stream.body);
    // const workbook = XLSX.read(stream);
    // const buffers = [];
    // stream.on('data', (data) => {
    //   buffers.push(data);
    // });
    // stream.on('end', () => {
    //   const buffer = Buffer.concat(buffers);
    //   const workbook = XLSX.read(buffer); // works
    //   console.log(workbook);
    // });
  }

  render() {
    return (
      <div>
        <Highcart />
      </div>
    );
  }
}

export default Main;
