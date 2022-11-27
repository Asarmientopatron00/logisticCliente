export const UPDATE = 1;
export const CREATE = 2;
export const DELETE = 3;
export const ERROR = 4;
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50];
export const ACTIONS = {
  ver: 'ver',
  editar: 'editar',
  crear: 'crear'
}
export const TIPOS_DOCUMENTOS = [
  {id: 'CC', nombre: 'Cédula de Ciudadanía', estado: 1},
  {id: 'CE', nombre: 'Cédula de Extranjería', estado: 1},
  {id: 'NI', nombre: 'NIT', estado: 1},
  {id: 'PS', nombre: 'Pasaporte', estado: 1},
  {id: 'TI', nombre: 'Tarjeta de Identidad', estado: 1},
];
export const ESTADOS_PEDIDO = [
  {id: 'P', nombre: 'Pendiente', estado: 1},
  {id: 'F', nombre: 'Finalizado', estado: 1},
];
export const NAVIGATION_OPTIONS = [
  {
    id: 1, 
    name: 'General', 
    subOptions: [
      { id: 11, name: 'Clientes', url: '/' }
    ]
  },
  { 
    id: 2,
    name: 'Logística Terrestre',
    subOptions: [
      { id: 21, name: 'Pedidos', url: '/pedidos-terrestres' },
      { id: 22, name: 'Tipos Productos', url: '/tipos-productos-terrestres' },
      { id: 23, name: 'Bodegas', url: '/bodegas' },
      { id: 24, name: 'Vehiculos', url: '/vehiculos' },
    ]
  },
  {
    id: 3,
    name: 'Logística Marítima', 
    subOptions: [
      { id: 31, name: 'Pedidos', url: '/pedidos-maritimos' },
      { id: 32, name: 'Tipos Productos', url: '/tipos-productos-maritimos' },
      { id: 33, name: 'Puertos', url: '/puertos' },
      { id: 34, name: 'Flotas', url: '/flotas' },
    ]
  },
];