import React, { useEffect, useState } from "react";
import styles from "./albumlist.module.css";
import Album from "../AlbumContainer/AlbumContainer";
import AlbumForm from "../AlbumForm/AlbumForm";
import ImageList from "../ImageGallery/ImageGallery";
import { db } from "../../firebaseInit";
import { collection, onSnapshot } from "firebase/firestore";

export default function AlbumList() {
    // State to store album data
    const [albums, setAlbums] = useState([]); 
    const [showAddAlbumForm, setShowAddAlbumForm] = useState(false);
    const [openAlbum, setOpenAlbum] = useState({ albumId: "", open: false });

    useEffect(() => {
        // Fetch the albums from the database and update the state
        onSnapshot(collection(db, "photofolio"), (snapshot) => {
            const albumData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setAlbums(albumData);
        });
    }, []);

    return (
        <div className={styles.mainContainer}>
            {!openAlbum.open ? (
                <>
                    <div className={styles.albumForm}>
                        {showAddAlbumForm && <AlbumForm />}
                    </div>

                    {/* Create Album Container */}
                    <div className={styles.header}>
                        <h1>Your Albums</h1>
                        <button
                            className={styles.btn}
                            onClick={() => setShowAddAlbumForm(!showAddAlbumForm)}
                        >
                            {!showAddAlbumForm ? "Create Album" : "Cancel"}
                        </button>
                    </div>

                    <div className={styles.albumContainer}>
                        {albums.map((album, index) => (
                            <Album key={index} info={album} setOpenAlbum={setOpenAlbum} />
                        ))}
                    </div>
                </>
            ) : (
                <ImageList openAlbum={openAlbum} setOpenAlbum={setOpenAlbum} />
            )}
        </div>
    );
}
