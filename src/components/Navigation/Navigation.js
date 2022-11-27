import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_OPTIONS } from '../../shared/constants/Constantes';

const initialAnchor = {
  1: null,
  2: null,
  3: null
}

const Navigation = () => {
  const [anchorEl, setAnchorEl] = React.useState(initialAnchor);
  const navigate = useNavigate();

  const handleClick = (event, id) => {
    setAnchorEl({
      ...anchorEl,
      [id]: event.currentTarget
    });
  };

  const handleClose = () => {
    setAnchorEl(initialAnchor);
  };


  return (
    <div 
      style={{
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 4,
        backgroundColor: '#0C4F7F',
      }}
    >
      {NAVIGATION_OPTIONS.map((option) => (
        <React.Fragment key={option.id}>
          <Button
            id={`basic-button-${option.id}`}
            aria-controls={Boolean(anchorEl[option.id]) ? `basic-menu-${option.id}` : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl[option.id]) ? 'true' : undefined}
            sx={{color: 'white'}}
            onClick={(e) => handleClick(e, option.id)}
          >
            {option.name}
          </Button>
          <Menu
            id={`basic-menu-${option.id}`}
            anchorEl={anchorEl[option.id]}
            open={Boolean(anchorEl[option.id])}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': `basic-button-${option.id}`,
            }}
          >
            {option.subOptions.map((subOpt) => (
              <MenuItem key={subOpt.id} onClick={() => navigate(subOpt.url)}>{subOpt.name}</MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Navigation;
