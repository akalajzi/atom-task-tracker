'use babel';

import React, {Component, PropTypes} from 'react';
import {CompositeDisposable} from 'atom';
import _ from 'underscore-plus';
import FileTree from './FileTree';
import CurrentlyEditing from './CurrentlyEditing';
import ActiveTaskEmpty from './ActiveTaskEmpty';
import * as actions from '../actions';
import * as util from '../util';
import taskStore from '../task-store';

export default class ActiveTaskFiles extends Component {
  static propTypes = {
    activeTask: PropTypes.object.isRequired,
  };

  noPathState = {
    curPath: '',
    disableTracking: true,
  }

  constructor(props) {
    super(props);

    this.state = {
      curPath: '',
      disableTracking: false,
      showLoadGitButton: false,
      projects: null,
    }

    this.git = null;
    this.observer = null;
    this.subscriptions = new CompositeDisposable();

    Promise
      .all(atom.project.getDirectories().map(
        atom.project.repositoryForDirectory.bind(atom.project)
      ))
      .then(
        (repos) => {
          if (repos.length === 0) {
            this.state.showLoadGitButton = false;
            return null;
          } else {
            this.state.showLoadGitButton = true;
            taskStore.git = repos;
            this.git = repos;
            this.handleGitListener();
            atom.emitter.emit('task-tracker:check-git');
            // TODO: testing
            console.log(repos[0]);
            repos[0].onDidChangeStatuses(() => {
              console.log('something changed in repo[0]');
            });
            repos[1].onDidChangeStatuses(() => {
              console.log('something changed in repo[1]');
            });
            return repos;
          }
        }
      )
      .catch(
        (e) => {
          atom.notifications.addError('Failed to get repositories.', {detail: e, dismissable: true});
        }
      );

    this.subscriptions.add(
      atom.workspace.onDidChangeActivePaneItem(this.handleChangeActivePane.bind(this))
    );
  }

  componentDidMount() {
    this.handleChangeActivePane();
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.dispose();
    }
    this.subscriptions.dispose();
  }

  handleChangeActivePane() {
    const ae = util.getActiveEditor();
    if (ae) {
      if (ae.getPath()) {
        this.setState({
          curPath: util.getCurrentPath(),
          disableTracking: false,
        });
      }
    } else {
      this.setState(this.noPathState);
    }
  }

  startTracking() {
    actions.addFile(this.state.curPath);
  }

  stopTracking() {
    actions.removeFile(this.state.curPath);
  }

  clearAllTrackedFiles() {
    actions.removeAllFiles();
  }

  loadGitModifiedFiles() {
    for (let repo of this.git) {
      let innerRepo = repo.repo;
      for (let filePath of Object.keys(innerRepo.getStatus())) {
        if (innerRepo.isPathModified(filePath) || innerRepo.isPathNew(filePath)) {
          actions.addFile(innerRepo.getWorkingDirectory() + util.getDirDelimiter() + filePath);
        }
      }
    }
  }

  handleGitListener() {
    this.observer = atom.workspace.observeTextEditors((editor) => {
      editor.onDidSave(() => {
        actions.addFile(this.state.curPath);
        atom.emitter.emit('task-tracker:check-git');
      });
    });
  }

  render() {
    const {props} = this;

    const fileActive = !!this.state.curPath.length
    const hasTrackedFiles = !!props.activeTask.files.length

    // TODO: rewrite
    const directories = atom.project.getDirectories();

    return(
      <div className='at-files'>
        <div className='at-files-header'>
          <div className='title'> Tracked files</div>
          <div className='controls pull-right'>
            <button
              className='btn btn-sm inline-block-tight'
              onClick={this.loadGitModifiedFiles.bind(this)}
              >Track git modified</button>
            <button
              className='btn btn-sm inline-block-tight'
              onClick={this.clearAllTrackedFiles.bind(this)}
              >Clear all</button>
          </div>
        </div>
        {
          fileActive &&
          <CurrentlyEditing
            path={this.state.curPath}
            startTracking={this.startTracking.bind(this)}
            stopTracking={this.stopTracking.bind(this)}
            />
        }

        <div className='at-files-list'>
          {
            !hasTrackedFiles &&
            <ActiveTaskEmpty
              message={'Not tracking any files yet.'}
            />
          }
          {
            hasTrackedFiles &&
            <FileTree
              files={props.activeTask.files}
              currentlyEditing={this.state.curPath}
              />
          }
        </div>
      </div>
    );
  }
}
