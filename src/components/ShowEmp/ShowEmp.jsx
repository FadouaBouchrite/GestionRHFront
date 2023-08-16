import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import FloatingIcon from '../FloatingIcon/FloatingIcon';
import { Link, useParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './ShowEmp.css'
const ShowEmp = () => {
  const [orderBy, setOrderBy] = useState('');
  const [catName, setCatName] = useState('');
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchTerm,setSearchTerm]=useState(null);
  const [empId,setEmpId]=useState();
const debouncedSearchTerm=useDebounce(searchTerm,300);
  const scrollToTop = () => {
    const url = '/register1';
    window.location.href = url;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if(!categories.length){
          fetchedCategories();

    }
  }, []);

  const fetchedCategories = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/names');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchNextTasks = (link) => {
    const url = new URL(link);
    setPage(url.searchParams.get('page'));
  };

  const renderPagination = () => (
    <ul className="pagination">
      {employees.links?.map((link, index) => (
        <li key={index} className={`page-item ${link.active ? 'active' : ''} `}>
          <Link className="page-link" onClick={() => fetchNextTasks(link.url)}>
            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
          </Link>
        </li>
      ))}
    </ul>
  );

const deleteEmployee=(empId)=>{

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response=await axios.delete(`http://127.0.0.1:8000/api/v1/employees/${empId}`)
     
        Swal.fire(
          'Deleted!',
          response.data.message,
          'success',
          fetchEmployees()
        )
      } catch (error) {
        console.log(error);
      }
      
    }
  }); 
}


  useEffect(() => {
    fetchEmployees();                    
       console.log(catName)
        console.log(orderBy);
        console.log(debouncedSearchTerm[0]);
        
                 
    
                    
  }, [page, catName, orderBy,debouncedSearchTerm[0]]);

  const fetchEmployees = async () => {
    if (catName) {
      await axios
        .get(`http://127.0.0.1:8000/api/v1/employees/${catName}?page=${page}`)
        .then((response) => {
          setEmployees(response.data || []);
        })
        .catch((error) => {
          console.error(error);
          setEmployees([]);
        });
    } else if (orderBy) {
      await axios
        .get(`http://127.0.0.1:8000/api/v1/order/${orderBy.column}/${orderBy.direction}/employees?page=${page}`)
        .then((response) => {
          setEmployees(response.data || []);
        })
        .catch((error) => {
          console.error(error);
          setEmployees([]);
        });
    }else if (debouncedSearchTerm[0]) {

      await axios
        .get(`http://127.0.0.1:8000/api/v1/search/${debouncedSearchTerm[0]}/employees?page=${page}`)
        .then((response) => {
          setEmployees(response.data || []);
        })
        .catch((error) => {
          console.error(error);
          setEmployees([]);
        });
    }  else  {
      await axios
        .get(`http://127.0.0.1:8000/api/v1/employees?page=${page}`)
        .then((response) => {
          setEmployees(response.data || []);
        })
        .catch((error) => {
          console.error(error);
          setEmployees([]);
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row my-5">
          <div className="row my-3">
<div className="col-md-4">
<div className="form-groupe">


<input type="text" name="" className='form-control rounded-0 border-black' id="" value={searchTerm} onChange={
(e)=>{
setCatName(null);
setOrderBy(null);
setPage(1);
setSearchTerm(e.target.value)

}



} placeholder='search ...' />

</div>


</div>

          </div>
          

          <div class="container">
  <div class="row">
    <div class="col-md-9">
    <div class="container">
<div class="row">

{employees && employees.data && employees.data?.map((employee) => (
                <div key={employee.id} className="col-lg-4 col-md-4 col-sm-6">
    <div class="">
        <div class="card card-margin">
            <div class="card-header no-border">
                <h5 class="card-title">N¨{employee.id}</h5>
            </div>
            <div class="card-body pt-0">
                <div class="widget-49">
                    <div class="widget-49-title-wrapper">
                        <div class="widget-49-date-primary">
                        <img 
                      src={`http://127.0.0.1:8000/images/employees/${employee.image}`}
                      alt={employee.nom}
                      className="widget-49-date-primary"
                    />
                        </div>
                        
                        <div class="widget-49-meeting-info">
                            <span class="widget-49-pro-title">{employee.nom} <br /> {employee.prenom}</span>
                        </div>
                    </div>
                    <ul class="widget-49-meeting-points">
                        <li class="widget-49-meeting-item"><span>{employee.categorie && (
    employee.categorie.nom
  )}</span></li>
                        <li class="widget-49-meeting-item"><span>{employee.categorie && (
    employee.categorie.competences
  )}</span></li> <li class="widget-49-meeting-item"><span>{employee.email}</span></li>
                        <li class="widget-49-meeting-item"><span>
                        {employee.categorie && (
    employee.categorie.qualifications
  )}
                          
                          </span></li>
                    </ul> <br /><br /><br />
                    <div class="widget-49-meeting-action">
                    <Link to={`/edit/${employee.id}`} className="btn btn-sm btn-warning">
                     <FontAwesomeIcon icon={faPen} />                      </Link>    
                     <button className="btn btn-sm btn-danger mx-1" onClick={()=>{setEmpId(employee.id);deleteEmployee(employee.id)} }>
                      <FontAwesomeIcon icon={faTrash} /> 


                     </button>

                     <Link to={`/showHistory/${employee.id}`} className="btn btn-sm btn-success mx-1">

                     <FontAwesomeIcon icon={faInfoCircle} /> 

                     </Link>                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
              ))}
    
</div>
</div><FloatingIcon onClick={scrollToTop} />
            <div className="my-4 d-flex justify-content-between"></div>

            <div>
              liste des employee de {employees.from || 0} to {employees.to || 0} a l'origine de {employees.total}
            </div>
            <br />
            <br />
            <div>{renderPagination()}</div>
          
    </div>
    <div class="col-md-3">
    <div className="card-header text-center bg-white">
              <h4 className="mt-2"> Filter by category</h4>
            </div>

            <div className="card-body">
              <div className="form-check">
                <input
                  type="radio"
                  name="categorie"
                  id=""
                  className="form-check-input"
                  onChange={() => {
                    setCatName(null);
                    setPage(1);
                    setOrderBy(null);      
                                  fetchEmployees();
                                  setSearchTerm('');
                                  set


                  }}
                  checked={!catName}
                />
                <label htmlFor="" className="form-check-label" >
                  tous
                </label>
              </div>
              {categories?.map((categorie) => (
                <div className="form-check" key={categorie.id}>
                  <input
                    type="radio"
                    value={categorie.nom}
                    name="categorie"
                    id={categorie.id}
                    className="form-check-input"
                    onChange={(e) => {
                      setPage(1);


                      setCatName(e.target.value);
                      setOrderBy(null);
                      setSearchTerm('');



                    }}
                  />
                  <label htmlFor={categorie.id} className="form-check-label">
                    {categorie.nom}
                  </label>
                </div>
              ))}
            </div>

            <div className="card mt-2">
              <div className="card-header text-center bg-white">
                <h5 className="mt-2">order by</h5>
              </div>
              <h6>id</h6>
              <div className="form-check">
                <input
                  type="radio"
                  value="asc"
                  name="id"
                  id=""
                  className="form-check-input"
                  onChange={(e) => {
                    setCatName(null);
                    setPage(1);
                    setOrderBy({
                      column: 'id',
                      direction: e.target.value,
                    });


                  }}
                  checked={orderBy && orderBy.column === 'id' && orderBy.direction === 'asc'}

                />
                <label htmlFor="" className="form-check-label">
                  <i className="fa-solid fa-arrow-up"></i>up
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  value="desc"
                  name="id"
                  id=""
                  className="form-check-input"
                  onChange={(e) => {
                    setCatName(null);
                    setPage(1);
                    setOrderBy({
                      column: 'id',
                      direction: e.target.value,
                    });


                  }}

                  checked={orderBy && orderBy.column === 'id' && orderBy.direction === 'desc'}
                />
                <label htmlFor="" className="form-check-label">
                  <i className="fa-solid fa-arrow-down"></i>down
                </label>
              </div>
              <h6>nom</h6>
              <div className="form-check">
                <input
                  type="radio"
                  value="asc"
                  name="nom"
                  id=""
                  className="form-check-input"
                  onChange={(e) => {
                    setCatName(null);
                    setPage(1);
                    setOrderBy({
                      column: 'nom',
                      direction: e.target.value,
                    });


                  }}
                  checked={orderBy && orderBy.column === 'nom' && orderBy.direction === 'asc'}

                />
                <label htmlFor="" className="form-check-label">
                  <i className="fa-solid fa-arrow-up"></i>up
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  value="desc"
                  name="nom"
                  id=""
                  className="form-check-input"
                  onChange={(e) => {
                    setCatName(null);
                    setPage(1);
                    setOrderBy({
                      column: 'nom',
                      direction: e.target.value,
                    });


                  }}

                  checked={orderBy && orderBy.column === 'nom' && orderBy.direction === 'desc'}
                />
                <label htmlFor="" className="form-check-label">
                  <i className="fa-solid fa-arrow-down"></i>down
                </label>
              </div>
            </div>    </div>
  </div>
</div>



           
              

            
          
        </div>
      </div>
    </>
  );
};

export default ShowEmp;












