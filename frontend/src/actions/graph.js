
const getGraph=async (title) =>{
    return await fetch('https://progressplantedbackend-production.up.railway.app/graphs/graph?' + new URLSearchParams({
        title: title,
    }))
        .then(res=>res.json())
}
const saveGraph = async(title,nodes,edges)=> {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    
    return await fetch('https://progressplantedbackend-production.up.railway.app/graphs/update', {
        method: 'POST',
        headers:myHeaders,
        body: JSON.stringify({title:title,nodes:nodes,edges:edges}),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
const newGraph = async(title)=>{

    const headers=new Headers();
    headers.append("Content-Type", "application/json");

    await fetch('https://progressplantedbackend-production.up.railway.app/graphs/newdoc', {
        method: 'POST',
        headers:headers,
        body: JSON.stringify({"title":title}),
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
const getDirectory =async ()=>{
    return await fetch('https://progressplantedbackend-production.up.railway.app/graphs/directory').then((res) => res.json())
  }
const delGraph=async (title) =>{
    return await fetch('https://progressplantedbackend-production.up.railway.app/graphs/delete?' + new URLSearchParams({
        title: title,
    }),{method: 'DELETE'})
        .then(res=>res.text())
        .then (res=>console.log(res));
}
export{getGraph,newGraph,saveGraph,delGraph,getDirectory};