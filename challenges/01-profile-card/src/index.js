import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const skills = [
  {
    skill: 'HTML+CSS',
    level: 'advanced',
    color: '#2662EA',
  },
  {
    skill: 'JavaScript',
    level: 'advanced',
    color: '#EFD81D',
  },
  {
    skill: 'Web Design',
    level: 'advanced',
    color: '#C3DCAF',
  },
  {
    skill: 'Git and GitHub',
    level: 'intermediate',
    color: '#E84F33',
  },
  {
    skill: 'React',
    level: 'advanced',
    color: '#60DAFB',
  },
  {
    skill: 'Svelte',
    level: 'beginner',
    color: '#FF3B00',
  },
];

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <img className="avatar" src="./imgs/jonas.jpeg" alt="Jonas Schmedtmann" />
  );
}

function Intro() {
  return (
    <div>
      <h1>Jonas Schmedtmann</h1>
      <p style={{ fontWeight: '500' }}>
        Full-stack web developer and teacher at Udemy. When not coding or
        preparing a course, I like to play board games, to cook (and eat), or to
        just enjoy the Portugese sun at the beach.
      </p>
    </div>
  );
}

function SkillList() {
  const skillsArr = skills;

  return (
    <ul className="skill-list">
      {skillsArr.map((skill) => (
        <Skill
          key={skill.skill}
          skill={skill.skill}
          emoji={
            skill.level === 'advanced'
              ? '💪'
              : skill.level === 'intermediate'
              ? '👍'
              : '👶'
          }
          bgColor={skill.color}
        />
      ))}
    </ul>
  );
}

function Skill({ skill, emoji, bgColor }) {
  return (
    <li className="skill" style={{ backgroundColor: bgColor }}>
      {skill} <span>{emoji}</span>
    </li>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
