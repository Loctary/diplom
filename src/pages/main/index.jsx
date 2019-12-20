import React, { useEffect } from 'react';
import {
 useDispatch, shallowEqual, useSelector, connect 
} from 'react-redux';
import {
  Switch, Redirect, Route, HashRouter,
} from 'react-router-dom';
import LoaderSpinner from 'react-loader-spinner';
import Header from 'components/header';
import XLSX from 'xlsx';
import Map from '../map';
import Graphs from '../Graphs';

const fetchData = async () => {
  const response = await fetch('https://cors-anywhere.herokuapp.com/http://ukrstat.gov.ua/operativ/operativ2013/fin/kp_reg/kp_reg_u/xls_u/kp_reg_u_2017.xlsx');
  return response;
};

const parseExcel = async () => {
  const stream = await fetchData();
  const arrayBuffer = await stream.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const arr = new Array();
  for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  const bstr = arr.join('');
  const workbook = XLSX.read(bstr, { type: 'binary' });
  const sheet = workbook.Sheets;
  const sheetName = Object.keys(sheet)[0];
  const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
  return json;
};

const mapStateToProps = (state) => ({
  isLoading: state.ui.isLoading,
  data: state.data,
});

const mapDispatchToProps = {
  fetchData: () => ({ type: 'FETCH_DATA' }),
};

const Loader = () => (
  <div style={{
 position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' 
}}>

    <LoaderSpinner type="TailSpin" color="#000" height={80} width={80} />
    <span style={{ textAlign: 'center', marginTop: '20px' }}><i>Зачекайте, будь-ласка, дані завантажуються</i></span>
  </div>
);

class Main extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  // const dispatch = useDispatch();
  // const { data, isLoading } = useSelector(mapStateToProps, shallowEqual);
  // useEffect(() => dispatch({ type: 'FETCH_DATA' }), []);

  // async componentDidMount() {
  // fetchData();
  // const json = await parseExcel();
  // console.log(json);


  // reader.readAsDataURL(blob);
  // reader.onloadend = function () {
  //   const base64data = reader.result;
  //   const workbook = XLSX.read(base64data, { raw: true });
  //   console.log(workbook);
  // };
  // const file = new File([blob], 'kek.xlsx', { type: 'file', lastModified: Date.now() });
  // console.log(file);
  // const excel = XLSX.read(file);
  // console.log(excel);

  // const reader = new FileReader();
  // reader.onload = function(event) {
  // const data = event.target.result
  // }
  // console.log(blobToFile(blob, 'kek'));

  // try {
  //   this.readFile(file)
  //     .then((textFile) => XLSX.read(textFile, { type: 'binary', cellDates: true }))
  //     .then((res) => {
  //       const { uploadedParsedFile, validationErrors } = this.handleUploadedExcel(res);
  //       this.setState({
  //         uploadedFile: file,
  //         uploadedParsedFile,
  //         validationErrors,
  //         activeTabName: uploadedParsedFile.tabs[0].modelName,
  //       });
  //     });
  // } catch (error) {
  // }
  // }

  render() {
    const { isLoading, data } = this.props;
    if (isLoading || !Object.keys(data).length) return <Loader />;

    return (
      <HashRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/map" exact>
              <Map />
            </Route>
            <Route path="/graphs" exact>
              <Graphs />
            </Route>
            <Route path="/">
              <Redirect to="/map" />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);


// const stream = await fetchData();
// const blob = await stream.blob();
// const reader = new FileReader();
// reader.readAsDataURL(blob);
// reader.onloadend = function () {
//   const base64data = reader.result;
//   const workbook = XLSX.read(base64data, { raw: true });
//   console.log(workbook);
// };
