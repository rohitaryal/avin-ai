import { memo, useRef } from "react";
import styles from "./GalleryDialog.module.css";

interface GalleryDialogProps {
    onclose: () => void;
    title: string;
    imagesURL: string[];
}

function GalleryDialog({ imagesURL, title, onclose }: GalleryDialogProps) {
    console.log("Gallery Dialog: Component rendered.");
    const reference = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        reference.current?.scrollBy({
            left: -(reference.current.scrollWidth / imagesURL.length),
            behavior: 'smooth',
        });
    }

    const scrollRight = () => {
        reference.current?.scrollBy({
            left: (reference.current.scrollWidth / imagesURL.length),
            behavior: 'smooth',
        });
    }
    return (
        <>
            <div className={styles.galleryDialogOverlay} onClick={onclose}></div>
            <div className={styles.galleryDialog} >
                {
                    imagesURL.length > 1 && <><span className={styles.arrowLeft + " " + styles.arrow} onClick={scrollLeft}>
                        <span className="material-symbols-outlined">
                            arrow_back_ios
                        </span>
                    </span>
                        <span className={styles.arrowRight + " " + styles.arrow} onClick={scrollRight}>
                            <span className="material-symbols-outlined">
                                arrow_forward_ios
                            </span>
                        </span></>
                }
                <div className={styles.galleryTitle + " poppins-bold"}>
                    <span className="material-symbols-outlined">
                        image
                    </span>
                    {title}
                </div>
                <div className={styles.generatedImages} ref={reference}>
                    {
                        imagesURL.map((image) => {
                            return <img
                                key={"Dialog-" + image}
                                src={image} alt="" />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default memo(GalleryDialog);