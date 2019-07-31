import React, { Component } from "react";
// import { Line } from "react-chartjs-2";
import { Upload, Icon, message, Button, Progress } from "antd";
import firebase from "../../../../../config/fbConfig";
import csv from "csv";
class DropperToCsv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
      progressVal: 0,
      counterData: ""
    };
  }

  async handleUpload() {
    const { fileList } = this.state;
    const storage = firebase.storage();
    // const storageRef = await storage.ref();
    let counterProgress = 0;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("files[]", file);
    });

    console.log(fileList);
    this.setState({
      uploading: true
    });
    await fileList.forEach(file => {
      storage
        .ref(`datasets/${file.name}`)
        .put(file)
        .on(
          "state_changed",
          snapshot => {},
          error => {
            console.log(error);
          },
          () => {
            counterProgress = counterProgress + 1;
            this.setState({ progressVal: counterProgress });
            if (counterProgress === fileList.length) {
              message.success("Upload file finished");
              counterProgress = 0;
              this.setState({
                uploading: false,
                fileList: [],
                progressVal: counterProgress
              });
            }
          }
        );
    });
  }
  checkLog = () => {
    console.log(this.state.counterData);
  };

  render() {
    const { fileList, uploading, progressVal } = this.state;
    let counterProgress = Number(
      ((progressVal / fileList.length) * 100).toPrecision(2)
    );
    const links = uploading ? <Progress percent={counterProgress} /> : "";
    const DropperProps = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: async file => {
        let pivot = [];
        const isCSV =
          file.type === "application/vnd.ms-excel" ||
          file.name.slice(-3) === "csv";
        if (!isCSV) {
          message.error("You can only upload CSV file !");
        } else {
          const reader = new FileReader();
          //==
          reader.onload = () => {
            csv.parse(
              reader.result,
              async (err, data) => {
                let wadah = [];
                data.map(item => wadah.push(item));
                await (wadah.shift(), this.setState({ counterData: wadah }));
              },
              { comment: "ï»¿", delimiter: ";" }
            );
          };
          reader.readAsBinaryString(file);

          // //==
          this.setState(state => ({
            fileList: [...state.fileList, file]
          }));
        }
        return false;
      },
      fileList
    };
    return (
      <React.Fragment>
        <div>
          <Upload {...DropperProps}>
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
          {links}
          <Button
            type="primary"
            onClick={this.handleUpload.bind(this)}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? "Uploading" : "Start Upload"}
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default DropperToCsv;
