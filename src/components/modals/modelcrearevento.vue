<template>
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
          v-model="$v.evento.nameEvento.$model"
          :state="!$v.evento.nameEvento.$error"
          required
          size="sm"
        >
          <b-form-invalid-feedback
            v-if="!$v.evento.nameEvento.required"
          >El nombre del evento es requerido</b-form-invalid-feedback>
        </b-form-input>
      </b-form-group>
      <b-form-group
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
          v-model="$v.evento.fechaEvento.$model"
          :state="!$v.evento.fechaEvento.$error"
          :min="min"
          locale="es"
          required
          size="sm"
        >
          <b-form-invalid-feedback
            v-if="!$v.evento.fechaEvento.required"
          >La fecha del evento es requerida</b-form-invalid-feedback>
        </b-form-datepicker>
      </b-form-group>
      <b-form-group
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
          v-model="$v.evento.contactoEvento.$model"
          :state="!$v.evento.contactoEvento.$error"
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
          v-model="$v.evento.urlEvento.$model"
          :state="!$v.evento.urlEvento.$error"
          size="sm"
        >
          <b-form-invalid-feedback
            v-if="!$v.evento.fechaEvento.url"
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
          v-model="$v.evento.companyEvento.$model"
          :state="!$v.evento.companyEvento.$error"
          size="sm"
        ></b-form-input>
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
          v-model="$v.evento.departamentoEvento.$model"
          :state="!$v.evento.departamentoEvento.$error"
          size="sm"
        ></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import Services from "../../services/service";
import { required, url } from "vuelidate/lib/validators";

export default {
  name: "crearEvento",
  props: ["evento"],
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);
    return {
      min: minDate,
      ciudades: [
        { key: "Bogota", label: "Bogota D.C" },
        { key: "Medellin", label: "Medellin" },
        { key: "Cali", label: "Cali" }
      ]
    };
  },
  validations: {
    evento: {
      nameEvento: {
        required
      },
      fechaEvento: {
        required
      },
      ciudad:{
        required
      },
      urlEvento: {
        url
      },
      contactoEvento:{

      },
      companyEvento:{

      },
      departamentoEvento :{

      }
    }
  },
  methods: {
    resetModal() {
      /*this.form.nameEvento = "";
      this.nameEventoState = null;*/
      this.evento = {
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
      //this.$v.$touch();
      // Exit when the form isn't valid
      if (this.$v.evento.$pending || this.$v.evento.$error) return;

      var myevento = {
        idevento: this.evento.idevento,
        nombrevento: this.evento.nameEvento,
        fechaevento: this.evento.fechaEvento,
        contactoevento: this.evento.contactoEvento,
        urlcontacto: this.evento.urlEvento,
        companyname: this.evento.companyEvento,
        ciudad: this.evento.ciudadEvento,
        departamento: this.evento.departamentoEvento
      };

      if (!myevento.idevento) {
        console.log("Se va a crear el evento ::::>", myevento);
        Services.crearEvento(myevento).then(response => {
          if (response.status == 200) {
            this.loadEventos();
            this.$bvModal.hide("modalCreateEvent");
          }
        });
      } else {
        console.log("Se va a actualizar el evento ::::>", myevento);
        Services.actualizarEvento(myevento).then(response => {
          if (response.status == 202) {
            this.loadEventos();
            this.$bvModal.hide("modalCreateEvent");
          }
        });
      }
    }
  }
};
</script>

