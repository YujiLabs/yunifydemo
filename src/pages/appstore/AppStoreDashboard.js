import React, { useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Badge, Button, Input, Tooltip } from "reactstrap";

// Import icons
import conditionMonitoringIcon from "../../assets/icons/App1.png";
import predictiveMaintenanceIcon from "../../assets/icons/App2.png";
import anomalyDetectionIcon from "../../assets/icons/App3.png";
import digitalTwinIcon from "../../assets/icons/App4.png";
import edgeIntelligenceIcon from "../../assets/icons/App5.png";
import qualityInspectionIcon from "../../assets/icons/App6.png"; // Used for Physics-Based Models
import controlSystemIcon from "../../assets/icons/App7.png";

// Mock data with tooltip descriptions
const storeApps = [
  {
    id: 1,
    name: "Physics-Based Models",
    icon: qualityInspectionIcon, // Using Quality Inspection Icon
    description: "Simulate physical systems with accurate mathematical models.",
    tooltip: "Create precise simulations using first-principles physics models for industrial applications.",
    tags: ["Simulation", "Mathematics", "Modeling"],
    rating: 4.9,
  },
  {
    id: 2,
    name: "Condition Monitoring",
    icon: conditionMonitoringIcon,
    description: "Real-time sensor data & threshold alarms.",
    tooltip: "Continuously monitor machine health and get alerts for abnormalities in real-time.",
    tags: ["Monitoring", "Sensors", "Dashboard"],
    rating: 4.5,
  },
  {
    id: 3,
    name: "Predictive Maintenance",
    icon: predictiveMaintenanceIcon,
    description: "Proactive maintenance scheduling using ML models.",
    tooltip: "AI-driven analytics predict failures, reducing downtime and improving efficiency.",
    tags: ["Maintenance", "ML", "Production"],
    rating: 4.7,
  },
  {
    id: 4,
    name: "Anomaly Detection",
    icon: anomalyDetectionIcon,
    description: "Spot unusual sensor or machine behavior in real time.",
    tooltip: "Detect sudden changes or failures in industrial systems before they escalate.",
    tags: ["AI", "Anomaly", "Edge"],
    rating: 4.2,
  },
  {
    id: 5,
    name: "Digital Twins",
    icon: digitalTwinIcon,
    description: "Virtual representation of physical assets & processes.",
    tooltip: "Simulate, analyze, and optimize your physical systems using digital replicas.",
    tags: ["Simulation", "3D Model", "Twin"],
    rating: 4.8,
  },
  {
    id: 6,
    name: "Edge Intelligence",
    icon: edgeIntelligenceIcon,
    description: "Run local ML on YunifyEdge device for fast insights.",
    tooltip: "Process industrial data directly on edge devices for faster decision-making.",
    tags: ["Edge", "AI", "Analytics"],
    rating: 4.6,
  },
  {
    id: 7,
    name: "Quality Inspection",
    icon: qualityInspectionIcon,
    description: "Computer vision to check product quality automatically.",
    tooltip: "AI-powered vision systems ensure high-quality production by detecting defects.",
    tags: ["Vision", "Inspection", "Camera"],
    rating: 4.3,
  },
  {
    id: 8,
    name: "Advanced Control System",
    icon: controlSystemIcon,
    description: "High-precision, adaptive control loops for your machines.",
    tooltip: "Enhance automation efficiency with real-time adaptive control strategies.",
    tags: ["Control", "Feedback", "PID"],
    rating: 4.4,
  },
];

function AppStoreDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredApp, setHoveredApp] = useState(null);

  return (
    <div style={{ minHeight: "100vh", padding: "20px", position: "relative" }}>
      <h2 style={{ color: "#00d8ff" }} className="mb-4">
        Yunify Engine - IIoT App Store
      </h2>

      {/* Search bar */}
      <div className="mb-4" style={{ maxWidth: "400px" }}>
        <Input
          type="text"
          placeholder="Search apps..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ color: "#fff", border: "1px solid #444" }}
        />
      </div>

      <Row>
        {storeApps.map(app => (
          <Col lg={4} md={6} sm={12} key={app.id}>
            <Card
              className={`mb-4 shadow-sm app-card ${hoveredApp === app.id ? "glow" : hoveredApp ? "blur" : ""}`}
              style={{ border: "none", borderRadius: "8px", minHeight: "280px" }}
              id={`tooltip-${app.id}`}
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              <CardBody className="text-center" style={{ color: "#fff", minHeight: "250px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                {app.icon && (
                  <div style={{ marginBottom: "10px" }}>
                    <img src={app.icon} alt={app.name} style={{ width: "60px" }} />
                  </div>
                )}

                <CardTitle tag="h5" style={{ color: "#00d8ff" }}>
                  {app.name}
                </CardTitle>

                <p style={{ fontSize: "0.9rem", color: "#ccc", flexGrow: 1 }}>
                  {app.description}
                </p>

                <div className="mb-2">
                  {app.tags.map((tag, idx) => (
                    <Badge key={idx} color="dark" style={{ marginRight: "4px" }}>
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p style={{ fontSize: "0.85rem", color: "#999" }}>
                  Rating: {app.rating || "N/A"} ★
                </p>

                <Button color="primary">Install</Button>
              </CardBody>

              {/* Tooltip for Hovered Card */}
              <Tooltip
                isOpen={hoveredApp === app.id}
                target={`tooltip-${app.id}`}
                placement="top"
                fade={false}
                autohide={false}
                style={{
                  maxWidth: "320px",
                  padding: "12px",
                  textAlign: "center",
                  backgroundColor: "rgba(0,0,0,0.9)",
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  lineHeight: "1.4",
                }}
              >
                {app.tooltip}
              </Tooltip>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Global Styles for Glow, Blur, and Uniform Card Size */}
      <style>
        {`
          .app-card {
            transition: all 0.3s ease-in-out;
          }

          .glow {
            box-shadow: 0px 0px 20px rgba(0, 216, 255, 0.8);
            transform: scale(1.05);
            z-index: 2;
          }

          .blur {
            opacity: 0.3;
            filter: blur(2px);
            transform: scale(0.95);
          }
        `}
      </style>
    </div>
  );
}

export default AppStoreDashboard;

// // src/pages/YunifyEnginePage.js
// import React, { useState } from "react";
// import { Row, Col, Card, CardBody, CardTitle, Badge, Button, Input } from "reactstrap";

// // EXAMPLE DATA: storeApps
// // Instead of a separate storeApps.js file, we can define it inline here for simplicity.
// // But if you prefer, put this data in /src/data/storeApps.js and import it.

// import conditionMonitoringIcon from "../../assets/icons/App1.png";
// import predictiveMaintenanceIcon from "../../assets/icons/App2.png";
// import anomalyDetectionIcon from "../../assets/icons/App3.png";
// import digitalTwinIcon from "../../assets/icons/App4.png";
// import edgeIntelligenceIcon from "../../assets/icons/App5.png";
// import qualityInspectionIcon from "../../assets/icons/App6.png";
// import controlSystemIcon from "../../assets/icons/App7.png"; // or your new control system icon

// // Mock data array
// const storeApps = [
//   {
//     id: 1,
//     name: "Condition Monitoring",
//     icon: conditionMonitoringIcon, // or remove if you have no icon
//     description: "Real-time sensor data & threshold alarms.",
//     tags: ["Monitoring", "Sensors", "Dashboard"],
//     rating: 4.5,
//   },
//   {
//     id: 2,
//     name: "Predictive Maintenance",
//     icon: predictiveMaintenanceIcon,
//     description: "Proactive maintenance scheduling using ML models.",
//     tags: ["Maintenance", "ML", "Production"],
//     rating: 4.7,
//   },
//   {
//     id: 3,
//     name: "Anomaly Detection",
//     icon: anomalyDetectionIcon,
//     description: "Spot unusual sensor or machine behavior in real time.",
//     tags: ["AI", "Anomaly", "Edge"],
//     rating: 4.2,
//   },
//   {
//     id: 4,
//     name: "Digital Twins",
//     icon: digitalTwinIcon,
//     description: "Virtual representation of physical assets & processes.",
//     tags: ["Simulation", "3D Model", "Twin"],
//     rating: 4.8,
//   },
//   {
//     id: 5,
//     name: "Edge Intelligence",
//     icon: edgeIntelligenceIcon,
//     description: "Run local ML on YunifyEdge device for fast insights.",
//     tags: ["Edge", "AI", "Analytics"],
//     rating: 4.6,
//   },
//   {
//     id: 6,
//     name: "Quality Inspection",
//     icon: qualityInspectionIcon,
//     description: "Computer vision to check product quality automatically.",
//     tags: ["Vision", "Inspection", "Camera"],
//     rating: 4.3,
//   },
//   {
//     id: 7,
//     name: "Advanced Control System",
//     icon: controlSystemIcon,
//     description: "High-precision, adaptive control loops for your machines.",
//     tags: ["Control", "Feedback", "PID"],
//     rating: 4.4,
//   },
// ];

// function YunifyEnginePage() {
//   const [searchTerm, setSearchTerm] = useState("");

//   // Filter apps by name / tags
//   const filteredApps = storeApps.filter(app => {
//     const combinedText = (app.name + " " + app.description + " " + app.tags.join(" ")).toLowerCase();
//     return combinedText.includes(searchTerm.toLowerCase());
//   });

//   return (
//     <div style={{ background: "#1c1f24", minHeight: "100vh", padding: "20px" }}>
//       <h2 style={{ color: "#00d8ff" }} className="mb-4">
//         Yunify Engine - IIoT App Store
//       </h2>

//       {/* Search bar */}
//       <div className="mb-4" style={{ maxWidth: "400px" }}>
//         <Input
//           type="text"
//           placeholder="Search apps..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           style={{ background: "#2c2f34", color: "#fff", border: "1px solid #444" }}
//         />
//       </div>

//       <Row>
//         {filteredApps.map(app => (
//           <Col lg={4} md={6} sm={12} key={app.id}>
//             <Card
//               className="mb-4 shadow-sm"
//               style={{ background: "#2c2f34", border: "none", borderRadius: "8px" }}
//             >
//               <CardBody className="text-center" style={{ color: "#fff" }}>
//                 {app.icon && (
//                   <div style={{ marginBottom: "10px" }}>
//                     <img src={app.icon} alt={app.name} style={{ width: "60px" }} />
//                   </div>
//                 )}

//                 <CardTitle tag="h5" style={{ color: "#00d8ff" }}>
//                   {app.name}
//                 </CardTitle>

//                 <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
//                   {app.description}
//                 </p>

//                 <div className="mb-2">
//                   {app.tags.map((tag, idx) => (
//                     <Badge key={idx} color="dark" style={{ marginRight: "4px" }}>
//                       {tag}
//                     </Badge>
//                   ))}
//                 </div>

//                 <p style={{ fontSize: "0.85rem", color: "#999" }}>
//                   Rating: {app.rating || "N/A"} ★
//                 </p>

//                 <Button color="primary">Install</Button>
//               </CardBody>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }

// export default YunifyEnginePage;




// // src/pages/YunifyEnginePage.js
// import React, { useState } from "react";
// import { Row, Col, Card, CardBody, CardTitle, Badge, Button, Input } from "reactstrap";

// // EXAMPLE DATA: storeApps
// // Instead of a separate storeApps.js file, we can define it inline here for simplicity.
// // But if you prefer, put this data in /src/data/storeApps.js and import it.

// import conditionMonitoringIcon from "../../assets/icons/App1.png";
// import predictiveMaintenanceIcon from "../../assets/icons/App2.png";
// import anomalyDetectionIcon from "../../assets/icons/App3.png";
// import digitalTwinIcon from "../../assets/icons/App4.png";
// import edgeIntelligenceIcon from "../../assets/icons/App5.png";
// import qualityInspectionIcon from "../../assets/icons/App6.png";
// import controlSystemIcon from "../../assets/icons/App7.png"; // or your new control system icon

// // Mock data array
// const storeApps = [
//   {
//     id: 1,
//     name: "Condition Monitoring",
//     icon: conditionMonitoringIcon, // or remove if you have no icon
//     description: "Real-time sensor data & threshold alarms.",
//     tags: ["Monitoring", "Sensors", "Dashboard"],
//     rating: 4.5,
//   },
//   {
//     id: 2,
//     name: "Predictive Maintenance",
//     icon: predictiveMaintenanceIcon,
//     description: "Proactive maintenance scheduling using ML models.",
//     tags: ["Maintenance", "ML", "Production"],
//     rating: 4.7,
//   },
//   {
//     id: 3,
//     name: "Anomaly Detection",
//     icon: anomalyDetectionIcon,
//     description: "Spot unusual sensor or machine behavior in real time.",
//     tags: ["AI", "Anomaly", "Edge"],
//     rating: 4.2,
//   },
//   {
//     id: 4,
//     name: "Digital Twins",
//     icon: digitalTwinIcon,
//     description: "Virtual representation of physical assets & processes.",
//     tags: ["Simulation", "3D Model", "Twin"],
//     rating: 4.8,
//   },
//   {
//     id: 5,
//     name: "Edge Intelligence",
//     icon: edgeIntelligenceIcon,
//     description: "Run local ML on YunifyEdge device for fast insights.",
//     tags: ["Edge", "AI", "Analytics"],
//     rating: 4.6,
//   },
//   {
//     id: 6,
//     name: "Quality Inspection",
//     icon: qualityInspectionIcon,
//     description: "Computer vision to check product quality automatically.",
//     tags: ["Vision", "Inspection", "Camera"],
//     rating: 4.3,
//   },
//   {
//     id: 7,
//     name: "Advanced Control System",
//     icon: controlSystemIcon,
//     description: "High-precision, adaptive control loops for your machines.",
//     tags: ["Control", "Feedback", "PID"],
//     rating: 4.4,
//   },
// ];

// function AppStoreDashboard() {
//   const [searchTerm, setSearchTerm] = useState("");

//   // Filter apps by name / tags
//   const filteredApps = storeApps.filter(app => {
//     const combinedText = (app.name + " " + app.description + " " + app.tags.join(" ")).toLowerCase();
//     return combinedText.includes(searchTerm.toLowerCase());
//   });

//   return (
//     <div style={{  minHeight: "100vh", padding: "20px" }}>
//       <h2 style={{ color: "#00d8ff" }} className="mb-4">
//         Yunify Engine - IIoT App Store
//       </h2>

//       {/* Search bar */}
//       <div className="mb-4" style={{ maxWidth: "400px" }}>
//         <Input
//           type="text"
//           placeholder="Search apps..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           style={{  color: "#fff", border: "1px solid #444" }}
//         />
//       </div>

//       <Row>
//         {filteredApps.map(app => (
//           <Col lg={4} md={6} sm={12} key={app.id}>
//             <Card
//               className="mb-4 shadow-sm"
//               style={{  border: "none", borderRadius: "8px" }}
//             >
//               <CardBody className="text-center" style={{ color: "#fff" }}>
//                 {app.icon && (
//                   <div style={{ marginBottom: "10px" }}>
//                     <img src={app.icon} alt={app.name} style={{ width: "60px" }} />
//                   </div>
//                 )}

//                 <CardTitle tag="h5" style={{ color: "#00d8ff" }}>
//                   {app.name}
//                 </CardTitle>

//                 <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
//                   {app.description}
//                 </p>

//                 <div className="mb-2">
//                   {app.tags.map((tag, idx) => (
//                     <Badge key={idx} color="dark" style={{ marginRight: "4px" }}>
//                       {tag}
//                     </Badge>
//                   ))}
//                 </div>

//                 <p style={{ fontSize: "0.85rem", color: "#999" }}>
//                   Rating: {app.rating || "N/A"} ★
//                 </p>

//                 <Button color="primary">Install</Button>
//               </CardBody>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }

// export default AppStoreDashboard;

// import React from 'react'

// const AppStoreDashboard = () => {
//   return (
//     <div>AppStoreDashboard</div>
//   )
// }

// export default AppStoreDashboard