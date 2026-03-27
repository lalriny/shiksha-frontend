import { useEffect, useState } from 'react';
import '../css/Courses.css';
import SubjectList from './SubjectList';
import ChapterDetail from './ChapterDetail';
import { courseData } from '../data/courseData';

// ── Data ────────────────────────────────────────────────────────────────────

const BOARDS = ['CBSE', 'MBSC', 'State Board', 'Other State Boards'];

const CLASSES = [
  { id: 'class8',          title: 'Class 8',            desc: 'Complete Class 8 academic program.' },
  { id: 'class9',          title: 'Class 9',            desc: 'Complete Class 9 academic program.' },
  { id: 'class10',         title: 'Class 10',           desc: 'Complete Class 10 academic program.' },
  { id: 'class11science',  title: 'Class 11 (Science)', desc: 'Physics, Chemistry, Biology, Maths.' },
  { id: 'class11commerce', title: 'Class 11 (Commerce)', desc: 'Accountancy, Business Studies, Economics.' },
  { id: 'class11arts',     title: 'Class 11 (Arts)',    desc: 'History, Political Science, Geography.' },
  { id: 'class12science',  title: 'Class 12 (Science)', desc: 'Physics, Chemistry, Biology, Maths.' },
  { id: 'class12commerce', title: 'Class 12 (Commerce)', desc: 'Accountancy, Business Studies, Economics.' },
  { id: 'class12arts',     title: 'Class 12 (Arts)',    desc: 'History, Political Science, Geography.' },
];

// ── CourseCard — exported for CoursePreview.jsx ─────────────────────────────
export const CourseCard = ({ course, onArrowClick }) => (
  <div className="course-card" onClick={() => onArrowClick(course)}>
    <div className="course-card-img" />
    <div className="course-card-body">
      <h3 className="course-card-title">{course.title}</h3>
      <p className="course-card-desc">{course.desc}</p>
      <div className="course-card-footer">
        <span className="course-card-price">{course.price}</span>
        <button
          className="course-arrow-btn"
          onClick={(e) => { e.stopPropagation(); onArrowClick(course); }}
        >→</button>
      </div>
    </div>
  </div>
);

// ── courseCards — exported for CoursePreview.jsx ────────────────────────────
export const courseCards = Object.values(courseData);

// ── Reusable Page Card ──────────────────────────────────────────────────────
const PageCard = ({ title, desc, price, onClick }) => (
  <div className="course-card" onClick={onClick}>
    <div className="course-card-img" />
    <div className="course-card-body">
      <h3 className="course-card-title">{title}</h3>
      <p className="course-card-desc">{desc}</p>
      <div className="course-card-footer">
        {price
          ? <span className="course-card-price">{price}</span>
          : <span style={{ flex: 1 }} />
        }
        <button
          className="course-arrow-btn"
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >→</button>
      </div>
    </div>
  </div>
);

// ── Page Header ─────────────────────────────────────────────────────────────
const PageHeader = ({ title, subtitle, onBack }) => (
  <div className="courses-full-header" style={{ position: 'relative' }}>
    {onBack && (
      <button className="board-back-btn" onClick={onBack}>← Back</button>
    )}
    <h1 className="courses-full-title">{title}</h1>
    {subtitle && <p className="courses-full-subtitle">{subtitle}</p>}
  </div>
);

// ── Main Courses Component ──────────────────────────────────────────────────
const Courses = () => {
  const [selectedBoard,  setSelectedBoard]  = useState(null);
  const [selectedClass,  setSelectedClass]  = useState(null);
  const [activeCourse,   setActiveCourse]   = useState(null);
  const [activeTopic,    setActiveTopic]    = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedBoard, selectedClass, activeCourse, activeTopic]);

  const resetAll = () => {
    setSelectedBoard(null);
    setSelectedClass(null);
    setActiveCourse(null);
    setActiveTopic(null);
  };

  // ── Board selected ────────────────────────────────────────────────────────
  const handleBoardSelect = (board) => {
    setSelectedBoard(board);
  };

  // ── Class selected → load subjects directly ───────────────────────────────
  const handleClassSelect = (cls) => {
    setSelectedClass(cls);
    const course = courseData[cls.id];
    if (course) setActiveCourse(course);
  };

  // ── Subject selected ──────────────────────────────────────────────────────
  const handleSubjectSelect = (topic) => {
    setActiveTopic(topic);
  };

  // ── Back from Subject list → back to class page ───────────────────────────
  const handleSubjectBack = () => {
    setActiveCourse(null);
    setActiveTopic(null);
    setSelectedClass(null);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  // Level 4 — Chapter detail
  if (activeTopic) {
    return (
      <ChapterDetail
        topic={activeTopic}
        course={activeCourse}
        onBack={() => setActiveTopic(null)}
      />
    );
  }

  // Level 3 — Subject list
  if (activeCourse) {
    return (
      <SubjectList
        course={activeCourse}
        board={selectedBoard}          
        onSubjectSelect={handleSubjectSelect}
        onBack={handleSubjectBack}
      />
    );
  }

  // Level 2 — Class selection
  if (selectedBoard) {
    return (
      <div className="courses-page">
        <PageHeader
          title={`${selectedBoard} — Select Class`}
          subtitle="Choose your class to view the lesson plan"
          onBack={() => setSelectedBoard(null)}
        />
        <div className="courses-grid-wrap">
          <div className="courses-grid">
            {CLASSES.map((cls) => (
              <PageCard
                key={cls.id}
                title={cls.title}
                desc={cls.desc}
                price="₹1,500"
                onClick={() => handleClassSelect(cls)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Level 1 — Board selection
  return (
    <div className="courses-page">
      <PageHeader
        title="Online Courses"
        subtitle="Select your board to explore courses"
      />
      <div className="courses-grid-wrap">
        <div className="courses-grid">
          {BOARDS.map((board) => (
            <PageCard
              key={board}
              title={board}
              desc={
                board === 'CBSE'         ? 'Central Board of Secondary Education — National curriculum.' :
                board === 'MBSC'         ? 'Madhya Pradesh Board of Secondary Education.' :
                board === 'State Board' ? 'State-specific curriculum and syllabus.' :
                                          'State-specific curriculum and syllabus.'
              }
              onClick={() => handleBoardSelect(board)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
