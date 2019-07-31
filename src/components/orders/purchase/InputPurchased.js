import React, { Component } from "react";
import {
    Form,
    // Input,
    Icon,
    Button,
    Card,
    Col,
    // Select,
    InputNumber,
    AutoComplete
} from "antd";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import _ from "lodash";
import { getListDistributor } from "../../../redux/actions/distributorActions";
import { createPurchasedOrder } from "../../../redux/actions/purchasedActions";
import update from "immutability-helper";
// const Option = Select.Option;
let id = 0;
class PurchasedOrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newDist: " ",
            newProd: " ",
            listProd: [],
            listDist: [],
            tempPrice: [],
            tempProd: [],
            tempId: [],
            counterPrice: [],
            tempStatus: [],
            tempTotal: 0,
            selectedDist: null,
            distExist: false,
            isActive: false,
            loading: false
        };
    }

    componentDidMount() {
        const { getListDistributor, listDistributor, products } = this.props;
        // const { listDist } = this.state;
        getListDistributor();
        let counterDist = [];
        if (listDistributor !== null) {
            listDistributor.map(item => {
                counterDist.push(item.distributorName);
                return 0
            });
            this.setState({ listDist: counterDist });
            
        }
        if (products) {
            if (this.state.listProd.length === 0) {
                products.map(item => {
                    this.setState(state => {
                        // eslint-disable-next-line no-unused-vars
                        const listProd = state.listProd.push(item.productName);
                    });
                    return 0
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const { getListDistributor, listDistributor, products } = this.props;
        const { 
            // listDist,
             counterPrice } = this.state;
        let counterDist = [];
        if (!_.isEqual(prevProps.listDistributor, listDistributor)) {
            getListDistributor();
            if (listDistributor !== null) {
                listDistributor.map(item => {
                    counterDist.push(item.distributorName);
                    return 0
                });
                this.setState({ listDist: counterDist });
            }
        }

        if (products) {
            if (this.state.listProd.length === 0) {
                products.map(item => {
                    this.setState(state => {
                        // eslint-disable-next-line no-unused-vars
                        const listProd = state.listProd.push(item.productName);
                    });
                    return 0
                });
            }
        }
        if (!_.isEqual(prevState.counterPrice, counterPrice)) {
            console.log(counterPrice);
            if (counterPrice.length === 0) {
                this.setState({ tempTotal: 0 });
            } else {
                let newData = counterPrice.reduce((a, v) => {
                    return a + v;
                });
                this.setState({ tempTotal: newData });
            }
        }
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue("keys");
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys
        });
    };

    async remove(k) {
        const { form } = this.props;
        const {
            tempStatus,
            tempProd,
            tempQty,
            tempPrice,
            counterPrice,
            tempDisc
        } = this.state;
        const keys = form.getFieldValue("keys");
        if (keys.length === 1) {
            return;
        }

        form.setFieldsValue({
            keys: keys.filter(key => key !== k)
        });
        if (k === 0) {
            tempProd.shift();
            tempStatus.shift();
            tempQty.shift();
            tempPrice.shift();
            tempDisc.shift();
            counterPrice.shift();
        } else {
            tempProd.splice(k, 1);
            tempStatus.splice(k, 1);
            tempQty.splice(k, 1);
            tempPrice.splice(k, 1);
            tempDisc.splice(k, 1);
            counterPrice.splice(k, 1);
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form, profile, products, createPurchasedOrder } = this.props;
        const {
            tempStatus,
            tempPrice,
            tempDisc,
            tempQty,
            counterPrice,
            tempProd,
            selectedDist,
            tempTotal,
            listDist
        } = this.state;
        form.validateFields((err, values) => {
            if (err) {
                console.log(selectedDist);
            }
            if (!err && id === 0) {
                console.log(selectedDist);
                console.log("belum ada data yang dimasukkan ");
            }
            if (!err && id > 0) {
                let tempArr = [];
                let tempDist = selectedDist.toUpperCase();
                for (let i = 0; i < tempStatus.length; i++) {
                    let counterProd = tempProd[i].toUpperCase();
                    let tempId = null;
                    let tempProducer = "empty";
                    if (tempStatus[i] === true) {
                        let counterId = products
                            .filter(item => item.productName === counterProd)
                            .map(item => {
                                return item.id;
                            });

                        let counterProducer = products
                            .filter(item => item.productName === counterProd)
                            .map(item => {
                                return item.producer;
                            });
                        tempId = counterId[0];
                        tempProducer = counterProducer[0];
                    }
                    tempArr = [
                        ...tempArr,
                        {
                            id: tempId,
                            productName: counterProd,
                            qty: tempQty[i],
                            disc: (tempPrice[i] * tempDisc[i]) / 100,
                            buyPrice: tempPrice[i],
                            sellPrice: tempPrice[i] + tempPrice[i] * 0.15,
                            total: counterPrice[i],
                            producer: tempProducer,
                            distributor: tempDist
                        }
                    ];
                }
                let isExistDist = false;

                listDist.map(item => {
                    if (item === tempDist) {
                        isExistDist = true;
                    }
                    return 0
                });
                const pushed = {
                    purchasedList: tempArr,
                    distributor: tempDist,
                    subTotal: tempTotal,
                    createdBy: profile.employeeName,
                    isExistDist
                };
                console.log(pushed);

                this.setState({ loading: true });
                id = 0;
                createPurchasedOrder(pushed);

                setTimeout(() => {
                    this.props.history.push("/orders/purchased");
                    this.setState({
                        loading: false
                    });
                }, 2000);
            }
        });
    };
    async handleChange(index, column, value) {
        // const { products } = this.props;
        const {
            tempStatus,
            listProd,
            tempQty,
            tempProd,
            tempPrice,
            counterPrice,
            tempDisc
        } = this.state;
        let isExist = false;
        if (column === "prod") {
            listProd.map(item => {
                if (item === value) {
                    isExist = true;
                }
                return 0
            });
            let newData = update(tempStatus, {
                $splice: [[index, 1, isExist]]
            });
            let newName = update(tempProd, {
                $splice: [[index, 1, value]]
            });
            // if (isExist) {
            //     let counterId = products
            //         .filter(item => item.productName.includes(value))
            //         .map(item => {
            //             return item.id;
            //         });
            //     let newId = update(tempId, {
            //         $splice: [[index, 1, counterId[0]]]
            //     });

            //     this.setState({
            //         tempId: newId
            //     });
            // }
            this.setState({
                tempStatus: newData,
                tempProd: newName
            });
        }
        if (column === "qty") {
            let newData = update(tempQty, {
                $splice: [[index, 1, value]]
            });
            let newValue = isNaN(tempPrice[index])
                ? 0
                : isNaN(tempDisc[index])
                ? tempPrice[index] * value
                : value * tempPrice[index] -
                  (value * tempPrice[index] * tempDisc[index]) / 100;
            let newCounter = update(counterPrice, {
                $splice: [[index, 1, newValue]]
            });
            this.setState({
                tempQty: newData,
                counterPrice: newCounter
            });
        }
        if (column === "buyPrice") {
            let newData = update(tempPrice, {
                $splice: [[index, 1, value]]
            });
            let newValue = isNaN(tempQty[index])
                ? 0
                : isNaN(tempDisc[index])
                ? tempQty[index] * value
                : value * tempPrice[index] -
                  (value * tempPrice[index] * tempDisc[index]) / 100;
            let newCounter = update(counterPrice, {
                $splice: [[index, 1, newValue]]
            });

            this.setState({
                tempPrice: newData,
                counterPrice: newCounter
            });
        }
        if (column === "disc") {
            let newData = update(tempDisc, {
                $splice: [[index, 1, value]]
            });
            let newValue = isNaN(tempQty[index])
                ? 0
                : isNaN(tempPrice[index])
                ? tempQty[index] * tempPrice
                : tempQty[index] * tempPrice[index] -
                  (tempQty[index] * tempPrice[index] * value) / 100;
            let newCounter = update(counterPrice, {
                $splice: [[index, 1, newValue]]
            });

            this.setState({
                tempDisc: newData,
                counterPrice: newCounter
            });
        }
    }
    async handleSelect(index, column, value) {
        const { tempStatus, listProd } = this.state;
        let isExist = false;
        listProd.map(item => {
            if (item === value) {
                isExist = true;
            }
            return 0
        });
        if (column === "prod") {
            if (tempStatus.length === 0) {
                const newData = update(tempStatus, { $push: [isExist] });
                this.setState({
                    tempStatus: newData
                });
            } else {
                const newData = update(tempStatus, {
                    $splice: [[index, 1, [isExist]]]
                });
                this.setState({
                    tempStatus: newData
                });
            }
        }
    }
    async handleSelectDist(e) {
        const { selectedDist } = this.state;
        this.setState({
            selectedDist: e
        });
        console.log(selectedDist);
    }
    async handleChangeDist(value) {
        const { form } = this.props;
        const { selectedDist } = this.state;
        this.setState({
            tempProd: [],
            tempQty: [],
            tempPrice: [],
            tempDisc: [],
            tempStock: [],
            counterPrice: [],
            selectedItems: value,
            isActive: true,
            tempTotal: 0,
            selectedDist: value
        });
        id = 0;
        form.setFieldsValue({
            keys: []
        });
        console.log(selectedDist);
    }
    async handleChangeNumber(e, value, column) {
        // const { tempQty, tempPrice } = this.state;
        // if (column === "qty") {
        //     tempQty[e] = value;
        // } else {
        //     tempPrice[e] = value;
        // }
    }

    async handleSearchDist(e) {
        this.setState({
            newDist: !e ? [] : [e]
        });
    }
    async handleSearch(e) {
        this.setState({
            newProd: !e ? [] : [e]
        });
    }
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 }
            }
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 }
            }
        };
        getFieldDecorator("keys", { initialValue: [] });
        const keys = getFieldValue("keys");

        const {
            // selectedItems,
            listDist,
            // listProdId,
            newDist,
            // tempPrice,
            tempTotal,
            counterPrice,
            newProd,
            listProd,
            isActive
        } = this.state;
        const listAuto = listDist.concat(newDist);
        const links =
            keys.length === 0 ? (
                ""
            ) : (
                <Col>
                    <Col span={17} />
                    <Col span={3}>
                        {" "}
                        <InputNumber
                            placeholder="counterPrice"
                            value={tempTotal}
                            disabled
                            parser={value => value.replace(/\$\s?|(,*)/g, "")}
                            min={0}
                            style={{ width: "100%" }}
                        />
                    </Col>
                </Col>
            );
        const addButt = !isActive ? (
            ""
        ) : (
            <div>
                {" "}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button
                        type="dashed"
                        onClick={this.add}
                        style={{ width: "60%" }}
                    >
                        <Icon type="plus" /> Add field
                    </Button>
                </Form.Item>
            </div>
        );

        const { products, auth } = this.props;
        if (!auth.uid) return <Redirect to="/login" />;

        if (products) {
            const AutoProd = listProd.concat(newProd);
            const formItems = keys.map((k, index) => (
                <div key={k}>
                    <Form.Item
                        {...(index === 0
                            ? formItemLayout
                            : formItemLayoutWithOutLabel)}
                        label={index === 0 ? "Products" : ""}
                        required
                        key={k}
                    >
                        <Col span={7}>
                            {getFieldDecorator(`listProducts[${k}]`, {
                                validateTrigger: ["onChange", "onBlur"],
                                rules: [
                                    {
                                        required: true,
                                        message: "Please select the product"
                                    }
                                ]
                            })(
                                <AutoComplete
                                    style={{ width: "90%" }}
                                    dataSource={AutoProd}
                                    onChange={this.handleChange.bind(
                                        this,
                                        index,
                                        "prod"
                                    )}
                                    onSelect={this.handleSelect.bind(
                                        this,
                                        index,
                                        "prod"
                                    )}
                                    onSearch={this.handleSearch.bind(this)}
                                    filterOption={(inputValue, option) =>
                                        option.props.children.indexOf(
                                            inputValue
                                        ) !== -1
                                    }
                                />
                                /*{ <Select
                                    placeholder="Select Product"
                                    onSelect={this.handleSelect.bind(this, k)}
                                    style={{ width: "95%" }}
                                    onChange={this.handleChange.bind(this, k)}
                                >
                                    {filteredOption.map(item => {
                                        return (
                                            <Option
                                                title={item.productName}
                                                key={item.id}
                                                value={item.productName}
                                            >
                                                {item.productName +
                                                    " (" +
                                                    item.stock +
                                                    ")"}
                                            </Option>
                                        );
                                    })}
                                </Select>}*/
                            )}
                        </Col>
                        <Col span={3}>
                            <Form.Item>
                                {getFieldDecorator(`qty[${k}]`, {
                                    validateTrigger: ["onChange", "onBlur"],
                                    rules: [
                                        {
                                            required: true,
                                            message: "Input QTY of product."
                                        }
                                    ]
                                })(
                                    <InputNumber
                                        placeholder="qty"
                                        onChange={this.handleChange.bind(
                                            this,
                                            index,
                                            "qty"
                                        )}
                                        parser={value =>
                                            value.replace(/\$\s?|(,*)/g, "")
                                        }
                                        min={1}
                                        style={{ width: "80%" }}
                                    />
                                )}
                            </Form.Item>
                        </Col>{" "}
                        <Col span={3}>
                            <Form.Item>
                                {getFieldDecorator(`buyPrice[${k}]`, {
                                    validateTrigger: ["onChange", "onBlur"],
                                    rules: [
                                        {
                                            required: true,
                                            message: "Input QTY of product."
                                        }
                                    ]
                                })(
                                    <InputNumber
                                        placeholder="buyPrice"
                                        onChange={this.handleChange.bind(
                                            this,
                                            index,
                                            "buyPrice"
                                        )}
                                        parser={value =>
                                            value.replace(/\$\s?|(,*)/g, "")
                                        }
                                        min={1}
                                        style={{ width: "80%" }}
                                    />
                                )}
                            </Form.Item>
                        </Col>{" "}
                        <Col span={3}>
                            <Form.Item>
                                {getFieldDecorator(`discount[${k}]`, {
                                    validateTrigger: ["onChange", "onBlur"],
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                "Input discount of product."
                                        }
                                    ]
                                })(
                                    <InputNumber
                                        placeholder="discount"
                                        onChange={this.handleChange.bind(
                                            this,
                                            index,
                                            "disc"
                                        )}
                                        parser={value =>
                                            value.replace(/\$\s?|(,*)/g, "")
                                        }
                                        min={0}
                                        style={{ width: "80%" }}
                                    />
                                )}
                            </Form.Item>
                        </Col>{" "}
                        <Col span={4}>
                            {" "}
                            <InputNumber
                                placeholder="counterPrice"
                                value={counterPrice[index]}
                                disabled
                                parser={value =>
                                    value.replace(/\$\s?|(,*)/g, "")
                                }
                                min={0}
                                style={{ width: "80%" }}
                            />
                        </Col>
                        <Col span={1}>
                            {" "}
                            {keys.length > 1 ? (
                                <Icon
                                    className="dynamic-delete-button"
                                    style={{
                                        fontSize: "20px",
                                        textAlign: "center"
                                    }}
                                    type="minus-circle-o"
                                    disabled={keys.length === 1}
                                    onClick={this.remove.bind(this, k)}
                                />
                            ) : null}
                        </Col>
                    </Form.Item>
                </div>
            ));
            return (
                <React.Fragment>
                    <Card
                        title="Input Purchase Order"
                        bordered={false}
                        style={{ width: "100%" }}
                        extra={
                            <Link to="/transactions">
                                <Button type="primary">
                                    <span> Go back</span>
                                </Button>
                            </Link>
                        }
                    >
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item {...formItemLayout} label="Distributor">
                                {getFieldDecorator("distributor", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Please select distributor"
                                        }
                                    ]
                                })(
                                    <AutoComplete
                                        dataSource={listAuto}
                                        style={{ width: 200 }}
                                        onChange={this.handleChangeDist.bind(
                                            this
                                        )}
                                        onSelect={this.handleSelectDist.bind(
                                            this
                                        )}
                                        onSearch={this.handleSearchDist.bind(
                                            this
                                        )}
                                        filterOption={(inputValue, option) =>
                                            option.props.children.indexOf(
                                                inputValue
                                            ) !== -1
                                        }
                                    />
                                )}
                            </Form.Item>
                            {formItems}
                            {links}
                            {addButt}
                            <Form.Item {...formItemLayoutWithOutLabel}>
                                <Button
                                    type="primary"
                                    loading={this.state.loading}
                                    htmlType="submit"
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </React.Fragment>
            );
        } else {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
    }
}
const InputPurchased = Form.create({ name: "Purchased_order_Forms" })(
    PurchasedOrderForm
);

const mapStateToProps = state => {
    return {
        listDistributor: state.distributor.listDistributor,
        products: state.firestore.ordered.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getListDistributor: () => dispatch(getListDistributor()),
        createPurchasedOrder: order => dispatch(createPurchasedOrder(order))
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([{ collection: "products" }])
)(InputPurchased);
