import '../css/HowItWorks.css';

const steps = [
  {
    icon: 'fa-solid fa-compass',
    num: 1,
    title: 'Explore Programs',
    desc: 'Browse our curated academic and competitive programs. Preview content with Guest Mode — no signup required.',
    tags: ['Free Preview', 'No Account'],
  },
  {
    icon: 'fa-solid fa-rocket',
    num: 2,
    title: 'Quick Enrollment',
    desc: 'Select your program, complete enrollment in under 3 minutes, and unlock your personalized dashboard instantly.',
    tags: ['3 Min Setup', 'Instant Access'],
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    num: 3,
    title: 'Learn with Experts',
    desc: 'Engage with live sessions, on-demand lectures, interactive assessments, and 1-on-1 mentorship support.',
    tags: ['Live Classes', 'Mentorship'],
  },
  {
    icon: 'fa-solid fa-trophy',
    num: 4,
    title: 'Achieve Goals',
    desc: 'Ace your board exams or crack competitive entrances with structured prep and real-time progress tracking.',
    tags: ['Track Progress', 'Results'],
  },
];

const HowItWorks = () => {
  return (
    <section className="hw-section">
      <div className="hw-inner">

        {/* Header */}
        <div className="hw-header">
          <div className="hw-badge">
            <span className="hw-badge-dot"></span>
            <span className="hw-badge-text">How It Works</span>
          </div>
          <h2 className="hw-title">
            Start learning in <span>4 simple steps</span>
          </h2>
          <p className="hw-subtitle">
            A streamlined journey designed to take you from curious learner to confident achiever.
          </p>
        </div>

        {/* Steps */}
        <div className="hw-steps">
          <div className="hw-progress-line">
            <div className="hw-progress-fill"></div>
          </div>

          {steps.map((step) => (
            <div className="hw-card" key={step.num}>
              <div className="hw-indicator">
                <div className="hw-indicator-ring"></div>
                <div className="hw-indicator-inner">
                  <i className={`${step.icon} hw-indicator-icon`}></i>
                </div>
                <span className="hw-indicator-num">{step.num}</span>
              </div>
              <div className="hw-card-content">
                <h3 className="hw-card-title">{step.title}</h3>
                <p className="hw-card-desc">{step.desc}</p>
                <div className="hw-tags">
                  {step.tags.map((tag) => (
                    <span className="hw-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;