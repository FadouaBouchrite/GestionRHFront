import React, { useState, useEffect } from 'react';
import { Container, Badge } from 'react-bootstrap';
import axios from 'axios';
import useAuthContext from "../context/AuthContext";
import './NotificationsPage.css'
import { Link } from 'react-router-dom';

const NotificationsPage = () => {
  const { user } = useAuthContext();
  const empId = user.id;
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState([]);
  const [notId,setNotId]=useState();
  const [page, setPage] = useState(1);
    const fetchNextTasks = (link) => {
        const url = new URL(link);
        setPage(url.searchParams.get('page'));
      };
      const renderPagination = () => (
        <ul className="pagination">
          {notifications.links?.map((link, index) => (
            <li key={index} className={`page-item ${link.active ? 'active' : ''} `}>
              <Link className="page-link" onClick={() => fetchNextTasks(link.url)}>
                {link.label.replace('&laquo;', '').replace('&raquo;', '')}
              </Link>
            </li>
          ))}
        </ul>
      );
const handleRead=async(notifId)=>{
console.log(notifId);
  try {
    
if (notifId) {
  console.log(notifId);
  await axios.post('http://127.0.0.1:8000/api/v1/ApproveRead', {
      notId:notifId  , 

    
        
        });
}
    
} catch (error) {
    
}

}
  useEffect(() => {
    // Charger les notifications depuis l'API
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, [page]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/getNotificationByEmpIdPaginate/${empId}?page=${page}`);
    //   console.log( await response.json());
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des notifications');
      }
      const data = await response.json();
      console.log(data);
      setNotifications(data);
      setUnread(data.data.filter(
        (notification) => !notification.read
      ));
    } catch (error) {
      console.error('Erreur lors du chargement des notifications :', error);
    }
  };

  return (
    <>
    <br /><br /><br />
    <div className="container">
    <table style={{borderCollapse: "collapse",width: "100%",backgroundColor: "#695aa6"}}>

     <thead>
        <tr>
            <th style={{border: "1px solid black",padding: "8px",color:"black"}}>nouveaux messages</th>
        </tr>
    </thead>
    <tbody>
    {notifications.data?.length > 0 ? (
        notifications.data?.map((notification) => (
          <div key={notification.id} className="mb-3">
           
            {notification.read===1 ? (
             <>
             <div style={{ width: "100%" }}>
                    <button style={{
        backgroundColor: "transparent",
        border: "none",
        width: "100%",
        textAlign: "left",
      }} onClick={()=>{handleRead(notification.id)}} >
                    
                        <Link to={`/showNotification/${notification.id}`}  style={{color: "black", textDecoration: "none"}} >{notification.object}</Link>
                    </button>
                </div>
             </>
             
            ) : (
              <>
 <div className="cc" style={{ width: "100%" }}>
  
    <button
      style={{
        backgroundColor: "transparent",
        border: "none",
        width: "100%",
        textAlign: "left",
      }}
      onClick={() => {
        handleRead(notification.id);
      }}
    >
      <Link
        to={`/showNotification/${notification.id}`}
        style={{ color: "#fff", textDecoration: "none" }}
      >
        {notification.object}
      </Link>
    </button>
</div>

</>
            )}
          </div>
        ))
      ) : (
        <p>Aucune notification</p>
      )}


    </tbody>
    </table></div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {renderPagination()}
    </div>
    </>

  )
}

export default NotificationsPage







