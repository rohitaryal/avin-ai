import { memo, useState } from "react";
import TitledCard from "../TitledCard/TitledCard";
import styles from "./Canvas.module.css";
import GalleryDialog from "../GalleryDialog/GalleryDialog";

interface CanvasImage {
    title: string;
    imageURL: string[];
}

interface CanvasProps {
    images: CanvasImage[];
}

interface DialogStateProps {
    state: boolean;
    title: string;
    images: string[];
}

function Canvas({ images }: CanvasProps) {
    console.log("Canvas: Component rendered");

    const [dialogVisibility, setDialogVisibility] = useState<DialogStateProps>({ state: false, title: "", images: [] });

    const handleDialogOpen = (images: string[], title: string) => {
        setDialogVisibility({ state: true, images, title });
    }

    const handleDialogClose = () => {
        setDialogVisibility({ ...dialogVisibility, state: false });
    }

    return (
        <div className={styles.canvas}>
            {
                images.map((image) => {
                    return <TitledCard
                        key={image.title}
                        onclick={handleDialogOpen}
                        title={image.title}
                        imageURL={image.imageURL}
                    />
                })
            }
            {
                dialogVisibility.state && <GalleryDialog
                    onclose={handleDialogClose}
                    title={dialogVisibility.title}
                    imagesURL={dialogVisibility.images} />
            }
        </div>
    )
}

export default memo(Canvas);