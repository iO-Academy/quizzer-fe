function Error({text}) {
    return (
        <div className={"border rounded border-rose-500 bg-red-300 text-black p-3 my-3 d-block"}>
            Error: {text}
        </div>
    )
}

export default Error