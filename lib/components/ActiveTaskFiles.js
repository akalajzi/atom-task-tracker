'use babel';

import React, {Component, PropTypes} from 'react';
import FileItem from './FileItem';
import CurrentlyEditing from './CurrentlyEditing';
import * as actions from '../actions';
import * as util from '../util';

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
    }

    atom.emitter.on('task-tracker:atom-changed-active-pane', this.handleChangeActivePane.bind(this));
  }

  componentDidMount() {
    this.handleChangeActivePane();
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

  render() {
    const {props} = this;

    fileActive = !!this.state.curPath.length
    hasTrackedFiles = !!props.activeTask.files.length

    return(
      <div className='at-files'>
        <div className='at-files-header'>
          <div className='title'> Tracked files</div>
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
            <div className='at-files-empty'>
              No files tracked yet.
            </div>
          }
          {
            hasTrackedFiles &&
            props.activeTask.files.map((file, index) => {
              return(
                <FileItem
                  key={index}
                  path={file}
                  />
              );
            })
          }
        </div>
      </div>
    );
  }
}
