'use client'

import React from "react";
import GridLayout from "react-grid-layout";
import { Paper, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {
  Chart as ChartJS,
  CategoryScale, 
  LinearScale,     
  PointElement,
  LineElement,
  BarElement, 
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardProp {
    location: string
}

const Dashboard: React.FC<DashboardProp>  = (location) => {
  const layout = [
    { i: "pane1", x: 0, y: 0, w: 4, h: 3 },
    { i: "pane2", x: 4, y: 0, w: 4, h: 3 },
    { i: "pane3", x: 8, y: 0, w: 4, h: 3 },
  ];

  // Sample chart data
  const sampleData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Usage",
        data: [12, 19, 8, 15, 9],
        borderColor: "rgb(33, 150, 243)",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
      },
    ],
  };

  return (
    <>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={150}
        width={1200}
        draggableHandle=".pane-header"
        isResizable={true}
      >
        <Paper key="pane1" elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Typography className="pane-header" variant="h6" sx={{ cursor: "move", mb: 1 }}>
            Water Usage
          </Typography>
          <Line data={sampleData} />
        </Paper>

        <Paper key="pane2" elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Typography className="pane-header" variant="h6" sx={{ cursor: "move", mb: 1 }}>
            Electricity
          </Typography>
          <Line data={sampleData} />
        </Paper>

        <Paper key="pane3" elevation={3} sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Typography className="pane-header" variant="h6" sx={{ cursor: "move", mb: 1 }}>
            Waste
          </Typography>
          <Line data={sampleData} />
        </Paper>
      </GridLayout>
    </>
  );
};

export default Dashboard;