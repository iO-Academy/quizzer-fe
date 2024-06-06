function Button({action, children, colour = 'green', active = false}) {
    return (
        <button className={`bg-${colour}-300 hover:bg-${colour}-400 inline-block px-2 py-1` + (active ? ' brightness-75' : '')} onClick={action}>
            {children}
        </button>
    )
}

export default Button