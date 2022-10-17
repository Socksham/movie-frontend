import React, { useState } from 'react'

const UploadImage = ({file, setFile}) => {

    const handleChange = (e) => {
        console.log(e.target.files[0])
        console.log(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }

    return (
        <div>
            <input type="file" onChange={handleChange} />
        </div>
    )
}

export default UploadImage