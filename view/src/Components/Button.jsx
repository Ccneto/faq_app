import React from 'react'

function Button(props) {

    const {name, title, onClick} = props
    
    return (
        <button title={title} onClick={onClick}>{name}</button>
    )
}

export default Button