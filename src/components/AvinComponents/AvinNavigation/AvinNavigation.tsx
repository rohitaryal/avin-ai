import styles from "./AvinNavigation.module.css";

interface AvinNavigationProps { }

function AvinNavigation({ }: AvinNavigationProps) {
    return (
        <div className={styles.navigationContainer}>
            <span className={styles.logoContainer}>
                <img src="/avin.png" alt="A" />
                <span className={styles.avinNameContainer + " poppins-bold"}>
                    AVIN.
                    <span className={styles.avinLastName}>AI</span>
                </span>
            </span>
        </div>
    )
}

export default AvinNavigation;