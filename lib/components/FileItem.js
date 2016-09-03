'use babel';

import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';
import * as util from '../util';

export default class FileItem extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    isCurrentlyActive: PropTypes.bool.isRequired,
  };

  stopTracking(file) {
    actions.removeFile(this.props.file.path);
  }

  handleOpenFile(path) {
    atom.workspace.open(path);
  }

  render() {
    const {props} = this;

    let cssClasses = 'at-file-item';
    cssClasses += props.isCurrentlyActive ? ' selected highlight' : '';

    return(
      <div className={cssClasses}>
        <span
          onClick={this.stopTracking.bind(this)}
          className='icon icon-remove-close text-error clickable'
        ></span>
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
