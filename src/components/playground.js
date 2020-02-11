import React, { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Button } from "antd";

function Playground() {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  return (
    <React.Fragment>
      <div>Test Hook {count}</div>
      <div>
        <Button onClick={handleIncrement} />
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return { products: state.firestore.ordered.products };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "products" }])
)(Playground);
