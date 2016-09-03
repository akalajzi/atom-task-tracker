'use babel';

import React, {Component, PropTypes} from 'react';
import * as util from '../util';
import * as actions from '../actions';

export default class CurrentlyEditing extends Component {
  static propTypes = {
    path: PropTypes.string,
    startTracking: PropTypes.func,
    stopTracking: PropTypes.func,
  };

  render() {
    const {props} = this;

    const file = util.splitPathnameAndFilename(props.path);
    const isFileTracked = actions.isFileTracked(props.path);

    return(
      <div className='currently-editing-file'>
        <div className='track-button'>
          {
            isFileTracked &&
            <button
              onClick={props.stopTracking}
              className='btn icon icon-remove-close inline-block-tight'
            ></button>
          }
          {
            !isFileTracked &&
            <button
              onClick={props.startTracking}
              className='btn icon icon-file-add inline-block-tight'
            ></button>
          }
        </div>
        <div className='cpf-name'>
          <div className='cpf-title'>Currently editing:</div>
          <div className='current-pathname'>{file.relativepath}</div>
          <div className='current-filename'>{file.filename}</div>
        </div>

      </div>
    );
  }
}
