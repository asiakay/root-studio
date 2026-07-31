import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CTA from './components/CTA'

createRoot(document.getElementById('contact-root')!).render(
  <StrictMode>
    <CTA />
  </StrictMode>,
)
