import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Progress, Alert } from "reactstrap";
import { withRouter } from "react-router-dom";
import { dismissAlert } from "../../actions/alerts";
import s from "./Sidebar.module.scss";
import LinksGroup from "./LinksGroup";

import { changeActiveSidebarItem } from "../../actions/navigation";
import { logoutUser } from "../../actions/user";
import HomeIcon from "../Icons/SidebarIcons/HomeIcon";
import ComponentsIcon from "../Icons/SidebarIcons/ComponentsIcon";
import EquipmentIcon from "../Icons/SidebarIcons/EquipmentIcon";
import AdminIcon from "../Icons/SidebarIcons/AdminIcon";
import WorkflowIcon from "../Icons/SidebarIcons/WorkflowIcon";
import ReportsIcon from "../Icons/SidebarIcons/ReportsIcon";
import ConfigurationIcon from "../Icons/SidebarIcons/ConfigurationIcon";
import AppStoreIcon from "../Icons/SidebarIcons/AppStoreIcon";
import avatar from "../../assets/people/logo1.jpg";


class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    activeItem: "",
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener(
      "transitionend",
      () => {
        if (this.props.sidebarOpened) {
          this.element.classList.add(s.sidebarOpen);
        }
      },
      false
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarOpened !== this.props.sidebarOpened) {
      if (nextProps.sidebarOpened) {
        this.element.style.height = `${this.element.scrollHeight}px`;
      } else {
        this.element.classList.remove(s.sidebarOpen);
        setTimeout(() => {
          this.element.style.height = "";
        }, 0);
      }
    }
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <nav
        className={cx(s.root)}
        ref={(nav) => {
          this.element = nav;
        }}
      >
        <header className={s.logo}>
        {/* <img src={avatar} alt="..."  height={20} width={20}/> */}
          <a href="https://www.yuji.co.in/">
            Yuji <span className="fw-bold">Labs</span>
          </a>
        </header>
        <ul className={s.nav}>
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Dashboard"
            isHeader
            iconName={<HomeIcon className={s.menuIcon} />}
            link="/app/main"
            index="main"
          />

          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Plant Dashboard"
            isHeader
            iconName={<ComponentsIcon className={s.menuIcon} />}
            link="/app/components"
            index="components"
            childrenLinks={[
              {
                header: "P-01 Gujarat",
                link: "/app/components/gujarat",
              },
              {
                header: "P-02 Dubai",
                link: "/app/components/dubai",
              },
              {
                header: "P-03 Moscow",
                link: "/app/components/moscow",  
              }, 
              {
                header: "P-04 Los Angeles",
                link: "/app/components/paris",
              },
              {
                header: "P-05 Paris",
                link: "/app/components/plant",
              },
              {
                header: "P-06 Mumbai",
                link: "/app/components/plant",
              },
              {
                header: "P-07 Tokyo",
                link: "/app/components/plant",
              },
              {
                header: "P-08 Sydney",
                link: "/app/components/plant",
              },
              {
                header: "P-09 London",
                link: "/app/components/plant",
              },
              {
                header: "P-10 Nairobi",
                link: "/app/components/plant",
              },
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Equipment"
            isHeader
            iconName={<EquipmentIcon className={s.menuIcon} />}
            link="/app/components"
            index="components"
            childrenLinks={[
                {
                    header: "Electrolyzers",
                    link: "/app/components/plant",
                  },
                  {
                    header: "Rectifiers",
                    link: "/app/components/plant",
                  },
                  {
                    header: "Transformers",
                    link: "/app/components/plant",
                  },
                  {
                    header: "H2 Compressors",
                    link: "/app/components/plant",
                  },
                  {
                    header: "Heat Exchangers",
                    link: "/app/components/plant",
                  },
                  {
                    header: "Water Purifications",
                    link: "/app/components/plant",
                  },
                  {
                    header: "Dryers",
                    link: "/app/components/plant",
                  },
                  {
                    header: "Deoxidizers",
                    link: "/app/components/plant",
                  },
                  {
                    header: "Storage Tanks",
                    link: "/app/components/plant",
                  },
                  {
                    header: "Chillers",
                    link: "/app/components/plant",
                  },
                  {
                    header: "Water Pumps",
                    link: "/app/components/plant",
                  },
                  {
                    header: "Electrolyte Pumps",
                    link: "/app/components/plant",
                  },
            ]}
          />

          <LinksGroup
          onActiveSidebarItemChange={(activeItem) =>
            this.props.dispatch(changeActiveSidebarItem(activeItem))
          }
          activeItem={this.props.activeItem}
          header="App Store"
          isHeader
          iconName={<HomeIcon className={s.menuIcon} />}
          link="/app/main/appstore"  // ✅ Make sure the link matches the route
          index="appstore"
        />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Configuration
"
            isHeader
            iconName={<ConfigurationIcon className={s.menuIcon} />}
            link="/app/main/configuration"
            index="main"
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Reports"
            isHeader
            iconName={<ReportsIcon  className={s.menuIcon} />}
            link="/app/main/reports"
            index="main"
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Workflows"
            isHeader
            iconName={<WorkflowIcon className={s.menuIcon} />}
            link="/app/main/workflow"
            index="main"
          />
          <LinksGroup
            onActiveSidebarItemChange={(activeItem) =>
              this.props.dispatch(changeActiveSidebarItem(activeItem))
            }
            activeItem={this.props.activeItem}
            header="Admin"
            isHeader
            iconName={<AdminIcon className={s.menuIcon} />}
            link="/app/main/admin"
            index="main"
          />
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
