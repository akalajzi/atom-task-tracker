'use babel';

import React, {Component, PropTypes} from 'react';

export default class ActiveTaskContainer extends Component {
  static propTypes = {
    onClose: PropTypes.func, // closing task - going to tasklist
  };

  constructor() {
    super();
  }

  render() {
    const {props} = this;

    return(
      <div className="active-task">
        <div className="">active task</div>
      </div>
    );
  }
}
