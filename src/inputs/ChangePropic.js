import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import reactDom from "react-dom"
import ReactCrop from 'react-image-crop'
import blank from '../assets/blank.png'
import { mediaBaseURL } from '../API/utils'

const ChangePropic = props => {
    
    const [popup, setPopup] = useState(false)
    
    const [selectedPicture, setSelectedPicture] = useState(null)
    const [crop, setCrop] = useState({ aspect: 1 / 1 })
    const [completedCrop, setCompletedCrop] = useState(null)

    const previewCanvasRef = useRef(null)
    const imgRef = useRef(null)
    const user = useSelector(state => state.user.user)

    const [defaultImage, setDefaultImage] = useState(blank)

    useEffect(() => {
        if (user?.profile_pic) {
            setDefaultImage(mediaBaseURL + user.profile_pic)
        }
    }, [user])

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
          return;
        }
    
        const image = imgRef.current
        const canvas = previewCanvasRef.current
        const crop = completedCrop
    
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        const ctx = canvas.getContext('2d')
        const pixelRatio = window.devicePixelRatio
    
        canvas.width = crop.width * pixelRatio
        canvas.height = crop.height * pixelRatio
    
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        ctx.imageSmoothingQuality = 'high'
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        )
    }, [completedCrop])

    const onImageLoaded = image => {
        // creates an initial crop area
        imgRef.current = image
        const minSize = image.width < image.height ? image.width : image.height
        const newCrop = { x: 0, y: 0, width: minSize, height: minSize, aspect: 1 / 1 }
        setCompletedCrop(newCrop)
        setCrop(newCrop)
        return false
    }

    const handleFileInput = async (e) => {
        // handle validations
        const file = e.target.files[0]
        if (file) {
            setSelectedPicture(URL.createObjectURL(file))
            setPopup(true)
        }
    }

    const handleSetImage = e =>{
        e.preventDefault()
        setPopup(false)

        if (!completedCrop || !previewCanvasRef) {
            return
        }
    
        previewCanvasRef.current.toBlob(
            (blob) => {
                props.setBlob(blob)
                console.log(blob)
            },
            'image/png',
            1
        )

    }

    return (
        <div>
            {selectedPicture ? (
                <canvas
                ref={previewCanvasRef}
                className="profile-picture"
                />
            ) : (
                <img alt='profile' className="profile-picture" src={defaultImage}/>
            )}
            <label className="input-file">
                Change profile image
                <input type="file" name="picture" style={{display: "none"}} accept=".png, .jpg, .jpeg" onChange={handleFileInput}/>
            </label>
            {popup && (
                <>
                    {reactDom.createPortal(
                        <div className="overlay">
                            <div className="set-image-background" style={{textAlign: "center"}}>
                                <ReactCrop 
                                src={selectedPicture} 
                                crop={crop} 
                                onImageLoaded={onImageLoaded} 
                                onChange={c => setCrop(c)}
                                onComplete={(c) => setCompletedCrop(c)}/>
                                <button onClick={handleSetImage}>Set image</button>
                            </div>
                        </div>,
                        document.getElementById('portal')
                    )}
                </>
            )}
        </div>
    )
}

export default ChangePropic