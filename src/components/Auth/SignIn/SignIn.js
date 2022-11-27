import React, { useContext, useEffect } from 'react';
import SignInForm from './SignInForm';
import {Card, Box} from '@mui/material';
import { CommonContext } from '../../../contexts/commonContext/commonContext';
import MessageView from './../../../shared/components/MessageView';
import { AuthContext } from '../../../contexts/authContext/AuthContext';
import { useNavigate } from 'react-router-dom';

// const signInStyles = {
//   imgRoot: {
//     cursor: 'pointer',
//     display: 'inline-block',
//     width: 280
//   },
//   cardRoot: {
//     maxWidth: '36rem',
//     width: '100%',
//     overflow: 'hidden',
//     boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
//     textAlign: 'center',
//     position: 'relative',
//     paddingTop: 20,
//     '&:before': {
//       content: "''",
//       position: 'absolute',
//       left: 0,
//       right: 0,
//       top: 0,
//       width: 130,
//       height: 9,
//       borderBottomRightRadius: 80,
//       borderBottomLeftRadius: 80,
//       marginRight: 'auto',
//       marginLeft: 'auto',
//       backgroundColor: '#0C4F7F',
//     },
//   },
//   muiTabsFull: {
//     marginLeft: 0,
//     marginRight: 0,
//     borderBottom: `1px solid gray`,
//     '& .MuiTabs-flexContainer': {
//       '& .MuiTab-root': {
//         flex: 1,
//       },
//     },
//   },
//   muiTab: {
//     fontWeight: '600',
//     fontSize: 16,
//     paddingBottom: 16,
//     paddingTop: 16,
//     marginLeft: 8,
//     marginRight: 8,
//     color: 'black',
//   },
//   textUppercase: {
//     textTransform: 'uppercase',
//   },
//   back: {
//     position: 'fixed',
//     width: 900,
//     height: 900,
//     borderRadius: 1000,
//     top: -90,
//     left: -50,
//     backgroundColor: '#f4f7fe',
//     transform: [
//       {rotate: '-70deg'}
//     ]
//   },
//   color: {
//     backgroundColor: '#0C4F7F'
//   }
// };

const Signin = (props) => {
  const { setAuth } = props;
  const { error } = useContext(CommonContext);
  const { loadUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadUser(setAuth, navigate);
  },[]) // eslint-disable-line

  return (
    <Box 
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 15,
      }}
    >
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Card sx={{minWidth: 500}}>
          <Box px={{xs: 6, sm: 10, xl: 15}}>
            <Box
              component='h2'
              color='text.primary'
              fontWeight={'600'}
              fontSize={{xs: 24, xl: 26}}>
              Iniciar Sesión
            </Box>
          </Box>
          <SignInForm setAuth={setAuth} navigate={navigate}/>
        </Card>
      </Box>

      <MessageView
        variant={'error'}
        message={error}
      />
    </Box>
  );
};

export default Signin;
