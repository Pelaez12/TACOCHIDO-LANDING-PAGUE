import { useCallback, useLayoutEffect, useState } from 'react';
import { ArrowUpRight, BookOpen, Clock, MapPin } from 'lucide-react';
import { motion, useAnimate, useReducedMotion } from 'motion/react';
import { SiInstagram, SiTiktok, SiWhatsapp } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import Videos from './Videos';

const phone = '946247918';
const whatsapp = `https://wa.me/51${phone}`;
const instagram = 'https://www.instagram.com/tacochido.pe/';
const carta = 'https://cartachida.comunidadfortaleza.com/';
const tiktok = 'https://www.tiktok.com/@tacochido.pe';
const review = 'https://search.google.com/local/writereview?placeid=ChIJaVtVQQDJBZERRWH6wvIGaGE';
const mapEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62419.513890942835!2d-77.07582153243418!3d-12.097112274915386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c90041555b69%3A0x616806f2c2fa6145!2sTaco%20Chido!5e0!3m2!1ses-419!2spe!4v1792779300412!5m2!1ses-419!2spe';
const mapLink = 'https://www.google.com/maps/search/?api=1&query=Taco+Chido&query_place_id=ChIJaVtVQQDJBZERRWH6wvIGaGE';

const ease = [0.22, 1, 0.36, 1] as const;
const isMobile = () => window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;

function MovingDots() {
  return (
    <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor" aria-hidden="true">
      {[0, 1, 2, 3].map(index => (
        <motion.circle
          key={index}
          cy="12"
          cx={index === 0 ? 4 : index * 8 - 4}
          r={index === 0 ? 0 : 3}
          animate={{ cx: [4, 4, 12, 20, 20, 4], r: [0, 3, 3, 3, 0, 0] }}
          transition={{ duration: 2.004, repeat: Infinity, delay: -index * 0.501,
            times: [0, 0.2495, 0.499, 0.7485, 0.998, 1], ease: [0.36, 0.6, 0.31, 1] }}
        />
      ))}
    </svg>
  );
}

function Intro() {
  const prefersReduced = useReducedMotion();
  const reduced = prefersReduced;
  const [scope, animate] = useAnimate();
  const [visible, setVisible] = useState(() => {
    const force = new URLSearchParams(window.location.search).get('splash');
    if (isMobile() || force === '1' || force === 'true' || force === 'full') return true;
    try { return !sessionStorage.getItem('taco_chido_splash_seen'); } catch { return true; }
  });

  const finish = useCallback(() => {
    if (!isMobile()) {
      try { sessionStorage.setItem('taco_chido_splash_seen', 'true'); } catch { /* Storage is optional. */ }
    }
    setVisible(false);
  }, []);

  useLayoutEffect(() => {
    if (!visible || !scope.current) return;
    const headerLogo = document.getElementById('header-taco-chido-logo');
    const content = document.getElementById('app-content');
    const previousOverflow = document.body.style.overflow;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    const previousScrollRestoration = history.scrollRestoration;
    const previousOpacity = headerLogo?.style.opacity ?? '';
    const previousInert = content?.inert ?? false;
    document.documentElement.style.scrollBehavior = 'auto';
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    if (headerLogo) headerLogo.style.opacity = '0';
    if (content) content.inert = true;
    document.body.style.overflow = 'hidden';

    const logo = scope.current.querySelector('.intro__logo') as HTMLElement;
    const source = logo.getBoundingClientRect();
    const target = headerLogo?.getBoundingClientRect();
    const dx = target ? target.left - source.left : 0;
    const dy = target ? target.top - source.top : 0;
    const scale = target ? target.height / source.height : 1;
    let cancelled = false;
    const headerReveal = headerLogo && !reduced
      ? headerLogo.animate([{ opacity: 0 }, { opacity: 1 }], { delay: 6600, duration: 100, fill: 'forwards', easing: 'ease-out' })
      : null;

    const controls = reduced
      ? animate([
          ['.intro__logo', { opacity: [0, 1] }, { duration: 0.15 }],
          ['.intro__logo', { opacity: 0 }, { at: 0.55, duration: 0.15 }],
          ['.intro__question', { opacity: [0, 1] }, { at: 0.7, duration: 0.15 }],
          ['.intro__question', { opacity: 0 }, { at: 2.2, duration: 0.15 }],
        ])
      : animate([
          ['.intro__dots', { opacity: [1, 0] }, { at: 3.2, duration: 0.25 }],
          ['.intro__logo', { opacity: [0, 1], transform: ['scale(0.94)', 'scale(1)'] }, { at: 3.4, duration: 0.3, ease }],
          ['.intro__logo-face', { transform: ['rotateX(0deg)', 'rotateX(-90deg)'], opacity: [1, 0] }, { at: 4.25, duration: 0.4, ease: [0.65, 0, 0.35, 1] }],
          ['.intro__question', { opacity: [0, 1], transform: ['rotateX(85deg) translateY(8px)', 'rotateX(0deg) translateY(0px)'] }, { at: 4.48, duration: 0.42, ease }],
          ['.intro__question', { opacity: 0, transform: 'translateY(-8px)' }, { at: 5.8, duration: 0.25 }],
          ['.intro__logo-face', { transform: 'rotateX(0deg)', opacity: 1 }, { at: 6.02, duration: 0.12 }],
          ['.intro__logo', { transform: `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`, opacity: target ? 1 : 0 }, { at: 6.05, duration: 0.55, ease }],
          ['.intro__red', { opacity: [1, 0] }, { at: 6.05, duration: 0.65, ease }],
        ]);

    controls.then(() => { if (!cancelled) finish(); });
    const handleEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') finish(); };
    window.addEventListener('keydown', handleEscape);
    window.addEventListener('orientationchange', finish);
    return () => {
      cancelled = true;
      controls.cancel();
      headerReveal?.cancel();
      if (headerLogo) headerLogo.style.opacity = previousOpacity;
      if (content) content.inert = previousInert;
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('orientationchange', finish);
    };
  }, [visible, reduced, animate, scope, finish]);

  if (!visible) return null;
  return (
    <div ref={scope} className="intro" role="dialog" aria-modal="true" aria-label="Bienvenido a Taco Chido" onClick={finish}>
      <div className="intro__red" />
      <div className="intro__stage" aria-hidden="true">
        {!reduced && <div className="intro__dots"><MovingDots /></div>}
        <div className="intro__logo"><span className="intro__logo-face"><img src="/taco-chido-logo-cream.png" alt="" /></span></div>
        <p className="intro__question">
          <span>UN TACO CHIDO AL DÍA</span>
          <span>ES LA CLAVE</span>
          <span>DE LA ALEGRÍA</span>
        </p>
      </div>
      <button type="button" className="intro__skip" onClick={finish}>Toca para comenzar</button>
    </div>
  );
}

function App() {
  return (
    <>
      <Intro />
      <div className="page-shell" id="app-content">
        <main className="profile-card">
          <div className="profile-card__top" aria-hidden="true"><span>TACO CHIDO / TAQUERÍA</span><span>ENLACES OFICIALES</span></div>
          <header className="hero">
            <span className="hero__stamp" aria-hidden="true">BIEN<br />CHIDO</span>
            
            <img src="/taco-chido-logo-cream.png" alt="Taco Chido" className="hero__logo" id="header-taco-chido-logo" />
            <p className="hero__handle">@tacochido.pe</p><div className="hero__ribbon" aria-hidden="true">CON CALLE · CON SALSA · CON SAZÓN</div>
          </header>

          <div className="profile-content">
            <div className="intro-copy">
              <p className="intro-copy__eyebrow">TACO CHIDO PARA GENTE CHIDA</p>
              <h1>Sin floro. Con sazón.</h1>
              <p>El antojo empieza aquí.</p>
            </div>

            <section className="actions" aria-label="Pide y consulta la carta de Taco Chido">
              <a className="action action--primary" href={whatsapp} target="_blank" rel="noopener noreferrer">
                <SiWhatsapp size={22} aria-hidden="true" />
                <span>Pide tus tacos</span>
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
              <a className="action action--menu" href={carta} target="_blank" rel="noopener noreferrer" aria-label="Ingresa a nuestra carta">
                <BookOpen size={20} aria-hidden="true" />
                <span>Ingresa a nuestra carta aquí</span>
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            </section>

            <section className="social" aria-label="Redes sociales">
              <div className="section-head"><h2>La calle está en redes</h2><span>@tacochido.pe</span></div>
              <div className="social__links">
                <a className="action" href={instagram} target="_blank" rel="noopener noreferrer">
                  <SiInstagram size={21} aria-hidden="true" />
                  <span>Instagram</span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </a>
                <a className="action" href={tiktok} target="_blank" rel="noopener noreferrer">
                  <SiTiktok size={21} aria-hidden="true" />
                  <span>TikTok</span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </a>
              </div>
            </section>

            <a className="review-link" href={review} target="_blank" rel="noopener noreferrer">
              <span className="review-link__icon"><FcGoogle size={25} aria-hidden="true" /></span>
              <span><strong>¿Ya nos probaste?</strong><small>Deja tu opinión en Google</small></span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>

            <div className="hours"><Clock size={20} aria-hidden="true" /><span><strong>Horario del viernes</strong><span>12:30 p. m. a 10:30 p. m.</span></span></div>

            <section className="location" aria-labelledby="location-heading">
              <div className="section-head"><h2 id="location-heading">Nos vemos en el barrio</h2></div>
              <iframe
                src={mapEmbed}
                title="Ubicación de Taco Chido en Google Maps"
                width="400"
                height="300"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <a className="map-link" href={mapLink} target="_blank" rel="noopener noreferrer"><MapPin size={17} aria-hidden="true" />Cómo llegar a Taco Chido<ArrowUpRight size={17} aria-hidden="true" /></a>
            </section>

            <Videos />

          </div>

          <footer className="footer"><span>TACO CHIDO</span><a href="tel:+51946247918">Llámanos: 946 247 918</a></footer>
        </main>
      </div>
    </>
  );
}

export default App;
