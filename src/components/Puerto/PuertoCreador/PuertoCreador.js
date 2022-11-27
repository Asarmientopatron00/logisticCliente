import React, {useContext} from 'react';
import {Dialog, Slide} from '@mui/material';
import {Formik} from 'formik';
import * as yup from 'yup';
import PuertoForm from './PuertoForm';
import { ACTIONS } from '../../../shared/constants/Constantes';
import { PuertoContext } from '../../../contexts/puertoContext/PuertoContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  nombre: yup
    .string()
    .required('Requerido')
    .max('128', 'Debe tener máximo 128 Caracteres'),
  direccion: yup
    .string()
    .required('Requerido')
    .max('128', 'Debe tener máximo 128 Caracteres'),
});

const PuertoCreador = (props) => {
  const {
    showForm,
    selected,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
  } = props;

  const { onCreate, onUpdate} = useContext(PuertoContext);

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
            <PuertoForm
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

export default PuertoCreador;