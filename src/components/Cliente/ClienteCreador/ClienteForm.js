import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import {Form} from 'formik';
import MyTextField from '../../../shared/components/MyTextField';
import MySelectField from '../../../shared/components/MySelectField';
import { mainStyles } from '../../../shared/styles/mainStyles';
import { ACTIONS, TIPOS_DOCUMENTOS } from '../../../shared/constants/Constantes';

const grid = {
  display: 'grid',
  gap: '20px',
  gridTemplateColumns: 'repeat(2, 1fr)'
}

const ClaseInspeccionForm = (props) => {
  const {
    handleOnClose, 
    accion, 
    initialValues, 
    titulo,
  } = props;

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (accion === ACTIONS.ver || initialValues.estado === '0') {
      setDisabled(true);
    }
  }, [initialValues.estado, accion]);

  return (
    <Form noValidate autoComplete='off'>
      <Box sx={{padding: 5}}>
        <Box
          fontSize={20}
          marginBottom={2}
          fontWeight={'bold'}>
          {titulo}
        </Box>
        <Box sx={grid}>
          <MySelectField
            label='Tipo Documento'
            name='tipo_documento'
            required
            ninguno='true'
            disabled={disabled}
            options={TIPOS_DOCUMENTOS}
          />
          <MyTextField
            label='Documento'
            name='numero_documento'
            required
            disabled={disabled}
          />
        </Box>
        <MyTextField
          label='Nombre'
          name='nombre'
          required
          disabled={disabled}
        />
        <Box sx={grid}>
          <MyTextField
            label='Telefono'
            name='telefono'
            disabled={disabled}
          />
          <MyTextField
            label='Email'
            name='email'
            disabled={disabled}
          />
        </Box>
        <MyTextField
          label='Dirección'
          name='direccion'
          disabled={disabled}
        />
      </Box>
      <Box sx={mainStyles.bottomsGroup}>
        {accion !== ACTIONS.ver && (
          <Button
            style={{...mainStyles.btnRoot, ...mainStyles.btnPrymary}}
            variant='contained'
            type='submit'>
            Guardar
          </Button>
        )}
        <Button
          style={{...mainStyles.btnRoot, ...mainStyles.btnSecundary}}
          onClick={handleOnClose}>
          Cancelar
        </Button>
      </Box>
    </Form>
  );
};

export default ClaseInspeccionForm;