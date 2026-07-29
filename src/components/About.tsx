import Section from './Section';
import TechTag from './TechTag';
import styles from './About.module.css';
import Credits from './Credits';

const SKILL_GROUPS: { label: string; skills: string[] }[] = [
  { label: 'Languages', skills: ['C', 'C++', 'Python', 'JavaScript', 'TypeScript', 'PostgreSQL']},
  { label: 'Web', skills: ['MongoDB', 'Express', 'React', 'Node.js', 'Next.js', 'Tailwind', 'Bootstrap'] },
  { label: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'CI/CD', 'GitHub Actions'] },
  { label: 'Quality Assurance', skills: ['Jest', 'Cypress', 'Hurl', 'Supertest', 'Jira']},
  { label: 'Game Dev', skills: ['Unity', 'Unreal Engine 5'] },
  { label: 'Mobile', skills: ['Kotlin', 'Android Studio'] },
  { label: 'Data / ML', skills: ['scikit-learn', 'OpenCV', 'pandas', 'TensorFlow', 'Jupyter'] },
];

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="Vlad" description="Software Developer · Toronto, ON">
      <div className={styles.layout}>
        {/* TODO: placeholder bio — edit this to sound like you */}
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
