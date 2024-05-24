import {useEffect, useState} from "react";
import SingleQuiz from "./SingleQuiz/index.jsx";

function QuizListing() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/quizzes')
            .then(res => res.json())
            .then(data => {
                setQuizzes(data.data)
            })
    }, [])

    return (
        <>
            {quizzes.map(quiz => <SingleQuiz
                key={quiz.id}
                id={quiz.id}
                name={quiz.name}
                description={quiz.description}
            />)}
        </>
    )
}

export default QuizListing