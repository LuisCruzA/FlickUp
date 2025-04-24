export interface Trabajo {
  id: string;
  titulo: string;
  publicadoHace: string;
  precio: string;
  tiempoDisponible: string;
  descripcion: string;
  categoria: string;
  estado: string;
  habilidadesRequeridas: string[];
  nivelComplejidad: string;
  destacado: boolean;
}

export interface Contrato {
  id: string;
  titulo: string;
  fechaInicio: string;
  fechaFin: string;
  precio: string;
  descripcionpago: string;
  estatus: string;
  tipo: string;
  descripcion: string;
}

export interface Chat {
  id_project: string;
  id_otrapersona: string;
  project_title: string;
  name: string;
  last_message: string;
  time: string;
  avatar: string;
}
  

export type Mensaje = {
  id: string;
  sender_id: string;
  texto: string;
};
