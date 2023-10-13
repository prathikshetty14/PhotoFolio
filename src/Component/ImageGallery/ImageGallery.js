import { useEffect, useState } from "react";
import ImageForm from "../ImageForm/ImageForm";
import Image from "../ImageContainer/ImageContainer";
import styles from "./imageGallery.module.css"
import { db } from "../../firebaseInit";
import { doc, updateDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function ImageList(props){

    // Destructure props
    const {openAlbum,setOpenAlbum}=props;

    // State variables
    const [showImageForm,setShowImageForm]=useState(false);
    const [updateImage,setUpdateImage]=useState(null);
    const [imageList,setImageList]=useState([]);
    const [search,setSearch]=useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to handle going back to the album list
    function handleBackClick(e){
        e.preventDefault();
        setOpenAlbum({albumId:"",show:false});
    }

    // UseEffect to fetch image data from the Firestore database
    useEffect(()=>{
        onSnapshot(doc(db, "photofolio",openAlbum.albumId), (doc) => {
            const data=doc.data().imageList;      
            setImageList(data);
        });
    },[]);

    // Function to handle image deletion
    async function handleImageDelete(image){
        const albumRef = doc(db, 'photofolio', openAlbum.albumId);
        await updateDoc(albumRef,{
            imageList:arrayRemove(image)
        });
        toast.success("Image Successfully Deleted from your Album!");
    }

    // Function to handle image editing
    function handleImageEdit(image){
        setUpdateImage(image);
        setShowImageForm(true);
    }

    // Function to open the lightbox and display an image
    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setIsOpen(true);
    };

    // Function to close the lightbox
    const closeLightbox = () => {
        setIsOpen(false);
    };

    return(
        <>
            <ToastContainer />
            {/* Button Container */}
            <div className={styles.btnContainer}>
                {/* Back Button */}
                <button className={`${styles.btn} ${styles.backBtn}`} 
                        onClick={handleBackClick}>Back
                </button>

                {/* Image Search Input */}
                <input type="text" 
                        placeholder="Search Image..." 
                        onChange={(e)=> setSearch(e.target.value)} />
                
                {/* Add Image / Cancel Button */}
                <button className={`${styles.btn} ${styles.addBtn}`} 
                        onClick={()=>setShowImageForm(!showImageForm)}>
                            {!showImageForm?"Add Image":"Cancel"}
                </button>
            </div>

            {/* Form to Add Image */}
            <div style={{textAlign:"center"}}>
                {showImageForm && <ImageForm albumId={openAlbum.albumId} 
                                            updateImage={updateImage}
                                            setUpdateImage={setUpdateImage}
                                            setShowImageForm={setShowImageForm} />}

                {/* Display heading based on whether there are images in the album */}
                <h1>{imageList.length !== 0 ?"Your Collection":"No Images in Your Collection"}</h1>
            </div>
                
            {/* Looping over each image in list and showing them within a box */}
            <div className={styles.imageList}>
                {/* Filter images based on the search input */}
                {imageList.filter((image) => {
                    return search.toLocaleLowerCase() === ''
                    ? image
                    :image.name.toLocaleLowerCase().includes(search);

                    // Map through each image and display them in a card
                }).map((image,i) => <Image image={image} 
                                                key={i}
                                                index={i}
                                                handleImageEdit={handleImageEdit} 
                                                handleImageDelete={handleImageDelete} 
                                                openLightbox={openLightbox}
                                                />)}
            </div>

            {/* Display lightbox if an image is clicked */}            
            {isOpen && (

                // Lightbox container
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <div className="lightbox-container">

                        {/* Lightbox Close button */}
                        <button className="close-button" onClick={closeLightbox}>
                            Close
                        </button>

                        {/* Image inside the lightbox */}
                        <img
                            className="lightbox-image"
                            src={imageList[currentImageIndex].link}
                            alt={`Image ${currentImageIndex}`}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

                    