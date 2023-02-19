const getUserDirectory =async (uid)=>{
    return await fetch(`https://progressplantedbackend-production.up.railway.app/users/directory?uid=${uid}`).then((res) => res.json())
}
const shareGraph = async(title,uid)=> {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    return await fetch('https://progressplantedbackend-production.up.railway.app/users/share', {
        method: 'POST',
        headers:myHeaders,
        body: JSON.stringify({uid:uid,title:title}),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
const newUser = async(uid)=>{

    const headers=new Headers();
    headers.append("Content-Type", "application/json");

    await fetch('https://progressplantedbackend-production.up.railway.app/users/newuser', {
        method: 'POST',
        headers:headers,
        body: JSON.stringify({uid:uid}),
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

module.exports={newUser,shareGraph,getUserDirectory};