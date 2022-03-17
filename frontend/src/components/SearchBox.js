import React from 'react'

function SearchBox(props) {
    return (
        <div>
            <input type="text" placeholder={props.placeholder} onChange={props.handleChange}></input>
            {console.log(props)}
        </div>

    )
}

export default SearchBox
