import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Hero.css';

const Hero = () => {
  const [activeTab, setActiveTab] = useState('Science');

  useEffect(() => {
    const timer = setTimeout(() => {
      const fill = document.getElementById('progFill');
      if (fill) fill.style.width = '68%';
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="shiksha-hero">
        {/* Background */}
        <div className="hero-bg-grid"></div>
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
        <div className="hero-glow-3"></div>

        <div className="hero-inner">

          {/* LEFT */}
          <div className="hero-left">
            <div className="hero-pill">
              <span className="pill-dot"></span>
              <span className="pill-text">CBSE · NCERT · Mizoram Board · Competitive Exams</span>
            </div>

            <p className="hero-tagline">Empowerment Through Education</p>

            <h1 className="hero-h1">
              Learn Smarter.<br />
              <span className="line2">Achieve More.</span>
            </h1>

            <p className="hero-desc">
              A structured academic and competitive learning platform — board-aligned,
              expert-led, and accessible to every learner across India.
            </p>

            <div className="hero-ctas">
              <Link to="/courses" className="cta-primary">
                <i className="fa-solid fa-compass"></i> Explore Programs
              </Link>
              <Link to="/courses" className="cta-secondary">
                <i className="fa-regular fa-eye"></i> Free Guest Access
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <i className="fa-solid fa-shield-halved trust-icon"></i>
                <span className="trust-text">Board-Aligned Curriculum</span>
              </div>
              <div className="trust-item">
                <i className="fa-solid fa-video trust-icon"></i>
                <span className="trust-text">Live + Recorded Classes</span>
              </div>
              <div className="trust-item">
                <i className="fa-solid fa-mobile-screen trust-icon"></i>
                <span className="trust-text">Mobile Learning</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right">
            <div className="chip c1">
              <span className="chip-icon">🎓</span>
              <div className="chip-info">
                <div className="chip-val">12,000+</div>
                <div className="chip-label">Active Learners</div>
              </div>
            </div>

            <div className="hero-card">
              <div className="hc-head">
                <span className="hc-label">My Program</span>
                <div className="hc-live">
                  <div className="hc-live-dot"></div>
                  <span className="hc-live-text">LIVE NOW</span>
                </div>
              </div>

              <div className="prog-tabs">
                {['Science', 'Commerce', 'Arts'].map(tab => (
                  <button
                    key={tab}
                    className={`prog-tab ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="subject-list">
                <div className="subj-row">
                  <div className="subj-icon" style={{ background: 'rgba(62,100,222,.15)' }}>
                    <i className="fa-solid fa-atom" style={{ color: '#60a5fa' }}></i>
                  </div>
                  <span className="subj-name">Physics</span>
                  <span className="subj-status status-live">Live</span>
                </div>
                <div className="subj-row">
                  <div className="subj-icon" style={{ background: 'rgba(16,185,129,.12)' }}>
                    <i className="fa-solid fa-flask" style={{ color: '#34d399' }}></i>
                  </div>
                  <span className="subj-name">Chemistry</span>
                  <span className="subj-status status-rec">Recorded</span>
                </div>
                <div className="subj-row">
                  <div className="subj-icon" style={{ background: 'rgba(245,158,11,.12)' }}>
                    <i className="fa-solid fa-dna" style={{ color: '#fbbf24' }}></i>
                  </div>
                  <span className="subj-name">Biology</span>
                  <span className="subj-status status-rec">Recorded</span>
                </div>
                <div className="subj-row">
                  <div className="subj-icon" style={{ background: 'rgba(139,92,246,.12)' }}>
                    <i className="fa-solid fa-square-root-variable" style={{ color: '#a78bfa' }}></i>
                  </div>
                  <span className="subj-name">Mathematics</span>
                  <span className="subj-status status-soon">Starting Soon</span>
                </div>
              </div>

              <div className="hc-progress-label">
                <span>Overall Progress</span>
                <strong>68% Complete</strong>
              </div>
              <div className="prog-bar">
                <div className="prog-fill" id="progFill"></div>
              </div>

              <div className="hc-footer">
                <div className="hc-stat">
                  <div className="hc-stat-val">94%</div>
                  <div className="hc-stat-label">Success Rate</div>
                </div>
                <div className="hc-stat">
                  <div className="hc-stat-val">Live</div>
                  <div className="hc-stat-label">+ Recorded</div>
                </div>
                <div className="hc-stat">
                  <div className="hc-stat-val">Free</div>
                  <div className="hc-stat-label">Guest Access</div>
                </div>
              </div>
            </div>

            <div className="chip c2">
              <span className="chip-icon">📈</span>
              <div className="chip-info">
                <div className="chip-val">94%</div>
                <div className="chip-label">Success Rate</div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;