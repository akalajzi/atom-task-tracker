'use babel';

import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';

export default class ActiveTaskDescription extends Component {
  static propTypes = {
    activeTask: PropTypes.object.isRequired,
  };

  handleInput(ev) {
    console.log('typing inside description box');
  }

  render() {
    const {props} = this;

    return(
      <div className='at-description'>
        <textarea
          onInput={this.handleInput.bind(this)}
          class='input-textarea description' placeholder='Task description'
        ></textarea>
      </div>
    );
  }

}
