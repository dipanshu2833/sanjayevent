
import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ShareIcon from '@mui/icons-material/Share';
import UploadIcon from '@mui/icons-material/Upload';
import background from "./image/dp.png"
import Webcam from 'react-webcam';
import myImage from "./image/dp.png"
import html2canvas from 'html2canvas';


const PhotoUploader = () => {
    const [image, setImage] = useState(null);
    
    
    const webcamRef = useRef(null);



    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }, []);

    const shareImage = async () => {
        try {
            const image = 'https://harish.sanjayevents.in/your-image.jpg'; // Replace with your image URL
            if (navigator.share) {
                await navigator.share({
                    title: 'Share Image',
                    text: 'Check out this image!',
                    url: image,
                });
            } else {
                // Fallback for browsers that do not support Web Share API
                alert('Web Share API is not supported in your browser.');
            }
        } catch (error) {
            console.error('Error sharing image:', error);
        }
    };


    // const capture = () => {
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     setImage(imageSrc);

    //     //     <Webcam
    //     // audio={false}
    //     // ref={webcamRef}
    //     // screenshotFormat="image/png"

    // };

    const download = () => {
        // Select the container div that you want to capture
        const container = document.querySelector('.container' ,{ scrollY:   0 } );
      
        // Use html2canvas to capture the container
        html2canvas(container).then(canvas => {
          // Convert the canvas to a data URL
          const imageUrl = canvas.toDataURL('image/png');
      
          // Create a link and trigger the download
          const link = document.createElement('a');
          link.href = imageUrl;
          link.download = 'captured_image.png';
          link.click();
        });
      };





    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <>
        <div className='d-flex ' style={{ justifyContent: "center", alignItems: "center" }}>
            <div className='container'>
                <div className=' d-flex background-image container ' style={{ justifyContent: "center", alignItems: "center" }}></div>

            
            <div className="profile-container ">
                <div {...getRootProps()} className=" mt-5">
                    <input {...getInputProps()}/>
                    {/* <button className='sp btn btn-succes ms-4'>  <UploadIcon sx={{ fontSize: "50px", zIndex: -3 }} /> </button> */}
                    <button className=' spp btn btn-warning ms-4' >Upload<UploadIcon /></button>

                    {image && (
                        <div className='pro'>
                            <img className='profile-image' src={image} alt="Uploaded or captured" />
                            {/* <img className='backgrong-image' src={image} alt="upload"/> */}
                        </div>

                    )}

                </div>
                {/* </div> */}
                {/* </div> */}

                        </div>
               
            </div>
        </div>
        <div className='centerr'>
                    <div className='ce'>
                        <button className='btn btn-danger ms-5 text-align-center' onClick={download}>Download <FileDownloadIcon /></button>
                        <button className='btn btn-success ms-4' onClick={shareImage}>Share<ShareIcon /></button>
                        <img src="https://harish.sanjayevents.in/your-image.jpg" alt="" />
                    </div>
                </div>
        </>
    );
};

export default PhotoUploader;







