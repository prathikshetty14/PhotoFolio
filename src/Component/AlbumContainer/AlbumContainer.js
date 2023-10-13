import React from "react";
import styles from "./album.module.css";

// Album component to display an album icon in the AlbumList
export default function Album(props) {
  const { info, setOpenAlbum } = props;

  // Function to handle album click and open the album
  const handleAlbumClick = () => {
    setOpenAlbum({ albumId: info.id, open: true });
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardImage} onClick={handleAlbumClick}>
        {/* Clickable album icon */}
        <img src="https://cdn-icons-png.flaticon.com/128/3342/3342137.png"/>
      </div>
      <div className={styles.cardName}>
        {/* Display the album name */}
        {info.Albumname}
      </div>
    </div>
  );
}
