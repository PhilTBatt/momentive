'use client'

import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'

const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default ThemeProviderWrapper
