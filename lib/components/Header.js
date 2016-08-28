'use babel';

import React, {PropTypes} from 'react';

function Header(props) {
  return (
    <div className='header'>
      <h1>Task Tracker</h1>
      <button
        className='btn icon icon-chevron-right'
        onClick={ props.onClose }
      ></button>
    </div>
  );
}

Header.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Header;
