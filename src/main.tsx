import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrochureApp} from './brochure/app/BrochureApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrochureApp />
  </StrictMode>,
)
