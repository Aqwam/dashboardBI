import authReducer from "./authReducer";
import productReducer from "./productReducer";
import { combineReducers } from "redux";
import salesReportReducer from "./salesReportReducer";
import employeeReducer from "./employeeReducer";
import orderReducer from "./orderReducer";
import distributorReducer from "./distributorReducer";
import transactionReducer from "./transactionReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import restockReducers from "./restockReducer";
import purchasedReducer from "./purchasedReducer";
import etlReducer from  "./etlReducer"
const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    salesReport: salesReportReducer,
    transaction: transactionReducer,
    employee: employeeReducer,
    order: orderReducer,
    distributor: distributorReducer,
    restock: restockReducers,
    purchased: purchasedReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    etl :etlReducer
});

export default rootReducer;
