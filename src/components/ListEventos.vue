<template>
  <div class="hello">
    <b-button
      v-b-modal.modalCreateEvent
      class="rounded-pill m-4 fixed-bottom"
      variant="outline-primary"
    >
      <b-icon icon="plus" aria-hidden="true"></b-icon>
      <span class="sr-only">Crear evento</span>
      Crear evento
    </b-button>
    <b-card title="Lista de eventos" class="overflow-hidden">
      <b-table
        dark
        striped
        hover
        :items="eventos"
        :fields="fields"
        :busy="isBusy"
        show-empty
        sticky-header
        responsive="sm"
        head-variant="dark"
        table-variant="info"
        class="rounded-lg"
      >
        <template v-slot:cell(show_details)="row">
          <b-button size="sm" @click="info(row.item)" variant="warning">
            <b-icon icon="pencil"></b-icon>Editar
          </b-button>
          <b-button size="sm" @click="comprar(row.item)" variant="warning">
            <b-icon icon="tag"></b-icon>Comprar
          </b-button>
        </template>
        <template v-slot:cell(fechaevento)="data">
          <span>{{ new Date(data.item.fechaevento).toLocaleString("en-US", {timeZone: "UTC"}) | moment("DD-MM-YYYY") }}</span>
        </template>
        <template v-slot:empty="scope">
          <h4>{{ scope.emptyText }}</h4>
        </template>
        <template v-slot:emptyfiltered="scope">
          <h4>{{ scope.emptyFilteredText }}</h4>
        </template>
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
      </b-table>
      <b-modal
        id="modalCreateEvent"
        ref="modal"
        title="Crear evento"
        headerBgVariant="dark"
        header-text-variant="warning"
        footer-bg-variant="warning"
        footer-text-variant="dark"
        @hidden="resetModal"
        @ok="handleOk"
        button-size="sm"
        size="md"
      >
        <b-form ref="formEvento" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            label="Nombre evento"
            label-for="name-input"
            invalid-feedback="El nombre del evento es requerido"
            description="El nombre que tendra el evento."
            label-size="sm"
            class="mb-1"
          >
            <b-form-input
              id="name-input"
              v-model="$v.form.nameEvento.$model"
              :state="!$v.form.nameEvento.$error"
              required
              size="sm"
            >
              <b-form-invalid-feedback
                v-if="!$v.form.nameEvento.required"
              >El nombre del evento es requerido</b-form-invalid-feedback>
            </b-form-input>
          </b-form-group>
          <b-form-group
            :state="form.fechaEventoState"
            label-cols-sm="4"
            label-cols-lg="3"
            label="Fecha"
            label-for="fecha-evento-input"
            invalid-feedback="La fecha es requerido"
            description="Fecha en que sera el evento."
            label-size="sm"
            class="mb-1"
          >
            <b-form-datepicker
              id="fecha-evento-input"
              v-model="$v.form.fechaEvento.$model"
              :state="!$v.form.fechaEvento.$error"
              :min="min"
              locale="es"
              required
              size="sm"
            >
              <b-form-invalid-feedback
                v-if="!$v.form.fechaEvento.required"
              >La fecha del evento es requerida</b-form-invalid-feedback>
            </b-form-datepicker>
          </b-form-group>
          <b-form-group
            :state="form.contactoEventoState"
            label-cols-sm="4"
            label-cols-lg="3"
            label="Contacto"
            label-for="fecha-evento-input"
            description="Nombre quien organiza."
            label-size="sm"
            class="mb-1"
          >
            <b-form-input
              id="fecha-evento-input"
              v-model="form.contactoEvento"
              :state="form.contactoEventoState"
              size="sm"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            label="URL"
            label-for="url-input"
            description="URL Informacion evento."
            label-size="sm"
            class="mb-1"
          >
            <b-form-input
              id="url-input"
              url
              v-model="$v.form.urlEvento.$model"
              :state="!$v.form.urlEvento.$error"
              size="sm"
            >
              <b-form-invalid-feedback
                v-if="!$v.form.fechaEvento.url"
              >No tiene el formato de una URL http://aaaa ...</b-form-invalid-feedback>
            </b-form-input>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            label="Compañia"
            label-for="company-input"
            description="Compañia organiza el evento."
            label-size="sm"
            class="mb-1"
          >
            <b-form-input
              id="company-input"
              v-model="form.companyEvento"
              :state="form.companyEventoState"
              size="sm"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            :state="form.ciudadEventoState"
            label-cols-sm="4"
            label-cols-lg="3"
            label="Ciudad"
            label-for="select-ciudad"
            description="Ciudad donde se organiza."
            label-size="sm"
            class="mb-1"
          >
            <v-select
              id="select-ciudad"
              :options="ciudades"
              label="label"
              v-model="form.ciudad"
              size="sm"
            >
              <template #search="{attributes, events}">
                <input
                  class="vs__search"
                  :required="!form.ciudad"
                  v-bind="attributes"
                  v-on="events"
                />
              </template>
            </v-select>
          </b-form-group>
          <b-form-group
            label-cols-sm="4"
            label-cols-lg="3"
            label="Departamento"
            label-for="departamento-input"
            description="Departamento donde se organiza."
            label-size="sm"
            class="mb-1"
          >
            <b-form-input
              id="departamento-input"
              v-model="form.departamentoEvento"
              :state="form.departamentoEventoState"
              size="sm"
            ></b-form-input>
          </b-form-group>
        </b-form>
      </b-modal>
      <ComprarBoleto :idevento="idevento" />
    </b-card>
  </div>
</template>

<script>
import Services from "../services/service";
import { required, url } from "vuelidate/lib/validators";

import ComprarBoleto from "./modals/modalcomprar";

export default {
  name: "ListEventos",
  components: {
    ComprarBoleto
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    return {
      idevento: null,
      form: {
        idevento: null,
        nameEvento: null,
        fechaEvento: null,
        contactoEvento: null,
        urlEvento: null,
        companyEvento: null,
        ciudadEvento: null,
        departamentoEvento: null
      },
      min: minDate,
      isBusy: false,
      fields: [
        "nombrevento",
        "fechaevento",
        "contactoevento",
        "companyname",
        "ciudad",
        "departamento",
        "show_details"
      ],
      eventos: [],
      ciudades: [
        { key: "Bogota", label: "Bogota D.C" },
        { key: "Medellin", label: "Medellin" },
        { key: "Cali", label: "Cali" }
      ]
    };
  },
  validations: {
    form: {
      nameEvento: {
        required
      },
      fechaEvento: {
        required
      },
      urlEvento: {
        url
      }
    }
  },
  mounted() {
    this.loadEventos();
  },
  methods: {
    loadEventos() {
      this.toggleBusy();
      Services.getAllEventos().then(response => {
        this.eventos = response.data;
        this.isLoad = true;
        this.toggleBusy();
      }).catch(error => {
          this.$notify({group: 'foo',type: 'error',title: 'Resultado',text: 'Ocurrio un error al listar eventos '+error.message,duration: 5000});
        });
    },
    toggleBusy() {
      this.isBusy = !this.isBusy;
    },
    resetModal() {
      /*this.form.nameEvento = "";
      this.nameEventoState = null;*/
      this.form = {
        idevento: null,
        nameEvento: null,
        fechaEvento: null,
        contactoEvento: null,
        urlEvento: null,
        companyEvento: null,
        ciudadEvento: null,
        departamentoEvento: null
      };
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      this.$v.$touch();
      // Exit when the form isn't valid
      if (this.$v.form.$pending || this.$v.form.$error) return;

      var evento = {
        idevento: this.form.idevento,
        nombrevento: this.form.nameEvento,
        fechaevento: this.form.fechaEvento,
        contactoevento: this.form.contactoEvento,
        urlcontacto: this.form.urlEvento,
        companyname: this.form.companyEvento,
        ciudad: this.form.ciudadEvento,
        departamento: this.form.departamentoEvento
      };

      if (!evento.idevento) {
        Services.crearEvento(evento).then(response => {
          if (response.status == 200) {
            this.loadEventos();
            this.$bvModal.hide("modalCreateEvent");
            this.$notify({group: 'foo',type: 'success',title: 'Resultado',text: 'Se creo el evento',duration: 5000});
          }else{
            this.$bvModal.hide("modalCreateEvent");
            this.$notify({group: 'foo',type: 'error',title: 'Resultado',text: 'Ocurrio un error al actualizar evento'+response.message,duration: 5000});
          }
        }).catch(error => {
          this.$notify({group: 'foo',type: 'error',title: 'Resultado',text: 'Ocurrio un error al actualizar evento '+error.message,duration: 5000});
        });
      } else {
        Services.actualizarEvento(evento).then(response => {
          if (response.status == 202) {
            this.loadEventos();
            this.$bvModal.hide("modalCreateEvent");
            this.$notify({group: 'foo',type: 'success',title: 'Resultado',text: 'Se actualizo el evento',duration: 5000});
          }else{
            this.$bvModal.hide("modalCreateEvent");
            this.$notify({group: 'foo',type: 'error',title: 'Resultado',text: 'Ocurrio un error al actualizar evento'+response.message,duration: 5000});
          }
        }).catch(error => {
          this.$notify({group: 'foo',type: 'error',title: 'Resultado',text: 'Ocurrio un error al actualizar evento '+error.message,duration: 5000});
        });
      }
    },
    info(item) {
      //this.infoModal.title = `Row index: ${index}`
      var DateUTC=new Date(item.fechaevento).toLocaleString("en-US", {timeZone: "UTC"})
      this.form = {
        idevento: item.idevento,
        nameEvento: item.nombrevento,
        fechaEvento: new Date(DateUTC),
        contactoEvento: item.contactoevento,
        urlEvento: item.urlcontacto,
        companyEvento: item.companyname,
        ciudadEvento: item.ciudad,
        departamentoEvento: item.departamento
      };
      //his.$root.$emit('bv::show::modalCreateEvent', this.infoModal.id, button)
      this.$bvModal.show("modalCreateEvent");
    },
    comprar(item) {
      this.idevento = item.idevento;
      this.$bvModal.show("modalComprarBoleto");
      //this.$bvModal.show("modalComprarBoleto");
      //this.$root.$emit('bv::show::modal', 'modalComprarBoleto', '#btnShow')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
