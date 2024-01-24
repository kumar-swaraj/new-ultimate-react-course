import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

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
  return (
    <ul className="skill-list">
      <Skill skill="HTML+CSS" emoji="💪" bgColor="#3c40c6" />
      <Skill skill="JavaScript" emoji="💪" bgColor="#ffc048" />
      <Skill skill="Web Design" emoji="💪" bgColor="#0be881" />
      <Skill skill="Git and Github" emoji="👍" bgColor="#ff5e57" />
      <Skill skill="React" emoji="💪" bgColor="#4bcffa" />
      <Skill skill="Svelt" emoji="👶" bgColor="#ff3f34" />
    </ul>
  );
}

function Skill(props) {
  return (
    <li className="skill" style={{ backgroundColor: props.bgColor }}>
      {props.skill} <span>{props.emoji}</span>
    </li>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
