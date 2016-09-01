'use babel';

import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';

export default class FileItem extends Component {
  static propTypes = {
    file: PropTypes.string.isRequired,
  };

  render() {
    const {props} = this;

    return(
      <div className='at-file-item'>
        Ime fajla: {props.file}
      </div>
    );
  }
}
