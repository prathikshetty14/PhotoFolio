import styles from "./image.module.css"

export default function Image(props){

    const {image,index,handleImageEdit,handleImageDelete,openLightbox}=props;

    return(
        <>
            <div className={styles.imageCard}>
                {/* Displays the image */}
                <div className={styles.imageBox}>
                    <img src={image.link} 
                        alt="photo"  
                        onClick={() => openLightbox(index)}/>
                </div>

                {/* Image Delete or Edit options */}
                <div className={styles.imageInfo}>
                    
                    <span>{image.name}</span>
                    {/* Delete */}
                    <button className={`${styles.imageBtn} ${styles.deleteBtn}`} 
                        onClick={()=>handleImageDelete(image)}>X
                    </button>

                    {/* Edit */}
                    <button className={`${styles.imageBtn} ${styles.editBtn}`} 
                        onClick={()=>handleImageEdit(image)}>Edit
                    </button>
                </div>
            </div>
        </>
    )
}