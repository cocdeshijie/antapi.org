import React from 'react'
import {DocsThemeConfig} from 'nextra-theme-docs'
import {useRouter} from "next/router";
import icon from 'public/logo.png';
import Image from "next/image";


const config: DocsThemeConfig = {
    head: (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta property="og:url" content="https://antapi.org"/>
            <meta property="og:title" content="antapi.org"/>
            <meta property="og:description" content="by cocdeshijie"/>
            <meta property="og:image" content="https://img.qwq.xyz/2023/5028b9b4c3c41.png"/>
            <link rel="icon" type="image/x-icon" href="https://img.qwq.xyz/2023/e5a6d970baaf6.ico"/>
        </>
    ),
    faviconGlyph: '🐜',
    logo: (
        <>
            <Image src={icon} alt={'antapi.org'} width={64} height={64}/>
            <span>antapi.org</span>
        </>
    ),
    project: {
        link: 'https://github.com/cocdeshijie/antapi.org',
    },
    docsRepositoryBase: 'https://github.com/cocdeshijie/antapi.org/tree/main',
    useNextSeoProps() {
        const {asPath} = useRouter()
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
