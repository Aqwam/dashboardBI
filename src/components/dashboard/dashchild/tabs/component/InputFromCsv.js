import React, { Component } from "react";
// import { Line } from "react-chartjs-2";
import { Upload, Icon, message, Button, Progress } from "antd";
import firebase from "../../../../../config/fbConfig";

// const Dragger = Upload.Dragger;
class InputFromCsv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
      progressVal: 0
    };
  }

  // handleChange(info) {
  //     console.log(info);
  // }

  // handleUpload() {
  //     const { uploadedFile } = this.state;
  // }

  // beforeUpload(file) {
  //     console.log(file);
  // }
  // async customUpload({ onError, onSuccess, file }) {
  //     console.log(file);
  //     const storage = firebase.storage();
  //     const storageRef = await storage.ref();
  //     const uploadFile = storageRef.child(`Test/${file.name}`);
  //     try {
  //         const data = await uploadFile.put(file);
  //         onSuccess(null, data);
  //     } catch (e) {
  //         onError(e);
  //         console.log(e);
  //     }
  //     // console.log(onError, onSuccess, file);
  // }
  async handleUpload() {
    const { fileList } = this.state;
    const storage = firebase.storage();
    // const storageRef = await storage.ref();
    let counterProgress = 0;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("files[]", file);
    });
    // const uploadFile = storageRef.child(`datasets/${file.name}`);

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
          snapshot => {
            console.log(snapshot);
          },
          error => {
            if (counterProgress === fileList.length) {
              message.error("Upload File failed", error);
              counterProgress = 0;
              this.setState({
                uploading: false,
                fileList: [],
                progressVal: counterProgress
              });
            }
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

  render() {
    const { fileList, uploading, progressVal } = this.state;
    let counterProgress = Number(
      ((progressVal / fileList.length) * 100).toPrecision(2)
    );
    const links = uploading ? <Progress percent={counterProgress} /> : "";
    const props = {
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
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        //const isCSV = file.type === "application/vnd.ms-excel";

        // if (!isCSV) {
        //     message.error("You can only upload CSV file !");
        // } else {
        //     this.setState(state => ({
        //         fileList: [...state.fileList, file]
        //     }));
        // }
        return false;
      },
      fileList
    };
    return (
      <React.Fragment>
        <div>
          {/* <Dragger
                        name="test"
                        beforeUpload={this.beforeUpload.bind(this)}
                        onChange={this.handleChange.bind(this)}
                        customRequest={this.customUpload.bind(this)}
                    >
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly
                            prohibit from uploading company data or other band
                            files
                        </p>
                    </Dragger> */}
          <Upload {...props}>
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

export default InputFromCsv;
