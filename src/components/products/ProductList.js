import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Modal,
    Table,
    Button,
    Card,
    Col,
    Input,
    Row,
    InputNumber,
    Icon,
    Skeleton,
    Form
} from "antd";
import moment from "moment";
import _ from "lodash";
import {
    createProduct,
    deleteProduct,
    getProduct,
    updateProduct,
    getProducts
} from "../../redux/actions/productActions";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
const confirm = Modal.confirm;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16, offset: 1 }
};
const formPriceLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 10, offset: 2 }
};
const formSellLayout = {
    labelCol: { span: 10, offset: 1 },
    wrapperCol: { span: 10, offset: 1 }
};

class ProductListUnWrapped extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ModalText: "Content of the modal",
            visibleAdd: false,
            visibleEdit: false,
            confirmLoading: false,
            tempId: null,
            tempProd: null,
            tempList: null
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleOkEdit = this.handleOkEdit.bind(this);
        this.showModalEdit = this.showModalEdit.bind(this);

        this.detailedCollumn = [
            {
                title: "Created At",
                dataIndex: "createdAt",
                key: "createdAt",
                render: dataIndex => [
                    moment(dataIndex.toDate())
                        .subtract(10, "days")
                        .calendar()
                ]
            },
            {
                title: "Created By",
                dataIndex: "createdBy",
                key: "createdBy"
            },
            {
                title: "Updated At",
                dataIndex: "updatedAt",
                key: "updatedAt",
                render: dataIndex => [moment(dataIndex.toDate()).calendar()]
            },
            {
                title: "Updated By",
                dataIndex: "updatedBy",
                key: "updatedBy"
            },
            {
                title: "Action",
                dataIndex: "id",
                key: "action",
                render: dataIndex => {
                    const { tempProd } = this.state;
                    const { getFieldDecorator } = this.props.form;

                    const skeletonEdit =
                        tempProd === null ? (
                            <Skeleton active />
                        ) : (
                            <div>
                                <Form>
                                    <Row style={{ paddingLeft: "10px" }}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label="Product Name"
                                        >
                                            {getFieldDecorator("productName", {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message:
                                                            "Please input the Product Name"
                                                    }
                                                ]
                                            })(
                                                <Input
                                                    style={{ width: "98%" }}
                                                    placeholder={
                                                        tempProd.productName
                                                    }
                                                    name="productName"
                                                    onChange={this.onChange}
                                                />
                                            )}
                                        </Form.Item>
                                    </Row>
                                    <Row style={{ paddingLeft: "10px" }}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label="Producer"
                                        >
                                            {getFieldDecorator("producer", {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message:
                                                            "Please input the producer"
                                                    }
                                                ]
                                            })(
                                                <Input
                                                    style={{ width: "98%" }}
                                                    placeholder={
                                                        tempProd.producer
                                                    }
                                                    name="producer"
                                                    onChange={this.onChange}
                                                />
                                            )}
                                        </Form.Item>
                                    </Row>
                                    <Row style={{ paddingLeft: "10px" }}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label="Distributor"
                                        >
                                            {getFieldDecorator("distributor", {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message:
                                                            "Please input the distributor"
                                                    }
                                                ]
                                            })(
                                                <Input
                                                    style={{ width: "98%" }}
                                                    placeholder={
                                                        tempProd.distributor
                                                    }
                                                    name="distributor"
                                                    onChange={this.onChange}
                                                />
                                            )}
                                        </Form.Item>
                                    </Row>
                                    <Row style={{ paddingLeft: "10px" }}>
                                        <Col span={12}>
                                            <Form.Item
                                                {...formPriceLayout}
                                                label="Buy Price"
                                            >
                                                {getFieldDecorator("buyPrice", {
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message:
                                                                "invalid price"
                                                        }
                                                    ]
                                                })(
                                                    <InputNumber
                                                        width="80%"
                                                        placeholder={
                                                            tempProd.buyPrice
                                                        }
                                                        parser={value =>
                                                            value.replace(
                                                                /\$\s?|(,*)/g,
                                                                ""
                                                            )
                                                        }
                                                        onChange={this.onChangeNumber.bind(
                                                            this,
                                                            "buyPrice"
                                                        )}
                                                        min={1}
                                                    />
                                                )}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                {...formSellLayout}
                                                label="Sell Price"
                                            >
                                                {getFieldDecorator(
                                                    "sellPrice",
                                                    {
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message:
                                                                    "invalid price"
                                                            }
                                                        ]
                                                    }
                                                )(
                                                    <InputNumber
                                                        width="100%"
                                                        placeholder={
                                                            tempProd.sellPrice
                                                        }
                                                        parser={value =>
                                                            value.replace(
                                                                /\$\s?|(,*)/g,
                                                                ""
                                                            )
                                                        }
                                                        onChange={this.onChangeNumber.bind(
                                                            this,
                                                            "sellPrice"
                                                        )}
                                                        min={1}
                                                    />
                                                )}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingLeft: "10px" }}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label="Stock"
                                        >
                                            {getFieldDecorator("stock", {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message:
                                                            "Invalid Number"
                                                    }
                                                ]
                                            })(
                                                <InputNumber
                                                    placeholder={tempProd.stock}
                                                    parser={value =>
                                                        value.replace(
                                                            /\$\s?|(,*)/g,
                                                            ""
                                                        )
                                                    }
                                                    onChange={this.onChangeNumber.bind(
                                                        this,
                                                        "stock"
                                                    )}
                                                    min={1}
                                                />
                                            )}
                                        </Form.Item>
                                    </Row>
                                </Form>
                            </div>
                        );
                    return (
                        <span key="action">
                            <Button
                                loading={this.state.confirmLoading}
                                onClick={this.showModalEdit.bind(
                                    this,
                                    dataIndex,
                                    this.props
                                )}
                                type="primary"
                            >
                                Edit
                            </Button>
                            <Modal
                                title="Edit Product"
                                visible={this.state.visibleEdit}
                                onOk={this.handleOkEdit}
                                confirmLoading={this.confirmLoading}
                                onCancel={this.handleCancel}
                            >
                                {skeletonEdit}
                            </Modal>
                            <Button
                                onClick={this.showDelete.bind(
                                    this,
                                    dataIndex,
                                    this.props
                                )}
                                type="danger"
                            >
                                Delete
                            </Button>
                        </span>
                    );
                }
            }
        ];
        this.columns = [
            {
                title: "Product Name",
                dataIndex: "productName",
                key: "productName ",
                // render: text => <a href="javascript:;">{text}</a>
            },
            {
                title: "Distributor",
                dataIndex: "distributor",
                key: "distributor"
            },
            {
                title: "Sell Price",
                dataIndex: "sellPrice",
                key: "sellPrice"
            },
            {
                title: "Stock",
                dataIndex: "stock",
                key: "stock"
            }
        ];
    }

    async componentDidMount() {}
    async componentDidUpdate(prevProps) {
        const {
            selectedProduct,
            getProduct,
            productList,
            getProducts
        } = this.props;
        if (!_.isEqual(prevProps.selectedProduct, selectedProduct)) {
            if (this.state.tempId !== null) {
                getProduct(this.state.tempId);
                if (selectedProduct !== null) {
                    this.setState({
                        tempProd: {
                            productName: selectedProduct.productName,
                            distributor: selectedProduct.distributor,
                            producer: selectedProduct.producer,
                            buyPrice: selectedProduct.buyPrice,
                            sellPrice: selectedProduct.sellPrice,
                            stock: selectedProduct.stock,
                            key: selectedProduct.key
                        }
                    });
                }
            }
        }
        if (!_.isEqual(prevProps.productList, productList)) {
            getProducts();
            if (productList !== null) {
                this.setState({
                    tempList: {
                        ...productList
                    }
                });
            }
        }
    }

    async showDelete(id, props) {
        confirm({
            title: "Are you sure delete this product?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                props.deleteProduct(id);
            },
            onCancel() {}
        });
        await setTimeout(() => {}, 2000);
    }

    onChangeEdit = e => {
        this.setState({
            tempProd: {
                ...this.state.tempProd,
                [e.target.name]: e.target.value
            }
        });
    };
    onChangeNumberEdit = (name, e) => {
        this.setState({
            tempProd: {
                ...this.state.tempProd,
                [name]: e
            }
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    showModalAdd = () => {
        this.setState({
            visibleAdd: true
        });
    };
    async showModalEdit(dataIndex, props) {
        const { getProduct, selectedProduct } = props;
        this.setState({
            tempId: dataIndex,
            confirmLoading: true
        });
        if (selectedProduct !== null) {
            this.setState({
                tempProd: {
                    productName: selectedProduct.productName,
                    producer: selectedProduct.producer,
                    distributor: selectedProduct.distributor,
                    buyPrice: selectedProduct.buyPrice,
                    sellPrice: selectedProduct.sellPrice,
                    stock: selectedProduct.stock,
                    key: selectedProduct.key
                }
            });
        }

        await setTimeout(() => {
            this.setState({
                visibleEdit: true
            });
        }, 1000);

        getProduct(dataIndex);
    }

    async handleOk(e) {
        const { profile, createProduct, form } = this.props;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                const data = {
                    ...values,
                    createdBy: profile.employeeName
                };
                createProduct(data);
                this.setState({
                    confirmLoading: true
                });
                setTimeout(() => {
                    this.setState({
                        visibleAdd: false,
                        confirmLoading: false
                    });
                    form.resetFields();
                }, 2000);
            }
        });
    }

    async handleOkEdit(e) {
        const { tempId, tempProd } = this.state;
        const { profile, updateProduct, form } = this.props;
        console.log(tempProd);
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                const data = {
                    ...values,
                    id: tempId,
                    key: tempProd.key,
                    updatedBy: profile.employeeName
                };
                this.setState({
                    confirmLoading: true
                });

                updateProduct(data);
                this.setState({
                    confirmLoading: true
                });

                setTimeout(() => {
                    this.setState({
                        visibleEdit: false,
                        confirmLoading: false,
                        tempProd: null,
                        tempId: null
                    });
                }, 2000);
            }
        });
    }
    onChangeNumber = (name, e) => {
        this.setState({ [name]: e });
    };
    buttonEdit = () => {};

    handleCancel = () => {
        this.setState({
            visibleAdd: false,
            visibleEdit: false,
            confirmLoading: false,
            productName: "",
            sellPrice: "",
            buyPrice: "",
            stock: "",
            distributor: "",
            tempProd: null,
            tempId: ""
        });
    };
    handleChange = (e)=>{
        console.log(e)
    }

   
    render() {
        const { products, auth, profile } = this.props;
        const { visibleAdd, confirmLoading } = this.state;
        const { getFieldDecorator } = this.props.form;

        const ownerColumns = this.columns.concat(this.detailedCollumn);
        const listTable =
            profile.role === "owner" ? ownerColumns : this.columns;
        const loading = !products ? true : false;

        const links =
            profile.role === "sales" ? null : (
                <div>
                    <Button type="primary" onClick={this.showModalAdd}>
                        Add Product
                    </Button>
                    <Modal
                        title="Add New Product"
                        visible={visibleAdd}
                        onOk={this.handleOk.bind(this)}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                    >
                        <Form>
                            <Row style={{ paddingLeft: "10px" }}>
                                <Form.Item
                                    {...formItemLayout}
                                    label="Product Name"
                                >
                                    {getFieldDecorator("productName", {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    "Please input the Product Name"
                                            }
                                        ]
                                    })(
                                        <Input
                                            style={{ width: "98%" }}
                                            placeholder="Product Name"
                                            name="productName"
                                            onChange={this.onChange}
                                        />
                                    )}
                                </Form.Item>
                            </Row>
                            <Row style={{ paddingLeft: "10px" }}>
                                <Form.Item {...formItemLayout} label="Producer">
                                    {getFieldDecorator("producer", {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    "Please input the producer"
                                            }
                                        ]
                                    })(
                                        <Input
                                            style={{ width: "98%" }}
                                            placeholder="Producer"
                                            name="producer"
                                            onChange={this.onChange}
                                        />
                                    )}
                                </Form.Item>
                            </Row>
                            <Row style={{ paddingLeft: "10px" }}>
                                <Form.Item
                                    {...formItemLayout}
                                    label="Distributor"
                                >
                                    {getFieldDecorator("distributor", {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    "Please input the distributor"
                                            }
                                        ]
                                    })(
                                        <Input
                                            style={{ width: "98%" }}
                                            placeholder="Distributor"
                                            name="distributor"
                                            onChange={this.onChange}
                                        />
                                    )}
                                </Form.Item>
                            </Row>

                            <Row style={{ paddingLeft: "10px" }}>
                                <Col span={12}>
                                    <Form.Item
                                        {...formPriceLayout}
                                        label="Buy Price"
                                    >
                                        {getFieldDecorator("buyPrice", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "invalid price"
                                                }
                                            ]
                                        })(
                                            <InputNumber
                                                width="80%"
                                                placeholder="Rp.XXXXXX"
                                                parser={value =>
                                                    value.replace(
                                                        /\$\s?|(,*)/g,
                                                        ""
                                                    )
                                                }
                                                onChange={this.onChangeNumber.bind(
                                                    this,
                                                    "buyPrice"
                                                )}
                                                min={1}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        {...formSellLayout}
                                        label="Sell Price"
                                    >
                                        {getFieldDecorator("sellPrice", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "invalid price"
                                                }
                                            ]
                                        })(
                                            <InputNumber
                                                width="100%"
                                                placeholder="Rp.XXXXXX"
                                                parser={value =>
                                                    value.replace(
                                                        /\$\s?|(,*)/g,
                                                        ""
                                                    )
                                                }
                                                onChange={this.onChangeNumber.bind(
                                                    this,
                                                    "sellPrice"
                                                )}
                                                min={1}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row style={{ paddingLeft: "10px" }}>
                                <Form.Item {...formItemLayout} label="Stock">
                                    {getFieldDecorator("stock", {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Invalid Number"
                                            }
                                        ]
                                    })(
                                        <InputNumber
                                            placeholder="XX"
                                            parser={value =>
                                                value.replace(/\$\s?|(,*)/g, "")
                                            }
                                            onChange={this.onChangeNumber.bind(
                                                this,
                                                "stock"
                                            )}
                                            min={1}
                                        />
                                    )}
                                </Form.Item>
                            </Row>
                        </Form>
                        {/* <Row style={{ padding: "10px 20px" }}>
                                <Col span={8}>Product Name :</Col>
                                <Col span={16}>
                                    <Input
                                        placeholder="Product Name"
                                        name="productName"
                                        value={this.state.productName}
                                        onChange={this.onChange}
                                    />
                                </Col>
                            </Row> 
                             <Row style={{ padding: "10px 20px" }}>
                                <Col span={8}>Distributor</Col>
                                <Col span={16}>
                                    <Input
                                        placeholder="Distributor"
                                        name="distributor"
                                        value={this.state.distributor}
                                        onChange={this.onChange}
                                    />
                                </Col>
                            </Row> 
                             <Row style={{ padding: "10px 20px" }}>
                                <Col span={8}>Buy Price:</Col>
                                <Col span={16}>
                                    <InputNumber
                                        placeholder="Rp.XXXXXX"
                                        parser={value =>
                                            value.replace(/\$\s?|(,*)/g, "")
                                        }
                                        onChange={this.onChangeNumber.bind(
                                            this,
                                            "buyPrice"
                                        )}
                                        value={this.state.buyPrice}
                                        min={1}
                                    />
                                </Col>
                            </Row>

                            <Row style={{ padding: "10px 20px" }}>
                                <Col span={8}>Sell Price:</Col>
                                <Col span={16}>
                                    <InputNumber
                                        placeholder="Rp.XXXXXX"
                                        parser={value =>
                                            value.replace(/\$\s?|(,*)/g, "")
                                        }
                                        onChange={this.onChangeNumber.bind(
                                            this,
                                            "sellPrice"
                                        )}
                                        value={this.state.sellPrice}
                                        min={1}
                                    />
                                </Col>
                            </Row>
                             
                            <Row style={{ padding: "10px 20px" }}>
                                <Col span={8}>Stock:</Col>
                                <Col span={16}>
                                    <InputNumber
                                        placeholder="XX"
                                        parser={value =>
                                            value.replace(/\$\s?|(,*)/g, "")
                                        }
                                        onChange={this.onChangeNumber.bind(
                                            this,
                                            "stock"
                                        )}
                                        value={this.state.stock}
                                        min={1}
                                    />
                                </Col>
                            </Row>*/}
                    </Modal>
                </div>
            );
        if (!auth.uid) return <Redirect to="/login" />;
        if (!products) {
            return (
                <div>
                    <Icon type="loading" className="splash-loading" />
                </div>
            );
        }else{
            
            const paginations = products.length <= 10 ? false : "";
            if(products.length===0){
                return(
                    <React.Fragment>
                         <Card
                        title="Product List"
                        bordered={false}
                        style={{ width: "100%" }}
                        extra={links}
                    >   <div>
                    No data in database
                </div>  </Card>
                     
                    </React.Fragment>
                )
            }
            return (
                <React.Fragment>
                    <Card
                        title="Product List"
                        bordered={false}
                        style={{ width: "100%" }}
                        extra={links}
                    >
                        <Table
                            className="mobile-table"
                            columns={listTable}
                            dataSource={products}
                            scroll={{ x: "100%" }}
                            loading={loading}
                            pagination={paginations}
                        />
                    </Card>
                </React.Fragment>
            );
        }

     
    }
}

const ProductList = Form.create({ name: "ProductList" })(ProductListUnWrapped);

const mapDispatchToProps = dispatch => {
    return {
        createProduct: product => dispatch(createProduct(product)),
        deleteProduct: id => dispatch(deleteProduct(id)),
        getProduct: id => dispatch(getProduct(id)),
        updateProduct: product => dispatch(updateProduct(product)),
        getProducts: () => dispatch(getProducts())
    };
};

const mapStateToProps = state => {
    return {
        products: state.firestore.ordered.products,
        selectedProduct: state.product.product,
        productList: state.product.listProduct
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    firestoreConnect([
        { collection: "products", orderBy: ["productName", "asc"] }
    ])
)(ProductList);
