import React, {useCallback, useState, useEffect} from 'react'
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { TextInput } from '../UIkit';
import { ListItemIcon } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { push } from 'connected-react-router'
import { useDispatch } from "react-redux";
import {signOut} from "../../reducks/users/operations";
import {db} from "../../firebase/index"


const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32
  }
}));

const ClosableDrawer = (props) => {
  const classes = useStyles();
  const {container} = props;
  const dispatch = useDispatch()

  const [keyword, setKeyword] = useState("");

  const inputKeyword = useCallback((e) => {
    setKeyword(e.target.value)
  }, [setKeyword]);

  const selectMenu = (event, path) => {
    dispatch(push(path));
    props.onClose(event)
  }

  const [filters, setFilters] = useState([
    {func: selectMenu, label: "すべて", id: "all", value: "/"},
    {func: selectMenu, label: "メンズ", id: "male", value: "/?gender=male"},
    {func: selectMenu, label: "レディース", id: "female", value: "/?gender=female"}
  ]);

  useEffect(() => {
    db.collection('categories').orderBy('order', 'asc').get().then(snapshots => {
      const list = []
      snapshots.forEach(snapshot => {
        const category = snapshot.data()
        list.push({func: selectMenu, label: category.name, id: category.id, value: `/?category=${category.id}`})
      })
      setFilters(prevState => [...prevState, ...list])
    })
  }, []);

  const menus = [
    {func: selectMenu, label: "商品登録", icon: <AddCircleIcon />, id: "register", value: "/product/edit"},
    {func: selectMenu, label: "注文履歴", icon: <HistoryIcon />, id: "history", value: "/order/history"},
    {func: selectMenu, label: "プロフィール", icon: <PersonIcon />, id: "profile", value: "/user/mypage"}
  ];

  return (
    <nav className={classes.drawer}>
      <Drawer 
        cantainer={container} 
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}
      >
        <div>
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false}
              label={"キーワードを入力"}
              multiline={false}
              onChange={inputKeyword}
              required={false}
              rows={1}
              valuse={keyword}
              type={"text"}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map(menu => (
              <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {filters.map(filter => (
              <ListItem
                button
                key={filter.id}
                onClick={(e) => filter.func(e, filter.value)}
              >
                <ListItemText
                  primary={filter.label}
                />
              </ListItem>
            ))}
          </List>
        </div>

      </Drawer>
    </nav>
  )
}

export default ClosableDrawer;