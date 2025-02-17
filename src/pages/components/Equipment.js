
import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Badge,
  Button,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { CheckCircle, XCircle, AlertTriangle } from "react-feather";
import DeviceDashboard from "../DeviceDashboards/DeviceDashboard";

// Import icons for equipment
import electrolyzerIcon from "../../assets/icons/electrolyzer_3d.png";
import rectifierIcon from "../../assets/icons/rectifier_3d.png";
import compressorIcon from "../../assets/icons/hydrogen_compressor_3d.png";
import heatExchangerIcon from "../../assets/icons/heat_exchanger_3d.png";
import waterPurificationIcon from "../../assets/icons/water_purification_3d.png";
import gasPurificationIcon from "../../assets/icons/gas_purification_3d.png";
import storageTankIcon from "../../assets/icons/storage_tanks_3d.png";
import coolingSystemIcon from "../../assets/icons/cooling_system_3d.png";
import powerSupplyIcon from "../../assets/icons/power_supply_3d.png";
import pumpIcon from "../../assets/icons/pumps_3d.png";

// Equipment data with full tooltip and details
const equipmentData = [
  { id: 1, name: "Electrolyzer Stack", iconUrl: electrolyzerIcon, status: "In Production", health: "Good", remainingLife: "87%", voltage: "1.9V/cell", current: "400 A", temperature: "75°C", pressure: "30 bar", efficiency: "87%", energyConsumption: "52.3 kWh/kg H₂" },
  { id: 2, name: "Rectifier", iconUrl: rectifierIcon, status: "Maintenance Due", health: "Medium", remainingLife: "78%", voltage: "240V DC", current: "420 A", efficiency: "82%", energyConsumption: "1.5% above normal" },
  { id: 3, name: "Hydrogen Compressor", iconUrl: compressorIcon, status: "Breakdown", health: "Fault Detected", remainingLife: "Unknown", pressure: "350 bar", temperature: "95°C", energyConsumption: "25% above normal" },
  { id: 4, name: "Heat Exchanger", iconUrl: heatExchangerIcon, status: "In Production", health: "Stable", remainingLife: "83%", efficiency: "92%", inletTemperature: "90°C", outletTemperature: "45°C" },
  { id: 5, name: "Water Purification Unit", iconUrl: waterPurificationIcon, status: "Performance Decreasing", health: "Moderate", remainingLife: "75%", pHLevel: "7.2", conductivity: "0.5 µS/cm", flowRate: "50 L/min" },
  { id: 6, name: "Gas Purification Unit", iconUrl: gasPurificationIcon, status: "In Production", health: "Stable", remainingLife: "88%", impurityLevels: "< 0.1 ppm", cycleEfficiency: "98%", pressure: "30 bar" },
  { id: 7, name: "Hydrogen Storage Tanks", iconUrl: storageTankIcon, status: "Stable", health: "No Leakage Detected", remainingLife: "80%", tankPressure: "700 bar", temperature: "20°C" },
  { id: 8, name: "Cooling System (Chiller)", iconUrl: coolingSystemIcon, status: "Slightly Overloaded", health: "Cooling Efficiency Dropped", remainingLife: "72%", coolantTemperature: "12°C", flowRate: "25 L/min" },
  { id: 9, name: "Power Supply Unit (Transformer)", iconUrl: powerSupplyIcon, status: "In Operation", health: "Normal", remainingLife: "90%", inputVoltage: "33 kV", outputVoltage: "690V AC", efficiency: "96%" },
  { id: 10, name: "Pumps", iconUrl: pumpIcon, status: "Running", health: "Good", remainingLife: "85%", flowRate: "60 L/min", pressure: "5 bar" },
];

// Status color mapping
const statusColors = {
  "In Production": "success",
  Running: "success",
  "In Operation": "success",
  Stable: "primary",
  "Maintenance Due": "warning",
  "Performance Decreasing": "warning",
  "Slightly Overloaded": "warning",
  Breakdown: "danger",
  "Fault Detected": "danger",
};

// Equipment Card Component
const EquipmentCard = ({ data, isActive, onViewDashboard }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipId = `equip-card-${data.id}`;
  const cardClass = isActive ? "glow" : isActive === false ? "blur" : "";
  const zoomClass = isActive ? "zoom" : "";

  // Collect extra fields for tooltip
  const extraFields = [];
  if (data.voltage) extraFields.push(["Voltage", data.voltage]);
  if (data.current) extraFields.push(["Current", data.current]);
  if (data.temperature) extraFields.push(["Temperature", data.temperature]);
  if (data.pressure) extraFields.push(["Pressure", data.pressure]);
  if (data.efficiency) extraFields.push(["Efficiency", data.efficiency]);
  if (data.energyConsumption) extraFields.push(["Energy Consumption", data.energyConsumption]);

  return (
    <Card className={`mb-4 shadow-sm equipment-card ${cardClass}`} id={tooltipId}>
      <CardBody className="d-flex flex-column align-items-center text-center">
        <img src={data.iconUrl} alt={data.name} className={`equipment-icon ${zoomClass}`} />
        <h5 className={`mt-3 name-zoom ${zoomClass}`}>{data.name}</h5>
        <Badge color={statusColors[data.status]}>{data.status}</Badge>
        <p><strong>Health:</strong> {data.health}</p>
        <p><strong>Remaining Life:</strong> {data.remainingLife}</p>
        <Button color="primary" className="mt-2" onClick={() => onViewDashboard(data)}>View Dashboard</Button>
      </CardBody>

      <Tooltip isOpen={tooltipOpen} target={tooltipId} toggle={() => setTooltipOpen(!tooltipOpen)} placement="top">
        {extraFields.map(([label, val]) => (
          <div key={label}><strong>{label}:</strong> {val}</div>
        ))}
      </Tooltip>
    </Card>
  );
};  

// Equipment Dashboard Component
const EquipmentDashboard = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  return (
    <div style={{ margin: "20px" }}>
      <h2>Equipment Dashboard</h2>
      <Row>
        {equipmentData.map((item) => (
          <Col lg={4} md={6} sm={12} key={item.id}>
            <div onMouseEnter={() => setHoveredId(item.id)} onMouseLeave={() => setHoveredId(null)}>
              <EquipmentCard data={item} isActive={hoveredId === item.id} onViewDashboard={setSelectedEquipment} />
            </div>
          </Col>
        ))}
      </Row>

      {/* Modal for Equipment Details */}
      {selectedEquipment && (
        <Modal isOpen={true} toggle={() => setSelectedEquipment(null)} size="xl">
          <ModalHeader toggle={() => setSelectedEquipment(null)}>{selectedEquipment.name} Dashboard</ModalHeader>
          <ModalBody><DeviceDashboard device={selectedEquipment} /></ModalBody>
        </Modal>
      )}

      {/* CSS for Glow, Blur, and Zoom Effects */}
      <style>
        {`
          .equipment-card {
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

          .zoom {
            transform: scale(1.2);
            transition: transform 0.3s ease-in-out;
          }

          .name-zoom {
            font-size: 1.2rem;
            transition: font-size 0.3s ease-in-out;
          }

          .glow .name-zoom {
            font-size: 1.4rem;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
};

export default EquipmentDashboard;

// import React, { useState } from "react";
// import {
//   Row,
//   Col,
//   Card,
//   CardBody,
//   Badge, 
//   Button,
//   Tooltip
// } from "reactstrap";
// import { CheckCircle, XCircle, AlertTriangle } from "react-feather";
// import { Link } from "react-router-dom";

// // Import your icons 
// // import electrolyzerIcon from "../../../assets/icons/electrolyzer_3d.png";

// // // import electrolyzerIcon from "src/assets/icons/electrolyzer_3d.png";
// // import compressorIcon from "../../../assets/icons/hydrogen_compressor_3d.png";
// // import coolingSystemIcon from "../../../assets/icons/cooling_system_3d.png";
// // import gasPurificationIcon from "../../../assets/icons/gas_purification_3d.png";
// // import heatExchangerIcon from "../../../assets/icons/heat_exchanger_3d.png";
// // import powerSupplyIcon from "../../../assets/icons/power_supply_3d.png";
// // import pumpIcon from "../../../assets/icons/pumps_3d.png";
// // import rectifierIcon from "../../../assets/icons/rectifier_3d.png";
// // import storageTankIcon from "../../../assets/icons/storage_tanks_3d.png";
// // import waterPurificationIcon from "../../../assets/icons/water_purification_3d.png";
// // import contorolsystemIcon from "../../../assets/icons/controlsystem_3d.png";


// // Example data with icons
// const equipmentData = [
//   {
//     id: 1,
//     name: "Electrolyzer Stack",
//     status: "In Production",
//     health: "Good",
//     remainingLife: "87%",
//     // iconUrl: electrolyzerIcon,
//     voltage: "1.9V/cell",
//     current: "400 A",
//     temperature: "75°C",
//     pressure: "30 bar",
//     efficiency: "87%",
//     energyConsumption: "52.3 kWh/kg H₂",
//     lastMaintenance: "2025-01-15",
//     nextMaintenance: "2025-03-15",
//   },
//   {
//     id: 2,
//     name: "Rectifier",
//     status: "Maintenance Due",
//     health: "Medium",
//     remainingLife: "78%",
//     // iconUrl: rectifierIcon,
//     voltage: "240V DC",
//     current: "420 A",
//     efficiency: "82%",
//     energyConsumption: "1.5% above normal",
//     lastMaintenance: "2024-12-10",
//     nextMaintenance: "2025-02-10",
//   },
//   {
//     id: 3,
//     name: "Hydrogen Compressor",
//     status: "Breakdown",
//     health: "Fault Detected",
//     remainingLife: "Unknown",
//     // iconUrl: compressorIcon,
//     pressure: "350 bar",
//     temperature: "95°C",
//     energyConsumption: "25% above normal",
//     lastMaintenance: "2024-11-01",
//     nextMaintenance: "Immediate Repair Required",
//   },
//   {
//     id: 4,
//     name: "Heat Exchanger",
//     status: "In Production",
//     health: "Stable",
//     remainingLife: "83%",
//     // iconUrl: heatExchangerIcon,
//     efficiency: "92%",
//     inletTemperature: "90°C",
//     outletTemperature: "45°C",
//     energyConsumption: "Normal",
//     lastMaintenance: "2024-11-20",
//     nextMaintenance: "2025-02-20",
//   },
//   {
//     id: 5,
//     name: "Water Purification Unit",
//     status: "Performance Decreasing",
//     health: "Moderate",
//     remainingLife: "75%",
//     // iconUrl: waterPurificationIcon,
//     pHLevel: "7.2",
//     conductivity: "0.5 µS/cm",
//     flowRate: "50 L/min",
//     energyConsumption: "5% above normal",
//     lastMaintenance: "2024-10-05",
//     nextMaintenance: "2025-01-05",
//   },
//   {
//     id: 6,
//     name: "Gas Purification Unit (PSA/Deoxidizer)",
//     status: "In Production",
//     health: "Stable",
//     remainingLife: "88%",
//     // iconUrl: gasPurificationIcon,
//     impurityLevels: "< 0.1 ppm",
//     cycleEfficiency: "98%",
//     pressure: "30 bar",
//     energyConsumption: "Normal",
//     lastMaintenance: "2025-01-10",
//     nextMaintenance: "2025-04-10",
//   },
//   {
//     id: 7,
//     name: "Hydrogen Storage Tanks",
//     status: "Stable",
//     health: "No Leakage Detected",
//     remainingLife: "80%",
//     // iconUrl: storageTankIcon,
//     tankPressure: "700 bar",
//     temperature: "20°C",
//     energyConsumption: "Minimal",
//     lastMaintenance: "2024-09-15",
//     nextMaintenance: "2025-03-15",
//   },
//   {
//     id: 8,
//     name: "Cooling System (Chiller)",
//     status: "Slightly Overloaded",
//     health: "Cooling Efficiency Dropped",
//     remainingLife: "72%",
//     // iconUrl: coolingSystemIcon,
//     coolantTemperature: "12°C",
//     flowRate: "25 L/min",
//     energyConsumption: "10% above normal",
//     lastMaintenance: "2024-08-01",
//     nextMaintenance: "2025-02-01",
//   },
//   {
//     id: 9,
//     name: "Power Supply Unit (Transformer)",
//     status: "In Operation",
//     health: "Normal",
//     remainingLife: "90%",
//     // iconUrl: powerSupplyIcon,
//     inputVoltage: "33 kV",
//     outputVoltage: "690V AC",
//     efficiency: "96%",
//     energyConsumption: "Optimized",
//     lastMaintenance: "2024-11-30",
//     nextMaintenance: "2025-05-30",
//   },
//   {
//     id: 10,
//     name: "Pumps (Water Circulation & Electrolyte Handling)",
//     status: "Running",
//     health: "Good",
//     remainingLife: "85%",
//     // iconUrl: pumpIcon,
//     flowRate: "60 L/min",
//     pressure: "5 bar",
//     energyConsumption: "Within expected range",
//     lastMaintenance: "2024-12-01",
//     nextMaintenance: "2025-06-01",
//   },
//   {
//     id: 11,
//     name: "Control System",
//     type: "ControlSystem",
//     status: "Running",
//     health: "Stable",
//     remainingLife: "100%",
//     // iconUrl: contorolsystemIcon,
//     availability: 100,
//     performance: 85,
//     quality: 95,
//     efficiency: "98%",
//     loopStabilityTrend: [0.2, 0.4, 0.35, 0.45, 0.3],
//     errorTrend: [5, 3, 4, 2, 1],
//   },
  
// ];

// // Status → Badge color
// const statusColors = {
//   "In Production": "success",
//   "Running": "success",
//   "In Operation": "success",
//   "Stable": "primary",
//   "Maintenance Due": "warning",
//   "Performance Decreasing": "warning",
//   "Slightly Overloaded": "warning",
//   "Breakdown": "danger",
//   "Fault Detected": "danger",
// };

// const getStatusIcon = (status) => {
//   if (["In Production", "Running", "In Operation"].includes(status)) {
//     return <CheckCircle size={16} className="me-1" />;
//   } else if (
//     ["Maintenance Due", "Performance Decreasing", "Slightly Overloaded"].includes(status)
//   ) {
//     return <AlertTriangle size={16} className="me-1" />;
//   } else {
//     return <XCircle size={16} className="me-1" />;
//   }
// };

// // Single EquipmentCard
// const EquipmentCard = ({ data, isActive }) => {
//   const [tooltipOpen, setTooltipOpen] = useState(false);

//   // Gather extra fields for the tooltip
//   const extraFields = [];
//   if (data.voltage) extraFields.push(["Voltage", data.voltage]);
//   if (data.current) extraFields.push(["Current", data.current]);
//   if (data.temperature) extraFields.push(["Temperature", data.temperature]);
//   if (data.pressure) extraFields.push(["Pressure", data.pressure]);
//   if (data.efficiency) extraFields.push(["Efficiency", data.efficiency]);
//   if (data.energyConsumption) extraFields.push(["Energy Consumption", data.energyConsumption]);
//   if (data.inletTemperature) extraFields.push(["Inlet Temperature", data.inletTemperature]);
//   if (data.outletTemperature) extraFields.push(["Outlet Temperature", data.outletTemperature]);
//   if (data.pHLevel) extraFields.push(["pH Level", data.pHLevel]);
//   if (data.conductivity) extraFields.push(["Conductivity", data.conductivity]);
//   if (data.flowRate) extraFields.push(["Flow Rate", data.flowRate]);
//   if (data.tankPressure) extraFields.push(["Tank Pressure", data.tankPressure]);
//   if (data.coolantTemperature) extraFields.push(["Coolant Temperature", data.coolantTemperature]);
//   if (data.inputVoltage) extraFields.push(["Input Voltage", data.inputVoltage]);
//   if (data.outputVoltage) extraFields.push(["Output Voltage", data.outputVoltage]);
//   if (data.impurityLevels) extraFields.push(["Impurity Levels", data.impurityLevels]);
//   if (data.cycleEfficiency) extraFields.push(["Cycle Efficiency", data.cycleEfficiency]);
//   if (data.lastMaintenance) extraFields.push(["Last Maintenance", data.lastMaintenance]);
//   if (data.nextMaintenance) extraFields.push(["Next Maintenance", data.nextMaintenance]);

//   // Assign ID for tooltip
//   const tooltipId = `equip-card-${data.id}`;

//   // Determine blur/glow class
//   const cardClass = isActive === true
//     ? "glow-card"
//     : isActive === false
//     ? "blurred-card"
//     : "";

//   // If hovered => scale icon
//   const iconClass = isActive === true ? "icon-expanded" : "icon-normal";

//   return (
//     <Card className={`mb-4 shadow-sm ${cardClass}`} style={{ borderRadius: "10px" }} id={tooltipId}>
//       {/* Center all content in CardBody */}
//       <CardBody className="d-flex flex-column align-items-center text-center">

//         {/* Name + Icon side by side */}
//         <div className="d-flex align-items-center mb-3" style={{ gap: "8px" }}>
//           {data.iconUrl && (
//             <img
//               src={data.iconUrl}
//               alt={data.name}
//               className={iconClass}
//             />
//           )}
//           <h5 className="mb-0">{data.name}</h5>
//         </div>

//         {/* Status */}
//         <Badge color={statusColors[data.status] || "secondary"} className="mb-2">
//           {getStatusIcon(data.status)}
//           {data.status}
//         </Badge>

//         <p><strong>Health:</strong> {data.health}</p>
//         <p><strong>Remaining Life:</strong> {data.remainingLife}</p>

//         {/* If you want additional fields (like productionCount, program), show them here... */}

//         {/* Button to device dashboard */}
//         <Link to={`/device/${data.id}`}>
//           <Button color="primary" className="mt-2">
//             View Device Dashboard
//           </Button>
//         </Link>
//       </CardBody>

//       {/* If extra fields exist, show them in a tooltip on hover */}
//       {extraFields.length > 0 && (
//         <Tooltip
//           isOpen={tooltipOpen}
//           target={tooltipId}
//           toggle={() => setTooltipOpen(!tooltipOpen)}
//           trigger="hover"
//           placement="top"
//           style={{ zIndex: 9999, maxWidth: "300px", whiteSpace: "normal" }}
//         >
//           {extraFields.map(([label, val]) => (
//             <div key={label}>
//               <strong>{label}:</strong> {val}
//             </div>
//           ))}
//         </Tooltip>
//       )}
//     </Card>
//   );
// };

// const EquipmentDashboard = () => {
//   const [hoveredId, setHoveredId] = useState(null);

//   return (
//     <div style={{ margin: "20px" }}>
//       <h2>Equipment Dashboard</h2>
//       <Row>
//         {equipmentData.map((item) => {
          
//           // if hovered => glow + expanded icon, else blur
//           let isActive = null;
//           if (hoveredId) {
//             isActive = (hoveredId === item.id) ? true : false;
//           }

//           return (
//             <Col lg={4} md={6} sm={12} key={item.id}>
//               <div
//                 onMouseEnter={() => setHoveredId(item.id)}
//                 onMouseLeave={() => setHoveredId(null)}
//               >
//                 <EquipmentCard data={item} isActive={isActive} />
//               </div>
//             </Col>
//           );
//         })}
//       </Row>
//     </div>
//   );
// };

// export default EquipmentDashboard;
