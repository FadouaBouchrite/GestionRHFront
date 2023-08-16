import React, { useEffect } from 'react'
import './ShowNotification.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
const ShowNotification = () => {
    const {notId}=useParams();
    const [notification,setnotification]=useState('');
    
    const fetchNot = () => {
        fetch(`http://127.0.0.1:8000/api/v1/getNotification/${notId}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setnotification(data);
            if (data) {
              setnotification(data);
              console.log(notification);
            }
          })
          .catch(error => {
            console.error('Erreur lors de la récupération de la notification :', error);
          });
      };
    useEffect(()=>{
        
            if (notification===null || notification==='') {
              
              fetchNot()
const interval = setInterval(() => {
    fetchNot();
  }, 50000);

  // Nettoyage de l'intervalle lorsque le composant est démonté
  return () => clearInterval(interval);
            }
         

    },[])
  return (

<div class="center-box">
    <h1 style={{fontSize:"200%",textAlign:'center',paddingTop:'30px'}}>{notification.object}</h1>
    <br /><br />
    <p style={{textAlign:'center'}}>{notification.message}</p>
  </div>


  )
}

export default ShowNotification