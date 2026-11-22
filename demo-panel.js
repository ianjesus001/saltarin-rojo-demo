(() => {
  const panel = document.createElement("aside");
  panel.className = "demo-panel";
  panel.innerHTML = `
    <button type="button" class="demo-panel-toggle" aria-expanded="true">Demo · qué estás viendo</button>
    <div class="demo-panel-body">
      <p class="demo-panel-lead">Vista previa completa (base + opcionales). No es cobro real.</p>
      <ul>
        <li><span class="tag base">Base</span> Catálogo, stock, guía de tallas, WhatsApp, sucursales</li>
        <li><span class="tag opt">+1M</span> Carrito + pasarela (Bancard/Pagopar)</li>
        <li><span class="tag opt">+250k</span> WhatsApp con carrito armado</li>
        <li><span class="tag opt">+250k</span> Analytics / Pixel</li>
        <li><span class="tag opt">+400k</span> SEO local</li>
        <li><span class="tag opt">+450k</span> <a href="campana.html">Landing Feria Roja</a></li>
        <li><span class="tag opt">+150k</span> Vista previa al compartir</li>
      </ul>
      <div class="demo-share-mock" aria-hidden="true">
        <p class="demo-share-label">Así se vería el link en WhatsApp</p>
        <div class="share-card">
          <div class="share-card-img"></div>
          <div>
            <strong>Saltarín Rojo®</strong>
            <span>Todo para tu deporte — catálogo y delivery</span>
            <em>saltarinrojo.com</em>
          </div>
        </div>
      </div>
      <p class="demo-panel-foot">Probalo: elegí talle → Agregar → Carrito → WhatsApp o Pagar. <a href="tallas.html">Guía de tallas</a></p>
    </div>
  `;
  document.body.appendChild(panel);

  const toggle = panel.querySelector(".demo-panel-toggle");
  const body = panel.querySelector(".demo-panel-body");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    body.hidden = open;
    panel.classList.toggle("is-collapsed", open);
  });
})();
