const initState = { importedData: null };

const etlReducer = (state = initState, action) => {
  switch (action.type) {
    case "IMPORT_NEW_DATA": {
      console.log("Import Data Success");
      return {
        ...state,
        importedData: action.data
      };
    }
    case "IMPORT_DATA_FAIL": {
      console.log("Import data error", action.err);
      return state;
    }
    case "ADD_NEW_DIM_PRODUCT":
      return state;
    case "ADD_NEW_DIM_PRODUCT_ERROR": {
      console.log("Error adding new data", action.err);
      return state;
    }
    case "ADD_NEW_DIM_DISTRIBUTORS":
      return state;
    case "ADD_NEW_DIM_DISTRIBUTORS_ERROR":
      console.log("Error adding new data", action.err);
      return state;
    case "ADD_NEW_DIM_TIME":
      return state;
    case "ADD_NEW_DIM_TIME_ERROR":
      console.log("Error adding new data", action.err);
      return state;
    case "ADD_NEW_DIM_EMPLOYEES":
      return state;
    case "ADD_NEW_DIM_EMPLOYEES_ERROR":
      console.log("Error adding new data", action.err);
      return state;
    case "ADD_NEW_DIM_CUSTOMERS":
      return state;
    case "ADD_NEW_DIM_CUSTOMERS_ERROR":
      console.log("Error adding new data", action.err);
      return state;
    case "ADD_NEW_FACT_PURCHASED":
      return state;
    case "ADD_NEW_FACT_PURCHASED_ERROR":
      console.log("Error adding new data", action.err);
      return state;
    case "DELETE_FACT_PURCHASED":
      console.log("Fact deleted");
      return state;
    case "DELETE_FACT_PURCHASED_ERROR":
      console.log("Error deleting fact", action.err);
      return state;

    default:
      return state;
  }
};

export default etlReducer;
