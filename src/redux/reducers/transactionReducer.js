const initState = {
  transaction: null,
  listTransaction: []
};
const transactionReducers = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_TRANSACTION":
      console.log("Transaction created");
      return state;
    case "CREATE_TRANSACTION_ERROR":
      console.log("Create Transactions error", action.err);
      return state;
    case "GET_TRANSACTION":
      console.log("Getting transaction");
      return {
        ...state,
        transaction: action.data
      };
    case "GET_TRANSACTION_ORDER":
      console.log("Getting transaction order");
      return {
        ...state,
        listTransaction: action.data
      };
    case "GET_TRANSACTION_ORDER_ERROR":
      console.log("Error Getting transaction order", action.err);
      return state;
    case "GET_TRANSACTION_ERROR":
      console.log("Error Getting transaction", action.err);
      return state;
    case "REJECT_TRANSACTION":
      console.log("Reject Transaction success");
      return state;
    case "REJECT_TRANSACTION_ERROR":
      console.log("Reject Transaction error", action.err);
      break;
    default:
      return state;
  }
};
export default transactionReducers;
