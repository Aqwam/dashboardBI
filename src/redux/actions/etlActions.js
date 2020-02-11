export const importData = data => {
  return dispatch => {
    dispatch({ type: "IMPORT_NEW_DATA", data: data });
  };
};

export const etlDimProducts = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    console.log(data);
    firestore
      .collection("dimProducts")
      .doc(data.id)
      .set({
        productName: data.productName,
        distributor: data.distributor,
        buyPrice: data.buyPrice,
        sellPrice: data.sellPrice
      })
      .then(dispatch({ type: "ADD_NEW_DIM_PRODUCT" }))
      .catch(err => {
        dispatch({ type: "ADD_NEW_DIM_PRODUCT_ERROR", err });
      });
  };
};
export const etlDimDistributors = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("dimDistributors")
      .doc(data.id)
      .set({
        distributorName: data.distributorName
      })
      .then(dispatch({ type: "ADD_NEW_DIM_DISTRIBUTORS" }))
      .catch(err => {
        dispatch({ type: "ADD_NEW_DIM_DISTRIBUTORS_ERROR", err });
      });
  };
};
export const etlDimTime = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log(data);
    const firestore = getFirestore();
    firestore
      .collection("dimTimes")
      .doc(data.id)
      .set({
        date: data.date,
        month: data.month,
        year: data.year
      })
      .then(dispatch({ type: "ADD_NEW_DIM_TIME" }))
      .catch(err => {
        dispatch({ type: "ADD_NEW_DIM_TIME_ERROR", err });
      });
  };
};
export const etlDimEmployees = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log(data);
    const firestore = getFirestore();
    firestore
      .collection("dimEmployees")
      .doc(data.id)
      .set({
        employeeName: data.employeeName
      })
      .then(dispatch({ type: "ADD_NEW_DIM_EMPLOYEES" }))
      .catch(err => {
        dispatch({ type: "ADD_NEW_DIM_EMPLOYEES_ERROR", err });
      });
  };
};
export const etlDimCustomers = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log(data);
    const firestore = getFirestore();
    firestore
      .collection("dimCustomers")
      .doc(data.id)
      .set({
        customerName: data.customerName
      })
      .then(dispatch({ type: "ADD_NEW_DIM_CUSTOMERS" }))
      .catch(err => {
        dispatch({ type: "ADD_NEW_DIM_CUSTOMERS_ERROR", err });
      });
  };
};

export const etlFactPurchasing = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("factPurchased")
      .add({
        transactionId: data.id,
        timeId: data.timeId,
        productId: data.productId,
        distId: data.distId,
        qty: data.qty,
        pricePerProduct: data.pricePerProduct,
        subtotal: data.subTotal
      })
      .then(dispatch({ type: "ADD_NEW_FACT_PURCHASED" }))
      .catch(err => {
        dispatch({ type: "ADD_NEW_FACT_PURCHASED_ERROR", err });
      });
  };
};

export const deleteFactPurchasing = id => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("factPurchased")
      .doc(id)
      .delete()
      .then(dispatch({ type: "DELETE_FACT_PURCHASING" }))
      .catch(err => {
        dispatch({ type: "DELETE_FACT_PURCHASING_ERROR", err });
      });
  };
};
export const etlFactSales = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("factSales")
      .add({
        transactionId: data.id,
        timeId: data.timeId,
        productId: data.productId,
        qty: data.qty,
        subtotal: data.subTotal
      })
      .then(dispatch({ type: "ADD_NEW_FACT_SALES" }))
      .catch(err => {
        dispatch({ type: "ADD_NEW_FACT_SALES_ERROR", err });
      });
  };
};

export const deleteFactSales = id => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("factSales")
      .doc(id)
      .delete()
      .then(dispatch({ type: "DELETE_FACT_SALES" }))
      .catch(err => {
        dispatch({ type: "DELETE_FACT_SALES_ERROR", err });
      });
  };
};
