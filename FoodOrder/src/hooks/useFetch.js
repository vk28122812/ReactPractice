import { useState, useEffect } from "react";

export function useFetch(fetchFn, initialValue){

    const [error,setError] = useState();
    const [fetchedData, setFetchedData] = useState(initialValue);

    useEffect( () => {
        async function fetchData() {
            try{
                const meals = await fetchFn();
                setFetchedData(meals);
            }catch(error){
                setError({message: error.message || "Failed to fetch data"});
            }
        }
        fetchData();
    }, [fetchFn]);

    return {
        error,
        fetchedData, 
        setFetchedData
    }
}