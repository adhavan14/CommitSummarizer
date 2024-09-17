import './App.css'
import CommitSummary from "./pages/CommitSummary.jsx";
import {ThemeProvider} from "styled-components";
import {useEffect, useState} from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import {DarkMode} from "@mui/icons-material";

function App() {

    const colorTheme = {
        'light': {
            bgLoader: 'rgba(0, 0, 0, 0.05)',
            loader: 'black',
            fontColor: 'black',
            menuColor: '#e1ecfb',
            cardColor: 'white',
            button: {
                bgColor: '#e1ecfb',
                fontColor: 'black',
                hoverColor: '#94b8e4',
            },
            commits: {
                bgColor: '#e1e0e0',
            },
            component: <LightModeIcon/>,
        },
        'dark': {
            bgLoader: '#424343',
            loader: '#FFFFF0',
            fontColor: '#FFFFF0',
            menuColor: '#4d4e4e',
            cardColor: '#0c0c0c',
            button: {
                bgColor: '#3e3e3e',
                fontColor: '#FFFFF0',
                hoverColor: '#676666',
            },
            commits: {
                bgColor: '#323232',
            },
            component: <DarkMode/>,
        }
    }
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme]);


    const handleThemeChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

  return (
    <>
        <ThemeProvider theme={theme === 'light' ? colorTheme['light'] : colorTheme['dark']}>
            <CommitSummary handleThemeChange={handleThemeChange}></CommitSummary>
        </ThemeProvider>
    </>
  )
}

export default App
