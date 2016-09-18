'use babel';

import React, {Component, PropTypes} from 'react';
import * as actions from '../actions';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    screen: PropTypes.string.isRequired,
    closePanel: PropTypes.func.isRequired,
    toggleConfig: PropTypes.func,
  };

  render() {
    const {props} = this;

    const closeButton = () => {
      if (props.screen === 'active') {
        return(
          <button
            className='btn icon icon-mail-reply inline-block-tight'
            onClick={actions.unsetActive}
            ></button>
        );
      } else if (props.screen === 'home') {
        return(
          <button
            className='btn icon icon-chevron-right inline-block-tight'
            onClick={ props.closePanel }
          ></button>
        );
      } else if (props.screen === 'config') {
        return(
          <button
            className='btn icon icon-mail-reply inline-block-tight'
            onClick={props.toggleConfig}
            ></button>
        );
      }
    }

    return (
      <div className='header'>
        <div className='title'>{this.props.title}</div>
        <div className='controls'>
          {
            props.screen != 'config' &&
            <button
              className='btn icon icon-tools inline-block-tight'
              onClick={ props.toggleConfig }
              />
          }
          { closeButton() }
        </div>
      </div>
    );
  }
}


class HeaderDropdown extends Component {
  // OBSOLETE NOW, to be removed

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

  toggleTreeView() {
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
          <div className='dd-menu-divider'></div>
          <div className='dd-menu-item'
            onClick={this.toggleTreeView.bind(this)}
            >
            <span className='blank-icon'>Tree view</span>
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
