'use babel';

import React, {PropTypes} from 'react';
import * as actions from '../actions';

function Header(props) {

  const title = props.activeTask
    ? 'Active: ' + props.activeTask.name
    : 'Task Tracker - select task';

  const button = () => {
    if (props.activeTask) {
      return(
        <button
          className='btn icon icon-mail-reply'
          onClick={actions.unsetActive}
          >
        </button>
      );
    } else {
      return(
        <button
          className='btn icon icon-chevron-right'
          onClick={ props.closePanel }
        ></button>
      );
    }
  }

  return (
    <div className='header'>
      <h1>{title}</h1>
      { button() }
    </div>
  );
}

Header.propTypes = {
  closePanel: PropTypes.func.isRequired,
  activeTask: PropTypes.object,
};

export default Header;
