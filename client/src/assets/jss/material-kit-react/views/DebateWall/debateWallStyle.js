import { cardTitle, title } from '../../../material-kit-react.js';
import imagesStyle from '../../imagesStyles.js';

const debateWallStyle = theme => ({
  section: {
    padding: '70px 0',
    textAlign: 'center'
  },
  title: {
    ...title,
    marginBottom: '1rem',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none'
  },
  ...imagesStyle,
  itemGrid: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  cardTitle,
  smallTitle: {
    color: '#6c757d'
  },
  description: {
    color: '#999'
  },
  justifyCenter: {
    justifyContent: 'center !important'
  },
  socials: {
    marginTop: '0',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px',
    color: '#999'
  },
  margin5: {
    margin: '5px'
  },
  container: {
    //display: 'flex',
    width: '100%',
    paddingBottom: 50
    //backgroundColor: 'red',
    // minHeight: '100vh',
    // borderRight: '1px solid #cecece',
    //paddingLeft: 10,
    //paddingRight: 0
  },
  duration: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  durationContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('md')]: {
      alignItems: 'flex-start'
    },
    alignItems: 'flex-end'
  },
  cta: {
    //position: 'absolute',
    // top: '0',
    // right: '0',
    // marginRight: 50,
    // marginTop: 50,
    //width: 250,
    // [theme.breakpoints.down('md')]: {
    // position: 'absolute',
    //top: '0',
    //right: '0',
    //bottom: '0',
    //left: '0',
    // marginRight: 5,
    // marginTop: 50,
    // width: 100,
    // zIndex: '1100',
    // float: 'right'

    // margin: 0,
    // top: 'auto',
    // right: 20,
    // bottom: 20,
    // left: 'auto',
    // position: 'fixed'
    zIndex: '1100',
    margin: theme.spacing(1), // You might not need this now
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  },
  debateTitle: {
    [theme.breakpoints.down('md')]: { maxWidth: 250 }
  },
  wallLoader: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    //transform: 'translate(-50%, -50%)',
    translateX: '-50%'
  }
});

export default debateWallStyle;
