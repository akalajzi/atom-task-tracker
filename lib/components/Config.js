'use babel';

import React, {Component, PropTypes} from 'react';

export default class Config extends Component {
  static propTypes = {
    //
  }

  render() {
    return(
      <div className='config-container'>
        <div className='config-group'>
          <div className='description'>Task tracker panel width</div>
          <div className='controls'>
            <div className='block'>
              <div className='btn-group'>
                  <button className='btn btn80 selected'>Narrow</button>
                  <button className='btn btn80'>Wide</button>
              </div>
            </div>
          </div>
        </div>
        <div className='config-group'>
          <div className='description'>Search patterns</div>
          <div className='controls'>
            <label className='input-label'>
              <input className='input-checkbox' type='checkbox' checked /> TODO:
            </label>
            <label className='input-label'>
              <input className='input-checkbox' type='checkbox' checked /> FIXME:
            </label>
            <label className='input-label'>
              <input className='input-checkbox' type='checkbox' /> console.log
            </label>
          </div>
        </div>
      </div>
    );
  }
}
