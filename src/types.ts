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
    contract_id: string;
    project_id: string;
    freelancer_id: string;
    client_id: string;
    start_date: string;
    end_date: string;
    agreed_amount: number;
    payment_terms: string;
    status: 'pendiente' | 'aceptado' | string;
    contract_type: string;
    terms_conditions: string;
    project_title: string; // ← viene del JOIN como alias
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
