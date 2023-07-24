import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Modal,
  Button,
  Select,
  Checkbox,
  Space,
  Input,
  Spin,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getTableData } from "../redux/TableSlice";
import { addJson, replaceJson } from "../redux/ChartViewJsonSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faChartArea,
  faChartLine,
  faChartPie,
  faCircleDot,
  faSpider,
} from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";

import ReusableChart from "../ReusableComponents/ReusableChart";
import MyChart from "./MyChart/MyChart";
const { Option } = Select;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tableData, dataStatus } = useSelector((state) => state.tableData);
  const UpdateViewJson = useSelector((state) => state.UpdateViewJson.jsonData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectedTableName, setIsSelectedTableName] = useState("");
  const [isAvailableColNames, setIsAvailableColNames] = useState([]);
  const [isXYSelectedColNames, setIsXYSelectedColNames] = useState([]);
  const [isChartTitle, setIsChartTitle] = useState("");
  const [isSelectedXaxis, setIsSelectedXaxis] = useState("");
  const [isSelectedChart, setIsSelectedChart] = useState("");
  const [isSelectedYaxis, setIsSelectedYaxis] = useState([]);
  const [isCreateJson, setIsCreateJson] = useState({
    id: "",
    cardTitle: "",
    xAxisKey: "",
    yAxisKey: [],
    chartType: "",
    selectedTableName: "",
  });

  useEffect(() => {
    if (tableData.length > 0) {
      let data = Object.keys(tableData[0]);
      setIsAvailableColNames(data);
    }
  }, [tableData]);
  const UpdateViewJsonData = useSelector(
    (state) => state.UpdateViewJson.jsonData
  );

  useEffect(() => {
    if (UpdateViewJsonData.length > 0) {
      sessionStorage.setItem("jsonData", JSON.stringify(UpdateViewJsonData));
    }
  }, [UpdateViewJsonData]);

  useEffect(() => {
    let sessionStorageJson = JSON.parse(sessionStorage.getItem("jsonData"));
    if (sessionStorageJson != null) {
      dispatch(replaceJson(sessionStorageJson));
    }
  }, []);

  const HandleTableChange = (value) => {
    setIsXYSelectedColNames([]);
    setIsAvailableColNames([]);
    setIsSelectedTableName(value);
    dispatch(getTableData(value));
    setIsCreateJson((prev) => ({
      ...prev,
      id: UpdateViewJson.length + 1,
      selectedTableName: value,
    }));
  };

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsAvailableColNames([]);
    setIsSelectedTableName("");
    setIsSelectedChart("");
    setIsSelectedXaxis("");
    setIsSelectedYaxis([]);
    setIsChartTitle("");
    setIsSelectedChart("");
    setIsXYSelectedColNames([]);
  };
  const HandleXYSelectedCol = (checkedValues) => {
    setIsXYSelectedColNames(checkedValues);
  };
  const createJson = () => {
    dispatch(addJson(isCreateJson));
    setIsModalOpen(false);
    setIsAvailableColNames([]);
    setIsSelectedTableName("");
    setIsSelectedChart("");
    setIsSelectedXaxis("");
    setIsSelectedYaxis([]);
    setIsChartTitle("");
    setIsSelectedChart("");
    setIsXYSelectedColNames([]);
    message.success("Chart saved !!!");
  };
  useEffect(() => {
    setIsCreateJson((prev) => ({
      ...prev,
      chartType: isSelectedChart,
    }));
  }, [isSelectedChart]);
  useEffect(() => {
    setIsCreateJson((prev) => ({
      ...prev,

      xAxisKey: isSelectedXaxis,
    }));
  }, [isSelectedXaxis]);
  useEffect(() => {
    setIsCreateJson((prev) => ({
      ...prev,

      yAxisKey: isSelectedYaxis,
    }));
  }, [isSelectedYaxis]);

  useEffect(() => {
    setIsCreateJson((prev) => ({
      ...prev,
      cardTitle: isChartTitle,
    }));
  }, [isChartTitle]);

  return (
    <div className="dashboard-cls">
      <Row>
        <Col span={24}>
          <Button className="float-right" onClick={showModal}>
            Create Layout
          </Button>
        </Col>
        <Col span={24}>
          <MyChart newSelectedTblName={isSelectedTableName} />
        </Col>
      </Row>
      <Modal
        title={
          <Input
            type="text"
            value={isChartTitle || undefined}
            style={{ width: "35%" }}
            onChange={(e) => setIsChartTitle(e.target.value)}
            className="header-title-cls"
            placeholder="Enter the Title"
          />
        }
        width="90%"
        footer={false}
        open={isModalOpen}
        destroyOnClose={true}
        onCancel={showModal}
      >
        <Row>
          <Col span={14}>
            <ReusableChart
              chartType={isSelectedChart}
              data={tableData}
              xAxisKey={isSelectedXaxis}
              yAxisKey={isSelectedYaxis}
              id={1}
            />
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24} className="pt-2 pb-2  pl-1 pr-1">
                <div className="select-label-text">Select Layout</div>
                <Space>
                  <Space.Compact direction="vertical">
                    <FontAwesomeIcon
                      onClick={() => setIsSelectedChart("RADAR")}
                      className={`layout-icon ${
                        isSelectedChart === "RADAR" ? "Active-icon" : ""
                      }`}
                      icon={faSpider}
                    />
                    <FontAwesomeIcon
                      onClick={() => setIsSelectedChart("BAR")}
                      className={`layout-icon ${
                        isSelectedChart === "BAR" ? "Active-icon" : ""
                      }`}
                      icon={faChartBar}
                    />
                  </Space.Compact>
                  <Space.Compact direction="vertical">
                    <FontAwesomeIcon
                      onClick={() => setIsSelectedChart("LINE")}
                      className={`layout-icon ${
                        isSelectedChart === "LINE" ? "Active-icon" : ""
                      }`}
                      icon={faChartLine}
                    />
                    <FontAwesomeIcon
                      onClick={() => setIsSelectedChart("PIE")}
                      className={`layout-icon ${
                        isSelectedChart === "PIE" ? "Active-icon" : ""
                      }`}
                      icon={faChartPie}
                    />
                  </Space.Compact>
                  <Space.Compact direction="vertical">
                    {" "}
                    <FontAwesomeIcon
                      onClick={() => setIsSelectedChart("AREA")}
                      className={`layout-icon ${
                        isSelectedChart === "AREA" ? "Active-icon" : ""
                      }`}
                      icon={faChartArea}
                    />
                    <FontAwesomeIcon
                      onClick={() => setIsSelectedChart("DONUT")}
                      className={`layout-icon ${
                        isSelectedChart === "DONUT" ? "Active-icon" : ""
                      }`}
                      icon={faCircleDot}
                    />
                  </Space.Compact>
                </Space>
              </Col>
              <Col span={24} className="pt-2 pb-2  pl-1 pr-1">
                <div className="select-label-text">Select X-Axis</div>{" "}
                <Select
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  value={isSelectedXaxis || undefined}
                  onChange={(value) => setIsSelectedXaxis(value)}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                >
                  {isXYSelectedColNames.map((option, ind) => (
                    <Option key={ind} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={24} className="pt-2 pb-2  pl-1 pr-1">
                <div className="select-label-text">Select Y-Axis</div>
                <Select
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  mode="multiple"
                  value={isSelectedYaxis || undefined}
                  onChange={(value) => setIsSelectedYaxis(value)}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                >
                  {" "}
                  {isXYSelectedColNames.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>
          <Col span={4} className="pt-2 pb-2  pl-1 pr-1">
            <Row>
              <Col span={24}>
                <div className="select-label-text">Select Table</div>{" "}
                <Select
                  showSearch
                  style={{
                    width: "100%",
                  }}
                  value={isSelectedTableName || undefined}
                  onChange={HandleTableChange}
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    {
                      value: "Predicted Order Quantity",
                      label: "Predicted Order Quantity",
                    },
                    {
                      value: "Capgov",
                      label: "Capgov",
                    },
                    {
                      value: "Outstanding orders",
                      label: "Outstanding orders",
                    },
                    {
                      value: "Current Inventory",
                      label: "Current Inventory",
                    },
                  ]}
                />
                <div className="available-col">
                  {dataStatus ? (
                    <>
                      <div className="spin-loader-cls">
                        {" "}
                        <Spin tip="Loading..." size="large">
                          <div className="content" />
                        </Spin>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Checkbox.Group
                        options={
                          isSelectedTableName.length === 0
                            ? []
                            : isAvailableColNames
                        }
                        value={isXYSelectedColNames}
                        onChange={HandleXYSelectedCol}
                        style={{ display: "block", width: "100%" }}
                      ></Checkbox.Group>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="float-right">
            <Button onClick={() => createJson()}>Add to MyChart</Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default Dashboard;
