'use babel';

import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';

export default class ActiveTaskFiles extends Component {
  static propTypes = {
    activeTask: PropTypes.object.isRequired,
  };

  render() {
    const {props} = this;

    return(
      <div className='at-files'>
        <div className='at-files-header'>
          <div className='title'> Tracked files</div>
          <div className='controls pull-right'>
            <button
              className='btn icon icon-heart inline-block-tight'
            ></button>
          </div>
        </div>
        <div className='at-files-list'>
          here be list of files
        </div>
      </div>
    );
  }
}
