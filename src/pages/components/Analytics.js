import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import classnames from 'classnames';

// Import ApexCharts component
import Chart from 'react-apexcharts';

// Import Highcharts and the Highcharts React wrapper
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Dark theme styling
const darkTheme = {
  backgroundColor: '#1e1e2f',
  color: '#ffffff',
  minHeight: '100vh',
  padding: '20px'
};

// Dummy list of purchased applications (from App Store)
const purchasedApps = [
  'Green H2 Production Optimizer',
  'Electrolyzer Performance Analyzer',
  'Predictive Maintenance Pro',
  'Energy Consumption Tracker',
  'Forecasting Suite'
];

// Helper function to convert data to CSV and return a URL
const convertToCSV = (data) => {
  if (!data.length) return '';
  const keys = Object.keys(data[0]);
  const csvRows = [];
  csvRows.push(keys.join(','));
  data.forEach(row => {
    const values = keys.map(key => `"${row[key]}"`);
    csvRows.push(values.join(','));
  });
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  return window.URL.createObjectURL(blob);
};

const CustomAnalyticsPage = () => {
  // Purchased Application selection state
  const [selectedApp, setSelectedApp] = useState(purchasedApps[0]);

  // Tab control: "standard" and "custom"
  const [activeTab, setActiveTab] = useState('standard');
  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // ===== STANDARD ANALYTICS STATES =====
  const [standardReportType, setStandardReportType] = useState('Production Trend');
  const [standardStartDate, setStandardStartDate] = useState('');
  const [standardEndDate, setStandardEndDate] = useState('');
  const [standardReportData, setStandardReportData] = useState([]);
  const [standardCsvUrl, setStandardCsvUrl] = useState('');
  // We'll store the “chartData” in our own format (labels + datasets) and then convert to ApexCharts config.
  const [standardChartData, setStandardChartData] = useState(null);

  const generateStandardReport = () => {
    let data = [];
    let chartData = null;
    switch (standardReportType) {
      case 'Production Trend':
        data = [
          { Date: '2025-01-01', 'H₂ Production (kg)': 100 },
          { Date: '2025-01-02', 'H₂ Production (kg)': 110 },
          { Date: '2025-01-03', 'H₂ Production (kg)': 105 }
        ];
        chartData = {
          labels: data.map(row => row.Date),
          datasets: [{
            label: 'H₂ Production (kg)',
            data: data.map(row => row['H₂ Production (kg)']),
            borderColor: '#28a745'
          }]
        };
        break;
      case 'Maintenance Analytics':
        data = [
          { Date: '2025-01-01', Event: 'Planned Maintenance', Details: 'Routine check' },
          { Date: '2025-01-05', Event: 'Unplanned Trip', Details: 'Stack anomaly detected' }
        ];
        break;
      case 'Energy Consumption Analytics':
        data = [
          { Date: '2025-01-01', 'Energy (kWh)': 500 },
          { Date: '2025-01-02', 'Energy (kWh)': 520 },
          { Date: '2025-01-03', 'Energy (kWh)': 510 }
        ];
        chartData = {
          labels: data.map(row => row.Date),
          datasets: [{
            label: 'Energy Consumption (kWh)',
            data: data.map(row => row['Energy (kWh)']),
            borderColor: '#ffc107'
          }]
        };
        break;
      case 'Forecasting Analytics':
        data = [
          { Date: '2025-01-04', 'Forecasted H₂ (kg)': 115 },
          { Date: '2025-01-05', 'Forecasted H₂ (kg)': 120 }
        ];
        chartData = {
          labels: data.map(row => row.Date),
          datasets: [{
            label: 'Forecasted H₂ Production (kg)',
            data: data.map(row => row['Forecasted H₂ (kg)']),
            borderColor: '#17a2b8'
          }]
        };
        break;
      default:
        data = [];
    }
    setStandardReportData(data);
    setStandardCsvUrl(convertToCSV(data));
    setStandardChartData(chartData);
  };

  // ===== CUSTOM ANALYTICS STATES =====
  const [customMetric, setCustomMetric] = useState('Custom Production');
  const [customFilter, setCustomFilter] = useState('');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [customReportData, setCustomReportData] = useState([]);
  const [customCsvUrl, setCustomCsvUrl] = useState('');
  // For custom chart we will build a similar data structure.
  const [customChartData, setCustomChartData] = useState(null);

  const runCustomAnalytics = () => {
    let data = [];
    let chartData = null;
    switch (customMetric) {
      case 'Custom Production':
        data = [
          { Date: '2025-01-01', 'Custom Production (kg)': 102 },
          { Date: '2025-01-02', 'Custom Production (kg)': 108 },
          { Date: '2025-01-03', 'Custom Production (kg)': 105 }
        ];
        chartData = {
          labels: data.map(row => row.Date),
          datasets: [{
            label: 'Custom Production (kg)',
            data: data.map(row => row['Custom Production (kg)']),
            borderColor: '#00c853'
          }]
        };
        break;
      case 'Custom Efficiency':
        data = [
          { Date: '2025-01-01', 'Custom Efficiency (kWh/kg)': 5.1 },
          { Date: '2025-01-02', 'Custom Efficiency (kWh/kg)': 5.0 },
          { Date: '2025-01-03', 'Custom Efficiency (kWh/kg)': 5.2 }
        ];
        chartData = {
          labels: data.map(row => row.Date),
          datasets: [{
            label: 'Custom Efficiency (kWh/kg)',
            data: data.map(row => row['Custom Efficiency (kWh/kg)']),
            borderColor: '#3949ab'
          }]
        };
        break;
      case 'Custom Downtime':
        data = [
          { Date: '2025-01-01', 'Downtime (hrs)': 0.5 },
          { Date: '2025-01-02', 'Downtime (hrs)': 0.7 },
          { Date: '2025-01-03', 'Downtime (hrs)': 0.6 }
        ];
        chartData = {
          labels: data.map(row => row.Date),
          datasets: [{
            label: 'Downtime (hrs)',
            data: data.map(row => row['Downtime (hrs)']),
            borderColor: '#ff6f00'
          }]
        };
        break;
      case 'Custom Anomaly Count':
        data = [
          { Date: '2025-01-01', 'Anomalies': 3 },
          { Date: '2025-01-02', 'Anomalies': 1 },
          { Date: '2025-01-03', 'Anomalies': 4 }
        ];
        chartData = {
          labels: data.map(row => row.Date),
          datasets: [{
            label: 'Anomaly Count',
            data: data.map(row => row['Anomalies']),
            borderColor: '#d32f2f'
          }]
        };
        break;
      default:
        data = [];
    }
    setCustomReportData(data);
    setCustomCsvUrl(convertToCSV(data));
    setCustomChartData(chartData);
  };

  // ===== ADVANCED ANALYTICS DUMMY DATA =====
  const actualVsForecastData = {
    labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6'],
    datasets: [
      {
        label: 'Actual Production (kg)',
        data: [10, 11, 9, 10, 10.5, 10],
        borderColor: '#28a745'
      },
      {
        label: 'Forecasted Production (kg)',
        data: [10.2, 10.9, 9.1, 10.1, 10.6, 10.1],
        borderColor: '#ff9800'
      },
    ],
  };

  const forecastErrorData = {
    labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6'],
    datasets: [
      {
        label: 'Forecast Error (%)',
        data: [1, 0.5, 2, 1, 0.7, 1.2],
        borderColor: '#d32f2f'
      },
    ],
  };

  // For the anomaly distribution, note that we have a single dataset with an array of colors.
  const anomalyDistributionData = {
    labels: ['Normal', 'Warning', 'Critical'],
    datasets: [
      {
        label: 'Frequency',
        data: [80, 15, 5],
        borderColor: ['#28a745', '#ffc107', '#d32f2f']
      },
    ],
  };

  // --- Convert our internal "chartData" structure to an ApexCharts config ---
  const getApexConfig = (chartData, type = 'line') => {
    if (!chartData) return { series: [], options: {} };
    const series = chartData.datasets.map(ds => ({
      name: ds.label,
      data: ds.data
    }));
    const options = {
      chart: {
        type: type,
        background: 'transparent',
        toolbar: { show: false }
      },
      xaxis: {
        categories: chartData.labels,
        labels: { style: { colors: '#fff' } }
      },
      stroke: {
        curve: 'straight'
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        labels: {
          colors: '#fff'
        }
      }
    };

    // If it's a bar chart and the dataset includes an array of colors, enable distributed bars.
    if (type === 'bar') {
      options.plotOptions = {
        bar: {
          distributed:
            Array.isArray(chartData.datasets[0].borderColor) &&
            chartData.datasets[0].borderColor.length > 1
        }
      };
      // In distributed mode, ApexCharts ignores the series colors.
      // So we can assign colors directly from the dataset.
      if (options.plotOptions.bar.distributed) {
        options.colors = chartData.datasets[0].borderColor;
      } else {
        options.colors = chartData.datasets.map(ds => ds.borderColor);
      }
    } else {
      options.colors = chartData.datasets.map(ds => ds.borderColor);
    }

    return { series, options };
  };

  // --- Create Highcharts config for the custom analytics chart ---
  const getHighchartsConfig = (chartData) => {
    if (!chartData) return {};
    return {
      chart: {
        type: 'column',
        backgroundColor: 'transparent'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: chartData.labels,
        labels: { style: { color: '#fff' } }
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: { style: { color: '#fff' } }
      },
      legend: {
        itemStyle: {
          color: '#fff'
        }
      },
      series: chartData.datasets.map(ds => ({
        name: ds.label,
        data: ds.data,
        color: ds.borderColor
      })),
      credits: { enabled: false }
    };
  };

  // Prepare ApexCharts config for Standard Analytics (line chart)
  const standardApex = getApexConfig(standardChartData, 'line');

  // Prepare Highcharts config for Custom Analytics (column/bar chart)
  const customHighchartsOptions = getHighchartsConfig(customChartData);

  // Prepare ApexCharts config for Advanced Analytics charts:
  const actualVsForecastApex = getApexConfig(actualVsForecastData, 'line');
  const forecastErrorApex = getApexConfig(forecastErrorData, 'line');
  const anomalyDistributionApex = getApexConfig(anomalyDistributionData, 'bar');

  return (
    <Container fluid style={darkTheme}>
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>
        Custom Analytics - Green H₂ Electrolyzer
      </h2>
      
      {/* Purchased Application Selection */}
      <Card className="mb-4" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
        <CardBody>
          <CardTitle tag="h5" style={{ color: '#fff' }}>
            Select Purchased Application
          </CardTitle>
          <FormGroup>
            <Label for="purchasedApp" style={{ color: '#fff' }}>Application</Label>
            <Input
              type="select"
              id="purchasedApp"
              value={selectedApp}
              onChange={e => setSelectedApp(e.target.value)}
            >
              {purchasedApps.map((app, idx) => (
                <option key={idx} value={app}>{app}</option>
              ))}
            </Input>
          </FormGroup>
        </CardBody>
      </Card>
      
      {/* Tab Navigation for Standard vs Custom Analytics */}
      <Nav tabs className="mb-3">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'standard' })}
            onClick={() => { toggleTab('standard'); }}
            style={{ cursor: 'pointer', color: '#fff' }}
          >
            Standard Analytics
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === 'custom' })}
            onClick={() => { toggleTab('custom'); }}
            style={{ cursor: 'pointer', color: '#fff' }}
          >
            Custom Analytics
          </NavLink>
        </NavItem>
      </Nav>
      
      <TabContent activeTab={activeTab}>
        {/* Standard Analytics Tab */}
        <TabPane tabId="standard">
          <Card className="mb-4" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
            <CardBody>
              <CardTitle tag="h5" style={{ color: '#fff' }}>
                Standard Analytics
              </CardTitle>
              <Form>
                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="standardReportType" style={{ color: '#fff' }}>Report Type</Label>
                      <Input
                        type="select"
                        id="standardReportType"
                        value={standardReportType}
                        onChange={e => setStandardReportType(e.target.value)}
                      >
                        <option>Production Trend</option>
                        <option>Maintenance Analytics</option>
                        <option>Energy Consumption Analytics</option>
                        <option>Forecasting Analytics</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="standardStartDate" style={{ color: '#fff' }}>Start Date</Label>
                      <Input
                        type="date"
                        id="standardStartDate"
                        value={standardStartDate}
                        onChange={e => setStandardStartDate(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="standardEndDate" style={{ color: '#fff' }}>End Date</Label>
                      <Input
                        type="date"
                        id="standardEndDate"
                        value={standardEndDate}
                        onChange={e => setStandardEndDate(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3} className="d-flex align-items-end">
                    <Button color="primary" onClick={generateStandardReport}>
                      Generate Standard Report
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
          
          {standardReportData.length > 0 && (
            <Card className="mb-4" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
              <CardBody>
                <CardTitle tag="h5" style={{ color: '#fff' }}>Standard Report Preview</CardTitle>
                {standardChartData && (
                  <Row className="mb-3">
                    <Col md={12}>
                      {/* Render the standard analytics chart using ApexCharts */}
                      <Chart
                        options={standardApex.options}
                        series={standardApex.series}
                        type="line"
                        height={350}
                      />
                    </Col>
                  </Row>
                )}
                <Table responsive dark>
                  <thead>
                    <tr>
                      {Object.keys(standardReportData[0]).map((key, idx) => (
                        <th key={idx}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {standardReportData.map((row, idx) => (
                      <tr key={idx}>
                        {Object.keys(row).map((key, jdx) => (
                          <td key={jdx}>{row[key]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button color="success" href={standardCsvUrl} download={`standard_report_${standardReportType.replace(/\s+/g, '_')}.csv`}>
                  Download CSV
                </Button>
              </CardBody>
            </Card>
          )}
        </TabPane>
        
        {/* Custom Analytics Tab */}
        <TabPane tabId="custom">
          <Card className="mb-4" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
            <CardBody>
              <CardTitle tag="h5" style={{ color: '#fff' }}>
                Custom Analytics
              </CardTitle>
              <Form>
                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="customMetric" style={{ color: '#fff' }}>Custom Metric</Label>
                      <Input
                        type="select"
                        id="customMetric"
                        value={customMetric}
                        onChange={e => setCustomMetric(e.target.value)}
                      >
                        <option>Custom Production</option>
                        <option>Custom Efficiency</option>
                        <option>Custom Downtime</option>
                        <option>Custom Anomaly Count</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="customFilter" style={{ color: '#fff' }}>Filter (optional)</Label>
                      <Input
                        type="text"
                        id="customFilter"
                        placeholder="e.g., threshold > 100"
                        value={customFilter}
                        onChange={e => setCustomFilter(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="customStartDate" style={{ color: '#fff' }}>Start Date</Label>
                      <Input
                        type="date"
                        id="customStartDate"
                        value={customStartDate}
                        onChange={e => setCustomStartDate(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="customEndDate" style={{ color: '#fff' }}>End Date</Label>
                      <Input
                        type="date"
                        id="customEndDate"
                        value={customEndDate}
                        onChange={e => setCustomEndDate(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={3} className="d-flex align-items-end">
                    <Button color="primary" onClick={runCustomAnalytics}>
                      Run Custom Analytics
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
          
          {customReportData.length > 0 && (
            <Card className="mb-4" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
              <CardBody>
                <CardTitle tag="h5" style={{ color: '#fff' }}>Custom Report Preview</CardTitle>
                {customChartData && (
                  <Row className="mb-3">
                    <Col md={12}>
                      {/* Render the custom analytics chart using Highcharts */}
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={customHighchartsOptions}
                      />
                    </Col>
                  </Row>
                )}
                <Table responsive dark>
                  <thead>
                    <tr>
                      {Object.keys(customReportData[0]).map((key, idx) => (
                        <th key={idx}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {customReportData.map((row, idx) => (
                      <tr key={idx}>
                        {Object.keys(row).map((key, jdx) => (
                          <td key={jdx}>{row[key]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button color="success" href={customCsvUrl} download={`custom_report_${customMetric.replace(/\s+/g, '_')}.csv`}>
                  Download CSV
                </Button>
              </CardBody>
            </Card>
          )}
        </TabPane>
      </TabContent>
      
      {/* Advanced Analytics Charts Section */}
      <Row className="mb-4">
        <Col>
          <h4 style={{ color: '#fff' }}>Advanced Analytics Charts</h4>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
            <CardBody>
              <CardTitle tag="h5" style={{ color: '#fff' }}>Actual vs Forecasted Production</CardTitle>
              <Chart
                options={actualVsForecastApex.options}
                series={actualVsForecastApex.series}
                type="line"
                height={350}
              />
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
            <CardBody>
              <CardTitle tag="h5" style={{ color: '#fff' }}>Forecast Error Trend</CardTitle>
              <Chart
                options={forecastErrorApex.options}
                series={forecastErrorApex.series}
                type="line"
                height={350}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
            <CardBody>
              <CardTitle tag="h5" style={{ color: '#fff' }}>Anomaly Score Distribution</CardTitle>
              <Chart
                options={anomalyDistributionApex.options}
                series={anomalyDistributionApex.series}
                type="bar"
                height={350}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>    
    </Container>
  );
};

export default CustomAnalyticsPage;



// import React, { useState } from 'react';
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   CardTitle,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Button,
//   Table,
//   Nav,
//   NavItem,
//   NavLink,
//   TabContent,
//   TabPane
// } from 'reactstrap';
// import classnames from 'classnames';

// // Import ApexCharts component
// import Chart from 'react-apexcharts';

// // Import Highcharts and the Highcharts React wrapper
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

// // Dark theme styling
// const darkTheme = {
//   backgroundColor: '#1e1e2f',
//   color: '#ffffff',
//   minHeight: '100vh',
//   padding: '20px'
// };

// // Dummy list of purchased applications (from App Store)
// const purchasedApps = [
//   'Green H2 Production Optimizer',
//   'Electrolyzer Performance Analyzer',
//   'Predictive Maintenance Pro',
//   'Energy Consumption Tracker',
//   'Forecasting Suite'
// ];

// // Helper function to convert data to CSV and return a URL
// const convertToCSV = (data) => {
//   if (!data.length) return '';
//   const keys = Object.keys(data[0]);
//   const csvRows = [];
//   csvRows.push(keys.join(','));
//   data.forEach(row => {
//     const values = keys.map(key => `"${row[key]}"`);
//     csvRows.push(values.join(','));
//   });
//   const csvString = csvRows.join('\n');
//   const blob = new Blob([csvString], { type: 'text/csv' });
//   return window.URL.createObjectURL(blob);
// };

// const CustomAnalyticsPage = () => {
//   // Purchased Application selection state
//   const [selectedApp, setSelectedApp] = useState(purchasedApps[0]);

//   // Tab control: "standard" and "custom"
//   const [activeTab, setActiveTab] = useState('standard');
//   const toggleTab = tab => {
//     if (activeTab !== tab) setActiveTab(tab);
//   };

//   // ===== STANDARD ANALYTICS STATES =====
//   const [standardReportType, setStandardReportType] = useState('Production Trend');
//   const [standardStartDate, setStandardStartDate] = useState('');
//   const [standardEndDate, setStandardEndDate] = useState('');
//   const [standardReportData, setStandardReportData] = useState([]);
//   const [standardCsvUrl, setStandardCsvUrl] = useState('');
//   // We'll store the “chartData” in our own format (labels + datasets) and then convert to ApexCharts config.
//   const [standardChartData, setStandardChartData] = useState(null);

//   const generateStandardReport = () => {
//     let data = [];
//     let chartData = null;
//     switch (standardReportType) {
//       case 'Production Trend':
//         data = [
//           { Date: '2025-01-01', 'H₂ Production (kg)': 100 },
//           { Date: '2025-01-02', 'H₂ Production (kg)': 110 },
//           { Date: '2025-01-03', 'H₂ Production (kg)': 105 }
//         ];
//         chartData = {
//           labels: data.map(row => row.Date),
//           datasets: [{
//             label: 'H₂ Production (kg)',
//             data: data.map(row => row['H₂ Production (kg)']),
//             borderColor: '#28a745'
//           }]
//         };
//         break;
//       case 'Maintenance Analytics':
//         data = [
//           { Date: '2025-01-01', Event: 'Planned Maintenance', Details: 'Routine check' },
//           { Date: '2025-01-05', Event: 'Unplanned Trip', Details: 'Stack anomaly detected' }
//         ];
//         break;
//       case 'Energy Consumption Analytics':
//         data = [
//           { Date: '2025-01-01', 'Energy (kWh)': 500 },
//           { Date: '2025-01-02', 'Energy (kWh)': 520 },
//           { Date: '2025-01-03', 'Energy (kWh)': 510 }
//         ];
//         chartData = {
//           labels: data.map(row => row.Date),
//           datasets: [{
//             label: 'Energy Consumption (kWh)',
//             data: data.map(row => row['Energy (kWh)']),
//             borderColor: '#ffc107'
//           }]
//         };
//         break;
//       case 'Forecasting Analytics':
//         data = [
//           { Date: '2025-01-04', 'Forecasted H₂ (kg)': 115 },
//           { Date: '2025-01-05', 'Forecasted H₂ (kg)': 120 }
//         ];
//         chartData = {
//           labels: data.map(row => row.Date),
//           datasets: [{
//             label: 'Forecasted H₂ Production (kg)',
//             data: data.map(row => row['Forecasted H₂ (kg)']),
//             borderColor: '#17a2b8'
//           }]
//         };
//         break;
//       default:
//         data = [];
//     }
//     setStandardReportData(data);
//     setStandardCsvUrl(convertToCSV(data));
//     setStandardChartData(chartData);
//   };

//   // ===== CUSTOM ANALYTICS STATES =====
//   const [customMetric, setCustomMetric] = useState('Custom Production');
//   const [customFilter, setCustomFilter] = useState('');
//   const [customStartDate, setCustomStartDate] = useState('');
//   const [customEndDate, setCustomEndDate] = useState('');
//   const [customReportData, setCustomReportData] = useState([]);
//   const [customCsvUrl, setCustomCsvUrl] = useState('');
//   // For custom chart we will build a similar data structure.
//   const [customChartData, setCustomChartData] = useState(null);

//   const runCustomAnalytics = () => {
//     let data = [];
//     let chartData = null;
//     switch (customMetric) {
//       case 'Custom Production':
//         data = [
//           { Date: '2025-01-01', 'Custom Production (kg)': 102 },
//           { Date: '2025-01-02', 'Custom Production (kg)': 108 },
//           { Date: '2025-01-03', 'Custom Production (kg)': 105 }
//         ];
//         chartData = {
//           labels: data.map(row => row.Date),
//           datasets: [{
//             label: 'Custom Production (kg)',
//             data: data.map(row => row['Custom Production (kg)']),
//             borderColor: '#00c853'
//           }]
//         };
//         break;
//       case 'Custom Efficiency':
//         data = [
//           { Date: '2025-01-01', 'Custom Efficiency (kWh/kg)': 5.1 },
//           { Date: '2025-01-02', 'Custom Efficiency (kWh/kg)': 5.0 },
//           { Date: '2025-01-03', 'Custom Efficiency (kWh/kg)': 5.2 }
//         ];
//         chartData = {
//           labels: data.map(row => row.Date),
//           datasets: [{
//             label: 'Custom Efficiency (kWh/kg)',
//             data: data.map(row => row['Custom Efficiency (kWh/kg)']),
//             borderColor: '#3949ab'
//           }]
//         };
//         break;
//       case 'Custom Downtime':
//         data = [
//           { Date: '2025-01-01', 'Downtime (hrs)': 0.5 },
//           { Date: '2025-01-02', 'Downtime (hrs)': 0.7 },
//           { Date: '2025-01-03', 'Downtime (hrs)': 0.6 }
//         ];
//         chartData = {
//           labels: data.map(row => row.Date),
//           datasets: [{
//             label: 'Downtime (hrs)',
//             data: data.map(row => row['Downtime (hrs)']),
//             borderColor: '#ff6f00'
//           }]
//         };
//         break;
//       case 'Custom Anomaly Count':
//         data = [
//           { Date: '2025-01-01', 'Anomalies': 3 },
//           { Date: '2025-01-02', 'Anomalies': 1 },
//           { Date: '2025-01-03', 'Anomalies': 4 }
//         ];
//         chartData = {
//           labels: data.map(row => row.Date),
//           datasets: [{
//             label: 'Anomaly Count',
//             data: data.map(row => row['Anomalies']),
//             borderColor: '#d32f2f'
//           }]
//         };
//         break;
//       default:
//         data = [];
//     }
//     setCustomReportData(data);
//     setCustomCsvUrl(convertToCSV(data));
//     setCustomChartData(chartData);
//   };

//   // ===== ADVANCED ANALYTICS DUMMY DATA =====
//   const actualVsForecastData = {
//     labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6'],
//     datasets: [
//       {
//         label: 'Actual Production (kg)',
//         data: [10, 11, 9, 10, 10.5, 10],
//         borderColor: '#28a745'
//       },
//       {
//         label: 'Forecasted Production (kg)',
//         data: [10.2, 10.9, 9.1, 10.1, 10.6, 10.1],
//         borderColor: '#ff9800'
//       },
//     ],
//   };

//   const forecastErrorData = {
//     labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6'],
//     datasets: [
//       {
//         label: 'Forecast Error (%)',
//         data: [1, 0.5, 2, 1, 0.7, 1.2],
//         borderColor: '#d32f2f'
//       },
//     ],
//   };

//   const anomalyDistributionData = {
//     labels: ['Normal', 'Warning', 'Critical'],
//     datasets: [
//       {
//         label: 'Frequency',
//         data: [80, 15, 5],
//         // Apex uses color arrays for bar charts.
//         borderColor: ['#28a745', '#ffc107', '#d32f2f'],
//         // Use fillColor (or colors) as needed.
//       },
//     ],
//   };

//   // --- Convert our internal "chartData" structure to an ApexCharts config ---
//   const getApexConfig = (chartData, type = 'line') => {
//     if (!chartData) return { series: [], options: {} };
//     const series = chartData.datasets.map(ds => ({
//       name: ds.label,
//       data: ds.data
//     }));
//     const options = {
//       chart: {
//         type: type,
//         background: 'transparent',
//         toolbar: { show: false }
//       },
//       xaxis: {
//         categories: chartData.labels,
//         labels: { style: { colors: '#fff' } }
//       },
//       stroke: {
//         curve: 'straight'
//       },
//       dataLabels: {
//         enabled: false
//       },
//       colors: chartData.datasets.map(ds => ds.borderColor),
//       legend: {
//         labels: {
//           colors: '#fff'
//         }
//       }
//     };
//     return { series, options };
//   };

//   // --- Create Highcharts config for the custom analytics chart ---
//   const getHighchartsConfig = (chartData) => {
//     if (!chartData) return {};
//     return {
//       chart: {
//         type: 'column',
//         backgroundColor: 'transparent'
//       },
//       title: {
//         text: ''
//       },
//       xAxis: {
//         categories: chartData.labels,
//         labels: { style: { color: '#fff' } }
//       },
//       yAxis: {
//         title: {
//           text: ''
//         },
//         labels: { style: { color: '#fff' } }
//       },
//       legend: {
//         itemStyle: {
//           color: '#fff'
//         }
//       },
//       series: chartData.datasets.map(ds => ({
//         name: ds.label,
//         data: ds.data,
//         color: ds.borderColor
//       })),
//       credits: { enabled: false }
//     };
//   };

//   // Prepare ApexCharts config for Standard Analytics (line chart)
//   const standardApex = getApexConfig(standardChartData, 'line');

//   // Prepare Highcharts config for Custom Analytics (column/bar chart)
//   const customHighchartsOptions = getHighchartsConfig(customChartData);

//   // Prepare ApexCharts config for Advanced Analytics charts:
//   const actualVsForecastApex = getApexConfig(actualVsForecastData, 'line');
//   const forecastErrorApex = getApexConfig(forecastErrorData, 'line');
//   const anomalyDistributionApex = getApexConfig(anomalyDistributionData, 'bar');

//   return (
//     <Container fluid style={darkTheme}>
//       <h2 style={{ color: '#fff', marginBottom: '20px' }}>
//         Custom Analytics - Green H₂ Electrolyzer
//       </h2>
      
//       {/* Purchased Application Selection */}
//       <Card className="mb-4" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//         <CardBody>
//           <CardTitle tag="h5" style={{ color: '#fff' }}>
//             Select Purchased Application
//           </CardTitle>
//           <FormGroup>
//             <Label for="purchasedApp" style={{ color: '#fff' }}>Application</Label>
//             <Input
//               type="select"
//               id="purchasedApp"
//               value={selectedApp}
//               onChange={e => setSelectedApp(e.target.value)}
//             >
//               {purchasedApps.map((app, idx) => (
//                 <option key={idx} value={app}>{app}</option>
//               ))}
//             </Input>
//           </FormGroup>
//         </CardBody>
//       </Card>
      
//       {/* Tab Navigation for Standard vs Custom Analytics */}
//       <Nav tabs className="mb-3">
//         <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === 'standard' })}
//             onClick={() => { toggleTab('standard'); }}
//             style={{ cursor: 'pointer', color: '#fff' }}
//           >
//             Standard Analytics
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink
//             className={classnames({ active: activeTab === 'custom' })}
//             onClick={() => { toggleTab('custom'); }}
//             style={{ cursor: 'pointer', color: '#fff' }}
//           >
//             Custom Analytics
//           </NavLink>
//         </NavItem>
//       </Nav>
      
//       <TabContent activeTab={activeTab}>
//         {/* Standard Analytics Tab */}
//         <TabPane tabId="standard">
//           <Card className="mb-4" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>
//                 Standard Analytics
//               </CardTitle>
//               <Form>
//                 <Row form>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label for="standardReportType" style={{ color: '#fff' }}>Report Type</Label>
//                       <Input
//                         type="select"
//                         id="standardReportType"
//                         value={standardReportType}
//                         onChange={e => setStandardReportType(e.target.value)}
//                       >
//                         <option>Production Trend</option>
//                         <option>Maintenance Analytics</option>
//                         <option>Energy Consumption Analytics</option>
//                         <option>Forecasting Analytics</option>
//                       </Input>
//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label for="standardStartDate" style={{ color: '#fff' }}>Start Date</Label>
//                       <Input
//                         type="date"
//                         id="standardStartDate"
//                         value={standardStartDate}
//                         onChange={e => setStandardStartDate(e.target.value)}
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label for="standardEndDate" style={{ color: '#fff' }}>End Date</Label>
//                       <Input
//                         type="date"
//                         id="standardEndDate"
//                         value={standardEndDate}
//                         onChange={e => setStandardEndDate(e.target.value)}
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col md={3} className="d-flex align-items-end">
//                     <Button color="primary" onClick={generateStandardReport}>
//                       Generate Standard Report
//                     </Button>
//                   </Col>
//                 </Row>
//               </Form>
//             </CardBody>
//           </Card>
          
//           {standardReportData.length > 0 && (
//             <Card className="mb-4" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//               <CardBody>
//                 <CardTitle tag="h5" style={{ color: '#fff' }}>Standard Report Preview</CardTitle>
//                 {standardChartData && (
//                   <Row className="mb-3">
//                     <Col md={12}>
//                       {/* Render the standard analytics chart using ApexCharts */}
//                       <Chart
//                         options={standardApex.options}
//                         series={standardApex.series}
//                         type="line"
//                         height={350}
//                       />
//                     </Col>
//                   </Row>
//                 )}
//                 <Table responsive dark>
//                   <thead>
//                     <tr>
//                       {Object.keys(standardReportData[0]).map((key, idx) => (
//                         <th key={idx}>{key}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {standardReportData.map((row, idx) => (
//                       <tr key={idx}>
//                         {Object.keys(row).map((key, jdx) => (
//                           <td key={jdx}>{row[key]}</td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//                 <Button color="success" href={standardCsvUrl} download={`standard_report_${standardReportType.replace(/\s+/g, '_')}.csv`}>
//                   Download CSV
//                 </Button>
//               </CardBody>
//             </Card>
//           )}
//         </TabPane>
        
//         {/* Custom Analytics Tab */}
//         <TabPane tabId="custom">
//           <Card className="mb-4" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>
//                 Custom Analytics
//               </CardTitle>
//               <Form>
//                 <Row form>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label for="customMetric" style={{ color: '#fff' }}>Custom Metric</Label>
//                       <Input
//                         type="select"
//                         id="customMetric"
//                         value={customMetric}
//                         onChange={e => setCustomMetric(e.target.value)}
//                       >
//                         <option>Custom Production</option>
//                         <option>Custom Efficiency</option>
//                         <option>Custom Downtime</option>
//                         <option>Custom Anomaly Count</option>
//                       </Input>
//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label for="customFilter" style={{ color: '#fff' }}>Filter (optional)</Label>
//                       <Input
//                         type="text"
//                         id="customFilter"
//                         placeholder="e.g., threshold > 100"
//                         value={customFilter}
//                         onChange={e => setCustomFilter(e.target.value)}
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label for="customStartDate" style={{ color: '#fff' }}>Start Date</Label>
//                       <Input
//                         type="date"
//                         id="customStartDate"
//                         value={customStartDate}
//                         onChange={e => setCustomStartDate(e.target.value)}
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label for="customEndDate" style={{ color: '#fff' }}>End Date</Label>
//                       <Input
//                         type="date"
//                         id="customEndDate"
//                         value={customEndDate}
//                         onChange={e => setCustomEndDate(e.target.value)}
//                       />
//                     </FormGroup>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col md={3} className="d-flex align-items-end">
//                     <Button color="primary" onClick={runCustomAnalytics}>
//                       Run Custom Analytics
//                     </Button>
//                   </Col>
//                 </Row>
//               </Form>
//             </CardBody>
//           </Card>
          
//           {customReportData.length > 0 && (
//             <Card className="mb-4" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//               <CardBody>
//                 <CardTitle tag="h5" style={{ color: '#fff' }}>Custom Report Preview</CardTitle>
//                 {customChartData && (
//                   <Row className="mb-3">
//                     <Col md={12}>
//                       {/* Render the custom analytics chart using Highcharts */}
//                       <HighchartsReact
//                         highcharts={Highcharts}
//                         options={customHighchartsOptions}
//                       />
//                     </Col>
//                   </Row>
//                 )}
//                 <Table responsive dark>
//                   <thead>
//                     <tr>
//                       {Object.keys(customReportData[0]).map((key, idx) => (
//                         <th key={idx}>{key}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {customReportData.map((row, idx) => (
//                       <tr key={idx}>
//                         {Object.keys(row).map((key, jdx) => (
//                           <td key={jdx}>{row[key]}</td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//                 <Button color="success" href={customCsvUrl} download={`custom_report_${customMetric.replace(/\s+/g, '_')}.csv`}>
//                   Download CSV
//                 </Button>
//               </CardBody>
//             </Card>
//           )}
//         </TabPane>
//       </TabContent>
      
//       {/* Advanced Analytics Charts Section */}
//       <Row className="mb-4">
//         <Col>
//           <h4 style={{ color: '#fff' }}>Advanced Analytics Charts</h4>
//         </Col>
//       </Row>
//       <Row className="mb-4">
//         <Col md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Actual vs Forecasted Production</CardTitle>
//               <Chart
//                 options={actualVsForecastApex.options}
//                 series={actualVsForecastApex.series}
//                 type="line"
//                 height={350}
//               />
//             </CardBody>
//           </Card>
//         </Col>
//         <Col md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Forecast Error Trend</CardTitle>
//               <Chart
//                 options={forecastErrorApex.options}
//                 series={forecastErrorApex.series}
//                 type="line"
//                 height={350}
//               />
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//       <Row className="mb-4">
//         <Col md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Anomaly Score Distribution</CardTitle>
//               <Chart
//                 options={anomalyDistributionApex.options}
//                 series={anomalyDistributionApex.series}
//                 type="bar"
//                 height={350}
//               />
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>    
//     </Container>
//   );
// };

// export default CustomAnalyticsPage;
