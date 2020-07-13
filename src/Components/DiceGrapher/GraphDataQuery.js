export const queryGraphData = async (endPoint) => {
    console.log(endPoint);
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/https://example.com';
    endPoint = proxyUrl + endPoint;
    try{
        const response = await fetch(endPoint, {mode: 'cors'});
        if(response.ok) {
            let jsonResponse = await response.json();
             console.log(jsonResponse);
        }
    }
    catch(error) {
        console.log(error);
    }
}

