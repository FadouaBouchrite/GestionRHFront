import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Edit from "./components/Edit/Edit";
import Register1 from "./components/Register1/Register1";
import Todo from "./components/Todos/Todo";
import Verification from "./components/Verification/Verification";
import ShowEmp from "./components/ShowEmp/ShowEmp";
import useAuthContext from "./components/context/AuthContext";
import EmpHistory from "./components/EmpHistory/EmpHistory";
import EmpAssiduite from "./components/EmpAssiduite/EmpAssiduite";
import AdminAssiduite from "./components/AdminAssiduite/AdminAssiduite";
import DemandesConges from "./components/DemandesConges/DemandesConges";
import ReponseDmdConge from "./components/ReponseDmdConge/ReponseDmdConge";
import NotificationsPage from "./components/NotificationsPage/NotificationsPage";
import ShowNotification from "./components/ShowNotification/ShowNotification";
import Salaires from "./components/Salaires/Salaires";
function App() {
  const { user } = useAuthContext();
  const [unread, setUnread] = useState([]);
  
  useEffect(() => {
    if (user && user.id&&user.user_type !== "1") {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 10000);

      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/getNotificationByEmpId/${user.id}`);
      console.log(response);

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des notifications');
      }else{
        const data = await response.json();
      console.log(data.data);
      setUnread( data.data.filter(notification => notification.read===0));
      }

      


    } catch (error) {
      console.error(error);
    }
  };

      return(

      <>
          
          <Header unreade={unread.length} />
      <Routes>
      
      <Route path="/" element={<Home/>}      />
      <Route path="/contact" element={<Contact/>}      />
      
      
      
      {user ? (<>
        {user.user_type == "1" ? (
          <>
      <Route path="/register1" element ={<Register1/>} />
        <Route path="/showEmp" element={<ShowEmp/>} />
        <Route path="/edit/:employeeId" element={<Edit/>}/>
        <Route path="/showHistory/:empId" element={<EmpHistory/>}/>
        <Route path="/showHistory" element={<EmpHistory/>} />
        <Route path="/assiduites" element={<AdminAssiduite/>} />
        <Route path="/conges" element={<ReponseDmdConge/>} />
        <Route path="/salaires" element={<Salaires/>} />
      
      
      </>
      
          ) :
      
      
          <>
      
      <Route path="/pointeAssiduite" element={<EmpAssiduite/>} />
      <Route path="/dmdconges" element={<DemandesConges/>} />
      <Route path="/notifications" element={<NotificationsPage/>} />
      <Route path="/showNotification/:notId" element={<ShowNotification/>} />

      </>
      
       
      
      
          
      
        }
      
      </>
      ) : <>
      
      <Route path="/login" element={<Login/>}      />
      <Route path="/forgot" element={<Verification/>} />
      <Route path="/verification" element={<Verification/>} />
      
        
      </>
      }
      <Route path="/todos" element={<Todo/>} />
      </Routes>
      
      
      
      
      
      </>
      
      
      
        );
}

export default App;
