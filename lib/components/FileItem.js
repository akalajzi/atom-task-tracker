'use babel';

import React, {Component, PropTypes} from 'react';
import {CompositeDisposable} from 'atom';
import * as actions from '../actions';
import * as util from '../util';
import taskStore from '../task-store';

export default class FileItem extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    isCurrentlyActive: PropTypes.bool.isRequired,
    todos: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      status: '',
    }

    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.emitter.on('task-tracker:check-git', this.getGitStatus.bind(this))
    );
  }

  componentDidMount() {
    this.getGitStatus();
  }

  componentWillReceiveProps(nextProps) {
    this.getGitStatus();
  }

  componentWillUnmount() {
    this.subscriptions.dispose();
  }

  stopTracking(file) {
    actions.removeFile(this.props.file.path);
  }

  handleOpenFile(path) {
    atom.workspace.open(path);
  }

  isPathInThisRepo(repo, path) {
    wDir = repo.getWorkingDirectory();
    return (path.indexOf(wDir) === 0) ? true : false;
  }

  getGitStatus() {
    let status = '';
    if (!taskStore.git) { return; }
    taskStore.git.forEach((repo) => {
      const path = this.props.file.path;
      if (this.isPathInThisRepo(repo, path)) {
        if (repo.isPathModified(path)) {
          status = ' status-modified';
        } else if (repo.isPathNew(path)) {
          status = ' status-added';
        } else if (repo.isPathIgnored(path)) {
          status = ' status-ignored';
        } else {
          status = '';
        }
      }
    }.bind(this));
    this.setState({status: status});
  }

  render() {
    const {props} = this;

    let divCss = 'at-file-item';
    divCss += props.isCurrentlyActive ? ' selected highlight' : '';
    const fileCss = 'filelist-filename clickable' + this.state.status;

    return(
      <div>
        <div className={divCss}>
          <span
            onClick={this.stopTracking.bind(this)}
            className='icon icon-remove-close text-error clickable'
          ></span>
          <div
            className={fileCss}
            onClick={this.handleOpenFile.bind(null, props.file.path)}
            >
            {props.file.filename}
          </div>
        </div>
        {
          props.todos &&
          props.todos.matches.map((match, index) => {
            return (
              <div key={index} className='todo-item'>
                {match.matchText}
              </div>
            )
          })
        }
      </div>

    );
  }
}
