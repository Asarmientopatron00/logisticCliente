import React, {useContext, useEffect} from 'react';
import {Dialog, Slide} from '@mui/material';
import {Formik} from 'formik';
import * as yup from 'yup';
import PedidoMaritimoForm from './PedidoMaritimoForm';
import { ACTIONS } from '../../../shared/constants/Constantes';
import { PedidoMaritimoContext } from '../../../contexts/pedidoMaritimoContext/PedidoMaritimoContext';
import { ClienteContext } from '../../../contexts/clienteContext/ClienteContext';
import { TipoProductoMaritimoContext } from '../../../contexts/tipoProductoMaritimoContext/TipoProductoMaritimoContext';
import moment from 'moment';
import { FlotaContext } from '../../../contexts/flotaContext/FlotaContext';
import { PuertoContext } from '../../../contexts/puertoContext/PuertoContext';

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
  puerto_id: yup
    .number()
    .integer('Debe ser un entero')
    .required('Requerido'),
  flota_id: yup
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

const PedidoMaritimoCreador = (props) => {
  const {
    showForm,
    selected,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
  } = props;

  const { onCreate, onUpdate} = useContext(PedidoMaritimoContext);
  const { light: clientes, getLightList: getClientes} = useContext(ClienteContext);
  const { light: flotas, getLightList: getFlotas} = useContext(FlotaContext);
  const { light: puertos, getLightList: getPuertos} = useContext(PuertoContext);
  const { light: tiposProducto, getLightList: getTiposProductos} = useContext(TipoProductoMaritimoContext);

  useEffect(() => {
    getClientes();
    getPuertos();
    getFlotas();
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
            puerto_id: selected?.puerto_id??'',
            flota_id: selected?.flota_id??'',
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
            <PedidoMaritimoForm
              setFieldValue={setFieldValue}
              handleOnClose={handleOnClose}
              titulo={titulo}
              accion={accion}
              clientes={clientes}
              flotas={flotas}
              puertos={puertos}
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

export default PedidoMaritimoCreador;