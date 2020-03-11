<template>
  <div class="row m-5">
    <div class="col-4">
      <h3>Pool Cartas</h3>
      <b-form-input
        v-model="text"
        placeholder="Tarjeta a buscar eg. (2 , 3 , a , q)"
        @update="filterList"
      ></b-form-input>
      <draggable class="list-group" :list="list1" group="people" :move="checkMove">
        <div class="list-group-item" v-for="(element, index) in list1" :key="index">
          <img :src="element.url" class="imgcard" />
          {{element.value.value}} {{element.value.group}}
        </div>
      </draggable>
    </div>

    <div class="col-4 ml-4">
      <h3>Mano</h3>
      <draggable class="list-group" :list="list2" group="people">
        <div
          class="list-group-item"
          v-for="(element, index) in list2"
          :key="index"
          :style="element.value.esEscalera ? 'background-color: green': ''"
        >
          <img :src="element.url" class="imgcard" />
          {{element.value.value}} {{element.value.group}}
          <b-icon icon="check" v-if="element.value.esEscalera" aria-hidden="true"></b-icon>
        </div>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Jugar</h3>
      <b-button
        @click="validateEscaleraPoker"
        class="rounded-pill m-4"
        variant="outline-primary"
        block
      >
        <b-icon icon="plus" aria-hidden="true"></b-icon>
        <span class="sr-only">Jugar</span>
        Jugar
      </b-button>
      <b-button @click="reiniciar" class="rounded-pill m-4" variant="outline-primary" block>
        <b-icon icon="plus" aria-hidden="true"></b-icon>
        <span class="sr-only">Reiniciar</span>
        Reiniciar
      </b-button>
      <div class="mt-3" >
        <h3>Resultado</h3>
        <span>{{resultado}}</span>
        <div class="row">
          <div
          class="m-3"
            v-for="(element, index) in cartasEscalera"
            :key="index"
          >
            <img :src="element.url" class="imgcard" />          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Services from "../services/service";

const defaulData = [
  {
    id: 1,
    value: { number: 2, group: "Trebol", value: 2 },
    url: "/assets/img/2C.png"
  },
  {
    id: 2,
    value: { number: 2, group: "Diamantes", value: 2 },
    url: "/assets/img/2D.png"
  },
  {
    id: 3,
    value: { number: 2, group: "Corazones", value: 2 },
    url: "/assets/img/2H.png"
  },
  {
    id: 4,
    value: { number: 2, group: "Picas", value: 2 },
    url: "/assets/img/2S.png"
  },
  {
    id: 5,
    value: { number: 3, group: "Trebol", value: 3 },
    url: "/assets/img/3C.png"
  },
  {
    id: 6,
    value: { number: 3, group: "Diamantes", value: 3 },
    url: "/assets/img/3D.png"
  },
  {
    id: 7,
    value: { number: 3, group: "Corazones", value: 3 },
    url: "/assets/img/3H.png"
  },
  {
    id: 8,
    value: { number: 3, group: "Picas", value: 3 },
    url: "/assets/img/3S.png"
  },
  {
    id: 9,
    value: { number: 4, group: "Trebol", value: 4 },
    url: "/assets/img/4C.png"
  },
  {
    id: 10,
    value: { number: 4, group: "Diamantes", value: 4 },
    url: "/assets/img/4D.png"
  },
  {
    id: 11,
    value: { number: 4, group: "Corazones", value: 4 },
    url: "/assets/img/4H.png"
  },
  {
    id: 12,
    value: { number: 4, group: "Picas", value: 4 },
    url: "/assets/img/4S.png"
  },
  {
    id: 13,
    value: { number: 5, group: "Trebol", value: 5 },
    url: "/assets/img/5C.png"
  },
  {
    id: 14,
    value: { number: 5, group: "Diamantes", value: 5 },
    url: "/assets/img/5D.png"
  },
  {
    id: 15,
    value: { number: 5, group: "Corazones", value: 5 },
    url: "/assets/img/5H.png"
  },
  {
    id: 16,
    value: { number: 5, group: "Picas", value: 5 },
    url: "/assets/img/5S.png"
  },
  {
    id: 17,
    value: { number: 6, group: "Trebol", value: 6 },
    url: "/assets/img/6C.png"
  },
  {
    id: 18,
    value: { number: 6, group: "Diamantes", value: 6 },
    url: "/assets/img/6D.png"
  },
  {
    id: 19,
    value: { number: 6, group: "Corazones", value: 6 },
    url: "/assets/img/6H.png"
  },
  {
    id: 20,
    value: { number: 6, group: "Picas", value: 6 },
    url: "/assets/img/6S.png"
  },
  {
    id: 21,
    value: { number: 7, group: "Trebol", value: 7 },
    url: "/assets/img/7C.png"
  },
  {
    id: 22,
    value: { number: 7, group: "Diamantes", value: 7 },
    url: "/assets/img/7D.png"
  },
  {
    id: 23,
    value: { number: 7, group: "Corazones", value: 7 },
    url: "/assets/img/7H.png"
  },
  {
    id: 24,
    value: { number: 7, group: "Picas", value: 7 },
    url: "/assets/img/7S.png"
  },
  {
    id: 25,
    value: { number: 8, group: "Trebol", value: 8 },
    url: "/assets/img/8C.png"
  },
  {
    id: 26,
    value: { number: 8, group: "Diamantes", value: 8 },
    url: "/assets/img/8D.png"
  },
  {
    id: 27,
    value: { number: 8, group: "Corazones", value: 8 },
    url: "/assets/img/8H.png"
  },
  {
    id: 28,
    value: { number: 8, group: "Picas", value: 8 },
    url: "/assets/img/8S.png"
  },
  {
    id: 29,
    value: { number: 9, group: "Trebol", value: 9 },
    url: "/assets/img/9C.png"
  },
  {
    id: 30,
    value: { number: 9, group: "Diamantes", value: 9 },
    url: "/assets/img/9D.png"
  },
  {
    id: 31,
    value: { number: 9, group: "Corazones", value: 9 },
    url: "/assets/img/9H.png"
  },
  {
    id: 32,
    value: { number: 9, group: "Picas", value: 9 },
    url: "/assets/img/9S.png"
  },
  {
    id: 33,
    value: { number: 10, group: "Trebol", value: 10 },
    url: "/assets/img/10C.png"
  },
  {
    id: 34,
    value: { number: 10, group: "Diamantes", value: 10 },
    url: "/assets/img/10D.png"
  },
  {
    id: 35,
    value: { number: 10, group: "Corazones", value: 10 },
    url: "/assets/img/10H.png"
  },
  {
    id: 36,
    value: { number: 10, group: "Picas", value: 10 },
    url: "/assets/img/10S.png"
  },
  {
    id: 37,
    value: { number: 11, group: "Trebol", value: "j" },
    url: "/assets/img/JC.png"
  },
  {
    id: 38,
    value: { number: 11, group: "Diamantes", value: "j" },
    url: "/assets/img/JD.png"
  },
  {
    id: 39,
    value: { number: 11, group: "Corazones", value: "j" },
    url: "/assets/img/JH.png"
  },
  {
    id: 40,
    value: { number: 11, group: "Picas", value: "j" },
    url: "/assets/img/JS.png"
  },
  {
    id: 41,
    value: { number: 12, group: "Trebol", value: "q" },
    url: "/assets/img/QC.png"
  },
  {
    id: 42,
    value: { number: 12, group: "Diamantes", value: "q" },
    url: "/assets/img/QD.png"
  },
  {
    id: 43,
    value: { number: 12, group: "Corazones", value: "q" },
    url: "/assets/img/QH.png"
  },
  {
    id: 44,
    value: { number: 12, group: "Picas", value: "q" },
    url: "/assets/img/QS.png"
  },
  {
    id: 45,
    value: { number: 13, group: "Trebol", value: "k" },
    url: "/assets/img/KC.png"
  },
  {
    id: 46,
    value: { number: 13, group: "Diamantes", value: "k" },
    url: "/assets/img/KD.png"
  },
  {
    id: 47,
    value: { number: 13, group: "Corazones", value: "k" },
    url: "/assets/img/KH.png"
  },
  {
    id: 48,
    value: { number: 13, group: "Picas", value: "k" },
    url: "/assets/img/KS.png"
  },
  {
    id: 49,
    value: { number: 14, group: "Trebol", value: "a" },
    url: "/assets/img/AC.png"
  },
  {
    id: 50,
    value: { number: 14, group: "Diamantes", value: "a" },
    url: "/assets/img/AD.png"
  },
  {
    id: 51,
    value: { number: 14, group: "Corazones", value: "a" },
    url: "/assets/img/AH.png"
  },
  {
    id: 52,
    value: { number: 14, group: "Picas", value: "a" },
    url: "/assets/img/AS.png"
  }
];

export default {
  name: "Poker",
  components: {
    draggable
  },
  data() {
    return {
      text: "",
      resultado: "",
      list1: defaulData,
      list2: [],
      cartasEscalera: []
    };
  },
  methods: {
    checkMove: function() {
      if (this.list2.length < 7) {
        return true;
      } else {
        return false;
      }
    },
    filterList: function() {
      this.list1 = defaulData;
      this.list1 = this.list1.filter(element => {
        return this.list2.indexOf(element) < 0;
      });
      if (this.text.length > 0) {
        this.list1 = this.list1.filter(element => {
          return element.value.value == this.text;
        });
      }
    },
    validateEscaleraPoker() {
      if (this.list2.length >= 5) {
        this.cartasEscalera = []
        Services.validatePoker(this.list2)
          .then(response => {
            this.list2 = response.data;

            let count = this.list2.filter(element => {
              return element.value.esEscalera == true;
            }).length;
            if (count >= 5) {
              this.resultado = "Tienes escalera";
              this.cartasEscalera = this.list2.filter(element => {
                return element.value.esEscalera == true;
              });
            } else {
              this.resultado = "No tienes escalera";
            }
          })
          .catch(error => {
            this.$notify({
              group: "foo",
              type: "error",
              title: "Resultado",
              text: "Ocurrio un error al validar la escalera" + error.message,
              duration: 5000
            });
          });
      } else {
        this.$notify({
          group: "foo",
          type: "warning",
          title: "Resultado",
          text: "Debe seleccionar al menos 5 cartas para jugar",
          duration: 5000
        });
      }
    },
    reiniciar() {
      this.list1 = defaulData;
      this.list2 = [];
      //this.$forceUpdate();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.imgcard {
  width: 39x;
  height: 49px;
}
</style>

