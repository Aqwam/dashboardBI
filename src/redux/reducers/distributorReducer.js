const initState = {
    distributor: null,
    listDistributor: null
};

const distributorReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_DISTRIBUTOR":
            console.log("New distributor added");
            return state;
        case "ADD_DISTRIBUTOR_ERROR":
            console.log("Error adding new distributor", action.err);
            return state;
        case "GET_LIST_DISTRIBUTOR":
            console.log("Getting list distributor");
            return { listDistributor: action.data };
        case "GET_LIST_DISTRIBUTOR_ERROR":
            console.log("Error getting list distributor");
            return state;
        default:
            return state;
    }
};
export default distributorReducer;
