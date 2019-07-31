import { Button } from "antd";
import React from "react";

const ProductTable = () => {
  return [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName "
      //   render: text => <a href="javascript:;">{text}</a>
    },
    {
      title: "Distributor",
      dataIndex: "distributor",
      key: "distributor"
    },
    {
      title: "Modal",
      dataIndex: "hargaModal",
      key: "hargaModal"
    },
    {
      title: "Harga Jual",
      dataIndex: "hargaJual",
      key: "hargaJual"
    },
    {
      title: "Stok",
      dataIndex: "stok",
      key: "stok"
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: () => [
        <span>
          <Button type="primary">Edit</Button>
          <Button type="danger">Delete</Button>
        </span>
      ]
    }
  ];
};

export default ProductTable;
