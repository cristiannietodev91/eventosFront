
let render = () => {
  import("./assets/css/sass/themes/piaf.light.blue.scss").then(() =>
    require("./main")
  );
};

render();
/* if you want single color remove this section:multicolor */