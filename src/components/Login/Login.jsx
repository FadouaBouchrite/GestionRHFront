import React, { useState } from "react";
import { useEffect } from "react";
import useAuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const {login,errors,message}=useAuthContext();
 
 

  const handleSubmit = async (e) => {
    e.preventDefault();
try {
  





login({email,password})



















} catch (error) {
  
}
} 

  return (<>
  <section class="section" id="contact">
        <div class="container text-center">
            <h6 class="section-title mb-3">SE CONNECTER</h6>
            <br /><br />
            <form action="" onSubmit={handleSubmit} class="contact-form col-md-10 col-lg-8 m-auto">
                
                    <div class="form-group col-sm-12">
                    <input placeholder='Email' type="email" class="form-control" id="validationCustom01" value={email} onChange={(e) => { setEmail(e.target.value);  }} required/>
                    </div>
                    <div class="form-group col-sm-12">
                    <input type="password" placeholder='MOT DE PASSE' class="form-control" id="validationCustom02"   value={password} onChange={(e) => { setPassword(e.target.value) }} required/>
                    </div> 
 

                    
                    

                     


                    
                    <div class="form-group col-sm-12 mt-3">
                        <input type="submit" value="login" class="btn btn-outline-primary rounded"/>                  
                    </div>
</form>
                </div>  
            
    </section>





<Link to="/forgot"className="self-start">mot de passe oublier?</Link>

 </>
  );
          }
