import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './github.css'

const UserModel = () => {

    const [users,setUsers]= useState([]);
    const [query,setQuery]=useState("");
    const [loading,setLoading]=useState(false);
    const [page,setPage]=useState(1);
    const [modal,setModal]=useState(false);
    const [details,setDetails] =useState("");
    let per_page=10;

    // useEffect(()=>{
    //     const fetchUsers=async()=>{
    //         try{
    //             const response =await axios.get(`https://api.github.com/search/users?q=${query}`)
    //             console.log(response.data)
    //             setUsers(response.data)
    //         }catch(error){
    //             console.error();
                
    //         }
            

    //     };
    //     fetchUsers();
        
    // },[])


   
const handelQuery=async(page)=>{
setPage(page)
if(!query.trim()){
    return;
}
setLoading(true)
        try{
        const response =await axios.get( `https://api.github.com/search/users?q=${query}&per_page=${per_page}&page=${page}`)
        console.log(response)
        setUsers(response.data.items)
        }catch(error){
            console.error();
            
        }finally{
            setLoading(false);
        }    
        


}

// useEffect(()=>{
//     const HandleUserClick= async(username)=>{
//     setModal(true)
//     try{
//         const modalResponse = await axios.get(`https://api.github.com/users/${username}`)
//         console.log(modalResponse.data)
//     }
//     catch(error){
//         console.error()
//     }

//     };
//     HandleUserClick("Ronit-Mahawar");
// },[])
const HandleUserClick= async(username)=>{
setModal(true)
try{
    const modalResponse = await axios.get(`https://api.github.com/users/${username}`)
    console.log(modalResponse.data)
    setDetails(modalResponse.data)
}
catch(error){
    console.error()
}

};






  return (
    <div>
        <div>
            <input type="text" value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder='enter user you want to search'/>
            <button onClick={()=>handelQuery(1)}>Search</button>
        </div>
       


        

{loading ? (
    <p>Loading...</p>
) : (
    <>
        {users.length > 0 && (
            <>
                <div>
                    <button onClick={() => handelQuery(page - 1)} disabled={page === 1}>Previous</button>
                    <button onClick={() => handelQuery(page + 1)} disabled={users.length < per_page}>Next</button>
                </div>
                {users.map(user => (
                    <div className='github-user' key={user.id} onClick={() => HandleUserClick(user.login)} style={{ cursor: 'pointer' }}>
                        <img src={user.avatar_url} alt={user.login} width="50px" />
                        <p>{user.login}</p>
                        <a href={user.html_url} target="_blank">View Profile</a>
                        
             
                    </div>
                ))}

               
            </>
        )}
    </>
)}
{modal && details && (
                <div className='modal'>
                    <h2>{details.name}</h2>
                    <p>Location: {details.location || 'N/A'}</p>
                    <p>Public Repos: {details.public_repos}</p>
                    <p>Followers: {details.followers}</p>
                    <p>Bio: {details.bio || 'N/A'}</p>
                    <button onClick={() => setModal(false)}>Close</button>
                </div>
            )
}


    </div>

  )
}

export default UserModel