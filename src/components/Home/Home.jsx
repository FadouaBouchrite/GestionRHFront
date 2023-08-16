import React from 'react';
import { useEffect } from 'react';
import useAuthContext from '../context/AuthContext';


const Home = () => { 
     const {user}=useAuthContext(); 





  return (
    <>
    {user && user?.user_type==="0" ?
  
  <>
 <br /> <br />
 <div style={{ textAlign: "center", padding: "50px" }}>
  <h1>
    Salut {user?.nom} {user?.prenom}
  </h1>

  <h4>Dans cette application, tu auras la possibilité de :</h4>
    <br /><br /><br />
<ul style={{ listStyleType: "none", fontSize: "18px", textAlign: "left" }}>
    <li style={{ margin: "10px 0" }}>
      <span style={{ fontWeight: "bold" }}>Pointer ton assiduité:</span> Enregistre
      ton heure d'entrée et de sortie chaque jour.
    </li>
    <li style={{ margin: "10px 0" }}>
      <span style={{ fontWeight: "bold" }}>Réclamer un abscence:</span> Signale
      tes absences et explique la raison.
    </li>
    <li style={{ margin: "10px 0" }}>
      <span style={{ fontWeight: "bold" }}>Demander un congé:</span> Fais des
      demandes de congé et garde une trace de leur statut.
    </li>
    <li style={{ margin: "10px 0" }}>
      <span style={{ fontWeight: "bold" }}>
        Alerter à chaque fois par les nouveautés:
      </span>{" "}
      Sois informé des jours fériés et reçois des notifications sur les
      réponses à tes demandes de congé.
    </li>
  </ul>
</div>

  </>:
  
  (user && user.user_type==="1" ?
  <>
    <br /><br />
    <div style={{ textAlign: "center", padding: "50px" }}>
    <h1>Salut, Responsable RH!</h1><br /><br /><br />
    <div style={{ fontSize: "24px", margin: "20px 0" }}>
      Dans cette application, tu auras la possibilité de :
    </div>    <br /><br />

    <ul style={{ listStyleType: "none", fontSize: "18px", textAlign: "left" }}>
      <li style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>Visualiser les employées:</span> Accède
        à la liste complète des employés de l'entreprise.
      </li>
      <li style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>
          Modifier et supprimer les employées:
        </span>{" "}
        Gère les informations des employés et consulte leur historique.
      </li>
      <li style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>
          Suivre les assiduites et effectuer des recherches:
        </span>{" "}
        Garde un suivi des présences et des absences des employés, et apporte
        des modifications si nécessaire.
      </li>
      <li style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>
          Gestion des demandes de congés:
        </span>{" "}
        Gère les demandes de congés des employés et assure une planification
        efficace.
      </li>
      <li style={{ margin: "10px 0" }}>
        <span style={{ fontWeight: "bold" }}>
          Gestion des fiches de salaire et génération des fiches de paie:
        </span>{" "}
        Gère les fiches de salaire des employés et génère facilement les fiches de
        paie.
      </li>
    </ul>
  </div>
  
    </>:null)
  
  
  }


      


</>
  )
}

export default Home