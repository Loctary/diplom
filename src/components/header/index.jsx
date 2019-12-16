import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textAlign: 'center',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const isLinkOnGitHub = window.location.href.includes('github');
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Link href={`${isLinkOnGitHub ? 'https://loctary.github.io/diplom/#/map' : '/#/map'}`} variant="h6" className={classes.title}>
            Карта
          </Link>
          <Link href={`${isLinkOnGitHub ? 'https://loctary.github.io/diplom/#/graphs' : '/#/graphs'}`} variant="h6" className={classes.title}>
            Графіки
          </Link>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
