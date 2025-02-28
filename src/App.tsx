import { useState } from "react";
import Canvas from "./components/Views/Canvas/Canvas";
import PromptView from "./components/Views/PromptView/PromptView";

interface CanvasImage {
  title: string;
  imageURL: string[];
}

function App() {

  const [images, setImages] = useState<CanvasImage[]>([]);

  const addImage = (image: { title: string; imageURL: string[] }) => {
    setImages([...images, image]);
  }

  return (
    <div className="mainContainer">
      <PromptView addimage={addImage} />
      <Canvas images={images} />
    </div>
  )
}

export default App;