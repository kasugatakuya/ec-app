import React, {useState} from 'react'
import {push} from "connected-react-router"
import {useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImage from '../../assets/img/src/no_image.png'
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {deleteProduct} from "../../reducks/products/operations";

const useStyles = makeStyles((theme) => ({
  root: {
      [theme.breakpoints.down('sm')]: {
          margin: 8,
          width: 'calc(50% - 16px)'
      },
      [theme.breakpoints.up('sm')]: {
          margin: 16,
          width: 'calc(33.3333% - 32px)'
      }
  },
  content: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '16px 16px',
      textAlign: 'left',
      '&:last-child': {
          paddingBottom: 16
      }
  },
  icon: {
      marginRight: 0,
      marginLeft: 'auto'
  },
  media: {
      height: 0,
      paddingTop: '100%'
  },
  price: {
      color: theme.palette.secondary.main,
      fontSize: 16

  },
  productName: {
      boxOrient: 'vertical',
      display: '-webkit-box',
      fontSize: 14,
      lineHeight: '18px',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
          height: 36,
          lineClamp: 2,
      },
      [theme.breakpoints.up('md')]: {
          height: 18,
          lineClamp: 1,
      }
  }
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const images = (props.images.length > 0) ? props.images : [{path: NoImage}]
  const price = props.price.toLocaleString();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={images[0].path}
        title=""
        onClick={() => dispatch(push('/product/' + props.id))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push('/product/' + props.id))}>
          <Typography color="textSecondary" component="p">
            {props.name}
          </Typography>
          <Typography component="p" className={classes.price}>
            ¥{price}
          </Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              dispatch(push('/product/edit/' + props.id))
              handleClose()
            }}
          >
            編集
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(props.id))
              handleClose()
            }}
          >
            削除
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  )
}

export default ProductCard