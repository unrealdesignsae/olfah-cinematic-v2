import { useEffect, useMemo, useRef, useState } from 'react'

const heroScenes = [
  { image: '/assets/hero-desktop.jpg', mobile: '/assets/hero-mobile.jpg', label: 'Blue hour' },
  { image: '/assets/night-park.jpg', label: 'Park after dark' },
  { image: '/assets/night-aerial.jpg', label: 'The community' },
]

const panoramaScenes = [
  { id: 'pool', number: '01', title: 'Pool Garden', note: 'Water & landscape', thumb: '/assets/exterior-02.jpg', x: 59, y: 53 },
  { id: 'garden', number: '02', title: 'Garden Gathering', note: 'Community & BBQ', thumb: '/assets/amenity-bbq.jpg', x: 45, y: 47 },
  { id: 'woodland', number: '03', title: 'Woodland Walk', note: 'Shaded afternoon', thumb: '/assets/amenity-trails.jpg', x: 37, y: 34 },
  { id: 'lawn', number: '04', title: 'Central Lawn', note: 'The park heart', thumb: '/assets/exterior-03.jpg', x: 52, y: 47 },
  { id: 'play', number: '05', title: 'Play Garden', note: 'Family landscape', thumb: '/assets/amenity-play.jpg', x: 42, y: 40 },
  { id: 'fitness', number: '06', title: 'Fitness Plaza', note: 'Outdoor movement', thumb: '/assets/amenity-outdoor-fitness.jpg', x: 62, y: 45 },
  { id: 'promenade', number: '07', title: 'Residential Promenade', note: 'Evening arrival', thumb: '/assets/night-park.jpg', x: 55, y: 68 },
  { id: 'home', number: '08', title: 'Apartment Home', note: 'Inside a residence', thumb: '/assets/interior-03.jpg', x: 83, y: 59 },
]

const facts = [
  ['84,814.40 m²', 'Community area'],
  ['57,529.6 m²', 'Green & recreation'],
  ['12', 'Residential buildings'],
  ['9–11', 'Floors'],
  ['1–3', 'Bedroom residences'],
]

const details = [
  ['Sharjah’s largest private community park', 'An elevated podium park of more than 26,000 m².'],
  ['Five swimming pools', 'A 25 m lap pool, children’s pool, jacuzzi and three large recreational pools.'],
  ['Movement through nature', 'Jogging and cycle paths, a woodland walk, shaded seating and outdoor exercise equipment.'],
  ['Play and discovery', 'Interactive water features, lawn mounds, a kids’ waterpark, sand play and a climbing wall.'],
  ['Places to gather', 'An amphitheatre with grass stage, family BBQ and picnic areas, community retreats and retail.'],
  ['Homes connected to landscape', 'Green rooftops, considered balconies and private gardens for select ground-floor homes.'],
]

const galleries = {
  exteriors: [
    '/assets/exterior-01.jpg', '/assets/exterior-02.jpg', '/assets/exterior-03.jpg', '/assets/exterior-04.jpg',
    '/assets/exterior-05.jpg', '/assets/exterior-06.jpg', '/assets/exterior-07.jpg', '/assets/exterior-08.jpg',
  ],
  interiors: ['/assets/interior-01.jpg', '/assets/interior-02.jpg', '/assets/interior-03.jpg'],
  night: ['/assets/night-pool.jpg', '/assets/night-park.jpg', '/assets/night-aerial.jpg', '/assets/hero-desktop.jpg', '/assets/footer-architecture.jpg'],
}

const navItems = [
  ['Project Details', 'details'],
  ['Masterplan', 'masterplan'],
  ['Developer', 'developer'],
  ['Film', 'film'],
  ['Gallery', 'gallery'],
]

function Arrow({ left = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={left ? 'is-left' : ''}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  )
}

function CloseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
}

function PlayIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 7 8 5-8 5Z" /></svg>
}

function Header({ openPanel, menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Olfah home">
        <img src="/assets/olfah-logo.svg" alt="Olfah" />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, id]) => (
          <button key={id} type="button" onClick={() => openPanel(id)}>{label}</button>
        ))}
        <a href="/assets/olfah-brochure.pdf" target="_blank" rel="noreferrer">Brochure</a>
        <button className="nav-cta" type="button" onClick={() => openPanel('enquire')}>Enquire</button>
      </nav>
      <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((value) => !value)}>
        <span>{menuOpen ? 'Close' : 'Menu'}</span>
        <i aria-hidden="true" />
      </button>
      <div id="mobile-navigation" className={`mobile-navigation ${menuOpen ? 'is-open' : ''}`}>
        <nav aria-label="Mobile navigation">
          {navItems.map(([label, id]) => (
            <button key={id} type="button" onClick={() => { openPanel(id); setMenuOpen(false) }}>{label}</button>
          ))}
          <a href="/assets/olfah-brochure.pdf" target="_blank" rel="noreferrer">Brochure</a>
          <button type="button" onClick={() => { openPanel('enquire'); setMenuOpen(false) }}>Enquire</button>
        </nav>
      </div>
    </header>
  )
}

function Hero({ scene, setScene, openPanel }) {
  return (
    <main id="home" className="hero">
      <div className="hero-media" aria-hidden="true">
        {heroScenes.map((item, index) => (
          <picture key={item.image} className={scene === index ? 'is-active' : ''}>
            {item.mobile && <source media="(max-width: 680px)" srcSet={item.mobile} />}
            <img src={item.image} alt="" />
          </picture>
        ))}
        <div className="hero-grade" />
      </div>

      <div className="light-points" aria-hidden="true">
        <i style={{ '--x': '12%', '--y': '31%', '--d': '0s' }} />
        <i style={{ '--x': '84%', '--y': '27%', '--d': '1.5s' }} />
        <i style={{ '--x': '68%', '--y': '67%', '--d': '2.4s' }} />
        <i style={{ '--x': '27%', '--y': '76%', '--d': '3.1s' }} />
      </div>

      <section className="hero-content" aria-labelledby="hero-title">
        <p className="hero-kicker">A forest-inspired community in Sharjah</p>
        <h1 id="hero-title">Where nature<br />becomes <em>home</em></h1>
        <p className="hero-copy">Architecture, landscape and daily life grow together in a walkable neighbourhood by Alef Group.</p>
        <button className="primary-action" type="button" onClick={() => openPanel('masterplan')}>
          Explore the masterplan <i /> <Arrow />
        </button>
      </section>

      <div className="hero-bottom">
        <div className="legal-links">
          <a href="https://www.alefgroup.ae/privacy-policy/" target="_blank" rel="noreferrer">Privacy</a>
          <span />
          <a href="https://www.alefgroup.ae/" target="_blank" rel="noreferrer">Alef Group</a>
        </div>
        <button className="hero-fact" type="button" onClick={() => openPanel('details')}>
          <strong>84,814 <small>m²</small></strong><span>Community</span>
        </button>
        <button className="hero-fact" type="button" onClick={() => openPanel('details')}>
          <strong>26,000+ <small>m²</small></strong><span>Private park</span>
        </button>
        <button className="film-link" type="button" onClick={() => openPanel('film')}>
          <span>View the film</span><i><PlayIcon /></i>
        </button>
      </div>

      <div className="scene-selector" aria-label="Choose hero view">
        {heroScenes.map((item, index) => (
          <button key={item.label} type="button" aria-label={item.label} aria-pressed={scene === index} className={scene === index ? 'is-active' : ''} onClick={() => setScene(index)} />
        ))}
      </div>
    </main>
  )
}

function PanelShell({ children, label, tone = 'light', closePanel, className = '' }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  return (
    <div className={`overlay overlay-${tone} ${className}`} role="dialog" aria-modal="true" aria-label={label} onMouseDown={(event) => { if (event.target === event.currentTarget) closePanel() }}>
      <section className="panel">
        <button ref={closeRef} className="panel-close" type="button" onClick={closePanel} aria-label={`Close ${label}`}><CloseIcon /></button>
        {children}
      </section>
    </div>
  )
}

function DetailsPanel({ closePanel }) {
  return (
    <PanelShell label="Project details" closePanel={closePanel} className="details-overlay">
      <div className="details-panel-content">
        <p className="panel-kicker">Project details</p>
        <h2>Olfah at a glance</h2>
        <div className="facts-row">
          {facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
        <div className="details-lower">
          <div className="details-intro">
            <p>A forest-inspired residential community by Alef Group, designed around generous green space, connected courtyards and everyday wellbeing.</p>
            <dl>
              <div><dt>Location</dt><dd>Muwaileh, Sharjah</dd></div>
              <div><dt>Connections</dt><dd>E311 · University City · Sharjah & Dubai airports</dd></div>
              <div><dt>Residences</dt><dd>World-class 1, 2 and 3 bedroom apartments</dd></div>
            </dl>
          </div>
          <div className="details-list">
            {details.map(([title, copy], index) => (
              <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{copy}</p></div></article>
            ))}
          </div>
        </div>
      </div>
    </PanelShell>
  )
}

function MasterplanPanel({ closePanel, openPanorama }) {
  return (
    <PanelShell label="Interactive masterplan" closePanel={closePanel} className="masterplan-overlay">
      <div className="masterplan-head">
        <div><p className="panel-kicker">Interactive masterplan</p><h2>Explore Olfah</h2></div>
        <p className="masterplan-hint"><span>↗</span> Select a hotspot for a 360° view</p>
      </div>
      <div className="masterplan-layout">
        <aside>
          <p>Choose a place to step inside the community.</p>
          <div className="scene-list">
            {panoramaScenes.map((item) => (
              <button key={item.id} type="button" onClick={() => openPanorama(item.id)}>
                <span>{item.number}</span><div><strong>{item.title}</strong><small>{item.note}</small></div><Arrow />
              </button>
            ))}
          </div>
        </aside>
        <div className="masterplan-map">
          <img src="/assets/community-aerial.jpg" alt="Aerial masterplan of Olfah showing residential buildings around the central park" />
          {panoramaScenes.map((item) => (
            <button key={item.id} type="button" className="map-hotspot" style={{ left: `${item.x}%`, top: `${item.y}%` }} onClick={() => openPanorama(item.id)} aria-label={`Open ${item.title} 360 degree panorama`}>
              <span>{Number(item.number)}</span><b>{item.title}</b>
            </button>
          ))}
        </div>
      </div>
    </PanelShell>
  )
}

function PanoramaPanel({ closePanel, sceneId, setSceneId, backToMasterplan }) {
  const active = panoramaScenes.find((item) => item.id === sceneId) || panoramaScenes[0]
  return (
    <PanelShell label={`${active.title} 360 degree panorama`} closePanel={closePanel} tone="dark" className="panorama-overlay">
      <div className="panorama-topbar">
        <div><p className="panel-kicker">360° experience</p><h2>{active.title}</h2></div>
        <div className="panorama-actions">
          <button type="button" onClick={backToMasterplan}><Arrow left /> Masterplan</button>
          <a href={`/360/index.html?scene=${active.id}`} target="_blank" rel="noreferrer">Open fullscreen <Arrow /></a>
        </div>
      </div>
      <div className="panorama-frame">
        <iframe key={active.id} src={`/360/index.html?scene=${active.id}&embed=1`} title={`Interactive panorama: ${active.title}`} allow="fullscreen; accelerometer; gyroscope" />
        <div className="drag-hint" aria-hidden="true"><span>↔</span> Drag to explore</div>
      </div>
      <div className="panorama-strip" role="group" aria-label="Panorama scenes">
        {panoramaScenes.map((item) => (
          <button key={item.id} type="button" className={item.id === active.id ? 'is-active' : ''} aria-pressed={item.id === active.id} onClick={() => setSceneId(item.id)}>
            <img src={item.thumb} alt="" aria-hidden="true" /><span>{item.number}</span><strong>{item.title}</strong>
          </button>
        ))}
      </div>
    </PanelShell>
  )
}

function DeveloperPanel({ closePanel, openEnquiry }) {
  return (
    <PanelShell label="About Alef Group" closePanel={closePanel} tone="dark" className="developer-overlay">
      <div className="developer-image"><img src="/assets/footer-architecture.jpg" alt="Olfah architecture at sunset" /></div>
      <div className="developer-copy">
        <p className="panel-kicker">The developer</p>
        <h2>Made for life,<br /><em>built by Alef.</em></h2>
        <p>Alef is a premier real estate developer in the UAE, creating premium lifestyle communities, world-class destinations and enduring experiences through strategic investments and joint ventures.</p>
        <div className="developer-meta">
          <span>Based in Sharjah</span><span>Community-led development</span><span>Premium lifestyle destinations</span>
        </div>
        <button className="primary-action light" type="button" onClick={openEnquiry}>Register your interest <i /><Arrow /></button>
        <a className="text-link" href="https://www.alefgroup.ae/" target="_blank" rel="noreferrer">Visit Alef Group <Arrow /></a>
      </div>
    </PanelShell>
  )
}

function FilmPanel({ closePanel }) {
  const [slide, setSlide] = useState(0)
  const slides = [
    ['/assets/hero-desktop.jpg', 'A community beneath the canopy'],
    ['/assets/night-park.jpg', 'Landscape that glows after dark'],
    ['/assets/exterior-02.jpg', 'Water at the heart of daily life'],
    ['/assets/interior-01.jpg', 'Homes connected to nature'],
  ]

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((value) => (value + 1) % slides.length), 4200)
    return () => window.clearInterval(timer)
  }, [slides.length])

  return (
    <PanelShell label="Olfah film" closePanel={closePanel} tone="dark" className="film-overlay">
      <div className="film-canvas">
        {slides.map(([image, caption], index) => <img key={image} className={slide === index ? 'is-active' : ''} src={image} alt={caption} />)}
        <div className="film-shade" />
        <div className="film-caption"><p className="panel-kicker">Olfah · A life in nature</p><h2>{slides[slide][1]}</h2></div>
        <div className="film-progress">
          {slides.map(([, caption], index) => <button key={caption} type="button" className={slide === index ? 'is-active' : ''} onClick={() => setSlide(index)}><span />{String(index + 1).padStart(2, '0')}</button>)}
        </div>
      </div>
    </PanelShell>
  )
}

function GalleryPanel({ closePanel, openPanorama }) {
  const [category, setCategory] = useState('exteriors')
  const [index, setIndex] = useState(0)
  const images = galleries[category]
  const current = images[index % images.length]
  const secondary = images[(index + 1) % images.length]

  const chooseCategory = (next) => { setCategory(next); setIndex(0) }
  const move = (delta) => setIndex((value) => (value + delta + images.length) % images.length)

  return (
    <PanelShell label="Olfah gallery" closePanel={closePanel} tone="dark" className="gallery-overlay">
      <div className="gallery-brand"><img src="/assets/olfah-logo.svg" alt="Olfah" /><span>Immersive gallery</span></div>
      <div className="gallery-layout">
        <button className="gallery-main" type="button" onClick={() => move(1)} aria-label="Show next image"><img key={current} src={current} alt={`${category} at Olfah`} /></button>
        <div className="gallery-side">
          <h2>Life, framed<br />by nature</h2>
          <img key={secondary} src={secondary} alt={`Another ${category} view at Olfah`} />
        </div>
      </div>
      <div className="gallery-toolbar">
        <div className="gallery-tabs" role="tablist" aria-label="Gallery categories">
          {Object.keys(galleries).map((name) => <button key={name} type="button" role="tab" aria-selected={category === name} className={category === name ? 'is-active' : ''} onClick={() => chooseCategory(name)}>{name}</button>)}
          <button type="button" onClick={() => openPanorama('pool')}>360°</button>
        </div>
        <span className="gallery-count">{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
        <div className="gallery-nav"><button type="button" onClick={() => move(-1)} aria-label="Previous image"><Arrow left /></button><button type="button" onClick={() => move(1)} aria-label="Next image"><Arrow /></button></div>
        <p>{category === 'interiors' ? 'Apartment residence' : category === 'night' ? 'Olfah after dark' : 'Landscape & architecture'} · Olfah, Sharjah</p>
        <button className="gallery-360" type="button" onClick={() => openPanorama('pool')}>Open 360° experience <Arrow /></button>
      </div>
    </PanelShell>
  )
}

function EnquirePanel({ closePanel }) {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const submit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nextErrors = {}
    if (!String(data.get('name') || '').trim()) nextErrors.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(String(data.get('email') || ''))) nextErrors.email = 'Enter a valid email.'
    if (!String(data.get('phone') || '').trim()) nextErrors.phone = 'Please enter your phone number.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setStatus('loading')
    window.setTimeout(() => setStatus('success'), 700)
  }

  return (
    <PanelShell label="Register your interest" closePanel={closePanel} className="enquire-overlay">
      <div className="enquire-image"><img src="/assets/exterior-06.jpg" alt="Olfah residential courtyard" /><div><span>Olfah · Muwaileh, Sharjah</span><strong>Come home to<br />something alive.</strong></div></div>
      <div className="enquire-content">
        <p className="panel-kicker">Register your interest</p>
        <h2>Find your space<br /><em>at Olfah.</em></h2>
        <p>Speak with the Alef sales team about one, two and three bedroom residences.</p>
        {status === 'success' ? (
          <div className="success-message" role="status"><span>Thank you</span><h3>Your interest has been noted.</h3><p>For immediate help, call Alef Group on 800 998.</p><a href="tel:800998">Call 800 998 <Arrow /></a></div>
        ) : (
          <form onSubmit={submit} noValidate>
            <label>Name<input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
            <label>Email<input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />{errors.email && <small>{errors.email}</small>}</label>
            <label>Phone number<input name="phone" type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} />{errors.phone && <small>{errors.phone}</small>}</label>
            <label className="full">Message <span>Optional</span><textarea name="message" rows="2" /></label>
            <button className="primary-action" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Preparing…' : 'Submit your enquiry'} <i /><Arrow /></button>
          </form>
        )}
        <div className="direct-contact"><a href="tel:800998"><span>Call sales</span><strong>800 998</strong></a><a href="https://wa.me/971800253323?text=Hello%20I%20am%20interested%20in%20Olfah" target="_blank" rel="noreferrer"><span>Message sales</span><strong>WhatsApp</strong></a></div>
      </div>
    </PanelShell>
  )
}

function CookieNotice() {
  const [visible, setVisible] = useState(() => window.localStorage.getItem('olfah-v2-cookie-choice') !== 'set')
  if (!visible) return null
  const dismiss = () => { window.localStorage.setItem('olfah-v2-cookie-choice', 'set'); setVisible(false) }
  return (
    <aside className="cookie-notice" aria-label="Privacy notice">
      <button type="button" onClick={dismiss} aria-label="Close privacy notice"><CloseIcon /></button>
      <p>We use essential browser storage to remember your viewing preferences.</p>
      <div><button type="button" onClick={dismiss}>Decline</button><button type="button" onClick={dismiss}>Accept</button></div>
    </aside>
  )
}

export default function App() {
  const [activePanel, setActivePanel] = useState(null)
  const [panoramaScene, setPanoramaScene] = useState('pool')
  const [heroScene, setHeroScene] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const previousPanel = useRef(null)

  useEffect(() => {
    const timer = window.setInterval(() => setHeroScene((value) => (value + 1) % heroScenes.length), 8500)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActivePanel(null)
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.classList.toggle('has-overlay', Boolean(activePanel || menuOpen))
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('has-overlay')
    }
  }, [activePanel, menuOpen])

  useEffect(() => {
    Promise.resolve(document.fonts?.ready).then(() => { window.__ready = true })
  }, [])

  const openPanel = (id) => {
    previousPanel.current = activePanel
    setActivePanel(id)
  }
  const closePanel = () => setActivePanel(null)
  const openPanorama = (id) => { setPanoramaScene(id); previousPanel.current = 'masterplan'; setActivePanel('panorama') }
  const backToMasterplan = () => setActivePanel('masterplan')
  const panel = useMemo(() => {
    if (activePanel === 'details') return <DetailsPanel closePanel={closePanel} />
    if (activePanel === 'masterplan') return <MasterplanPanel closePanel={closePanel} openPanorama={openPanorama} />
    if (activePanel === 'panorama') return <PanoramaPanel closePanel={closePanel} sceneId={panoramaScene} setSceneId={setPanoramaScene} backToMasterplan={backToMasterplan} />
    if (activePanel === 'developer') return <DeveloperPanel closePanel={closePanel} openEnquiry={() => setActivePanel('enquire')} />
    if (activePanel === 'film') return <FilmPanel closePanel={closePanel} />
    if (activePanel === 'gallery') return <GalleryPanel closePanel={closePanel} openPanorama={openPanorama} />
    if (activePanel === 'enquire') return <EnquirePanel closePanel={closePanel} />
    return null
  }, [activePanel, panoramaScene])

  return (
    <div className="app-shell">
      <Header openPanel={openPanel} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero scene={heroScene} setScene={setHeroScene} openPanel={openPanel} />
      {panel}
      <CookieNotice />
    </div>
  )
}
