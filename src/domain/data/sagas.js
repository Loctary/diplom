import { takeEvery, put, delay, call } from 'redux-saga/effects';

const proceedThisUrl = async (url) => fetch(`https://cors-anywhere.herokuapp.com/${url}`);

function* fetchData() {
    yield call(proceedThisUrl, 'http://ukrstat.gov.ua/operativ/operativ2013/fin/kp_reg/kp_reg_u/xls_u/kp_reg_u_2017.xlsx');
    yield call(proceedThisUrl, 'http://www.ukrstat.gov.ua/operativ/operativ2019/bud/kzp/kzp_09_2019_u.xls');
    yield call(proceedThisUrl, 'http://www.ukrstat.gov.ua/operativ/operativ2018/fin/pdp_reg/pdp_reg_u/kp_ek_vsmm_reg_2010_2018_u.xlsx');
    yield call(proceedThisUrl, 'http://www.ukrstat.gov.ua/operativ/operativ2013/pr/orp_reg/xls/orp_reg1218_u.xls');
    yield call(proceedThisUrl, 'http://ukrstat.gov.ua/operativ/operativ2018/rp/rp_reg/XLS/ean_2018_u.xls');
    yield call(proceedThisUrl, 'http://ukrstat.gov.ua/operativ/operativ2008/vvp/vrp/vrp2018_u.xls');
    yield call(proceedThisUrl, 'http://ukrstat.gov.ua/operativ/operativ2019/ds/kn/xls/kn0919_u.xls');
    yield delay(1000);
    yield put({ type: 'FETCH_DATA/SUCCESS' });
}

export function* fetchDataWatcher() {
    yield takeEvery('FETCH_DATA', fetchData);
}