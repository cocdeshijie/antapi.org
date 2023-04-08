import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import {useRouter} from "next/router";

const config: DocsThemeConfig = {
  logo: <span>antapi.org</span>,
  project: {
    link: 'https://github.com/cocdeshijie/antapi.org',
  },
  docsRepositoryBase: 'https://github.com/cocdeshijie/antapi.org/tree/main',
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – antapi.org',
      }
    }
  },
  primaryHue: {
    dark: 25,
    light: 35,
  },
  footer: {
    text: (
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} cocdeshijie.
        </p>
    ),
  }
}

export default config
