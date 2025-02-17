import React from "react";
import { Row, Col, Progress, Table, Label, Input } from "reactstrap";

import Widget from "../../components/Widget";

import Calendar from "./components/calendar/Calendar";
import Map from "./components/am4chartMap/am4chartMap";
import Rickshaw from "./components/rickshaw/Rickshaw";

import AnimateNumber from "react-animated-number";

import s from "./Dashboard.module.scss";

import peopleA1 from "../../assets/people/a1.jpg";
import peopleA2 from "../../assets/people/a2.jpg";
import peopleA5 from "../../assets/people/a5.jpg";
import peopleA4 from "../../assets/people/a4.jpg";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: null,
      checkedArr: [false, false, false],
    };
    this.checkTable = this.checkTable.bind(this);
  }

  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">Global GH2 Dashboard &nbsp;</h1>

        <Row>
          <Col lg={7}>
            <Widget className="bg-transparent">
              <Map />
            </Widget>
          </Col>
          <Col lg={1} />

          <Col lg={4}>
            <Widget
              className="bg-transparent"
              title={
                <h5>
                  <span className="fw-semi-bold">&nbsp;Statistics</span>
                </h5>
              }
              settings
              refresh
              close
            >
              <p>
                Status: <strong>Live</strong>
              </p>
              <p>
                <span className="circle bg-default text-white">
                  <i className="fa fa-map-marker" />
                </span>{" "}
                &nbsp; 10 Countries, 12 Cities
              </p>

              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">
                  Successful Failure Prediction
                  </h6>

                  <Progress
                    color="success"
                    value="93"
                    className="bg-subtle-blue progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={90} />%
                    </small>
                  </span>
                </div>
              </div>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">
                    Remaining Electolyzer Life
                  </h6>

                  <Progress
                    color="primary"
                    value="60"
                    className="bg-subtle-blue progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={75} />%
                    </small>
                  </span>
                </div>
              </div>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Efficiency Improvement</h6>

                  <Progress
                    color="success"
                    value="92"
                    className="bg-subtle-blue progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={92} />%
                    </small>
                  </span>
                </div>
              </div>
            
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Electrolyzer Health</h6>

                  <Progress
                    color="success"
                    value="80"
                    className="bg-subtle-blue progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={80} />%
                    </small>
                  </span>
                </div>
              </div>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Machine Health</h6>

                  <Progress
                    color="success"
                    value="99"
                    className="bg-subtle-blue progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={99} />%
                    </small>
                  </span>
                </div>
              </div>
            </Widget>
<div style={{marginTop:"-40px"}}>
            <Widget
              title={
                <h6>
                  {" "}
                  Grid VS Renewable Power
                </h6>
              }
              close
            >
      

              <div
                className="widget-body mt-xlg chart-overflow-bottom"
                
                style={{ height: "50x",}}
              >
                <Rickshaw height={50} />
              </div>
            </Widget>
            </div>
            {/* 
               <div className={s.mapChart}>
                       <div className={s.stats}></div>
                       <div className={s.map} id="map">
                    
                       </div>
                       <div className={s.legend}>
                         <h6 className="mt-1">Worldwide H₂ Plants</h6>
                         <ul>
                           <li><span className={s.green}></span> Fully Running</li>
                           <li><span className={s.orange}></span> Partially Running</li>
                           <li><span className={s.red}></span> Not Running</li>
                           <li><span className={s.blue}></span> Under Maintenance</li>
                           <li><span className={s.yellow}></span> Critical Errors</li>
                         </ul>
                       </div>
                     </div>
                     */}
          </Col>
        </Row>

        <Row>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> H2 Production</h6>} close settings>
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name">Yearly</h6>
                  <p className="value">1378.0 tonns</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">Monthly</h6>
                  <p className="value">100.7 tonns</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">Last 24h</h6>
                  <p className="value">3.1 tonns</p>
                </div>
              </div>
              <Progress
                color="success"
                value="60"
                className="bg-subtle-blue progress-xs"
              />
              <p>
                <small>
                  <span className="circle bg-default text-white mr-2">
                    <i className="fa fa-chevron-up" />
                  </span>
                </small>
                <span className="fw-semi-bold">&nbsp;17% higher</span>
                &nbsp;than last month
              </p>
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> H2 Production Growth </h6>} close settings>
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name">YoY</h6>
                  <p className="value">15.2 %</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">Montly</h6>
                  <p className="value">- 8.0 %</p>
                </div>
                <div className="stat-item">
                  <h6 className="name">24h</h6>
                  <p className="value">1.7 %</p>
                </div>
              </div>
              <Progress
                color="danger"
                value="60"
                className="bg-subtle-blue progress-xs"
              />
              <p>
                <small>
                  <span className="circle bg-default text-white mr-2">
                    <i className="fa fa-chevron-down" />
                  </span>
                </small>
                <span className="fw-semi-bold">&nbsp;8% lower</span>
                &nbsp;than last month
              </p>
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> Live Alerts & Warnings </h6>} close settings>
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name fs-sm">Trips Issues</h6>
                  <p className="value">104.85%</p>
                </div>
                <div className="stat-item">
                  <h6 className="name fs-sm">Safety Issues</h6>
                  <p className="value">14.29&deg;</p>
                </div>
                <div className="stat-item">
                  <h6 className="name fs-sm">Maintaince Issues</h6>
                  <p className="value">7,211M</p>
                </div>
              </div>
              <Progress
                color="bg-primary"
                value="60"
                className="bg-subtle-blue progress-xs"
              />
              <p>
                <small>
                  <span className="circle bg-default text-white mr-2">
                    <i className="fa fa-plus" />
                  </span>
                </small>
                <span className="fw-semi-bold">&nbsp;Operational Problems</span>
                &nbsp;
              </p>
            </Widget>
          </Col>
        </Row>

        <Row>
          <Col lg={4} xs={12}>
            <Widget
              title={
                <h6>
                  <span className="badge badge-success mr-2">New</span> Alarms
                </h6>
              }
              refresh
              close
            >
              
              <footer className="bg-widget-transparent mt">
                <input
                  type="search"
                  className="form-control form-control-sm bg-custom-dark border-0"
                  placeholder="Search"
                />
              </footer>
            </Widget>
          </Col>

        {/*  <Col lg={4} xs={12}>
            <Widget
              title={
                <h6>
                  {" "}
                  Market <span className="fw-semi-bold">Stats</span>
                </h6>
              }
              close
            >
              <div className="widget-body">
                <h3>$720 Earned</h3>
                <p className="fs-mini text-muted mb mt-sm">
                  Target <span className="fw-semi-bold">$820</span> day earnings
                  is <span className="fw-semi-bold">96%</span> reached.
                </p>
              </div>
              <div className={`widget-table-overflow ${s.table}`}>
                <Table striped size="sm">
                  <thead className="no-bd">
                    <tr>
                      <th>
                        <div className="checkbox abc-checkbox">
                          <Input
                            className="mt-0"
                            id="checkbox210"
                            type="checkbox"
                            onClick={() => this.checkTable(0)}
                            checked={this.state.checkedArr[0]}
                            readOnly
                          />{" "}
                          <Label for="checkbox210" />
                        </div>
                      </th>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="checkbox abc-checkbox">
                          <Input
                            className="mt-0"
                            id="checkbox212"
                            type="checkbox"
                            onClick={() => this.checkTable(1)}
                            checked={this.state.checkedArr[1]}
                            readOnly
                          />{" "}
                          <Label for="checkbox212" />
                        </div>
                      </td>
                      <td>HP Core i7</td>
                      <td className="text-align-right fw-semi-bold">$346.1</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="checkbox abc-checkbox">
                          <Input
                            className="mt-0"
                            id="checkbox214"
                            onClick={() => this.checkTable(2)}
                            type="checkbox"
                            checked={this.state.checkedArr[2]}
                            readOnly
                          />{" "}
                          <Label for="checkbox214" />
                        </div>
                      </td>
                      <td>Air Pro</td>
                      <td className="text-align-right fw-semi-bold">$533.1</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div
                className="widget-body mt-xlg chart-overflow-bottom"
                style={{ height: "100px" }}
              >
                <Rickshaw height={100} />
              </div>
            </Widget>
          </Col>
          */}

          <Col lg={4} xs={12}>
            <Widget
              title={<h6>Plant Activities</h6>}
              settings
              close
              bodyClass={"pt-2 px-0 py-0"}
            >
              <Calendar />
          
            </Widget>
          </Col>

          <Col lg={4} xs={12}>
          <Widget
            title={
              <h6>
                <span className="badge badge-danger mr-2">Upcoming</span> Maintenance
              </h6>
            }
            refresh
            close
          >
            
            <footer className="bg-widget-transparent mt">
              <input
                type="search"
                className="form-control form-control-sm bg-custom-dark border-0"
                placeholder="Search"
              />
            </footer>
          </Widget>
        </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
