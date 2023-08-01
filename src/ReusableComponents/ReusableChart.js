import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from "recharts";
const colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

const ReusableChart = ({ chartType, data, xAxisKey, yAxisKey, id }) => {
  const [hiddenKeys, setHiddenKeys] = useState([]);

  const handleLabelClick = (dataKey) => {
    if (hiddenKeys.includes(dataKey.dataKey)) {
      setHiddenKeys(hiddenKeys.filter((key) => key !== dataKey.dataKey));
    } else {
      setHiddenKeys([...hiddenKeys, dataKey.dataKey]);
    }
  };
  const isHidden = (dataKey) => hiddenKeys.includes(dataKey);
  switch (chartType) {
    case "LINE":
      return (
        <div style={{ width: "100%", height: "350px" }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 30, right: 30, left: 20, bottom: 50 }}
            >
              <XAxis
                dataKey={xAxisKey}
                angle={-40}
                textAnchor="end"
                interval={0}
              />
              <YAxis />

              <Tooltip />
              <Legend
                verticalAlign="top"
                height={Math.ceil((yAxisKey?.length || 0) / 2) * 20 + 20}
                onClick={handleLabelClick}
                formatter={(value, entry, index) => (
                  <span
                    className={isHidden(entry.dataKey) ? "legend-disabled" : ""}
                  >
                    {value}
                  </span>
                )}
              />

              {yAxisKey?.map((d, ind) => {
                const isActive = !hiddenKeys.includes(d);
                return (
                  <Line
                    type="monotone"
                    dataKey={d}
                    stroke={isActive ? colors[id + ind] : "none"}
                    activeDot={isActive ? { r: 8 } : null}
                    dot={false}
                  />
                );
              })}
              {data.length > 10 && (
                <Brush
                  dataKey={xAxisKey}
                  startIndex={data.length - 10}
                  endIndex={data.length - 1}
                  height={30}
                  stroke="#8884d8"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    case "BAR":
      return (
        <div style={{ width: "100%", height: "350px" }}>
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{ top: 30, right: 30, left: 20, bottom: 50 }}
            >
              <XAxis
                dataKey={xAxisKey}
                angle={-40}
                textAnchor="end"
                interval={0}
              />
              <YAxis />

              <Tooltip />
              <Legend
                verticalAlign="top"
                height={Math.ceil((yAxisKey?.length || 0) / 2) * 20 + 20}
                onClick={handleLabelClick}
                formatter={(value, entry, index) => (
                  <span
                    className={isHidden(entry.dataKey) ? "legend-disabled" : ""}
                  >
                    {value}
                  </span>
                )}
              />

              {yAxisKey?.map((d, ind) => {
                const isActive = !hiddenKeys.includes(d);
                return (
                  <Bar
                    dataKey={d}
                    fill={isActive ? colors[id + ind] : "none"}
                  />
                );
              })}
              {data.length > 10 && (
                <Brush
                  dataKey={xAxisKey}
                  startIndex={data.length - 10}
                  endIndex={data.length - 1}
                  height={30}
                  stroke="#8884d8"
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    case "AREA":
      return (
        <div style={{ width: "100%", height: "350px" }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{ top: 30, right: 30, left: 20, bottom: 50 }}
            >
              <XAxis
                dataKey={xAxisKey}
                angle={-40}
                textAnchor="end"
                interval={0}
              />
              <YAxis />

              <Tooltip />
              <Legend
                verticalAlign="top"
                height={Math.ceil((yAxisKey?.length || 0) / 2) * 20 + 20}
                onClick={handleLabelClick}
                formatter={(value, entry, index) => (
                  <span
                    className={isHidden(entry.dataKey) ? "legend-disabled" : ""}
                  >
                    {value}
                  </span>
                )}
              />
              {yAxisKey?.map((d, ind) => {
                const isActive = !hiddenKeys.includes(d);
                return (
                  <Area
                    type="monotone"
                    dataKey={d}
                    fill={isActive ? colors[id + ind] : "none"}
                    stroke={isActive ? colors[id + ind] : "none"}
                  />
                );
              })}
              {data.length > 10 && (
                <Brush
                  dataKey={xAxisKey}
                  startIndex={data.length - 10}
                  endIndex={data.length - 1}
                  height={30}
                  stroke="#8884d8"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    case "RADAR":
      return (
        <div style={{ width: "100%", height: "350px" }}>
          <ResponsiveContainer>
            <RadarChart outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey={xAxisKey} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} />
              <Tooltip />
              <Legend
                verticalAlign="top"
                height={Math.ceil((yAxisKey?.length || 0) / 2) * 20 + 20}
                onClick={handleLabelClick}
                formatter={(value, entry, index) => (
                  <span
                    className={isHidden(entry.dataKey) ? "legend-disabled" : ""}
                  >
                    {value}
                  </span>
                )}
              />
              {yAxisKey.map((d, ind) => {
                const isActive = !hiddenKeys.includes(d);

                return (
                  <Radar
                    name={d}
                    dataKey={d}
                    fill={isActive ? colors[id + ind] : "none"}
                    stroke={isActive ? colors[id + ind] : "none"}
                    fillOpacity={0.6}
                  />
                );
              })}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      );
    case "PIE":
      return (
        <div style={{ width: "100%", height: "350px" }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey={xAxisKey}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill={colors[id]}
                label
              />
              <Tooltip />
              <Legend verticalAlign="top" height={100} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );

    default:
      return null;
  }
};

export default ReusableChart;
