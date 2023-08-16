import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Verification = () => {
const [email,setEmail]=useState("");
const [message,setMessage]=useState('');
useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 1000); // 5000 ms = 5 secondes


    // Nettoyage du timer lorsque le composant est démonté
    return () => clearTimeout(timer);
  }, [message]);
  const history = useNavigate();
function handleSubmit(e) {
e.preventDefault();

      
const user = { email};

fetch('http://127.0.0.1:8000/api/v1/forgot', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
    },
    body: JSON.stringify(user)
}).then(async response => {
    if (!response.ok) {
        const validation = await response.json();
        setErrors(validation.errors);
        console.log(validation.errors);
    } else {

        const data = await response.json();
        
        if (data.code==1) {
            setEmail('');
            alert(data.status)
            setMessage(data.status)
            history('/login');
           
            // Authentification réussie, faites ce que vous souhaitez ici
          } else {
            
            history('/verify');
            setMessage(data.status)
            // Authentification échouée, gérer l'erreur
          }



        
        
        
    }
}).catch(error => {
    console.error('Error:', error);
});
}


  return (
    <>
    <h1>Mot de passe oublié</h1>
    <p>Entrez votre adresse e-mail pour recuperer votre mot de passe.</p>
    <form action="/reset-password" method="post" onSubmit={handleSubmit}>
        <label for="email">Adresse e-mail :</label> 
        <input type="email" id="email" value={email} name="email" onChange={(e)=>setEmail(e.target.value)} required  /> <br />

        <div class="form-group col-sm-12 mt-3">
                        <input type="submit" value="Recuperer le mot de passe" class="btn btn-outline-primary rounded"/>                  
                    </div>
        <div>{message}</div>
    </form></>
  )
}

export default Verification