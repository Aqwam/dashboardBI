import randomString from "random-string";

export const sellTransactions = transaction => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore
            .collection("transactions")
            .add({
                ...transaction,
                key: randomString(),
                createdAt: new Date(),
                processedBy: "Pending",
                status: "pending"
            })
            .then(() => {
                dispatch({ type: "CREATE_TRANSACTION" });
            })
            .catch(err => {
                dispatch({ type: "CREATE_TRANSACTION_ERROR", err });
            });
    };
};

export const getTransaction = id => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore
            .collection("transactions")
            .doc(id)
            .get()
            .then(doc => {
                dispatch({
                    type: "GET_TRANSACTION",
                    data: doc.data()
                });
            })
            .catch(err => {
                dispatch({ type: "GET_TRANSACTION_ERROR", err });
            });
    };
};

export const updateStatusTransaction = transaction => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        console.log(transaction);
        firestore
            .collection("transactions")
            .doc(transaction.id)
            .update({
                status: transaction.status,
                processedBy: transaction.employeeName
            })
            .then(() => {
                dispatch({ type: "UPDATE_STATUS_TRANSACTION" });
            })
            .catch(err => {
                dispatch({ type: "UPDATE_STATUS_TRANSACTION_ERROR", err });
            });
    };
};
export const rejectTransaction = product => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const docRef = firestore.collection("products").doc(product.id);
        let counter = 0;
        docRef
            .get()
            .then(doc => {
                counter = Number(doc.data().stock) + Number(product.stock);
                docRef.update({
                    stock: counter
                });
                dispatch({
                    type: "REJECT_TRANSACTION"
                });
            })
            .catch(err => {
                dispatch({ type: "REJECT_TRANSACTION_ERROR", err });
            });
    };
};
export const getTransactionOrder = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore
            .collection("transactions")
            .get()
            .then(querySnapshot => {
                let list = [];
                querySnapshot.forEach(doc => {
                    list.push(doc.data());
                });
                dispatch({ type: "GET_TRANSACTION_ORDER", data: list });
            })
            .catch(err => {
                dispatch({ type: "GET_TRANSACTION_ORDER_ERROR", err });
            });
    };
};
