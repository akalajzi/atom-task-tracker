'use babel';

import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';

export default class Config extends Component {
  static propTypes = {
    //
  }

  handleSizeChange(size) {
    actions.setPanelSize(size);
  }

  handleSearchPatternToggle(key, ev) {
    const searchPatterns = actions.getSearchPatterns();
    const modifiedPatterns = searchPatterns.map((pattern) => {
      if (pattern.key === key) {
        pattern.checked = ev.target.checked;
      }
      return pattern;
    });
    actions.saveSearchPatterns(modifiedPatterns);
  }

  render() {
    const currentSize = actions.getPanelSize();
    const searchPatterns = actions.getSearchPatterns();

    const isSelected = (test) => {
      return (test === currentSize) ? ' selected' : '';
    }
    const narrowCss = 'btn btn80' + isSelected('tt-narrow');
    const wideCss = 'btn btn80' + isSelected('tt-wide');

    return(
      <div className='config-container'>
        <div className='config-group'>
          <div className='description'>Task tracker panel width</div>
          <div className='controls'>
            <div className='block'>
              <div className='btn-group'>
                  <button
                    className={narrowCss}
                    onClick={this.handleSizeChange.bind(this, 'narrow')}
                    >Narrow</button>
                  <button
                    className={wideCss}
                    onClick={this.handleSizeChange.bind(this, 'wide')}
                    >Wide</button>
              </div>
            </div>
          </div>
        </div>
        <div className='config-group'>
          <div className='description'>Search patterns</div>
          <div className='controls'>
            {
              searchPatterns.map((pattern) => {
                return(
                  <label className='input-label' key={pattern.key}>
                    <input
                      className='input-checkbox'
                      type='checkbox'
                      onChange={this.handleSearchPatternToggle.bind(this, pattern.key)}
                      defaultChecked={pattern.checked}
                      /> {pattern.displayName}
                  </label>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
