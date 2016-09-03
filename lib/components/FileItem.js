'use babel';

import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';
import * as util from '../util';

export default class FileItem extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  };

  stopTracking(path) {
    actions.removeFile(this.props.path);
  }

  render() {
    const {props} = this;

    const file = util.splitPathnameAndFilename(props.path);

    return(
      <div className='at-file-item'>
        <button
          onClick={this.stopTracking.bind(this)}
          className='btn btn-xs icon icon-remove-close inline-block-tight'
        ></button>
        <div className='filelist-pathname'>{file.relativepath}</div>
        <div className='filelist-filename'>{file.filename}</div>
      </div>
    );
  }
}
