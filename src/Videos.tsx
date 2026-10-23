import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { SiInstagram, SiTiktok } from 'react-icons/si';

const videos = [
  { id: '7682881146522291476', platform: 'TikTok', title: 'La cámara escondida de los lunes', href: 'https://www.tiktok.com/@tacochido.pe/video/7682881146522291476', embed: 'https://www.tiktok.com/player/v1/7682881146522291476?autoplay=0', caption: 'Los lunes también tienen sazón.', theme: 'gold' },
  { id: 'DeCjlF_JTfm', platform: 'Instagram', title: 'Desde Taco Chido', href: 'https://www.instagram.com/reel/DeCjlF_JTfm/', embed: 'https://www.instagram.com/reel/DeCjlF_JTfm/embed/', caption: 'Un taco chido al día.', theme: 'red' },
  { id: 'DeSlCF-JRwL', platform: 'Instagram', title: 'Más de Taco Chido', href: 'https://www.instagram.com/reel/DeSlCF-JRwL/', embed: 'https://www.instagram.com/reel/DeSlCF-JRwL/embed/', caption: 'La clave de la alegría.', theme: 'ink' },
];

export default function Videos() {
  const [active, setActive] = useState<string | null>(null);
  return <section className="videos" aria-labelledby="videos-heading">
    <div className="section-head"><h2 id="videos-heading">Así se vive lo chido</h2><span>DESLIZA PARA VER →</span></div>
    <div className="videos__list" role="list" aria-label="Videos de Taco Chido">
      {videos.map(video => <article className="video-preview" key={video.id} role="listitem">
        <div className={`video-frame video-frame--${video.theme}`}>
          {active === video.id
            ? <><iframe title={`${video.title} en ${video.platform}`} src={video.embed} allow="encrypted-media; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /><button className="video-close" onClick={() => setActive(null)}>Cerrar video ×</button></>
            : <button className="video-cover" onClick={() => setActive(video.id)} aria-label={`Cargar video ${video.title} de ${video.platform}`}>
              <img className="video-cover__poster" src={video.id === 'DeCjlF_JTfm' ? '/taco-instagram-1.jpg' : video.id === 'DeSlCF-JRwL' ? '/taco-instagram-2.jpg' : '/taco-tiktok-lunes.jpg'} alt={`Vista previa de ${video.title}`} width="540" height="960" loading="eager" decoding="async" />
              <span className="video-cover__play"><Play size={25} fill="currentColor" aria-hidden="true" /></span>
              <span className="video-cover__label">Ver video de {video.platform}</span>
            </button>}
        </div>
        <a className="video-preview__caption" href={video.href} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${video.title} en ${video.platform}`}>
          <span className="video-preview__platform">{video.platform === 'TikTok' ? <SiTiktok size={15} /> : <SiInstagram size={15} />}{video.platform}<ArrowUpRight size={15} aria-hidden="true" /></span>
          <strong>{video.title}</strong>
        </a>
      </article>)}
    </div>
    <p className="videos__note">También puedes abrir cada publicación directamente en su red social.</p>
  </section>;
}
