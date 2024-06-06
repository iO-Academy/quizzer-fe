function QuizAnswer({id, answer, question, cb}) {
    return (
        <div className='flex items-center'>
            <input type='checkbox' id={'answer' + id} className='mr-2' onChange={(e) => {
                e.stopPropagation()
                cb(question, id)
            }} />
            <label htmlFor={'answer' + id}>{answer}</label>
        </div>
    )
}

export default QuizAnswer