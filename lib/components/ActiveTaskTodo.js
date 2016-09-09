// TODO: delete this

// 'use babel';
//
// import React, {Component, PropTypes} from 'react';
// import ActiveTaskEmpty from './ActiveTaskEmpty';
// import TodoFileItemList from './TodoFileItemList';
// import * as actions from '../actions';
// import * as util from '../util';
//
// export default class ActiveTaskTodo extends Component {
//   static propTypes = {
//     activeTask: PropTypes.object.isRequired,
//   };
//
//   MSG_NO_FILES = 'No files tracked.';
//   MSG_DIDNT_SEARCH = 'Click refresh icon to search for TODOs in tracked files.';
//   MSG_FINISHED_SEARCH = 'All done, no TODOs found.';
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       searched: false,
//       searching: false,
//       todos: [],
//     }
//   }
//
//   componentDidMount() {
//     console.log('this should not be mounted');
//   }
//
//   refresh() {
//     this.setState({searching: true});
//     util.searchTodos(this.props.activeTask.files)
//     .then((items) => {
//       this.setState({
//         searched: true,
//         searching: false,
//         todos: items,
//       });
//     });
//   }
//
//   resolveEmptyMsg() {
//     let msg = '';
//     if (this.props.activeTask.files.length === 0) {
//       msg = this.MSG_NO_FILES;
//     } else if (this.state.searched) {
//       msg = this.MSG_FINISHED_SEARCH;
//     } else {
//       msg = this.MSG_DIDNT_SEARCH;
//     }
//     return msg;
//   }
//
//   render() {
//     const {props} = this;
//     const emptyMessage = this.resolveEmptyMsg();
//
//     return(
//       <div className='at-todo-container'>
//         <div className='at-todo'>
//           <div className='todo-refresh-control'>
//             {
//               !this.state.searching &&
//               <button
//                 onClick={this.refresh.bind(this)}
//                 className='btn icon icon-sync inline-block-tight'
//                 ></button>
//             }
//             {
//               this.state.searching &&
//               <span className='loading loading-spinner-small inline-block'></span>
//             }
//
//           </div>
//           <div className='at-todo-header'>
//             <div className='title'>TODOs</div>
//           </div>
//         </div>
//         <div className='at-todo-list'>
//           {
//             this.state.todos.length === 0 &&
//             <ActiveTaskEmpty
//               message={emptyMessage}
//               />
//           }
//           {
//             this.state.todos.length > 0 &&
//             this.state.todos.map((item, index) => {
//               return (
//                 <TodoFileItemList
//                   key={index}
//                   fileItem={item}
//                   />
//               )
//             })
//           }
//         </div>
//       </div>
//     );
//   }
// }
