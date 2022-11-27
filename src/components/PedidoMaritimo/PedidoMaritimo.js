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
  Pagination,
  MenuItem
} from '@mui/material';
import {
  Delete, 
  Edit, 
  Add,
  Visibility,
  ClearAll
} from '@mui/icons-material';
import Swal from 'sweetalert2';
import PedidoMaritimoCreador from './PedidoMaritimoCreador';
import {
  UPDATE,
  CREATE,
  DELETE,
  ROWS_PER_PAGE_OPTIONS,
  ACTIONS,
  ESTADOS_PEDIDO,
} from '../../shared/constants/Constantes';
import MessageView  from '../../shared/components/MessageView';
import MyCell from '../../shared/components/MyCell';
import {useDebounce} from '../../shared/customHooks/useDebounce';
import {mainStyles} from '../../shared/styles/mainStyles';
import { CommonContext } from '../../contexts/commonContext/commonContext';
import { PedidoMaritimoContext } from '../../contexts/pedidoMaritimoContext/PedidoMaritimoContext';
import { currencyFormatter } from '../../shared/utils/utils';
import { ClienteContext } from '../../contexts/clienteContext/ClienteContext';
import { TipoProductoMaritimoContext } from '../../contexts/tipoProductoMaritimoContext/TipoProductoMaritimoContext';

const cells = [
  {
    id: 'guia',
    typeHead: 'string',
    label: 'Guia',
    value: (value) => value,
    align: 'left',
  },
  {
    id: 'cliente',
    typeHead: 'string',
    label: 'Cliente',
    value: (value) => value,
    align: 'left',
  },
  {
    id: 'tipo_producto',
    typeHead: 'string',
    label: 'Producto',
    value: (value) => value,
    align: 'left',
  },
  {
    id: 'cantidad_producto',
    typeHead: 'string',
    label: 'Cantidad',
    value: (value) => value,
    align: 'right',
  },
  {
    id: 'puerto',
    typeHead: 'string',
    label: 'Puerto',
    value: (value) => value,
    align: 'left',
  },
  {
    id: 'precio_envio',
    typeHead: 'string',
    label: 'Envio',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
  },
  {
    id: 'descuento',
    typeHead: 'string',
    label: 'Descuento',
    value: (value) => currencyFormatter.format(value),
    align: 'right',
  },
  {
    id: 'fecha_registro',
    typeHead: 'string',
    label: 'Fecha Registro',
    value: (value) => value,
    align: 'left',
  },
  {
    id: 'fecha_entrega',
    typeHead: 'string',
    label: 'Fecha Entrega',
    value: (value) => value,
    align: 'left',
  },
  {
    id: 'estado',
    typeHead: 'string',
    label: 'Estado',
    value: (value) => ESTADOS_PEDIDO.map((state) => state.id === value ? state.nombre : ''),
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
    onOpenAddPedidoMaritimo,
    queryFilter,
    guia,
    limpiarFiltros,
    titulo,
    fechaInicial,
    fechaFinal,
    estado,
    clientes,
    cliente,
    tiposProducto,
    producto
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
              title='Crear PedidoMaritimo'
              onClick={onOpenAddPedidoMaritimo}>
              <IconButton
                sx={mainStyles.createButton}
                aria-label='filter list'>
                  <Add/>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box sx={mainStyles.contenedorFiltros2}>
          <TextField
            label='Guia'
            name='guia'
            variant='standard'
            onChange={queryFilter}
            value={guia}
            sx={mainStyles.inputFiltros}
          />
          <TextField
            label='Fecha Inicial Reg.'
            name='fechaInicial'
            variant='standard'
            type='date'
            InputLabelProps={{
              shrink: true
            }}
            onChange={queryFilter}
            value={fechaInicial}
            sx={mainStyles.inputFiltros}
          />
          <TextField
            label='Fecha Final Reg.'
            name='fechaFinal'
            variant='standard'
            type='date'
            InputLabelProps={{
              shrink: true
            }}
            onChange={queryFilter}
            value={fechaFinal}
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
          <TextField
            label='Estado Pedido'
            name='estado'
            variant='standard'
            select
            onChange={queryFilter}
            value={estado}>
            {ESTADOS_PEDIDO.map((estado) => {
              return (
                <MenuItem
                  value={estado.id}
                  key={estado.id}
                  id={estado.id}
                  sx={mainStyles.pointer}
                >
                  {estado.nombre}
                </MenuItem>
              );
            })}
            </TextField>
          <TextField
            label='Cliente'
            name='cliente'
            variant='standard'
            select
            onChange={queryFilter}
            value={cliente}>
            {clientes.map((customer) => {
              return (
                <MenuItem
                  value={customer.id}
                  key={customer.id}
                  id={customer.id}
                  sx={mainStyles.pointer}
                >
                  {customer.nombre}
                </MenuItem>
              );
            })}
            </TextField>
          <TextField
            label='Tipo Producto'
            name='producto'
            variant='standard'
            select
            onChange={queryFilter}
            value={producto}>
            {tiposProducto.map((productType) => {
              return (
                <MenuItem
                  value={productType.id}
                  key={productType.id}
                  id={productType.id}
                  sx={mainStyles.pointer}
                >
                  {productType.nombre}
                </MenuItem>
              );
            })}
            </TextField>
        </Box>
      </>
    </Toolbar>
  );
};

const initialFilters = {
  guia: '',
  fechaInicial: '',
  fechaFinal: '',
  estado: '',
  cliente: '',
  producto: ''
}

const titulo = 'Pedidos Log. Maritima';

const PedidoMaritimo = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [accion, setAccion] = useState(ACTIONS.ver);
  const [selected, setSelected] = useState(0);
  const [filters, setFilters] = useState(initialFilters);
  const {rows, desde, hasta, ultima_pagina, total, getList, onDelete} = useContext(PedidoMaritimoContext);
  const {message, error, messageType} = useContext(CommonContext);
  const { light: clientes, getLightList: getClientes} = useContext(ClienteContext);
  const { light: tiposProducto, getLightList: getTiposProductos} = useContext(TipoProductoMaritimoContext);
  const textoPaginacion = `Mostrando de ${desde} a ${hasta} de ${total} resultados - Página ${page} de ${ultima_pagina}`;
  const { guia, fechaInicial, fechaFinal, estado, cliente, producto } = filters;
  const debouncedName = useDebounce(guia, 800);

  useEffect(() => {
    getClientes();
    getTiposProductos();
  },[]) // eslint-disable-line

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
    getList({page, rowsPerPage, guia, fechaInicial, fechaFinal, estado, cliente, producto});
  }, [page, rowsPerPage, debouncedName, fechaInicial, fechaFinal, estado, cliente, producto]); //eslint-disable-line

  useEffect(() => {
    setPage(1);
  }, [debouncedName, guia, fechaInicial, fechaFinal, estado, cliente, producto]);

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
    getList({page, rowsPerPage, guia, fechaInicial, fechaFinal, estado, cliente, producto});
  };

  const onOpenEditPedidoMaritimo = (row) => {
    setSelected(row);
    setAccion(ACTIONS.editar);
    setShowForm(true);
  };

  const onOpenViewPedidoMaritimo = (row) => {
    setSelected(row);
    setAccion(ACTIONS.ver);
    setShowForm(true);
  };

  const onDeletePedidoMaritimo = (id) => {
    Swal.fire({
      title: 'Confirmar',
      text: '¿Seguro Que Desea Eliminar El Pedido?',
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

  const onOpenAddPedidoMaritimo = () => {
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
          onOpenAddPedidoMaritimo={onOpenAddPedidoMaritimo}
          queryFilter={queryFilter}
          limpiarFiltros={limpiarFiltros}
          guia={guia}
          fechaInicial={fechaInicial}
          fechaFinal={fechaFinal}
          estado={estado}
          titulo={titulo}
          clientes={clientes}
          cliente={cliente}
          producto={producto}
          tiposProducto={tiposProducto}
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
                                onClick={() => onOpenEditPedidoMaritimo(row)}
                                sx={{...mainStyles.generalIcons, ...mainStyles.editIcon}}
                              />
                            </Tooltip>
                            <Tooltip title={'Ver'}>
                              <Visibility
                                onClick={() => onOpenViewPedidoMaritimo(row)}
                                sx={{...mainStyles.generalIcons, ...mainStyles.visivilityIcon}}
                              />
                            </Tooltip>
                            <Tooltip title={'Eliminar'}>
                              <Delete
                                onClick={() => onDeletePedidoMaritimo(row.id)}
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
        <PedidoMaritimoCreador
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

export default PedidoMaritimo;
