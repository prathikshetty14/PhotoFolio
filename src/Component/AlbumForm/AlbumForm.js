import { useRef } from "react";
import styles from "./albumform.module.css";
import { db } from "../../firebaseInit";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AlbumForm() {
    // Reference for the album name input field
    const albumNameRef = useRef();

    // Function to clear the album name input field
    function clearFormInput(e) {
        e.preventDefault();
        albumNameRef.current.value = "";
        albumNameRef.current.focus();
    }

    // Function to handle form submission and create a new album
    async function handleFormSubmit(e) {
        e.preventDefault();

        // Add a new document to the database
        await addDoc(collection(db, "photofolio"), {
            Albumname: albumNameRef.current.value,
            imageList: [],
        });

        toast.success("New Album added!");

        // Clear the input field and set focus
        albumNameRef.current.value = "";
        albumNameRef.current.focus();
    }

    return (
        <>
            <ToastContainer />
            {/* Main form container */}
            <div className={styles.formContainer}>
                <h1>Create an Album</h1>
                <form onSubmit={handleFormSubmit}>
                    {/* Input field for album name */}
                    <input
                        type="text"
                        placeholder="Album Name"
                        ref={albumNameRef}
                        required
                        className={styles.input}
                    />

                    {/* Button to clear the input field */}
                    <button
                        className={`${styles.formBtn} ${styles.clearBtn}`}
                        onClick={clearFormInput}>
                        Clear
                    </button>

                    {/* Button to submit the form and create a new album */}
                    <button className={`${styles.formBtn} ${styles.addBtn}`}>
                        Add Album
                    </button>
                </form>
            </div>
        </>
    );
}
