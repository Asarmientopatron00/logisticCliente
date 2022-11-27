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
  nombre: yup
    .string()
    .required('Requerido'),
  identificacion_usuario: yup
    .string()
    .required('Requerido'),
  correo_electronico: yup
    .string()
    .email('Formato email no válido')
    .required('Requerido'),
  clave: yup
    .string()
    .required('Requerido'),
  confirm_clave: yup
    .string()
    .required('Requerido')
    .test({
      name: 'confirm',
      exclusive: false,
      params: {},
      message: 'Claves no coinciden', // eslint-disable-line
      test: function(value){
        return (value && this.parent.clave === value) || value === undefined;
      }
    }),
});

const SignUpForm = (props) => {
  const {navigate} = props;
  const {SignUp} = useContext(AuthContext);
  const onGoLogin = () => {
    navigate('/');
  };

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
            nombre: '',
            identificacion_usuario: '',
            correo_electronico: '',
            clave: '',
            confirm_clave: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            SignUp({
              nombre: data.nombre, 
              identificacion_usuario: data.identificacion_usuario,
              correo_electronico: data.correo_electronico,
              clave: data.clave,
              redirect: onGoLogin
            });
            setSubmitting(false);
          }}>
          {({isSubmitting}) => (
            <Form style={useStyles.formRoot} noValidate autoComplete='off'>
              <Box width='100%'>
                <MyTextField
                  fullWidth
                  name='nombre'
                  label='Nombre'
                  variant='outlined'
                />
              </Box>
              <Box width='100%'>
                <MyTextField
                  fullWidth
                  name='identificacion_usuario'
                  label='Identificacion'
                  variant='outlined'
                />
              </Box>
              <Box width='100%'>
                <MyTextField
                  fullWidth
                  name='correo_electronico'
                  label='Email'
                  variant='outlined'
                />
              </Box>
              <Box width='100%' >
                <MyTextField
                  fullWidth
                  type='password'
                  label='Contraseña'
                  name='clave'
                  variant='outlined'
                />
              </Box>
              <Box width='100%' >
                <MyTextField
                  fullWidth
                  type='password'
                  label='Confirmar Contraseña'
                  name='confirm_clave'
                  variant='outlined'
                />
              </Box>
              <Box
                mb={{xs: 3, xl: 4}}
                display='flex'
                flexDirection={{xs: 'column', sm: 'row'}}
                alignItems={{sm: 'center'}}
                justifyContent={{sm: 'space-between'}}
                fontSize={15}>
                <Box
                  color='primary.main'
                  component='span'
                  sx={useStyles.pointer}
                  onClick={() => navigate('/signin')}
                  fontSize={15}>
                  Iniciar Sesión
                </Box>
              </Box>
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
                  Registrarse
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignUpForm;
