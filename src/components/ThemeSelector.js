import React from 'react'
import './ThemeSelector.css'

const themeColors = ['#58249c', '#249c6b', '#b70233']

export default function ThemeSelector() {

    return (
        <div className="theme-selector">
            <div className="theme-buttons">
                {themeColors.map(color => (
                    <div key={color} style={{ background: color }} />
                ))}
            </div>
        </div>
    )
}
