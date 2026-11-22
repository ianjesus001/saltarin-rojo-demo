# Demo completa — Saltarín Rojo

Vista previa con **paquete base + todos los opcionales** del presupuesto. No cobra nada real.

## Abrir

Doble clic en `index.html`, o:

```powershell
start index.html
```

Servidor local (opcional):

```powershell
python -m http.server 8765
```

Luego: http://127.0.0.1:8765/

## Recorrido sugerido (para el cliente)

1. **Home** — mirá badges de stock (en stock / últimas / agotado / consultar)  
2. Elegí **talle** → **Agregar**  
3. Abrí **Guía de tallas** (`tallas.html`)  
4. **Carrito** → **Enviar pedido por WhatsApp** (mensaje armado) **o** pagar online  
5. **Checkout** → confirmación  
6. **Feria Roja** — landing de campaña  

Panel abajo a la derecha: base vs opcionales.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Tienda / home + stock + talles |
| `tallas.html` | Guía de tallas |
| `carrito.html` | Carrito + WhatsApp pedido armado |
| `checkout.html` | Pago simulado |
| `confirmacion.html` | Pedido OK |
| `campana.html` | Landing Feria Roja |
| `cart.js` | Carrito + mensaje WhatsApp |
| `demo-panel.js` | Guía de opcionales |

## Base vs opcional (en la demo)

| Qué | Dónde |
|---|---|
| Stock + guía tallas | Incluido en base (catálogo / `tallas.html`) |
| Carrito + pasarela (1M) | Carrito → checkout → confirmación |
| WhatsApp carrito (250k) | Botón verde en el carrito |
| Analytics / SEO / landing / share | Como antes |
