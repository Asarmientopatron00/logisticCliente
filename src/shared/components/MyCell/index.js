import React from 'react';
import TableCell from '@mui/material/TableCell';
import { mainStyles } from '../../styles/mainStyles';

const MyCell = (props) => {
  const {align, width, claseBase, value, cellColor} = props;

  let allClassName = claseBase;

  if (width !== undefined) {
    allClassName = `${allClassName} ${mainStyles.cellWidth}`;
  }

  return (
    <TableCell align={align} className={allClassName}>
      <span className={cellColor ? mainStyles.cellColor : ''}>{value}</span>
    </TableCell>
  );
};

export default MyCell;
