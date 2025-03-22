import { useEffect, useState } from "react";
import { db } from "../components/firebase";
import { onValue, push, ref, remove, update } from "firebase/database";
import "../css/gems.css";
import Logout from "./Logout";
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'



const SpecialOffer = () => {




  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);


  
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  // soting data nodes in state 
  const [offerRecords, setofferRecords] = useState([]);

  // inintal data nodes 
  const [newofferData, setNewofferData] = useState({
    offerName: "",
    offerWeight: "",
    offerInStock: "",
    offerPrice: "",
    offerPriceoff:"",
    offerDescrition: "",
    offerImage: null,
    offerImageURL: "",
    offerImagesub: null,
    offerImagesubURL: "",
    offerImagesubT: null,
    offerImagesubURLT: "",
    offerImagesubTH: null,
    offerImagesubURLTH: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editRecordKey, setEditRecordKey] = useState("");
  // initall editable data storing
  const [editedofferData, setEditedofferData] = useState({
    offerName: "",
    offerWeight: "",
    offerInStock: "",
    offerPrice: "",
    offerPriceoff:"",
    offerDescrition: "",
    offerImage: null,
    offerImageURL: "",
    offerImagesub: null,
    offerImagesubURL: "",
    offerImagesubT: null,
    offerImagesubURLT: "",
    offerImagesubTH: null,
    offerImagesubURLTH: "",
  });

  useEffect(() => {
    const offerRef = ref(db, "specialOffer");
    onValue(offerRef, (snapshot) => {
      let records = [];

      snapshot.forEach((childSnapshot) => {
        let keyname = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyname, data: data });
      });
      setofferRecords(records);
    });
    // console.log(mineralRecords)
  }, []);

  const createNewRecord = () => {
    const specialRef = ref(db, "specialOffer");
    push(specialRef, {
      ...newofferData,
      offerPrice: parseFloat(newofferData.offerPrice),
      offerPriceoff: parseFloat(newofferData.offerPriceoff),
    })
      .then(() => {
   
        setNewofferData({
          offerName: "",
          offerWeight: "",
          offerInStock: "",
          offerPrice: "",
          offerPriceoff:"",
          offerDescrition: "",
          offerImage: null,
          offerImageURL: "",
          offerImagesub: null,
          offerImagesubURL: "",
          offerImagesubT: null,
          offerImagesubURLT: "",
          offerImagesubTH: null,
          offerImagesubURLTH: "",
        });
        setIsOpen(false)
      })
      .catch((error) => {
        alert("Error creating mineral record: ", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewofferData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewofferData((prevData) => ({
          ...prevData,
          offerImage: imageFile,
          offerImageURL: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesub = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewofferData((prevData) => ({
          ...prevData,
          offerImagesub: imageFile,
          offerImagesubURL: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesub2 = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewofferData((prevData) => ({
          ...prevData,
          offerImagesubT: imageFile,
          offerImagesubURLT: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesub3 = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewofferData((prevData) => ({
          ...prevData,
          offerImagesubTH: imageFile,
          offerImagesubURLTH: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };





  const handleInputChangeEidt = (event) => {
    const { name, value } = event.target;
    setEditedofferData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChangeEidt = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedofferData((prevData) => ({
          ...prevData,
          offerImage: imageFile,
          offerImageURL: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesubEidt = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedofferData((prevData) => ({
          ...prevData,
          offerImagesub: imageFile,
          offerImagesubURL: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesub2Eidt = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedofferData((prevData) => ({
          ...prevData,
          offerImagesubT: imageFile,
          offerImagesubURLT: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesub3Eidt = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedofferData((prevData) => ({
          ...prevData,
          offerImagesubTH: imageFile,
          offerImagesubURLTH: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const startEditing = (key, data) => {
    setEditMode(true);
    setIsOpenEdit(true)
    setEditRecordKey(key);
    setEditedofferData({
      ...data,
      offerImageURL: data.offerImageURL,
      offerImagesubURL: data.offerImagesubURL,
      offerImagesubURLT: data.offerImagesubURLT,
      offerImagesubURLTH: data.offerImagesubURLTH,
    });
  };

  const saveEditedRecord = () => {
    const offerRef = ref(db, `specialOffer/${editRecordKey}`);
    update(offerRef, editedofferData)
      .then(() => {
        console.log("Mineral record updated successfully!");
        setEditMode(false);
        setEditRecordKey("");
        setIsOpenEdit(false)
        setEditedofferData({
          offerName: "",
          offerWeight: "",
          offerInStock: "",
          offerPrice: "",
          offerPriceoff:"",
          offerDescrition: "",
          offerImage: null,
          offerImageURL: "",
          offerImagesub: null,
          offerImagesubURL: "",
          offerImagesubT: null,
          offerImagesubURLT: "",
          offerImagesubTH: null,
          offerImagesubURLTH: "",
        });
      })
      .catch((error) => {
        console.error("Error updating offer record: ", error);
      });
  };

  const cancelEditing = () => {
    setEditMode(false);
    setEditRecordKey("");
    setEditedofferData({
      offerName: "",
      offerWeight: "",
      offerInStock: "",
      offerPrice: "",
      offerPriceoff:"",
      offerDescrition: "",
      offerImage: null,
      offerImageURL: "",
      offerImagesub: null,
      offerImagesubURL: "",
      offerImagesubT: null,
      offerImagesubURLT: "",
      offerImagesubTH: null,
      offerImagesubURLTH: "",
    });
  };

  const deleteRecord = (key) => {
    const offerRef = ref(db, `specialOffer/${key}`);
    remove(offerRef)
      .then(() => {
        console.log("offer record deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting offer record: ", error);
      });
  };

  return (
  
    


<div className="">
    
    
       



      <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Special Offer</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the Special Offer in your account including their name, price , stock  and images.
          </p>
        </div>

        <Button
          onClick={open}
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create 
        </Button>


        <Dialog open={isOpen} as="div" className="relative z-50" onClose={close}>
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-4 shadow-lg">
              <DialogTitle as="h3" className="text-lg font-medium text-gray-900">
                Create a New Special Offer
              </DialogTitle>

              <div className="max-h-[80vh] overflow-y-auto">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Offer item Name</label>
                  <input
                    type="text"
                    name="offerName"
                    value={newofferData.offerName}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Offer item Weight</label>
                  <input
                    type="text"
                    name="offerWeight"
                  value={newofferData.offerWeight}
      
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700"> Offer item InStock </label>
                  <input
                    type="text"
                    name="offerInStock"
                  value={newofferData.offerInStock}
                  onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Offer item Price ($)</label>
                  <input
                    type="number"
                    name="offerPrice"
                  value={newofferData.offerPrice}
                  onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700"> Offer item Priceoff ($)</label>
                  <input
                    type="number"
                    name="offerPriceoff"
                    value={newofferData.offerPriceoff}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                         name="offerDescrition"
                         value={newofferData.offerDescrition}
                         onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    rows="3"
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700"> Offer Itme Main Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {newofferData.offerImageURL && (
                    <img src={newofferData.offerImageURL} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Sub Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangesub}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {newofferData.offerImagesubURL && (
                    <img src={newofferData.offerImagesubURL} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Sub Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangesub2}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {newofferData.offerImagesubURLT && (
                    <img src={newofferData.offerImagesubURLT} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Sub Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangesub3}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {newofferData.offerImagesubURLTH && (
                    <img src={newofferData.offerImagesubURLTH} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-2">
                  <Button
                    className="bg-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-indigo-600 px-4 py-2 text-white rounded-md hover:bg-indigo-500"
                    onClick={createNewRecord}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Image
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Price ($)
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Weight
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    In Stock
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {offerRecords.map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="size-11 shrink-0">
                          <img
                            alt={item.data.offerName}
                            src={item.data.offerImageURL || "https://via.placeholder.com/50"}
                            className=" w-20 h-14 object-cover"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                      {item.data.offerName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      $ {item.data.offerPrice}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {item.data.offerWeight}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${item.data.offerInStock.toLowerCase() === "yes"
                          ? "bg-green-50 text-green-700 ring-green-600/20"
                          : "bg-red-50 text-red-700 ring-red-600/20"
                          }`}
                      >
                        {item.data.offerInStock}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">

                      <button className="rounded-md bg-indigo-500 mr-3 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        onClick={() => startEditing(item.key, item.data)}
                      >
                        Edit
                      </button>

                      <button onClick={() => deleteRecord(item.key)}
                        className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    



      <Dialog open={isOpenEdit} as="div" className="relative z-50" onClose={()=> setIsOpenEdit(true )}>
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-4 shadow-lg">
              <DialogTitle as="h3" className="text-lg font-medium text-gray-900">
                Edit  a Special Offer 
              </DialogTitle>

              <div className="max-h-[80vh] overflow-y-auto">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Offer item Name</label>
                  <input
                    type="text"
                    name="offerName"
                    value={editedofferData.offerName}
                    onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Offer item Weight</label>
                  <input
                    type="text"
                    name="offerWeight"
                  value={editedofferData.offerWeight}
      
                    onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700"> Offer item InStock </label>
                  <input
                    type="text"
                    name="offerInStock"
                  value={editedofferData.offerInStock}
                  onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Offer item Price ($)</label>
                  <input
                    type="number"
                    name="offerPrice"
                  value={editedofferData.offerPrice}
                  onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700"> Offer item Priceoff ($)</label>
                  <input
                    type="number"
                    name="offerPriceoff"
                    value={editedofferData.offerPriceoff}
                    onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                         name="offerDescrition"
                         value={editedofferData.offerDescrition}
                         onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    rows="3"
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700"> Offer Itme Main Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {editedofferData.offerImageURL && (
                    <img src={editedofferData.offerImageURL} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Sub Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangesubEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {editedofferData.offerImagesubURL && (
                    <img src={editedofferData.offerImagesubURL} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Sub Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangesub2Eidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {editedofferData.offerImagesubURLT && (
                    <img src={editedofferData.offerImagesubURLT} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Sub Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangesub3Eidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {editedofferData.offerImagesubURLTH && (
                    <img src={editedofferData.offerImagesubURLTH} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-2">
                  <Button
                    className="bg-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-indigo-600 px-4 py-2 text-white rounded-md hover:bg-indigo-500"
                    onClick={saveEditedRecord}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

    </div >
    </div>
  );
};

export default SpecialOffer;
