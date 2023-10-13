import styles from  "./navbar.module.css"


// Navigation bar function
export default function Navbar(){
    return(
        <>
            <div className={styles.navbar}> 

                {/* Logo and Title of the Page  */}
                <img className={styles.coverImage} src="https://cdn-icons-png.flaticon.com/128/148/148813.png" alt="logo" />
                <span>PhotoFolio</span>
            </div>
        </>
    )
}