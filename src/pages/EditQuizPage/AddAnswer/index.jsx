import {useState} from "react";
import Button from "../../../components/Button/index.jsx";
import Form from "../../../components/Form/index.jsx";
import TextInput from "../../../components/Form/TextInput/index.jsx";
import CheckboxInput from "../../../components/Form/CheckboxInput/index.jsx";
import Error from "../../../components/Error/index.jsx";

function AddAnswer({question_id, refresh, closer}) {
    const [answer, setAnswer] = useState('')
    const [correct, setCorrect] = useState(false)
    const [error, setError] = useState(false)

    const add = () => {
        fetch(`http://localhost:8000/api/answers`, {
            method: 'POST',
            body: JSON.stringify({
                answer,
                correct,
                question_id
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                refresh()
                setAnswer('')
                setCorrect(false)
                setError(false)
            })
            .catch(e => {
                setError(true)
            })
    }

    return (
        <>
        <Form title='Add answer' closer={closer}>
            <TextInput name='answer' label='Answer' value={answer} setter={setAnswer} />
            <CheckboxInput name='correct' label='Correct' value={correct} setter={setCorrect} />
            <Button action={add}>Add</Button>
        </Form>
        {
            error &&
            <Error text={"Unable to add answer"} />
        }
        </>
    )
}

export default AddAnswer