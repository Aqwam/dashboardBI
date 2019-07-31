import randomString from "random-string";
// import Item from "antd/lib/list/Item";

export const createProduct = product => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const productRef = firestore.collection("products").get();
    const distRef = firestore.collection("distributors").get();
    productRef
      .then(doc => {
        let isExistProduct = null;
        doc.forEach(doc => {
          if (doc.data().productName === product.productName) {
            isExistProduct = true;
          }
        });
        if (isExistProduct) {
          dispatch({ type: "DUPLICATE_PRODUCT" });
        } else {
          firestore
            .collection("products")
            .add({
              ...product,
              key: randomString(),
              createdAt: new Date(),
              updatedAt: new Date(),
              updatedBy: product.createdBy
            })
            .then(() => {
              dispatch({ type: "CREATE_PRODUCT", product });
            })
            .catch(err => {
              dispatch({ type: "CREATE_PRODUCT_ERROR", err });
            });
        }
      })
      .catch(err => {
        dispatch({ type: "CREATE_PRODUCT_ERROR", err });
      });

    distRef.then(doc => {
      let isExistDistributor = null;
      doc.forEach(doc => {
        if (doc.data().distributorName === product.distributor) {
          isExistDistributor = true;
        }
      });
      if (!isExistDistributor) {
        firestore
          .collection("distributors")
          .add({
            distributorName: product.distributor,
            createdAt: product.createdBy,
            updatedAt: new Date(),
            updatedBy: product.createdBy,
            key: randomString()
          })
          .then(() => {
            dispatch({ type: "ADD_DISTRIBUTOR" });
          })
          .catch(err => {
            dispatch({ type: "ADD_DISTRIBUTOR_ERROR" });
          });
      }
    });
  };
};
export const addNewProduct = (product, details) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("products")
      .add({
        productName: product.productName,
        stock: product.qty,
        distributor: details.tempDist,
        producer: "",
        buyPrice: product.buyPrice,
        sellPrice: product.sellPrice,
        key: randomString(),
        createdBy: details.tempProf,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: details.tempProf
      })
      .then(() => {
        dispatch({ type: "CREATE_PRODUCT", product });
      })
      .catch(err => {
        dispatch({ type: "CREATE_PRODUCT_ERROR", err });
      });
  };
};

export const updateStockProduct = product => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("products")
      .doc(product.id)
      .update({
        stock: product.stock,
        updatedBy: product.updatedBy,
        updatedAt: new Date()
      })
      .then(() => {
        dispatch({ type: "UPDATE_STOCK_PRODUCT" });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_STOCK_PRODUCT_ERROR", err });
      });
  };
};

export const updateProduct = product => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const docRef = firestore.collection("products").get();
    const distRef = firestore.collection("distributors").get();
    docRef
      .then(doc => {
        let isExist = false;
        doc.forEach(doc => {
          if (
            doc.data().productName === product.productName &&
            doc.data().key !== product.key
          ) {
            isExist = true;
          }
        });
        if (isExist) {
          dispatch({ type: "DUPLICATE_PRODUCT" });
        } else {
          firestore
            .collection("products")
            .doc(product.id)
            .update({
              productName: product.productName,
              distributor: product.distributor,
              stock: product.stock,
              producer: product.producer,
              buyPrice: product.buyPrice,
              sellPrice: product.sellPrice,
              updatedBy: product.updatedBy,
              updatedAt: new Date()
            })
            .then(() => {
              dispatch({ type: "UPDATE_PRODUCT", product });
            })
            .catch(err => {
              dispatch({ type: "UPDATE_PRODUCT_ERROR", err });
            });
        }
      })
      .catch(err => {
        dispatch({ type: "UPDATE_PRODUCT_ERROR", err });
      });
    distRef.then(doc => {
      let isExistDistributor = null;
      doc.forEach(doc => {
        if (doc.data().distributorName === product.distributor) {
          isExistDistributor = true;
        }
      });
      if (!isExistDistributor) {
        firestore
          .collection("distributors")
          .add({
            distributorName: product.distributor,
            createdAt: new Date(),
            createdBy: product.updatedBy,
            updatedAt: new Date(),
            updatedBy: product.updatedBy,
            key: randomString()
          })
          .then(() => {
            dispatch({ type: "ADD_DISTRIBUTOR" });
          })
          .catch(err => {
            dispatch({ type: "ADD_DISTRIBUTOR_ERROR" });
          });
      }
    });
  };
};

export const getProduct = id => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("products")
      .doc(id)
      .get()
      .then(doc => {
        dispatch({
          type: "GET_PRODUCT",
          data: doc.data()
        });
      })
      .catch(err => {
        dispatch({ type: "GET_PRODUCT_ERROR", err });
      });
  };
};

export const getProducts = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("products")
      .get()

      .then(querySnapshot => {
        let list = [];
        querySnapshot.forEach(doc => {
          list.push(doc.data());
        });
        dispatch({ type: "GET_PRODUCTS", data: list });
      })
      .catch(err => {
        dispatch({ type: "GET_PRODUCTS_ERROR", err });
      });
  };
};

export const deleteProduct = productId => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("products")
      .doc(productId)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_PRODUCT", productId });
      })
      .catch(err => {
        dispatch({ type: "DELETE_PRODUCT_ERROR", err });
      });
  };
};

export const changeProduct = (product, details) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const docRef = getFirestore()
      .collection("products")
      .doc(product.id);
    docRef.get().then(doc => {
      let tempStock = doc.data().stock + product.qty;
      let comparator = doc.data().buyPrice;
      if (comparator < product.buyPrice) {
        docRef.update({
          distributor: details.tempDist,
          stock: tempStock,
          buyPrice: product.buyPrice,
          sellPrice: product.sellPrice,
          updatedBy: details.tempProf,
          updatedAt: new Date()
        });
      } else
        docRef.update({
          distributor: details.tempDist,
          stock: tempStock,
          updatedBy: details.tempProf,
          updatedAt: new Date()
        });
    });
  };
};
