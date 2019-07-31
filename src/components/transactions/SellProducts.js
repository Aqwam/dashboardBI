import React, { Component } from "react";
import {
  Form,
  Input,
  Icon,
  Button,
  Card,
  Col,
  Select,
  InputNumber
} from "antd";
import { compose } from "redux";
import { sellTransactions } from "../../redux/actions/transactionActions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { updateStockProduct } from "../../redux/actions/productActions";

const Option = Select.Option;
let id = 0;
class SellProductsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      tempProd: [],
      tempStock: [],
      tempPrice: [],
      tempQty: [],
      tempPriceProd: [],
      tempTotal: 0,
      selectedItems: [],
      loading: false
    };
  }

  onChangeBuyPrice = (e, key) => {
    this.setState({ [`qty[${key}]`]: e });
  };

  add = () => {
    const { form } = this.props;
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
      tempStock,
      tempProd,
      selectedItems,
      tempPrice,
      tempPriceProd
    } = this.state;
    const keys = form.getFieldValue("keys");
    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
    if (k === 0) {
      tempStock.shift();
      tempPrice.shift();
      tempProd.shift();
      tempPriceProd.shift();
      selectedItems.shift();
    } else {
      tempStock.splice(k, 1);
      tempProd.splice(k, 1);
      tempPrice.splice(k, 1);
      tempPriceProd.splice(k, 1);
      selectedItems.splice(k, 1);
    }
    const hehe = tempPriceProd.reduce((a, v) => {
      return a + v;
    });

    await (this.state.tempTotal = hehe);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, profile, updateStockProduct } = this.props;
    let { tempPriceProd, tempProd, tempStock } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        // temp = temp.filter(el => el !== null);
        // selectedItems = selectedItems.filter(el => el !== null);
        values.listProducts = values.listProducts.filter(el => el != null);
        values.qty = values.qty.filter(el => el != null);
        tempPriceProd = tempPriceProd.filter(el => el != null);

        let tempArr = [];
        let counterProduct = {};
        for (let i = 0; i < values.listProducts.length; i++) {
          counterProduct = {
            id: tempProd[i],
            stock: tempStock[i] - values.qty[i],
            updatedBy: profile.employeeName
          };
          updateStockProduct(counterProduct);
          tempArr = [
            ...tempArr,
            {
              productId: tempProd[i],
              productName: values.listProducts[i],
              qty: values.qty[i],
              prices: tempPriceProd[i]
            }
          ];
          // console.log(counterStock);
        }
        const pushed = {
          //listProducts: values.listProducts,
          //qty: values.qty,
          clientName: values.customer,
          salesName: profile.employeeName,
          salesRole: profile.role,
          buyList: tempArr,
          subtotal: this.state.tempTotal
        };

        console.log("Received values of form: ", pushed);
        this.props.sellTransactions(pushed);
        this.setState({ loading: true });
        id = 0;
        setTimeout(() => {
          this.props.history.push("/transactions");
          this.setState({
            loading: false
          });
        }, 2000);
      }
    });
  };

  async handleSelect(e, k) {
    const { products } = this.props;
    const {
      tempStock,
      tempProd,
      tempPrice,
      tempPriceProd,
      tempQty
    } = this.state;

    const temp = products.filter(item => item.productName === k);
    console.log(temp.map(item => item));
    tempStock[e] = temp[0].stock;
    tempProd[e] = temp[0].id;
    tempPrice[e] = temp[0].sellPrice;
    tempPriceProd[e] = isNaN(tempQty[e]) ? 0 : tempQty[e] * tempPrice[e];
    const hehe = tempPriceProd.reduce((a, v) => {
      return a + v;
    });

    await (this.state.tempTotal = hehe);
  }
  async handleChangeQty(e, k) {
    const { tempQty, tempPriceProd, tempPrice } = this.state;
    tempQty[e] = k;
    tempPriceProd[e] = isNaN(tempPrice[e]) ? "" : k * tempPrice[e];
    const hehe = tempPriceProd.reduce((a, v) => {
      return a + v;
    });
    await (this.state.tempTotal = hehe);
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
      tempPrice,
      tempPriceProd,
      tempStock,
      tempTotal
    } = this.state;

    const { products, auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;
    if (profile.role !== "sales") return <Redirect to="/" />;
    if (products) {
      const filteredOption = products
        .filter(o => !selectedItems.includes(o.productName))
        .filter(o => o.stock !== 0);
      const formItems = keys.map((k, index) => (
        <div key={k}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "Products" : ""}
            required={false}
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
                        {item.productName}
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
                    onChange={this.handleChangeQty.bind(this, k)}
                    parser={value => value.replace(/\$\s?|(,*)/g, "")}
                    min={1}
                    max={tempStock[k]}
                    style={{ width: "80%" }}
                  />
                )}
              </Form.Item>
            </Col>{" "}
            <Col span={4}>
              <InputNumber
                placeholder="price"
                value={tempPrice[k]}
                style={{ width: "80%" }}
                disabled
              />
            </Col>{" "}
            <Col span={4}>
              <InputNumber
                placeholder="price"
                value={tempPriceProd[k]}
                style={{ width: "80%" }}
                disabled
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
          </Form.Item>{" "}
        </div>
      ));
      const links =
        keys.length === 0 ? (
          ""
        ) : (
          <Form.Item {...formItemLayout} label={"subtotal :"}>
            <Col span={19} />
            <Col span={4}>
              <InputNumber
                placeholder="subtotal"
                style={{ width: "80%" }}
                value={tempTotal}
                disabled
              />
            </Col>{" "}
          </Form.Item>
        );

      if (products.length === 0)
        return (
          <React.Fragment>
            <Card
              title="Sales Report"
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
            title="Sales Report"
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
              <Form.Item {...formItemLayout} label="Customer">
                {getFieldDecorator("customer", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your customer"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
              {formItems}
              <div>{links}</div>
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={this.add}
                  style={{ width: "60%" }}
                >
                  <Icon type="plus" /> Add field
                </Button>
              </Form.Item>
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
const SellProducts = Form.create({ name: "Sell_Product_Forms" })(
  SellProductsForm
);

const mapStateToProps = state => {
  return {
    products: state.firestore.ordered.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sellTransactions: transaction => dispatch(sellTransactions(transaction)),
    updateStockProduct: product => dispatch(updateStockProduct(product))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "products" }])
)(SellProducts);
