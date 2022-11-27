import React, {useContext} from 'react';
import {Dialog, Slide} from '@mui/material';
import {Formik} from 'formik';
import * as yup from 'yup';
import TipoProductoTerrestreForm from './TipoProductoTerrestreForm';
import { ACTIONS } from '../../../shared/constants/Constantes';
import { TipoProductoTerrestreContext } from '../../../contexts/tipoProductoTerrestreContext/TipoProductoTerrestreContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  codigo: yup
    .string()
    .required('Requerido')
    .max('128', 'Debe tener máximo 128 Caracteres'),
  nombre: yup
    .string()
    .required('Requerido')
    .max('128', 'Debe tener máximo 128 Caracteres'),
  precio_unitario: yup
    .number()
    .required('Requerido'),
});

const TipoProductoTerrestreCreador = (props) => {
  const {
    showForm,
    selected,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
  } = props;

  const { onCreate, onUpdate} = useContext(TipoProductoTerrestreContext);

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
            codigo: selected?.codigo??'',
            nombre: selected?.nombre??'',
            precio_unitario: selected?.precio_unitario??'',
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
          {({initialValues, setFieldValue}) => (
            <TipoProductoTerrestreForm
              setFieldValue={setFieldValue}
              handleOnClose={handleOnClose}
              titulo={titulo}
              accion={accion}
              initialValues={initialValues}
            />
          )}
        </Formik>
      </Dialog>
    )
  );
};

export default TipoProductoTerrestreCreador;