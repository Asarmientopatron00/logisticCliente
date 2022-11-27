import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import {Form} from 'formik';
import MyTextField from '../../../shared/components/MyTextField';
import { mainStyles } from '../../../shared/styles/mainStyles';
import { ACTIONS } from '../../../shared/constants/Constantes';

const grid = {
  display: 'grid',
  gap: '20px',
  gridTemplateColumns: 'repeat(2, 1fr)'
}

const TipoProductoTerrestreForm = (props) => {
  const {
    handleOnClose, 
    accion, 
    titulo,
  } = props;

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (accion === ACTIONS.ver) {
      setDisabled(true);
    }
  }, [accion]);

  return (
    <Form noValidate autoComplete='off'>
      <Box sx={{padding: 5}}>
        <Box
          fontSize={20}
          marginBottom={2}
          fontWeight={'bold'}>
          {titulo}
        </Box>
        <MyTextField
          label='Nombre'
          name='nombre'
          required
          disabled={disabled}
        />
        <Box sx={grid}>
          <MyTextField
            label='Código'
            name='codigo'
            required
            disabled={disabled}
          />
          <MyTextField
            label='Precio'
            name='precio_unitario'
            required
            disabled={disabled}
          />
        </Box>
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

export default TipoProductoTerrestreForm;