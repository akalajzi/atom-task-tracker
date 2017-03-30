'use babel';

import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';
import * as util from '../util';
import taskStore from '../task-store';

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

  handleLSClick() {
    // const state = taskStore.get();
    const state = actions.getInitialState();
    util.restartStorage(state);
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

        <div className='config-group hidden'>
          <div className='description'></div>
          <div className='controls'>
            <label className='input-label'>
              <input className='input-toggle' type='checkbox' defaultChecked /> Show file tree
            </label>
          </div>
        </div>

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

        <div className='config-group'>
          <div className='description'>Empty local storage</div>
          <div className='controls'>
            <div className='blocks'>
              <div className='inline-block'>
                <button
                  className='btn btn-error inline-block-tight'
                  onClick={this.handleLSClick.bind(this)}
                >Delete</button>
              </div>
              <div className='inline-block'>Delete local storage</div>
              <div className='warning'><span className='text-error'>WARNING:</span> this will delete all tasks.
                Use only if plugin doesnt work if localstorage gets messed up</div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
