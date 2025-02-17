import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';

const PlantDetails = () => {
  // Get the query string from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Parse the plantData from query params
  const plantData = JSON.parse(decodeURIComponent(queryParams.get('plantData')));

  if (!plantData) {
    return <div>No plant data available</div>;
  }

  return (
    <div>
      <h1>Plant Details</h1>
      <p><strong>Plant Number:</strong> {plantData.plant_number}</p>
      <p><strong>Tooltip:</strong> {plantData.tooltip}</p>
      <p><strong>Status:</strong> {plantData.status}</p>
      <p><strong>H2 Production:</strong> {plantData.h2_production}</p>
      <p><strong>Efficiency:</strong> {plantData.efficiency}%</p>
      <p><strong>Technology:</strong> {plantData.technology}</p>
    </div>
  );
}

export default PlantDetails;


// import React, { Component } from 'react';

// class PlantDetails extends Component {
//   render() {
//     const { plantData } = this.props.location.state || {}; // Retrieve plant data

//     if (!plantData) {
//       return <div>No plant data available</div>;
//     }

//     return (
//       <div>
//         <h1>Plant Details</h1>
//         <p><strong>Plant Number:</strong> {plantData.plant_number}</p>
//         <p><strong>Tooltip:</strong> {plantData.tooltip}</p>
//         <p><strong>Status:</strong> {plantData.status}</p>
//         <p><strong>H2 Production:</strong> {plantData.h2_production}</p>
//         <p><strong>Efficiency:</strong> {plantData.efficiency}%</p>
//         <p><strong>Technology:</strong> {plantData.technology}</p>
//       </div>
//     );
//   }
// }

// export default PlantDetails;
