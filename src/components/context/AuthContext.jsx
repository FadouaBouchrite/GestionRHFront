import { createContext,useContext ,useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AuthContext=createContext({});

export const AuthProvider=({children})=>{
  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
 
const [user,setUser]=useState(initialUser);
const [message, setMessage] = useState('');

const history=useNavigate();
const [errors,setErrors]=useState([]);
useEffect(() => {
  const timer = setTimeout(() => {
    setMessage('');
  }, 1000); // 5000 ms = 5 secondes

  // Nettoyage du timer lorsque le composant est démonté
  return () => clearTimeout(timer);
}, [message]);



const logout=()=>{



localStorage.removeItem('user');
setUser(null);

}
const login=async({email,password})=>{


  const user = { email, password };

    
    fetch('http://127.0.0.1:8000/api/v1/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify(user)
      }).then(async response => {
        if (!response.ok) {
          const validation = await response.json();
          setErrors(validation.errors);
          console.log(validation.errors);
        } else {

          const data = await response.json();
          
          const mssg = data.status;
          if (data.status===1) {
            localStorage.setItem('user', JSON.stringify(data.user)); // Sauvegarder la valeur de "user" dans le LocalStorage
                    

            history('/');
            setUser(data.user)
            setMessage(mssg);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'connection avec succes',
              showConfirmButton: false,
              timer: 1500
            });
            
            // Authentification réussie, faites ce que vous souhaitez ici
          } else {
          
            history('/login');
            setMessage(mssg);
            Swal.fire({
              icon: 'error',
              title: data.message,
              text: 'Something went wrong!',
            
            })
            // Authentification échouée, gérer l'erreur
          }
        }
      })






}
return <AuthContext.Provider value={{user,login,errors,message,logout}}>

{children}

</AuthContext.Provider>
}


export default function useAuthContext(){

return useContext(AuthContext); 

}










