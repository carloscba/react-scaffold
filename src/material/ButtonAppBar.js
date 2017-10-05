import React, { Component } from 'react'
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import style from '../templates/material/ButtonAppBar.css'

const styles = {

};

class ButtonAppBar extends Component{

  constructor(){
    super();
    this.state = {
      drawer : {
        open : false,
        anchor : 'right'
      }
    }

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer = (open) => () => {
    this.setState({
      drawer : {
        open : open,
      }
    });
  }

  render(){
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}  className = 'home__paper-login'>
          <Drawer className='buttonAppBar__drawer' open={ this.state.drawer.open } anchor={ this.state.drawer.anchor } type='temporary' onRequestClose={this.toggleDrawer(false)}>
            <div className='buttonAppBar__coontainer-list' tabIndex={0} role="button" onClick={this.toggleDrawer(false)}>
              <List className='buttonAppBar__list'>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon onClick={this.toggleDrawer(false)} />
                </IconButton>
                <Divider />
                <ListItem button>
                  <ListItemText primary="Home" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary="Terms" />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary="Instructions" />
                </ListItem>
                <Divider />
              </List>
            </div>
          </Drawer>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="contrast" aria-label="Menu">
                <MenuIcon onClick={this.toggleDrawer(true)} />
              </IconButton>
              <Typography type="title" color="inherit">
                React Scaffold
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    );
  }

}

ButtonAppBar.propTypes = {
  styles: PropTypes.object,
};

ButtonAppBar.defaultProps = {
    styles : styles,
};

export default ButtonAppBar;
