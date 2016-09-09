'use babel';

import React, {Component, PropTypes} from 'react';
import * as util from '../util';
import FileDirectoryList from './FileDirectoryList';

export default class FileTree extends Component {
  static propTypes = {
    files: PropTypes.array.isRequired,
    currentlyEditing: PropTypes.string,
    todos: PropTypes.array.isRequired,
  };

  render() {
    const {props} = this;
    // split files by project
    const filesByProject = util.groupPathsByProject(this.props.files);
    const filteredProjectNames = util.filterProjectsWithTrackedFiles(filesByProject);

    return(
      <div className='at-filetree'>
        {
          filteredProjectNames.map((projectName, index) => {
            return(
              <div key={index} className='at-project-container'>
                <div className='icon icon-repo at-project-name'>
                  { projectName }
                </div>
                <FileDirectoryList
                  files={filesByProject[projectName]}
                  currentlyEditing={props.currentlyEditing}
                  todos={props.todos}
                  />
              </div>
            );
          })
        }
      </div>
    );
  }

}
