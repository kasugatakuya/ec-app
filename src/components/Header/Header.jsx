import React, {useState, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../assets/img/icons/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from '../../reducks/users/selectors';
import { push } from "connected-react-router"
import { HeaderMenus, ClosableDrawer } from './index';



import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: "#fff",
    color: "444",
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%'
  },
  iconButton: {
    margin: '0 0 0 auto'
  }
});

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback((e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setOpen(!open)

  }, [setOpen, open]);

  return (
    <div className={classes.root}>
        <AppBar position="fixed" className={classes.menuBar}>
          <Toolbar className={classes.toolBar}>
            <img src={logo} alt="とらハックロゴ" width="128px" onClick={() => dispatch(push('/'))}/>
            {isSignedIn && (
              <div className={classes.iconButton}>
                <HeaderMenus handleDrawerToggle={handleDrawerToggle}/>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  )
}

export default Header;