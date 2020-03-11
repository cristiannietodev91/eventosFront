import http from "../http-common";

class ServiceCrm {
  
  getAllEventos() {
    return http.get(`/evento/getAll`);
  }

  crearEvento(evento) {
    return http.post("/evento/create", evento);
  }

  actualizarEvento(evento) {
    return http.put("/evento/update/"+evento.idevento, evento);
  }

  crearBoleto(boleto) {
    return http.post("/boleto/create", boleto);
  }

  validatePoker(poker) {
    return http.post("/poker/validateEscalera", poker);
  }

}

export default new ServiceCrm();
