/* ===== Comportamiento de la página: selector de escala y entradas al hacer scroll =====
   Depende de nada. Sin JavaScript la tabla se lee completa y el plano muestra el hogar. */
(function () {
  "use strict";
  var doc = document;
  function $(s, c) { return (c || doc).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }

  /* --- Selector de escala: cambia plano, tabla, resumen y la cotización --- */
  var ESCALAS = {
    hogar: { espacio: "Hogar", cta: "Solicitar cotización para mi hogar", texto: "Para su hogar: cámaras en entradas y cochera, sensores en puertas y ventanas, y un portón que se abre sin bajar del auto." },
    negocio: { espacio: "Negocio", cta: "Solicitar cotización para mi negocio", texto: "Para su negocio: cámaras en caja, bodega y accesos, alarma por zonas y control de quién entra y a qué hora." },
    industria: { espacio: "Industria", cta: "Solicitar cotización para mi industria", texto: "Para su industria: perímetro protegido, accesos por persona y área, y cámaras y flota supervisadas desde un solo lugar." }
  };
  var picker = $(".picker");
  var tabla = $(".escala-tabla");
  var plan = $(".plan");
  var resumen = $(".picker-sum");
  var cta = $("[data-espacio-cta]");
  var actual = "hogar";

  function elegir(clave) {
    var e = ESCALAS[clave];
    if (!e) return;
    actual = clave;
    tabla.setAttribute("data-sel", clave);
    plan.setAttribute("data-sel", clave);
    $$(".pick", picker).forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-espacio") === clave ? "true" : "false");
    });
    resumen.textContent = e.texto;
    cta.textContent = e.cta;
  }

  if (picker && tabla && plan && resumen && cta) {
    picker.hidden = false;
    resumen.hidden = false;
    $$(".pick", picker).forEach(function (b) {
      b.addEventListener("click", function () { elegir(b.getAttribute("data-espacio")); });
    });
    cta.addEventListener("click", function () {
      var r = $$('#form-cotizacion input[name="espacio"]').filter(function (i) { return i.value === ESCALAS[actual].espacio; })[0];
      if (r) r.checked = true;
    });
    elegir(actual);
  }

  /* --- Entradas una sola vez al llegar a la vista --- */
  var items = $$("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (n) { n.classList.add("is-in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.1 });
  items.forEach(function (n) { io.observe(n); });
})();
