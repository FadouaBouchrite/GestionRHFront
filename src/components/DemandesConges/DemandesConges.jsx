import React, { useState } from 'react';
import Swal from "sweetalert2";
import useAuthContext from "../context/AuthContext";

const DemandesConges = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [congeType, setCongeType] = useState('');
  const [reason, setReason] = useState('');
  const { user } = useAuthContext();
  const id = user.id;
  const [date,setDate]=useState('');
 const currentDate=new Date();

  const handleSubmit = async(e) => {
   
    e.preventDefault(); 
    setDate(currentDate.toDateString())
    const donne = {
       id:id,
        startDate: startDate,
        endDate: endDate,
        congeType: congeType,
        reason: reason,
        date:currentDate.toISOString().split('T')[0],

    };
    const response = await fetch('http://127.0.0.1:8000/api/v1/createDemande', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(donne),
      });

      if (!response.ok) {
        const validation = await response.json();
        setMessage(validation.message);
        setErrors(validation.errors);
        console.log(validation.errors);
      } else {
        Swal.fire({
            position:'top-end',
            icon:'success',
            title:'demande envoyer avec succes.',
            showCancelButton:false,
            timer:1500
            
            
            
                          })
  setEndDate('');
  setStartDate('');
  setCongeType('');
  setReason('');
     
       
  
      }



  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Demande de Congé</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Date de début :</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date de fin :</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type de congé :</label>
          <select
            className="form-select"
            value={congeType}
            onChange={(e) => setCongeType(e.target.value)}
            required
          >
            <option value="">Sélectionnez le type de congé</option>
            <option value="paye">Congé Payé</option>
            <option value="non-paye">Congé Non Payé</option>
            <option value="maladie">Congé Maladie</option>
            <option value="vacances">Vacances</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Raison :</label>
          <textarea
            className="form-control"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Soumettre la Demande</button>
      </form>
    </div>
  );
};

export default DemandesConges;
