import { useState, useEffect, useRef } from "react";
import "./App.css";
import { storage } from "./Firebase";
import { ref, listAll, uploadBytes, getDownloadURL } from "firebase/storage";

function App() {
  const [uploadImage, setUploadImage] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [displayImage, setDisplayImage] = useState("");

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
    // setDisplayImage(allImages[0]);
    // console.log(allImages[0]);
  }, [isUploading]);
  useEffect(() => {
    setDisplayImage(allImages[0]);
  }, [allImages]);

  return (
    <div className="App">
      <h1 className="heading">My Gallery</h1>
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
        <div className="photos-pagination">
          {[...new Set(allImages)].map((img) => {
            return (
              <img
                key={Math.random()}
                src={img}
                alt="nice"
                className={img === displayImage ? "selected-image" : ""}
                onClick={() => {
                  setDisplayImage(img);
                }}
              />
            );
          })}
        </div>
        <div className="display-image">
          <img src={displayImage} alt="display" />
        </div>
      </div>
    </div>
  );
}

export default App;
