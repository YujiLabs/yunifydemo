import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import plants from './plants'; // Import plant data
import s from './am4chartMap.module.scss';
import { withRouter } from 'react-router-dom'; // Import withRouter for routing

class Am4chartMap extends Component {
  componentDidMount() {
    // Create map instance
    let map = am4core.create("map", am4maps.MapChart);
    map.geodata = am4geodata_worldLow;
    map.percentHeight = 90;
    map.dy = 10;
    map.projection = new am4maps.projections.Miller();

    // Create polygon series for the world map
    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;

    // Styling the country polygons
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#4A4A89");
    polygonTemplate.stroke = am4core.color("#6979C9");

    // Hover effect on countries
    let hoverState = polygonTemplate.states.create("hover");
    hoverState.properties.fill = am4core.color("#354D84");

    // Create marker series for H₂ plants
    let plantSeries = map.series.push(new am4maps.MapImageSeries());
    plantSeries.data = plants;
    plantSeries.dataFields.value = "status";

    let plant = plantSeries.mapImages.template;
    plant.nonScaling = true;
    plant.propertyFields.latitude = "latitude";
    plant.propertyFields.longitude = "longitude";

    // Create Circle Markers for plants
    let circle = plant.createChild(am4core.Circle);
    circle.propertyFields.fill = "color";
    circle.strokeWidth = 1;
    circle.tooltipText = "[bold]{plant_number}[/]\n{tooltip}\n[bold]Status:[/] {running_status}";
    circle.propertyFields.radius = "size";

    // Add double-click event listener for navigation
    // Using `this.props.history.push` for navigation with `withRouter` (React Router v5)
    circle.events.on("doublehit", (ev) => {
      const data = ev.target.dataItem.dataContext;
      const plantNumber = data.plant_number;
    
      // Create a mapping from plantNumber to route name
      let routeName;
      switch (plantNumber) {
        case "PLANT-001":
          routeName = "gujarat";
          break;
        case "PLANT-002":
          routeName = "dubai";
          break;
        case "PLANT-005":
          routeName = "paris";
          break;
        default:
          routeName = plantNumber.toLowerCase();
          break;
      }
    
      // Construct the URL with query parameters
      const url = `/app/components/dubai#/app/components/${routeName}?plantData=${encodeURIComponent(JSON.stringify(data))}`;
    
      window.location.href = url; // Use window.location.href to redirect with query params
    });
    

    // circle.events.on("doublehit", (ev) => {
    //   const data = ev.target.dataItem.dataContext;
    //   const plantNumber = data.plant_number;
    
    //   // Create a mapping from plantNumber to route name
    //   let routeName;
    
    //   switch (plantNumber) {
    //     case "PLANT-001":
    //       routeName = "gujarat"; // Map "PLANT-001" to "gujarat"
    //       break;
    //     case "PLANT-002":
    //       routeName = "dubai"; // Map "PLANT-002" to "dubai"
    //       break;
    //     case "PLANT-003":
    //       routeName = "paris"; // Map "PLANT-003" to "paris"  
    //       break;
    //     default:
    //       routeName = plantNumber.toLowerCase(); // Default to the plant number
    //       break;
    //   }
    
    //   // Ensure only the correct route is appended, without duplication
    //   // Set the location href to the correct URL format
    //   window.location.href = `/app/components/dubai#/app/components/${routeName}`;
    // });
    
    
    // circle.events.on("doublehit", (ev) => {
    //   const data = ev.target.dataItem.dataContext;
    //   const plantNumber = data.plant_number;
    
    //   // Navigate to the correct route based on plant number and pass plantData via history
    //   if (plantNumber === "PLANT-002" || plantNumber === "PLANT-005" || plantNumber === "PLANT-001") {
    //     this.props.history.push({
    //       pathname: `/app/components/${plantNumber.toLowerCase()}`,
    //       state: { plantData: data } // Pass plantData as state
    //     });
    //   } else {
    //     this.props.history.push({
    //       pathname: `/app/components/plant`,
    //       state: { plantData: data } // Pass plantData as state
    //     });
    //   }
    // });
    
    // circle.events.on("doublehit", (ev) => {
    //   const data = ev.target.dataItem.dataContext;
    //   const plantNumber = data.plant_number;

    //   // Navigate to the correct route based on plant number
    //   if (plantNumber === "Dubai" || plantNumber === "Paris" || plantNumber === "Gujarat") {
    //     this.props.history.push(`/app/components/${plantNumber.toLowerCase()}`);
    //   } else {
    //     this.props.history.push(`/app/components/plant?plant=${plantNumber}`);
    //   }
    // });

    // Hover effect on markers
    let circleHoverState = circle.states.create("hover");
    circleHoverState.properties.scale = 1.5;

    // Add zoom control
    map.zoomControl = new am4maps.ZoomControl();
    map.zoomControl.layout = 'horizontal';
    map.zoomControl.align = 'left';
    map.zoomControl.valign = 'bottom';
    map.zoomControl.dy = -10;

    this.map = map;
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }

  render() {
    return (
      <div className={s.mapChart}>
        <div className={s.stats}></div>
        <div className={s.map} id="map">
          <span>Alternative content for the map</span>
        </div>
      </div>
    );
  }
}

export default withRouter(Am4chartMap); // Wrap withRouter to gain access to history


// import React, { Component } from 'react';
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4maps from "@amcharts/amcharts4/maps";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
// import plants from './plants'; // Import plant data
// import s from './am4chartMap.module.scss';
// import { withRouter } from 'react-router-dom'; // Import `withRouter` for routing

// class Am4chartMap extends Component {
//   componentDidMount() {
//     // Create map instance
//     let map = am4core.create("map", am4maps.MapChart);
//     map.geodata = am4geodata_worldLow;
//     map.percentHeight = 90;
//     map.dy = 10;
//     map.projection = new am4maps.projections.Miller();

//     // Create polygon series for the world map
//     let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
//     polygonSeries.useGeodata = true;

//     // Styling the country polygons
//     let polygonTemplate = polygonSeries.mapPolygons.template;
//     polygonTemplate.tooltipText = "{name}";
//     polygonTemplate.fill = am4core.color("#4A4A89");
//     polygonTemplate.stroke = am4core.color("#6979C9");

//     // Hover effect on countries
//     let hoverState = polygonTemplate.states.create("hover");
//     hoverState.properties.fill = am4core.color("#354D84");

//     // Create marker series for H₂ plants
//     let plantSeries = map.series.push(new am4maps.MapImageSeries());
//     plantSeries.data = plants;
//     plantSeries.dataFields.value = "status";

//     let plant = plantSeries.mapImages.template;
//     plant.nonScaling = true;
//     plant.propertyFields.latitude = "latitude";
//     plant.propertyFields.longitude = "longitude";

//     // Create Circle Markers for plants
//     let circle = plant.createChild(am4core.Circle);
//     circle.propertyFields.fill = "color";
//     circle.strokeWidth = 1;
//     circle.tooltipText = "[bold]{plant_number}[/]\n{tooltip}\n[bold]Status:[/] {running_status}";
//     circle.propertyFields.radius = "size";

//     // Add double-click event listener for navigation
//     // Inside your Am4chartMap or any other component where you want to handle the click event


//     // Inside your Am4chartMap component

// // Inside Am4chartMap.js

// circle.events.on("doublehit", function (ev) {
//   const data = ev.target.dataItem.dataContext;
//   const plantNumber = data.plant_number;

//   // Pass the data based on plant number
//   if (plantNumber === "Dubai" || plantNumber === "Paris" || plantNumber === "PLANT-001") {
//     window.location.href = `/app/components/${plantNumber.toLowerCase()}`;
//   } else {
//     window.location.href = `/app/components/plant?plant=${plantNumber}`;
//   }
// });





//     // circle.events.on("doublehit", (ev) => {
//     //   const data = ev.target.dataItem.dataContext;
//     //   const plantNumber = data.plant_number;

//     //   // Navigate to the plant details page, passing plant data via history.push
//     //   this.props.history.push({
//     //     pathname: `/app/components/plant`,
//     //     state: {
//     //       plantData: data
//     //     }
//     //   });
//     // });

//     // Hover effect on markers
//     let circleHoverState = circle.states.create("hover");
//     circleHoverState.properties.scale = 1.5;

//     // Add zoom control
//     map.zoomControl = new am4maps.ZoomControl();
//     map.zoomControl.layout = 'horizontal';
//     map.zoomControl.align = 'left';
//     map.zoomControl.valign = 'bottom';
//     map.zoomControl.dy = -10;

//     this.map = map;
//   }

//   componentWillUnmount() {
//     if (this.map) {
//       this.map.dispose();
//     }
//   }

//   render() {
//     return (
//       <div className={s.mapChart}>
//         <div className={s.stats}></div>
//         <div className={s.map} id="map">
//           <span>Alternative content for the map</span>
//         </div>
//       </div>
//     );
//   }
// }

// export default withRouter(Am4chartMap); // Wrap withRouter to gain access to history


// import React, { Component } from 'react';
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4maps from "@amcharts/amcharts4/maps";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
// import plants from './plants'; // Import plant data
// import s from './am4chartMap.module.scss';

// class Am4chartMap extends Component {
//   componentDidMount() {
//     // Create map instance
//     let map = am4core.create("map", am4maps.MapChart);
//     map.geodata = am4geodata_worldLow;
//     map.percentHeight = 90;
//     map.dy = 10;
//     map.projection = new am4maps.projections.Miller();

//     // Create polygon series for the world map
//     let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
//     polygonSeries.useGeodata = true;

//     // Styling the country polygons
//     let polygonTemplate = polygonSeries.mapPolygons.template;
//     polygonTemplate.tooltipText = "{name}";
//     polygonTemplate.fill = am4core.color("#4A4A89");
//     polygonTemplate.stroke = am4core.color("#6979C9");

//     // Hover effect on countries
//     let hoverState = polygonTemplate.states.create("hover");
//     hoverState.properties.fill = am4core.color("#354D84");

//     // Create marker series for H₂ plants
//     let plantSeries = map.series.push(new am4maps.MapImageSeries());
//     plantSeries.data = plants;
//     plantSeries.dataFields.value = "status";

//     let plant = plantSeries.mapImages.template;
//     plant.nonScaling = true;
//     plant.propertyFields.latitude = "latitude";
//     plant.propertyFields.longitude = "longitude";

//     // Create Circle Markers for plants
//     let circle = plant.createChild(am4core.Circle);
//     circle.propertyFields.fill = "color";
//     circle.strokeWidth = 1;
//     circle.tooltipText = "[bold]{plant_number}[/]\n{tooltip}\n[bold]Status:[/] {running_status}";
//     circle.propertyFields.radius = "size";

//     // Add double-click event listener for navigation
//     circle.events.on("doublehit", function (ev) {
//       const data = ev.target.dataItem.dataContext;
//       const plantNumber = data.plant_number;

//       // Navigate to the plant details page
//       window.location.href = `http://localhost:3000/#/app/components/plant?plant=${plantNumber}`;
//     });

//     // Hover effect on markers
//     let circleHoverState = circle.states.create("hover");
//     circleHoverState.properties.scale = 1.5;

//     // Add zoom control
//     map.zoomControl = new am4maps.ZoomControl();
//     map.zoomControl.layout = 'horizontal';
//     map.zoomControl.align = 'left';
//     map.zoomControl.valign = 'bottom';
//     map.zoomControl.dy = -10;

//     this.map = map;
//   }

//   componentWillUnmount() {
//     if (this.map) {
//       this.map.dispose();
//     }
//   }

//   render() {
//     return (
//       <div className={s.mapChart}>
//         <div className={s.stats}></div>
//         <div className={s.map} id="map">
//           <span>Alternative content for the map</span>
//         </div>
//       </div>
//     );
//   }
// }

// export default Am4chartMap;


// import React, { Component } from 'react';
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4maps from "@amcharts/amcharts4/maps";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
// import plants from './plants'; // Updated plant data
// import s from './am4chartMap.module.scss';

// class Am4chartMap extends Component {
//   componentDidMount() {
//     let map = am4core.create("map", am4maps.MapChart);
//     map.geodata = am4geodata_worldLow;
//     map.percentHeight = 90;
//     map.dy = 10;
//     map.projection = new am4maps.projections.Miller();

//     // Polygon series for countries
//     let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
//     polygonSeries.useGeodata = true;

//     // Polygon styling
//     let polygonTemplate = polygonSeries.mapPolygons.template;
//     polygonTemplate.tooltipText = "{name}";
//     polygonTemplate.fill = am4core.color("#4A4A89");
//     polygonTemplate.stroke = am4core.color("#6979C9");
//     let hoverState = polygonTemplate.states.create("hover");
//     hoverState.properties.fill = am4core.color("#354D84");

//     // Marker series for H₂ plants
//     let plantSeries = map.series.push(new am4maps.MapImageSeries());
//     plantSeries.data = plants;
//     plantSeries.dataFields.value = "status";

//     let plant = plantSeries.mapImages.template;
//     plant.nonScaling = true;
//     plant.propertyFields.latitude = "latitude";
//     plant.propertyFields.longitude = "longitude";

//     // Circle markers
//     let circle = plant.createChild(am4core.Circle);
//     circle.propertyFields.fill = "color";
//     circle.strokeWidth = 1;
//     circle.tooltipText = "[bold]{plant_number}[/]\n{tooltip}\n[bold]Status:[/] {running_status}";
//     circle.propertyFields.radius = "size";

//     // Hover state for circles
//     let circleHoverState = circle.states.create("hover");
//     circleHoverState.properties.scale = 1.5;

//     // Zoom control
//     map.zoomControl = new am4maps.ZoomControl();
//     map.zoomControl.layout = 'horizontal';
//     map.zoomControl.align = 'left';
//     map.zoomControl.valign = 'bottom';
//     map.zoomControl.dy = -10;

//     this.map = map;
//   }

//   componentWillUnmount() {
//     if (this.map) {
//       this.map.dispose();
//     }
//   }

//   render() {
//     return (
      
     
//       <div className={s.mapChart}>
//         <div className={s.stats}></div>
//         <div className={s.map} id="map">
//           <span>Alternative content for the map</span>
//         </div>
         
//       </div>
    
     
//     );
//   }
// }

// export default Am4chartMap;
