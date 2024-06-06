import {useState} from "react";
import QuizAnswer from "./QuizAnswer/index.jsx";
import Button from "../../../../components/Button/index.jsx";

function QuizQuestion({id, number, question, hint, answers, cb}) {
    const [hintActive, setHintActive] = useState(false)
    const showHint = () => {
        setHintActive(!hintActive)
    }

    return (
        <div className='mb-5 w-full'>
            <div className='mb-2 flex justify-between items-center'>
                <span className='text-xl'>{number}) {question}</span>

                {hint && (
                    <Button action={showHint}>
                        {hintActive ? 'Hide hint' : 'Show hint'}
                    </Button>
                )}
            </div>
            {hintActive && <div className='bg-green-100 p-5'>{hint}</div>}

            {answers.map(answer => <QuizAnswer key={answer.id} id={answer.id} question={id} answer={answer.answer} cb={cb} />)}
        </div>

    )
}

export default QuizQuestion