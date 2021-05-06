import React, { useRef } from 'react'
import { Button } from '@material-ui/core'

const FileUpload = ({onFileSelectSuccess, onFileSelectError}) => {
    const fileInput = useRef(null)
    
    const handleFileInput = (e) => {
        const image = e.target.files[0];
        if (image.size > 3072000) {
            onFileSelectError({error: 'Image size cannot exceed more than 3MB'})
        } else {
            onFileSelectSuccess(image)
        }
    }

    return (
        <div className='file-uploader'>
            <input type='file' id='image' accept='.jpg, .jpeg, .png' onChange={handleFileInput} />
            <Button onClick={e => fileInput.current && fileInput.current.click()} />
        </div>
    )
}

export default FileUpload
