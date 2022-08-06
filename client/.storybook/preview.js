import React from 'react'
import { Provider } from 'react-redux'
import store from '../src/store'
import { createServices } from '../src/services'
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
        createServices()
        return <Provider store={store}>
            <Story />
        </Provider>
    }
]
