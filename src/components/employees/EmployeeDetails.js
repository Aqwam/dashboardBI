import React from "react";
import { Card, Tooltip } from "antd";

const EmployeeDetails = () => {
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
        Disini isinya detail dari employee yang dipilih
      </Card>
    </React.Fragment>
  );
};

export default EmployeeDetails;
