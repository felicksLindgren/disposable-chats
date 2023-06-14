
enum Theme {
    light = 'light',
    dark = 'dark'
}

type Themes = {
    [key in Theme]: {
        background: string,
        text: string,
        container: string,
        border: string,
        textMuted: string
    }
}

export const themes: Themes = {
    light: {
        background: '#fff',
        text: '#202124',
        container: '#f1f3f4',
        border: '#cbcdd1',
        textMuted: '#696a6c'
    },
    dark: {
        background: '#202124',
        text: '#fff',
        container: '#292a2d',
        border: '#4a4c50',
        textMuted: '#909192'
    }
}