const initState = {
    restock: null,
    listPurchased: []
};
const purchasedReducers = (state = initState, action) => {
    switch (action.type) {
        case "GET_PURCHASED_ORDER":
            console.log("Getting Purchase order");
            return {
                ...state,
                listPurchased: action.data
            };
        case "GET_PURCHASED_ORDER_ERROR":
            console.log("Error getting purchase order", action.err);
            return state;
        case "CREATE_PURCHASED_ORDER":
            console.log("Purchased order inputted");
            return state;
        case "CREATE_PURCHASED_ORDER_ERROR":
            console.log("Input Purchase order error", action.err);
            return state;
        case "UPDATE_STATUS_PURCHASED":
            console.log("Purchased order status updated");
            return state;
        case "UPDATE_STATUS_PURCHASED_ERROR":
            console.log("Update Purchase order error", action.err);
            return state;
        default:
            return state;
    }
};
export default purchasedReducers;
