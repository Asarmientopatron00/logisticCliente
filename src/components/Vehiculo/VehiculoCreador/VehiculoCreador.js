import React, {useContext} from 'react';
import {Dialog, Slide} from '@mui/material';
import {Formik} from 'formik';
import * as yup from 'yup';
import VehiculoForm from './VehiculoForm';
import { ACTIONS } from '../../../shared/constants/Constantes';
import { VehiculoContext } from '../../../contexts/vehiculoContext/VehiculoContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const validationSchema = yup.object({
  placa: yup
    .string()
    .nullable()
    .max('6', 'Debe tener 6 Caracteres')
    .min('6', 'Debe tener 6 Caracteres')
    .matches(/^[a-zA-Z]{3}[0-9]{3}/, 'Formato inválido'),
  marca: yup
    .string()
    .nullable()
    .max('128', 'Debe tener máximo 128 Caracteres'),
  modelo: yup
    .string()
    .nullable()
    .max('128', 'Debe tener máximo 128 Caracteres'),
});

const VehiculoCreador = (props) => {
  const {
    showForm,
    selected,
    handleOnClose,
    accion,
    updateColeccion,
    titulo,
  } = props;

  const { onCreate, onUpdate} = useContext(VehiculoContext);

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
            placa: selected?.placa??'',
            marca: selected?.marca??'',
            modelo: selected?.modelo??'',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, {setSubmitting}) => {
            setSubmitting(true);
            data.placa = data.placa.toUpperCase();
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
            <VehiculoForm
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

export default VehiculoCreador;