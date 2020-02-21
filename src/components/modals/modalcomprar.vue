<template>
  <b-modal
    id="modalComprarBoleto"
    ref="modalBoleto"
    title="Comprar boleto"
    headerBgVariant="dark"
    header-text-variant="warning"
    footer-bg-variant="warning"
    footer-text-variant="dark"
    @hidden="resetModal"
    @ok="handleOk"
    button-size="sm"
    size="md"
  >
    <form ref="formComprarBoleto" @submit.stop.prevent="handleSubmit">
      <b-form-group
        label-cols-sm="4"
        label-cols-lg="3"
        label="Tipo Boleto"
        label-for="select-tipo"
        description="Tipo boleta que desea."
        label-size="sm"
        class="mb-1"
      >
        <v-select
          id="select-tipo"
          :options="tipoboletas"
          label="label"
          v-model="formboleto.tipo"
          size="sm"
          required
        >
          <template #search="{attributes, events}">
            <input
              class="vs__search"
              :required="!formboleto.tipo"
              v-bind="attributes"
              v-on="events"
            />
          </template>
        </v-select>
      </b-form-group>
    </form>
  </b-modal>
</template>   
 
 
 <script>
 import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

import Services from "../../services/service";

export default {
  name: "modalComprar",
  props: ["idevento"],
  data() {
    return {
      formboleto: {
        idevento: null,
        tipo: null
      },
      tipoboletas: [
        { key: "VIP", label: "VIP" },
        { key: "General", label: "General" },
        { key: "General baja", label: "General baja" }
      ]
    };
  },
  computed: {    
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters(["user", "isLoggedIn"])    
  },
  validations: {
    formboleto: {
      idevento: {
        required
      },
      tipo: {
        required
      }
    }
  },
  methods: {
    resetModal() {
      /*this.form.nameEvento = "";
      this.nameEventoState = null;*/
      this.formboleto = {
        idevento: null,
        tipo: null
      };
    },
    handleOk() {
      
      // Prevent modal from closing
      //bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      //this.$v.$touch();
      // Exit when the form isn't valid
      //if (this.$v.formboleto.$pending || this.$v.formboleto.$error) return;

      this.formboleto.idevento = this.idevento;
      if (this.formboleto.tipo) {
        var boleto = {
          idevento: this.formboleto.idevento,
          tipoboleto: this.formboleto.tipo.key,
          uid: this.user.uid
        };

        this.$bvModal.hide("modalComprarBoleto");
        Services.crearBoleto(boleto).then(response => {
          if (response.status == 200) {
            this.$bvModal.hide("modalComprarBoleto");
            this.$notify({group: 'foo',type: 'success',title: 'Resultado',text: 'Se compro el boleto exitosamente',duration: 5000});
          }
        }).catch(error => {
          this.$notify({group: 'foo',type: 'error',title: 'Resultado',text: 'Error al comprar boleto'+error.message,duration: 5000});
        });
      } else {
        this.$notify({group: 'foo',type: 'warning',title: 'Resultado',text: 'Debe elegir que sector quiere',duration: 5000});
        return;
      }
    }
  },
  watch: {
    user(val){
      if (val && val.uid && val.uid.length > 0) {
        return val;
      }
    }
  }
};
</script>
 
 <style>
</style>   