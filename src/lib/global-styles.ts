import { createGlobalStyle } from 'styled-components';
import { themes } from './colors';

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: ${themes.light.background};
        --text: ${themes.light.text};
        --container: ${themes.light.container};
        --border: ${themes.light.border};
        --text-muted: ${themes.light.textMuted};
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --background: ${themes.dark.background};
            --text: ${themes.dark.text};
            --container: ${themes.dark.container};
            --border: ${themes.dark.border};
            --text-muted: ${themes.dark.textMuted};
        }
    }

    html, body {
        margin: 0;
        padding: 0;
    }

    body {
        background: var(--background);
        color: var(--text);
        font-family: 'Roboto', sans-serif;
        height: 100vh;
    }

    #root {
        height: 100%;
        display: grid;
        grid-template-areas: "aside main";
        grid-template-columns: 1fr 3fr;
    }

    @media screen and (max-width: 768px) {
        #root {
            grid-template-areas: "main" "aside";
            grid-template-columns: 1fr;
            grid-template-rows: 4fr 1fr;

        }
    }
`; 