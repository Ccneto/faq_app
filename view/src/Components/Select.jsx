import React from 'react'


function Select(props) {
    const {id, db_entries, parentCallback} = props

    const handleValueChange = event => {
        parentCallback(event.currentTarget.value);
    }

    return (
        <select id={id} class="cbox" onChange={handleValueChange}>
            {
                db_entries.map((item) => (
                    <option>{item.faq_code}</option>
                ))
            }
        </select>
    )
}

export default Select
