import React, {useContext} from 'react';
import {Dialog, Slide} from '@mui/material';
import {Formik} from 'formik';
import * as yup from 'yup';
import ClienteForm from './ClienteForm';
import { ClienteContext } from '../../../contexts/clienteContext/ClienteContext';
import { ACTIONS } from '../../../shared/constants/Constantes';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  nombre: yup
    .string()
    .required('Requerido')
    .max('128', 'Debe tener máximo 128 Caracteres'),
  numero_documento: yup
    .string()
    .required('Requerido')
    .max('128', 'Debe tener máximo 128 Caracteres'),
  tipo_documento: yup
    .string()
    .required('Requerido')
    .max('2', 'Debe tener máximo 2 Caracteres'),
  telefono: yup
    .string()
    .nullable()
    .max('128', 'Debe tener máximo 128 Caracteres'),
  email: yup
    .string()
    .email('Formato inválido')
    .nullable()
    .max('128', 'Debe tener máximo 128 Caracteres'),
  direccion: yup
    .string()
    .nullable()
    .max('128', 'Debe tener máximo 128 Caracteres'),
});

const ClienteCreador = (props) => {
  const {
    showForm,
    selected,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
  } = props;

  const { onCreate, onUpdate} = useContext(ClienteContext);

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
            nombre: selected?.nombre??'',
            tipo_documento: selected?.tipo_documento??'',
            numero_documento: selected?.numero_documento??'',
            telefono: selected?.telefono??'',
            email: selected?.email??'',
            direccion: selected?.direccion??'',
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
            <ClienteForm
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

export default ClienteCreador;