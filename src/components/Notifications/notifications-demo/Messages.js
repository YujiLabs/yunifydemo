import React from 'react';
import {
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import a1 from '../../../assets/people/a1.jpg';
import a2 from '../../../assets/people/a2.jpg';
import a4 from '../../../assets/people/a4.jpg';
import a6 from '../../../assets/people/a6.jpg';
import avatar from '../../../assets/avatar.png';

import s from './ListGroup.module.scss'; // eslint-disable-line

class MessagesDemo extends React.Component {
  render() {
    return (
      <ListGroup className={[s.listGroup, 'thin-scroll'].join(' ')}>
        <ListGroupItem className={[s.listGroupItem].join(' ')}>
          <span className={[s.notificationIcon, 'thumb-sm'].join(' ')}>
            <img className="rounded-circle" src={a2} alt="..." />
            <i className="status status-bottom bg-success" />
          </span>
          <time className="text-link help float-right">10 sec ago</time>
          <h6 className="m-0 fw-bold mb-1">Deeparnak</h6>
          <p className="deemphasize text-ellipsis m-0">Hey! What&apos;s up? So many times since we</p>
        </ListGroupItem>

      </ListGroup>
    );
  }
}

export default MessagesDemo;
