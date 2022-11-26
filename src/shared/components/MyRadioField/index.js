import React from 'react';
import {Field, useField} from 'formik';
import {RadioGroup, Radio, FormControl, FormControlLabel, FormHelperText, FormLabel} from '@mui/material';
import { mainStyles } from '../../styles/mainStyles';

const MyRadioField = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <FormControl error={!!errorText} component='fieldset'>
      <div className={props.labelPlacement === 'start' ? mainStyles.labelLeft : ''}>
      <FormLabel {...props} {...field} className={props.labelPlacement === 'start' ? mainStyles.marginRight : ''}>
        {props.label}
      </FormLabel>
      <Field {...props} {...field} type='radio' as={RadioGroup} row>
        {props.options.map((option, index) => {
          return (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio color='primary' />}
              label={option.label}
              labelPlacement='end'
              disabled={props.disabled}
            />
          );
        })}
      </Field>
      </div>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};

export default MyRadioField;