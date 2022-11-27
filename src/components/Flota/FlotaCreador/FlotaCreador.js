import React, {useContext} from 'react';
import {Dialog, Slide} from '@mui/material';
import {Formik} from 'formik';
import * as yup from 'yup';
import FlotaForm from './FlotaForm';
import { ACTIONS } from '../../../shared/constants/Constantes';
import { FlotaContext } from '../../../contexts/flotaContext/FlotaContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  numero: yup
    .string()
    .required('Requerido')
    .max('8', 'Debe tener 8 Caracteres')
    .min('8', 'Debe tener 8 Caracteres')
    .matches(/^[a-zA-Z]{3}[0-9]{4}[a-zA-Z]{1}/, 'Formato inválido'),
  nombre: yup
    .string()
    .required('Requerido')
    .max('128', 'Debe tener máximo 128 Caracteres'),
});

const FlotaCreador = (props) => {
  const {
    showForm,
    selected,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
  } = props;

  const { onCreate, onUpdate} = useContext(FlotaContext);

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
            numero: selected?.numero??'',
            nombre: selected?.nombre??'',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            data.numero = data.numero.toUpperCase();
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
            <FlotaForm
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

export default FlotaCreador;