import React, { useEffect, useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Graphe from '../Graphe/Graphe';
import './AdminAssiduite.css';
export default function AdminAssiduite() {
    const [data,setData]=useState([]);
    const [empId,setEmpId]=useState(null);
    const [date,setDate]=useState('');
    const [page, setPage] = useState(1);
    const [editedDate, setEditedDate] = useState({});
    const [editedEntryTime, setEditedEntryTime] = useState({});
    const [editedExitTime, setEditedExitTime] = useState({});


    useEffect(() => {
      console.log("editedEntryTime:", editedEntryTime);
      console.log("editedExitTime:", editedExitTime);
      console.log("editedDate:", editedDate);
      
    }, [editedEntryTime, editedExitTime]);
const handleModify= async () => {
  const modifiedRecords = [];
  for (const userId in editedDate) {
    if (editedDate.hasOwnProperty(userId)) {
      modifiedRecords.push({
        id: userId,
        date: editedDate[userId],
        entry_time: editedEntryTime[userId],
        exit_time: editedExitTime[userId],
        // Ajoutez d'autres champs modifiés ici
      });
    }
  }

  try {
   const response= axios.post('http://127.0.0.1:8000/api/v1/updateRecords', { modifiedRecords: modifiedRecords })
    // Réinitialisez l'état des modifications après le succès de la requête
    
    if (response.ok) {
       setEditedDate({});
    setEditedEntryTime({});
    setEditedExitTime({});
    fetchAssiduite();
    }
   
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error);
  }
};








    useEffect(()=>{
fetchAssiduite()


    },[empId,page,date])
    const fetchNextTasks = (link) => {
        const url = new URL(link);
        setPage(url.searchParams.get('page'));
      };
    
      const renderPagination = () => (
        <ul className="pagination">
          {data.links?.map((link, index) => (
            <li key={index} className={`page-item ${link.active ? 'active' : ''} `}>
              <Link className="page-link" onClick={() => fetchNextTasks(link.url)}>
                {link.label.replace('&laquo;', '').replace('&raquo;', '')}
              </Link>
            </li>
          ))}
        </ul>
      );
    const fetchAssiduite= async()=>{
        console.log(empId);
if (empId!==null && empId!=='' ) {
    await axios
    .get(`http://127.0.0.1:8000/api/v1/getAttendenceById/${empId}?page=${page}`)
    .then((response) => {
      setData(response.data || []);

      


    })
    .catch((error) => {
      console.error(error);
      setData([]);
      console.log(setEditedDate);

    });
}
if((empId===''||empId===null)&&(date !== null && date!=='')){
    await axios
    .get(`http://127.0.0.1:8000/api/v1/getAssiduiteByDate2/${date}?page=${page}`)
    .then((response) => {
      setData(response.data || []);
      console.log(data);

    })
    .catch((error) => {
      console.error(error);
      setData([]);

    });

}
if (date !== null && date!=='' && empId !== '' ) {
    await axios
        .get(`http://127.0.0.1:8000/api/v1/getAssiduiteByDate/${empId}/${date}?page=${page}`)
        .then((response) => {
          setData(response.data || []);
          console.log(data);

        })
        .catch((error) => {
          console.error(error);
          setData([]);

        });
    
}
if((date===null || date==='') && (empId===''||empId===null)){
  await axios
  .get(`http://127.0.0.1:8000/api/v1/getAssiduite?page=${page}`)
  .then((response) => {
    setData(response.data || []);
    console.log(response.data.data);

    // Pré-remplir les états editedDate, editedEntryTime et editedExitTime
    const updatedEditedDate = {};
    const updatedEditedEntryTime = {};
    const updatedEditedExitTime = {};

    response.data?.data.forEach((item) => {
      updatedEditedDate[item.id] = item.date;
      updatedEditedEntryTime[item.id] = item.entry_time;
      updatedEditedExitTime[item.id] = item.exit_time;
    });

    setEditedDate(updatedEditedDate);
    setEditedEntryTime(updatedEditedEntryTime);
    setEditedExitTime(updatedEditedExitTime);
  })
  .then(() => {
    console.log(editedEntryTime, editedExitTime);
  })
  .catch((error) => {
    console.error(error);
    setData([]);
  });


}
        

    }
    
  return (
    
    <div className="container ">
        <br /><br />
        <div className="row">
         <div className="col-md-4">

<div class="input-group rounded">
<input type="search" class="form-control rounded" value={empId} placeholder="entrer l'id ou bien le nom" aria-label="Search" aria-describedby="search-addon" onChange={(e)=>{setEmpId(e.target.value)}} />

</div>
</div> 
<div className="col-md-4">

    
  <input type="date" class="form-control rounded" value={date} placeholder="" aria-label="" aria-describedby="" onChange={(e)=>{setDate(e.target.value)}}/>
  

</div>
</div>

<br /><br />
        <div className="col-md-10">
        <table class="">
  <thead >
<tr  style={{backgroundColor:'#695aa6'}}>
        <th scope='col'>Id</th>
          <th scope='col'>Name</th>
          <th scope='col'>date</th>
          <th scope='col'>date entrée</th>
          <th scope='col'>date sortie</th>
          <th scope='col'>abscence</th>
          <th scope='col'>Raison</th>
        </tr>

  </thead>
  <tbody>
  {data.data?.map((item)=>(

<tr>
    <td>{item.employee.id}</td>
<td>
  <div className='d-flex align-items-center'>
  
    <img
                      src={`http://127.0.0.1:8000/images/employees/${item.employee.image}`}
                      alt=''
      style={{ width: '80px', height: '80px' }}
      className='rounded-circle'
    />
    <div className='ms-3'>
      <p className='fw-bold mb-1'>{item.employee.prenom +'  ' + item.employee.nom}</p>
      <p className='text-muted mb-0'>{item.employee.email}</p>
    </div>
  </div>
</td>
<td>

      <input
        type="date"
        style={{  border: 'none',
          outline:'none'}}
        value={editedDate[item.id] || item.date}
        onChange={(e) => {
          const updatedEditedDate = { ...editedDate };
          updatedEditedDate[item.id] = e.target.value ; // Utilisez item.date si l'entrée est vide
          setEditedDate(updatedEditedDate);
        }}
      />
    </td>
            
<td>

      <input
        type="time"
        style={{  border: 'none',
          outline:'none'}}
        value={editedEntryTime[item.id] || item.entry_time}
        onChange={(e) => {
          const updatedEditedEntryTime = { ...editedEntryTime };
          updatedEditedEntryTime[item.id] = e.target.value ;
          setEditedEntryTime(updatedEditedEntryTime);
        }}
      />
    </td>

<td>
<input
        type="time"
        style={{  border: 'none',
          outline:'none'}}
        value={editedExitTime[item.id] || item.exit_time}
        onChange={(e) => {
          const updatedEditedExitTime = { ...editedExitTime };
          updatedEditedExitTime[item.id] = e.target.value || item.exit_time;
          setEditedExitTime(updatedEditedExitTime);
        }}
      />
      </td>
<td>
{item.absence===0 ? '' :<>  <MDBBadge color='danger' pill>
              oui
            </MDBBadge></>}
</td>
<td>{item.raison}</td>
</tr>


))}
      

  </tbody>
</table>
       
    <MDBTable align='middle'>
    
      
    </MDBTable>
    <div><button onClick={()=>{
handleModify();


    }}>Enregistrer les modification</button></div>
    <br />
    <div>{renderPagination()}</div>
     <div>
        {empId!==null && empId!==''&& data.data.length!==0 ? <Graphe empId={empId}/>:''}
        
        </div>     
        <br />
    </div>
    
    </div>
  );
}