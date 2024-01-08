import React, { useState } from 'react';

const RenderRoomsForm = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    // Access the selected files from the input
    const selectedImages = Array.from(e.target.files);
    
    // Do something with the selected images (you might want to display a preview)
    // For simplicity, we're just updating the state here
    setImages([...images, ...selectedImages]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the images to the server
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`roomImages[${index}]`, image);
    });

    // Now, you can make an API request to your server to handle the image upload
    // For example, using fetch or axios
    fetch('your-upload-endpoint', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server (e.g., display a success message)
        console.log('Images uploaded successfully:', data);
      })
      .catch((error) => {
        console.error('Error uploading images:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Room Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* ... your existing form fields ... */}

        {/* Room Images */}
        <div className="mb-3">
          <label htmlFor="room_images" className="form-label">
            Room Images
          </label>
          <input
            type="file"
            className="form-control"
            id="room_images"
            name="room_images"
            onChange={handleImageChange}
            multiple // Allow multiple file selection
          />
          {/* Display a preview if needed */}
          {images.length > 0 && (
            <div>
              <p>Selected Images:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Room Preview ${index}`}
                    style={{ margin: '5px', maxWidth: '100%', maxHeight: '100px' }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ... your remaining form fields ... */}

        <div className="col-12 mb-5">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RenderRoomsForm;




////////
second


import React, { useState } from 'react';

const RenderRoomsForm = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    // Access the selected file from the input
    const selectedImage = e.target.files[0];
    
    // Do something with the selected image (you might want to display a preview)
    // For simplicity, we're just updating the state here
    setImage(selectedImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the image to the server
    const formData = new FormData();
    formData.append('roomImage', image);

    // Now, you can make an API request to your server to handle the image upload
    // For example, using fetch or axios
    fetch('your-upload-endpoint', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server (e.g., display a success message)
        console.log('Image uploaded successfully:', data);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Room Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* ... your existing form fields ... */}

        {/* Room Images */}
        <div className="mb-3">
          <label htmlFor="room_images" className="form-label">
            Room Images
          </label>
          <input
            type="file"
            className="form-control"
            id="room_images"
            name="room_images"
            onChange={handleImageChange}
          />
          {/* Display a preview if needed */}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Room Preview"
              style={{ marginTop: '10px', maxWidth: '100%', maxHeight: '200px' }}
            />
          )}
        </div>

        {/* ... your remaining form fields ... */}

        <div className="col-12 mb-5">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RenderRoomsForm;
