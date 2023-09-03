import React,{useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom'
import loader from "../assets/loader.gif"
import {ToastContainer , toast} from 'react-toastify'
import"react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { setAvatarRoute } from '../utils/APIRoutes'
import { Buffer } from 'buffer'
import './CSS/avatar.css'

export default function SetAvatar() {
    const api = "https://api.multiavatar.com/45678945";
    const navigate = useNavigate();
    const [avatars , setAvatars] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [selectedAvatar , setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };

    useEffect(() => {
        if(!localStorage.getItem("chat-app-user")){
          navigate("/login")
        }
      }, [])
    

    const setProfilePicture = async() => {
        if(selectedAvatar === undefined){
            toast.error("Please select an avatar",toastOptions)
        }else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"))
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image: avatars[selectedAvatar],
            })
            console.log(data);
            if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user" , JSON.stringify(user))
                navigate('/')
            }else{
                toast.error("Please Click again for Security Reasons!",toastOptions)
            }
        }
        
    };
    const doSomething = async() =>{
        const data =[];
        for(let i = 0  ; i<4 ; i++){
            const image = await axios.get(
                `${api}/${Math.round(Math.random() * 1000)}`
            );
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
        }
        
        useEffect(() =>{
         doSomething();
        },[])
  return (
    <>
    {
        isLoading ? <div className='avatar_container'>
            <img src={loader} alt="loader" className='loader' />
            </div> :(

            
    
        <div className='avatar_container'>
            <div className="title-container">
                <h1>Pick an avatar for your profile image</h1>
            </div>
            <div className="avatars">{
                avatars.map((avatar , index) => {
                    return(
                        <div key={index} className={`avatar ${
                                selectedAvatar === index ? "selected" : ""
                            }`}
                        >
                            <img 
                                src = {`data:image/svg+xml;base64,${avatar}`} 
                                alt="avatar" 
                                onClick={()=> setSelectedAvatar(index)} 
                            />
                        </div>
                    )
                })}
            </div>
            <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
        </div>
        )}
        <ToastContainer />
    </>
  )
}
// const Container = styled.div`
//     display:flex
// `;
