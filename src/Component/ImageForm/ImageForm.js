import { useEffect, useRef } from "react";
import styles from "./imageForm.module.css";
import { db } from "../../firebaseInit";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ImageForm(props) {
    const { albumId, updateImage, setUpdateImage, setShowImageForm } = props;

    // References to input fields
    const imageNameRef = useRef();
    const imageUrlRef = useRef();

    // useEffect to pre-fill input fields if updating an image
    useEffect(() => {
        if (updateImage) {
            imageNameRef.current.value = updateImage.name;
            imageUrlRef.current.value = updateImage.link;
        }
    }, [updateImage]);

    // Function to clear the form input fields
    function clearFormData() {
        imageNameRef.current.value = null;
        imageUrlRef.current.value = null;
        imageNameRef.current.focus();
    }

    // Function to handle updating an image
    async function handleUpdateSubmit(e) {
        e.preventDefault();

        // Define old and new image data
        const oldImageData = {
            name: updateImage.name,
            link: updateImage.link
        };

        const newImageData = {
            name: imageNameRef.current.value,
            link: imageUrlRef.current.value
        };


        // Update the album data in the Firestore database
        const albumRef = doc(db, 'photofolio', albumId);
        updateDoc(albumRef, {
            imageList: arrayUnion(newImageData)
        });

        updateDoc(albumRef, {
            imageList: arrayRemove(oldImageData)
        });

        toast.success("Image Updated!");

        // Reset state and form input fields
        setUpdateImage(null);
        setShowImageForm(false);
        clearFormData();
    }

    // Function to handle adding a new image
    async function handleSubmit(e) {
        e.preventDefault();

        // Define new image data
        const imageData = {
            name: imageNameRef.current.value,
            link: imageUrlRef.current.value
        };

        // Update the album data in the Firestore database
        const albumRef = doc(db, 'photofolio', albumId);
        await updateDoc(albumRef, {
            imageList: arrayUnion(imageData)
        });

        toast.success("New Image Added to your Album!");

        clearFormData();
    }

    return (
        <>
            {/* Component for displaying notifications */}
            <ToastContainer />

            {/* Form Container */}
            <div className={styles.formContainer}>

                {/* Heading based on whether it's for adding or updating an image */}
                <h1>{!updateImage ? "Add an Image" : "Update Image"}</h1>

                {/* Form */}
                <form onSubmit={updateImage ? handleUpdateSubmit : handleSubmit}>

                    {/* Input field for image name */}
                    <input
                        type="text"
                        className={styles.inputBox}
                        placeholder="Enter Name"
                        ref={imageNameRef}
                        required
                    />

                    {/* Input field for image URL */}
                    <input
                        type="text"
                        className={styles.inputBox}
                        placeholder="Enter Url"
                        ref={imageUrlRef}
                        required
                    />
                    <br />

                     {/* Button to clear form input fields */}
                     <button className={`${styles.btn} ${styles.clear}`} onClick={clearFormData}>Clear</button>

                    {/* Button for adding or updating the image */}
                    <button className={`${styles.btn} ${styles.add}`}>
                        {!updateImage ? "Add" : "Update"}
                    </button>

                   
                </form>
            </div>
        </>
    );
}
