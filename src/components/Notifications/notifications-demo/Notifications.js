import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';

import s from './ListGroup.module.scss';

import a3 from '../../../assets/people/a3.jpg';
import a5 from '../../../assets/people/a5.jpg';

class NotificationsDemo extends React.Component {
  render() {
    return (
      <ListGroup className={[s.listGroup, 'thin-scroll'].join(' ')}>
        <ListGroupItem className={s.listGroupItem}>
          <span className={[s.notificationIcon, 'thumb-sm'].join(' ')}>
            <img className="rounded-circle" src={a3} alt="..." />
          </span>
          <p className="m-0 overflow-hidden">
             just signed up! 
            {/* eslint-disable */}
           
            {/* eslint-enable */}
            <time className="help-block m-0">
              2 mins ago
            </time>
          </p>
        </ListGroupItem>
        <ListGroupItem className={s.listGroupItem}>
          <span className={[s.notificationIcon, 'thumb-sm'].join(' ')}>
            <i className="glyphicon glyphicon-upload fa-lg" />
          </span>
          <p className="text-ellipsis m-0">
           Plant No. 07 Operation
            <time className="help-block m-0">
              5h ago
            </time>
          </p>
        </ListGroupItem>
       
        <ListGroupItem className={s.listGroupItem}>
          <span className={[s.notificationIcon, 'thumb-sm'].join(' ')}>
            <img className="rounded-circle" src={a5} alt="..." />
          </span>
          <p className="m-0 overflow-hidden">
            {/* eslint-disable */}
            Plant No 03, Shut-Down Requested
            {/* eslint-enable */}
            &nbsp;&nbsp;
            <Button size="xs" color="success" className="mr-1">Allow</Button>
            <Button size="xs" color="danger">Deny</Button>
            <time className="help-block m-0">
              12:18 AM
            </time>
          </p>
        </ListGroupItem>
  
      </ListGroup>
    );
  }
}

export default NotificationsDemo;
