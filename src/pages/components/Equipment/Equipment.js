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

// Import your icons
import electrolyzerIcon from "../../../assets/icons/electrolyzer_3d.png";
import rectifierIcon from "../../../assets/icons/rectifier_3d.png";
import compressorIcon from "../../../assets/icons/hydrogen_compressor_3d.png";
import heatExchangerIcon from "../../../assets/icons/heat_exchanger_3d.png";
import waterPurificationIcon from "../../../assets/icons/water_purification_3d.png";
import gasPurificationIcon from "../../../assets/icons/gas_purification_3d.png";
import storageTankIcon from "../../../assets/icons/storage_tanks_3d.png";
import coolingSystemIcon from "../../../assets/icons/cooling_system_3d.png";
import powerSupplyIcon from "../../../assets/icons/power_supply_3d.png";
import pumpIcon from "../../../assets/icons/pumps_3d.png";
import DeviceDashboard from "./DeviceDashboard";

// Equipment data with all 10 devices
const equipmentData = [
  {
    id: 1,
    name: "Electrolyzer Stack",
    type: "ElectrolyzerStack",
    status: "In Production",
    health: "Good",
    remainingLife: "87%",
    iconUrl: electrolyzerIcon,
    voltage: "1.9V/cell",
    current: "400 A",
    temperature: "75°C",
    pressure: "30 bar",
    efficiency: "87%",
    energyConsumption: "52.3 kWh/kg H₂",
    lastMaintenance: "2025-01-15",
    nextMaintenance: "2025-03-15",
    // DeviceDashboard KPI and chart data
    availability: 95,
    performance: 90,
    quality: 92,
    hydrogenProductionRate: [10, 15, 20, 18, 16],
    cycleTimes: [60, 55, 58, 62, 59],
  },
  {
    id: 2,
    name: "Rectifier",
    type: "Rectifier",
    status: "Maintenance Due",
    health: "Medium",
    remainingLife: "78%",
    iconUrl: rectifierIcon,
    voltage: "240V DC",
    current: "420 A",
    efficiency: "82%",
    energyConsumption: "1.5% above normal",
    lastMaintenance: "2024-12-10",
    nextMaintenance: "2025-02-10",
    // DeviceDashboard KPI and chart data
    availability: 88,
    performance: 85,
    quality: 80,
    voltageTrend: [230, 235, 240, 238, 237],
    currentTrend: [400, 410, 420, 415, 412],
  },
  {
    id: 3,
    name: "Hydrogen Compressor",
    type: "HydrogenCompressor",
    status: "Breakdown",
    health: "Fault Detected",
    remainingLife: "Unknown",
    iconUrl: compressorIcon,
    pressure: "350 bar",
    temperature: "95°C",
    energyConsumption: "25% above normal",
    lastMaintenance: "2024-11-01",
    nextMaintenance: "Immediate Repair Required",
    // DeviceDashboard KPI and chart data
    availability: 75,
    performance: 70,
    quality: 65,
    pressureTrend: [340, 345, 350, 348, 347],
    temperatureTrend: [90, 92, 95, 94, 93],
  },
  {
    id: 4,
    name: "Heat Exchanger",
    type: "HeatExchanger",
    status: "In Production",
    health: "Stable",
    remainingLife: "83%",
    iconUrl: heatExchangerIcon,
    efficiency: "92%",
    inletTemperature: "90°C",
    outletTemperature: "45°C",
    energyConsumption: "Normal",
    lastMaintenance: "2024-11-20",
    nextMaintenance: "2025-02-20",
    // DeviceDashboard KPI and chart data
    availability: 93,
    performance: 88,
    quality: 90,
    tempGradient: [90, 80, 70, 60, 45],
  },
  {
    id: 5,
    name: "Water Purification Unit",
    type: "WaterPurificationUnit",
    status: "Performance Decreasing",
    health: "Moderate",
    remainingLife: "75%",
    iconUrl: waterPurificationIcon,
    pHLevel: "7.2",
    conductivity: "0.5 µS/cm",
    flowRate: "50 L/min",
    energyConsumption: "5% above normal",
    lastMaintenance: "2024-10-05",
    nextMaintenance: "2025-01-05",
    // DeviceDashboard KPI and chart data
    availability: 85,
    performance: 80,
    quality: 78,
    qualityTrend: [0.5, 0.52, 0.55, 0.53, 0.5],
  },
  {
    id: 6,
    name: "Gas Purification Unit (PSA/Deoxidizer)",
    type: "GasPurificationUnit",
    status: "In Production",
    health: "Stable",
    remainingLife: "88%",
    iconUrl: gasPurificationIcon,
    impurityLevels: "< 0.1 ppm",
    cycleEfficiency: "98%",
    pressure: "30 bar",
    energyConsumption: "Normal",
    lastMaintenance: "2025-01-10",
    nextMaintenance: "2025-04-10",
    // DeviceDashboard KPI and chart data
    availability: 92,
    performance: 89,
    quality: 91,
    impurityTrend: [0.09, 0.08, 0.07, 0.06, 0.05],
  },
  {
    id: 7,
    name: "Hydrogen Storage Tanks",
    type: "HydrogenStorageTanks",
    status: "Stable",
    health: "No Leakage Detected",
    remainingLife: "80%",
    iconUrl: storageTankIcon,
    tankPressure: "700 bar",
    temperature: "20°C",
    energyConsumption: "Minimal",
    lastMaintenance: "2024-09-15",
    nextMaintenance: "2025-03-15",
    // DeviceDashboard KPI and chart data
    availability: 97,
    performance: 95,
    quality: 94,
    pressureHistory: [680, 690, 700, 695, 692],
  },
  {
    id: 8,
    name: "Cooling System (Chiller)",
    type: "CoolingSystem",
    status: "Slightly Overloaded",
    health: "Cooling Efficiency Dropped",
    remainingLife: "72%",
    iconUrl: coolingSystemIcon,
    coolantTemperature: "12°C",
    flowRate: "25 L/min",
    energyConsumption: "10% above normal",
    lastMaintenance: "2024-08-01",
    nextMaintenance: "2025-02-01",
    // DeviceDashboard KPI and chart data
    availability: 80,
    performance: 75,
    quality: 70,
    coolantTrend: [12, 12.5, 13, 12.8, 12.3],
  },
  {
    id: 9,
    name: "Power Supply Unit (Transformer)",
    type: "PowerSupplyUnit",
    status: "In Operation",
    health: "Normal",
    remainingLife: "90%",
    iconUrl: powerSupplyIcon,
    inputVoltage: "33 kV",
    outputVoltage: "690V AC",
    efficiency: "96%",
    energyConsumption: "Optimized",
    lastMaintenance: "2024-11-30",
    nextMaintenance: "2025-05-30",
    // DeviceDashboard KPI and chart data
    availability: 94,
    performance: 92,
    quality: 93,
    loadVariation: [5, 6, 5.5, 6.2, 5.8],
  },
  {
    id: 10,
    name: "Pumps (Water Circulation & Electrolyte Handling)",
    type: "Pumps",
    status: "Running",
    health: "Good",
    remainingLife: "85%",
    iconUrl: pumpIcon,
    flowRate: "60 L/min",
    pressure: "5 bar",
    energyConsumption: "Within expected range",
    lastMaintenance: "2024-12-01",
    nextMaintenance: "2025-06-01",
    // DeviceDashboard KPI and chart data
    availability: 90,
    performance: 87,
    quality: 88,
    flowTrend: [55, 57, 60, 58, 56],
  },
];

// Mapping for status → Badge color
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

const getStatusIcon = (status) => {
  if (["In Production", "Running", "In Operation"].includes(status)) {
    return <CheckCircle size={16} className="me-1" />;
  } else if (
    ["Maintenance Due", "Performance Decreasing", "Slightly Overloaded"].includes(
      status
    )
  ) {
    return <AlertTriangle size={16} className="me-1" />;
  } else {
    return <XCircle size={16} className="me-1" />;
  }
};

// EquipmentCard component accepts an onViewDashboard callback prop
const EquipmentCard = ({ data, isActive, onViewDashboard }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Collect extra fields for the tooltip
  const extraFields = [];
  if (data.voltage) extraFields.push(["Voltage", data.voltage]);
  if (data.current) extraFields.push(["Current", data.current]);
  if (data.temperature) extraFields.push(["Temperature", data.temperature]);
  if (data.pressure) extraFields.push(["Pressure", data.pressure]);
  if (data.efficiency) extraFields.push(["Efficiency", data.efficiency]);
  if (data.energyConsumption)
    extraFields.push(["Energy Consumption", data.energyConsumption]);
  if (data.lastMaintenance)
    extraFields.push(["Last Maintenance", data.lastMaintenance]);
  if (data.nextMaintenance)
    extraFields.push(["Next Maintenance", data.nextMaintenance]);

  // Unique ID for the tooltip target
  const tooltipId = `equip-card-${data.id}`;

  // Determine CSS class for glow or blur effect
  const cardClass =
    isActive === true ? "glow-card" : isActive === false ? "blurred-card" : "";

  // Icon class for any hover effects
  const iconClass = isActive === true ? "icon-expanded" : "icon-normal";

  return (
    <Card
      className={`mb-4 shadow-sm h-100 ${cardClass}`}
      style={{ borderRadius: "10px" }}
      id={tooltipId}
    >
      <CardBody className="d-flex flex-column align-items-center text-center flex-grow-1">
        {/* Icon on top */}
        {data.iconUrl && (
          <img src={data.iconUrl} alt={data.name} className={iconClass} />
        )}
        {/* Title below the image */}
        <h5 className="mt-2">{data.name}</h5>

        <Badge color={statusColors[data.status] || "secondary"} className="mb-2">
          {getStatusIcon(data.status)}
          {data.status}
        </Badge>

        <p>
          <strong>Health:</strong> {data.health}
        </p>
        <p>
          <strong>Remaining Life:</strong> {data.remainingLife}
        </p>

        {/* Push the button to the bottom */}
        <div className="mt-auto">
          <Button color="primary" className="mt-2" onClick={() => onViewDashboard(data)}>
            View Device Dashboard
          </Button>
        </div>
      </CardBody>

      {extraFields.length > 0 && (
        <Tooltip
          isOpen={tooltipOpen}
          target={tooltipId}
          toggle={() => setTooltipOpen(!tooltipOpen)}
          trigger="hover"
          placement="top"
          style={{ zIndex: 9999, maxWidth: "300px", whiteSpace: "normal" }}
        >
          {extraFields.map(([label, val]) => (
            <div key={label}>
              <strong>{label}:</strong> {val}
            </div>
          ))}
        </Tooltip>
      )}
    </Card>
  );
};

const EquipmentDashboard = () => {
  const [hoveredId, setHoveredId] = useState(null);
  // State to hold the equipment selected for the detailed device dashboard view
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  // Callback when "View Device Dashboard" is clicked on an equipment card
  const handleViewDashboard = (equipment) => {
    setSelectedEquipment(equipment);
  };

  // Callback to close the overlay modal
  const handleCloseModal = () => {
    setSelectedEquipment(null);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Equipment Dashboard</h2>
      <Row>
        {equipmentData.map((item) => {
          let isActive = null;
          if (hoveredId) {
            isActive = hoveredId === item.id ? true : false;
          }
          return (
            <Col lg={4} md={6} sm={12} key={item.id} className="d-flex">
              {/* Added padding around the card to maintain spacing */}
              <div
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="w-100 p-2"
              >
                <EquipmentCard
                  data={item}
                  isActive={isActive}
                  onViewDashboard={handleViewDashboard}
                />
              </div>
            </Col>
          );
        })}
      </Row>

      {/* Modal overlay rendering the Device Dashboard */}
      {selectedEquipment && (
        <Modal isOpen={true} toggle={handleCloseModal} size="xl">
          <ModalHeader toggle={handleCloseModal}>
            {selectedEquipment.name} Dashboard
          </ModalHeader>
          <ModalBody>
            {/* Render the detailed DeviceDashboard using the selected equipment data */}
            <DeviceDashboard device={selectedEquipment} />
          </ModalBody>
        </Modal>
      )}
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
//   Tooltip,
//   Modal,
//   ModalHeader,
//   ModalBody,
// } from "reactstrap";
// import { CheckCircle, XCircle, AlertTriangle } from "react-feather";

// // Import your icons
// import electrolyzerIcon from "../../../assets/icons/electrolyzer_3d.png";
// import rectifierIcon from "../../../assets/icons/rectifier_3d.png";
// import compressorIcon from "../../../assets/icons/hydrogen_compressor_3d.png";
// import heatExchangerIcon from "../../../assets/icons/heat_exchanger_3d.png";
// import waterPurificationIcon from "../../../assets/icons/water_purification_3d.png";
// import gasPurificationIcon from "../../../assets/icons/gas_purification_3d.png";
// import storageTankIcon from "../../../assets/icons/storage_tanks_3d.png";
// import coolingSystemIcon from "../../../assets/icons/cooling_system_3d.png";
// import powerSupplyIcon from "../../../assets/icons/power_supply_3d.png";
// import pumpIcon from "../../../assets/icons/pumps_3d.png";
// import DeviceDashboard from "./DeviceDashboard";

// // Equipment data with all 10 devices
// const equipmentData = [
//   {
//     id: 1,
//     name: "Electrolyzer Stack",
//     type: "ElectrolyzerStack",
//     status: "In Production",
//     health: "Good",
//     remainingLife: "87%",
//     iconUrl: electrolyzerIcon,
//     voltage: "1.9V/cell",
//     current: "400 A",
//     temperature: "75°C",
//     pressure: "30 bar",
//     efficiency: "87%",
//     energyConsumption: "52.3 kWh/kg H₂",
//     lastMaintenance: "2025-01-15",
//     nextMaintenance: "2025-03-15",
//     // DeviceDashboard KPI and chart data
//     availability: 95,
//     performance: 90,
//     quality: 92,
//     hydrogenProductionRate: [10, 15, 20, 18, 16],
//     cycleTimes: [60, 55, 58, 62, 59],
//   },
//   {
//     id: 2,
//     name: "Rectifier",
//     type: "Rectifier",
//     status: "Maintenance Due",
//     health: "Medium",
//     remainingLife: "78%",
//     iconUrl: rectifierIcon,
//     voltage: "240V DC",
//     current: "420 A",
//     efficiency: "82%",
//     energyConsumption: "1.5% above normal",
//     lastMaintenance: "2024-12-10",
//     nextMaintenance: "2025-02-10",
//     // DeviceDashboard KPI and chart data
//     availability: 88,
//     performance: 85,
//     quality: 80,
//     voltageTrend: [230, 235, 240, 238, 237],
//     currentTrend: [400, 410, 420, 415, 412],
//   },
//   {
//     id: 3,
//     name: "Hydrogen Compressor",
//     type: "HydrogenCompressor",
//     status: "Breakdown",
//     health: "Fault Detected",
//     remainingLife: "Unknown",
//     iconUrl: compressorIcon,
//     pressure: "350 bar",
//     temperature: "95°C",
//     energyConsumption: "25% above normal",
//     lastMaintenance: "2024-11-01",
//     nextMaintenance: "Immediate Repair Required",
//     // DeviceDashboard KPI and chart data
//     availability: 75,
//     performance: 70,
//     quality: 65,
//     pressureTrend: [340, 345, 350, 348, 347],
//     temperatureTrend: [90, 92, 95, 94, 93],
//   },
//   {
//     id: 4,
//     name: "Heat Exchanger",
//     type: "HeatExchanger",
//     status: "In Production",
//     health: "Stable",
//     remainingLife: "83%",
//     iconUrl: heatExchangerIcon,
//     efficiency: "92%",
//     inletTemperature: "90°C",
//     outletTemperature: "45°C",
//     energyConsumption: "Normal",
//     lastMaintenance: "2024-11-20",
//     nextMaintenance: "2025-02-20",
//     // DeviceDashboard KPI and chart data
//     availability: 93,
//     performance: 88,
//     quality: 90,
//     tempGradient: [90, 80, 70, 60, 45],
//   },
//   {
//     id: 5,
//     name: "Water Purification Unit",
//     type: "WaterPurificationUnit",
//     status: "Performance Decreasing",
//     health: "Moderate",
//     remainingLife: "75%",
//     iconUrl: waterPurificationIcon,
//     pHLevel: "7.2",
//     conductivity: "0.5 µS/cm",
//     flowRate: "50 L/min",
//     energyConsumption: "5% above normal",
//     lastMaintenance: "2024-10-05",
//     nextMaintenance: "2025-01-05",
//     // DeviceDashboard KPI and chart data
//     availability: 85,
//     performance: 80,
//     quality: 78,
//     qualityTrend: [0.5, 0.52, 0.55, 0.53, 0.5],
//   },
//   {
//     id: 6,
//     name: "Gas Purification Unit (PSA/Deoxidizer)",
//     type: "GasPurificationUnit",
//     status: "In Production",
//     health: "Stable",
//     remainingLife: "88%",
//     iconUrl: gasPurificationIcon,
//     impurityLevels: "< 0.1 ppm",
//     cycleEfficiency: "98%",
//     pressure: "30 bar",
//     energyConsumption: "Normal",
//     lastMaintenance: "2025-01-10",
//     nextMaintenance: "2025-04-10",
//     // DeviceDashboard KPI and chart data
//     availability: 92,
//     performance: 89,
//     quality: 91,
//     impurityTrend: [0.09, 0.08, 0.07, 0.06, 0.05],
//   },
//   {
//     id: 7,
//     name: "Hydrogen Storage Tanks",
//     type: "HydrogenStorageTanks",
//     status: "Stable",
//     health: "No Leakage Detected",
//     remainingLife: "80%",
//     iconUrl: storageTankIcon,
//     tankPressure: "700 bar",
//     temperature: "20°C",
//     energyConsumption: "Minimal",
//     lastMaintenance: "2024-09-15",
//     nextMaintenance: "2025-03-15",
//     // DeviceDashboard KPI and chart data
//     availability: 97,
//     performance: 95,
//     quality: 94,
//     pressureHistory: [680, 690, 700, 695, 692],
//   },
//   {
//     id: 8,
//     name: "Cooling System (Chiller)",
//     type: "CoolingSystem",
//     status: "Slightly Overloaded",
//     health: "Cooling Efficiency Dropped",
//     remainingLife: "72%",
//     iconUrl: coolingSystemIcon,
//     coolantTemperature: "12°C",
//     flowRate: "25 L/min",
//     energyConsumption: "10% above normal",
//     lastMaintenance: "2024-08-01",
//     nextMaintenance: "2025-02-01",
//     // DeviceDashboard KPI and chart data
//     availability: 80,
//     performance: 75,
//     quality: 70,
//     coolantTrend: [12, 12.5, 13, 12.8, 12.3],
//   },
//   {
//     id: 9,
//     name: "Power Supply Unit (Transformer)",
//     type: "PowerSupplyUnit",
//     status: "In Operation",
//     health: "Normal",
//     remainingLife: "90%",
//     iconUrl: powerSupplyIcon,
//     inputVoltage: "33 kV",
//     outputVoltage: "690V AC",
//     efficiency: "96%",
//     energyConsumption: "Optimized",
//     lastMaintenance: "2024-11-30",
//     nextMaintenance: "2025-05-30",
//     // DeviceDashboard KPI and chart data
//     availability: 94,
//     performance: 92,
//     quality: 93,
//     loadVariation: [5, 6, 5.5, 6.2, 5.8],
//   },
//   {
//     id: 10,
//     name: "Pumps (Water Circulation & Electrolyte Handling)",
//     type: "Pumps",
//     status: "Running",
//     health: "Good",
//     remainingLife: "85%",
//     iconUrl: pumpIcon,
//     flowRate: "60 L/min",
//     pressure: "5 bar",
//     energyConsumption: "Within expected range",
//     lastMaintenance: "2024-12-01",
//     nextMaintenance: "2025-06-01",
//     // DeviceDashboard KPI and chart data
//     availability: 90,
//     performance: 87,
//     quality: 88,
//     flowTrend: [55, 57, 60, 58, 56],
//   },
// ];

// // Mapping for status → Badge color
// const statusColors = {
//   "In Production": "success",
//   Running: "success",
//   "In Operation": "success",
//   Stable: "primary",
//   "Maintenance Due": "warning",
//   "Performance Decreasing": "warning",
//   "Slightly Overloaded": "warning",
//   Breakdown: "danger",
//   "Fault Detected": "danger",
// };

// const getStatusIcon = (status) => {
//   if (["In Production", "Running", "In Operation"].includes(status)) {
//     return <CheckCircle size={16} className="me-1" />;
//   } else if (
//     ["Maintenance Due", "Performance Decreasing", "Slightly Overloaded"].includes(
//       status
//     )
//   ) {
//     return <AlertTriangle size={16} className="me-1" />;
//   } else {
//     return <XCircle size={16} className="me-1" />;
//   }
// };

// // EquipmentCard component accepts an onViewDashboard callback prop
// const EquipmentCard = ({ data, isActive, onViewDashboard }) => {
//   const [tooltipOpen, setTooltipOpen] = useState(false);

//   // Collect extra fields for the tooltip
//   const extraFields = [];
//   if (data.voltage) extraFields.push(["Voltage", data.voltage]);
//   if (data.current) extraFields.push(["Current", data.current]);
//   if (data.temperature) extraFields.push(["Temperature", data.temperature]);
//   if (data.pressure) extraFields.push(["Pressure", data.pressure]);
//   if (data.efficiency) extraFields.push(["Efficiency", data.efficiency]);
//   if (data.energyConsumption)
//     extraFields.push(["Energy Consumption", data.energyConsumption]);
//   if (data.lastMaintenance)
//     extraFields.push(["Last Maintenance", data.lastMaintenance]);
//   if (data.nextMaintenance)
//     extraFields.push(["Next Maintenance", data.nextMaintenance]);

//   // Unique ID for the tooltip target
//   const tooltipId = `equip-card-${data.id}`;

//   // Determine CSS class for glow or blur effect
//   const cardClass =
//     isActive === true ? "glow-card" : isActive === false ? "blurred-card" : "";

//   // Icon class for any hover effects
//   const iconClass = isActive === true ? "icon-expanded" : "icon-normal";

//   return (
//     <Card
//       className={`mb-4 shadow-sm ${cardClass}`}
//       style={{ borderRadius: "10px" }}
//       id={tooltipId}
//     >
//       <CardBody className="d-flex flex-column align-items-center text-center">
//         {/* Icon on top */}
//         {data.iconUrl && (
//           <img src={data.iconUrl} alt={data.name} className={iconClass} />
//         )}
//         {/* Title below the image */}
//         <h5 className="mt-2">{data.name}</h5>

//         <Badge color={statusColors[data.status] || "secondary"} className="mb-2">
//           {getStatusIcon(data.status)}
//           {data.status}
//         </Badge>

//         <p>
//           <strong>Health:</strong> {data.health}
//         </p>
//         <p>
//           <strong>Remaining Life:</strong> {data.remainingLife}
//         </p>

//         {/* Instead of linking to a separate page, call the onViewDashboard callback */}
//         <Button color="primary" className="mt-2" onClick={() => onViewDashboard(data)}>
//           View Device Dashboard
//         </Button>
//       </CardBody>

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
//   // State to hold the equipment selected for the detailed device dashboard view
//   const [selectedEquipment, setSelectedEquipment] = useState(null);

//   // Callback when "View Device Dashboard" is clicked on an equipment card
//   const handleViewDashboard = (equipment) => {
//     setSelectedEquipment(equipment);
//   };

//   // Callback to close the overlay modal
//   const handleCloseModal = () => {
//     setSelectedEquipment(null);
//   };

//   return (
//     <div style={{ margin: "20px" }}>
//       <h2>Equipment Dashboard</h2>
//       <Row>
//         {equipmentData.map((item) => {
//           let isActive = null;
//           if (hoveredId) {
//             isActive = hoveredId === item.id ? true : false;
//           }
//           return (
//             <Col lg={4} md={6} sm={12} key={item.id}>
//               <div
//                 onMouseEnter={() => setHoveredId(item.id)}
//                 onMouseLeave={() => setHoveredId(null)}
//               >
//                 <EquipmentCard
//                   data={item}
//                   isActive={isActive}
//                   onViewDashboard={handleViewDashboard}
//                 />
//               </div>
//             </Col>
//           );
//         })}
//       </Row>

//       {/* Modal overlay rendering the Device Dashboard */}
//       {selectedEquipment && (
//         <Modal isOpen={true} toggle={handleCloseModal} size="xl">
//           <ModalHeader toggle={handleCloseModal}>
//             {selectedEquipment.name} Dashboard
//           </ModalHeader>
//           <ModalBody>
//             {/* Render the detailed DeviceDashboard using the selected equipment data */}
//             <DeviceDashboard device={selectedEquipment} />
//           </ModalBody>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default EquipmentDashboard;