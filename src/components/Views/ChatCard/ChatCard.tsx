import { memo, useEffect } from "react";
import styles from "./ChatCard.module.css";

interface ChatCardProps {
    message: string;
    scrolldown: () => void;
}

function ChatCard({ message, scrolldown }: ChatCardProps) {
    console.log("ChatCard: Component rendered");

    useEffect(() => {
        scrolldown();
    }, []);

    return (
        <div
            className={styles.chatCard}>
            {message}
        </div>
    )
}

export default memo(ChatCard);