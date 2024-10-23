
import React from 'react'

import { ExtensionProvider40 } from '@looker/extension-sdk-react'

import Header from './Header'

export const App = () => (
  <ExtensionProvider40>
      <Header />
  </ExtensionProvider40>
)
