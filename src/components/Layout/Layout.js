import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Hammer from 'rc-hammerjs';

import UIIcons from '../../pages/components/icons';
import UINotifications from '../../pages/notifications';
import TablesStatic from '../../pages/tables/static';
import MapsGoogle from '../../pages/components/maps/google';
import CoreTypography from '../../pages/typography';

import Dashboard from '../../pages/dashboard';

import Header from '../Header';
import Sidebar from '../Sidebar';
import BreadcrumbHistory from '../BreadcrumbHistory';
import { openSidebar, closeSidebar } from '../../actions/navigation';
import s from './Layout.module.scss';
import DeviceDashboard from '../../pages/components/Equipment/DeviceDashboard';
import AppStoreDashboard from '../../pages/appstore/AppStoreDashboard';
import WorkflowDashboard from '../../pages/workflow/WorkflowDashboard';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import ConfigurationDashboard from '../../pages/configuration/ConfigurationDashboard';
import ReportsDashboard from '../../pages/reports/ReportsDashboard';
import Dubai from '../../pages/components/dubai/Dubai';
import Gujarat from '../../pages/components/gujarat/Gujarat';
import Paris from '../../pages/components/paris/Paris';






class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
  };
  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
  }


  handleSwipe(e) {
    if ('ontouchstart' in window) {
      if (e.direction === 4 && !this.state.chatOpen) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }

      this.setState({ chatOpen: e.direction === 2 });
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          'sidebar-' + this.props.sidebarPosition,
          'sidebar-' + this.props.sidebarVisibility,
        ].join(' ')}
      >
        <div className={s.wrap}>
          <Header />
          {/* <Chat chatOpen={this.state.chatOpen} /> */}
          {/* <Helper /> */}
          <Sidebar />
          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <BreadcrumbHistory url={this.props.location.pathname} />
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route path="/app/main" exact render={() => <Redirect to="/app/main/dashboard" />} />
                        <Route path="/app/main/dashboard" exact component={Dashboard} />
                        
                    <Route path="/app/components/icons" exact component={UIIcons} />
                    <Route path="/app/notifications" exact component={UINotifications} />
                  
<Route path="/app/main/appstore" exact render={() => <Redirect to="/app/main/appstore/dashboard" />} />
<Route path="/app/main/appstore/dashboard" exact component={AppStoreDashboard} />


<Route path="/app/main/configuration" exact render={() => <Redirect to="/app/main/configuration/dashboard" />} />
<Route path="/app/main/configuration/dashboard" exact component={ConfigurationDashboard} />

<Route path="/app/main/reports" exact render={() => <Redirect to="/app/main/reports/dashboard" />} />
<Route path="/app/main/reports/dashboard" exact component={ReportsDashboard} />

<Route path="/app/main/workflow" exact render={() => <Redirect to="/app/main/workflow/dashboard" />} />
<Route path="/app/main/workflow/dashboard" exact component={WorkflowDashboard} />

<Route path="/app/main/admin" exact render={() => <Redirect to="/app/main/admin/dashboard" />} />
<Route path="/app/main/admin/dashboard" exact component={AdminDashboard} />
               
                    <Route path="/app/components/gujarat" exact component={Gujarat} />
                    <Route path="/app/components/dubai" exact component={Dubai} />
                    <Route path="/app/components/paris" exact component={Paris} />
                 


                    <Route path="/device/:id" exact component={DeviceDashboard} />
                 


                   



                    <Route path="/app/tables" exact component={TablesStatic} />
                    <Route path="/app/components/maps" exact component={MapsGoogle} />
                    <Route path="/app/typography" exact component={CoreTypography} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              <footer className={s.contentFooter}>
              
              </footer>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarPosition: store.navigation.sidebarPosition,
    sidebarVisibility: store.navigation.sidebarVisibility,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
