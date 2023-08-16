import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Todo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({ title: "", description: "" }); // Utilisez un objet pour stocker les erreurs

    const history = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const todo = { title, description };

        fetch('http://127.0.0.1:8000/api/v1/todos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(todo)
        }).then(async response => {
            if (!response.ok) {
                const validation = await response.json();
                setErrors(validation.errors);
                console.log(validation.errors);
            } else {
                history('/categories');
            }
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setErrors({ ...errors, title: null }); // Réinitialisez l'erreur spécifique lorsque l'utilisateur change le champ
                    }}
                />
                {errors.title && ( // Vérifiez s'il y a une erreur spécifique pour ce champ
                    <span>{errors.title}</span>
                )}
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setErrors({ ...errors, description: null }); // Réinitialisez l'erreur spécifique lorsque l'utilisateur change le champ
                    }}
                />
                {errors.description && ( // Vérifiez s'il y a une erreur spécifique pour ce champ
                    <span>{errors.description}</span>
                )}
                <button type="submit"> Submit </button>
            </form>
        </>
    );
}
