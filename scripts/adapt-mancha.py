"""Adapt the existing Mancha layout without changing the original project."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]
app = (root / 'src/App.tsx').read_text(encoding='utf-8')
start, end = app.index('const videos = ['), app.index('const ease = ')
app = app[:start] + app[end:]
app = app.replace('ArrowUpRight, BookOpen, Play', 'ArrowUpRight, BookOpen, Clock, MapPin')
app = app.replace("import { FcGoogle } from 'react-icons/fc';", "import { FcGoogle } from 'react-icons/fc';\nimport Videos from './Videos';")
app = app.replace("'961818343'", "'946247918'")
app = app.replace('manchaburgerstudio', 'tacochido.pe')
app = app.replace("const carta = 'https://clinquant-duckanoo-c7b3aa.netlify.app/';", "const carta = `${whatsapp}?text=${encodeURIComponent('¡Hola, Taco Chido! ¿Me comparten la carta, por favor?')}`;")
app = app.replace('ChIJJ8bSTlvJBZERcFXXgYpKOqw', 'ChIJaVtVQQDJBZERRWH6wvIGaGE')
a, b = app.index('const mapEmbed = '), app.index('\n', app.index('const mapEmbed = '))
app = app[:a] + "const mapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62419.513890942835!2d-77.07582153243418!3d-12.097112274915386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c90041555b69%3A0x616806f2c2fa6145!2sTaco%20Chido!5e0!3m2!1ses-419!2spe!4v1792779300412!5m2!1ses-419!2spe';\nconst mapLink = 'https://www.google.com/maps/search/?api=1&query=Taco+Chido&query_place_id=ChIJaVtVQQDJBZERRWH6wvIGaGE';" + app[b:]
app = app.replace('Mancha Burger Studio', 'Taco Chido').replace('MANCHA BURGER STUDIO', 'TACO CHIDO').replace('MANCHA / BURGER STUDIO', 'TACO CHIDO / TAQUERÍA')
app = app.replace('mancha_splash_seen', 'taco_chido_splash_seen').replace('header-mancha-logo', 'header-taco-chido-logo').replace('/mancha-logo-cream.png', '/taco-chido-logo-cream.png')
app = app.replace('Encontraste tu nueva hamburguesa favorita', 'Tacos mexicanos. Barrio peruano.').replace('Menos floro, más sabor', 'Sin floro. Con sazón.').replace('<p>Taco Chido</p>', '<p>El antojo empieza aquí.</p>')
app = app.replace('Pide y consulta la carta de Mancha', 'Pide y consulta la carta de Taco Chido').replace('Pide tu hamburguesa', 'Pide tus tacos').replace('Chequea nuestra carta aquí', 'Pide la carta aquí').replace('Chequea nuestra carta', 'Solicita la carta por WhatsApp')
app = app.replace('Pura carne en redes', 'La calle está en redes').replace('Directo a la plancha', 'Nos vemos en el barrio')
app = app.replace('<span>Creemos que una</span>\n          <span>hamburguesa honesta</span>\n          <span>es la mejor razón para</span>\n          <span>volver a juntarnos</span>', '<span>UN TACO CHIDO AL DÍA</span>\n          <span>ES LA CLAVE</span>\n          <span>DE LA ALEGRÍA</span>')
app = app.replace('<span className="hero__orbit hero__orbit--one" aria-hidden="true" />', '<span className="hero__stamp" aria-hidden="true">BIEN<br />CHIDO</span>')
app = app.replace('<span className="hero__orbit hero__orbit--two" aria-hidden="true" />', '')
app = app.replace('<p className="hero__handle">@tacochido.pe</p>', '<p className="hero__handle">@tacochido.pe</p><div className="hero__ribbon" aria-hidden="true">CON CALLE · CON SALSA · CON SAZÓN</div>')
app = app.replace('            <section className="location"', '            <div className="hours"><Clock size={20} aria-hidden="true" /><span><strong>Horario del viernes</strong><span>12:30 p. m. a 10:30 p. m.</span></span></div>\n\n            <section className="location"')
app = app.replace('                allowFullScreen\n              />', '                allowFullScreen\n              />\n              <a className="map-link" href={mapLink} target="_blank" rel="noopener noreferrer"><MapPin size={17} aria-hidden="true" />Cómo llegar a Taco Chido<ArrowUpRight size={17} aria-hidden="true" /></a>')
a, b = app.index('            <section className="videos"'), app.index('\n\n          </div>', app.index('            <section className="videos"'))
app = app[:a] + '            <Videos />' + app[b:]
app = app.replace('<footer className="footer"><span>TACO CHIDO</span><a href="tel:+51992272521" aria-label="Llamar a FLEXCORE al 992272521"><strong>FLEXCORE</strong> · Contacto: 992272521</a></footer>', '<footer className="footer"><span>TACO CHIDO</span><a href="tel:+51946247918">Llámanos: 946 247 918</a></footer>')
# Keep reduced-motion users out of the animated sequence even on a forced preview.
app = app.replace("const reduced = prefersReduced && new URLSearchParams(window.location.search).get('splash') !== 'full';", 'const reduced = prefersReduced;')
(root / 'src/App.tsx').write_text(app, encoding='utf-8')

css = (root / 'src/styles.css').read_text(encoding='utf-8')
css = css.replace('#ed0120', '#df2018').replace('#fff1e1', '#fcf2e3').replace('#011216', '#211f1b').replace('#a5161b', '#a31712')
css = css.replace("'Barlow Condensed', Impact, sans-serif", "'Super Little', Impact, sans-serif").replace("'Manrope', Arial, sans-serif", "'Gilroy', Arial, sans-serif").replace("'Manrope', sans-serif", "'Gilroy', Arial, sans-serif")
css = css.replace('background: #d8d8d8;', 'background: #ebae07;')
css = css.replace('font-size: clamp(28px, 7vw, 42px)', 'font-size: clamp(23px, 5.8vw, 38px)')
css = css.replace('line-height: .99;', 'line-height: 1.13;').replace('line-height: 1.05; text-align: center;', 'line-height: 1.35; text-align: center;')
(root / 'src/styles.css').write_text(css, encoding='utf-8')
