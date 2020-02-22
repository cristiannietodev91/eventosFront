<template>
  <b-container class="mt-5">
    <b-row class="justify-content-center">
      <b-col class="md-8">
        <b-card header-tag="header"  
          header-bg-variant="dark"
          header-text-variant="white">
          <template v-slot:header>
            <h6 class="mb-0">Registrarse</h6>
          </template>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Nombre</label>

                <div class="col-md-6">
                  <input
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    value
                    required
                    autofocus
                    v-model="form.name"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Contraseña</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Registrarse</button>
                </div>
              </div>
            </form>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null
    };
  },
  computed: {
    ...mapGetters(["user", "authStatus"])
  },
  methods: {
    ...mapActions(["register"]),
    submit() {
      let usuario = this.form.email;
      let password = this.form.password;
      let name = this.form.name;
      this.register({ usuario, password, name })
        .then(() => {
          //console.log("Hollaaaa");
          this.$router.push("/");
        })        
    }
  },
  watch: {
    user(val){
      if (val && val.uid && val.uid.length > 0) {
        setTimeout(() => {
          this.$router.push("/");
        }, 200);
      }
    },
    authStatus(val) {
      if (val != null || val != "") {
        this.$notify({group: 'foo',type: 'error',title: 'Resultado',text: val,duration: 5000});
      }
    }
  }
};
</script>