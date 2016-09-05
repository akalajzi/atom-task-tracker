'use babel';

import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';

class Header extends Component {
  static propTypes = {
    closePanel: PropTypes.func.isRequired,
    activeTask: PropTypes.object,
  };

  render() {
    const {props} = this;

    const title = props.activeTask
      ? 'Active: ' + props.activeTask.name
      : 'Task Tracker';

    const closeButton = () => {
      if (props.activeTask) {
        return(
          <button
            className='btn icon icon-mail-reply inline-block-tight'
            onClick={actions.unsetActive}
            >
          </button>
        );
      } else {
        return(
          <button
            className='btn icon icon-chevron-right inline-block-tight'
            onClick={ props.closePanel }
          ></button>
        );
      }
    }

    return (
      <div className='header'>
        <h1>{title}</h1>
        <div className='controls'>
          <HeaderDropdown />
          { closeButton() }
        </div>
      </div>
    );
  }
}


class HeaderDropdown extends Component {
  // static propTypes = {
  //
  // };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  toggleMenu() {
    newState = {open: !this.state.open};
    this.setState(newState);
  }

  closeMenu() {
    this.setState({open: false});
  }

  handleSave() {
    atom.emitter.emit('task-tracker:ensure-save');
    this.closeMenu();
  }

  handleSizeChange(size) {
    actions.setPanelSize(size);
    this.closeMenu();
  }

  render() {
    const selectedClass = this.state.open ? ' selected' : '';
    const buttonCss = 'btn icon icon-tools inline-block-tight' + selectedClass;
    const hiddenClass = this.state.open ? '' : ' hidden';
    const menuCss = 'dd-menu' + hiddenClass;
    const currentSize = actions.getPanelSize();

    const isActiveClass = (test) => {
      return (test === currentSize) ? 'icon icon-check' : 'blank-icon';
    }

    return(
      <div className='dd-header-dropdown'>
        <button
          className={buttonCss}
          onClick={this.toggleMenu.bind(this)}
          />
        <div className={menuCss}>
          <div className='dd-menu-item'
            onClick={this.handleSave.bind(this)}
            >
            <span className='blank-icon'>Save</span>
          </div>
          <div className='dd-menu-divider'></div>
          <div className='dd-menu-item'
            onClick={this.handleSizeChange.bind(this, 'narrow')}
            >
            <span className={isActiveClass('tt-narrow')}>Narrow</span>
          </div>
          <div className='dd-menu-item'
            onClick={this.handleSizeChange.bind(this, 'wide')}
            >
            <span className={isActiveClass('tt-wide')}>Wide</span>
          </div>
        </div>
      </div>
    );
  }
}

export {
  Header,
  HeaderDropdown
}
