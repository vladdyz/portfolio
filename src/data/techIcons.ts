import React from 'react';
import type { IconType, IconBaseProps } from 'react-icons';
import {
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiReact,
  SiDocker,
  SiGithubactions,
  SiJest,
  SiUnity,
  SiC,
  SiOpengl,
  SiKotlin,
  SiAndroidstudio,
  SiScikitlearn,
  SiOpencv,
  SiPandas,
  SiPostgresql,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiPython,
  SiTailwindcss,
  SiBootstrap,
  SiCypress,
  SiJira,
  SiUnrealengine,
  SiTensorflow,
  SiNextdotjs,
  SiJupyter,
  SiDaisyui,
  SiJsonwebtokens,
  SiCloudinary,
  SiGooglegemini,
  SiGithub,
  SiBrevo,
  SiSharp,
  SiNumpy,
  SiKeras,
  SiCondaforge,
  SiApachemaven,
  SiHibernate,
  SiSqlite,
  SiMaterialdesign,
  SiAndroid,
  SiGradle
} from 'react-icons/si';

import { VscGear, VscTerminal, VscBeaker, VscGitBranchCompact, VscDatabase, VscListSelection} from 'react-icons/vsc';

import AWSIconComponent from 'react-aws-icons/dist/aws/logo/AWS';
import CloudWatchIconComponent from 'react-aws-icons/dist/aws/logo/CloudWatch';
import DynamoDBIconComponent from 'react-aws-icons/dist/aws/logo/DynamoDB';
import S3IconComponent from 'react-aws-icons/dist/aws/logo/S3';
import ECRIconComponent from 'react-aws-icons/dist/aws/logo/EC2'; 
import ECSIconComponent from 'react-aws-icons/dist/aws/logo/ECS';
import CognitoComponent from 'react-aws-icons/dist/aws/logo/Cognito'

// Java does not have a simple icon due to trademark
import { DiJava } from "react-icons/di";

import {FaLock, FaTerminal, FaWindowMaximize, FaSyringe, FaGhost, FaImage} from "react-icons/fa";

import { HiH2 } from "react-icons/hi2"; 


type AwsIconComponent = React.ComponentType<{ size?: number | string; className?: string }>;

// react-aws-icons is CommonJS, and dev vs. build disagree on interop:
// Vite's dev pre-bundle hands back the module object ({ default: Component }),
// while the production build already unwraps it to the component itself.
const unwrapDefault = (mod: unknown): AwsIconComponent => {
  if (typeof mod === 'function') return mod as AwsIconComponent;
  return (mod as { default: AwsIconComponent }).default;
};

const makeAwsIcon = (mod: unknown): IconType => {
  const Component = unwrapDefault(mod);
  const WrappedIcon: IconType = (props: IconBaseProps) =>
     // Overriding size safely without upsetting ESLint (which does not like the 'any' keyword)
    React.createElement(Component, { ...props, size: '1em' });
  return WrappedIcon;
};


const AWSIcon = makeAwsIcon(AWSIconComponent);
const S3Icon = makeAwsIcon(S3IconComponent);
const ECRIcon = makeAwsIcon(ECRIconComponent);
const ECSIcon = makeAwsIcon(ECSIconComponent);
const CloudWatchIcon = makeAwsIcon(CloudWatchIconComponent);
const DynamoDBIcon = makeAwsIcon(DynamoDBIconComponent);
const CognitoIcon = makeAwsIcon(CognitoComponent)

// Keyed by the exact string used in `projects.ts` / `About.tsx`. Add an
// entry here any time you add a tag that has a real brand icon — anything
// missing just renders as a plain text pill, which is a fine fallback.
export const TECH_ICONS: Record<string, IconType> = {
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  Mongoose: SiMongoose,
  React: SiReact,
  Docker: SiDocker,
  'GitHub Actions': SiGithubactions,
  Jest: SiJest,
  Unity: SiUnity,
  C: SiC,
  'C++' :SiCplusplus,
  Python: SiPython,
  Tailwind: SiTailwindcss,
  Bootstrap: SiBootstrap,
  OpenGL: SiOpengl,
  Kotlin: SiKotlin,
  'Android Studio': SiAndroidstudio,
  'scikit-learn': SiScikitlearn,
  OpenCV: SiOpencv,
  pandas: SiPandas,
  PostgreSQL: SiPostgresql,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Cypress: SiCypress,
  Jira: SiJira,
  PostGreSQL: SiPostgresql,
  'Unreal Engine 5': SiUnrealengine,
  TensorFlow: SiTensorflow,
  'Next.js': SiNextdotjs,
  Jupyter: SiJupyter,
  DaisyUI: SiDaisyui,
  JWT: SiJsonwebtokens,
  //S3: SiBitbucket
  'CI/CD': VscGear,
  Hurl: VscTerminal,
  Supertest: VscBeaker,
  Cloudinary: SiCloudinary,
  'Google Gemini API': SiGooglegemini,
  'GitHub API': SiGithub,
  Brevo: SiBrevo,
  'C#': SiSharp,
  'Procedural Generation': VscGitBranchCompact,
  NumPy: SiNumpy,
  Keras: SiKeras,
  Conda: SiCondaforge,
  Maven: SiApachemaven,
  Hibernate: SiHibernate,
  Java: DiJava,
  BCrypt: FaLock,
  SLF4J: FaTerminal,
  JavaFX: FaWindowMaximize,
  Guice: FaSyringe,
  H2: HiH2,
  Jotai: FaGhost,
  Android: SiAndroid,
  Room: VscDatabase,
  SQLite: SiSqlite,
  RecyclerView: VscListSelection,
  Coil: FaImage,
  'Material Design 3': SiMaterialdesign,
  Gradle: SiGradle,



  AWS: AWSIcon,
  S3: S3Icon,
  ECR: ECRIcon,
  ECS: ECSIcon,
  CloudWatch: CloudWatchIcon,
  DynamoDB: DynamoDBIcon,
  Cognito: CognitoIcon

};
