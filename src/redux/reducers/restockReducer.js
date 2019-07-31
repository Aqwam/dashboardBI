const initState = {
    restock: null,
    listRestock: []
};
const restockReducers = (state = initState, action) => {
    switch (action.type) {
        case "GET_RESTOCK_ORDER":
            console.log("Getting Restock order");
            return {
                ...state,
                listRestock: action.data
            };
        case "GET_RESTOCK_ORDER_ERROR":
            console.log("Error getting restock order", action.err);
            return state;
        case "CREATE_RESTOCK_ORDER":
            console.log("Restock order created");
            return state;
        case "CREATE_RESTOCK_ORDER_ERROR":
            console.log("Restock order error", action.err);
            return state;
        default:
            return state;
    }
};
export default restockReducers;
