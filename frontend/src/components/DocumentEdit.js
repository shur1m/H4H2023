//component for editing the document
function DocumentEditBar({children}) {
    return (
        <div className='nodeEditBar'>
            { children }
        </div>
    )
}

//buttons within the menu
function DocumentEditButton({onClick, label}) {
    return (
        <button onClick= { onClick } >
            { label }
        </button>
    )
}

export { DocumentEditBar, DocumentEditButton };