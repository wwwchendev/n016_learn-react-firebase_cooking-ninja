import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

//- 用自定義hook包裹useContext調用代碼 
export const useThemeContext=()=>{
    const context = useContext(ThemeContext)
    if(context===undefined){
        throw new Error("useThemeContext()必須在ThemeProvider組件內調用")
    }
    return context
}