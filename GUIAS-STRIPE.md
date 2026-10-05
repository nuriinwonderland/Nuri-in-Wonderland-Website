# Venta de las guías con Stripe: puesta en marcha

Los enlaces de pago de Stripe no permiten adjuntar un archivo. Por eso la entrega funciona así:

1. La persona paga en Stripe.
2. Stripe la redirige a `www.nuriinwonderland.com/gracias.html`.
3. Esa página comprueba el pago con Stripe (a través de una función de Supabase) y muestra el botón **Descargar PDF**.
4. Los PDF están en un espacio privado: nadie puede descargarlos sin haber pagado.

Hay que hacer estos pasos **una sola vez**. Sin ellos, el pago se cobra pero no se entrega el PDF.

## A. Supabase (unos 5 minutos)
1. Supabase → tu proyecto → **Storage** → **New bucket** → nombre `guias` → **"Public bucket" desactivado**.
2. Crea en Stripe una **clave restringida**: Desarrolladores → Claves de API → *Crear clave restringida*,
   con permiso de **lectura** en *Checkout Sessions* y *Products*.
3. Abre la Terminal y ejecuta:
   ```
   sh "/Users/nuriablanconevado/Documents/Claude Code Playground/nuri-web/setup-guias.sh"
   ```
   El script inicia sesión en Supabase, te pide la clave de Stripe (sin mostrarla ni guardarla),
   publica la función, sube los dos PDF y comprueba que todo responde.
4. Mira en Supabase → **Project Settings → General** la **región** del proyecto (por ejemplo, *West EU (Paris)*)
   y dímela para completar la política de privacidad.

## B. Stripe: en cada uno de los 3 enlaces de pago
Stripe → **Enlaces de pago** → abre el enlace → **Editar**:

1. **Después del pago** → *No mostrar la página de confirmación* → *Redirigir a tu sitio web*:
   `https://www.nuriinwonderland.com/gracias.html?session_id={CHECKOUT_SESSION_ID}`
   (escribe `{CHECKOUT_SESSION_ID}` tal cual; Stripe lo rellena).
2. **Opciones avanzadas** → activa **Exigir que los clientes acepten tus condiciones del servicio**.
   - Antes, en Configuración → **Detalles públicos**, pon como URL de condiciones:
     `https://www.nuriinwonderland.com/legal.html#venta`
   - En **Añadir texto personalizado** → *Aceptación de las condiciones del servicio*, escribe exactamente:
     > Solicito que el suministro del contenido digital comience inmediatamente y reconozco que, una vez iniciada la descarga, perderé mi derecho de desistimiento. Acepto las [condiciones de venta](https://www.nuriinwonderland.com/legal.html#venta).

   Es una **casilla obligatoria**: sin marcarla no se puede pagar.
3. **Crear una factura después del pago** (*Post-payment invoice*): actívalo y, en el **pie de página** de la factura, escribe:
   > Antes del pago, el cliente solicitó el suministro inmediato del contenido digital y reconoció que, una vez iniciada la descarga, pierde su derecho de desistimiento.

   Así la confirmación llega también **por correo electrónico**, junto con la factura.
   (Configuración → **Correos electrónicos de clientes** → activa *Pagos correctos*.)

## C. Prueba (imprescindible)
1. Activa el **modo de prueba** de Stripe y crea un enlace de prueba igual que uno de los tuyos (con la misma redirección).
2. Paga con la tarjeta de prueba `4242 4242 4242 4242`, cualquier fecha futura y cualquier CVC.
3. Debes llegar a `gracias.html`, ver **Descargar PDF**, descargar el archivo correcto y ver el recuadro de confirmación del desistimiento.
4. Para probar el **pack**, repítelo con un enlace de prueba del pack: deben salir las dos guías.

La función reconoce qué guía se ha comprado por el nombre del producto: "…Ciencia Ficción…", "…Fantasía…", "Pack…".
Si cambias los nombres, añade en cada producto el metadato `guias` = `scifi`, `fantasia` o `scifi,fantasia`.

## Si algo falla
- En Supabase → Edge Functions → `guide-download` → **Logs** verás el motivo.
- Si alguien no puede descargar, la página le pide que te escriba. Ve a Stripe → Pagos, comprueba su compra
  y mándale el PDF por correo.

## Impuestos
Vendiendo tú directamente, el IVA de las ventas digitales a particulares de otros países de la UE se declara
en el régimen **OSS** (modelo 369). Coméntalo con tu gestor. *Stripe Tax* puede calcular el impuesto de cada país.
