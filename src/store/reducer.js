// reducer.js
const initialState = {
    backgrund:''
  };
  
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'setBg':
        return {
          ...state,
          backgrund: action.bg
        };
    //   case 'DECREMENT':
    //     return {
    //       ...state,
    //       count: state.count - 1
    //     };
      default:
        return state;
    }
  };
  
  export default counterReducer;
  