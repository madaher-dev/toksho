import imagesStyle from '../imagesStyles.js';

const commentStyle = theme => ({
  ...imagesStyle,

  container: {
    //borderRadius: '3px',
    //padding: '1rem 15px',
    // marginLeft: '15px',
    // marginRight: '15px',
    marginTop: '30px',
    paddingLeft: '30px',
    paddingRight: '30px'
    //border: '0',
    //marginBottom: '0',
    //width: '100%'
    //backgroundColor: 'yellow'
  },
  innerContainer: {
    paddingTop: 5
    //width: '100px'
  },
  cardContainer: {
    //backgroundColor: 'yellow',
    with: '100%',
    border: '1px solid #CEBCBC',
    borderRadius: '5px',
    marginBottom: '5px',
    //overflow: 'hidden'
    //wrap: 'nowrap'
    [theme.breakpoints.down('xs')]: {
      width: '380px'
    }
  },

  image: {
    width: 100,
    //backgroundColor: 'blue',
    paddingTop: 10,
    paddingBottom: 10
  },
  name: {
    paddingLeft: 0,
    marginLeft: 0
  },
  bio: {
    paddingLeft: 0,
    marginLeft: 0,
    overflow: 'hidden',
    wrap: 'nowrap'
  },
  handler: {
    color: '#999',
    padding: 0
  },
  link: {
    color: '#A74A5A',

    textDecoration: 'none',
    padding: 0,
    margin: 0,
    '&:hover': {
      textDecoration: 'underline',
      color: '#A74A5A'
    },
    '&:visited': {
      color: '#A74A5A',

      textDecoration: 'none'
    }
  },
  wallLoader: {
    margin: 'auto',
    marginBottom: 30
  },

  deleteContainer: {
    width: 50,
    top: 10,
    right: 0,
    position: 'absolute'
    //backgroundColor: 'yellow'
  }
});

export default commentStyle;
