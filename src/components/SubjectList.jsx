import '../css/SubjectList.css';

const SubjectList = ({ course, board, onSubjectSelect, onBack }) => {
  if (!course || !course.topics) return null;

  return (
    <div className="courses-page">
      <div className="courses-full-header" style={{ position: 'relative' }}>
        <button className="board-back-btn" onClick={onBack}>← Back</button>

        {/* Shows "Class 9 (CBSE)" or "Class 11 (Arts) (MBSC)" etc. */}
        <h1 className="courses-full-title">
          {course.title}{board ? ` (${board})` : ''}
        </h1>

        <p className="courses-full-subtitle">
          Select a subject to view the chapter-wise lesson plan
        </p>
      </div>

      <div className="subject-list-wrap">
        {course.topics.map((topic, index) => (
          <div
            key={index}
            className="subject-list-card"
            onClick={() => onSubjectSelect(topic)}
          >
            <div className="subject-list-info">
              <h3 className="subject-list-name">{topic.title}</h3>
              <p className="subject-list-desc">
                Textbook: {topic.textbook} &nbsp;·&nbsp; {topic.chapters.length} chapters
              </p>
            </div>
            <button
              className="subject-list-arrow"
              onClick={(e) => { e.stopPropagation(); onSubjectSelect(topic); }}
            >
              →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
