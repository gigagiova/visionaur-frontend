import { useState, useRef, useEffect } from 'react'
import ReactCrop from 'react-image-crop'
import { useSelector } from 'react-redux'
import blank from '../assets/blank.png'
import '../styles/page.css'
import '../styles/profile.css'
import '../styles/image-crop.css'
import '../styles/popup.css'


const ProfileSetup = () => {
    
    const [selectedPicture, setSelectedPicture] = useState(null)
    const [username, setUsername] = useState('username')
    const [bio, setBio] = useState('')

    const [popup, setPopup] = useState(false)
    const [crop, setCrop] = useState({ aspect: 1 / 1 })
    const [completedCrop, setCompletedCrop] = useState(null)
    const previewCanvasRef = useRef(null)
    const imgRef = useRef(null)
    
    const user = useSelector(state => state.user)

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

    const generateDownload = () => {
    if (!completedCrop || !previewCanvasRef) {
        return;
    }
    
    previewCanvasRef.current.toBlob(
        (blob) => {
            const previewUrl = URL.createObjectURL(blob)
        
            const anchor = document.createElement('a')
            anchor.download = 'cropPreview.png'
            anchor.href = URL.createObjectURL(blob)
            console.log(blob)
        
            URL.revokeObjectURL(previewUrl);
        },
            'image/png',
            1
    );
    }

    const onImageLoaded = image => {
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
    }

    return (
        <div className="page">
            <form>
                {selectedPicture ? (
                        <canvas
                        ref={previewCanvasRef}
                        className="profile-picture"
                        />
                    ) : (
                        <img alt='profile' className="profile-picture" src={blank}/>
                    )}
                <label className="input-file">
                    Change profile image
                    <input type="file" name="picture" style={{display: "none"}} accept=".png, .jpg, .jpeg" onChange={handleFileInput}/>
                </label>
                <h1 style={{margin: "0"}}>{user.first_name} {user.last_name}</h1>
                <input className="profile-input" type="text" value={username} onChange={e => setUsername(e.target.value)}></input>
                <textarea value={bio} onChange={e => setBio(e.target.value)} style={{}} maxLength="256" placeholder="write something about you"/>
            </form>
            {popup && (
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
                </div>
                )}
        </div>
    )
}

export default ProfileSetup