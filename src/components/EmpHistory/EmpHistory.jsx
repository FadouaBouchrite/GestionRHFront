import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import './EmpHistory.css';
import { useNavigate } from 'react-router-dom';
const EmpHistory=()=> {
    const [term,setTerm]=useState(null);
    const [page, setPage] = useState(1);
    const {empId}=useParams();
const [done,setDone]=useState();
const [id,setId]=useState();
const [nom,setNom]=useState();
const [prenom,setPrenom]=useState();
const [categorie,setCategorie]=useState();
const [realisations,setRealisations]=useState();
const [dateDebut,setDateDebut]=useState(new Date());
const [dateFin,setDateFin]=useState(new Date());
const history=useNavigate();
const [histories,setHistories]=useState([]);
const [employeId,setEmployeeId]=useState();
const fetchNextTasks = (link) => {
    const url = new URL(link);
    setPage(url.searchParams.get('page'));
  };
const renderPagination = () => (
    <ul className="pagination">
      {histories.links?.map((link, index) => (
        <li key={index} className={`page-item ${link.active ? 'active' : ''} `}>
          <Link className="page-link" onClick={() => fetchNextTasks(link.url)}>
            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
          </Link>
        </li>
      ))}
    </ul>
  );
  
useEffect(()=>{

    fetchEmpId()
},[id]);

useEffect(()=>{


    fetchHistory()

},[page,term,employeId]);
const fetchHistory=async()=>{


  if (typeof empId !== 'undefined') {
    
    
    await axios.get(`http://127.0.0.1:8000/api/v1/getHistoryByEmploye/${empId}?page=${page}`)
      .then((response) => {
          console.log(response.data);
        setHistories(response.data || []);
        console.log(histories);
       
      })
      .catch((error) => {
        console.error(error);
      });
    
   }
   

    



     else if(term!==null ){
        await axios.get(`http://127.0.0.1:8000/api/v1/getHistoryByterm/${term}?page=${page}`)
        .then((response) => {
            console.log(response);
          setHistories(response.data || []);
          console.log(histories);
        })
        .catch((error) => {
          console.error(error);
          setHistories([]);
        });
     
     
     
     
     
       } 
    else if(term===null && typeof empId === 'undefined'){

         await axios.get(`http://127.0.0.1:8000/api/v1/getHistory?page=${page}`)
    .then((response) => {
        console.log(response);
      setHistories(response.data || []);
      console.log(histories);
    })
    .catch((error) => {
      console.error(error);
      setHistories([]);
    });
    }
   



}


const fetchEmpId= async()=>{
if(id!==''){
    const response1= await axios.get(`http://127.0.0.1:8000/api/v1/employee/${id}`);
const response2= await axios.get(`http://127.0.0.1:8000/api/v1/categorie/${id}`);


setNom(response1.data.nom);
setPrenom(response1.data.prenom);
setCategorie(response2.data.nom);

}else{

    setNom('');
    setPrenom('');
    setCategorie('');


}

}
const handleSubmit= async()=>{
    event.preventDefault();
    fetchHistory();
 const donnes={
    id: id,
    nom: nom,
    prenom: prenom,
    categorie: categorie,
    dateDebut: dateDebut,
    dateFin: dateFin,
    realisations:realisations

 };

 
 const response = await fetch('http://127.0.0.1:8000/api/v1/ajoutHistory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(donnes),
          });
    console.log();
      if (!response.ok) {
        const validation = await response.json();
        setErrors(validation.errors);
        console.log(validation.errors);
      } else {
        const data = await response.json();
        if (data.status === 'success') {
          Swal.fire({
position:'top-end',
icon:'success',
title:data.message,
showCancelButton:false,
timer:1500



          })
          setCategorie('');
          setDateDebut(new Date());
          setDateFin(new Date());
          setNom('');
          setPrenom('');
          setRealisations('');
          setId('');
history('/showHistory')
fetchHistory();
setDone(()=>{done+1});
}
}

}

  return (<>
    
   
    
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
     <div className="col-md-8">
        
        
         <div class="container mt-4">

     

      <div class="card mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
              <h2 class="pt-3 pb-4 text-center font-bold font-up deep-purple-text">Search within table</h2>
              <div class="input-group md-form form-sm form-2 pl-0">
                <input class="form-control my-0 py-1 pl-3 purple-border" type="text" placeholder="Search something here..." aria-label="Search" value={term}  onChange={(e)=>{ setTerm(e.target.value)}} />
                <span class="input-group-addon waves-effect purple lighten-2" id="basic-addon1"><a><i class="fa fa-search white-text" aria-hidden="true"></i></a></span>
              </div>
            </div>
          </div>
          
          <table class="table table-striped">
            <thead>
              <tr>
              <th></th>
              <th>Id</th>
                <th>nom</th>
                <th>prenom</th>
                <th>categorie</th>
                <th>réalisations</th>
                <th>date début</th>
                <th>date fin</th>
                
              </tr>
            </thead>
            <tbody>
            {histories.data?.map((employee) => (


<tr>
                <th scope="row">1</th>
                <td>{employee.employee.id}</td>
                <td>{employee.emp_first}</td>
                <td>{employee.emp_familly}</td>
                <td>{employee.jobTitle}</td>
                <td>{employee.achievements}</td>
                <td>{employee.startDate}</td>
                <td>{employee.endDate}</td>
                
              </tr>

            ))}
              
              
             
            </tbody>

          </table>
          <div>{renderPagination()}</div>

        </div>
      </div>
      
      
      
     

      <hr class="my-4"/>

     
    </div>
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        </div>  <div className="col-md-4">
        

<form class="row g-3" onSubmit={handleSubmit} noValidate>
<div class="col-md-4">
    <label for="validationDefault01" class="form-label" >id</label>
    <input type="text" class="form-control" id="validationDefault01" value={id} onChange={(e)=>{setId(e.target.value)}  }  required/>
  </div>
<div class="col-md-4">
    <label for="validationDefault01" class="form-label" >Last name</label>
    <input type="text" class="form-control" id="validationDefault01" value={nom} onChange={(e)=>{setNom(e.target.value)}  } required/>
  </div>
  <div class="col-md-4">
    <label for="validationDefault02" class="form-label" >Last name</label>
    <input type="text" class="form-control" value={prenom} onChange={(e)=>{setPrenom(e.target.value)}  } id="validationDefault02"  required/>
  </div>
  <div class="col-md-4">
    <label for="validationDefault03" class="form-label" >Categorie</label>
    <input type="text" class="form-control"value={categorie} onChange={(e)=>{setCategorie(e.target.value)}  } id="validationDefault03"  required/>
  </div>
 
  <div class="col-md-4">
    <label for="validationDefault04" class="form-label" >Date debut</label>
    <input type="date" class="form-control"value={dateDebut} onChange={(e)=>{setDateDebut(e.target.value)}  } id="validationDefault04"  required/>
  </div>
  <div class="col-md-4">
    <label for="validationDefault04" class="form-label" >Date fin</label>
    <input type="date" class="form-control" id="validationDefault04" value={dateFin} onChange={(e)=>{setDateFin(e.target.value)}  } required/>
  </div>
 <textarea value={realisations} onChange={(e)=>{setRealisations(e.target.value)}  } name="" id="" cols="30" rows="10"></textarea>
  
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
  </div>
</form>


      </div>
    </MDBContainer>
    </>
  );
}

export default EmpHistory;