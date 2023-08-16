import React, { useState, useEffect } from 'react';
import useAuthContext from "../context/AuthContext";

const EntryExitTime = () => {
  const [isEntryDisabled, setIsEntryDisabled] = useState(true);
  const [isExitDisabled, setIsExitDisabled] = useState(true);
  const { user } = useAuthContext();
  const userId = user.id;

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 9 && currentHour < 20) {
      setIsEntryDisabled(false);
    }

    const currentDate = new Date().toLocaleDateString();
    const recordedAttendances = JSON.parse(localStorage.getItem('recordedAttendances')) || [];
    const hasRecordedEntry = recordedAttendances.some(attendance => attendance.userId === userId && attendance.date === currentDate && attendance.type === 'entry');
    const hasRecordedExit = recordedAttendances.some(attendance => attendance.userId === userId && attendance.date === currentDate && attendance.type === 'exit');

    setIsEntryDisabled(hasRecordedEntry);
    setIsExitDisabled(hasRecordedExit);

    // Vider le localStorage à minuit
    const clearLocalStorageAtMidnight = () => {
      const currentDate = new Date();
      const midnight = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);
      const timeUntilMidnight = midnight - currentDate;
      setTimeout(() => {
        localStorage.clear();
      }, timeUntilMidnight);
    };

    clearLocalStorageAtMidnight();

  }, []);

  const handleRecordEntry = () => {
    const currentDate = new Date().toLocaleDateString();

    if (!hasRecordedAttendance(userId, currentDate, 'entry')) {
      // Enregistrement de l'assiduité d'entrée ici (AJAX ou appel à l'API)

      // Enregistrement dans le localStorage
      setRecordedAttendance(userId, currentDate, 'entry');

      // Désactiver le bouton d'entrée
      setIsEntryDisabled(true);
    } else {
      alert('Vous avez déjà enregistré votre heure d\'entrée pour aujourd\'hui.');
    }
  };

  const handleRecordExit = () => {
    const currentDate = new Date().toLocaleDateString();

    if (!hasRecordedAttendance(userId, currentDate, 'exit')) {
      // Enregistrement de l'assiduité de sortie ici (AJAX ou appel à l'API)

      // Enregistrement dans le localStorage
      setRecordedAttendance(userId, currentDate, 'exit');

      // Désactiver le bouton de sortie
      setIsExitDisabled(true);
    } else {
      alert('Vous avez déjà enregistré votre heure de sortie pour aujourd\'hui.');
    }
  };

  return (
    <div>
      <h2>Enregistrer l'Heure d'Entrée et de Sortie</h2>
      <button
        onClick={handleRecordEntry}
        disabled={isEntryDisabled}
      >
        Enregistrer Heure d'Entrée
      </button>
      <button
        onClick={handleRecordExit}
        disabled={isExitDisabled}
      >
        Enregistrer Heure de Sortie
      </button>
    </div>
  );
};

// Vérifier si l'employé a déjà enregistré son assiduité pour la date donnée et le type donné (entry ou exit)
const hasRecordedAttendance = (userId, date, type) => {
  const recordedAttendances = JSON.parse(localStorage.getItem('recordedAttendances')) || [];
  return recordedAttendances.some(attendance => attendance.userId === userId && attendance.date === date && attendance.type === type);
};

// Enregistrer l'assiduité pour l'employé, la date donnée et le type donné (entry ou exit)
const setRecordedAttendance = (userId, date, type) => {
  const recordedAttendances = JSON.parse(localStorage.getItem('recordedAttendances')) || [];
  recordedAttendances.push({ userId, date, type });
  localStorage.setItem('recordedAttendances', JSON.stringify(recordedAttendances));
};

export default EntryExitTime;
