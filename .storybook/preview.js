import React from 'react'
import { Provider } from 'react-redux'
import { store, actions } from '../src/store'
import '../src/styles/globals.scss'
import * as NextImage from "next/image";
import { RouterContext } from "next/dist/shared/lib/router-context"
import { ErrorBoundary } from '@/components/Utils/ErrorBoundary'
import { Toaster } from '@/components/DataDisplay/Toaster'

import { createServices } from 'services'
createServices(store, actions)

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => (
    <OriginalNextImage
      {...props}
      unoptimized
    />
  ),
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}

export const decorators = [
    (Story) => {
        return <Provider store={store}>
            <ErrorBoundary>
                <Story />
                <Toaster />
            </ErrorBoundary>
        </Provider>
    }
]
