import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import {Form} from 'formik';
import MyTextField from '../../../shared/components/MyTextField';
import { mainStyles } from '../../../shared/styles/mainStyles';
import { ACTIONS, ESTADOS_PEDIDO } from '../../../shared/constants/Constantes';
import MySelectField from '../../../shared/components/MySelectField';

const grid = {
  display: 'grid',
  gap: '20px',
  gridTemplateColumns: 'repeat(2, 1fr)'
}

const PedidoTerrestreForm = (props) => {
  const {
    handleOnClose, 
    accion, 
    titulo,
    clientes,
    vehiculos,
    bodegas,
    tiposProducto,
    initialValues,
    values,
    setFieldValue
  } = props;

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (accion === ACTIONS.ver || initialValues.estado === 'F') {
      setDisabled(true);
    }
  }, [initialValues.estado, accion]); // eslint-disable-line

  useEffect(() => {
    if(values.tipo_producto_id && values.cantidad_producto){
     const product = tiposProducto.find((typ) => typ.id === parseInt(values.tipo_producto_id));
     if(product && parseInt(values.cantidad_producto) >= 0){
      setFieldValue('precio_envio', product.precio_unitario*parseInt(values.cantidad_producto));
      if(values.cantidad_producto >=10){
        setFieldValue('descuento', product.precio_unitario*parseInt(values.cantidad_producto)*0.05);
      }
     }
    }
  },[values.tipo_producto_id, values.cantidad_producto]) // eslint-disable-line

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
          <MyTextField
            label='Guia'
            name='guia'
            required
            disabled
          />
          <MyTextField
            label='Fecha Registro'
            name='fecha_registro'
            type='date'
            InputLabelProps={{
              shrink: true
            }}
            required
            disabled
          />
        </Box>
        <MySelectField
          label='Cliente'
          name='cliente_id'
          required
          disabled={disabled}
          options={clientes}
        />
        <MySelectField
          label='Tipo Producto'
          name='tipo_producto_id'
          required
          disabled={disabled}
          options={tiposProducto}
        />
        <Box sx={grid}>
          <MyTextField
            label='Cantidad'
            name='cantidad_producto'
            required
            type='number'
            disabled={disabled}
          />
          <MyTextField
            label='Fecha Entrega'
            name='fecha_entrega'
            type='date'
            InputLabelProps={{
              shrink: true
            }}
            required
            disabled={disabled}
          />
          <MySelectField
            label='Bodega'
            name='bodega_id'
            required
            disabled={disabled}
            options={bodegas}
          />
          <MySelectField
            label='Vehículo'
            name='vehiculo_id'
            required
            disabled={disabled}
            options={vehiculos}
          />
          <MyTextField
            label='Precio Envío'
            name='precio_envio'
            required
            disabled
          />
          <MyTextField
            label='Descuento'
            name='descuento'
            required
            disabled
          />
          <MySelectField
            label='Estado'
            name='estado'
            required
            disabled={disabled || accion === ACTIONS.crear}
            options={ESTADOS_PEDIDO}
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

export default PedidoTerrestreForm;