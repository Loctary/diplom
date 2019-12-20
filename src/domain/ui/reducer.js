const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return { isLoading: true };
    case 'FETCH_DATA/SUCCESS':
      return { isLoading: false };
    default:
      return state;
  }
};
