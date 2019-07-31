import randomString from "random-string";

export const createPurchasedOrder = order => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore
            .collection("purchased")
            .add({
                ...order,
                key: randomString(),
                createdAt: new Date(),
                processedBy: "Pending",
                status: "pending"
            })
            .then(() => {
                dispatch({ type: "CREATE_PURCHASED_ORDER" });
            })
            .catch(err => {
                dispatch({ type: "CREATE_PURCHASED_ORDER_ERROR", err });
            });
    };
};

export const updateStatusPurchased = order => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore
            .collection("purchased")
            .doc(order.id)
            .update({
                status: order.status,
                processedBy: order.processedBy,
                processedAt: new Date()
            })
            .then(() => {
                dispatch({ type: "UPDATE_STATUS_PURCHASED" });
            })
            .catch(err => {
                dispatch({ type: "UPDATE_STATUS_PURCHASED_ERROR", err });
            });
    };
};

export const getPurchasedOrder = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore
            .collection("purchased")
            .get()
            .then(querySnapshot => {
                let list = [];
                querySnapshot.forEach(doc => {
                    list.push(doc.data());
                });
                dispatch({ type: "GET_PURCHASED_ORDER", data: list });
            })
            .catch(err => {
                dispatch({ type: "GET_PURCHASED_ORDER_ERROR", err });
            });
    };
};
