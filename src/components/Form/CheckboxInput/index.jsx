function CheckboxInput({label, name, value, setter}) {
    return (
        <label htmlFor={name} className='flex-1 flex'>{label}
            <input className='ml-2' type='checkbox' id={name} checked={value} onChange={() => setter(!value)}/>
        </label>
    )
}

export default CheckboxInput