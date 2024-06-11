import H2 from "../../../components/Text/H2/index.jsx";
import {useState} from "react";
import Button from "../../../components/Button/index.jsx";
import Form from "../../../components/Form/index.jsx";
import TextInput from "../../../components/Form/TextInput/index.jsx";
import NumberInput from "../../../components/Form/NumberInput/index.jsx";
import Error from "../../../components/Error/index.jsx";
import handleResponse from "../../../functions/response.js";

function AddQuestion({quizId, refresh, closer}) {
    const [question, setQuestion] = useState('')
    const [hint, setHint] = useState('')
    const [points, setPoints] = useState(1)
    const [error, setError] = useState(false)

    const add = () => {
        const data = {
            question,
            points,
            quiz_id: parseInt(quizId),
        }

        if (hint !== '') {
            data.hint = hint
        }

        fetch(`http://localhost:8000/api/questions`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then(handleResponse)
            .then(data => {
                refresh()
                setError(false)
                setQuestion('')
                setHint('')
                setPoints(1)
            })
            .catch(e => {
                setError(true)
            })
    }


    return (
        <div className='mb-5'>
            <Form title='Add question' closer={closer}>
                <TextInput name='question_name' label='Question' value={question} setter={setQuestion} />

                <NumberInput name='question_points' label='Points' value={points} setter={setPoints} />

                <TextInput name='question_hint' label='Hint' value={hint} setter={setHint} />

                <Button action={add}>Add</Button>
            </Form>
            {
                error &&
                <Error text={"Unable to add question"} />
            }
        </div>
    )
}

export default AddQuestion
