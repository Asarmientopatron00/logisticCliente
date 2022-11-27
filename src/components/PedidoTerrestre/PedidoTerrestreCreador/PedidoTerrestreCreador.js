import React, {useContext, useEffect} from 'react';
import {Dialog, Slide} from '@mui/material';
import {Formik} from 'formik';
import * as yup from 'yup';
import PedidoTerrestreForm from './PedidoTerrestreForm';
import { ACTIONS } from '../../../shared/constants/Constantes';
import { PedidoTerrestreContext } from '../../../contexts/pedidoTerrestreContext/PedidoTerrestreContextContext';
import { ClienteContext } from '../../../contexts/clienteContext/ClienteContext';
import { VehiculoContext } from '../../../contexts/vehiculoContext/VehiculoContext';
import { BodegaContext } from '../../../contexts/bodegaContext/BodegaContext';
import { TipoProductoTerrestreContext } from '../../../contexts/tipoProductoTerrestreContext/TipoProductoTerrestreContext';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  cliente_id: yup
    .number()
    .integer('Debe ser un entero')
    .required('Requerido'),
  tipo_producto_id: yup
    .number()
    .integer('Debe ser un entero')
    .required('Requerido'),
  bodega_id: yup
    .number()
    .integer('Debe ser un entero')
    .required('Requerido'),
  vehiculo_id: yup
    .number()
    .integer('Debe ser un entero')
    .required('Requerido'),
  cantidad_producto: yup
    .number()
    .integer('Debe ser un entero')
    .required('Requerido'),
  fecha_registro: yup
    .date()
    .required('Requerido'),
  fecha_entrega: yup
    .date()
    .min(yup.ref('fecha_registro'), 'No puede ser inferior a fecha registro')
    .required('Requerido'),
  precio_envio: yup
    .number()
    .required('Requerido'),
  descuento: yup
    .number()
    .required('Requerido'),
});

const PedidoTerrestreCreador = (props) => {
  const {
    showForm,
    selected,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
  } = props;

  const { onCreate, onUpdate} = useContext(PedidoTerrestreContext);
  const { light: clientes, getLightList: getClientes} = useContext(ClienteContext);
  const { light: vehiculos, getLightList: getVehiculos} = useContext(VehiculoContext);
  const { light: bodegas, getLightList: getBodegas} = useContext(BodegaContext);
  const { light: tiposProducto, getLightList: getTiposProductos} = useContext(TipoProductoTerrestreContext);

  useEffect(() => {
    getClientes();
    getBodegas();
    getVehiculos();
    getTiposProductos();
  },[]) // eslint-disable-line

  return (
    showForm && (
      <Dialog
        open={showForm}
        onClose={handleOnClose}
        aria-labelledby='simple-modal-title'
        TransitionComponent={Transition}
        aria-describedby='simple-modal-description'
        maxWidth={'sm'}
      >
        <Formik
          initialStatus={true}
          enableReinitialize={true}
          validateOnBlur={false}
          initialValues={{
            id: selected?.id??'',
            cliente_id: selected?.cliente_id??'',
            guia: selected?.guia??'',
            tipo_producto_id: selected?.tipo_producto_id??'',
            bodega_id: selected?.bodega_id??'',
            vehiculo_id: selected?.vehiculo_id??'',
            cantidad_producto: selected?.cantidad_producto??'',
            fecha_registro: selected?.fecha_registro??moment(Date.now()).format('YYYY-MM-DD'),
            fecha_entrega: selected?.fecha_entrega??'',
            precio_envio: selected?.precio_envio??'',
            descuento: selected?.descuento??0,
            estado: selected?.estado??'P',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            if (accion === ACTIONS.crear) {
              onCreate(data, handleOnClose, updateColeccion);
            } else if (accion === ACTIONS.editar) {
              if (selected) {
                onUpdate(data, handleOnClose, updateColeccion);
              }
            }
            setSubmitting(false);
          }}>
          {({initialValues, setFieldValue, values}) => (
            <PedidoTerrestreForm
              setFieldValue={setFieldValue}
              handleOnClose={handleOnClose}
              titulo={titulo}
              accion={accion}
              clientes={clientes}
              vehiculos={vehiculos}
              bodegas={bodegas}
              tiposProducto={tiposProducto}
              initialValues={initialValues}
              values={values}
            />
          )}
        </Formik>
      </Dialog>
    )
  );
};

export default PedidoTerrestreCreador;