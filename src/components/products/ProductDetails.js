import React from "react";
import { Tooltip, Card } from "antd";
const ProductDetails = () => {
  return (
    <React.Fragment>
      <Card
        title="Product details"
        actions={[
          <Tooltip title="help" style={{ textAlign: "left " }}>
            TEST
          </Tooltip>
        ]}
      >
        Disini isinya detail dari produk yang dipilih
      </Card>
    </React.Fragment>
  );
};

export default ProductDetails;
