import React, { Component } from 'react'
import PropTypes from 'prop-types';
//Style
import style from '../templates/material/DialogError.css'
//Material
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const styles = {};

class DialogError extends Component{

  constructor(){
      super();
      this.onCloseHandler = this.onCloseHandler.bind(this);
  }
  onCloseHandler(){
    (this.props.onClose) ? this.props.onClose() : null;
  }
  render(){
    return (
      <div>
        <Dialog open={ this.props.open } onRequestClose={this.onCloseHandler}>
          <DialogTitle> { this.props.title } </DialogTitle>
          <DialogContent>
            <DialogContentText>
              { this.props.message }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onCloseHandler} color="primary">
              { this.props.locale.labelClose }
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

}

DialogError.propTypes = {
  styles: PropTypes.object,
  open: PropTypes.bool,
  onClose : PropTypes.func,
  title : PropTypes.string,
  message : PropTypes.string,
  locale : PropTypes.object
};

DialogError.defaultProps = {
    styles : styles,
    open : false,
    onClose : null,
    title : '',
    message : '',
    locale : {
        'labelClose' : 'Close'
    }
};

export default DialogError;
