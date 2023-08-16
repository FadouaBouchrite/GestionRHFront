import React, { useState } from 'react';
import Swal from "sweetalert2";
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
export default function DemandeCongeItem({ item }) {
  const [commentaire, setCommentaire] = useState('');

  const handleAccept = async () => {
    if (commentaire.trim() !== '') {
      try {
        await axios.post('http://127.0.0.1:8000/api/v1/assiduityConge', {
          id: item.id,
        });
     const response=   await axios.post('http://127.0.0.1:8000/api/v1/statusConge', {
          id: item.id,
          newStatus: 'acceptée',
          commentaire: commentaire,
        });
        setCommentaire('');
   if (!response.ok) {
    Swal.fire({
      position:'top-end',
      icon:'success',
      title:'réponse envoyée au employee avec succes',
      showCancelButton:false,
      timer:1500
      
      
      
                    })

   }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleRefuse = async () => {
    if (commentaire.trim() !== '') {
      try {
        await axios.post('http://127.0.0.1:8000/api/v1/statusConge', {
          id: item.id,
          newStatus: 'refusée',
          commentaire: commentaire,
        });
        setCommentaire('');
        // Rafraîchissement automatique après avoir refusé
        // fetchDemande(); // N'oubliez pas de le gérer dans le composant parent
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <tr key={item.id}>
    <td>{item.employee.id}</td>
    <td>
      <div className="d-flex align-items-center">
        <img
          src={`http://127.0.0.1:8000/images/employees/${item.employee.image}`}
          alt=""
          style={{ width: '80px', height: '80px' }}
          className="rounded-circle"
        />
        <div className="ms-3">
          <p className="fw-bold mb-1">
            {item.employee.prenom + '  ' + item.employee.nom}
          </p>
          <p className="text-muted mb-0">{item.employee.email}</p>
        </div>
      </div>
    </td>
    <td className="d-none d-sm-table-cell">{item.date_demande}</td>
    <td className="d-none d-sm-table-cell">{item.date_debut}</td>
    <td className="d-none d-sm-table-cell">{item.date_fin}</td>
    <td className="d-none d-sm-table-cell">{item.type_conges}</td>
    <td className="d-none d-sm-table-cell">{item.raison}</td>
    <td>
      <MDBBadge color="warning" pill>
        {item.status}
      </MDBBadge>
    </td>
    <td>
      <textarea
        className="form-control"
        id={`textAreaMessage_${item.id}`}
        rows="6"
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        required
      ></textarea>
    </td>
    <td>
    <div className="form-group col-sm-12 mt-3"    value={item.id}
        role="button"
        onClick={() => handleAccept(item.id)}
        disabled={!commentaire || commentaire.trim() === ''}>
                        <input type="submit" value="accepter" class="btn btn-outline-primary rounded"/>                  
                    </div>
                    <div className="form-group col-sm-12 mt-3"    value={item.id}
        role="button"
        onClick={() => handleRefuse(item.id)}
        disabled={!commentaire || commentaire.trim() === ''}>
                        <input type="submit" value="réfuser" class="btn btn-outline-primary rounded"/>                  
                    </div>
      
     


    </td>
  </tr>
  );
}
