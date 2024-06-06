import Button from "../../../components/Button/index.jsx";
import {useState} from "react";
import Form from "../../../components/Form/index.jsx";
import TextInput from "../../../components/Form/TextInput/index.jsx";

function EditableAnswer({id, answer, correct, refresh}) {
    const [editing, setEditing] = useState(false)
    const [editAnswer, setEditAnswer] = useState(answer)
    const [editCorrect, setEditCorrect] = useState(correct == 1)

    const edit = () => {
        fetch(`http://localhost:8000/api/answers/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                answer: editAnswer,
                correct: editCorrect
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                refresh()
                setEditing(false)
            })
    }
    const deleteAnswer = () => {
        fetch(`http://localhost:8000/api/answers/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                refresh()
            })
    }

    return (
        <div className='mb-2 flex justify-between items-center'>
            <div>{answer} {correct ? <span className='text-green-600'>✓</span> :
                <span className='text-red-600'>x</span>}</div>

            {editing && (
                <Form>

                    <TextInput name='answer' label='Answer' value={editAnswer} setter={setEditAnswer} />


                    <label htmlFor='correct'>Correct</label>
                    <input type='checkbox' id='correct' checked={editCorrect} onChange={() => setEditCorrect(!editCorrect)}/>
                    <Button action={edit}>Submit</Button>
                </Form>
            )}

            <div className='flex gap-2'>
                <Button action={() => setEditing(!editing)}>Edit</Button>
                <Button action={deleteAnswer} colour='red'>Delete</Button>
            </div>
        </div>
    )
}

export default EditableAnswer