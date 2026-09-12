import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/portfolio/",
  plugins: [react()],
  optimizeDeps: {
    // react-aws-icons ships CommonJS. Vite's dev server won't pre-bundle these
    // deep paths on its own, so it serves raw CJS the browser can't run.
    include: [
      'react-aws-icons/dist/aws/logo/AWS',
      'react-aws-icons/dist/aws/logo/S3',
      'react-aws-icons/dist/aws/logo/EC2',
      'react-aws-icons/dist/aws/logo/ECS',
      'react-aws-icons/dist/aws/logo/CloudWatch',
      'react-aws-icons/dist/aws/logo/DynamoDB',
    ],
  },
})
