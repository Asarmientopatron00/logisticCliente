import { Logout } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContext';

const Header = () => {
  const {logOut, user} = useContext(AuthContext);
  return (
    <Box
      sx={{
        marginTop: 2,
        marginLeft: 5,
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Tooltip title="Cerrar Sesión">
        <Logout
          onClick={logOut}
          sx={{
            cursor: 'pointer'
          }}
        />
      </Tooltip>
      <Box sx={{color: 'black', marginLeft: 2}}>
        {user?.nombre??''}
      </Box>
    </Box>
  )
}

export default Header;