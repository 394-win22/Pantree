import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyA7Ww6tN1P-d1MEnuJUetYtQ3pmPwz91Cc",
    authDomain: "pantree-baf7d.firebaseapp.com",
    databaseURL: "https://pantree-baf7d-default-rtdb.firebaseio.com",
    projectId: "pantree-baf7d",
    storageBucket: "pantree-baf7d.appspot.com",
    messagingSenderId: "530085380611",
    appId: "1:530085380611:web:417b99b5e0f77741668436"
  };
  
  const firebase = initializeApp(firebaseConfig);
  const storage = getStorage(firebase);

  //tries to get photo from firebase storage.

  export const GetPhoto = async (path) => {
      
    try
    {
        await getDownloadURL(ref(storage, path))
        .then((url) => {
            // Or inserted into an <img> element
            console.log(url);
            return url.toString();
        })
        .catch((error) => {
            return "https://ih1.redbubble.net/image.1084771953.9155/fposter,small,wall_texture,product,750x1000.jpg"
            // Handle any errors
        });
    }
    catch (error) {
      alert(error);
    }


  }
