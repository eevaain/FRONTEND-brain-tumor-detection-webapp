import React, { useState } from "react";
// import {storage} from '../firebase-folder/firebase-ting'
import axios from 'axios';

export default function Form(){
  const [noShownImage, setShownImage] = useState(null);
  const [noTestPred, setTestPred] = useState("No image yet...")
  const [noImageFile, setImageFile] = useState(null)
  const [noCardSelectTxt, setCardSelectTxt] = useState('')


  // i need this function to invoke when i upload image from browse
  function handleChange(event) {
    setCardSelectTxt('Custom Image Selected.')
    console.log({event})
    console.log(event.target.files[0])
    const targetFile = event.target.files[0];
    setImageFile(targetFile); // event.target.files[0] is now stored in global state, called "image"
    setShownImage(URL.createObjectURL(targetFile)); // this just allows image to be shown
  }

  // if i can get this shit to work then all i have to do is copy 2 more functions and assign them as onClick to the other 2 containers
  // i could also get this to work using firebase.......
  const clickedCard1 = (event) => {
    const webImageToMemory = onImageEdit('https://brain-tumor-detection.vercel.app/Y2.jpg');
    // const object = new File([webImageToMemory], 'image', {type: event.target.currentSrc.type});
    console.log({webImageToMemory})
    console.log({event})
    const webAppImage = event.target.currentSrc;
    setShownImage(webAppImage)
    setCardSelectTxt('Card 1 Selected.')
  }

  const clickedCard2 = (event) => {
    const webImageToMemory = onImageEdit('https://brain-tumor-detection.vercel.app/7 no.jpg');
    // const object = new File([webImageToMemory], 'image', {type: event.target.currentSrc.type});
    console.log({webImageToMemory})
    console.log({event})
    const webAppImage = event.target.currentSrc;
    setShownImage(webAppImage)
    setCardSelectTxt('Card 2 Selected.')
  }

  const clickedCard3 = (event) => {
    const webImageToMemory = onImageEdit('https://brain-tumor-detection.vercel.app/18 no.jpg');
    // const object = new File([webImageToMemory], 'image', {type: event.target.currentSrc.type});
    console.log({webImageToMemory})
    console.log({event})
    const webAppImage = event.target.currentSrc;
    setShownImage(webAppImage)
    setCardSelectTxt('Card 3 Selected.')
  }

  const onImageEdit = async (imgUrl) => {
    // var imgExt = getUrlExtension(imgUrl);
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], "image" + imgUrl, {
      type: blob.type,
    });
    setImageFile(file)
  }


  // I need this function to invoke when i click "classify'
  const sendTestImage = async(event) => {
    setTestPred('Model Classifying...')
    event.preventDefault();
    // console.log({event})
    const data = new FormData();
    data.append('file', noImageFile); //this waits to get the image file that is set somewhere in the code
    console.log({data})
    fetchData(data) //This posts the data to backend, with key to differentiate route
  }
  // posts the data from data that was set from previous functions and activated in 'sendTestImage'
  const fetchData = (passedData) => {
    console.log({passedData})
    if (passedData) {
      // axios.post(`http://localhost:5000/${passedData.sendImageType}`, passedData)
      axios.post(`https://brain-tumor-backend-pee.herokuapp.com/test`, passedData)
      // might have to turn this into a template literal to create varying routes for either 'handleChange()' or 'clickedCard()'
      .then((testRes) => {
      console.log({testRes})
      console.log(testRes.data.Prediction)
      setTestPred(testRes.data.Prediction)
      })
      .catch((error) => {
        console.log(error);
        setTestPred("Error with Image Dimensionality")
      });
    }
  }

    return(
      <>
        <div className="flex-nowrap space-x-4 pl-6 pr-6 overflow-x-scroll flex items-center self-center h-80 w-11/12 sm:w-1/2 rounded-md shadow-inner">
          <div className="cursor-pointer h-64 w-96 min-w-4/10 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-110" onClick={clickedCard1}>
            <img className="h-3/4 w-full object-cover" src="/Y2.jpg" alt="yestumor"/>
            <div className="px-6 py-2">
              <div className="font-medium text-sm sm:text-lg">Brain Tumor</div>
              <p className="text-gray-700 text-xs sm:text-sm">Yes</p>
            </div>
          </div>

          <div className="cursor-pointer h-64 w-96 min-w-4/10 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-110" onClick={clickedCard2}>
            <img className="h-3/4 w-full object-cover" src="/7 no.jpg" alt="yestumor"/>
            <div className="px-6 py-2">
              <div className="font-medium text-sm sm:text-lg">Brain Tumor</div>
              <p className="text-gray-700 text-xs sm:text-sm">No</p>
            </div>
          </div>

          <div className="cursor-pointer h-64 w-96 min-w-4/10 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-110" onClick={clickedCard3}>
            <img className="h-3/4 w-full object-cover" src="/18 no.jpg" alt="yestumor"/>
            <div className="px-6 py-2">
            <div className="font-medium text-sm sm:text-lg">Brain Tumor</div>
              <p className="text-gray-700 text-xs sm:text-sm">No</p>
            </div>
          </div>
        </div>

          <form className="flex flex-col justify-center items-center" onSubmit={sendTestImage} > {/*onSubmit={handleUpload}*/}
            <div className="bg-indigo-300 mb-4 filter drop-shadow-lg">
            </div>
              <div className="grid gap-4 grid-cols-2 mt-4 mb-4">
                {/* handle change if key is x and clickedcard if key is y */}
                <input className="rounded-md border py-2 px-3 text-grey-darkest" type="file" name="image" onChange={handleChange} />  
                {/* THIS INVOKES THE 'sendTestImage' function */}
                <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-purple-500 hover:bg-purple-700"disabled={!noShownImage}>Classify</button> 
              </div>
                <div className="rounded-md border p-4 text-grey-darkest">
                  <p className=" text-center items-baseline"><b>Prediction: </b>{noTestPred}</p>
                </div>
              <img className="rounded-md object-cover h-60 w-50 mt-4" src={noShownImage} /> 
                <p className="italic mt-4">{noCardSelectTxt}</p>
          </form>
    </>
    )
}
