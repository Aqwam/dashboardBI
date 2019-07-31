const initState = {
    product: null,
    listProduct: null
};

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_PRODUCT":
            console.log("product created", action.product);
            return state;
        case "CREATE_PRODUCT_ERROR":
            console.log("Create product error", action.err);
            return state;
        case "DUPLICATE_PRODUCT":
            console.log("Product already exist !");
            return state;
        case "DELETE_PRODUCT":
            console.log("Product deleted");
            return state;
        case "DELETE_PRODUCT_ERROR":
            console.log("Error deleting product", action.err);
            return state;
        case "GET_PRODUCT":
            console.log("Getting product");
            return {
                ...state,
                product: action.data
            };
        case "GET_PRODUCT_ERROR":
            console.log("Error Getting product", action.err);
            return state;
        case "GET_PRODUCTS":
            console.log("Getting products");
            return {
                ...state,
                listProduct: action.data
            };
        case "GET_PRODUCTS_ERROR":
            console.log("Error Getting product", action.err);
            return state;
        case "UPDATE_PRODUCT":
            console.log("Update product success");
            return { ...state, product: null };
        case "UPDATE_PRODUCT_ERROR":
            console.log("Error updating product", action.err);
            return { ...state, product: null };
        case "UPDATE_STOCK_PRODUCT":
            console.log("Update stock success");
            return state;
        case "UPDATE_STOCK_PRODUCT_ERROR":
            console.log("Update stock error", action.err);
            return state;
        default:
            return state;
    }
};

export default productReducer;
