// src/pages/DeviceDashboards/DeviceDashboard.js
import React from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import ApexChart from "react-apexcharts";
import "./deviceDashboard.scss"; // local styles

// Build chart data for a line using ApexCharts   
const buildLineData = (label, dataArr, colorVar) => ({
  series: [
    {
      name: label,
      data: dataArr,
    },
  ],
  options: {
    chart: {
      type: "line",
      height: 350,
    },
    stroke: {
      curve: "smooth",
      colors: [colorVar],
    },
    xaxis: {
      categories: dataArr.map((_, i) => `Point ${i + 1}`),
    },
    colors: [colorVar],
  },
});

// Build gauge chart data using ApexCharts
const buildGaugeData = (value, label) => ({
  series: [value],
  options: {
    chart: {
      type: "radialBar",
      height: 350,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "16px",
            fontWeight: "bold",
            offsetY: 0,
          },
          value: {
            show: true,
            fontSize: "24px",
            offsetY: 10,
          },
        },
      }, 
    },
    labels: [label],
    colors: ["#2d8515"],
  },
});

// Reusable KPI card
const KpiCard = ({ title, value, colorVar = "--info-color" }) => (
  <Card className="mb-3 me-3 kpi-card">
    <CardBody>
      <CardTitle className="kpi-title">{title}</CardTitle>
      <h3 className="kpi-value" style={{ color: `var(${colorVar})` }}>
        {value}
      </h3>
    </CardBody>
  </Card>
);

// Gauges for Availability, Performance, Quality
const OeeGauges = ({ availability, performance, quality }) => (
  <Row className="mb-3">
    <Col lg={4}>
      <Card className="oee-gauge">
        <CardBody>
          <CardTitle>Availability</CardTitle>
          <ApexChart
            options={buildGaugeData(availability, "Availability").options}
            series={buildGaugeData(availability, "Availability").series}
            type="radialBar"
            height={350}
          />
          <p className="mt-2 text-center">{availability}%</p>
        </CardBody>
      </Card>
    </Col>
    <Col lg={4}>
      <Card className="oee-gauge">
        <CardBody>
          <CardTitle>Performance</CardTitle>
          <ApexChart
            options={buildGaugeData(performance, "Performance").options}
            series={buildGaugeData(performance, "Performance").series}
            type="radialBar"
            height={350}
          />
          <p className="mt-2 text-center">{performance}%</p>
        </CardBody>
      </Card>
    </Col>
    <Col lg={4}>
      <Card className="oee-gauge">
        <CardBody>
          <CardTitle>Quality</CardTitle>
          <ApexChart
            options={buildGaugeData(quality, "Quality").options}
            series={buildGaugeData(quality, "Quality").series}
            type="radialBar"
            height={350}
          />
          <p className="mt-2 text-center">{quality}%</p>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

const DeviceDashboard = ({ device }) => {
  const { name, type, availability, performance, quality, efficiency } = device;

  // Create top KPI cards if these fields exist
  const topKpis = [];
  if (availability !== undefined) {
    topKpis.push({ title: "Availability", value: `${availability}%`, color: "--success-color" });
  }
  if (performance !== undefined) {
    topKpis.push({ title: "Performance", value: `${performance}%`, color: "--primary-color" });
  }
  if (quality !== undefined) {
    topKpis.push({ title: "Quality", value: `${quality}%`, color: "--info-color" });
  }
  if (efficiency) {
    topKpis.push({ title: "Efficiency", value: efficiency, color: "--warning-color" });
  }

  return (
    <div className="p-3 device-dashboard-container">
      <h3 className="mb-4">{name} - Device Dashboard</h3>

      {/* Render any KPI cards in a row */}
      {topKpis.length > 0 && (
        <div className="d-flex flex-wrap mb-4">
          {topKpis.map((k, idx) => (
            <KpiCard key={idx} title={k.title} value={k.value} colorVar={k.color} />
          ))}
        </div>
      )}

      {/* OEE gauges if all three fields exist */}
      {availability !== undefined && performance !== undefined && quality !== undefined && (
        <OeeGauges availability={availability} performance={performance} quality={quality} />
      )}

      {(() => {
        switch (type) {
          case "ElectrolyzerStack": {
            const { hydrogenProductionRate, cycleTimes } = device;
            return (
              <Row>
                <Col lg={6}>
                  <Card className="mb-3">
                    <CardBody>
                      <CardTitle>Hydrogen Production (kg/hr)</CardTitle>
                      <ApexChart
                        {...buildLineData("H₂ Production", hydrogenProductionRate, "#28a745")}
                      />
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card className="mb-3">
                    <CardBody>
                      <CardTitle>Cycle Times (min)</CardTitle>
                      <ApexChart
                        {...buildLineData("Cycle Times", cycleTimes, "#007bff")}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            );
          }

          case "Rectifier": {
            const { voltageTrend, currentTrend } = device;
            return (
              <Row>
                <Col lg={6}>
                  <Card className="mb-3">
                    <CardBody>
                      <CardTitle>Voltage Trend (V)</CardTitle>
                      <ApexChart
                        {...buildLineData("Voltage", voltageTrend, "#ffc107")}
                      />
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card className="mb-3">
                    <CardBody>
                      <CardTitle>Current Trend (A)</CardTitle>
                      <ApexChart
                        {...buildLineData("Current", currentTrend, "#dc3545")}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            );
          }

          case "HydrogenCompressor": {
            const { pressureTrend, temperatureTrend } = device;
            return (
              <Row>
                <Col lg={6}>
                  <Card className="mb-3">
                    <CardBody>
                      <CardTitle>Pressure Trend (bar)</CardTitle>
                      <ApexChart
                        {...buildLineData("Pressure", pressureTrend, "#007bff")}
                      />
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card className="mb-3">
                    <CardBody>
                      <CardTitle>Temperature Trend (°C)</CardTitle>
                      <ApexChart
                        {...buildLineData("Temperature", temperatureTrend, "#dc3545")}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            );
          }

          case "HeatExchanger": {
            const { tempGradient } = device;
            return (
              <Card className="mb-3">
                <CardBody>
                  <CardTitle>Temperature Gradient (°C)</CardTitle>
                  <ApexChart
                    {...buildLineData("Inlet→Outlet", tempGradient, "#17a2b8")}
                  />
                </CardBody>
              </Card>
            );
          }

          case "WaterPurificationUnit": {
            const { qualityTrend } = device;
            return (
              <Card className="mb-3">
                <CardBody>
                  <CardTitle>Conductivity Trend (µS/cm)</CardTitle>
                  <ApexChart
                    {...buildLineData("Conductivity", qualityTrend, "#28a745")}
                  />
                </CardBody>
              </Card>
            );
          }

          case "GasPurificationUnit": {
            const { impurityTrend } = device;
            return (
              <Card className="mb-3">
                <CardBody>
                  <CardTitle>Impurity Trend (ppm)</CardTitle>
                  <ApexChart
                    {...buildLineData("Impurity (ppm)", impurityTrend, "#17a2b8")}
                  />
                </CardBody>
              </Card>
            );
          }

          case "HydrogenStorageTanks": {
            const { pressureHistory } = device;
            return (
              <Card className="mb-3">
                <CardBody>
                  <CardTitle>Tank Pressure (bar)</CardTitle>
                  <ApexChart
                    {...buildLineData("Pressure", pressureHistory, "#007bff")}
                  />
                </CardBody>
              </Card>
            );
          }

          case "CoolingSystem": {
            const { coolantTrend } = device;
            return (
              <Card className="mb-3">
                <CardBody>
                  <CardTitle>Coolant Temperature (°C)</CardTitle>
                  <ApexChart
                    {...buildLineData("Coolant Temp", coolantTrend, "#17a2b8")}
                  />
                </CardBody>
              </Card>
            );
          }

          case "PowerSupplyUnit": {
            const { loadVariation } = device;
            return (
              <Card className="mb-3">
                <CardBody>
                  <CardTitle>Load Variation (%)</CardTitle>
                  <ApexChart
                    {...buildLineData("Load %", loadVariation, "#ffc107")}
                  />
                </CardBody>
              </Card>
            );
          }

          case "Pumps": {
            const { flowTrend } = device;
            return (
              <Card className="mb-3">
                <CardBody>
                  <CardTitle>Flow Rate (L/min)</CardTitle>
                  <ApexChart
                    {...buildLineData("Flow Rate", flowTrend, "#28a745")}
                  />
                </CardBody>
              </Card>
            );
          }

          default:
            return <div className="mt-4">No specialized dashboard for type: {type}</div>;
        }
      })()}
    </div>
  );
};

export default DeviceDashboard;


// // src/pages/DeviceDashboards/DeviceDashboard.js
// import React from "react";
// import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
// import { Line } from "react-chartjs-2";
// import GaugeChart from "react-gauge-chart";
// // import "./deviceDashboard.scss"; // local styles

// // Build chart data for a line
// const buildLineData = (label, dataArr, colorVar) => ({
//   labels: dataArr.map((_, i) => `Point ${i + 1}`),
//   datasets: [
//     {
//       label,
//       data: dataArr,
//       borderColor: `var(${colorVar})`,
//       fill: false,
//       tension: 0.1,
//     },
//   ],
// });

// // Reusable KPI card
// const KpiCard = ({ title, value, colorVar = "--info-color" }) => (
//   <Card className="mb-3 me-3 kpi-card">
//     <CardBody>
    
//       <CardTitle className="kpi-title">{title}</CardTitle>
//       <h3 className="kpi-value" style={{ color: `var(${colorVar})` }}>
//         {value}
//       </h3>
//     </CardBody>
//   </Card>
// );

// // Gauges for Availability, Performance, Quality
// const OeeGauges = ({ availability, performance, quality }) => (
//   <Row className="mb-3">
//     <Col lg={4}>
//       <Card className="oee-gauge">
//         <CardBody>
//           <CardTitle>Availability</CardTitle>
//           <GaugeChart
//             id="availability-gauge"
//             nrOfLevels={20}
//             percent={(availability || 0) / 100}
//             textColor="#000"
//             needleColor="#345243"
//             needleBaseColor="#345243"
//             arcWidth={0.2}
//           />
//           <p className="mt-2 text-center">{availability}%</p>
//         </CardBody>
//       </Card>
//     </Col>
//     <Col lg={4}>
//       <Card className="oee-gauge">
//         <CardBody>
//           <CardTitle>Performance</CardTitle>
//           <GaugeChart
//             id="performance-gauge"  
//             nrOfLevels={20}
//             percent={(performance || 0) / 100}
//             textColor="#000"
//             needleColor="#345243"
//             needleBaseColor="#345243"
//             arcWidth={0.2}
//           />
//           <p className="mt-2 text-center">{performance}%</p>
//         </CardBody>
//       </Card>
//     </Col>
//     <Col lg={4}>
//       <Card className="oee-gauge">
//         <CardBody>
//           <CardTitle>Quality</CardTitle>
//           <GaugeChart
//             id="quality-gauge"
//             nrOfLevels={20}
//             percent={(quality || 0) / 100}
//             textColor="#000"
//             needleColor="#345243"
//             needleBaseColor="#345243"
//             arcWidth={0.2}
//           />
//           <p className="mt-2 text-center">{quality}%</p>
//         </CardBody>
//       </Card>
//     </Col>
//   </Row>
// );

// const DeviceDashboard = ({ device }) => {
//   const {
//     name,
//     type,
//     availability,
//     performance,
//     quality,
//     efficiency
//   } = device;

//   // Create top KPI cards if these fields exist
//   const topKpis = [];
//   if (availability !== undefined) {
//     topKpis.push({ title: "Availability", value: `${availability}%`, color: "--success-color" });
//   }
//   if (performance !== undefined) {
//     topKpis.push({ title: "Performance", value: `${performance}%`, color: "--primary-color" });
//   }
//   if (quality !== undefined) {
//     topKpis.push({ title: "Quality", value: `${quality}%`, color: "--info-color" });
//   }
//   if (efficiency) {
//     topKpis.push({ title: "Efficiency", value: efficiency, color: "--warning-color" });
//   }

//   return (
//     <div className="p-3 device-dashboard-container">
//       <h3 className="mb-4">{name} - Device Dashboard</h3>

//       {/* Render any KPI cards in a row */}
//       {topKpis.length > 0 && (
//         <div className="d-flex flex-wrap mb-4">
//           {topKpis.map((k, idx) => (
//             <KpiCard key={idx} title={k.title} value={k.value} colorVar={k.color} />
//           ))}
//         </div>
//       )}

//       {/* OEE gauges if all three fields exist */}
//       {availability !== undefined && performance !== undefined && quality !== undefined && (
//         <OeeGauges availability={availability} performance={performance} quality={quality} />
//       )}

//       {(() => {
//         switch (type) {
//           case "ElectrolyzerStack": {
//             const { hydrogenProductionRate, cycleTimes } = device;
//             return (
//               <Row>
//                 <Col lg={6}>
//                   <Card className="mb-3">
//                     <CardBody>
//                       <CardTitle>Hydrogen Production (kg/hr)</CardTitle>
//                       <Line
//                         data={buildLineData("H₂ Production", hydrogenProductionRate, "--success-color")}
//                       />
//                     </CardBody>
//                   </Card>
//                 </Col>
//                 <Col lg={6}>
//                   <Card className="mb-3">
//                     <CardBody>
//                       <CardTitle>Cycle Times (min)</CardTitle>
//                       <Line
//                         data={buildLineData("Cycle Times", cycleTimes, "--primary-color")}
//                       />
//                     </CardBody>
//                   </Card>
//                 </Col>
//               </Row>
//             );
//           }

//           case "Rectifier": {
//             const { voltageTrend, currentTrend } = device;
//             return (
//               <Row>
//                 <Col lg={6}>
//                   <Card className="mb-3">
//                     <CardBody>
//                       <CardTitle>Voltage Trend (V)</CardTitle>
//                       <Line
//                         data={buildLineData("Voltage", voltageTrend, "--warning-color")}
//                       />
//                     </CardBody>
//                   </Card>
//                 </Col>
//                 <Col lg={6}>
//                   <Card className="mb-3">
//                     <CardBody>
//                       <CardTitle>Current Trend (A)</CardTitle>
//                       <Line
//                         data={buildLineData("Current", currentTrend, "--danger-color")}
//                       />
//                     </CardBody>
//                   </Card>
//                 </Col>
//               </Row>
//             );
//           }

//           case "HydrogenCompressor": {
//             const { pressureTrend, temperatureTrend } = device;
//             return (
//               <Row>
//                 <Col lg={6}>
//                   <Card className="mb-3">
//                     <CardBody>
//                       <CardTitle>Pressure Trend (bar)</CardTitle>
//                       <Line
//                         data={buildLineData("Pressure", pressureTrend, "--primary-color")}
//                       />
//                     </CardBody>
//                   </Card>
//                 </Col>
//                 <Col lg={6}>
//                   <Card className="mb-3">
//                     <CardBody>
//                       <CardTitle>Temperature Trend (°C)</CardTitle>
//                       <Line
//                         data={buildLineData("Temperature", temperatureTrend, "--danger-color")}
//                       />
//                     </CardBody>
//                   </Card>
//                 </Col>
//               </Row>
//             );
//           }

//           case "HeatExchanger": {
//             const { tempGradient } = device;
//             return (
//               <Card className="mb-3">
//                 <CardBody>
//                   <CardTitle>Temperature Gradient (°C)</CardTitle>
//                   <Line
//                     data={buildLineData("Inlet→Outlet", tempGradient, "--info-color")}
//                   />
//                 </CardBody>
//               </Card>
//             );
//           }

//           case "WaterPurificationUnit": {
//             const { qualityTrend } = device;
//             return (
//               <Card className="mb-3">
//                 <CardBody>
//                   <CardTitle>Conductivity Trend (µS/cm)</CardTitle>
//                   <Line
//                     data={buildLineData("Conductivity", qualityTrend, "--success-color")}
//                   />
//                 </CardBody>
//               </Card>
//             );
//           }

//           case "GasPurificationUnit": {
//             const { impurityTrend } = device;
//             return (
//               <Card className="mb-3">
//                 <CardBody>
//                   <CardTitle>Impurity Trend (ppm)</CardTitle>
//                   <Line
//                     data={buildLineData("Impurity (ppm)", impurityTrend, "--info-color")}
//                   />
//                 </CardBody>
//               </Card>
//             );
//           }

//           case "HydrogenStorageTanks": {
//             const { pressureHistory } = device;
//             return (
//               <Card className="mb-3">
//                 <CardBody>
//                   <CardTitle>Tank Pressure (bar)</CardTitle>
//                   <Line
//                     data={buildLineData("Pressure", pressureHistory, "--primary-color")}
//                   />
//                 </CardBody>
//               </Card>
//             );
//           }

//           case "CoolingSystem": {
//             const { coolantTrend } = device;
//             return (
//               <Card className="mb-3">
//                 <CardBody>
//                   <CardTitle>Coolant Temperature (°C)</CardTitle>
//                   <Line
//                     data={buildLineData("Coolant Temp", coolantTrend, "--info-color")}
//                   />
//                 </CardBody>
//               </Card>
//             );
//           }

//           case "PowerSupplyUnit": {
//             const { loadVariation } = device;
//             return (
//               <Card className="mb-3">
//                 <CardBody>
//                   <CardTitle>Load Variation (%)</CardTitle>
//                   <Line
//                     data={buildLineData("Load %", loadVariation, "--warning-color")}
//                   />
//                 </CardBody>
//               </Card>
//             );
//           }

//           case "Pumps": {
//             const { flowTrend } = device;
//             return (
//               <Card className="mb-3">
//                 <CardBody>
//                   <CardTitle>Flow Rate (L/min)</CardTitle>
//                   <Line
//                     data={buildLineData("Flow Rate", flowTrend, "--success-color")}
//                   />
//                 </CardBody>
//               </Card>
//             );
//           }

//           default:
//             return <div className="mt-4">No specialized dashboard for type: {type}</div>;
//         }
//       })()}
//     </div>
//   );
// };

// export default DeviceDashboard;
