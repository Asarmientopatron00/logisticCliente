import React, {useState, useEffect, useContext} from 'react';
import {
  Box, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  Pagination
} from '@mui/material';
import {
  Delete, 
  Edit, 
  Add,
  Visibility,
  ClearAll
} from '@mui/icons-material';
import Swal from 'sweetalert2';
import moment from 'moment';
import PuertoCreador from './PuertoCreador';
import {
  UPDATE,
  CREATE,
  DELETE,
  ROWS_PER_PAGE_OPTIONS,
  ACTIONS,
} from '../../shared/constants/Constantes';
import MessageView  from '../../shared/components/MessageView';
import MyCell from '../../shared/components/MyCell';
import {useDebounce} from '../../shared/customHooks/useDebounce';
import {mainStyles} from '../../shared/styles/mainStyles';
import { CommonContext } from '../../contexts/commonContext/commonContext';
import { PuertoContext } from '../../contexts/puertoContext/PuertoContext';

const cells = [
  {
    id: 'nombre',
    typeHead: 'string',
    label: 'Nombre',
    value: (value) => value,
    align: 'left',
  },
  {
    id: 'direccion',
    typeHead: 'string',
    label: 'Dirección',
    value: (value) => value,
    align: 'left',
  },
  {
    id: 'fecha_modificacion',
    typeHead: 'string',
    label: 'Fecha Modificación',
    value: (value) => moment(value).format('DD-MM-YYYY HH:mm:ss'),
    align: 'left',
  },
  {
    id: 'fecha_creacion',
    typeHead: 'string',
    label: 'Fecha Creación',
    value: (value) => moment(value).format('DD-MM-YYYY HH:mm:ss'),
    align: 'left',
  },
];

function EnhancedTableHead(props) {
  const {cells} = props;

  return (
    <TableHead>
      <TableRow className={'head'}>
        <TableCell
          align='center'
          style={{fontWeight: 'bold'}}
          className={'headCell'}>
          {'Acciones'}
        </TableCell>
        {cells.map((cell) => (
          <TableCell
            key={cell.id}
            style={{fontWeight: 'bold'}}
            align={cell.align}
            className={'cell'}
          >
            {cell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const {
    onOpenAddPuerto,
    queryFilter,
    nombre,
    limpiarFiltros,
    titulo
  } = props;
  return (
    <Toolbar sx={mainStyles.toolbarRoot}>
      <>
        <Box sx={mainStyles.titleTop}>
          <Typography
            sx={mainStyles.title}
            variant='h6'
            component='div'>
            {titulo}
          </Typography>
          <Box sx={mainStyles.horizontalBottoms}>
            <Tooltip
              title='Crear Puerto'
              onClick={onOpenAddPuerto}>
              <IconButton
                sx={mainStyles.createButton}
                aria-label='filter list'>
                  <Add/>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box sx={mainStyles.contenedorFiltros}>
          <TextField
            label='Nombre'
            name='nombre'
            variant='standard'
            onChange={queryFilter}
            value={nombre}
            sx={mainStyles.inputFiltros}
          />
          <Box display='grid'>
            <Box display='flex' mb={2}>
              <Tooltip title='Limpiar Filtros' onClick={limpiarFiltros}>
                <IconButton
                  sx={mainStyles.clearButton}
                  aria-label='filter list'>
                  <ClearAll />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </>
    </Toolbar>
  );
};

const initialFilters = {
  nombre: '',
}

const titulo = 'Puertos';

const Puerto = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [accion, setAccion] = useState(ACTIONS.ver);
  const [selected, setSelected] = useState(0);
  const [filters, setFilters] = useState(initialFilters);
  const {rows, desde, hasta, ultima_pagina, total, getList, onDelete} = useContext(PuertoContext);
  const {message, error, messageType} = useContext(CommonContext);
  // const classes = useStyles({vp: '0px'});
  const textoPaginacion = `Mostrando de ${desde} a ${hasta} de ${total} resultados - Página ${page} de ${ultima_pagina}`;
  const { nombre } = filters;
  const debouncedName = useDebounce(nombre, 800);

  useEffect(() => {
    if (message && messageType === DELETE) {
      Swal.fire('Eliminado', message, 'success');
      updateColeccion();
    }
  }, [message, messageType]); // eslint-disable-line

  useEffect(() => {
    if (rows.length === 0) {
      setShowTable(false);
    } else {
      setShowTable(true);
    }
  }, [rows]);

  useEffect(() => {
    getList({page, rowsPerPage, name: nombre});
  }, [page, rowsPerPage, debouncedName]); //eslint-disable-line

  useEffect(() => {
    setPage(1);
  }, [debouncedName]);

  const queryFilter = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const limpiarFiltros = () => {
    setFilters(initialFilters);
  };

  const updateColeccion = () => {
    setPage(1);
    getList(page, rowsPerPage, nombre);
  };

  const onOpenEditPuerto = (row) => {
    setSelected(row);
    setAccion(ACTIONS.editar);
    setShowForm(true);
  };

  const onOpenViewPuerto = (row) => {
    setSelected(row);
    setAccion(ACTIONS.ver);
    setShowForm(true);
  };

  const onDeletePuerto = (id) => {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Seguro Que Desea Eliminar La Puerto?',
      allowEscapeKey: false,
      allowEnterKey: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
      }
    });
  };

  const onOpenAddPuerto = () => {
    setSelected(0);
    setAccion(ACTIONS.crear);
    setShowForm(true);
  };

  const handleOnClose = () => {
    setShowForm(false);
    setSelected(0);
    setAccion(ACTIONS.ver);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <Box sx={mainStyles.root}>
      <Paper sx={mainStyles.paper}>
        <EnhancedTableToolbar
          onOpenAddPuerto={onOpenAddPuerto}
          queryFilter={queryFilter}
          limpiarFiltros={limpiarFiltros}
          nombre={nombre}
          titulo={titulo}
        />
        {showTable ? (
          <Box sx={mainStyles.marcoTabla}>
            <Box sx={mainStyles.paginacion}>
              <Box>
                <p>{textoPaginacion}</p>
              </Box>
              <Box sx={mainStyles.paginacion}>
                <select
                  style={{marginRight: '10px'}}
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}>
                  {ROWS_PER_PAGE_OPTIONS.map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
                <Pagination
                  showFirstButton
                  showLastButton
                  onChange={handleChangePage}
                  count={ultima_pagina}
                  page={page}
                />
              </Box>
            </Box>

            <TableContainer>
              <Table
                sx={mainStyles.table}
                aria-labelledby='tableTitle'
                size={'small'}
                aria-label='enhanced table'>
                <EnhancedTableHead
                  cells={cells}
                />
                <TableBody>
                  {
                    rows.map((row, index) => {
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.id}
                          sx={mainStyles.row}
                        >
                          <TableCell align='center' sx={mainStyles.acciones}>
                            <Tooltip title={'Editar'}>
                              <Edit
                                onClick={() => onOpenEditPuerto(row)}
                                sx={{...mainStyles.generalIcons, ...mainStyles.editIcon}}
                              />
                            </Tooltip>
                            <Tooltip title={'Ver'}>
                              <Visibility
                                onClick={() => onOpenViewPuerto(row)}
                                sx={{...mainStyles.generalIcons, ...mainStyles.visivilityIcon}}
                              />
                            </Tooltip>
                            <Tooltip title={'Eliminar'}>
                              <Delete
                                onClick={() => onDeletePuerto(row.id)}
                                sx={{...mainStyles.generalIcons, ...mainStyles.deleteIcon}}
                              />
                            </Tooltip>
                          </TableCell>
                          {cells.map((columna, index) => (
                            <MyCell
                              // useStyles={useStyles}
                              key={index}
                              align={columna.align}
                              width={columna.width}
                              claseBase={'cell'}
                              value={columna.value(row[columna.id])}
                              cellColor={
                                columna.cellColor
                                  ? columna.cellColor(row[columna.id])
                                  : ''
                              }
                              popover={columna.id === 'valor_parametro'}
                            />
                          ))}
                        </TableRow>
                      );
                    })
                  }
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={mainStyles.paginacion}>
              <Box>
                <p>{textoPaginacion}</p>
              </Box>
              <Box sx={mainStyles.paginacion}>
                <select
                  style={{marginRight: '10px'}}
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}>
                  {ROWS_PER_PAGE_OPTIONS.map((option) => {
                    return (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
                <Pagination
                  showFirstButton
                  showLastButton
                  onChange={handleChangePage}
                  count={ultima_pagina}
                  page={page}
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            component='h2'
            padding={4}
            fontSize={19}
            sx={mainStyles.marcoTabla}>
            Sin Resultados
          </Box>
        )}
      </Paper>

      {showForm && (
        <PuertoCreador
          showForm={showForm}
          selected={selected}
          accion={accion}
          handleOnClose={handleOnClose}
          updateColeccion={updateColeccion}
          titulo={titulo}
        />
      )}

      <MessageView
        variant={messageType === UPDATE || messageType === CREATE ? 'success' : 'error'}
        message={messageType === UPDATE || messageType === CREATE ? message : error}
      />
    </Box>
  );
};

export default Puerto;
