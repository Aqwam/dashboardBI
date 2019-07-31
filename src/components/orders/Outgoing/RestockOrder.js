import React, { Component } from "react";
import {
    Form,
    // Input,
    Icon,
    Button,
    Card,
    Col,
    Select,
    InputNumber
} from "antd";
import _ from "lodash";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { getListDistributor } from "../../../redux/actions/distributorActions";
import { createRestockOrder } from "../../../redux/actions/restockActions";

const Option = Select.Option;
let id = 0;
class RestockOrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDist: [],
            products: [],
            tempProd: [],
            tempStock: [],
            tempQty: [],
            selectedItems: [],
            selectedDist: [],
            loading: false,
            isActive: false
        };
    }

    componentDidMount() {
        const { getListDistributor, listDistributor } = this.props;
        getListDistributor();
        if (listDistributor !== null) {
            this.setState({
                listDist: listDistributor
            });
        }
    }
    componentDidUpdate(prevProps) {
        const { getListDistributor, listDistributor } = this.props;
        if (!_.isEqual(prevProps.listDistributor, listDistributor)) {
            getListDistributor();
            if (listDistributor !== null) {
                this.setState({
                    listDist: listDistributor
                });
            }
        }
    }

    onChangeQty = (e, key) => {
        this.setState({ [`qty[${key}]`]: e });
    };

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
        const { tempStock, tempProd, selectedItems } = this.state;
        const keys = form.getFieldValue("keys");
        if (keys.length === 1) {
            return;
        }

        form.setFieldsValue({
            keys: keys.filter(key => key !== k)
        });
        if (k === 0) {
            tempStock.shift();
            tempProd.shift();
            selectedItems.shift();
        } else {
            tempStock.splice(k, 1);
            tempProd.splice(k, 1);
            selectedItems.splice(k, 1);
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form, profile, createRestockOrder } = this.props;
        const { selectedDist } = this.state;
        let { tempProd } = this.state;
        form.validateFields((err, values) => {
            if (!err) {
                values.listProducts = values.listProducts.filter(
                    el => el != null
                );
                values.qty = values.qty.filter(el => el != null);
                let tempArr = [];
                for (let i = 0; i < values.listProducts.length; i++) {
                    tempArr = [
                        ...tempArr,
                        {
                            productId: tempProd[i],
                            productName: values.listProducts[i],
                            qty: values.qty[i]
                        }
                    ];
                }
                const pushed = {
                    restockList: tempArr,
                    distributor: selectedDist,
                    createdBy: profile.employeeName
                };
                this.setState({ loading: true });
                id = 0;
                createRestockOrder(pushed);
                setTimeout(() => {
                    this.props.history.push("/orders/outgoing");
                    this.setState({
                        loading: false
                    });
                }, 2000);
            }
        });
    };

    async handleSelect(e, k) {
        const { products } = this.props;
        const { tempStock, tempProd } = this.state;

        const temp = products.filter(item => item.productName === k);
        tempStock[e] = temp[0].stock;
        tempProd[e] = temp[0].id;
    }
    async handleSelectDist(e) {
        this.setState({
            selectedDist: e
        });
    }
    async handleChangeDist() {
        const { form } = this.props;
        this.setState({
            tempProd: [],
            tempStock: [],
            selectedItems: [],
            isActive: true
        });
        form.setFieldsValue({
            keys: []
        });
        id = 0;
    }
    async handleChangeQty(e, k) {
        const { tempQty } = this.state;
        tempQty[e] = k;
    }
    handleChange = (e, k) => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.selectedItems[e] = k;
    };

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
            selectedItems,
            tempStock,
            selectedDist,
            listDist,
            isActive
        } = this.state;
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
            const filterDistributor = products.filter(o =>
                selectedDist.includes(o.distributor)
            );
            const filteredOption = filterDistributor.filter(
                o => !selectedItems.includes(o.productName)
            );
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
                        <Col span={11}>
                            {getFieldDecorator(`listProducts[${k}]`, {
                                validateTrigger: ["onChange", "onBlur"],
                                rules: [
                                    {
                                        required: true,
                                        message: "Please select the product"
                                    }
                                ]
                            })(
                                <Select
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
                                </Select>
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
                                        onChange={this.handleChangeQty.bind(
                                            this,
                                            k
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
                        <Col span={4}>
                            <InputNumber
                                placeholder="Stock"
                                value={tempStock[k]}
                                style={{ width: "80%" }}
                                disabled
                            />
                        </Col>{" "}
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
                    </Form.Item>{" "}
                </div>
            ));
            if (products.length === 0)
                return (
                    <React.Fragment>
                        <Card
                            title="Create Restock orders"
                            bordered={false}
                            style={{ width: "100%" }}
                        >
                            <span>No product registered on database</span>
                        </Card>
                    </React.Fragment>
                );

            return (
                <React.Fragment>
                    <Card
                        title="Create Restock Orders"
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
                                    <Select
                                        placeholder="Select Distributor"
                                        onSelect={this.handleSelectDist.bind(
                                            this
                                        )}
                                        style={{ width: "95%" }}
                                        onChange={this.handleChangeDist.bind(
                                            this
                                        )}
                                    >
                                        {listDist.map(item => {
                                            return (
                                                <Option
                                                    title={item.distributorName}
                                                    key={item.key}
                                                    value={item.distributorName}
                                                >
                                                    {item.distributorName}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                )}
                            </Form.Item>
                            {formItems}
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
const RestockOrder = Form.create({ name: "Restock_order_Forms" })(
    RestockOrderForm
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
        createRestockOrder: order => dispatch(createRestockOrder(order))
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([{ collection: "products" }])
)(RestockOrder);
