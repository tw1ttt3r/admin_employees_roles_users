import { METADATA } from "#db/metadata.mjs";

const ROLESUSUARIOS = {
  IDROL: 'id_rol',
  IDUSUARIO: 'id_usuario',
  ESTATUS: 'estatus',
  ALTA: 'alta',
  BAJA: 'baja',
  ...METADATA
};

export {
  ROLESUSUARIOS
};