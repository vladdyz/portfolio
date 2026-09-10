import Section from './Section';
import TechTag from './TechTag';
import Credits from './Credits';
import { profile, promptCommand } from '../data/profile';
import styles from './About.module.css';

const SKILL_GROUPS: { label: string; skills: string[] }[] = [
  { label: 'Languages', skills: ['C', 'C++', 'Python', 'JavaScript', 'TypeScript', 'PostgreSQL']},
  { label: 'Web', skills: ['MongoDB', 'Express', 'React', 'Node.js', 'Next.js', 'Tailwind', 'Bootstrap'] },
  { label: 'Cloud & DevOps', skills: ['AWS', 'ECS', 'S3', 'Cloudwatch', 'Docker', 'CI/CD', 'GitHub Actions'] },
  { label: 'Quality Assurance', skills: ['Jest', 'Cypress', 'Hurl', 'Supertest', 'Jira']},
  { label: 'Game Dev', skills: ['Unity', 'Unreal Engine 5'] },
  { label: 'Mobile', skills: ['Kotlin', 'Android Studio'] },
  { label: 'Data / ML', skills: ['scikit-learn', 'OpenCV', 'pandas', 'TensorFlow', 'Jupyter'] },
];

function StringLine({ name, value, last }: { name: string; value: string; last?: boolean }) {
  return (
    <div className={styles.line}>
      <span className={styles.indent} />
      <span className={styles.key}>{name}</span>
      <span className={styles.punc}>: </span>
      <span className={styles.str}>&quot;{value}&quot;</span>
      {!last && <span className={styles.punc}>,</span>}
    </div>
  );
}

function ArrayLine({ name, values, last }: { name: string; values: string[]; last?: boolean }) {
  return (
    <div className={styles.line}>
      <span className={styles.indent} />
      <span className={styles.key}>{name}</span>
      <span className={styles.punc}>: [</span>
      {values.map((v, i) => (
        <span key={v}>
          <span className={styles.str}>&quot;{v}&quot;</span>
          {i < values.length - 1 && <span className={styles.punc}>, </span>}
        </span>
      ))}
      <span className={styles.punc}>]</span>
      {!last && <span className={styles.punc}>,</span>}
    </div>
  );
}

export default function About() {
  return (
    <Section id="about" eyebrow="01 / About" title={profile.name} description="Software Developer — Toronto, ON">
      <div className={styles.terminal}>
        <div className={styles.chrome}>
          <span className={styles.dot} data-tone="red" />
          <span className={styles.dot} data-tone="amber" />
          <span className={styles.dot} data-tone="green" />
          <span className={styles.chromeTitle}>vlad@portfolio — zsh</span>
        </div>

        <div className={styles.body}>
          <div className={styles.line}>
            <span className={styles.prompt}>$</span> <span className={styles.cmd}>{promptCommand}</span>
          </div>

          <div className={styles.spacer} />

          <div className={styles.line}>
            <span className={styles.kw}>const</span> <span className={styles.varName}>vlad</span>{' '}
            <span className={styles.punc}>= {'{'}</span>
          </div>

          <StringLine name="name" value={profile.name} />
          <StringLine name="location" value={profile.location} />
          <ArrayLine name="seeking" values={profile.seeking} />
          <StringLine name="experience" value={profile.experience} />
          <StringLine name="education" value={profile.education} />
          <ArrayLine name="achievements" values={profile.achievements} />
          <ArrayLine name="focus" values={profile.focus} />
          <ArrayLine name="interests" values={profile.interests} />
          <ArrayLine name="languages" values={profile.languages} last />

          <div className={styles.line}>
            <span className={styles.punc}>{'};'}</span>
          </div>

          <div className={styles.spacer} />

          <div className={styles.line}>
            <span className={styles.prompt}>$</span> <span className={styles.caret} aria-hidden="true" />
          </div>
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