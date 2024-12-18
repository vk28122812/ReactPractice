export async function fetchItems(){
    const response = await fetch("http://localhost:3000/meals");
    if(!response.ok){
        throw new Error("Failed to fetch meals");
    }
    const resData = await response.json();
    console.log(resData);
    return resData;
}

