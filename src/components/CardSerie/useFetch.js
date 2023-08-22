import { useEffect, useState } from "react"

function useFetch(url){

    const [data, setData] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setData(data)
            setLoading(false)
        });
    }, [url])

    return {data, loading}
}

export default useFetch