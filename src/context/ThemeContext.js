import { createContext } from "react";

//-> 透過 createContext 創建的 Context 提供了一個 Provider 和一個 Consumer。 
//- Provider 用來提供共享的資料給其內部的子組件
//- Consumer 則用來使用這些資料。
// 在使用useContext之前，訪問 Context 的常規方法是透過 Context.Consumer 來實現。在類別組件中會看到<ThemeContext.Consumer>語法，而使用 useContext 則簡化了這個過程。它讓你直接在函數組件內部透過一個 Hook 來訂閱並獲取 Context 的值，消除了對 Consumer 的需求，讓程式碼更加簡潔和易讀。
export const ThemeContext = createContext()

export function ThemeProvider({children}){
    return (
        <ThemeContext.Provider value={{color:'blue'}}>
            {children }
        </ThemeContext.Provider>
    )
}
