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

function DocumentEditWindow({ node }){
    //contains the name, description, and progress of the goal
    return (<div key={node.id} className='editWindow'> {node.data.label ?? ''}  </div>)
}

export { DocumentEditBar, DocumentEditButton, DocumentEditWindow };