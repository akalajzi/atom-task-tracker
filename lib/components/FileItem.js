'use babel';

import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';
import * as util from '../util';

export default class FileItem extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
  };

  stopTracking(file) {
    actions.removeFile(this.props.file.path);
  }

  handleOpenFile(path) {
    atom.workspace.open(path);
  }

  render() {
    const {props} = this;

    return(
      <div className='at-file-item'>
        <span
          onClick={this.stopTracking.bind(this)}
          className='icon icon-remove-close text-error clickable'
        ></span>
      <div className='filelist-pathname'>{props.file.relativepath}</div>
        <div
          className='filelist-filename clickable'
          onClick={this.handleOpenFile.bind(null, props.file.path)}
          >
          {props.file.filename}
        </div>
      </div>
    );
  }
}
