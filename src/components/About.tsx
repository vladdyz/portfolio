import { useEffect, useMemo, useState } from 'react';
import Section from './Section';
import TechTag from './TechTag';
import Credits from './Credits';
import { profile, promptCommand } from '../data/profile';
import styles from './About.module.css';

const SKILL_GROUPS: { label: string; skills: string[] }[] = [
  { label: 'Languages', skills: ['C', 'C++', 'Python', 'JavaScript', 'TypeScript', 'PostgreSQL']},
  { label: 'Web', skills: ['MongoDB', 'Express', 'React', 'Node.js', 'Next.js', 'Tailwind', 'Bootstrap'] },
  { label: 'Cloud & DevOps', skills: ['AWS', 'ECS', 'S3', 'CloudWatch', 'Docker', 'CI/CD', 'GitHub Actions'] },
  { label: 'Quality Assurance', skills: ['Jest', 'Cypress', 'Hurl', 'Supertest', 'Jira']},
  { label: 'Game Dev', skills: ['Unity', 'Unreal Engine 5'] },
  { label: 'Mobile', skills: ['Kotlin', 'Android Studio'] },
  { label: 'Data / ML', skills: ['scikit-learn', 'OpenCV', 'pandas', 'TensorFlow', 'Jupyter'] },
];

// Prints the about section to the console on screen as if it were being typed out
type Token = { text: string; cls?: string };
type Line = Token[];

const CHARS_PER_TICK = 4; // tune this alongside TICK_MS to change typing speed
const TICK_MS = 16;

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}


function buildLines(): Line[] {
  const s = styles;

  const str = (name: string, value: string, last = false): Line => [
    { text: '  ' },
    { text: name, cls: s.key },
    { text: ': ', cls: s.punc },
    { text: `"${value}"`, cls: s.str },
    ...(last ? [] : [{ text: ',', cls: s.punc }]),
  ];

  const arr = (name: string, values: string[], last = false): Line => [
    { text: '  ' },
    { text: name, cls: s.key },
    { text: ': [', cls: s.punc },
    ...values.flatMap((v, i) => [
      { text: `"${v}"`, cls: s.str },
      ...(i < values.length - 1 ? [{ text: ', ', cls: s.punc }] : []),
    ]),
    { text: ']', cls: s.punc },
    ...(last ? [] : [{ text: ',', cls: s.punc }]),
  ];

  return [
    [
      { text: '$ ', cls: s.prompt },
      { text: promptCommand, cls: s.cmd },
    ],
    [],
    [
      { text: 'const ', cls: s.kw },
      { text: 'vlad', cls: s.varName },
      { text: ' = {', cls: s.punc },
    ],
    str('name', profile.name),
    str('location', profile.location),
    arr('seeking', profile.seeking),
    str('experience', profile.experience),
    str('education', profile.education),
    arr('achievements', profile.achievements),
    arr('focus', profile.focus),
    arr('interests', profile.interests),
    arr('languages', profile.languages, true),
    [{ text: '};', cls: s.punc }],
  ];
}

export default function About() {
  const lines = useMemo(() => buildLines(), []);
  const lineLengths = useMemo(
    () => lines.map((line) => line.reduce((sum, t) => sum + t.text.length, 0)),
    [lines]
  );
  const totalChars = useMemo(() => lineLengths.reduce((a, b) => a + b, 0), [lineLengths]);

  // Full text for assistive tech, and the fallback when motion is reduced.
  const plainText = useMemo(
    () => lines.map((line) => line.map((t) => t.text).join('')).join('\n'),
    [lines]
  );

  const [revealed, setRevealed] = useState(() => (prefersReducedMotion() ? totalChars : 0));

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const id = window.setInterval(() => {
      setRevealed((n) => {
        if (n >= totalChars) {
          window.clearInterval(id);
          return n;
        }
        return n + CHARS_PER_TICK;
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [totalChars]);


  // How many characters of each line are currently visible.
  const takes: number[] = [];
  let remaining = revealed;
  for (const len of lineLengths) {
    const take = Math.max(0, Math.min(len, remaining));
    takes.push(take);
    remaining -= take;
  }
  const cursorLine = takes.findIndex((take, i) => take < lineLengths[i]);
  const done = cursorLine === -1;

  return (
    <Section id="about" eyebrow="About" title={profile.name} description="Software Developer — Toronto, ON">
      <div className={styles.layout}>
        <div className={styles.terminal}>
          <div className={styles.chrome}>
            <span className={styles.dot} data-tone="red" />
            <span className={styles.dot} data-tone="amber" />
            <span className={styles.dot} data-tone="green" />
            <span className={styles.chromeTitle}>vlad@portfolio — zsh</span>
          </div>

          <div className={styles.body}>
            {/* The animated copy is decorative; the sr-only block below carries
                the same content in one pass for screen readers. */}
            <div aria-hidden="true">
              {lines.map((line, li) => {
                let budget = takes[li];
                return (
                  <div key={li} className={styles.line}>
                    {line.map((tok, ti) => {
                      if (budget <= 0) return null;
                      const slice = tok.text.slice(0, budget);
                      budget -= slice.length;
                      return (
                        <span key={ti} className={tok.cls}>
                          {slice}
                        </span>
                      );
                    })}
                    {li === cursorLine && <span className={styles.caret} />}
                  </div>
                );
              })}

              {done && (
                <div className={styles.line}>
                  <span className={styles.prompt}>$ </span>
                  <span className={styles.caret} />
                </div>
              )}
            </div>

            <pre className={styles.srOnly}>{plainText}</pre>
          </div>
        </div>

        <div className={styles.skills}>
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className={styles.skillGroup}>
              <h3 className={styles.skillLabel}>{group.label}</h3>
              <ul className={styles.skillTags}>
                {group.skills.map((skill) => (
                  <TechTag key={skill} name={skill} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Credits />
    </Section>
  );
}




// Old version
/*
export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Vlad" description="Software Developer · Toronto, ON">
      <div className={styles.layout}>
        <p className={styles.bio}>
          Hi and thanks for checking out my page! <span aria-hidden="true">👋</span> <br /><br />

          I'm a recent Computer Programming and Analysis graduate from Seneca Polytechnic (4.0 GPA, High Honours 	<span aria-hidden="true">🎓</span>) 
          with an 8-month Software Developer internship at the Department of National Defence (Digital Product 
          Delivery Center). I enjoy building things end-to-end, from REST APIs and test suites through to the 
          deployment pipelines that ship them. I'm also interested in automation, AI integration, Machine Learning, and coding some 
          personal game design projects. I&apos;m currently looking for Junior Software Developer, WebDev, QA/SDET, 
          or DevOps/Automation roles in Toronto or remote across Canada. <br /><br />

          Some other things about me:<br /><br />

          <span aria-hidden="true">🏋️</span> I'm into fitness <br />
          <span aria-hidden="true">📖</span> I'm an avid reader<br />
          <span aria-hidden="true">🏛️</span> Likes learning about other cultures, completed university / professional courses on Greco-Roman, 
          Ancient Egyptian, and Mesopotamian history.<br />
          <span aria-hidden="true">🦖</span> I once aspired to be a paleontologist <br />
          <span aria-hidden="true">🎮</span> Enjoy modding and designing video games <br />  
          <span aria-hidden="true">🗣️</span> I can speak English, Russian, and some French
        </p>

        <div className={styles.skills}>
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className={styles.skillGroup}>
              <h3 className={styles.skillLabel}>{group.label}</h3>
              <ul className={styles.skillTags}>
                {group.skills.map((skill) => (
                  <TechTag key={skill} name={skill} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Credits />
    </Section>
  );
}
*/