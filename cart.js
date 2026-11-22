(() => {
  const KEY = "sr_demo_cart";
  const WA = "595981701333";

  const read = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  };

  const write = (items) => {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("sr-cart-updated"));
  };

  const formatGs = (n) =>
    "Gs. " + Number(n).toLocaleString("es-PY").replace(/,/g, ".");

  const lineKey = (product) =>
    product.id + "::" + (product.size || "") + "::" + (product.color || "");

  const cart = {
    get() {
      return read();
    },
    count() {
      return read().reduce((s, i) => s + i.qty, 0);
    },
    total() {
      return read().reduce((s, i) => s + i.price * i.qty, 0);
    },
    add(product) {
      const items = read();
      const key = lineKey(product);
      const found = items.find((i) => lineKey(i) === key);
      if (found) found.qty += 1;
      else items.push({ ...product, qty: 1 });
      write(items);
    },
    setQty(id, size, qty) {
      let items = read();
      items = items
        .map((i) =>
          i.id === id && (i.size || "") === (size || "")
            ? { ...i, qty: Math.max(0, qty) }
            : i
        )
        .filter((i) => i.qty > 0);
      write(items);
    },
    remove(id, size) {
      write(
        read().filter(
          (i) => !(i.id === id && (i.size || "") === (size || ""))
        )
      );
    },
    clear() {
      write([]);
    },
    formatGs,
    whatsappUrl() {
      const items = read();
      if (!items.length) {
        return `https://wa.me/${WA}?text=${encodeURIComponent(
          "Hola, quiero consultar por productos de Saltarín Rojo."
        )}`;
      }
      const lines = items.map((i) => {
        const size = i.size ? ` · Talle ${i.size}` : "";
        return `• ${i.qty}× ${i.name}${size} — ${formatGs(i.price * i.qty)}`;
      });
      const msg = [
        "Hola Saltarín Rojo, quiero este pedido:",
        "",
        ...lines,
        "",
        `Total: ${formatGs(cart.total())}`,
        "",
        "¿Me confirman stock y forma de entrega? Gracias.",
      ].join("\n");
      return `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    },
  };

  window.SRCart = cart;

  const updateBadges = () => {
    const n = cart.count();
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = String(n);
      el.hidden = n === 0;
    });
    document.querySelectorAll("[data-wa-cart]").forEach((el) => {
      el.href = cart.whatsappUrl();
      if (n === 0) el.classList.add("is-disabled");
      else el.classList.remove("is-disabled");
    });
  };

  window.addEventListener("sr-cart-updated", updateBadges);
  document.addEventListener("DOMContentLoaded", updateBadges);

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add-cart]");
    if (!btn) return;
    e.preventDefault();

    if (btn.dataset.stock === "out") return;

    const card = btn.closest(".product, .campaign-content, article");
    const sizeSelect = card && card.querySelector("[data-size-select]");
    const size = sizeSelect ? sizeSelect.value : btn.dataset.size || "";

    if (sizeSelect && sizeSelect.required && !size) {
      sizeSelect.focus();
      sizeSelect.classList.add("needs-size");
      setTimeout(() => sizeSelect.classList.remove("needs-size"), 1200);
      return;
    }

    cart.add({
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: Number(btn.dataset.price),
      image: btn.dataset.image || "",
      size: size || "",
    });

    btn.classList.add("just-added");
    const prev = btn.textContent;
    btn.textContent = "Agregado";
    setTimeout(() => {
      btn.textContent = prev;
      btn.classList.remove("just-added");
    }, 900);
  });
})();
