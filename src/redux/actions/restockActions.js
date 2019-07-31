import randomString from "random-string";

export const createRestockOrder = order => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore
            .collection("restocks")
            .add({
                ...order,
                key: randomString(),
                createdAt: new Date(),
                processedBy: "Pending",
                status: "pending"
            })
            .then(() => {
                dispatch({ type: "CREATE_RESTOCK_ORDER" });
            })
            .catch(err => {
                dispatch({ type: "CREATE_RESTOCK_ORDER_ERROR", err });
            });
    };
};
export const updateStatusRestock = order => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore
            .collection("restocks")
            .doc(order.id)
            .update({
                status: order.status,
                processedBy: order.processedBy,
                processedAt: new Date()
            })
            .then(() => {
                dispatch({ type: "UPDATE_STATUS_TRANSACTION" });
            })
            .catch(err => {
                dispatch({ type: "UPDATE_STATUS_TRANSACTION_ERROR", err });
            });
    };
};
export const getRestockOrder = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore
            .collection("restocks")
            .get()
            .then(querySnapshot => {
                let list = [];
                querySnapshot.forEach(doc => {
                    list.push(doc.data());
                });
                dispatch({ type: "GET_RESTOCK_ORDER", data: list });
            })
            .catch(err => {
                dispatch({ type: "GET_RESTOCK_ORDER_ERROR", err });
            });
    };
};
