/* ===== FOTOS DE INSTALACIONES — Seproseg =====
   Cómo agregar una foto:
   1. Copie la foto en la carpeta assets/instalaciones/
      Formato .webp o .jpg, unos 1200 x 900 px, máximo 200 KB.
      Nombre en minúsculas, sin espacios ni tildes. Ej.: cctv-vivienda-01.webp
   2. Copie la línea de ejemplo de abajo, quítele las dos barras // del inicio y cambie los datos.
      Cada línea termina en una coma.
   3. Guarde y recargue la página. El orden de la lista es el orden en la página.

   Campos:
   - archivo  (obligatorio) nombre exacto del archivo dentro de assets/instalaciones/
   - titulo   (obligatorio) qué se instaló, corto. Ej.: "Cámaras CCTV en vivienda"
   - tipo     (obligatorio) uno de: "hogar", "negocio", "industria", "vehiculo"
   - alt      (recomendado) qué se ve en la foto, para personas que no pueden verla
   - lugar    (opcional) solo ciudad o distrito, y solo con permiso del cliente
   - sistemas (opcional) nombres exactos entre: "Cámaras CCTV", "Alarma contra intrusión",
              "Cercos electrificados", "Automatización de cocheras y accesos",
              "Control de acceso", "GPS vehicular"

   Antes de publicar una foto: que el cliente lo autorice; sin rostros, placas de vehículos,
   números de casa ni pantallas con imágenes de cámaras.
   Si la lista queda vacía, la página muestra en su lugar el enlace a Facebook. */
window.INSTALACIONES = [
  // { archivo: "cctv-vivienda-01.webp", titulo: "Cámaras CCTV en vivienda", tipo: "hogar", alt: "Cámara instalada bajo el alero de una vivienda, orientada hacia la cochera.", lugar: "", sistemas: ["Cámaras CCTV"] },
];
