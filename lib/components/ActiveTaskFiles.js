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
      todos: [],
    }

    this.git = null;
    this.observer = null;
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.workspace.onDidChangeActivePaneItem(this.handleChangeActivePane.bind(this)),
      atom.emitter.on('task-tracker:file-add', this.handleFileAdd.bind(this)),
    );
  }

  componentDidMount() {
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
            return repos;
          }
        }
      )
      .catch(
        (e) => {
          atom.notifications.addError('Failed to get repositories.', {detail: e, dismissable: true});
        }
      );


    this.handleChangeActivePane();
    this.findTodos();
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

  handleFileAdd() {
    atom.emitter.emit('task-tracker:check-git');
    this.findTodos();
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
      editor.onDidSave(this.startTracking.bind(this));
    });
  }

  findTodos() {
    const activeSearchPatterns = util.getActiveSearchPatterns(actions.getSearchPatterns());
    if (activeSearchPatterns.length === 0) {
      // dont search if all patterns are unchecked
      this.setState({todos: []});
      return;
    }
    util.searchTodos(this.props.activeTask.files, activeSearchPatterns)
    .then((items) => {
      this.setState({todos: items});
    })
  }

  render() {
    const {props} = this;

    const fileActive = !!this.state.curPath.length
    const hasTrackedFiles = !!props.activeTask.files.length

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
              todos={this.state.todos}
              />
          }
        </div>
      </div>
    );
  }
}
