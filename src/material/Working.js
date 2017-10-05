import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
//Style
import style from '../templates/material/Working.css'
//Material
import { withStyles } from 'material-ui/styles';
import MuiDialog, {DialogContent} from 'material-ui/Dialog';
import { CircularProgress } from 'material-ui/Progress';

const styles = {
    root : {
      display : 'none'    
    }
};

class Working extends Component{

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
        <MuiDialog fullScreen open={ this.props.open } onRequestClose={this.onCloseHandler}>
            <DialogContent>
              <CircularProgress />
            </DialogContent>
        </MuiDialog>
      </div>
    )
  }

}

Working.propTypes = {
  styles: PropTypes.object,
  open: PropTypes.bool,
};

Working.defaultProps = {
    styles : styles,
    open : false,
};

export default Working;
