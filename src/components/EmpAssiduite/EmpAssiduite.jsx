import React, { useState, useEffect } from 'react';

import useAuthContext from "../context/AuthContext";
import axios from 'axios';
import Graphe from '../Graphe/Graphe';
import { useNavigate } from 'react-router-dom';
import EntryExitTime from '../EntryExitTime/EntryExitTime';

const EmpAssiduite = () => {
  const [raison, setRaison] = useState('');
  const [date, setDate] = useState(new Date());
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { user } = useAuthContext();
  const empId = user.id;
  const id = user.id;
  const history = useNavigate();

  useEffect(() => {
    const lastSubmittedDate = localStorage.getItem(`lastSubmittedDate_${empId}`);
    if (lastSubmittedDate) {
      const today = new Date().toLocaleDateString();
      if (lastSubmittedDate === today) {
        setIsButtonDisabled(true);
      }
    }
  }, [empId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const params = {
        empId: id,
        raison: raison,
        date: date
      };

      const response = await axios.post('http://127.0.0.1:8000/api/v1/recordAbscence', params);

      if (response.ok) {
        console.log('Success:', response.data);
        setIsButtonDisabled(true);
        localStorage.setItem(`lastSubmittedDate_${empId}`, new Date().toLocaleDateString());
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 5000); // Réinitialiser après 5 secondes
        history('/pointeAssiduite');
      } else {
        console.log('Error:', response.status);
        history('/pointeAssiduite');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-7">
        <div className="card">
            <div className="card-header text-center bg-primary text-white">
              <h4>Enregistrement d'Assiduité</h4>
            </div>
            <div className="card-body">
              
              <EntryExitTime/>
              
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <h4>Reclamer une absence</h4>
          <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Raison de l'absence</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e)=>{setRaison(e.target.value)}}></textarea>
            </div>
            <div className="col-md-6">
              <label htmlFor="validationDefault03" className="form-label">Date de l'absence</label>
              <input type="date" className="form-control" id="validationDefault03" required onChange={(e)=>{setDate(e.target.value)}} />
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit" disabled={isButtonDisabled}>Envoyer le formulaire</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Graphe empId={empId} />
      </div>
    </div>
  );
};

export default EmpAssiduite;
