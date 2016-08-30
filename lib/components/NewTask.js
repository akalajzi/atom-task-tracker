'use babel';

import React, {Component, PropTypes} from 'react';

export default class NewTask extends Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    verifyInput: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      error: '',
    }
  }

  handleInput(ev) {
    this.setState({
      inputText: ev.target.value,
      error: '',
    });
  }

  handleSubmit(ev) {
    const inputText = this.state.inputText;
    if (inputText.length > 0) {
      if (!this.props.verifyInput(inputText)) {
        this.setState({error: 'Name already taken'});
      } else {
        this.props.onAdd(inputText);
      }
    } else {
      this.setState({error: 'Gotta have name'})
    }
  }

  render() {
    const {props} = this;

    const hasError = this.state.error.length > 0 ? true : false;

    return(
      <div className='new-task-container'>
        <div className="up-holder">
          <span className="add-new-task">+ New Task</span>
        </div>
        <div className="down-holder">
          <span className="input-label">Enter task name</span>
          <button
            onClick={props.onCancel}
            className='btn icon icon-remove-close inline-block-tight'></button>
          <input
            onInput={this.handleInput.bind(this)}
            className='input-text native-key-bindings' type='text' />
          <button
            onClick={this.handleSubmit.bind(this)}
            className='btn btn-primary icon icon-file-add inline-block-tight'></button>
          {
            hasError &&
            <span id='new-task-error' className='text-error'>{this.state.error}</span>
          }

        </div>
      </div>
    );
  }

}
