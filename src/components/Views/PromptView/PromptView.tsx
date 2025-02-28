import { memo, useEffect, useState } from "react";
import AvinNavigation from "../../AvinComponents/AvinNavigation/AvinNavigation";
import SearchBox from "../../Input/SearchBox/SearchBox";
import ChatView from "../ChatView/ChatView";
import styles from "./PromptView.module.css";

interface CanvasImage { title: string; imageURL: string[] }
interface PromptViewProps {
    addimage: (image: CanvasImage) => void;
}

const imageWords = [
    "draw",
    "generate",
    "create",
    "illustrate",
    "depict",
    "paint",
    "sketch",
    "design",
    "render",
    "visualize",
    "show",
    "display",
    "picture",
    "artwork",
    "graphic",
    "representation",
    "concept art",
    "digital art",
    "scene",
    "animation",
    "portrait",
    "landscape",
    "screenshot",
    "diagram",
    "map"
];

const chatContent: string[] = JSON.parse(localStorage.getItem("chatHistory") || "[]");

function PromptView({ addimage }: PromptViewProps) {
    console.log("PromptView: Component Rendered");

    const [newChat, setNewChat] = useState(chatContent);

    useEffect(() => {
        localStorage.setItem("chatHistory", JSON.stringify(newChat));
    }, [newChat]);

    const FetchText = async (message: string) => {
        const response = await fetch("https://ai.erucix.workers.dev?message=" + encodeURI(message),
            {
                method: 'POST',
                body: JSON.stringify(newChat),
            }
        );
        const reader = response.body?.getReader();
        let modelResponse = "";

        while (reader) {
            const { done, value } = await reader.read();
            if (done) break;

            let decoded = new TextDecoder().decode(value);
            let jsonMessages = decoded
                .split("\n\n")
                .map((p) => p.trim())
                .filter((p) => p.startsWith("data: ") && !p.includes("[DONE]"))
                .map((p) => p.replace("data: ", ""));

            for (let msg of jsonMessages) {
                try {
                    let parsed = JSON.parse(msg);
                    modelResponse += parsed.response || "";
                } catch (err) {
                    console.error("JSON Parse Error:", err);
                }
            }
        }

        setNewChat(old => [...old, modelResponse]);
    };

    const FetchImage = async (message: string) => {
        const data = await fetch(`https://avin-backend.erucix.workers.dev/image?prompt=${encodeURI(message)}`);
        const response = await data.json();

        addimage({
            title: (response.imagePanels[0].prompt as string),
            imageURL: response.imagePanels[0].generatedImages.map((image: any) => {
                return 'data:image/png;base64, ' + image.encodedImage;
            })
        });
    }


    const handleSubmit = (value: string) => {
        setNewChat(old => [...old, value]);
        for (const word of value.split(" ")) {
            if (imageWords.includes(word)) {
                FetchImage(value);
                return;
            }
        }

        FetchText(value);
    }

    return (
        <div className={styles.promptView}>
            <AvinNavigation />
            <ChatView chatContent={newChat} />
            <SearchBox onsubmit={handleSubmit} />
        </div>
    )
}

export default memo(PromptView);