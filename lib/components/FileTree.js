'use babel';

import React, {Component, PropTypes} from 'react';
import _ from 'underscore-plus';
import * as util from '../util';
import FileDirectoryList from './FileDirectoryList';

export default class FileTree extends Component {
  static propTypes = {
    files: PropTypes.array.isRequired,
    currentlyEditing: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      projectDirs: atom.project.getDirectories(),
    }
  }

  groupPathsByProject(directories, paths) {
    output = {};
    for (let dir of directories) {
      output[dir.getBaseName()] = _.filter(paths, (path) => {
        if (path.indexOf(dir.realPath) === 0) { return path; }
      });
    }
    return output;
  }

  filterProjectsWithTrackedFiles(filesByProject) {
    const projectNames = _.keys(filesByProject);
    return _.filter(projectNames, (projectName) => {
      if (filesByProject[projectName].length > 0) { return projectName; }
    });
  }

  render() {
    const {props} = this;
    // split files by project
    const filesByProject = this.groupPathsByProject(this.state.projectDirs, this.props.files);
    const filteredProjectNames = this.filterProjectsWithTrackedFiles(filesByProject);

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
                  />
              </div>
            );
          })
        }
      </div>
    );
  }

}
