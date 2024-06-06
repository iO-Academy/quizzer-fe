function NumberInput({label, name, value, setter}) {
    return (
        <label htmlFor={name} className='flex-1 flex'>{label}
            <input className='border ml-2 flex-1' type='number' id={name} value={value} min='1'
                   onChange={e => setter(e.target.value)}/>
        </label>
    )
}

export default NumberInput