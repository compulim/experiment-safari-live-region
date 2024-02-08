import { Fragment, memo, useEffect, useRef, useState } from 'react';

export default memo(function App() {
  const preRef = useRef<HTMLPreElement | null>(null);
  const sectionRef = useRef<HTMLSelectElement | null>(null);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => setLines(lines => [...lines, 'First line, a quick brown fox jumped over the lazy dogs.']), 5_000);
    setTimeout(() => setLines(lines => [...lines, 'Second line, a quick brown fox jumped over the lazy dogs.']), 6_000);
    setTimeout(() => setLines(lines => [...lines, 'Third line, a quick brown fox jumped over the lazy dogs.']), 7_000);
  }, [setLines]);

  useEffect(() => {
    setInterval(() => {
      const { current: pre } = preRef;
      const { current: section } = sectionRef;

      if (pre && section) {
        pre.textContent = section.outerHTML;
      }
    }, 300);
  }, [preRef, sectionRef]);

  return (
    <Fragment>
      <h1>Experiment</h1>
      <section aria-live="polite" ref={sectionRef}>
        {lines.map(line => (
          <p>{line}</p>
        ))}
      </section>
      <h2>outerHTML</h2>
      <pre aria-hidden={true} ref={preRef} />
    </Fragment>
  );
});
