import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import QuestionDisplay from "./QuestionDisplay/index.jsx";
import H1 from "../../components/Text/H1/index.jsx";
import Container from "../../components/Container/index.jsx";
import Error from "../../components/Error/index.jsx";

function QuizPage() {
    const {id} = useParams();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [questions, setQuestions] = useState([])
    const [quizError, setQuizError] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:8000/api/quizzes/${id}`)
            .then(res => res.json())
            .then(data => {
                setName(data.data.name)
                setDescription(data.data.description)
                setQuestions(data.data.questions)
            })
            .catch(e => {
                setQuizError(true)
            })
    }, [id])

    return (
        <Container>
            {
                quizError &&
                <Error text={"Unable to get Quiz"} />
            }
            <div className='border p-5 rounded mb-10'>
                <H1>{name}</H1>
                <p>{description}</p>
            </div>

            <QuestionDisplay id={id} questions={questions} />
        </Container>
    )
}

export default QuizPage