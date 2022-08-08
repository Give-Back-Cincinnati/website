import React from 'react'
import { Provider } from 'react-redux'
import store from '../src/store'
import { ServiceSingleton } from '../src/services'
import { ServicesContext } from '../src/contexts/Services'
import '../src/styles/globals.scss'
import * as NextImage from "next/image";

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
}

export const decorators = [
    (Story) => {
        return <ServicesContext.Provider value={ServiceSingleton}>
            <Provider store={store}>
                <Story />
            </Provider>
        </ServicesContext.Provider>
    }
]
