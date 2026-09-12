declare module 'react-aws-icons/dist/aws/logo/*' {
  import type { ComponentType } from 'react';
  // The package accepts size as string OR number (propTypes: oneOfType).
  const Icon: ComponentType<{ size?: number | string; className?: string }>;
  export default Icon;
}