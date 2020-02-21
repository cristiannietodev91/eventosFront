<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form action="#" @submit.prevent="submit">
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
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

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
                  <button type="submit" class="btn btn-primary">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters(["user", "authStatus"])
  },
  methods: {
    ...mapActions(["login"]),
    submit() {
      let usuario = this.form.email;
      let password = this.form.password;
      this.login({ usuario, password })
        .then(() => {
          this.$router.push("/");
        });
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
      if (val != null || val!= "") {
        this.$notify({group: 'foo',type: 'success',title: 'Resultado',text: val,duration: 5000});
      }
    }
  }
};
</script>