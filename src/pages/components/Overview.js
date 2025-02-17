import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Badge,
  Table
} from 'reactstrap';
import Chart from 'react-apexcharts';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Dark theme styling for a technical look
const darkTheme = {
  backgroundColor: '#1e1e2f',
  color: '#ffffff',
  minHeight: '100vh',
  padding: '20px'
};

// Reusable KPI Card Component
// If a gaugeValue is provided, a radial bar gauge (via ApexCharts) is rendered;
// otherwise, the numeric value is shown.
const KPICard = ({ title, value, unit, gaugeValue, color }) => {
  if (gaugeValue !== undefined) {
    const gaugeOptions = {
      chart: {
        type: 'radialBar',
        sparkline: { enabled: true },
        background: "transparent"
      },
      plotOptions: {
        radialBar: {
          hollow: { size: '30%' },
          dataLabels: {
            name: { show: false },
            value: {
              formatter: function(val) {
                return `${Math.round(val)}%`;
              },
              color: '#fff',
              fontSize: '16px',
              show: true
            }
          }
        }
      },
      colors: ['#FF5F6D', '#FFC371'],
      theme: { mode: 'dark' }
    };
    const gaugeSeries = [gaugeValue];
    return (
      <Card className="mb-3 hover-card" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
        <CardBody className="text-center">
          <CardTitle tag="h5" style={{ color: '#fff' }}>{title}</CardTitle>
          <Chart options={gaugeOptions} series={gaugeSeries} type="radialBar" height="150" />
        </CardBody>
      </Card>
    );
  } else {
    return (
      <Card className="mb-3 hover-card" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
        <CardBody className="text-center">
          <CardTitle tag="h5" style={{ color: '#fff' }}>{title}</CardTitle>
          <h2 style={{ color }}>{value} {unit}</h2>
        </CardBody>
      </Card>
    );
  }
};

const BetterOverviewPage = () => {
  // Standard Plant KPI States (simulate real-time updates)
  const [h2ProductionRate, setH2ProductionRate] = useState(10); // kg H₂/hr
  const [plantEfficiency, setPlantEfficiency] = useState(47); // kWh/kg H₂
  const [stackRemainingLife, setStackRemainingLife] = useState(87); // %
  const [capacityUtilization, setCapacityUtilization] = useState(75); // %
  const [membraneHealth, setMembraneHealth] = useState('Good');

  // Analytics & AI KPIs for Green H₂ Electrolyzer
  const [greenH2ForecastAccuracy, setGreenH2ForecastAccuracy] = useState(92); // %
  const [electrolyzerAnomalyScore, setElectrolyzerAnomalyScore] = useState(3); // lower is better
  const [predictiveMaintenanceConfidence, setPredictiveMaintenanceConfidence] = useState(98); // %
  const [predictedMaintenanceInterval, setPredictedMaintenanceInterval] = useState(5); // hrs

  // Simulate KPI updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setH2ProductionRate(prev => Math.max(8, Math.min(12, prev + (Math.random() - 0.5))));
      setPlantEfficiency(prev => Math.max(47, Math.min(6, prev + (Math.random() - 0.8) * 0.2)));
      setStackRemainingLife(prev => Math.max(80, Math.min(100, prev + (Math.random() - 0.5) * 2)));
      setCapacityUtilization(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 3)));
      // Analytics KPIs: small fluctuations
      setGreenH2ForecastAccuracy(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5))));
      setElectrolyzerAnomalyScore(prev => Math.max(0, Math.min(10, prev + (Math.random() - 0.5))));
      setPredictiveMaintenanceConfidence(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5))));
      setPredictedMaintenanceInterval(prev => Math.max(2, Math.min(10, prev + (Math.random() - 0.5) * 0.5)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Dummy Chart Data for Degradation Rate (ApexCharts)
  const degradationData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'Degradation Rate (%)',
        data: [0, 0.2, 0.3, 0.35, 0.4],
        borderColor: '#FF6384'
      }
    ]
  };

  // Dummy Chart Data for Forecast Production Trend (ApexCharts)
  const forecastData = {
    labels: ['Next 24H', 'Next Week', 'Next Month'],
    datasets: [
      {
        label: 'Forecasted Production (kg H₂)',
        data: [100, 700, 3000],
        borderColor: 'rgba(75,192,192,1)'
      }
    ]
  };

  // Dummy data for Plant Events
  const plantEvents = [
    { time: '08:00', event: 'Start-up', description: 'Plant started successfully.' },
    { time: '10:30', event: 'Trip', description: 'Minor stack trip detected.' },
    { time: '12:00', event: 'Planned Maintenance', description: 'Routine system check.' },
    { time: '15:00', event: 'Shutdown', description: 'Emergency shutdown triggered.' }
  ];

  // Real-Time Process Parameter Trend Simulation (10 data points)
  const initialProcessLabels = Array.from({ length: 10 }, (_, i) => `T-${(10 - i) * 5}s`);
  const [processLabels, setProcessLabels] = useState(initialProcessLabels);
  const [processTempValues, setProcessTempValues] = useState(Array(10).fill(75)); // °C
  const [processPressureValues, setProcessPressureValues] = useState(Array(10).fill(30)); // bar
  const [processFlowValues, setProcessFlowValues] = useState(Array(10).fill(100)); // m³/hr

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      setProcessLabels(prev => [...prev.slice(1), newTime]);
      setProcessTempValues(prev => {
        const newVal = prev[prev.length - 1] + (Math.random() * 2 - 1);
        return [...prev.slice(1), parseFloat(newVal.toFixed(2))];
      });
      setProcessPressureValues(prev => {
        const newVal = prev[prev.length - 1] + (Math.random() * 0.5 - 0.25);
        return [...prev.slice(1), parseFloat(newVal.toFixed(2))];
      });
      setProcessFlowValues(prev => {
        const newVal = prev[prev.length - 1] + (Math.random() * 5 - 2.5);
        return [...prev.slice(1), parseFloat(newVal.toFixed(2))];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const processTempChartData = {
    labels: processLabels,
    datasets: [{
      label: 'Process Temperature (°C)',
      data: processTempValues,
      borderColor: 'red'
    }]
  };

  const processPressureChartData = {
    labels: processLabels,
    datasets: [{
      label: 'Process Pressure (bar)',
      data: processPressureValues,
      borderColor: 'blue'
    }]
  };

  const processFlowChartData = {
    labels: processLabels,
    datasets: [{
      label: 'Process Flow Rate (m³/hr)',
      data: processFlowValues,
      borderColor: 'green'
    }]
  };

  // Dummy data for Additional Analytics Charts (Highcharts)
  const actualVsForecastData = {
    labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6'],
    datasets: [
      {
        label: 'Actual Production',
        data: [10, 11, 9, 10, 10.5, 10],
        borderColor: 'green'
      },
      {
        label: 'Forecasted Production',
        data: [10.2, 10.9, 9, 10.1, 10.6, 10.1],
        borderColor: 'orange'
      }
    ]
  };

  const forecastErrorData = {
    labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6'],
    datasets: [
      {
        label: 'Forecast Error (%)',
        data: [1, 0.5, 2, 1, 0.7, 1.2],
        borderColor: 'red'
      }
    ]
  };

  // ********************
  // Build ApexCharts Options & Series
  // ********************

  // Degradation Rate Chart (ApexCharts)
  const degradationOptions = {
    chart: {
      id: 'degradation-chart',
      toolbar: { show: false }
    },
    xaxis: {
      categories: degradationData.labels,
      labels: { style: { colors: '#fff' } }
    },
    stroke: {
      curve: 'smooth',
      colors: [degradationData.datasets[0].borderColor]
    },
    tooltip: { theme: 'dark' },
    grid: { borderColor: '#2d2d44' },
    theme: { mode: 'dark' }
  };
  const degradationSeries = [
    {
      name: degradationData.datasets[0].label,
      data: degradationData.datasets[0].data
    }
  ];

  // Forecast Production Trend Chart (ApexCharts)
  const forecastOptions = {
    chart: {
      id: 'forecast-chart',
      toolbar: { show: false }
    },
    xaxis: {
      categories: forecastData.labels,
      labels: { style: { colors: '#fff' } }
    },
    stroke: {
      curve: 'smooth',
      colors: [forecastData.datasets[0].borderColor]
    },
    tooltip: { theme: 'dark' },
    grid: { borderColor: '#2d2d44' },
    theme: { mode: 'dark' }
  };
  const forecastSeries = [
    {
      name: forecastData.datasets[0].label,
      data: forecastData.datasets[0].data
    }
  ];

  // Real-Time Process Parameter Charts (ApexCharts)
  const processTempOptions = {
    chart: { id: 'temp-chart', toolbar: { show: false } },
    xaxis: {
      categories: processTempChartData.labels,
      labels: { style: { colors: '#fff' } }
    },
    stroke: { curve: 'smooth', colors: [processTempChartData.datasets[0].borderColor] },
    tooltip: { theme: 'dark' },
    grid: { borderColor: '#2d2d44' },
    theme: { mode: 'dark' }
  };
  const processTempSeries = [
    {
      name: processTempChartData.datasets[0].label,
      data: processTempChartData.datasets[0].data
    }
  ];

  const processPressureOptions = {
    chart: { id: 'pressure-chart', toolbar: { show: false } },
    xaxis: {
      categories: processPressureChartData.labels,
      labels: { style: { colors: '#fff' } }
    },
    stroke: { curve: 'smooth', colors: [processPressureChartData.datasets[0].borderColor] },
    tooltip: { theme: 'dark' },
    grid: { borderColor: '#2d2d44' },
    theme: { mode: 'dark' }
  };
  const processPressureSeries = [
    {
      name: processPressureChartData.datasets[0].label,
      data: processPressureChartData.datasets[0].data
    }
  ];

  const processFlowOptions = {
    chart: { id: 'flow-chart', toolbar: { show: false } },
    xaxis: {
      categories: processFlowChartData.labels,
      labels: { style: { colors: '#fff' } }
    },
    stroke: { curve: 'smooth', colors: [processFlowChartData.datasets[0].borderColor] },
    tooltip: { theme: 'dark' },
    grid: { borderColor: '#2d2d44' },
    theme: { mode: 'dark' }
  };
  const processFlowSeries = [
    {
      name: processFlowChartData.datasets[0].label,
      data: processFlowChartData.datasets[0].data
    }
  ];

  // ********************
  // Build Highcharts Options (for multi–dataset charts)
  // ********************

  const actualVsForecastOptions = {
    chart: {
      type: 'line',
      backgroundColor: '#2d2d44'
    },
    title: { text: null },
    xAxis: {
      categories: actualVsForecastData.labels,
      labels: { style: { color: '#fff' } }
    },
    yAxis: {
      title: { text: null },
      labels: { style: { color: '#fff' } }
    },
    series: actualVsForecastData.datasets.map(ds => ({
      name: ds.label,
      data: ds.data,
      color: ds.borderColor
    })),
    legend: { itemStyle: { color: '#fff' } },
    tooltip: { theme: 'dark' }
  };

  const forecastErrorOptions = {
    chart: {
      type: 'line',
      backgroundColor: '#2d2d44'
    },
    title: { text: null },
    xAxis: {
      categories: forecastErrorData.labels,
      labels: { style: { color: '#fff' } }
    },
    yAxis: {
      title: { text: null },
      labels: { style: { color: '#fff' } }
    },
    series: forecastErrorData.datasets.map(ds => ({
      name: ds.label,
      data: ds.data,
      color: ds.borderColor
    })),
    legend: { itemStyle: { color: '#fff' } },
    tooltip: { theme: 'dark' }
  };

  return (
    <>
      {/* Embedded CSS */}
      <style>{`
        .hover-card {
          transition: all 0.3s ease;
        }
        .hover-card:hover {
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
          transform: scale(1.02);
        }
      `}</style>

      <Container fluid style={darkTheme}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>Electrolyzer Plant Overview</h2>
        
        {/* Standard Plant KPIs */}
        <Row className="mb-4">
          {/* For smaller screens, adjust columns so that there are at most 2 per row */}
          <Col xs={12} sm={6} md={2}>
            <KPICard
              title="H₂ Production"
              value={h2ProductionRate.toFixed(1)}
              unit="kg/hr"
              color="#28a745"
            />
          </Col>
          <Col xs={12} sm={6} md={2}>
            <KPICard
              title="Plant Efficiency"
              value={plantEfficiency.toFixed(2)}
              unit="kWh/kg"
              color="#17a2b8"
            />
          </Col>
          <Col xs={12} sm={6} md={2}>
            <KPICard
              title="Stack Life"
              gaugeValue={stackRemainingLife}
              value={stackRemainingLife}
              unit="%"
              color="#6c757d"
            />
          </Col>
          <Col xs={12} sm={6} md={2}>
            <KPICard
              title="Utilization"
              gaugeValue={capacityUtilization}
              value={capacityUtilization}
              unit="%"
              color="#007bff"
            />
          </Col>
          <Col xs={12} sm={6} md={2}>
            <KPICard
              title="Forecast Prod."
              value={forecastData.datasets[0].data[0]}
              unit="kg (24H)"
              color="#ffc107"
            />
          </Col>
          <Col xs={12} sm={6} md={2}>
            <Card className="mb-3 hover-card" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
              <CardBody className="text-center">
                <CardTitle tag="h5" style={{ color: '#fff' }}>Membrane Health</CardTitle>
                <Badge color={membraneHealth === 'Good' ? 'success' : 'warning'}>
                  {membraneHealth}
                </Badge>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        {/* Overview Charts (ApexCharts) */}
        <Row className="mb-4">
          <Col xs={12} md={6}>
            <Card className="hover-card" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
              <CardBody>
                <CardTitle tag="h5" style={{ color: '#fff' }}>Degradation Rate</CardTitle>
                <Chart options={degradationOptions} series={degradationSeries} type="line" height="350" />
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="hover-card" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
              <CardBody>
                <CardTitle tag="h5" style={{ color: '#fff' }}>Forecast Production Trend</CardTitle>
                <Chart options={forecastOptions} series={forecastSeries} type="line" height="350" />
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        {/* Plant Events */}
        <Row className="mb-4">
          <Col xs={12}>
            <Card className="hover-card" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
              <CardBody>
                <CardTitle tag="h5" style={{ color: '#fff' }}>Plant Events</CardTitle>
                <Table hover responsive dark>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Event</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plantEvents.map((event, idx) => (
                      <tr key={idx}>
                        <td>{event.time}</td>
                        <td>{event.event}</td>
                        <td>{event.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        {/* Real-Time Process Parameter Trend (ApexCharts) */}
        <Row className="mb-4">
          <Col xs={12}>
            <h4 style={{ color: '#fff' }}>Real-Time Process Parameter Trend</h4>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xs={12} md={4}>
            <Card className="hover-card" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
              <CardBody>
                <CardTitle tag="h5" style={{ color: '#fff' }}>Temperature (°C)</CardTitle>
                <Chart options={processTempOptions} series={processTempSeries} type="line" height="350" />
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="hover-card" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
              <CardBody>
                <CardTitle tag="h5" style={{ color: '#fff' }}>Pressure (bar)</CardTitle>
                <Chart options={processPressureOptions} series={processPressureSeries} type="line" height="350" />
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="hover-card" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
              <CardBody>
                <CardTitle tag="h5" style={{ color: '#fff' }}>Flow Rate (m³/hr)</CardTitle>
                <Chart options={processFlowOptions} series={processFlowSeries} type="line" height="350" />
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        {/* Additional Analytics Charts (Highcharts) */}
        <Row className="mb-4">
          <Col xs={12}>
            <h4 style={{ color: '#fff' }}>Analytics & AI Predictions</h4>
            <p style={{ color: '#ccc', fontStyle: 'italic' }}>
              Insights specific to the Green H₂ Electrolyzer: Forecast accuracy of production, detection of operational anomalies, predictive maintenance confidence, and predicted time until next maintenance are essential for optimizing performance and reducing downtime.
            </p>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xs={12} md={6}>
            <Card className="hover-card" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
              <CardBody>
                <CardTitle tag="h5" style={{ color: '#fff' }}>Actual vs Forecasted Production</CardTitle>
                <HighchartsReact highcharts={Highcharts} options={actualVsForecastOptions} />
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="hover-card" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
              <CardBody>
                <CardTitle tag="h5" style={{ color: '#fff' }}>Forecast Error Trend</CardTitle>
                <HighchartsReact highcharts={Highcharts} options={forecastErrorOptions} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        {/* KPI Cards for Analytics & AI Predictions */}
        <Row className="mb-4">
          <Col xs={12} sm={6} md={3}>
            <KPICard
              title="Green H₂ Forecast Accuracy"
              value={greenH2ForecastAccuracy.toFixed(0)}
              unit="%"
              color="#00c853"
            />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <KPICard
              title="Electrolyzer Anomaly Score"
              value={electrolyzerAnomalyScore.toFixed(0)}
              unit="Score"
              color="#d32f2f"
            />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <KPICard
              title="Predictive Maint. Confidence"
              value={predictiveMaintenanceConfidence.toFixed(0)}
              unit="%"
              color="#3949ab"
            />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <KPICard
              title="Predicted Time to Next Maint."
              value={predictedMaintenanceInterval.toFixed(1)}
              unit="hrs"
              color="#ff6f00"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BetterOverviewPage;


// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   CardTitle,
//   Badge,
//   Table
// } from 'reactstrap';
// import Chart from 'react-apexcharts';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

// // Dark theme styling for a technical look
// const darkTheme = {
//   backgroundColor: '#1e1e2f',
//   color: '#ffffff',
//   minHeight: '100vh',
//   padding: '20px'
// };

// // Reusable KPI Card Component
// // If a gaugeValue is provided, a radial bar gauge (via ApexCharts) is rendered;
// // otherwise, the numeric value is shown.
// const KPICard = ({ title, value, unit, gaugeValue, color }) => {
//   if (gaugeValue !== undefined) {
//     const gaugeOptions = {
//       chart: {
//         type: 'radialBar',
//         sparkline: { enabled: true },
//         background: "transparent"
//       },
//       plotOptions: {
//         radialBar: {
//           hollow: { size: '30%' },
//           dataLabels: {
//             name: { show: false },
//             value: {
//               formatter: function(val) {
//                 return `${Math.round(val)}%`;
//               },
//               color: '#fff',
//               fontSize: '16px',
//               show: true
//             }
//           }
//         }
//       },
//       colors: ['#FF5F6D', '#FFC371'],
//       theme: { mode: 'dark' }
//     };
//     const gaugeSeries = [gaugeValue];
//     return (
//       <Card className="mb-3" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//         <CardBody className="text-center">
//           <CardTitle tag="h5" style={{ color: '#fff' }}>{title}</CardTitle>
//           <Chart options={gaugeOptions} series={gaugeSeries} type="radialBar" height="150" />
//         </CardBody>
//       </Card>
//     );
//   } else {
//     return (
//       <Card className="mb-3" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//         <CardBody className="text-center">
//           <CardTitle tag="h5" style={{ color: '#fff' }}>{title}</CardTitle>
//           <h2 style={{ color }}>{value} {unit}</h2>
//         </CardBody>
//       </Card>
//     );
//   }
// };

// const BetterOverviewPage = () => {
//   // Standard Plant KPI States (simulate real-time updates)
//   const [h2ProductionRate, setH2ProductionRate] = useState(10); // kg H₂/hr
//   const [plantEfficiency, setPlantEfficiency] = useState(47); // kWh/kg H₂
//   const [stackRemainingLife, setStackRemainingLife] = useState(87); // %
//   const [capacityUtilization, setCapacityUtilization] = useState(75); // %
//   const [membraneHealth, setMembraneHealth] = useState('Good');

//   // Analytics & AI KPIs for Green H₂ Electrolyzer
//   const [greenH2ForecastAccuracy, setGreenH2ForecastAccuracy] = useState(92); // %
//   const [electrolyzerAnomalyScore, setElectrolyzerAnomalyScore] = useState(3); // lower is better
//   const [predictiveMaintenanceConfidence, setPredictiveMaintenanceConfidence] = useState(98); // %
//   const [predictedMaintenanceInterval, setPredictedMaintenanceInterval] = useState(5); // hrs

//   // Simulate KPI updates every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setH2ProductionRate(prev => Math.max(8, Math.min(12, prev + (Math.random() - 0.5))) );
//       setPlantEfficiency(prev => Math.max(47, Math.min(6, prev + (Math.random() - 0.8) * 0.2)));
//       setStackRemainingLife(prev => Math.max(80, Math.min(100, prev + (Math.random() - 0.5) * 2)));
//       setCapacityUtilization(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 3)));
//       // Analytics KPIs: small fluctuations
//       setGreenH2ForecastAccuracy(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5))) );
//       setElectrolyzerAnomalyScore(prev => Math.max(0, Math.min(10, prev + (Math.random() - 0.5))));
//       setPredictiveMaintenanceConfidence(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5))));
//       setPredictedMaintenanceInterval(prev => Math.max(2, Math.min(10, prev + (Math.random() - 0.5) * 0.5)));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Dummy Chart Data for Degradation Rate (to be rendered with ApexCharts)
//   const degradationData = {
//     labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
//     datasets: [
//       {
//         label: 'Degradation Rate (%)',
//         data: [0, 0.2, 0.3, 0.35, 0.4],
//         borderColor: '#FF6384'
//       }
//     ]
//   };

//   // Dummy Chart Data for Forecast Production Trend (ApexCharts)
//   const forecastData = {
//     labels: ['Next 24H', 'Next Week', 'Next Month'],
//     datasets: [
//       {
//         label: 'Forecasted Production (kg H₂)',
//         data: [100, 700, 3000],
//         borderColor: 'rgba(75,192,192,1)'
//       }
//     ]
//   };

//   // Dummy data for Plant Events
//   const plantEvents = [
//     { time: '08:00', event: 'Start-up', description: 'Plant started successfully.' },
//     { time: '10:30', event: 'Trip', description: 'Minor stack trip detected.' },
//     { time: '12:00', event: 'Planned Maintenance', description: 'Routine system check.' },
//     { time: '15:00', event: 'Shutdown', description: 'Emergency shutdown triggered.' }
//   ];

//   // Real-Time Process Parameter Trend Simulation (10 data points)
//   const initialProcessLabels = Array.from({ length: 10 }, (_, i) => `T-${(10 - i) * 5}s`);
//   const [processLabels, setProcessLabels] = useState(initialProcessLabels);
//   const [processTempValues, setProcessTempValues] = useState(Array(10).fill(75)); // °C
//   const [processPressureValues, setProcessPressureValues] = useState(Array(10).fill(30)); // bar
//   const [processFlowValues, setProcessFlowValues] = useState(Array(10).fill(100)); // m³/hr

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newTime = new Date().toLocaleTimeString();
//       setProcessLabels(prev => [...prev.slice(1), newTime]);
//       setProcessTempValues(prev => {
//         const newVal = prev[prev.length - 1] + (Math.random() * 2 - 1);
//         return [...prev.slice(1), parseFloat(newVal.toFixed(2))];
//       });
//       setProcessPressureValues(prev => {
//         const newVal = prev[prev.length - 1] + (Math.random() * 0.5 - 0.25);
//         return [...prev.slice(1), parseFloat(newVal.toFixed(2))];
//       });
//       setProcessFlowValues(prev => {
//         const newVal = prev[prev.length - 1] + (Math.random() * 5 - 2.5);
//         return [...prev.slice(1), parseFloat(newVal.toFixed(2))];
//       });
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const processTempChartData = {
//     labels: processLabels,
//     datasets: [{
//       label: 'Process Temperature (°C)',
//       data: processTempValues,
//       borderColor: 'red'
//     }]
//   };

//   const processPressureChartData = {
//     labels: processLabels,
//     datasets: [{
//       label: 'Process Pressure (bar)',
//       data: processPressureValues,
//       borderColor: 'blue'
//     }]
//   };

//   const processFlowChartData = {
//     labels: processLabels,
//     datasets: [{
//       label: 'Process Flow Rate (m³/hr)',
//       data: processFlowValues,
//       borderColor: 'green'
//     }]
//   };

//   // Dummy data for Additional Analytics Charts (to be rendered with Highcharts)
//   const actualVsForecastData = {
//     labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6'],
//     datasets: [
//       {
//         label: 'Actual Production',
//         data: [10, 11, 9, 10, 10.5, 10],
//         borderColor: 'green'
//       },
//       {
//         label: 'Forecasted Production',
//         data: [10.2, 10.9, 9.1, 10.1, 10.6, 10.1],
//         borderColor: 'orange'
//       }
//     ]
//   };

//   const forecastErrorData = {
//     labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6'],
//     datasets: [
//       {
//         label: 'Forecast Error (%)',
//         data: [1, 0.5, 2, 1, 0.7, 1.2],
//         borderColor: 'red'
//       }
//     ]
//   };

//   // ********************
//   // Build ApexCharts Options & Series
//   // ********************

//   // Degradation Rate Chart (ApexCharts)
//   const degradationOptions = {
//     chart: {
//       id: 'degradation-chart',
//       toolbar: { show: false }
//     },
//     xaxis: {
//       categories: degradationData.labels,
//       labels: { style: { colors: '#fff' } }
//     },
//     stroke: {
//       curve: 'smooth',
//       colors: [degradationData.datasets[0].borderColor]
//     },
//     tooltip: { theme: 'dark' },
//     grid: { borderColor: '#2d2d44' },
//     theme: { mode: 'dark' }
//   };
//   const degradationSeries = [
//     {
//       name: degradationData.datasets[0].label,
//       data: degradationData.datasets[0].data
//     }
//   ];

//   // Forecast Production Trend Chart (ApexCharts)
//   const forecastOptions = {
//     chart: {
//       id: 'forecast-chart',
//       toolbar: { show: false }
//     },
//     xaxis: {
//       categories: forecastData.labels,
//       labels: { style: { colors: '#fff' } }
//     },
//     stroke: {
//       curve: 'smooth',
//       colors: [forecastData.datasets[0].borderColor]
//     },
//     tooltip: { theme: 'dark' },
//     grid: { borderColor: '#2d2d44' },
//     theme: { mode: 'dark' }
//   };
//   const forecastSeries = [
//     {
//       name: forecastData.datasets[0].label,
//       data: forecastData.datasets[0].data
//     }
//   ];

//   // Real-Time Process Parameter Charts (ApexCharts)
//   const processTempOptions = {
//     chart: { id: 'temp-chart', toolbar: { show: false } },
//     xaxis: {
//       categories: processTempChartData.labels,
//       labels: { style: { colors: '#fff' } }
//     },
//     stroke: { curve: 'smooth', colors: [processTempChartData.datasets[0].borderColor] },
//     tooltip: { theme: 'dark' },
//     grid: { borderColor: '#2d2d44' },
//     theme: { mode: 'dark' }
//   };
//   const processTempSeries = [
//     {
//       name: processTempChartData.datasets[0].label,
//       data: processTempChartData.datasets[0].data
//     }
//   ];

//   const processPressureOptions = {
//     chart: { id: 'pressure-chart', toolbar: { show: false } },
//     xaxis: {
//       categories: processPressureChartData.labels,
//       labels: { style: { colors: '#fff' } }
//     },
//     stroke: { curve: 'smooth', colors: [processPressureChartData.datasets[0].borderColor] },
//     tooltip: { theme: 'dark' },
//     grid: { borderColor: '#2d2d44' },
//     theme: { mode: 'dark' }
//   };
//   const processPressureSeries = [
//     {
//       name: processPressureChartData.datasets[0].label,
//       data: processPressureChartData.datasets[0].data
//     }
//   ];

//   const processFlowOptions = {
//     chart: { id: 'flow-chart', toolbar: { show: false } },
//     xaxis: {
//       categories: processFlowChartData.labels,
//       labels: { style: { colors: '#fff' } }
//     },
//     stroke: { curve: 'smooth', colors: [processFlowChartData.datasets[0].borderColor] },
//     tooltip: { theme: 'dark' },
//     grid: { borderColor: '#2d2d44' },
//     theme: { mode: 'dark' }
//   };
//   const processFlowSeries = [
//     {
//       name: processFlowChartData.datasets[0].label,
//       data: processFlowChartData.datasets[0].data
//     }
//   ];

//   // ********************
//   // Build Highcharts Options (for multi–dataset charts)
//   // ********************

//   const actualVsForecastOptions = {
//     chart: {
//       type: 'line',
//       backgroundColor: '#2d2d44'
//     },
//     title: { text: null },
//     xAxis: {
//       categories: actualVsForecastData.labels,
//       labels: { style: { color: '#fff' } }
//     },
//     yAxis: {
//       title: { text: null },
//       labels: { style: { color: '#fff' } }
//     },
//     series: actualVsForecastData.datasets.map(ds => ({
//       name: ds.label,
//       data: ds.data,
//       color: ds.borderColor
//     })),
//     legend: { itemStyle: { color: '#fff' } },
//     tooltip: { theme: 'dark' }
//   };

//   const forecastErrorOptions = {
//     chart: {
//       type: 'line',
//       backgroundColor: '#2d2d44'
//     },
//     title: { text: null },
//     xAxis: {
//       categories: forecastErrorData.labels,
//       labels: { style: { color: '#fff' } }
//     },
//     yAxis: {
//       title: { text: null },
//       labels: { style: { color: '#fff' } }
//     },
//     series: forecastErrorData.datasets.map(ds => ({
//       name: ds.label,
//       data: ds.data,
//       color: ds.borderColor
//     })),
//     legend: { itemStyle: { color: '#fff' } },
//     tooltip: { theme: 'dark' }
//   };

//   return (
//     <Container fluid style={darkTheme}>
//       <h2 style={{ color: '#fff', marginBottom: '20px' }}>Electrolyzer Plant Overview</h2>
      
//       {/* Standard Plant KPIs */}
//       <Row className="mb-4">
//         {/* For small screens, show two cards per row (xs=6), and for medium screens show six per row (md=2) */}
//         <Col xs={6} md={2}>
//           <KPICard
//             title="H₂ Production"
//             value={h2ProductionRate.toFixed(1)}
//             unit="kg/hr"
//             color="#28a745"
//           />
//         </Col>
//         <Col xs={6} md={2}>
//           <KPICard
//             title="Plant Efficiency"
//             value={plantEfficiency.toFixed(2)}
//             unit="kWh/kg"
//             color="#17a2b8"
//           />
//         </Col>
//         <Col xs={6} md={2}>
//           <KPICard
//             title="Stack Life"
//             gaugeValue={stackRemainingLife}
//             value={stackRemainingLife}
//             unit="%"
//             color="#6c757d"
//           />
//         </Col>
//         <Col xs={6} md={2}>
//           <KPICard
//             title="Utilization"
//             gaugeValue={capacityUtilization}
//             value={capacityUtilization}
//             unit="%"
//             color="#007bff"
//           />
//         </Col>
//         <Col xs={6} md={2}>
//           <KPICard
//             title="Forecast Prod."
//             value={forecastData.datasets[0].data[0]}
//             unit="kg (24H)"
//             color="#ffc107"
//           />
//         </Col>
//         <Col xs={6} md={2}>
//           <Card className="mb-3" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody className="text-center">
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Membrane Health</CardTitle>
//               <Badge color={membraneHealth === 'Good' ? 'success' : 'warning'}>
//                 {membraneHealth}
//               </Badge>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* Overview Charts (ApexCharts) */}
//       <Row className="mb-4">
//         <Col xs={12} md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Degradation Rate</CardTitle>
//               <Chart options={degradationOptions} series={degradationSeries} type="line" height="350" />
//             </CardBody>
//           </Card>
//         </Col>
//         <Col xs={12} md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Forecast Production Trend</CardTitle>
//               <Chart options={forecastOptions} series={forecastSeries} type="line" height="350" />
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* Plant Events */}
//       <Row className="mb-4">
//         <Col xs={12}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Plant Events</CardTitle>
//               <Table hover responsive dark>
//                 <thead>
//                   <tr>
//                     <th>Time</th>
//                     <th>Event</th>
//                     <th>Description</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {plantEvents.map((event, idx) => (
//                     <tr key={idx}>
//                       <td>{event.time}</td>
//                       <td>{event.event}</td>
//                       <td>{event.description}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* Real-Time Process Parameter Trend (ApexCharts) */}
//       <Row className="mb-4">
//         <Col xs={12}>
//           <h4 style={{ color: '#fff' }}>Real-Time Process Parameter Trend</h4>
//         </Col>
//       </Row>
//       <Row className="mb-4">
//         <Col xs={12} md={4}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Temperature (°C)</CardTitle>
//               <Chart options={processTempOptions} series={processTempSeries} type="line" height="350" />
//             </CardBody>
//           </Card>
//         </Col>
//         <Col xs={12} md={4}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Pressure (bar)</CardTitle>
//               <Chart options={processPressureOptions} series={processPressureSeries} type="line" height="350" />
//             </CardBody>
//           </Card>
//         </Col>
//         <Col xs={12} md={4}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Flow Rate (m³/hr)</CardTitle>
//               <Chart options={processFlowOptions} series={processFlowSeries} type="line" height="350" />
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* Additional Analytics Charts (Highcharts) */}
//       <Row className="mb-4">
//         <Col xs={12}>
//           <h4 style={{ color: '#fff' }}>Analytics & AI Predictions</h4>
//           <p style={{ color: '#ccc', fontStyle: 'italic' }}>
//             Insights specific to the Green H₂ Electrolyzer: Forecast accuracy of production, detection of operational anomalies, predictive maintenance confidence, and predicted time until next maintenance are essential for optimizing performance and reducing downtime.
//           </p>
//         </Col>
//       </Row>
//       <Row className="mb-4">
//         <Col xs={12} md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Actual vs Forecasted Production</CardTitle>
//               <HighchartsReact highcharts={Highcharts} options={actualVsForecastOptions} />
//             </CardBody>
//           </Card>
//         </Col>
//         <Col xs={12} md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Forecast Error Trend</CardTitle>
//               <HighchartsReact highcharts={Highcharts} options={forecastErrorOptions} />
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* KPI Cards for Analytics & AI Predictions */}
//       <Row className="mb-4">
//         <Col xs={12} sm={6} md={3}>
//           <KPICard
//             title="Green H₂ Forecast Accuracy"
//             value={greenH2ForecastAccuracy.toFixed(0)}
//             unit="%"
//             color="#00c853"
//           />
//         </Col>
//         <Col xs={12} sm={6} md={3}>
//           <KPICard
//             title="Electrolyzer Anomaly Score"
//             value={electrolyzerAnomalyScore.toFixed(0)}
//             unit="Score"
//             color="#d32f2f"
//           />
//         </Col>
//         <Col xs={12} sm={6} md={3}>
//           <KPICard
//             title="Predictive Maint. Confidence"
//             value={predictiveMaintenanceConfidence.toFixed(0)}
//             unit="%"
//             color="#3949ab"
//           />
//         </Col>
//         <Col xs={12} sm={6} md={3}>
//           <KPICard
//             title="Predicted Time to Next Maint."
//             value={predictedMaintenanceInterval.toFixed(1)}
//             unit="hrs"
//             color="#ff6f00"
//           />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default BetterOverviewPage;



// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   CardTitle,
//   Badge,
//   Table
// } from 'reactstrap';
// import { Line, Bar } from 'react-chartjs-2';
// import GaugeChart from 'react-gauge-chart';
// import { Chart as ChartJS, registerables } from 'chart.js';
// ChartJS.register(...registerables);

// // Dark theme styling for a technical look
// const darkTheme = {
//   backgroundColor: '#1e1e2f',
//   color: '#ffffff',
//   minHeight: '100vh',
//   padding: '20px'
// };

// // Reusable KPI Card Component
// // If a gaugeValue is provided, a gauge chart is rendered; otherwise, the numeric value is shown.
// const KPICard = ({ title, value, unit, gaugeValue, color }) => (
//   <Card className="mb-3" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//     <CardBody>
//       <CardTitle tag="h5" style={{ color: '#fff' }}>{title}</CardTitle>
//       {gaugeValue !== undefined ? (
//         <GaugeChart
//           id={`gauge-${title}`}
//           nrOfLevels={20}
//           percent={gaugeValue / 100}
//           colors={['#FF5F6D', '#FFC371']}
//           arcWidth={0.3}
//           textColor="#fff"
//         />
//       ) : (
//         <h2 style={{ color }}>{value} {unit}</h2>
//       )}
//     </CardBody>
//   </Card>
// );

// const BetterOverviewPage = () => {
//   // Standard Plant KPI States (simulate real-time updates)
//   const [h2ProductionRate, setH2ProductionRate] = useState(10); // kg H₂/hr
//   const [plantEfficiency, setPlantEfficiency] = useState(5); // kWh/kg H₂
//   const [stackRemainingLife, setStackRemainingLife] = useState(87); // %
//   const [capacityUtilization, setCapacityUtilization] = useState(75); // %
//   const [membraneHealth, setMembraneHealth] = useState('Good');

//   // Analytics & AI KPIs for Green H₂ Electrolyzer
//   const [greenH2ForecastAccuracy, setGreenH2ForecastAccuracy] = useState(92); // %
//   const [electrolyzerAnomalyScore, setElectrolyzerAnomalyScore] = useState(3); // lower is better
//   const [predictiveMaintenanceConfidence, setPredictiveMaintenanceConfidence] = useState(98); // %
//   const [predictedMaintenanceInterval, setPredictedMaintenanceInterval] = useState(5); // hrs

//   // Simulate KPI updates every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setH2ProductionRate(prev => Math.max(8, Math.min(12, prev + (Math.random() - 0.5))));
//       setPlantEfficiency(prev => Math.max(4, Math.min(6, prev + (Math.random() - 0.5) * 0.2)));
//       setStackRemainingLife(prev => Math.max(80, Math.min(100, prev + (Math.random() - 0.5) * 2)));
//       setCapacityUtilization(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 3)));
//       // Analytics KPIs: small fluctuations
//       setGreenH2ForecastAccuracy(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5))));
//       setElectrolyzerAnomalyScore(prev => Math.max(0, Math.min(10, prev + (Math.random() - 0.5))));
//       setPredictiveMaintenanceConfidence(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5))));
//       setPredictedMaintenanceInterval(prev => Math.max(2, Math.min(10, prev + (Math.random() - 0.5) * 0.5)));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Dummy Chart Data for Degradation Rate
//   const degradationData = {
//     labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
//     datasets: [
//       {
//         label: 'Degradation Rate (%)',
//         data: [0, 0.2, 0.3, 0.35, 0.4],
//         borderColor: '#FF6384',
//         fill: false,
//       },
//     ],
//   };

//   // Dummy Chart Data for Forecast Production Trend
//   const forecastData = {
//     labels: ['Next 24H', 'Next Week', 'Next Month'],
//     datasets: [
//       {
//         label: 'Forecasted Production (kg H₂)',
//         data: [100, 700, 3000],
//         fill: false,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//       },
//     ],
//   };

//   // Dummy data for Plant Events
//   const plantEvents = [
//     { time: '08:00', event: 'Start-up', description: 'Plant started successfully.' },
//     { time: '10:30', event: 'Trip', description: 'Minor stack trip detected.' },
//     { time: '12:00', event: 'Planned Maintenance', description: 'Routine system check.' },
//     { time: '15:00', event: 'Shutdown', description: 'Emergency shutdown triggered.' }
//   ];

//   // Real-Time Process Parameter Trend Simulation (10 data points)
//   const initialProcessLabels = Array.from({ length: 10 }, (_, i) => `T-${(10 - i) * 5}s`);
//   const [processLabels, setProcessLabels] = useState(initialProcessLabels);
//   const [processTempValues, setProcessTempValues] = useState(Array(10).fill(75)); // °C
//   const [processPressureValues, setProcessPressureValues] = useState(Array(10).fill(30)); // bar
//   const [processFlowValues, setProcessFlowValues] = useState(Array(10).fill(100)); // m³/hr

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newTime = new Date().toLocaleTimeString();
//       setProcessLabels(prev => [...prev.slice(1), newTime]);
//       setProcessTempValues(prev => {
//         const newVal = prev[prev.length - 1] + (Math.random() * 2 - 1);
//         return [...prev.slice(1), parseFloat(newVal.toFixed(2))];
//       });
//       setProcessPressureValues(prev => {
//         const newVal = prev[prev.length - 1] + (Math.random() * 0.5 - 0.25);
//         return [...prev.slice(1), parseFloat(newVal.toFixed(2))];
//       });
//       setProcessFlowValues(prev => {
//         const newVal = prev[prev.length - 1] + (Math.random() * 5 - 2.5);
//         return [...prev.slice(1), parseFloat(newVal.toFixed(2))];
//       });
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const processTempChartData = {
//     labels: processLabels,
//     datasets: [{
//       label: 'Process Temperature (°C)',
//       data: processTempValues,
//       fill: false,
//       borderColor: 'red'
//     }]
//   };

//   const processPressureChartData = {
//     labels: processLabels,
//     datasets: [{
//       label: 'Process Pressure (bar)',
//       data: processPressureValues,
//       fill: false,
//       borderColor: 'blue'
//     }]
//   };

//   const processFlowChartData = {
//     labels: processLabels,
//     datasets: [{
//       label: 'Process Flow Rate (m³/hr)',
//       data: processFlowValues,
//       fill: false,
//       borderColor: 'green'
//     }]
//   };

//   // Additional Analytics Charts:
//   // Actual vs Forecasted Production (for a short-term period)
//   const actualVsForecastData = {
//     labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6'],
//     datasets: [
//       {
//         label: 'Actual Production',
//         data: [10, 11, 9, 10, 10.5, 10],
//         borderColor: 'green',
//         fill: false,
//       },
//       {
//         label: 'Forecasted Production',
//         data: [10.2, 10.9, 9.1, 10.1, 10.6, 10.1],
//         borderColor: 'orange',
//         fill: false,
//       },
//     ],
//   };

//   // Forecast Error Trend chart
//   const forecastErrorData = {
//     labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6'],
//     datasets: [
//       {
//         label: 'Forecast Error (%)',
//         data: [1, 0.5, 2, 1, 0.7, 1.2],
//         borderColor: 'red',
//         fill: false,
//       },
//     ],
//   };

//   return (
//     <Container fluid style={darkTheme}>
//       <h2 style={{ color: '#fff', marginBottom: '20px' }}>Electrolyzer Plant Overview</h2>
      
//       {/* Standard Plant KPIs */}
//       <Row className="mb-4">
//         <Col md={2}>
//           <KPICard
//             title="H₂ Production"
//             value={h2ProductionRate.toFixed(1)}
//             unit="kg/hr"
//             color="#28a745"
//           />
//         </Col>
//         <Col md={2}>
//           <KPICard
//             title="Plant Efficiency"
//             value={plantEfficiency.toFixed(2)}
//             unit="kWh/kg"
//             color="#17a2b8"
//           />
//         </Col>
//         <Col md={2}>
//           <KPICard
//             title="Stack Life"
//             gaugeValue={stackRemainingLife}
//             value={stackRemainingLife}
//             unit="%"
//             color="#6c757d"
//           />
//         </Col>
//         <Col md={2}>
//           <KPICard
//             title="Capacity Utilization"
//             gaugeValue={capacityUtilization}
//             value={capacityUtilization}
//             unit="%"
//             color="#007bff"
//           />
//         </Col>
//         <Col md={2}>
//           <KPICard
//             title="Forecast Prod."
//             value={forecastData.datasets[0].data[0]}
//             unit="kg (24H)"
//             color="#ffc107"
//           />
//         </Col>
//         <Col md={2}>
//           <Card className="mb-3" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Membrane Health</CardTitle>
//               <Badge color={membraneHealth === 'Good' ? 'success' : 'warning'}>
//                 {membraneHealth}
//               </Badge>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* Overview Charts */}
//       <Row className="mb-4">
//         <Col md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Degradation Rate</CardTitle>
//               <Line
//                 data={degradationData}
//                 options={{
//                   responsive: true,
//                   plugins: { legend: { labels: { color: '#fff' } } }
//                 }}
//               />
//             </CardBody>
//           </Card>
//         </Col>
//         <Col md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Forecast Production Trend</CardTitle>
//               <Line
//                 data={forecastData}
//                 options={{
//                   responsive: true,
//                   plugins: { legend: { labels: { color: '#fff' } } }
//                 }}
//               />
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* Plant Events */}
//       <Row className="mb-4">
//         <Col>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Plant Events</CardTitle>
//               <Table hover responsive dark>
//                 <thead>
//                   <tr>
//                     <th>Time</th>
//                     <th>Event</th>
//                     <th>Description</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {plantEvents.map((event, idx) => (
//                     <tr key={idx}>
//                       <td>{event.time}</td>
//                       <td>{event.event}</td>
//                       <td>{event.description}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* Real-Time Process Parameter Trend */}
//       <Row className="mb-4">
//         <Col>
//           <h4 style={{ color: '#fff' }}>Real-Time Process Parameter Trend</h4>
//         </Col>
//       </Row>
//       <Row className="mb-4">
//         <Col md={4}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Temperature (°C)</CardTitle>
//               <Line
//                 data={processTempChartData}
//                 options={{
//                   responsive: true,
//                   plugins: { legend: { labels: { color: '#fff' } } }
//                 }}
//               />
//             </CardBody>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Pressure (bar)</CardTitle>
//               <Line
//                 data={processPressureChartData}
//                 options={{
//                   responsive: true,
//                   plugins: { legend: { labels: { color: '#fff' } } }
//                 }}
//               />
//             </CardBody>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Flow Rate (m³/hr)</CardTitle>
//               <Line
//                 data={processFlowChartData}
//                 options={{
//                   responsive: true,
//                   plugins: { legend: { labels: { color: '#fff' } } }
//                 }}
//               />
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* Analytics & AI Predictions */}
//       <Row className="mb-4">
//         <Col>
//           <h4 style={{ color: '#fff' }}>Analytics & AI Predictions</h4>
//           <p style={{ color: '#ccc', fontStyle: 'italic' }}>
//             Insights specific to the Green H₂ Electrolyzer: Forecast accuracy of production, detection of operational anomalies, predictive maintenance confidence, and predicted time until next maintenance are essential for optimizing performance and reducing downtime.
//           </p>
//         </Col>
//       </Row>
//       <Row className="mb-4">
//         <Col md={3}>
//           <KPICard
//             title="Green H₂ Forecast Accuracy"
//             value={greenH2ForecastAccuracy.toFixed(0)}
//             unit="%"
//             color="#00c853"
//           />
//         </Col>
//         <Col md={3}>
//           <KPICard
//             title="Electrolyzer Anomaly Score"
//             value={electrolyzerAnomalyScore.toFixed(0)}
//             unit="Score"
//             color="#d32f2f"
//           />
//         </Col>
//         <Col md={3}>
//           <KPICard
//             title="Predictive Maint. Confidence"
//             value={predictiveMaintenanceConfidence.toFixed(0)}
//             unit="%"
//             color="#3949ab"
//           />
//         </Col>
//         <Col md={3}>
//           <KPICard
//             title="Predicted Time to Next Maint."
//             value={predictedMaintenanceInterval.toFixed(1)}
//             unit="hrs"
//             color="#ff6f00"
//           />
//         </Col>
//       </Row>
      
//       {/* Additional Analytics Charts */}
//       <Row className="mb-4">
//         <Col md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Actual vs Forecasted Production</CardTitle>
//               <Line
//                 data={actualVsForecastData}
//                 options={{
//                   responsive: true,
//                   plugins: { legend: { labels: { color: '#fff' } } }
//                 }}
//               />
//             </CardBody>
//           </Card>
//         </Col>
//         <Col md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Forecast Error Trend</CardTitle>
//               <Line
//                 data={forecastErrorData}
//                 options={{
//                   responsive: true,
//                   plugins: { legend: { labels: { color: '#fff' } } }
//                 }}
//               />
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default BetterOverviewPage;






// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   CardTitle,
//   Badge,
//   Table
// } from 'reactstrap';
// import Chart from 'react-apexcharts';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

// // Dark theme styling for a technical look
// const darkTheme = {
//   backgroundColor: '#1e1e2f',
//   color: '#ffffff',
//   minHeight: '100vh',
//   padding: '20px'
// };

// // Reusable KPI Card Component
// // If a gaugeValue is provided, a radial bar gauge (via ApexCharts) is rendered;
// // otherwise, the numeric value is shown.
// const KPICard = ({ title, value, unit, gaugeValue, color }) => {
//   if (gaugeValue !== undefined) {
//     const gaugeOptions = {
//       chart: {
//         type: 'radialBar',
//         sparkline: { enabled: true }
//       },
//       plotOptions: {
//         radialBar: {
//           hollow: { size: '60%' },
//           dataLabels: {
//             name: { show: false },
//             value: {
//               formatter: function(val) {
//                 return `${Math.round(val)}%`;
//               },
//               color: '#fff',
//               fontSize: '16px',
//               show: true
//             }
//           }
//         }
//       },
//       colors: ['#FF5F6D', '#FFC371'],
//       theme: { mode: 'dark' }
//     };
//     const gaugeSeries = [gaugeValue];
//     return (
//       <Card className="mb-3" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//         <CardBody>
//           <CardTitle tag="h5" style={{ color: '#fff' }}>{title}</CardTitle>
//           <Chart options={gaugeOptions} series={gaugeSeries} type="radialBar" height="150" />
//         </CardBody>
//       </Card>
//     );
//   } else {
//     return (
//       <Card className="mb-3" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//         <CardBody>
//           <CardTitle tag="h5" style={{ color: '#fff' }}>{title}</CardTitle>
//           <h2 style={{ color }}>{value} {unit}</h2>
//         </CardBody>
//       </Card>
//     );
//   }
// };

// const BetterOverviewPage = () => {
//   // Standard Plant KPI States (simulate real-time updates)
//   const [h2ProductionRate, setH2ProductionRate] = useState(10); // kg H₂/hr
//   const [plantEfficiency, setPlantEfficiency] = useState(5); // kWh/kg H₂
//   const [stackRemainingLife, setStackRemainingLife] = useState(87); // %
//   const [capacityUtilization, setCapacityUtilization] = useState(75); // %
//   const [membraneHealth, setMembraneHealth] = useState('Good');

//   // Analytics & AI KPIs for Green H₂ Electrolyzer
//   const [greenH2ForecastAccuracy, setGreenH2ForecastAccuracy] = useState(92); // %
//   const [electrolyzerAnomalyScore, setElectrolyzerAnomalyScore] = useState(3); // lower is better
//   const [predictiveMaintenanceConfidence, setPredictiveMaintenanceConfidence] = useState(98); // %
//   const [predictedMaintenanceInterval, setPredictedMaintenanceInterval] = useState(5); // hrs

//   // Simulate KPI updates every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setH2ProductionRate(prev => Math.max(8, Math.min(12, prev + (Math.random() - 0.5))) );
//       setPlantEfficiency(prev => Math.max(4, Math.min(6, prev + (Math.random() - 0.5) * 0.2)));
//       setStackRemainingLife(prev => Math.max(80, Math.min(100, prev + (Math.random() - 0.5) * 2)));
//       setCapacityUtilization(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 3)));
//       // Analytics KPIs: small fluctuations
//       setGreenH2ForecastAccuracy(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5))) );
//       setElectrolyzerAnomalyScore(prev => Math.max(0, Math.min(10, prev + (Math.random() - 0.5))))  ;
//       setPredictiveMaintenanceConfidence(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5))));
//       setPredictedMaintenanceInterval(prev => Math.max(2, Math.min(10, prev + (Math.random() - 0.5) * 0.5)))
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Dummy Chart Data for Degradation Rate (to be rendered with ApexCharts)
//   const degradationData = {
//     labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
//     datasets: [
//       {
//         label: 'Degradation Rate (%)',
//         data: [0, 0.2, 0.3, 0.35, 0.4],
//         borderColor: '#FF6384'
//       }
//     ]
//   };

//   // Dummy Chart Data for Forecast Production Trend (ApexCharts)
//   const forecastData = {
//     labels: ['Next 24H', 'Next Week', 'Next Month'],
//     datasets: [
//       {
//         label: 'Forecasted Production (kg H₂)',
//         data: [100, 700, 3000],
//         borderColor: 'rgba(75,192,192,1)'
//       }
//     ]
//   };

//   // Dummy data for Plant Events
//   const plantEvents = [
//     { time: '08:00', event: 'Start-up', description: 'Plant started successfully.' },
//     { time: '10:30', event: 'Trip', description: 'Minor stack trip detected.' },
//     { time: '12:00', event: 'Planned Maintenance', description: 'Routine system check.' },
//     { time: '15:00', event: 'Shutdown', description: 'Emergency shutdown triggered.' }
//   ];

//   // Real-Time Process Parameter Trend Simulation (10 data points)
//   const initialProcessLabels = Array.from({ length: 10 }, (_, i) => `T-${(10 - i) * 5}s`);
//   const [processLabels, setProcessLabels] = useState(initialProcessLabels);
//   const [processTempValues, setProcessTempValues] = useState(Array(10).fill(75)); // °C
//   const [processPressureValues, setProcessPressureValues] = useState(Array(10).fill(30)); // bar
//   const [processFlowValues, setProcessFlowValues] = useState(Array(10).fill(100)); // m³/hr

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newTime = new Date().toLocaleTimeString();
//       setProcessLabels(prev => [...prev.slice(1), newTime]);
//       setProcessTempValues(prev => {
//         const newVal = prev[prev.length - 1] + (Math.random() * 2 - 1);
//         return [...prev.slice(1), parseFloat(newVal.toFixed(2))];
//       });
//       setProcessPressureValues(prev => {
//         const newVal = prev[prev.length - 1] + (Math.random() * 0.5 - 0.25);
//         return [...prev.slice(1), parseFloat(newVal.toFixed(2))];
//       });
//       setProcessFlowValues(prev => {
//         const newVal = prev[prev.length - 1] + (Math.random() * 5 - 2.5);
//         return [...prev.slice(1), parseFloat(newVal.toFixed(2))];
//       });
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const processTempChartData = {
//     labels: processLabels,
//     datasets: [{
//       label: 'Process Temperature (°C)',
//       data: processTempValues,
//       borderColor: 'red'
//     }]
//   };

//   const processPressureChartData = {
//     labels: processLabels,
//     datasets: [{
//       label: 'Process Pressure (bar)',
//       data: processPressureValues,
//       borderColor: 'blue'
//     }]
//   };

//   const processFlowChartData = {
//     labels: processLabels,
//     datasets: [{
//       label: 'Process Flow Rate (m³/hr)',
//       data: processFlowValues,
//       borderColor: 'green'
//     }]
//   };

//   // Dummy data for Additional Analytics Charts (to be rendered with Highcharts)
//   const actualVsForecastData = {
//     labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6'],
//     datasets: [
//       {
//         label: 'Actual Production',
//         data: [10, 11, 9, 10, 10.5, 10],
//         borderColor: 'green'
//       },
//       {
//         label: 'Forecasted Production',
//         data: [10.2, 10.9, 9.1, 10.1, 10.6, 10.1],
//         borderColor: 'orange'
//       }
//     ]
//   };

//   const forecastErrorData = {
//     labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6'],
//     datasets: [
//       {
//         label: 'Forecast Error (%)',
//         data: [1, 0.5, 2, 1, 0.7, 1.2],
//         borderColor: 'red'
//       }
//     ]
//   };

//   // ********************
//   // Build ApexCharts Options & Series
//   // ********************

//   // Degradation Rate Chart (ApexCharts)
//   const degradationOptions = {
//     chart: {
//       id: 'degradation-chart',
//       toolbar: { show: false }
//     },
//     xaxis: {
//       categories: degradationData.labels,
//       labels: { style: { colors: '#fff' } }
//     },
//     stroke: {
//       curve: 'smooth',
//       colors: [degradationData.datasets[0].borderColor]
//     },
//     tooltip: { theme: 'dark' },
//     grid: { borderColor: '#2d2d44' },
//     theme: { mode: 'dark' }
//   };
//   const degradationSeries = [
//     {
//       name: degradationData.datasets[0].label,
//       data: degradationData.datasets[0].data
//     }
//   ];

//   // Forecast Production Trend Chart (ApexCharts)
//   const forecastOptions = {
//     chart: {
//       id: 'forecast-chart',
//       toolbar: { show: false }
//     },
//     xaxis: {
//       categories: forecastData.labels,
//       labels: { style: { colors: '#fff' } }
//     },
//     stroke: {
//       curve: 'smooth',
//       colors: [forecastData.datasets[0].borderColor]
//     },
//     tooltip: { theme: 'dark' },
//     grid: { borderColor: '#2d2d44' },
//     theme: { mode: 'dark' }
//   };
//   const forecastSeries = [
//     {
//       name: forecastData.datasets[0].label,
//       data: forecastData.datasets[0].data
//     }
//   ];

//   // Real-Time Process Parameter Charts (ApexCharts)
//   const processTempOptions = {
//     chart: { id: 'temp-chart', toolbar: { show: false } },
//     xaxis: {
//       categories: processTempChartData.labels,
//       labels: { style: { colors: '#fff' } }
//     },
//     stroke: { curve: 'smooth', colors: [processTempChartData.datasets[0].borderColor] },
//     tooltip: { theme: 'dark' },
//     grid: { borderColor: '#2d2d44' },
//     theme: { mode: 'dark' }
//   };
//   const processTempSeries = [
//     {
//       name: processTempChartData.datasets[0].label,
//       data: processTempChartData.datasets[0].data
//     }
//   ];

//   const processPressureOptions = {
//     chart: { id: 'pressure-chart', toolbar: { show: false } },
//     xaxis: {
//       categories: processPressureChartData.labels,
//       labels: { style: { colors: '#fff' } }
//     },
//     stroke: { curve: 'smooth', colors: [processPressureChartData.datasets[0].borderColor] },
//     tooltip: { theme: 'dark' },
//     grid: { borderColor: '#2d2d44' },
//     theme: { mode: 'dark' }
//   };
//   const processPressureSeries = [
//     {
//       name: processPressureChartData.datasets[0].label,
//       data: processPressureChartData.datasets[0].data
//     }
//   ];

//   const processFlowOptions = {
//     chart: { id: 'flow-chart', toolbar: { show: false } },
//     xaxis: {
//       categories: processFlowChartData.labels,
//       labels: { style: { colors: '#fff' } }
//     },
//     stroke: { curve: 'smooth', colors: [processFlowChartData.datasets[0].borderColor] },
//     tooltip: { theme: 'dark' },
//     grid: { borderColor: '#2d2d44' },
//     theme: { mode: 'dark' }
//   };
//   const processFlowSeries = [
//     {
//       name: processFlowChartData.datasets[0].label,
//       data: processFlowChartData.datasets[0].data
//     }
//   ];

//   // ********************
//   // Build Highcharts Options (for multi–dataset charts)
//   // ********************

//   const actualVsForecastOptions = {
//     chart: {
//       type: 'line',
//       backgroundColor: '#2d2d44'
//     },
//     title: { text: null },
//     xAxis: {
//       categories: actualVsForecastData.labels,
//       labels: { style: { color: '#fff' } }
//     },
//     yAxis: {
//       title: { text: null },
//       labels: { style: { color: '#fff' } }
//     },
//     series: actualVsForecastData.datasets.map(ds => ({
//       name: ds.label,
//       data: ds.data,
//       color: ds.borderColor
//     })),
//     legend: { itemStyle: { color: '#fff' } },
//     tooltip: { theme: 'dark' }
//   };

//   const forecastErrorOptions = {
//     chart: {
//       type: 'line',
//       backgroundColor: '#2d2d44'
//     },
//     title: { text: null },
//     xAxis: {
//       categories: forecastErrorData.labels,
//       labels: { style: { color: '#fff' } }
//     },
//     yAxis: {
//       title: { text: null },
//       labels: { style: { color: '#fff' } }
//     },
//     series: forecastErrorData.datasets.map(ds => ({
//       name: ds.label,
//       data: ds.data,
//       color: ds.borderColor
//     })),
//     legend: { itemStyle: { color: '#fff' } },
//     tooltip: { theme: 'dark' }
//   };

//   return (
//     <Container fluid style={darkTheme}>
//       <h2 style={{ color: '#fff', marginBottom: '20px' }}>Electrolyzer Plant Overview</h2>
      
//       {/* Standard Plant KPIs */}
//       <Row className="mb-4">
//         <Col md={2}>
//           <KPICard
//             title="H₂ Production"
//             value={h2ProductionRate.toFixed(1)}
//             unit="kg/hr"
//             color="#28a745"
//           />
//         </Col>
//         <Col md={2}>
//           <KPICard
//             title="Plant Efficiency"
//             value={plantEfficiency.toFixed(2)}
//             unit="kWh/kg"
//             color="#17a2b8"
//           />
//         </Col>
//         <Col md={2}>
//           <KPICard
//             title="Stack Life"
//             gaugeValue={stackRemainingLife}
//             value={stackRemainingLife}
//             unit="%"
//             color="#6c757d"
//           />
//         </Col>
//         <Col md={2}>
//           <KPICard
//             title="Capacity Utilization"
//             gaugeValue={capacityUtilization}
//             value={capacityUtilization}
//             unit="%"
//             color="#007bff"
//           />
//         </Col>
//         <Col md={2}>
//           <KPICard
//             title="Forecast Prod."
//             value={forecastData.datasets[0].data[0]}
//             unit="kg (24H)"
//             color="#ffc107"
//           />
//         </Col>
//         <Col md={2}>
//           <Card className="mb-3" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Membrane Health</CardTitle>
//               <Badge color={membraneHealth === 'Good' ? 'success' : 'warning'}>
//                 {membraneHealth}
//               </Badge>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* Overview Charts (ApexCharts) */}
//       <Row className="mb-4">
//         <Col md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Degradation Rate</CardTitle>
//               <Chart options={degradationOptions} series={degradationSeries} type="line" height="350" />
//             </CardBody>
//           </Card>
//         </Col>
//         <Col md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Forecast Production Trend</CardTitle>
//               <Chart options={forecastOptions} series={forecastSeries} type="line" height="350" />
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* Plant Events */}
//       <Row className="mb-4">
//         <Col>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Plant Events</CardTitle>
//               <Table hover responsive dark>
//                 <thead>
//                   <tr>
//                     <th>Time</th>
//                     <th>Event</th>
//                     <th>Description</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {plantEvents.map((event, idx) => (
//                     <tr key={idx}>
//                       <td>{event.time}</td>
//                       <td>{event.event}</td>
//                       <td>{event.description}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* Real-Time Process Parameter Trend (ApexCharts) */}
//       <Row className="mb-4">
//         <Col>
//           <h4 style={{ color: '#fff' }}>Real-Time Process Parameter Trend</h4>
//         </Col>
//       </Row>
//       <Row className="mb-4">
//         <Col md={4}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Temperature (°C)</CardTitle>
//               <Chart options={processTempOptions} series={processTempSeries} type="line" height="350" />
//             </CardBody>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Pressure (bar)</CardTitle>
//               <Chart options={processPressureOptions} series={processPressureSeries} type="line" height="350" />
//             </CardBody>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Flow Rate (m³/hr)</CardTitle>
//               <Chart options={processFlowOptions} series={processFlowSeries} type="line" height="350" />
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* Additional Analytics Charts (Highcharts) */}
//       <Row className="mb-4">
//         <Col>
//           <h4 style={{ color: '#fff' }}>Analytics & AI Predictions</h4>
//           <p style={{ color: '#ccc', fontStyle: 'italic' }}>
//             Insights specific to the Green H₂ Electrolyzer: Forecast accuracy of production, detection of operational anomalies, predictive maintenance confidence, and predicted time until next maintenance are essential for optimizing performance and reducing downtime.
//           </p>
//         </Col>
//       </Row>
//       <Row className="mb-4">
//         <Col md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Actual vs Forecasted Production</CardTitle>
//               <HighchartsReact highcharts={Highcharts} options={actualVsForecastOptions} />
//             </CardBody>
//           </Card>
//         </Col>
//         <Col md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Forecast Error Trend</CardTitle>
//               <HighchartsReact highcharts={Highcharts} options={forecastErrorOptions} />
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
      
//       {/* KPI Cards for Analytics & AI Predictions */}
//       <Row className="mb-4">
//         <Col md={3}>
//           <KPICard
//             title="Green H₂ Forecast Accuracy"
//             value={greenH2ForecastAccuracy.toFixed(0)}
//             unit="%"
//             color="#00c853"
//           />
//         </Col>
//         <Col md={3}>
//           <KPICard
//             title="Electrolyzer Anomaly Score"
//             value={electrolyzerAnomalyScore.toFixed(0)}
//             unit="Score"
//             color="#d32f2f"
//           />
//         </Col>
//         <Col md={3}>
//           <KPICard
//             title="Predictive Maint. Confidence"
//             value={predictiveMaintenanceConfidence.toFixed(0)}
//             unit="%"
//             color="#3949ab"
//           />
//         </Col>
//         <Col md={3}>
//           <KPICard
//             title="Predicted Time to Next Maint."
//             value={predictedMaintenanceInterval.toFixed(1)}
//             unit="hrs"
//             color="#ff6f00"
//           />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default BetterOverviewPage;
