import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)

        if (jsonValue != null) {
            // jsonValue es una string. La tengo que parsear para que sea un array de objetos.
            return JSON.parse(jsonValue)
        }
    
        if (typeof initialValue === "function") {
            return (initialValue as () => T)()
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]
}

// nota: T es un tipo generico