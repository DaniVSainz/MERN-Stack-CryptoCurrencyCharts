// This file is shared across the demos.

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import FingerPrintIcon from '@material-ui/icons/Fingerprint';
import ViewListIcon from '@material-ui/icons/ViewList';

import { Link } from 'react-router-dom';

export const mailFolderListItems = (
  <div>
    <Link to="/cryptocurrencies">
      <ListItem button>
        <ListItemIcon>
          <ViewListIcon />
        </ListItemIcon>
        <ListItemText primary="Cryptocurrencies" />
      </ListItem>
    </Link>
    {/* <Link to="/home">
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Starred" />
      </ListItem>
    </Link> */}
    {/* <Link to="/test">
      <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Send mail" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem> */}
  </div>
);

export const otherMailFolderListItems = (
  <div>
    <Link to='/login'>
      <ListItem button>
        <ListItemIcon>
          <FingerPrintIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
    </Link>
  </div>
);