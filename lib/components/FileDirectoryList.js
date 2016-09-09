'use babel';

import React, {Component, PropTypes} from 'react';
import _ from 'underscore-plus';
import * as util from '../util';
import FileItem from './FileItem';
import TodoList from './TodoList';

export default class FileDirectoryList extends Component {
  static propTypes = {
    files: PropTypes.array.isRequired,
    currentlyEditing: PropTypes.string,
    todos: PropTypes.array.isRequired,
  }

// fileobject shema
  // fileobject =
  //   relativepath:
  //     path: fullpath
  //     filename: filename

  getTodosForFile(fileObject) {
    return _.find(this.props.todos, (todo) => {
      return (todo.filePath === fileObject.path);
    }, this);
  }

  render() {
    const {props} = this;

    const sortedFileTree = util.groupPathsByFolder(props.files);
    let directories = _.keys(sortedFileTree);
    directories = util.sortDirectories(directories);

    return(
      <div className='at-filetree-dir'>
        {
          directories.map((dir, index) => {
            return(
              <div key={index} className='at-files-directory'>
                <div className='at-files-dirname'>
                  <div className='tree-dash'></div>
                  <span className='icon icon-file-directory'>{dir}</span>
                </div>
                <div className='at-files-items'>
                  {
                    sortedFileTree[dir].map((fileObject, index) => {
                      const isCurrentlyActive = (fileObject.path === props.currentlyEditing) ? true : false;
                      const fileTodos = this.getTodosForFile(fileObject);
                      return(
                        <div key={index} className='at-file-container'>
                          <FileItem
                            file={fileObject}
                            isCurrentlyActive={isCurrentlyActive}
                            />
                          {
                            fileTodos &&
                            <TodoList
                              fileTodos={fileTodos}
                              />
                          }
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }

}
