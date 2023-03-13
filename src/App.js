import { useState, useEffect, useRef } from "react";
import "./App.css";
import { storage } from "./Firebase";
import { ref, listAll, uploadBytes, getDownloadURL } from "firebase/storage";

function App() {
  const [uploadImage, setUploadImage] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileUpload = async () => {
    const file = uploadImage[0];
    const imagesRef = ref(storage, `images/${file.name}`);
    setIsUploading(true);
    try {
      await uploadBytes(imagesRef, file);
    } catch (e) {
      console.log(e.message);
    }
    setIsUploading(false);
    fileInputRef.current.value = "";
  };

  useEffect(() => {
    const storageRef = ref(storage, "images/");
    listAll(storageRef)
      .then((result) => {
        result.items.forEach((itemRef) => {
          getDownloadURL(itemRef)
            .then((url) => {
              setAllImages((prev) => [...prev, url]);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isUploading]);

  return (
    <div className="App">
      <h1>My Gallery</h1>
      <div className="upload-section">
        <h2>Upload My Photos</h2>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            setUploadImage(fileInputRef.current.files);
            console.log(uploadImage);
          }}
        />

        <button onClick={handleFileUpload}>Upload</button>
        {isUploading ? <p>...uploading</p> : <p></p>}
      </div>

      <div className="photos-section">
        <h2>Photos</h2>
        {[...new Set(allImages)].map((img) => {
          return <img key={Math.random()} src={img} alt="nice" />;
        })}
      </div>
    </div>
  );
}

export default App;
