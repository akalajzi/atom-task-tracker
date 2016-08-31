'use babel';

import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';
import _ from 'underscore-plus';

export default class ActiveTaskDescription extends Component {
  static propTypes = {
    activeTask: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      textvalue: '',
    }
  }

  handleInput(ev) {
    this.setState({textvalue: ev.target.value});
    this.saveDescription();
  }

  saveDescription = _.debounce(() => {
    actions.setATDescription(this.state.textvalue);
  }, 600);

  render() {
    const {props} = this;

    return(
      <div className='at-description'>
        <textarea
          onInput={this.handleInput.bind(this)}
          defaultValue={props.activeTask.description}
          className='input-textarea description native-key-bindings'
          placeholder='Task description'
        ></textarea>
      </div>
    );
  }

}
