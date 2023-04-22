/**
 *  Light Switch @version v0.1.4
 */

(function () {
  let lightSwitch = document.getElementById('lightSwitch');
  if (!lightSwitch) {
    return;
  }

  /**
   * @function darkmode
   * @summary: changes the theme to 'dark mode' and save settings to local stroage.
   * Basically, replaces/toggles every CSS class that has '-light' class with '-dark'
   */
  function darkMode() {
    document.querySelectorAll('.bg-light').forEach((element) => {
      element.className = element.className.replace(/-light/g, '-dark');
    });

    document.querySelectorAll('.link-dark').forEach((element) => {
      element.className = element.className.replace(/link-dark/, 'text-white');
    });

    document.body.classList.add('bg-dark');

    if (document.body.classList.contains('text-dark')) {
      document.body.classList.replace('text-dark', 'text-light');
    } else {
      document.body.classList.add('text-light');
    }

    // Tables
    var tables = document.querySelectorAll('table');
    for (var i = 0; i < tables.length; i++) {
      // add table-dark class to each table
      tables[i].classList.add('table-dark');
    }

    // set light switch input to true
    if (!lightSwitch.checked) {
      lightSwitch.checked = true;
    }
    localStorage.setItem('lightSwitch', 'dark');
  }

  /**
   * @function lightmode
   * @summary: changes the theme to 'light mode' and save settings to local stroage.
   */
  function lightMode() {
    document.querySelectorAll('.bg-dark').forEach((element) => {
      element.className = element.className.replace(/-dark/g, '-light');
    });

    document.querySelectorAll('.text-white').forEach((element) => {
      element.className = element.className.replace(/text-white/, 'link-dark');
    });

    document.body.classList.add('bg-light');

    if (document.body.classList.contains('text-light')) {
      document.body.classList.replace('text-light', 'text-dark');
    } else {
      document.body.classList.add('text-dark');
    }

    // Tables
    var tables = document.querySelectorAll('table');
    for (var i = 0; i < tables.length; i++) {
      if (tables[i].classList.contains('table-dark')) {
        tables[i].classList.remove('table-dark');
      }
    }

    if (lightSwitch.checked) {
      lightSwitch.checked = false;
    }
    localStorage.setItem('lightSwitch', 'light');
  }

  /**
   * @function onToggleMode
   * @summary: the event handler attached to the switch. calling @darkMode or @lightMode depending on the checked state.
   */
  function onToggleMode() {
    if (lightSwitch.checked) {
      darkMode();
    } else {
      lightMode();
    }
  }

  /**
   * @function getSystemDefaultTheme
   * @summary: get system default theme by media query
   */
  function getSystemDefaultTheme() {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkThemeMq.matches) {
      return 'dark';
    }
    return 'light';
  }

  function setup() {
    var settings = localStorage.getItem('lightSwitch');
    if (settings == null) {
      settings = getSystemDefaultTheme();
    }

    if (settings == 'dark') {
      lightSwitch.checked = true;
    }

    lightSwitch.addEventListener('change', onToggleMode);
    onToggleMode();
  }

  setup();
})();


// select line table
// var tabela = document.getElementById("tbSearch");
// var linhas = tabela.getElementsByTagName("tr");

// for(var i = 0; i < linhas.length; i++){
// 	var linha = linhas[i];
//   linha.addEventListener("click", function(){
//   	//Adicionar ao atual
// 		selLinha(this, false); //Selecione apenas um
//     //selLinha(this, true); //Selecione quantos quiser
// 	});
// }

// /**
// Caso passe true, você pode selecionar multiplas linhas.
// Caso passe false, você só pode selecionar uma linha por vez.
// **/
// function selLinha(linha, multiplos){
// 	if(!multiplos){
//   	var linhas = linha.parentElement.getElementsByTagName("tr");
//     for(var i = 0; i < linhas.length; i++){
//       var linha_ = linhas[i];
//       linha_.classList.remove("selecionado");    
//     }
//   }
//   linha.classList.toggle("selecionado");
// }

// /**
// Exemplo de como capturar os dados
// **/
// var btnVisualizar = document.getElementById("Search");

// btnVisualizar.addEventListener("click", function(){
// 	var selecionados = tabela.getElementsByClassName("selecionado");
//   //Verificar se eestá selecionado
//   if(selecionados.length < 1){
//   	// alert("Selecione pelo menos uma linha");
//     console.log("Selecione pelo menos uma linha");
//     return false;
//   }
  
//   var dados = "";
  
//   for(var i = 0; i < selecionados.length; i++){
//   	var selecionado = selecionados[i];
//     selecionado = selecionado.getElementsByTagName("td");
//     dados += "ID: " + selecionado[0].innerHTML + " - Nome: " + selecionado[1].innerHTML + "\n";
//   }
  
//   alert(dados);
//   console.log(dados);
// });