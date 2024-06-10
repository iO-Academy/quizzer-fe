import {useEffect, useState} from "react";
import SingleQuiz from "./SingleQuiz/index.jsx";
import Container from "../../components/Container/index.jsx";
import H1 from "../../components/Text/H1/index.jsx";
import Button from "../../components/Button/index.jsx";
import Form from "../../components/Form/index.jsx";
import TextInput from "../../components/Form/TextInput/index.jsx";
import Error from "../../components/Error/index.jsx";
import handleResponse from "../../functions/response.js";

function HomePage() {
    const [quizzes, setQuizzes] = useState([]);
    const [quizError, setQuizError] = useState(false);

    const [addingQuiz, setAddingQuiz] = useState(false)
    const [addingQuizError, setAddingQuizError] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const getQuizzes = () => {
        fetch('http://localhost:8000/api/quizzes')
            .then(handleResponse)
            .then(data => {
                setQuizzes(data.data)
            })
            .catch(e => {
                setQuizError(true)
            })
    }

    useEffect(getQuizzes, [])

    const addQuiz = () => {
        fetch(`http://localhost:8000/api/quizzes`, {
            method: 'POST',
            body: JSON.stringify({
                name: title,
                description
            }),
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
        })
            .then(handleResponse)
            .then(data => {
                getQuizzes()
                setAddingQuiz(false)
                setAddingQuizError(false)
            })
            .catch(e => {
                setAddingQuizError(true)
            })
    }

    return (
        <Container>
            <div className='flex justify-between items-center'>
                <H1>Available Quizzes</H1>
                <Button action={() => setAddingQuiz(!addingQuiz)}>Add quiz</Button>
            </div>

            {addingQuiz && (
                <>
                <Form title='Add quiz'>
                    <TextInput name='title' label='Title' value={title} setter={setTitle}/>
                    <TextInput name='description' label='Description' value={description} setter={setDescription}/>
                    <Button action={addQuiz}>Submit</Button>
                </Form>
                {
                    addingQuizError &&
                    <Error text={"Unable to add Quiz"} />
                }
                </>
            )}


            {
                quizError &&
                <Error text={"Unable to retrieve Quizzes"} />
            }
            {quizzes.map(quiz => <SingleQuiz
                key={quiz.id}
                id={quiz.id}
                name={quiz.name}
                description={quiz.description}
            />)}
        </Container>
    )
}

export default HomePage