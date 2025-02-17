import React, { useState, useEffect } from 'react';
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
  Table
} from 'reactstrap';

// Dark theme styling for a technical look
const darkTheme = {
  backgroundColor: '#1e1e2f',
  color: '#ffffff',
  minHeight: '100vh',
  padding: '20px'
};

const AdvancedReportsPage = () => {
  // Form states for report generation
  const [reportType, setReportType] = useState('Statistical Performance Report');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [csvUrl, setCsvUrl] = useState('');

  // Advanced AI/ML & Statistical KPI states (simulate real-time updates)
  const [mae, setMae] = useState(2.5); // Mean Absolute Error
  const [rmse, setRmse] = useState(3.2); // Root Mean Squared Error
  const [anomalyPrecision, setAnomalyPrecision] = useState(85); // %
  const [modelConfidence, setModelConfidence] = useState(95); // %
  const [forecastAccuracy, setForecastAccuracy] = useState(90); // %
  const [predictedDowntime, setPredictedDowntime] = useState(1.5); // hrs

  // Simulate KPI updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMae(prev => Math.max(1, Math.min(5, prev + (Math.random() - 0.5) * 0.2)));
      setRmse(prev => Math.max(2, Math.min(6, prev + (Math.random() - 0.5) * 0.2)));
      setAnomalyPrecision(prev => Math.max(80, Math.min(100, prev + (Math.random() - 0.5))));
      setModelConfidence(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5))));
      setForecastAccuracy(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5))));
      setPredictedDowntime(prev => Math.max(1, Math.min(3, prev + (Math.random() - 0.5) * 0.2)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Generate report data based on the selected report type (dummy data)
  const generateReport = () => {
    let data = [];
    switch (reportType) {
      case 'Statistical Performance Report':
        data = [
          { Metric: 'Mean Absolute Error (MAE)', Value: mae.toFixed(2) },
          { Metric: 'Root Mean Squared Error (RMSE)', Value: rmse.toFixed(2) },
          { Metric: 'Forecast Accuracy', Value: forecastAccuracy.toFixed(0) + '%' },
        ];
        break;
      case 'Predictive Maintenance Report':
        data = [
          { Metric: 'Model Confidence', Value: modelConfidence.toFixed(0) + '%' },
          { Metric: 'Predicted Downtime (hrs)', Value: predictedDowntime.toFixed(1) },
        ];
        break;
      case 'Anomaly Detection Analysis':
        data = [
          { Metric: 'Anomaly Detection Precision', Value: anomalyPrecision.toFixed(0) + '%' },
          { Metric: 'Number of Anomalies', Value: 5 },
        ];
        break;
      case 'Forecasting & Model Evaluation':
        data = [
          { Metric: 'MAE', Value: mae.toFixed(2) },
          { Metric: 'RMSE', Value: rmse.toFixed(2) },
          { Metric: 'Forecast Accuracy', Value: forecastAccuracy.toFixed(0) + '%' },
        ];
        break;
      default:
        data = [];
    }
    setReportData(data);
    convertToCSV(data);
  };

  // Function to convert reportData to CSV and set a download URL
  const convertToCSV = (data) => {
    if (!data.length) return;
    const keys = Object.keys(data[0]);
    const csvRows = [];
    csvRows.push(keys.join(','));
    data.forEach(row => {
      const values = keys.map(key => `"${row[key]}"`);
      csvRows.push(values.join(','));
    });
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    setCsvUrl(url);
  };

  return (
    <Container fluid style={darkTheme}>
      <h2 style={{ color: '#fff', marginBottom: '20px' }}>
        Advanced Statistical & AI/ML Reports
      </h2>
      
      {/* Report Generation Form */}
      <Card className="mb-4" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
        <CardBody>
          <CardTitle tag="h5" style={{ color: '#fff' }}>
            Generate a Custom Report
          </CardTitle>
          <Form>
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label for="reportType" style={{ color: '#fff' }}>
                    Report Type
                  </Label>
                  <Input
                    type="select"
                    id="reportType"
                    value={reportType}
                    onChange={e => setReportType(e.target.value)}
                  >
                    <option>Statistical Performance Report</option>
                    <option>Predictive Maintenance Report</option>
                    <option>Anomaly Detection Analysis</option>
                    <option>Forecasting & Model Evaluation</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="startDate" style={{ color: '#fff' }}>
                    Start Date
                  </Label>
                  <Input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="endDate" style={{ color: '#fff' }}>
                    End Date
                  </Label>
                  <Input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={3} className="d-flex align-items-end">
                <Button color="primary" onClick={generateReport}>
                  Generate Report
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      
      {/* Report Preview and Download */}
      {reportData.length > 0 && (
        <Card className="mb-4" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
          <CardBody>
            <CardTitle tag="h5" style={{ color: '#fff' }}>
              Report Preview
            </CardTitle>
            <Table responsive dark>
              <thead>
                <tr>
                  {Object.keys(reportData[0]).map((key, idx) => (
                    <th key={idx}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, idx) => (
                  <tr key={idx}>
                    {Object.keys(row).map((key, jdx) => (
                      <td key={jdx}>{row[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button
              color="success"
              href={csvUrl}
              download={`advanced_report_${reportType.replace(/\s+/g, '_')}.csv`}
            >
              Download CSV Report
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Advanced Analytics Charts Section has been removed */}
    </Container>
  );
};

export default AdvancedReportsPage;

// import React, { useState, useEffect } from 'react';
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
// // Renders a gauge chart if gaugeValue is provided; otherwise displays a numeric value.
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

// const AdvancedReportsPage = () => {
//   // Form states for report generation
//   const [reportType, setReportType] = useState('Statistical Performance Report');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [reportData, setReportData] = useState([]);
//   const [csvUrl, setCsvUrl] = useState('');

//   // Advanced AI/ML & Statistical KPI states (simulate real-time updates)
//   const [mae, setMae] = useState(2.5); // Mean Absolute Error
//   const [rmse, setRmse] = useState(3.2); // Root Mean Squared Error
//   const [anomalyPrecision, setAnomalyPrecision] = useState(85); // %
//   const [modelConfidence, setModelConfidence] = useState(95); // %
//   const [forecastAccuracy, setForecastAccuracy] = useState(90); // %
//   const [predictedDowntime, setPredictedDowntime] = useState(1.5); // hrs

//   // Simulate KPI updates every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMae(prev => Math.max(1, Math.min(5, prev + (Math.random() - 0.5) * 0.2)));
//       setRmse(prev => Math.max(2, Math.min(6, prev + (Math.random() - 0.5) * 0.2)));
//       setAnomalyPrecision(prev => Math.max(80, Math.min(100, prev + (Math.random() - 0.5))));
//       setModelConfidence(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5))));
//       setForecastAccuracy(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5))));
//       setPredictedDowntime(prev => Math.max(1, Math.min(3, prev + (Math.random() - 0.5) * 0.2)));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Dummy Chart Data for Actual vs Forecasted Production
//   const actualVsForecastData = {
//     labels: ['Hour 1', 'Hour 2', 'Hour 3', 'Hour 4', 'Hour 5', 'Hour 6'],
//     datasets: [
//       {
//         label: 'Actual Production (kg)',
//         data: [10, 11, 9, 10, 10.5, 10],
//         borderColor: 'green',
//         fill: false,
//       },
//       {
//         label: 'Forecasted Production (kg)',
//         data: [10.2, 10.9, 9.1, 10.1, 10.6, 10.1],
//         borderColor: 'orange',
//         fill: false,
//       },
//     ],
//   };

//   // Dummy Chart Data for Forecast Error Trend
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

//   // Dummy Chart Data for Anomaly Score Distribution
//   const anomalyDistributionData = {
//     labels: ['Normal', 'Warning', 'Critical'],
//     datasets: [
//       {
//         label: 'Frequency',
//         data: [80, 15, 5],
//         backgroundColor: ['#28a745', '#ffc107', '#d32f2f'],
//       },
//     ],
//   };

//   // Generate report data based on the selected report type (dummy data)
//   const generateReport = () => {
//     let data = [];
//     switch (reportType) {
//       case 'Statistical Performance Report':
//         data = [
//           { Metric: 'Mean Absolute Error (MAE)', Value: mae.toFixed(2) },
//           { Metric: 'Root Mean Squared Error (RMSE)', Value: rmse.toFixed(2) },
//           { Metric: 'Forecast Accuracy', Value: forecastAccuracy.toFixed(0) + '%' },
//         ];
//         break;
//       case 'Predictive Maintenance Report':
//         data = [
//           { Metric: 'Model Confidence', Value: modelConfidence.toFixed(0) + '%' },
//           { Metric: 'Predicted Downtime (hrs)', Value: predictedDowntime.toFixed(1) },
//         ];
//         break;
//       case 'Anomaly Detection Analysis':
//         data = [
//           { Metric: 'Anomaly Detection Precision', Value: anomalyPrecision.toFixed(0) + '%' },
//           { Metric: 'Number of Anomalies', Value: 5 },
//         ];
//         break;
//       case 'Forecasting & Model Evaluation':
//         data = [
//           { Metric: 'MAE', Value: mae.toFixed(2) },
//           { Metric: 'RMSE', Value: rmse.toFixed(2) },
//           { Metric: 'Forecast Accuracy', Value: forecastAccuracy.toFixed(0) + '%' },
//         ];
//         break;
//       default:
//         data = [];
//     }
//     setReportData(data);
//     convertToCSV(data);
//   };

//   // Function to convert reportData to CSV and set a download URL
//   const convertToCSV = (data) => {
//     if (!data.length) return;
//     const keys = Object.keys(data[0]);
//     const csvRows = [];
//     csvRows.push(keys.join(','));
//     data.forEach(row => {
//       const values = keys.map(key => `"${row[key]}"`);
//       csvRows.push(values.join(','));
//     });
//     const csvString = csvRows.join('\n');
//     const blob = new Blob([csvString], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     setCsvUrl(url);
//   };

//   return (
//     <Container fluid style={darkTheme}>
//       <h2 style={{ color: '#fff', marginBottom: '20px' }}>Advanced Statistical & AI/ML Reports</h2>
      
//       {/* Report Generation Form */}
//       <Card className="mb-4" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//         <CardBody>
//           <CardTitle tag="h5" style={{ color: '#fff' }}>Generate a Custom Report</CardTitle>
//           <Form>
//             <Row form>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label for="reportType" style={{ color: '#fff' }}>Report Type</Label>
//                   <Input
//                     type="select"
//                     id="reportType"
//                     value={reportType}
//                     onChange={e => setReportType(e.target.value)}
//                   >
//                     <option>Statistical Performance Report</option>
//                     <option>Predictive Maintenance Report</option>
//                     <option>Anomaly Detection Analysis</option>
//                     <option>Forecasting & Model Evaluation</option>
//                   </Input>
//                 </FormGroup>
//               </Col>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label for="startDate" style={{ color: '#fff' }}>Start Date</Label>
//                   <Input
//                     type="date"
//                     id="startDate"
//                     value={startDate}
//                     onChange={e => setStartDate(e.target.value)}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label for="endDate" style={{ color: '#fff' }}>End Date</Label>
//                   <Input
//                     type="date"
//                     id="endDate"
//                     value={endDate}
//                     onChange={e => setEndDate(e.target.value)}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={3} className="d-flex align-items-end">
//                 <Button color="primary" onClick={generateReport}>
//                   Generate Report
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//         </CardBody>
//       </Card>
      
//       {/* Report Preview and Download */}
//       {reportData.length > 0 && (
//         <Card className="mb-4" style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//           <CardBody>
//             <CardTitle tag="h5" style={{ color: '#fff' }}>Report Preview</CardTitle>
//             <Table responsive dark>
//               <thead>
//                 <tr>
//                   {Object.keys(reportData[0]).map((key, idx) => (
//                     <th key={idx}>{key}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((row, idx) => (
//                   <tr key={idx}>
//                     {Object.keys(row).map((key, jdx) => (
//                       <td key={jdx}>{row[key]}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//             <Button color="success" href={csvUrl} download={`advanced_report_${reportType.replace(/\s+/g, '_')}.csv`}>
//               Download CSV Report
//             </Button>
//           </CardBody>
//         </Card>
//       )}
      
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
//       <Row className="mb-4">
//         <Col md={6}>
//           <Card style={{ backgroundColor: '#2d2d44', border: 'none' }}>
//             <CardBody>
//               <CardTitle tag="h5" style={{ color: '#fff' }}>Anomaly Score Distribution</CardTitle>
//               <Bar
//                 data={anomalyDistributionData}
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

// export default AdvancedReportsPage;
