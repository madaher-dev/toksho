import { cardTitle, title } from '../../../material-kit-react.js';
import imagesStyle from '../../imagesStyles.js';

const challengersStyle = theme => ({
  title: {
    ...title,
    marginBottom: '1rem',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none'
  },
  ...imagesStyle,

  cardTitle,
  smallTitle: {
    color: '#6c757d'
  },
  container: {
    borderBottom: '1px solid #eeeeee',
    paddingLeft: 0,
    marginLeft: 0,
    paddingRight: 0,
    marginRight: 0,
    width: '100%'
  },
  image: {
    width: 200,
    // backgroundColor: 'blue',
    paddingTop: 5,
    paddingBottom: 35
  },
  innerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 0,
    marginLeft: 0,
    paddingBottom: 10
  },
  info: {
    //backgroundColor: 'yellow',
    paddingLeft: 0,
    marginLeft: 0,
    paddingTop: 5
  },
  name: {
    paddingLeft: 0,
    marginLeft: 0
  },
  bio: {
    paddingLeft: 0,
    marginLeft: 0,
    overflow: 'hidden',
    width: '80%'
  },
  handler: {
    color: '#999',
    padding: 0
  },
  button: {
    border: '1px solid #A74A5A',
    minHeight: '0',
    minWidth: '0',
    height: 35,
    width: 75,
    color: '#A74A5A',
    '&:hover': {
      backgroundColor: '#db7987',
      color: 'white'
    }
  },
  buttonFilled: {
    //border: '1px solid #A74A5A',
    minHeight: '0',
    minWidth: '0',
    height: 35,
    color: 'white',
    width: 75,
    backgroundColor: '#A74A5A',
    '&:hover': {
      backgroundColor: '#db7987',
      color: 'white'
    }
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
    //alignItems: 'flex-end',
  },
  link: {
    color: '#A74A5A',

    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: '#A74A5A'
    },
    '&:visited': {
      color: '#A74A5A',

      textDecoration: 'none'
    }
  }
});

export default challengersStyle;
