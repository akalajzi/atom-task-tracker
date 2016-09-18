'use babel';

const searchPatterns = [
  {
    'key': 'todo',
    'displayName': 'TODO',
    'checked': true,
    'variations': [
      'TODO\:', 'TODO ',
    ]
  },
  {
    'key': 'fixme',
    'displayName': 'FIXME',
    'checked': false,
    'variations': [
      'FIXME\:', 'FIXME ',
    ]
  },
  {
    'key': 'clog',
    'displayName': 'console.log',
    'checked': false,
    'variations': [
      'console.log',
    ]
  },
];

export default searchPatterns;
