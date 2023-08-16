







import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

export default function Register1() {
  const [id, setId] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [catName, setCatName] = useState("");
  const [catCompetence, setCatCompetence] = useState("");
  const [catQualification, setCatQualification] = useState("");
  const [catExperience, setCatExperience] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const formData= new FormData();
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 3000);
    return () => clearTimeout(timer);
  }, [message]);


  const history = useNavigate();
  
  useEffect(() => {
    fetchCategories();
  }, []);

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
  
    const categorie = {
        id:id,
      nom: catName,
      competences: catCompetence,
      experiences: catExperience,
      qualifications: catQualification,
    };
    formData.append("image",image); 
        
    formData.append("id",id);   
    formData.append("nom",nom);
    formData.append("prenom",prenom);
    formData.append("email",email);
    formData.append("password",password);
    formData.append("categorieId",id);
    try {



        const userResponse = await fetch('http://127.0.0.1:8000/api/v1/register', {
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
    setMessage(mssg)
            if (data.status === 'success') {
              Swal.fire({
position:'top-end',
icon:'success',
title:'employe ajouter avec succes.',
showCancelButton:false,
timer:1500



              })
              history('/register1');
              setId('');
              setEmail('');
              setNom('');
              setPrenom('');
              setPassword(''); 
              setCatCompetence('');
              setCatExperience('');
              setCatName('');
              setImage('');
            } else {
              console.log(data.authenticated);
              console.log(data.email);
              console.log(data.password);
              history('/register1');
            }
          }
        
          const response = await fetch('http://127.0.0.1:8000/api/v1/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(categorie),
          });
    
          if (!response.ok) {
            const validation = await response.json();
            setMessage(validation.message);
            setErrors(validation.errors);
            console.log(validation.errors);
          } else {
            const data = await response.json();
            const mssg = data.message;
      
         
           
      
          }}
    
        
        
        
        
       catch (error) {
    console.log(error);
      }
    };

    return (
        <> 
        <div className="container text-center section">
        <h6 class=" section-title mb-3">Ajout d'un nouveau Employée</h6>

          <form class="row g-3 needs-validation" onSubmit={handleSubmit} noValidate  >
            <div class="col-md-4">
              <label for="validationCustom00" class="form-label">Code Employe</label>
              <input type="text" class="form-control" id="validationCustom00" value={id} onChange={(e) => { setId(e.target.value); setErrors({ ...errors, email: "" }); }} required/>
              <div class="valid-feedback">
                Looks good!
              </div>
            </div>
            <div class="col-md-4">
              <label for="validationCustom01" class="form-label">Prenom</label>
              <input type="text" class="form-control" id="validationCustom01" value={prenom} onChange={(e) => { setPrenom(e.target.value), setErrors({ ...errors, password: "" }); }} required/>
              <div class="valid-feedback">
                Looks good!
              </div>
            </div>
            <div class="col-md-4">
              <label for="validationCustom02" class="form-label">Nom</label>
              <input type="text" class="form-control" id="validationCustom02" value={nom} onChange={(e) => { setNom(e.target.value), setErrors({ ...errors, password: "" }); }} required/>
              <div class="valid-feedback">
                Looks good!
              </div>
            </div>
            <div class="col-md-4">
              <label for="validationCustomUsername" class="form-label">Email</label>
              <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">@</span>
                <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" value={email} onChange={(e) => { setEmail(e.target.value), setErrors({ ...errors, password: "" }); }} required/>
                <div class="invalid-feedback">
                  Please choose a username.
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <label for="validationCustom03" class="form-label">Mot de Passe</label>
              <input type="password" class="form-control" id="validationCustom03" value={password} onChange={(e) => { setPassword(e.target.value), setErrors({ ...errors, password: "" }); }} required />
            </div>
            <div class="col-md-3">
  <label for="validationCustom04" class="form-label">Categorie</label>
  <select class="form-select" id="validationCustom04" value={catName} onChange={(e) => setCatName(e.target.value)} required>
    <option selected disabled value="">Choose...</option>
    {categories.map((category) => (
      <option key={category.id} value={category.name}>
        {category.nom}
      </option>
    ))}
  </select>
  <div class="invalid-feedback">
    Please select a valid categorie.
  </div>
</div>
    
            <div class="col-md-3">
              <label for="validationCustom05" class="form-label">Qualification</label>
              <input type="text" class="form-control" id="validationCustom05" value={catQualification} onChange={(e) => { setCatQualification(e.target.value) }} required />
              <div class="invalid-feedback">
                Please provide a valid zip.
              </div>
            </div>
            <div class="col-md-3">
              <label for="validationCustom06" class="form-label">Competences</label>
              <input type="text" class="form-control" id="validationCustom06" value={catCompetence} onChange={(e) => { setCatCompetence(e.target.value) }} required />
              <div class="invalid-feedback">
                Please provide a valid zip.
              </div>
            </div>
            <div class="col-md-3">
              <label for="validationCustom07" class="form-label">Experience</label>
              <input type="text" class="form-control" id="validationCustom07" value={catExperience} onChange={(e) => { setCatExperience(e.target.value) }} required />
              <div class="invalid-feedback">
                Please provide a valid zip.
              </div>
            </div>
    
            <div class="mb-3">
              <input type="file" class="form-control" aria-label="file example" required  onChange={(e) => { setImage(e.target.files[0]) }} />
              <div class="invalid-feedback">Example invalid form file feedback</div>
            </div>
    
            <div class="form-group col-sm-12 mt-3">
                        <input type="submit" value="ajouter à la liste des employées" class="btn btn-outline-primary rounded"/>                  
                      <div style={{ color: "red" }}>{message}</div>
               </div>
          </form>
          </div>
        </>
      );
                }
   
