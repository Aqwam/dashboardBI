export const createSalesReport = salesReport => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore
            .collection("salesReport")
            .add({
                ...salesReport
                // createdAt:new Date()
            })
            .then(() => {
                dispatch({ type: "CREATE_SALES_REPORT", salesReport });
            })
            .catch(err => {
                dispatch({ type: "CREATE_SALES_REPORT_ERROR", err });
            });
    };
};
