import React from 'react'
import './ThemeSelector.css'
import { useThemeContext } from '../hooks/useThemeContext'
import modeIcon from '../assets/mode-icon.svg'

export default function ThemeSelector() {
    const { mode, setColor, setMode } = useThemeContext()
    const themeColors = ['#9D3745', '#D26354', '#EE8C03','#2F4D18']

    const toggleMode = () => {
        setMode(mode === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className="theme-selector">
            <div className="mode-toggle">
                <img
                    onClick={toggleMode}
                    src={modeIcon}
                    style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
                    alt="dark/light toggle icon"
                />
            </div>
            <div className="theme-buttons">
                {themeColors.map(color => (
                    <div
                        key={color}
                        style={{ background: color }}
                        onClick={() => { setColor(color) }}
                    />
                ))}
            </div>
        </div>
    )
}
