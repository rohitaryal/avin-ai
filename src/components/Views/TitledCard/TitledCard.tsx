import { memo, useEffect, useRef } from "react";
import styles from "./TitledCard.module.css";


interface TitledCardProps {
    title: string;
    imageURL: string[];
    onclick: (images: string[], title: string) => void;
}

interface PlaceholderProps {
    count: number;
    title: string;
    images: string[];
    backgroundURL: string;
    onclick: (images: string[], title: string) => void;
}

function TitledCard({ title, imageURL, onclick }: TitledCardProps) {
    console.log("TitledCard: Component Rendered.");

    return (
        <div className={styles.titledCard + " poppins-regular"} draggable={true}>
            <span className={styles.title}>
                <span className="material-symbols-outlined">
                    bookmark_manager
                </span>
                <span className={styles.titleText}>
                    {title}
                </span>
            </span>
            <span className={styles.generatedImages}>
                {
                    imageURL.map((image, index) => {
                        return (
                            index < 2 &&
                            <img
                                key={image}
                                src={image}
                                onClick={() => onclick([image], title)}
                            />
                        );
                    })
                }

                {
                    imageURL.length > 2 &&
                    <Placeholder
                        onclick={onclick}
                        images={imageURL.slice(2)}
                        count={imageURL.length - 2}
                        backgroundURL={imageURL[2]}
                        title={title} />
                }
            </span>
        </div>
    )
}

function Placeholder({ count, images, backgroundURL, onclick, title }: PlaceholderProps) {
    const reference = useRef<HTMLDivElement>(null);

    useEffect(() => {
        reference.current?.scrollIntoView(true);
    }, []);
    return <div
        ref={reference}
        onClick={() => onclick(images, title)}
        className={styles.placeholder + " poppins-extrabold"}
        style={
            {
                backgroundImage: `url(${backgroundURL})`
            }
        }>
        <span>+{count}</span>
    </div>
}


// Checking for title and imageURL array
export default memo(TitledCard, (prev, curr) => {
    if (
        prev.title != curr.title ||
        prev.imageURL.length != curr.imageURL.length
    ) {
        return false;
    }

    for (let i = 0; i < prev.imageURL.length; i++) {
        if (prev.imageURL[i] != curr.imageURL[i]) {
            return false;
        }
    }

    return true;
});