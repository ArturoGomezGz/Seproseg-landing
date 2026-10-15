/* ===== CONFIGURACIÓN SEPROSEG — único lugar para editar datos del negocio =====
   Deje "" o false lo que no esté confirmado por el cliente: el elemento no se mostrará.
   Vista de revisión (muestra lo pendiente marcado): agregar ?revision=1 a la URL. */
const CONFIG = {
  whatsapp: "",        // Solo dígitos con código de país, sin + ni espacios. Ej.: "5190000000" [[PENDIENTE]]
  telefono: "",        // Formato internacional para el enlace tel:. Ej.: "+5190000000" [[PENDIENTE]]
  telefonoVisible: "", // Como se muestra al público. Ej.: "900 000 000" [[PENDIENTE]]
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
  var barCot = $("[data-bar-cotizar]");
  if (CONFIG.whatsapp || CONFIG.telefono) barCot.hidden = true;

  /* --- Modo revisión --- */
  if (/[?&]revision=1(&|$)/.test(location.search)) {
    $$("[data-pendiente]").forEach(function (el) {
      el.hidden = false;
      el.classList.add("is-pendiente");
    });
  }

  /* --- Menú móvil --- */
  var header = $(".site-header");
  var toggle = $(".menu-toggle");
  var toggleTxt = $(".sr-only", toggle);
  var toggleUse = $("use", toggle);
  function setMenu(open) {
    header.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggleTxt.textContent = open ? "Cerrar menú" : "Abrir menú";
    toggleUse.setAttribute("href", open ? "#i-cerrar" : "#i-menu");
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  $$("#menu a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });
  var mq = window.matchMedia("(min-width: 64em)");
  function onMq() { if (mq.matches) setMenu(false); }
  if (mq.addEventListener) mq.addEventListener("change", onMq); else mq.addListener(onMq);

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

  /* --- Asistente Ruta A --- */
  var asesoria = $("[data-wa='asesoria']");
  var live = $("#reco-live");
  var recoItems = $$(".reco li");
  var ESPACIO = { "Casa": "Hogar", "Negocio": "Negocio", "Industria": "Industria", "Vehículo": "Vehículo/flota" };
  function val(name) {
    var r = $('input[name="' + name + '"]:checked');
    return r ? r.value : "";
  }
  function onAssist(e) {
    var p = val("proteger");
    var q = val("preocupa");
    if (e && e.target.name === "preocupa") {
      recoItems.forEach(function (li) {
        var on = li.getAttribute("data-preocupa") === q;
        li.classList.toggle("is-activa", on);
        if (on) live.textContent = "Recomendación: " + q + ", " + $(".reco-sys", li).textContent;
      });
    }
    if (CONFIG.whatsapp) {
      var m = MSG.asesoria;
      if (p) m += " Quiero proteger: " + p + ".";
      if (q) m += " Me preocupa: " + q + ".";
      asesoria.href = waUrl(m);
    }
  }
  $$("input[name='proteger'], input[name='preocupa']").forEach(function (i) { i.addEventListener("change", onAssist); });
  asesoria.addEventListener("click", function () {
    if (CONFIG.whatsapp) return;
    var p = val("proteger");
    if (p) checkEspacio(ESPACIO[p]);
    checkSistema("No estoy seguro");
  });

  /* --- Cotizar este sistema --- */
  $$("[data-producto]").forEach(function (a) {
    a.addEventListener("click", function () { checkSistema(a.getAttribute("data-producto")); });
  });

  /* --- Formulario: validación y envío --- */
  var bar = $(".contact-bar");
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

  /* --- Header con sombra al hacer scroll --- */
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
