import React, { useEffect, useState } from "react";
import { Row, Col, Card, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { getTableData } from "../../redux/TableSlice";
import ReusableChart from "../../ReusableComponents/ReusableChart";

const MyChart = (props) => {
  const { newSelectedTblName } = props;
  const dispatch = useDispatch();
  const UpdateViewJson = useSelector((state) => state.UpdateViewJson.jsonData);
  const { tableData, dataStatus } = useSelector((state) => state.tableData);
  const [jsonData, setJsonData] = useState([]);
  const [isSelectedTableName, setIsSelectedTableName] = useState("");
  const [availableCharts, setavailableCharts] = useState(false);
  useEffect(() => {
    if (!isEmpty(UpdateViewJson)) {
      setJsonData(UpdateViewJson);
    }
  }, [UpdateViewJson]);
  const HandleTableChange = (value) => {
    setIsSelectedTableName(value);
    dispatch(getTableData(value));
  };

  useEffect(() => {
    if (newSelectedTblName.length > 0) {
      setIsSelectedTableName("");
    }
  }, [newSelectedTblName]);

  useEffect(() => {
    if (jsonData.length > 0) {
      jsonData.map((d) => {
        if (d.selectedTableName === isSelectedTableName) {
          setavailableCharts(true);
          return true;
        } else {
          setavailableCharts(false);
          return false;
        }
      });
    } else {
      setavailableCharts(false);
    }
  }, [jsonData, isSelectedTableName]);
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
        </Col>
      </Row>
      <Row>
        {dataStatus ? (
          <>
            <h1 className="loader-cls">Fetching Your Charts !!!</h1>
          </>
        ) : (
          <>
            {isSelectedTableName.length > 0 ? (
              <>
                {jsonData.length > 0 ? (
                  <>
                    {" "}
                    {jsonData.map((item, i) => {
                      return (
                        <>
                          {isSelectedTableName === item.selectedTableName ? (
                            <>
                              {" "}
                              <Col span={12} className="pr-2 pl-2 pt-2 pb-2">
                                {" "}
                                <Card title={<span>{item.cardTitle}</span>}>
                                  <ReusableChart
                                    chartType={item.chartType}
                                    data={tableData}
                                    xAxisKey={item.xAxisKey}
                                    yAxisKey={item.yAxisKey}
                                    id={item.id}
                                  />
                                </Card>
                              </Col>
                            </>
                          ) : (
                            <>
                              {!availableCharts ? (
                                <>
                                  {" "}
                                  <h1 className="loader-cls">
                                    {" "}
                                    No data available for this creiteria
                                  </h1>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                        </>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {" "}
                    <h1 className="loader-cls">
                      {" "}
                      No data available for this creiteria
                    </h1>
                  </>
                )}
              </>
            ) : (
              <>
                <h1 className="loader-cls">
                  {" "}
                  Choose Table to view your charts.
                </h1>
              </>
            )}
          </>
        )}
      </Row>
    </div>
  );
};

export default MyChart;
