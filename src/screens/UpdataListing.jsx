import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const updateListing = () => {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    type: "rent",
    bedRooms: 1,
    bathRooms: 1,
    regularPrice: 50,
    discountedPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(()=>{

    async function fetchListing(){

        const listingId = params.id;
        
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();

        if(data.success === false){
            return console.log(data.message);
        }

        setFormData(data.data);

    }

    fetchListing();

  },[])


  async function handleSubmit(e) {
    e.preventDefault();

    if(files.length > 6){

        return setError("You can only upload upto six images");

    } else if (+formData.regularPrice < +formData.discountedPrice){

        return setError("Discount price must be less than regular price");

    }

    try{

        setLoading(true);
        setError(false);

        const data = new FormData();
        for (const file of files) {
            data.append('images', file);
        }

        for (const [key, value] of Object.entries(formData)) {
            data.append(key, value);
          }

        const res = await fetch(`/api/listing/update/${params.id}`,{
            method : 'POST',
            body : data
        });

        const resposneData = await res.json();

        if(resposneData.success === false){
            setLoading(false);
            setError(resposneData.message);
            return;
        }

        setLoading(false);
        navigate(`/listing/${resposneData.updatedListing._id}`)

    }catch(err){
        setError(err.message);
        setLoading(false);
    }
  }

  function handleChange(e) {
    if(e.target.id === "sell" || e.target.id === "rent"){
        setFormData({
            ...formData,
            type : e.target.id
        })
    }

    if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === 'offer'){
        setFormData({
            ...formData,
            [e.target.id] : e.target.checked
        })
    }

    if(e.target.type === "number" || e.target.type === "text" || e.target.type === "textarea"){
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        })
    }
  }

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Updata Listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            onChange={handleChange}
            value={formData.name}
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength={62}
            minLength={10}
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" onChange={handleChange} checked = {formData.type === "sell"} />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" onChange={handleChange} checked = {formData.type === 'rent'} />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" onChange={handleChange} checked = {formData.parking} />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" onChange={handleChange} checked = {formData.furnished} />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" onChange={handleChange} checked = {formData.offer} />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                id="bedRooms"
                defaultValue={1}
                min={1}
                max={10}
                required
                onChange={handleChange}
                value = {formData.bedRooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                id="bathRooms"
                defaultValue={1}
                min={1}
                max={10}
                required
                onChange={handleChange}
                value = {formData.bathRooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                className="p-3 border border-gray-300 rounded-lg"
                type="number"
                id="regularPrice"
                min={50}
                max={1000000}
                required
                onChange={handleChange}
                value = {formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            {
                formData.offer && 
                <div className="flex items-center gap-2">
                <input
                    className="p-3 border border-gray-300 rounded-lg"
                    type="number"
                    id="discountedPrice"
                    min={0}
                    max={1000000}
                    required
                    onChange={handleChange}
                    value={formData.discountedPrice}
                />
                <div className="flex flex-col items-center">
                    <p>Discounted Price</p>
                    <span className="text-xs">($/month)</span>
                </div>
                </div>
            }
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover(max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              className="p-3 border border-gray-300 w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {/* <button onClick={handleImageSubmit} type='button' className='p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80'>Upload</button> */}
          </div>
          <button disabled = {loading} className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {
                loading ? "Updateing..." : "Update Listing"
            }
          </button>
          <p className="text-red-700 text-sm">{error && error}</p>
        </div>
      </form>
    </main>
  );
};

export default updateListing;
