import randomString from "random-string";

export const getListDistributor = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore
            .collection("distributors")
            .get()
            .then(querySnapshot => {
                let list = [];
                querySnapshot.forEach(doc => {
                    list.push(doc.data());
                });
                dispatch({ type: "GET_LIST_DISTRIBUTOR", data: list });
            })
            .catch(err => {
                dispatch({ type: "GET_LIST_DISTRIBUTOR_ERROR", err });
            });
    };
};

export const addNewDist = dist => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        console.log(dist);
        firestore
            .collection("distributors")
            .add({
                distributorName: dist.tempDist,
                createdAt: new Date(),
                createdBy: dist.tempProf,
                updatedAt: new Date(),
                updateBy: dist.tempProf,
                key: randomString()
            })
            .then(dispatch({ type: "ADD_NEW_DIST" }))
            .catch(err => {
                dispatch({ type: "ADD_NEW_DIST_ERROR", err });
            });
    };
};
