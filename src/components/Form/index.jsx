import H3 from "../Text/H3/index.jsx";

function Form({children, title = '', closer = false}) {
    return (
        <div className='border p-2 relative'>
            {title !== '' && <H3>{title}</H3>}
            { closer && <div className='bg-amber-300 hover:bg-amber-400 absolute top-0 right-0 w-6 h-6 flex justify-center items-center cursor-pointer' onClick={closer}>x</div>}
            <div className='flex justify-between items-center gap-2'>
                {children}
            </div>
        </div>

    )
}

export default Form