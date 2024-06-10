import {useParams} from "react-router-dom";
import Container from "../../components/Container/index.jsx";
import {useEffect, useState} from "react";
import H2 from "../../components/Text/H2/index.jsx";
import AddQuestion from "./AddQuestion/index.jsx";
import EditableQuestion from "./EditableQuestion/index.jsx";
import Button from "../../components/Button/index.jsx";
import Form from "../../components/Form/index.jsx";
import TextInput from "../../components/Form/TextInput/index.jsx";
import Error from "../../components/Error/index.jsx";
import handleResponse from "../../functions/response.js";

function EditQuizPage() {
    const {id} = useParams()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [questions, setQuestions] = useState([])
    const [quizError, setQuizError] = useState(false)

    const [editingQuiz, setEditingQuiz] = useState(false)
    const [addingQuestion, setAddingQuestion] = useState(false)
    const [editingError, setEditingError] = useState(false)

    const [editedName, setEditedName] = useState(name)
    const [editedDescription, setEditedDescription] = useState(description)

    const editQuiz = () => {
        fetch(`http://localhost:8000/api/quizzes/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: editedName,
                description: editedDescription
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(handleResponse)
            .then(data => {
                getQuizData()
                setEditingQuiz(false)
                setEditingError(false)
            })
            .catch(e => {
                setEditingError(true)
            })
    }

    const getQuizData = () => {
        fetch(`http://localhost:8000/api/quizzes/${id}`)
            .then(handleResponse)
            .then(data => {
                setName(data.data.name)
                setEditedName(data.data.name)
                setDescription(data.data.description)
                setEditedDescription(data.data.description)
                setQuestions(data.data.questions)
                setQuizError(false)
            })
            .catch(e => {
                setQuizError(true)
            })
    }

    useEffect(getQuizData, [id])

    return (
        <Container>
            {
                quizError &&
                <Error text={"Unable to find quiz"} />
            }
            <div className='flex justify-between mb-5'>
                <H2>Editing {name}</H2>
                <div className='flex gap-2'>
                    <Button action={() => {
                        setEditingQuiz(!editingQuiz)
                        setAddingQuestion(false)
                    }} active={editingQuiz}>Edit quiz</Button>
                    <Button action={() => {
                        setAddingQuestion(!addingQuestion)
                        setEditingQuiz(false)
                    }} active={addingQuestion}>Add question</Button>
                </div>
            </div>

            <p className='mb-5'>{description}</p>

            {addingQuestion && <AddQuestion quizId={id} refresh={getQuizData} closer={() => setAddingQuestion(false)}/>}

            {editingQuiz && (
                <div className='mb-5'>
                    <Form title='Edit quiz' closer={() => setEditingQuiz(false)}>
                        <TextInput name='title' label='Title' value={editedName} setter={setEditedName}/>
                        <TextInput name='description' label='Description' value={editedDescription}
                                   setter={setEditedDescription}/>
                        <Button action={editQuiz}>Submit</Button>
                    </Form>
                    {
                        editingError &&
                        <Error text={"Unable to edit quiz"} />
                    }
                </div>

            )}

            {questions.map((question, key) => <EditableQuestion
                    key={question.id}
                    id={question.id}
                    number={key + 1}
                    question={question.question}
                    hint={question.hint}
                    points={question.points}
                    answers={question.answers}
                    refresh={getQuizData}
                />
            )}
        </Container>
    )
}

export default EditQuizPage