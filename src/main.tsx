/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

//* Configure axe-core to check for accesibility issues.
if (import.meta.env.DEV) {
  const axe = await import('@axe-core/react')
  axe.default(React, ReactDOM, 1000)
}

createRoot(document.getElementById('root')!).render(

  <App />
)
