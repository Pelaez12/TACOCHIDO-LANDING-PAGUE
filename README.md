# Taco Chido

Landing de enlaces basada en MANCHA-BURGER, con la identidad del manual de marca de Taco Chido.

## Vista local

```powershell
cd TACO-CHIDO
npm install
npm run dev
```

Abre http://127.0.0.1:8089/. Para compilar: `npm run build`.

## Contenido confirmado

- WhatsApp y teléfono: +51 946 247 918.
- Instagram y TikTok: @tacochido.pe.
- Mapa y reseñas de Google proporcionados por el usuario.
- Horario confirmado para viernes: 12:30 p. m. a 10:30 p. m.
- Dos reels de Instagram y un TikTok, con portadas locales obtenidas de las publicaciones originales. Cada portada permite cargar su reproductor y cada título abre la publicación original.
- Animación de entrada con «UN TACO CHIDO AL DÍA ES LA CLAVE DE LA ALEGRÍA». Se puede omitir y respeta movimiento reducido.

La carta aún no fue proporcionada. El botón actual solicita la carta por WhatsApp. No se han supuesto horarios para otros días.

Los logos se extrajeron del manual facilitado por el usuario. Las fuentes web son Lilita One y Manrope, alojadas localmente en WOFF2 con sus licencias OFL en `public/fonts/`. Sustituyen los subconjuntos del PDF, que carecen de algunos glifos y causaban letras invisibles en iPhone. `scripts/prepare-web-fonts.py` descarga las fuentes del repositorio oficial de Google Fonts y comprueba que las letras, tildes, signos y números tengan glifos válidos (requiere Python, fonttools y brotli).

Las portadas están guardadas en `public/` para que aparezcan sin esperar a que carguen Instagram o TikTok. Los reproductores externos dependen de cada plataforma.
