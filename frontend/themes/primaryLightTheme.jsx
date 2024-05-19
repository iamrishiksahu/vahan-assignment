import { createTheme } from "@mui/material";

export const primaryLightTheme = createTheme({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: { variant: 'link' },
                    style: {
                        cursor: 'pointer',
                        color: 'var(--color-primary)'
                    },
                }
            ]
        }
    },

    typography: {
        h1: {
            fontSize: '3rem'
        },
        h2: {
            fontSize: '2.5rem'
        },
        h3: {
            fontSize: '2rem'
        },
        h4: {
            fontSize: '1.5rem'
        },
        h5: {
            fontSize: '1.25rem'
        },
        body2:{
            fontSize: '0.75rem'
        },
        button: {
            textTransform: 'none',
        },
    },


});