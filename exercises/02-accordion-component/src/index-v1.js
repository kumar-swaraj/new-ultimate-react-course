import React, { useState } from 'react';
import ReactDom from 'react-dom/client';
import './styles.css';

const faqs = [
  {
    title: 'Where are these chairs assembled?',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
  },
  {
    title: 'How long do I have to return my chair?',
    text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
  },
  {
    title: 'Do you ship to countries outside the EU?',
    text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
  },
];

function App() {
  return <Accordion data={faqs} />;
}

function Accordion({ data }) {
  return (
    <div className="accordion">
      {data.map((faq, i) => (
        <AccordionItem
          key={faq.title}
          num={(i + 1).toString().padStart(2, 0)}
          question={faq.title}
          answer={faq.text}
        />
      ))}
    </div>
  );
}

function AccordionItem({ num, question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`item ${isOpen ? 'open' : ''}`}
      onClick={() => setIsOpen((open) => !open)}
    >
      <p className="number">{num}</p>
      <p className="title">{question}</p>
      <p className="icon">{isOpen ? '-' : '+'}</p>
      {isOpen && <div className="content-box">{answer}</div>}
    </div>
  );
}

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
