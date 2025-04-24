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

  export interface Contrato{

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