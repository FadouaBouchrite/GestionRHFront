

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// import {
// Chart as ChartJS,
// LineElement,
// CategoryScale,
// LinearScale,
// PointElement,
// Tooltip,
// Legend

// }from 'chart.js'
// import {Line} from 'react-chartjs-2';
// ChartJS.register(
    
//     LineElement,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     Tooltip,
//     Legend


// );
// import useAuthContext from "../context/AuthContext";

// const Graphe = () => {
//   const { user } = useAuthContext();
//   const empId = user.id;
//   const [attendanceData, setAttendanceData] = useState([]);
// const [label,setLabel]=useState([]);
// const [donne,setDonne]=useState([]);
//   useEffect(() => {
//     fetchAttendanceData();
//   }, [empId]);

//   const fetchAttendanceData = async () => {
//     try {
//       const response = await axios.get(`http://127.0.0.1:8000/api/v1/attendance/${empId}`);
//       setDonne(response.data);
//       const dataHours = response.data.map(item => {
//         const timeParts = item.total_hours.split(':');
//         const hours = parseInt(timeParts[0]);
//         const minutes = parseInt(timeParts[1]);
//         return hours + minutes / 60; // Convert to decimal hours
//       });
//       setAttendanceData(dataHours);
//     } catch (error) {
//       console.log(error);
//     }
//   };

 

//   const labels = donne.map(item => item.date);

//   const data = {
//     labels: labels, // Utiliser les dates comme étiquettes x
//     datasets: [
//       {
//         label: "Heures d'assiduité",
//         data: attendanceData,
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//         tension: 0.4,
//       },
//     ],
//   };

//   const options = {};

//   return (
//     <>
//       <div>Graphe</div>
//       <div>
//         <Line data={data} options={options} />
//       </div>
//     </>
//   );
// };

// export default Graphe;





















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);
import useAuthContext from "../context/AuthContext";

const Graphe = () => {
    const { user } = useAuthContext();
    const empId = user.id;
    const [attendanceData, setAttendanceData] = useState([]);
    const [label, setLabel] = useState([]);
    const [donne, setDonne] = useState([]);
    useEffect(() => {
        fetchAttendanceData();
    }, [empId]);

    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/attendance/${empId}`);
            console.log(response);
            setDonne(response.data);
            const dataHours = response.data.map(item => {
                const timeParts = item.total_hours.split(':');
                const hours = parseInt(timeParts[0]);
                const minutes = parseInt(timeParts[1]);
                const totalHours = hours + minutes / 60; // Convert to decimal hours
                return totalHours >= 0 ? totalHours : 0; // Ensure non-negative values
            });
            setAttendanceData(dataHours);
        } catch (error) {
            console.log(error);
        }
    };

    const labels = donne.map(item => item.date);

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Heures d'assiduité",
                data: attendanceData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                tension: 0.4,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true // Démarre l'axe Y à 0
            }
        }
    };

    return (
        <>
            <div>Graphe</div>
            <div>
                <Line data={data} options={options} />
            </div>
        </>
    );
};

export default Graphe;








