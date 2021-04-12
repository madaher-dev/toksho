const modalStyle = {
  modal: {
    borderRadius: '6px'
  },
  modalHeader: {
    borderBottom: 'none',
    paddingTop: '24px',
    paddingRight: '0',
    paddingBottom: '0',
    paddingLeft: '24px',
    minHeight: '16.43px'
  },
  modalTitle: {
    margin: '0',
    lineHeight: '1.42857143'
  },
  modalCloseButton: {
    color: '#999999',
    marginTop: '-12px',
    WebkitAppearance: 'none',
    padding: '0',
    cursor: 'pointer',
    background: '0 0',
    border: '0',
    fontSize: 'inherit',
    opacity: '.9',
    textShadow: 'none',
    fontWeight: '700',
    lineHeight: '1',
    float: 'right'
  },
  modalClose: {
    width: '16px',
    height: '16px'
  },
  modalBody: {
    paddingTop: '24px',
    paddingRight: '0',
    paddingBottom: '16px',
    paddingLeft: '0',
    position: 'relative',
    minHeight: '400px'
  },
  modalFooter: {
    display: 'flex',
    padding: '15px',
    textAlign: 'right',
    paddingTop: '0',
    margin: '0',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  modalFooterCenter: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  chip: {
    marginRight: 5
  },
  margin5: {
    margin: '5px'
  },
  closeButton: {
    marginTop: '0',
    //width: '100%',
    transform: 'none',
    //left: '0',
    // top: '0',
    //height: '100%',
    // lineHeight: '41px',
    fontSize: '20px',
    color: '#999',
    //margin: '5px',
    '&:hover': {
      color: '#A74A5A'
    }
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingTop: 0
  },
  submit: {
    float: 'right'
  },
  loading: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    //transform: 'translate(-50%, -50%)',
    translateX: '-50%'
  }
};

export default modalStyle;
