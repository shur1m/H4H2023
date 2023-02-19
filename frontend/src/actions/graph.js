const getDirectory =async ()=>{
    return await fetch('https://progressplantedbackend-production.up.railway.app/graphs/directory').then((res) => res.json())
}
const getGraph=async (title) =>{
    return await fetch('https://progressplantedbackend-production.up.railway.app/graphs/graph?' + new URLSearchParams({
        title: title,
    }))
        .then(res=>res.json())
}

module.exports={getDirectory,getGraph};