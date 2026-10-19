/* ===== CONFIGURACIÓN SEPROSEG — único lugar para editar datos del negocio =====
   Deje "" o false lo que no esté confirmado por el cliente: el elemento no se mostrará.
   Vista de revisión (muestra lo pendiente marcado): agregar ?revision=1 a la URL. */
const CONFIG = {
  whatsapp: "523318951510",      // Solo dígitos con código de país, sin + ni espacios. Ej.: "5190000000"
  telefono: "+523318951510",      // Formato internacional para el enlace tel:. Ej.: "+5190000000"
  telefonoVisible: "33 1895 1510", // Como se muestra al público. Ej.: "900 000 000"
  correo: "",          // [[PENDIENTE]]
  direccion: "",       // [[PENDIENTE]]
  horario: "",         // [[PENDIENTE]]
  cobertura: "",       // Ciudades/regiones. Se muestra como "Atendemos en {cobertura}." [[PENDIENTE]]
  trayectoria: "",     // Frase ya aprobada por marca, p. ej. años/proyectos. [[PENDIENTE]]
  garantia: "",        // Alcance y plazo, frase aprobada por marca. [[PENDIENTE]]
  confirmado: {        // Ítems de "Qué incluye trabajar con Seproseg" marcados con * en el brief
    evaluacion: false,  // Evaluación de su espacio antes de cotizar
    instalacion: false, // Instalación por técnicos especializados
    soporte: false      // Soporte después de la instalación
  },
  procesoVisita: "",   // Frase para el paso 2 (p. ej. sobre visita técnica). Aprobada por marca. [[PENDIENTE]]
  procesoSoporte: "",  // Frase para el paso 5 (alcance del soporte). Aprobada por marca. [[PENDIENTE]]
  faq: {               // Respuestas confirmadas. "" = pregunta oculta. Si todas vacías/false, se oculta la sección.
    visitas: "",
    garantia: "",
    ampliar: false,    // true = mostrar la respuesta ya redactada en el HTML (pendiente de confirmar)
    zona: "",
    pagos: ""
  },
  privacidadUrl: "",   // URL de política de privacidad [[PENDIENTE]]
  razonSocial: ""      // Razón social / identificador fiscal para el pie [[PENDIENTE]]
};

(function () {
  "use strict";
  var doc = document;
  var root = doc.documentElement;
  root.classList.add("js");

  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }
  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, CONFIG);
  }

  /* --- Datos configurables --- */
  $$("[data-mostrar-si]").forEach(function (el) {
    var k = el.getAttribute("data-mostrar-si");
    var v = get(k);
    if (v) {
      el.hidden = false;
      if (k === "privacidadUrl") el.href = v;
    }
  });
  $$("[data-texto]").forEach(function (el) {
    var v = get(el.getAttribute("data-texto"));
    if (v) el.textContent = v;
  });

  var MSG = {
    general: "Hola Seproseg, quisiera una cotización.",
    asesoria: "Hola Seproseg, no sé qué sistema necesito y quisiera asesoría."
  };
  function waUrl(msg) { return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg); }
  function setWa(el, msg) {
    el.href = waUrl(msg);
    el.target = "_blank";
    el.rel = "noopener noreferrer";
    el.hidden = false;
  }
  if (CONFIG.whatsapp) {
    $$("[data-wa]").forEach(function (el) {
      var t = el.getAttribute("data-wa");
      if (MSG[t]) setWa(el, MSG[t]);
    });
  }
  if (CONFIG.telefono) {
    $$("[data-tel]").forEach(function (el) { el.href = "tel:" + CONFIG.telefono; el.hidden = false; });
  }
  if (CONFIG.correo) {
    $$("[data-correo]").forEach(function (el) {
      el.href = "mailto:" + CONFIG.correo;
      el.textContent = CONFIG.correo;
    });
  }
  $$("[data-anio]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  var faqOn = Object.keys(CONFIG.faq).some(function (k) { return CONFIG.faq[k]; });
  var faqSec = $("#preguntas");
  if (faqOn) faqSec.hidden = false;
  var bar = $(".contact-bar");
  if (CONFIG.whatsapp || CONFIG.telefono) {
    bar.hidden = false;
    root.classList.add("has-bar");
  }

  /* --- Modo revisión --- */
  if (/[?&]revision=1(&|$)/.test(location.search)) {
    $$("[data-pendiente]").forEach(function (el) {
      el.hidden = false;
      el.classList.add("is-pendiente");
    });
  }

  var header = $(".site-header");

  /* --- Formulario: utilidades --- */
  var form = $("#form-cotizacion");
  function checkSistema(valor) {
    var cb = $$('input[name="sistema"]', form).filter(function (i) { return i.value === valor; })[0];
    if (cb) cb.checked = true;
  }
  function checkEspacio(valor) {
    var r = $$('input[name="espacio"]', form).filter(function (i) { return i.value === valor; })[0];
    if (r) r.checked = true;
  }

  /* --- Quiero que me asesoren (sin WhatsApp: marca "No estoy seguro") --- */
  $("[data-wa='asesoria']").addEventListener("click", function () {
    if (!CONFIG.whatsapp) checkSistema("No estoy seguro");
  });

  function val(name) {
    var r = $('input[name="' + name + '"]:checked');
    return r ? r.value : "";
  }

  /* --- Cotizar este sistema --- */
  $$("[data-producto]").forEach(function (a) {
    a.addEventListener("click", function () { checkSistema(a.getAttribute("data-producto")); });
  });

  /* --- Formulario: validación y envío --- */
  var status = $(".form-status");
  var attempted = false;
  var checks = [
    { id: "f-nombre", err: "f-nombre-error", ok: function () { return $("#f-nombre").value.trim() !== ""; } },
    { id: "f-telefono", err: "f-telefono-error", ok: function () {
      return /^\d{7,}$/.test($("#f-telefono").value.replace(/[\s\-()+]/g, ""));
    } },
    { id: "f-correo", err: "f-correo-error", ok: function () {
      var v = $("#f-correo").value.trim();
      return v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    } },
    { id: "g-espacio", err: "g-espacio-error", group: true, ok: function () { return !!val("espacio"); } }
  ];
  function showCheck(c) {
    var good = c.ok();
    var box = $("#" + c.id);
    var err = $("#" + c.err);
    err.hidden = good;
    if (c.group) {
      $$("input", box).forEach(function (i) { i.setAttribute("aria-invalid", good ? "false" : "true"); });
      if (good) box.removeAttribute("aria-describedby"); else box.setAttribute("aria-describedby", c.err);
    } else {
      box.setAttribute("aria-invalid", good ? "false" : "true");
      if (good) box.removeAttribute("aria-describedby"); else box.setAttribute("aria-describedby", c.err);
    }
    return good;
  }
  function revalidate() {
    if (attempted) checks.forEach(showCheck);
  }
  form.addEventListener("input", revalidate);
  form.addEventListener("change", revalidate);
  form.addEventListener("focusin", function () { bar.classList.add("is-hidden"); });
  form.addEventListener("focusout", function (e) {
    if (!form.contains(e.relatedTarget)) bar.classList.remove("is-hidden");
  });

  function line(label, v) { return v ? label + ": " + v + "\n" : ""; }
  function el(tag, txt, cls) {
    var n = doc.createElement(tag);
    if (txt) n.textContent = txt;
    if (cls) n.className = cls;
    return n;
  }
  function showStatus(error, text, linkText, linkHref) {
    status.textContent = "";
    status.className = "form-status" + (error ? " form-status--error" : "");
    if (!error) status.appendChild(el("strong", "Gracias."));
    status.appendChild(el("p", text));
    if (linkText) {
      var p = el("p");
      var a = el("a", linkText);
      a.href = linkHref;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      p.appendChild(a);
      status.appendChild(p);
    }
    status.hidden = false;
    status.focus();
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    attempted = true;
    var bad = checks.filter(function (c) { return !showCheck(c); });
    if (bad.length) {
      var first = $("#" + bad[0].id);
      if (bad[0].group) first = $("input", first);
      first.focus();
      return;
    }
    var nombre = $("#f-nombre").value.trim();
    var sistemas = $$('input[name="sistema"]:checked', form).map(function (i) { return i.value; });
    var msg = "Hola Seproseg, quisiera una cotización.\n" +
      line("Nombre", nombre) +
      line("Teléfono/WhatsApp", $("#f-telefono").value.trim()) +
      line("Correo", $("#f-correo").value.trim()) +
      line("Tipo de espacio", val("espacio")) +
      line("Sistemas de interés", sistemas.join(", ")) +
      line("Ciudad/distrito", $("#f-ciudad").value.trim()) +
      line("Mensaje", $("#f-mensaje").value.trim());
    msg = msg.replace(/\n$/, "");
    if (CONFIG.whatsapp) {
      var url = waUrl(msg);
      window.open(url, "_blank", "noopener");
      showStatus(false, "Abrimos WhatsApp con su solicitud lista: solo pulse Enviar para que la recibamos. Le contactaremos pronto.", "Abrir WhatsApp", url);
    } else if (CONFIG.correo) {
      location.href = "mailto:" + CONFIG.correo + "?subject=" + encodeURIComponent("Solicitud de cotización - " + nombre) + "&body=" + encodeURIComponent(msg);
      showStatus(false, "Abrimos su aplicación de correo con su solicitud lista: solo pulse Enviar para que la recibamos. Le contactaremos pronto.");
    } else {
      showStatus(true, "El envío aún no está configurado. Por favor, contáctenos por Facebook.", "Facebook", "https://www.facebook.com/SeprosegOficial/");
    }
  });

  /* --- Imágenes de producto: si falta una, se oculta su placa --- */
  $$(".card-media img, .card-media--duo img").forEach(function (img) {
    function fallo() {
      console.warn("Imagen de producto no encontrada: " + img.getAttribute("src"));
      var celda = img.closest(".media-cell") || img.closest(".card-media");
      if (celda) celda.hidden = true;
      var duo = img.closest(".card-media--duo");
      if (duo && !$(".media-cell:not([hidden])", duo)) duo.hidden = true;
    }
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fallo();
    else img.addEventListener("error", fallo);
  });

  /* --- Galería de instalaciones --- */
  var TIPOS = { hogar: "Hogar", negocio: "Negocio", industria: "Industria", vehiculo: "Vehículo" };
  var ESPACIO = { hogar: "Hogar", negocio: "Negocio", industria: "Industria", vehiculo: "Vehículo/flota" };
  var GRUPOS = [
    { id: "todos", nombre: "Todos", tipos: null },
    { id: "hogar", nombre: "Hogar", tipos: ["hogar"] },
    { id: "negocio", nombre: "Negocio e industria", tipos: ["negocio", "industria"] },
    { id: "vehiculo", nombre: "Vehículos", tipos: ["vehiculo"] }
  ];
  var PAGINA = 8;
  var fotos = [];
  if (Array.isArray(window.INSTALACIONES)) {
    window.INSTALACIONES.forEach(function (f) {
      var ok = f && typeof f.archivo === "string" && f.archivo.trim() && typeof f.titulo === "string" && f.titulo.trim() &&
        typeof f.tipo === "string" && Object.prototype.hasOwnProperty.call(TIPOS, f.tipo);
      if (ok) fotos.push(f); else console.warn("Foto descartada en instalaciones.js:", f);
    });
  }
  var gSec = $("#trabajos");
  var gList = $(".gallery", gSec);
  var gEmpty = $(".gallery-empty", gSec);
  var gFilters = $(".filters", gSec);
  var gMore = $(".gallery-more", gSec);
  var gLive = $("#galeria-live");
  var gFiltro = "todos";
  var gShown = PAGINA;
  var svgNS = "http://www.w3.org/2000/svg";

  function icono(id, size, cls) {
    var s = doc.createElementNS(svgNS, "svg");
    s.setAttribute("class", "icon" + (cls ? " " + cls : ""));
    s.setAttribute("width", size);
    s.setAttribute("height", size);
    s.setAttribute("aria-hidden", "true");
    s.setAttribute("focusable", "false");
    var u = doc.createElementNS(svgNS, "use");
    u.setAttribute("href", "#" + id);
    s.appendChild(u);
    return s;
  }
  function ruta(f) { return "assets/instalaciones/" + encodeURIComponent(f.archivo); }
  function meta(f) { return TIPOS[f.tipo] + (f.lugar ? " · " + f.lugar : ""); }
  function validas() { return fotos.filter(function (f) { return !f.rota; }); }
  function grupo(id) { return GRUPOS.filter(function (g) { return g.id === id; })[0]; }
  function actuales() {
    var g = grupo(gFiltro);
    return validas().filter(function (f) { return !g.tipos || g.tipos.indexOf(f.tipo) >= 0; });
  }
  function anunciar(t) { gLive.textContent = ""; setTimeout(function () { gLive.textContent = t; }, 50); }

  function tesela(f) {
    var li = el("li");
    var a = el("a", "", "work");
    a.href = ruta(f);
    a.setAttribute("data-evento", "galeria-abrir");
    a.setAttribute("aria-haspopup", "dialog");
    var media = el("div", "", "work-media");
    media.appendChild(icono("i-" + f.tipo, 32));
    var img = doc.createElement("img");
    img.alt = "";
    img.width = 1200;
    img.height = 900;
    img.loading = "lazy";
    img.decoding = "async";
    img.sizes = "(min-width: 64em) 25vw, (min-width: 37.5em) 33vw, 50vw";
    img.addEventListener("load", function () { img.classList.add("is-loaded"); });
    img.addEventListener("error", function () {
      if (f.rota) return;
      f.rota = true;
      console.warn("Foto no encontrada: " + f.archivo);
      render();
    });
    img.src = ruta(f);
    media.appendChild(img);
    var zoom = el("span", "", "work-zoom");
    zoom.setAttribute("aria-hidden", "true");
    zoom.appendChild(icono("i-ampliar", 20));
    media.appendChild(zoom);
    a.appendChild(media);
    var cap = el("span", "", "work-cap");
    cap.appendChild(el("span", "Ampliar foto: ", "sr-only"));
    cap.appendChild(el("span", f.titulo, "work-title"));
    cap.appendChild(el("span", meta(f), "work-meta"));
    a.appendChild(cap);
    f.a = a;
    li.appendChild(a);
    return li;
  }

  function filtros() {
    var v = validas();
    var grupos = GRUPOS.filter(function (g) {
      return g.tipos && v.some(function (f) { return g.tipos.indexOf(f.tipo) >= 0; });
    });
    var on = v.length >= 6 && grupos.length >= 2;
    gFilters.hidden = !on;
    gFilters.textContent = "";
    if (!on) { gFiltro = "todos"; return; }
    if (gFiltro !== "todos" && grupos.indexOf(grupo(gFiltro)) < 0) gFiltro = "todos";
    [GRUPOS[0]].concat(grupos).forEach(function (g) {
      var b = el("button", "", "filter");
      b.type = "button";
      b.setAttribute("aria-pressed", g.id === gFiltro ? "true" : "false");
      b.setAttribute("data-evento", "galeria-filtro");
      b.appendChild(icono("i-check", 16));
      b.appendChild(doc.createTextNode(g.nombre));
      b.addEventListener("click", function () {
        gFiltro = g.id;
        gShown = PAGINA;
        $$(".filter", gFilters).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        render(true);
        var n = actuales().length;
        anunciar("Mostrando " + n + " trabajos" + (g.tipos ? ": " + g.nombre : "") + ".");
      });
      gFilters.appendChild(b);
    });
  }

  function render(sinFiltros) {
    var v = validas();
    var hay = v.length > 0;
    $$("[data-galeria='con-fotos']").forEach(function (n) { n.hidden = !hay; });
    gEmpty.hidden = hay;
    if (!sinFiltros) filtros();
    gList.textContent = "";
    gMore.hidden = true;
    if (!hay) { gFilters.hidden = true; return; }
    var lista = actuales();
    var vis = lista.slice(0, gShown);
    vis.forEach(function (f) { gList.appendChild(tesela(f)); });
    gList.setAttribute("data-count", vis.length < 4 ? String(vis.length) : "n");
    gMore.hidden = lista.length <= gShown;
  }
  gMore.addEventListener("click", function () {
    var antes = gShown;
    var lista = actuales();
    gShown += PAGINA;
    render(true);
    var nuevos = Math.min(gShown, lista.length) - antes;
    var primera = $$("a.work", gList)[antes];
    if (primera) primera.focus();
    anunciar("Se agregaron " + nuevos + " trabajos.");
  });
  render();

  /* --- Visor --- */
  var visor = $("#visor");
  if (visor && typeof visor.showModal === "function") {
    var vImg = $("img", visor);
    var vCount = $(".lb-count", visor);
    var vTit = $("#visor-titulo", visor);
    var vMeta = $(".lb-meta", visor);
    var vCot = $(".lb-cot-titulo", visor);
    var vAcc = $(".lb-actions", visor);
    var vPrev = $("[data-lb='anterior']", visor);
    var vNext = $("[data-lb='siguiente']", visor);
    var lista = [];
    var idx = 0;
    var origen = null;
    function mostrar(i) {
      idx = (i + lista.length) % lista.length;
      var f = lista[idx];
      vCount.textContent = "Foto " + (idx + 1) + " de " + lista.length;
      vTit.textContent = f.titulo;
      vMeta.textContent = meta(f);
      vCot.textContent = ": " + f.titulo;
      vImg.alt = f.alt || f.titulo;
      vImg.src = ruta(f);
    }
    function abrir(f, a) {
      lista = actuales();
      var i = lista.indexOf(f);
      if (i < 0) return;
      origen = a;
      visor.returnValue = "";
      vPrev.hidden = vNext.hidden = lista.length < 2;
      mostrar(i);
      visor.showModal();
      $("[data-lb='cerrar']", visor).focus();
    }
    gList.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest("a.work") : null;
      if (!a || e.ctrlKey || e.metaKey || e.shiftKey) return;
      var f = fotos.filter(function (x) { return x.a === a; })[0];
      if (!f) return;
      e.preventDefault();
      abrir(f, a);
    });
    vPrev.addEventListener("click", function () { mostrar(idx - 1); });
    vNext.addEventListener("click", function () { mostrar(idx + 1); });
    $("[data-lb='cerrar']", visor).addEventListener("click", function () { visor.close(); });
    visor.addEventListener("click", function (e) {
      if (e.target !== visor) return;
      var r = visor.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) visor.close();
    });
    visor.addEventListener("keydown", function (e) {
      if (lista.length < 2) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); mostrar(idx - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); mostrar(idx + 1); }
    });
    visor.addEventListener("close", function () {
      var f = lista[idx];
      var a = f && f.a && doc.contains(f.a) ? f.a : (origen && doc.contains(origen) ? origen : $("a.work", gList));
      if (visor.returnValue !== "cotizar" && a) a.focus();
    });
    $("[data-lb='cotizar']", visor).addEventListener("click", function () {
      var f = lista[idx];
      visor.close("cotizar");
      checkEspacio(ESPACIO[f.tipo]);
      (Array.isArray(f.sistemas) ? f.sistemas : []).forEach(function (n) { checkSistema(n); });
      var h = $("#cotizar");
      location.hash = "cotizar";
      h.focus();
    });
  }

  /* --- Header con sombra al hacer scroll --- */
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
