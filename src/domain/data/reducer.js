import data from '../data.json';

const initialState = data;

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
