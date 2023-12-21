import { useState, useEffect } from "react"

export const useFetch = (url, method = "GET") => {
    const [data, setData] = useState(null) //返回請求結果資料
    const [options, setOptions] = useState(null) //fetch是否含額外資訊
    const [isPending, setIsPending] = useState(false) //資料處理狀態
    const [error, setError] = useState(null) //錯誤處理

    // 準備進行POST請求所需的選項。接收postData參數並處理成打算發送到伺服器的資料 (options狀態的一部分)。
    const postData = (postData) => {
        setOptions({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
    }

    // 定義useFetch
    useEffect(() => {
        // AbortController是瀏覽器提供用於取消網路請求的原生方法，通常與 fetch請求方法一起使用。
        const controller = new AbortController()
        // 進行網路請求
        const fetchData = async (fetchOptions) => {            
            setIsPending(true) //資料處理中
            try {
                // fetch("apiurl", {options})
                const response = await fetch(url, { ...fetchOptions, signal: controller.signal })
                if (!response.ok) { throw new Error(response.statusText) }
                const data = await response.json()
                setIsPending(false)
                setData(data)
                setError(null)
            } catch (err) {
                if (err.name === "AbortError") {
                    // 使用 AbortController 中止一個請求時，AbortError 被觸發時，表示該請求已經被中止。此時元件可能已被清除，而使用 setIsPending(false) 可能會觸發 React 的錯誤（在已卸載的元件上更新狀態）。因此在 AbortError 情況下不用再次更新狀態。
                    console.log("Fetch請求已中止")
                } else {
                    setIsPending(false)
                    setError('獲取資料時發生錯誤')
                }
            }
        }
        // 調用函數
        if (method === "GET") { fetchData() }
        if (method === "POST" && options) { fetchData(options) }
        // 在需要時，呼叫 controller.abort() 以取消請求
        return () => { controller.abort() }
    }, [url, method, options])

    return { data, isPending, error, postData }
}