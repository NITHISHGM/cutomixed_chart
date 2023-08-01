import React, { useEffect, useState } from "react";
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
  Card,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { replaceJson } from "../../redux/ChartViewJsonSlice";
import { getTableData } from "../../redux/TableSlice";
import ReusableChart from "../../ReusableComponents/ReusableChart";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faChartArea,
  faChartLine,
  faChartPie,
  faCircleDot,
  faSpider,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";

const { Option } = Select;

const MyChart = (props) => {
  const { newSelectedTblName } = props;
  const dispatch = useDispatch();
  const UpdateViewJson = useSelector((state) => state.UpdateViewJson.jsonData);
  const { tableData, dataStatus } = useSelector((state) => state.tableData);
  const [jsonData, setJsonData] = useState([]);
  const [isSelectedTableNames, setIsSelectedTableNames] = useState("");
  const [items, setItems] = React.useState({
    left: [],
  });
  const [availableCharts, setavailableCharts] = useState(false);
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
    let FilterData = UpdateViewJson.map((d) => {
      if (d.id === isCreateJson.id) {
        return isCreateJson;
      } else {
        return d;
      }
    });
    console.log("FilterData", FilterData, isCreateJson);
    dispatch(replaceJson(FilterData));
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

  useEffect(() => {
    if (!isEmpty(UpdateViewJson)) {
      setJsonData(UpdateViewJson);
      setItems({ left: UpdateViewJson });
      sessionStorage.setItem("jsonData", JSON.stringify(UpdateViewJson));
    }
  }, [UpdateViewJson]);
  const HandleTableChanges = (value) => {
    setIsSelectedTableNames(value);
    dispatch(getTableData(value));
  };

  useEffect(() => {
    if (newSelectedTblName.length > 0) {
      setIsSelectedTableName("");
    }
  }, [newSelectedTblName]);

  useEffect(() => {
    let count = 0;
    if (jsonData.length > 0) {
      jsonData.map((d) => {
        if (d.selectedTableName === isSelectedTableNames) {
          count = count + 1;
          return true;
        } else {
          return false;
        }
      });
    }
    if (count !== 0) {
      setavailableCharts(true);
    } else {
      setavailableCharts(false);
    }
  }, [jsonData, isSelectedTableNames]);
  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    if (targetId) {
      const result = move(
        items[sourceId],
        items[targetId],
        sourceIndex,
        targetIndex
      );
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1],
      });
    }

    const result = swap(items[sourceId], sourceIndex, targetIndex);
    return setItems({
      ...items,
      [sourceId]: result,
    });
  }

  useEffect(() => {
    if (!isEmpty(items.left)) {
      dispatch(replaceJson(items.left));
    }
  }, [items, dispatch]);

  const handleOpenEditChart = (id) => {
    let GetdataBasedOnId = UpdateViewJson.filter((d) => d.id === id);
    setIsCreateJson((prev) => ({
      ...prev,
      id: id,
      cardTitle: GetdataBasedOnId[0].cardTitle,
      xAxisKey: GetdataBasedOnId[0].xAxisKey,
      yAxisKey: GetdataBasedOnId[0].yAxisKey,
      chartType: GetdataBasedOnId[0].chartType,
      selectedTableName: GetdataBasedOnId[0].selectedTableName,
    }));
    setIsModalOpen(true);

    setIsAvailableColNames([]);
    dispatch(getTableData(GetdataBasedOnId[0].selectedTableName));
    setIsSelectedTableName(GetdataBasedOnId[0].selectedTableName);
    setIsSelectedChart(GetdataBasedOnId[0].chartType);
    setIsSelectedXaxis(GetdataBasedOnId[0].xAxisKey);
    setIsSelectedYaxis(GetdataBasedOnId[0].yAxisKey);
    setIsChartTitle(GetdataBasedOnId[0].cardTitle);
    let arr = [];
    GetdataBasedOnId[0].yAxisKey.map((d) => {
      return arr.push(d);
    });
    arr.push(GetdataBasedOnId[0].xAxisKey);

    setIsXYSelectedColNames(arr);
  };
  return (
    <div>
      <Row>
        <Col span={18}></Col>
        <Col span={6}>
          {" "}
          <div className="select-label-text">Choose Table</div>{" "}
          <Select
            showSearch
            style={{
              width: "100%",
            }}
            value={isSelectedTableNames || undefined}
            onChange={HandleTableChanges}
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
        </Col>
      </Row>
      {isSelectedTableNames.length === 0}
      {dataStatus ? (
        <>fetching Charts...</>
      ) : (
        <>
          {tableData.length > 0 &&
          availableCharts &&
          isSelectedTableNames.length > 0 ? (
            <>
              <GridContextProvider onChange={onChange}>
                <div
                  className="container"
                  style={{ overflow: "auto", height: "500px" }}
                >
                  <GridDropZone
                    className="dropzone left"
                    id="left"
                    boxesPerRow={2}
                    rowHeight={500}
                  >
                    {items.left.map((item) => (
                      <>
                        {item.selectedTableName === isSelectedTableNames ? (
                          <>
                            {" "}
                            <GridItem key={item.cardTitle}>
                              <div className="grid-item">
                                <div className="grid-item-content">
                                  <Card
                                    title={
                                      <span>
                                        {item.cardTitle}{" "}
                                        <span className="float-right">
                                          {" "}
                                          <FontAwesomeIcon
                                            onClick={() =>
                                              handleOpenEditChart(item.id)
                                            }
                                            icon={faPenToSquare}
                                          />
                                        </span>
                                      </span>
                                    }
                                  >
                                    <ReusableChart
                                      chartType={item.chartType}
                                      data={tableData}
                                      xAxisKey={item.xAxisKey}
                                      yAxisKey={item.yAxisKey}
                                      id={item.id}
                                    />
                                  </Card>
                                </div>
                              </div>
                            </GridItem>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ))}
                  </GridDropZone>
                </div>
              </GridContextProvider>
            </>
          ) : (
            <>
              {" "}
              {isSelectedTableNames.length === 0 ? (
                <>Choose charts to view charts</>
              ) : (
                <> no data available for the table</>
              )}
            </>
          )}
        </>
      )}
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
                          isSelectedTableNames.length === 0
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
            <Button onClick={() => createJson()}>Update Chart</Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default MyChart;
