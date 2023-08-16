
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import './ReponseConge.css';
import { Link } from 'react-router-dom';
import DemandeCongeItem from "../DemandeCongeItem/DemandeCongeItem";
import { useState } from "react";
import { useEffect } from "react";
export default function ReponseDmdConge() {
  const [demandes, setDemandes] = useState([]);
  const [page, setPage] = useState(1);
  const fetchNextDmd = (link) => {
    const url = new URL(link);
    setPage(url.searchParams.get('page'));
  };
  const renderPagination = () => (
    <ul className="pagination">
      {demandes.links?.map((link, index) => (
        <li key={index} className={`page-item ${link.active ? 'active' : ''} `}>
          <Link className="page-link" onClick={() => fetchNextDmd(link.url)}>
            {link.label.replace('&laquo;', '').replace('&raquo;', '')}
          </Link>
        </li>
      ))}
    </ul>
  );

   useEffect(() => {
    fetchDemande();

    const interval = setInterval(() => {
        fetchDemande();
    }, 10000);

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
}, [page]);

  const fetchDemande = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1/getDemande?page=${page}`);

    setDemandes(response.data);
    console.log(response);
  };

  return (
    <>

    
        <br /><br />
        <section class="section" id="contact">
        <div class="container text-center">
            <h6 class="section-title mb-3">DEMANDES DE CONGEES</h6>
        <div className="row"></div>
        <table class="">
  <thead >
            <tr>
          <th scope='col'>id</th>
          <th scope='col'>Coordonnées</th>
          <th scope='col'>Date de demande</th>
          <th scope='col'>Date de début</th>
          <th scope='col'>Date de fin</th>
          <th scope='col'>Type de congés</th>
          <th scope='col'>Raison</th>
          <th scope='col'>Status</th>
          <th scope='col'>commentaire</th>
          <th scope='col'>reponse</th>
        </tr>      </thead>
      <tbody>
        {demandes &&
          demandes.data &&
          demandes.data.map((item) => (
            <DemandeCongeItem key={item.id} item={item} />
          ))}
      </tbody>
    </table>
   <br /><br /><br />
   
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
  {renderPagination()}
</div>
</div></section>
   </>
  );
}
