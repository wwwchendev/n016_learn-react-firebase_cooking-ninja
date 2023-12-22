import { createContext, useReducer } from "react";

// TODO 使用createContext #context
// & 透過createContext創建的Context提供了Provider和Consumer 
// - Provider 用來提供共享的資料給其內部的子組件
// - Consumer 則用來使用這些資料。
//  在使用useContext之前，訪問 Context 的常規方法是透過 Context.Consumer 來實現。在類別組件中會看到<ThemeContext.Consumer>語法，而使用 useContext 則簡化了這個過程。它讓你直接在函數組件內部透過一個 Hook 來訂閱並獲取 Context 的值，消除了對 Consumer 的需求，讓程式碼更加簡潔和易讀。
export const ThemeContext = createContext()

// TODO 建立useReducer #reducer
// & useState的強化版可以一次管理多個狀態
// 1.建立useReducer(Reducer,{init-state})
// 2.定義useReducer
// 3.定義reducer
// 4.建立改變某項狀態的方法(透過調用dispatch來改變狀態)
// 5.在reducer根據action.type覆寫state
// 6.把狀態和改變狀態的方法都提供給子組件

// 定義reducer
// Reducer函數 可以想像是useState裡面的setter，要改變其一屬性的時候，先展開全數屬性後，再根據要修改的key複寫新的value
const themeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COLOR':
            return { ...state, color: action.payload };
        case 'SET_MODE':
            return { ...state, mode: action.payload };
        default:
            return state;
    }
}

export function ThemeProvider({ children }) {
    // 使用useReducer管理狀態，並定義useReducer #reducer 
    const [state, dispatch] = useReducer(themeReducer, {
        color: "#D26354",
        mode: "light"
    })

    // 建立改變某項狀態的方法(透過調用dispatch來改變狀態)
    const setColor = (color) => {
        dispatch({
            type: 'SET_COLOR',
            payload: color
        })
    }

    const setMode = (mode) => {
        dispatch({
            type: 'SET_MODE',
            payload: mode
        })
    }

    return (
        // 把狀態和改變狀態的方法都提供給子組件
        <ThemeContext.Provider value={{ ...state, setColor,setMode  }}>
            {children}
        </ThemeContext.Provider>
    )
}
