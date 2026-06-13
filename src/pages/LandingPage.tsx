import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SCENARIOS = [
  {
    email: 'We love your work — but can you do it for half the price?',
    question: 'Do I push back or just let it go?',
  },
  {
    email: 'Your performance review is next week. We need to talk.',
    question: 'How do I prepare for this?',
  },
  {
    email: "We're going in a different direction. You're off the project.",
    question: 'How do I respond professionally?',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [headlineText, setHeadlineText] = useState('');
  const [headlineDone, setHeadlineDone] = useState(false);
  const [navHover, setNavHover] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const [screenCtaHover, setScreenCtaHover] = useState(false);

  const HANDLED = 'handled';

  useEffect(() => {
    const id = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (headlineDone) return;
    const id = setTimeout(() => {
      if (headlineText.length < HANDLED.length) {
        setHeadlineText(HANDLED.slice(0, headlineText.length + 1));
      } else {
        setHeadlineDone(true);
      }
    }, headlineText.length === 0 ? 500 : 90);
    return () => clearTimeout(id);
  }, [headlineText, headlineDone]);

  useEffect(() => {
    const scenario = SCENARIOS[scenarioIndex];
    if (isPaused) {
      const id = setTimeout(() => {
        setIsPaused(false);
        setDisplayedText('');
        setScenarioIndex(i => (i + 1) % SCENARIOS.length);
      }, 2400);
      return () => clearTimeout(id);
    }
    if (displayedText.length < scenario.email.length) {
      const id = setTimeout(() => {
        setDisplayedText(scenario.email.slice(0, displayedText.length + 1));
      }, 38);
      return () => clearTimeout(id);
    }
    setIsPaused(true);
  }, [displayedText, scenarioIndex, isPaused]);

  return (
    <div
      style={{
        background: '#080808',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Page glow — top right */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '900px',
          height: '900px',
          background: 'radial-gradient(ellipse at top right, rgba(180,25,25,0.22) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Page glow — bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '850px',
          height: '850px',
          background: 'radial-gradient(ellipse at bottom left, rgba(180,25,25,0.22) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Navbar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: '56px',
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#e03030',
              flexShrink: 0,
            }}
          />
          <span style={{ color: '#fff', fontWeight: 600, fontSize: '15px' }}>Stance</span>
        </div>
        <button
          onClick={() => navigate('/app')}
          onMouseEnter={() => setNavHover(true)}
          onMouseLeave={() => { setNavHover(false); setNavActive(false); }}
          onMouseDown={() => setNavActive(true)}
          onMouseUp={() => setNavActive(false)}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff',
            padding: '7px 18px',
            borderRadius: '7px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease',
            transform: navActive ? 'scale(0.96) translateY(0px)' : navHover ? 'scale(1.07) translateY(-2px)' : 'scale(1) translateY(0px)',
            boxShadow: navActive ? '0 0 20px rgba(220,40,40,0.55), 0 0 8px rgba(220,40,40,0.3)' : navHover ? '0 4px 16px rgba(0,0,0,0.4)' : 'none',
            borderColor: navHover ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)',
            marginTop: '8px',
          }}
        >
          Try it free →
        </button>
      </nav>

      {/* Page body */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '48px',
          width: '100%',
        }}
      >
        {/* Headline */}
        <div style={{ textAlign: 'center', marginBottom: '22px', padding: '0 24px' }}>
          <h1
            style={{
              color: '#fff',
              fontSize: '30px',
              fontWeight: 700,
              margin: '0 0 4px 0',
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
            }}
          >
            Every difficult email,{' '}
            {headlineText}
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '28px',
                background: '#e03030',
                marginLeft: '2px',
                verticalAlign: 'middle',
                opacity: cursorVisible ? 1 : 0,
                transition: 'opacity 0.05s',
              }}
            />
          </h1>
        </div>

        {/* Laptop frame */}
        <div
          style={{
            maxWidth: '860px',
            width: '100%',
            padding: '0 10px',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          {/* Lid */}
          <div
            style={{
              background: '#141414',
              border: '1.5px solid #272727',
              borderBottom: 'none',
              borderRadius: '10px 10px 0 0',
              padding: '10px 10px 0 10px',
              overflow: 'hidden',
            }}
          >
            {/* Camera dot */}
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#282828',
                margin: '0 auto 8px auto',
              }}
            />

            {/* Screen */}
            <div
              style={{
                background: '#0d0d0d',
                minHeight: '400px',
                borderRadius: '4px 4px 0 0',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* SVG stripes + left-fade overlay */}
              <svg
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
                viewBox="0 0 580 260"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="sg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="38%" stopColor="#8b0000" />
                    <stop offset="100%" stopColor="#3d0000" />
                  </linearGradient>
                  <linearGradient id="sg2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="38%" stopColor="#8b0000" />
                    <stop offset="100%" stopColor="#3d0000" />
                  </linearGradient>
                  <linearGradient id="sg3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="38%" stopColor="#8b0000" />
                    <stop offset="100%" stopColor="#3d0000" />
                  </linearGradient>
                  <linearGradient id="leftfade" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"   stopColor="#0d0d0d" stopOpacity="1" />
                    <stop offset="55%"  stopColor="#0d0d0d" stopOpacity="1" />
                    <stop offset="78%"  stopColor="#0d0d0d" stopOpacity="0" />
                    <stop offset="100%" stopColor="#0d0d0d" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points="420,0 448,0 418,260 390,260" fill="url(#sg1)" opacity="0.9" />
                <polygon points="468,0 494,0 464,260 438,260" fill="url(#sg2)" opacity="0.75" />
                <polygon points="512,0 536,0 506,260 482,260" fill="url(#sg3)" opacity="0.6" />
                <rect x="0" y="0" width="580" height="260" fill="url(#leftfade)" />
              </svg>

              {/* Glow blob — top right */}
              <div
                style={{
                  position: 'absolute',
                  top: '-60px',
                  right: '-60px',
                  width: '320px',
                  height: '320px',
                  background: 'radial-gradient(ellipse, rgba(180,25,25,0.55) 0%, rgba(110,10,10,0.28) 45%, transparent 70%)',
                  borderRadius: '50%',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />

              {/* Glow blob — bottom right */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '30px',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(ellipse, rgba(160,20,20,0.45) 0%, transparent 68%)',
                  borderRadius: '50%',
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />

              {/* Screen top bar */}
              <div
                style={{
                  padding: '9px 14px 9px 36px',
                  borderBottom: '1px solid #1a1a1a',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    color: '#3a3a3a',
                    fontSize: '13px',
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  stance — incoming message
                </span>
              </div>

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 2, padding: '16px 16px 20px 36px', maxWidth: '55%' }}>
                  <div
                    style={{
                      color: '#3d3d3d',
                      fontSize: '11px',
                      letterSpacing: '1.6px',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      marginBottom: '14px',
                    }}
                  >
                    Incoming Email
                  </div>
                  <p
                    style={{
                      color: '#d8d8d8',
                      fontSize: '17px',
                      lineHeight: 1.6,
                      margin: '0 0 20px 0',
                      minHeight: '56px',
                    }}
                  >
                    {displayedText}
                    <span
                      style={{
                        display: 'inline-block',
                        width: '2px',
                        height: '17px',
                        background: '#e03030',
                        marginLeft: '1px',
                        verticalAlign: 'middle',
                        opacity: cursorVisible ? 1 : 0,
                        transition: 'opacity 0.05s',
                      }}
                    />
                  </p>
                  {/* Pill */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#0d0d0d',
                      border: '1px solid #242424',
                      borderRadius: '20px',
                      padding: '7px 16px',
                    }}
                  >
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#e03030',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: '#777', fontSize: '14px', whiteSpace: 'nowrap' }}>
                      {SCENARIOS[scenarioIndex].question}
                    </span>
                  </div>

                  {/* In-screen CTA */}
                  <div style={{ marginTop: '10px' }}>
                  <button
                    onClick={() => navigate('/app')}
                    onMouseEnter={() => setScreenCtaHover(true)}
                    onMouseLeave={() => setScreenCtaHover(false)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: '#0d0d0d',
                      border: '1px solid #242424',
                      borderRadius: '20px',
                      padding: '7px 16px',
                      color: '#fff',
                      fontSize: '14px',
                      cursor: 'pointer',
                      boxShadow: screenCtaHover ? '0 0 18px rgba(180,20,20,0.6)' : 'none',
                      transition: 'box-shadow 0.18s ease',
                    }}
                  >
                    Try it free →
                  </button>
                  </div>
              </div>
            </div>
          </div>

          {/* Hinge strip */}
          <div
            style={{
              height: '8px',
              background: '#1c1c1c',
              borderLeft: '1.5px solid #272727',
              borderRight: '1.5px solid #272727',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '2px',
                background: '#e03030',
                borderRadius: '1px',
                opacity: 0.75,
              }}
            />
          </div>

          {/* Base */}
          <div
            style={{
              background: '#111',
              border: '1.5px solid #272727',
              borderTop: 'none',
              borderRadius: '0 0 8px 8px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '10px',
                background: '#1c1c1c',
                borderRadius: '4px',
              }}
            />
          </div>
        </div>

        {/* Bottom text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '0px',
            gap: '4px',
          }}
        >
          <p style={{ color: '#555', fontSize: '12px', margin: 0, textAlign: 'center', whiteSpace: 'nowrap' }}>
            Tell Stance the situation. Get 3 confident replies in seconds.
          </p>
          <p style={{ color: '#666', fontSize: '13px', margin: 0, textAlign: 'center', fontWeight: 600 }}>
            Free · Private · No account needed
          </p>
        </div>
      </div>
    </div>
  );
}
