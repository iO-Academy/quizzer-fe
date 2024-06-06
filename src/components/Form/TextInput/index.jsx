function TextInput({label, name, value, setter}) {
    return (
        <label htmlFor={name} className='flex-1 flex'>{label}
            <input className='border ml-2 flex-1' type='text' id={name} value={value}
                   onChange={e => setter(e.target.value)}/>
        </label>
    )
}

export default TextInput