/* eslint-disable quote-props */
const objectFlip = (obj) => Object.keys(obj).reduce((ret, key) => {
  ret[obj[key]] = key;
  return ret;
}, {});

const regionsUkrEng = {
  'Вінницька': 'ua-vi',
  'Волинська': 'ua-vo',
  'Дніпропетровська': 'ua-dp',
  'Житомирська': 'ua-zt',
  'Закарпатська': 'ua-zk',
  'Запорізька': 'ua-zp',
  'Івано-Франківська': 'ua-if',
  'Київська': 'ua-kv',
  'Кіровоградська': 'ua-kh',
  'Львівська': 'ua-lv',
  'Миколаївська': 'ua-mk',
  'Одеська': 'ua-my',
  'Полтавська': 'ua-pl',
  'Рівненська': 'ua-rv',
  'Сумська': 'ua-sm',
  'Тернопільська': 'ua-tp',
  'Харківська': 'ua-kk',
  'Херсонська': 'ua-ks',
  'Хмельницька': 'ua-km',
  'Черкаська': 'ua-ck',
  'Чернівецька': 'ua-cv',
  'Чернігівська': 'ua-ch',
  'м.Київ': 'ua-kc',
};

const regionsEngUrk = objectFlip(regionsUkrEng);

const storage = {
  activity: {
    vvp: {
      key: 'vvp',
      title: 'Частка регіону у ВВП',
      format: '{y} млрд. грн',
    },
    vvpPerPerson: {
      key: 'vvpPerPerson',
      title: 'Обсяг вироблюваної продукції у промисловості на одну людину',
      format: '{y} грн/особу',
    },
    sgLevel: {
      key: 'sgLevel',
      title: 'Обсяг реалізованої промислової продукції',
      format: '{y} млн. грн',
    },
    wage: {
      key: 'wage',
      title: 'Середній рівень заробітної плати у регіоні',
      format: '{y} грн/особу',
    },
    companies: {
      key: 'companies',
      title: 'Число компаній і фірм у регіоні усіх форм власності',
      format: '{y} одиниць',
    },
    unprofitableCompanies: {
      key: 'unprofitableCompanies',
      title: 'Частка збиткових підприємств у регіоні',
      format: '{y} тис.',
    },
  },
  demographic: {
    population: {
      key: 'population',
      title: 'Населення у регіоні',
      format: '{y} людей',
    },
    cityVillageRatio: {
      key: 'cityVillageRatio',
      title: 'Співвідношення між жителями міст і сел регіону',
      format: '{y} раз',
    },
  },
  market: {
    privatized: {
      key: 'privatized',
      title: 'Приватизованих підприємств',
      format: '{y} шт.',
    },
    privateCompanies: {
      key: 'privateCompanies',
      title: 'Компанії і фірмм недержавної форми власності',
      format: '{y} шт.',
    },
    banksAndInsurance: {
      key: 'banksAndInsurance',
      title: 'Банківські і страхові установи',
      format: '{y} шт.',
    },
  },
  risks: {
    crimes: {
      key: 'crimes',
      title: 'Кількість злочинів у регіоні',
      format: '{y} тис. злочинів',
    },
    emissions: {
      key: 'emissions',
      title: 'Шкідливих викидів',
      format: '{y} тис. тон',
    },
  },
};

export { regionsEngUrk, regionsUkrEng, storage };

/* ################# activity ################# */
// vvp 2017 max //млн грн
// vvpPerPerson 2017 max //грн
// sgLevel 2019 max //млн грн
// wage 2018 max //грн
// companies 2018 max //одиниць
// unprofitableCompanies 2019 max //у % до загальної кількості підприємств

/* ################# demographic ################# */
// population
// cityVillageRaion
// qualification
