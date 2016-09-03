'use babel';

import React, {PropTypes} from 'react';

function ActiveTaskEmpty(props) {

  return(
    <div className='empty-container'>
      <div className='message'>
        {props.message}
      </div>
    </div>
  );
}

ActiveTaskEmpty.propTypes = {
  message: PropTypes.string,
}

export default ActiveTaskEmpty;
