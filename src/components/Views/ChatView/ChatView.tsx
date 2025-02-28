import { useCallback, useRef } from "react";
import ChatCard from "../ChatCard/ChatCard";
import styles from "./ChatView.module.css";

interface ChatViewProps {
    chatContent: string[];
}

function ChatView({ chatContent }: ChatViewProps) {
    const reference = useRef<HTMLDivElement>(null);

    const scrolldown = useCallback(() => {
        reference.current?.scrollBy({
            left: 0,
            behavior: 'smooth',
            top: reference.current.scrollHeight,
        });
    }, [])

    return (
        <div className={styles.chatView + " poppins-regular"} ref={reference}>
            {
                chatContent.map((chat, index) => {
                    return <ChatCard
                        key={index}
                        scrolldown={scrolldown}
                        message={chat} />
                })
            }
        </div>
    )
}

export default ChatView;