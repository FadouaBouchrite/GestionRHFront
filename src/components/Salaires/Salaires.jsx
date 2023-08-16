import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { PDFDocument, rgb ,StandardFonts} from 'pdf-lib';
import { saveAs } from 'file-saver';
import './Salaires.css';
const Salaires = () => {
    const [salaryList, setSalaryList] = useState([]);

    const getSalary = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/getEmployeeInfo`);
            if (!response.ok) {
                console.log(response.errors);
            } else {
                const data = await response.json();
                setSalaryList(data); // Utilisez simplement 'data' ici
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleGeneratePDF = async (employeeName, totalHoursWorked, currentSalary) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
    
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        
        const headerText = `Fiche de paie pour ${employeeName}`;
        const hoursText = `Heures travaillées : ${totalHoursWorked} heures`;
        const salaryText = `Salaire : ${currentSalary} Dh`;
    
        page.drawText(headerText, {
          x: 50,
          y: page.getSize().height - 50,
          font: font,
          size: 20,
          color: rgb(0, 0, 0),
        });
    
        page.drawText(hoursText, {
          x: 50,
          y: page.getSize().height - 100,
          font: font,
          size: 14,
          color: rgb(0, 0, 0),
        });
    
        page.drawText(salaryText, {
          x: 50,
          y: page.getSize().height - 140,
          font: font,
          size: 14,
          color: rgb(0, 0, 0),
        });
    
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, `fiche_de_paie_${employeeName}.pdf`);
      };









    useEffect(() => {
        getSalary();
    }, []);

    return (
        <section class="section">
        <div class="container" style={{ textAlign: 'center' }}>
          <table class="" style={{ margin: '0 auto' }}>
            <thead>
              <tr className='' style={{ backgroundColor: '#695aa6' }}>
                <th scope='col'>Id</th>
                <th scope='col'>Nom Complet</th>
                <th scope='col'>Heure travailler</th>
                <th scope='col'>Salaire</th>
              </tr>
            </thead>
            <tbody>
              {salaryList.map(item => (
                <tr key={item.id}>
                  <th scope='row'>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.totalHoursWorked}</td>
                  <td>{item.currentSalary}</td>
                  <td>
                    <button
                      className={item.totalHoursWorked === '0.00' ? 'red-button' : 'green-button'}
                      disabled={item.totalHoursWorked === '0.00'}
                      onClick={() => handleGeneratePDF(item.name, item.totalHoursWorked, item.currentSalary)}
                    >
                      Générer la fiche de paie
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
    );
}

export default Salaires;
