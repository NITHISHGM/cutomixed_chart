import React, { useEffect, useState } from "react";
import { Row, Col, Card, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { getTableData } from "../../redux/TableSlice";
import ReusableChart from "../../ReusableComponents/ReusableChart";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";

const MyChart = (props) => {
  const { newSelectedTblName } = props;
  const dispatch = useDispatch();
  const UpdateViewJson = useSelector((state) => state.UpdateViewJson.jsonData);
  const { tableData, dataStatus } = useSelector((state) => state.tableData);
  const [jsonData, setJsonData] = useState([]);
  const [isSelectedTableName, setIsSelectedTableName] = useState("");
  const [items, setItems] = React.useState({
    left: [],
  });
  const [availableCharts, setavailableCharts] = useState(false);
  useEffect(() => {
    if (!isEmpty(UpdateViewJson)) {
      setJsonData(UpdateViewJson);
      setItems({ left: UpdateViewJson });
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
  return (
    <div>
      {console.log("jsonData", jsonData)}
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
              <GridItem key={item.cardTitle}>
                <div className="grid-item">
                  <div className="grid-item-content">
                    <Card title={<span>{item.cardTitle}</span>}>
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
            ))}
          </GridDropZone>
        </div>
      </GridContextProvider>
    </div>
  );
};

export default MyChart;
