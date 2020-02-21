
/*  if you want use single color theme

- ColorSwitcher component remove in 'src/App.vue' file.
- Remove multicolor section in current file
- Uncomment the two lines below

import "./assets/css/sass/themes/piaf.light.orange.scss";
import "./main";
*/

/* if you want single color remove this section:multicolor */


let render = () => {
  import("./assets/css/sass/themes/piaf.light.blue.scss").then(() =>
    require("./main")
  );
};

render();
/* if you want single color remove this section:multicolor */