import { KeyboardEvent } from "react";
import styles from "./SearchBox.module.css";

interface SearchBoxProps {
    onsubmit: (value: string) => void;
}

function SearchBox({ onsubmit }: SearchBoxProps) {
    const handleChange = (event: KeyboardEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;

        if (value && event.key === "Enter") {
            onsubmit(value);

            // Clear input box
            (event.target as HTMLInputElement).value = "";

            // Remove focus to minimize search box
            // Remember that :active is only recieved
            // few tags and one of them are input elements
            // thats the reason of casting
            (document.activeElement as HTMLInputElement).blur();
        }
    }

    return (
        <div className={styles.searchBox} tabIndex={0}>
            <span className="material-symbols-outlined">
                search
            </span>
            <input
                className="poppins-regular"
                type="text"
                name="prompt"
                id="prompt"
                autoComplete="off"
                placeholder="A cow on my head ..."
                onKeyDown={(e) => handleChange(e)}
            />
        </div>
    )
}

export default SearchBox;