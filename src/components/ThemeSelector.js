import React from 'react'
import './ThemeSelector.css'
import { useThemeContext } from '../hooks/useThemeContext'

export default function ThemeSelector() {
    const { setColor } = useThemeContext()
    const themeColors = ['#58249c', '#249c6b', '#b70233']

    return (
        <div className="theme-selector">
            <div className="theme-buttons">
                {themeColors.map(color => (
                    <div 
                    key={color} 
                    style={{ background: color }} 
                    onClick={()=>{setColor(color)}}
                    />
                ))}
            </div>
        </div>
    )
}
