const initState = {
    salesReports: [
        {
            key: "1",
            transactionId: "kasmfams",
            status: `Pending`,
            transactionDate: "29-Mar-2015",
            employeeName: "Dimas azka",
            clientName: "Ziyan Marzuq"
        },
        {
            key: "2",
            transactionId: "opdsjfapk",
            status: `Completed`,
            transactionDate: "1-Mar-2014",
            employeeName: "Bintang Rizq",
            clientName: "Ihsan Kamil"
        },
        {
            key: "3",
            transactionId: "sdfgmklmds",
            status: `Rejected`,
            transactionDate: "19-Apr-2015",
            employeeName: "Zaenal Mubarok",
            clientName: "Rizal Danuar"
        }
    ]
};

const salesReportReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_SALES_REPORT":
            console.log("Sales report created", action.salesReport);
            return state;
        case "CREATE_SALES_REPORT_ERROR":
            console.log("Create sales report error ", action.err);
            return state;
        default:
            return state;
    }
};

export default salesReportReducer;
