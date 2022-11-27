import React, { useContext } from 'react';
import {Button, Box} from '@mui/material';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import MyTextField from '../../../shared/components/MyTextField';
import { AuthContext } from '../../../contexts/authContext/AuthContext';

const useStyles = {
  formRoot: {
    textAlign: 'left',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myTextFieldRoot: {
    width: '100%',
  },
  checkboxRoot: {
    marginLeft: -12,
  },
  pointer: {
    cursor: 'pointer',
  },
  btnRoot: {
    borderRadius: 4,
    width: '10rem',
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  btnRootFull: {
    width: '100%',
  },
  dividerRoot: {
    marginBottom: 16,
    marginLeft: -48,
    marginRight: -48,
  },
  textPrimary: {
    color: '#000',
  },
  colorTextPrimary: {
    color: '#0C4F7F',
  },
  underlineNone: {
    textDecoration: 'none',
  },
  textGrey: {
    color: '#A8A8A8',
  },
};

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Requerido'),
  password: yup
    .string()
    .required('Requerido'),
});

const SignInForm = (props) => {
  const {setAuth, navigate} = props;
  const {signIn} = useContext(AuthContext);
  // const onGoToForgetPassword = () => {
  //   navigate('/forget-password');
  // };

  return (
    <Box flex={1} display='flex' flexDirection='column'>
      <Box
        px={{xs: 6, sm: 10, xl: 15}}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        flex={1}
        display='flex'
        flexDirection='column'>
        <Formik
          validateOnChange={true}
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            signIn({username: data.username, password: data.password, setAuth: setAuth, navigate: navigate});
            setSubmitting(false);
          }}>
          {({isSubmitting}) => (
            <Form style={useStyles.formRoot} noValidate autoComplete='off'>
              <Box width='100%'>
                <MyTextField
                  fullWidth
                  placeholder={'Identificación'}
                  name='username'
                  label='Identificación'
                  variant='outlined'
                  // sx={useStyles.myTextFieldRoot}
                />
              </Box>

              <Box width='100%' >
                <MyTextField
                  fullWidth
                  type='password'
                  placeholder={'Contraseña'}
                  label='Contraseña'
                  name='password'
                  variant='outlined'
                  // className={useStyles.myTextFieldRoot}
                />
              </Box>

              {/* <Box
                mb={{xs: 3, xl: 4}}
                display='flex'
                flexDirection={{xs: 'column', sm: 'row'}}
                alignItems={{sm: 'center'}}
                justifyContent={{sm: 'space-between'}}
                fontSize={15}>
                <Box
                  color='primary.main'
                  component='span'
                  ml={{sm: 4}}
                  sx={useStyles.pointer}
                  onClick={onGoToForgetPassword}
                  fontSize={15}>
                  Olvidaste tu contraseña
                </Box>
              </Box> */}

              <Box
                mb={6}
                display='flex'
                flexDirection={{xs: 'column', sm: 'row'}}
                alignItems={{sm: 'center'}}
                justifyContent={{sm: 'space-between'}}>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={isSubmitting}
                  sx={useStyles.btnRoot}>
                  Iniciar Sesión
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignInForm;
