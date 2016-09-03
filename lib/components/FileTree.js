'use babel';

import React, {PropTypes} from 'react';
import _ from 'underscore-plus';
import * as util from '../util';
import FileItem from './FileItem';

function FileTree(props) {
  const sortedFileTree = util.groupPathsByFolder(props.files);
  let directories = _.keys(sortedFileTree);
  directories = util.sortDirectories(directories);

// fileobject shema
  // fileobject =
  //   relativepath:
  //     path: fullpath
  //     filename: filename

  return(
    <div className='at-filetree'>
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
                    return(
                      <FileItem
                        key={index}
                        file={fileObject}
                        isCurrentlyActive={isCurrentlyActive}
                        />
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

FileTree.propTypes = {
  files: PropTypes.array.isRequired,
  currentlyEditing: PropTypes.string,
}

export default FileTree;
