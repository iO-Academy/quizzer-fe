import QuizQuestion from "./QuizQuestion/index.jsx";
import {useState} from "react";
import Button from "../../../components/Button/index.jsx";
import clone from "../../../functions/clone.js";
import H2 from "../../../components/Text/H2/index.jsx";
import Error from "../../../components/Error/index.jsx";
import handleResponse from "../../../functions/response.js";

function QuestionDisplay({id, questions}) {
    const [selectedAnswers, setSelectedAnswers] = useState([])
    const [results, setResults] = useState(false)
    const [resultsError, setResultsError] = useState(false)

    const alreadySelected = (answers, questionId, answerId) => {
        let answered = false
        answers.forEach((answer, key) => {
            if (answer.question === questionId && answer.answer === answerId) {
                answered = key
            }
        })
        return answered
    }
    const answer = (questionId, answerId) => {
        const selectedAnswersCopy = clone(selectedAnswers)

        const alreadyAnswered = alreadySelected(selectedAnswersCopy, questionId, answerId)

        if (alreadyAnswered !== false) {
            selectedAnswersCopy.splice(alreadyAnswered, 1)
        } else {
            selectedAnswersCopy.push({
                question: questionId,
                answer: answerId
            })
        }

        setSelectedAnswers(selectedAnswersCopy)
    }

    const submit = () => {
        fetch(`http://localhost:8000/api/scores`, {
            method: 'POST',
            body: JSON.stringify({
                quiz: parseInt(id),
                answers: selectedAnswers
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then(handleResponse)
            .then(data => {
                setResults(data.data)
                setResultsError(false)
            })
            .catch(e => {
                setResultsError(true)
            })
    }

    return (
        <section>
            {results === false ? (
                <div className='w-3/4 mx-auto flex flex-col items-center border p-5 rounded'>
                {questions.map((question, key) => (
                    <QuizQuestion
                        key={question.id}
                        id={question.id}
                        number={key + 1}
                        question={question.question}
                        hint={question.hint}
                        answers={question.answers}
                        cb={answer}
                    />
                    ))}
                    <Button action={submit}>Submit</Button>
                </div>
            ) : (
                <div>
                    <H2>Results</H2>
                    <p>{results.correct_count} / {results.question_count} correct</p>
                    <p>{results.points} / {results.available_points} points</p>
                </div>
            )}

            {
                resultsError &&
                <Error text={"Unable to calculate results"} />
            }

        </section>
    )
}

export default QuestionDisplay
