function Container({classes, children}) {
    return (
        <div className={'container mx-auto ' + classes}>
            {children}
        </div>
    )
}

export default Container