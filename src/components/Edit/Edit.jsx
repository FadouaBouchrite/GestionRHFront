import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";



import './Edit.css';
const Edit = () => {
  const [errors, setErrors] = useState({});

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [catName, setCatName] = useState("");
  const [catCompetence, setCatCompetence] = useState("");
  const [catQualification, setCatQualification] = useState("");
  const [catExperience, setCatExperience] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const {employeeId}=useParams();
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [newImg,setNewImg]=useState();

  useEffect(() => {
    fetchCategories();
    fetchEmployees();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);
  const fetchEmployees= async ()=>{

try {
  
const response1= await axios.get(`http://127.0.0.1:8000/api/v1/employee/${employeeId}`)
const response2= await axios.get(`http://127.0.0.1:8000/api/v1/categorie/${employeeId}`)


setNom(response1.data.nom);
setPrenom(response1.data.prenom);
setCatName(response2.data.nom);
setCatCompetence(response2.data.competences);
setCatExperience(response2.data.experiences);
setCatQualification(response2.data.qualifications);
setImage(response1.data.image);
setEmail(response1.data.email);
console.log(response1,response2);
// console.log(nom);
// console.log(catName);
} catch (error) {
  console.log(error);
}


  }
const history=useNavigate();



const fetchCategories = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/names');
  const data = await response.json();
  setCategories(data)
   
    console.error('Error fetching categories:', error);
  }catch (error) {
      console.error('Error fetching categories:', error);
    }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  const formData= new FormData();

 

  try {
    formData.append("image",newImg);

    formData.append("catName",catName) ;
     formData.append("competence",catCompetence);
     formData.append("experience",catExperience);
     formData.append("qualification",catQualification);
  formData.append("nom",nom);
  formData.append("prenom",prenom);
  formData.append("email",email);
      const userResponse = await fetch(`http://127.0.0.1:8000/api/v1/update/${employeeId}`, {
          method: 'POST',
         
          body:formData,
        });

        if (!userResponse.ok) {
          const validation = await userResponse.json();
          setMessage(validation.message);
          setErrors(validation.errors);
          console.log(validation.errors);
        } else {
          const data = await userResponse.json();
          const mssg = data.message;
          if (data.status === 1) {
            Swal.fire({
position:'top-end',
icon:'success',
title:'employe mit à jour avec succes.',
showCancelButton:false,
timer:2000



            })
            
          history('/showEmp')
          } else {
            console.log(data.authenticated);
            console.log(data.email);
            console.log(data.password);
            history(`/edit/${employeeId}`);
          }
        }
      
      
      
      
      
       } catch (error) {
  console.log(error);
    }
  };




  return (
    <>
    
    
    <section class="section" id="contact">
        <div class="container text-center">
            <h6 class="section-title mb-3">MODIFICATION DES INFORMATIONS</h6>
            <br /><br />
            <form action="" onSubmit={handleSubmit} class="contact-form col-md-10 col-lg-8 m-auto">
                <div class="form-row">

                <div class="form-group col-sm-12">
                <div className="mb-3">
  {image && <img
  src={`http://127.0.0.1:8000/images/employees/${image}`}
  alt="Employee"
  style={{
    width: "200px",
    height: "150px",
    border: "none",
    borderRadius: "20%",
    boxShadow: " 0 0 0 8px #695aa6",
  }}
/>}
  <div className="invalid-feedback">Example invalid form file feedback</div>
</div>
<div class="form-group col-sm-6">
              <input type="file" class="form-control" aria-label="file example"  onChange={(e) => { setNewImg(e.target.files[0]) }} />
              <div class="invalid-feedback">Example invalid form file feedback</div>
            </div> 


            
            </div>
                    <div class="form-group col-sm-6">
                    <input placeholder='Prénom' type="text" class="form-control" id="validationCustom01" value={prenom} onChange={(e) => { setPrenom(e.target.value), setErrors({ ...errors, password: "" }); }} required/>
                    </div>
                    <div class="form-group col-sm-6">
                    <input type="text" placeholder='Nom' class="form-control" id="validationCustom02" value={nom} onChange={(e) => { setNom(e.target.value), setErrors({ ...errors, password: "" }); }} required/>
                    </div> <div class="form-group col-sm-6">
                    <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" value={email} onChange={(e) => { setEmail(e.target.value), setErrors({ ...errors, password: "" }); }} required/>
                    </div> <div class="form-group col-sm-6">
                    <select class="form-select" id="validationCustom04" value={catName} onChange={(e) => setCatName(e.target.value)} required>
    <option selected disabled value="">Choose...</option>
    {categories.map((category) => (
      <option key={category.id} value={category.name}>
        {category.nom}
      </option>
    ))}
  </select>                    </div> 
  <div class="form-group col-sm-6">
  <input type="text" placeholder='Qualification' class="form-control" id="validationCustom05" value={catQualification} onChange={(e) => { setCatQualification(e.target.value) }} required />
                    </div>

                    <div class="form-group col-sm-6">
                    <input type="text" placeholder='Compétence' class="form-control" id="validationCustom06" value={catCompetence} onChange={(e) => { setCatCompetence(e.target.value) }} required />
                    </div>
                    <div class="form-group col-sm-6">
                    <input type="text" class="form-control" placeholder='Expérience' id="validationCustom07" value={catExperience} onChange={(e) => { setCatExperience(e.target.value) }} required />
                    </div>

                     


                    
                    <div class="form-group col-sm-12 mt-3">
                        <input type="submit" value="appliquer les modifications" class="btn btn-outline-primary rounded"/>                  
                    </div>
                    <div style={{ color: "red" }}>{message}</div>

                </div>  
            </form>
        </div>
    </section>

    
 </>
  )
}

export default Edit