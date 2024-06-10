import Button from "../../../components/Button/index.jsx";
import {useState} from "react";
import AddAnswer from "../AddAnswer/index.jsx";
import EditableAnswer from "../EditableAnswer/index.jsx";
import Form from "../../../components/Form/index.jsx";
import TextInput from "../../../components/Form/TextInput/index.jsx";
import NumberInput from "../../../components/Form/NumberInput/index.jsx";
import Error from "../../../components/Error/index.jsx";
import handleResponse from "../../../functions/response.js";

function EditableQuestion({id, number, question, hint, points, answers, refresh}) {
    const [editing, setEditing] = useState(false)
    const [addingAnswer, setAddingAnswer] = useState(false)
    const [editingQuestionDetails, setEditingQuestionDetails] = useState(false)
    const [editingQuestionError, setEditingQuestionError] = useState(false)
    const [deleteQuestionError, setDeleteQuestionError] = useState(false)

    const [editedQuestion, setEditedQuestion] = useState(question)
    const [editedHint, setEditedHint] = useState(hint)
    const [editedPoints, setEditedPoints] = useState(points)

    const deleteQuestion = () => {
        fetch(`http://localhost:8000/api/questions/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(handleResponse)
            .then(data => {
                refresh()
                setDeleteQuestionError(false)
            })
            .catch(e => {
                setDeleteQuestionError(true)
            })
    }

    const editQuestion = () => {
        const data = {
            question: editedQuestion,
            points: editedPoints
        }

        if (editedHint !== '') {
            data.hint = editedHint
        }

        fetch(`http://localhost:8000/api/questions/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(handleResponse)
            .then(data => {
                refresh()
                setEditedQuestion(question)
                setEditedHint(hint)
                setEditedPoints(points)
                setEditingQuestionDetails(false)
                setEditingQuestionError(false)
            })
            .catch(e => {
                setEditingQuestionError(true)
            })
    }

    return (
        <div className='border rounded mb-5'>
            <div className='flex justify-between p-5 bg-gray-200'>
                <div className='flex flex-col gap-2'>
                    <span className='text-xl'>{number}) {question}</span>
                    {hint && <span>Hint: {hint}</span>}
                </div>

                <div className='flex gap-2 items-center'>
                    <Button action={() => setEditing(!editing)}>
                        {editing ? 'Cancel' : 'Edit'}
                    </Button>
                    <Button action={deleteQuestion} colour='red'>Delete</Button>
                </div>
            </div>
            {editing && (
                <div className='p-5'>
                    <div className='flex gap-2 mb-2'>
                        <Button action={() => {
                            setAddingAnswer(!addingAnswer)
                            setEditingQuestionDetails(false)
                        }}>Add answer</Button>
                        <Button action={() => {
                            setEditingQuestionDetails(!editingQuestionDetails)
                            setAddingAnswer(false)
                        }}>Edit question</Button>
                    </div>
                    {
                        deleteQuestionError &&
                        <Error text={"Unable to delete question"} />
                    }

                    {addingAnswer && <AddAnswer question_id={id} refresh={refresh} closer={() => setAddingAnswer(false)}/>}

                    {editingQuestionDetails && (
                        <>
                        <Form title='Edit question' closer={() => setEditingQuestionDetails(false)}>
                            <TextInput name='question' label='Question' value={editedQuestion}
                                       setter={setEditedQuestion}/>
                            <TextInput name='hint' label='Hint' value={editedHint} setter={setEditedHint}/>
                            <NumberInput name='points' label='Points' value={editedPoints} setter={setEditedPoints}/>

                            <Button action={editQuestion}>Submit</Button>
                        </Form>
                            {
                                editingQuestionError &&
                                <Error text={"Unable to edit question"} />
                            }
                        </>
                    )}

                    <div className='mt-5'>
                        {answers.map(answer => <EditableAnswer
                                key={answer.id}
                                id={answer.id}
                                answer={answer.answer}
                                correct={answer.correct}
                                refresh={refresh}
                            />
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default EditableQuestion