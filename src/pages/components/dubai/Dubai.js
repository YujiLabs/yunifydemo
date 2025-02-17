import React, { useState } from "react";
import { withRouter } from "react-router-dom"; // Import withRouter for older versions

import Overview from "../Overview";
import Analytics from "../Analytics";
import Reports from "../Reports";
import Equipment from "../Equipment/Equipment";

const Dubai = ({ location, history }) => {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Access plant data passed through state
  const plantData = location.state ? location.state.plantData : null;

  return (
    <div style={{ padding: "20px" }}>
      {plantData && (
        <div style={{fontWeight:"bold"}}>
          <span>{plantData.plant_number}</span> <span>{plantData.tooltip}</span> <span>{plantData.status}</span><span>{plantData.h2_production}</span> <span>{plantData.efficiency}%</span> <span>{plantData.technology}</span>
        </div>
      )}

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <h4 style={{ cursor: "pointer" }} onClick={() => setActiveSection("dashboard")}>
          Overview
        </h4>
        <h4 style={{ cursor: "pointer" }} onClick={() => setActiveSection("equipment")}>
          Equipment Dashboard
        </h4>
        <h4 style={{ cursor: "pointer" }} onClick={() => setActiveSection("analytics")}>
          Analytics
        </h4>
        <h4 style={{ cursor: "pointer" }} onClick={() => setActiveSection("realTime")}>
          Reports
        </h4>
      </div>

      {/* Render Components Based on Active Section */}
      {activeSection === "dashboard" && <Overview />}
      {activeSection === "equipment" && <Equipment />}
      {activeSection === "analytics" && <Analytics />}
      {activeSection === "realTime" && <Reports />}
    </div>
  );
};

export default withRouter(Dubai); // Wrap withRouter to inject location and history props