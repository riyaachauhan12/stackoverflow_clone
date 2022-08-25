import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import axios from 'axios'
import  { useEffect} from "react";

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import './UsersProfile.css'

const UserProfile = () => {

    const { id } = useParams()
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = users.filter((user) => user._id === id)[0]
    const currentUser = useSelector((state) => state.currentUserReducer)
    const [Switch, setSwitch] = useState(false)

    const API_Key = `https://geolocation-db.com/json/50ad4a90-fd5e-11ec-b463-1717be8c9ff1`
  
  const [latitude, setLat] = useState([]);
  const [longitude, setLong] = useState([]);
  
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      
    })
    
  
    axios.get(API_Key)
    .then((response)=>{
      setLat(response.data.latitude)
      setLong(response.data.longitude)
      
    })
  }, [latitude,longitude]);



    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className='user-details'>
                            <Avatar backgroundColor="purple" color='white' fontSize='50px' px='40px' py='30px'>
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <h1>{latitude} {longitude}  </h1>
                                <p> Joined {moment(currentProfile?.JoinedOn).fromNow()}</p>
                                <p><FontAwesomeIcon icon={faBirthdayCake} /> Born {moment(currentProfile?.DateOfBirth).fromNow()}</p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                                </button>
                            ) 
                        }
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/>
                            ) : (
                                <ProfileBio currentProfile={currentProfile}/>
                            )
                        }
                    </>
                </section>
            </div>
        </div>
    )
}

export default UserProfile