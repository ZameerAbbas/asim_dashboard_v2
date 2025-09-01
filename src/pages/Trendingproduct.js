import { useEffect, useState } from "react";
import { db } from "../components/firebase";
import { onValue, push, ref, remove, update } from "firebase/database";
import "../css/gems.css";
import Logout from "./Logout";
import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'
const Trendingproduct = () => {
  // soting data nodes in state
  const [trendingRecords, setTrendingRecords] = useState([]);


  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);


  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }


  // inintal data nodes
  const [newtrenData, setNewtrenData] = useState({
    trendingName: "",
    trendingWeight: "",
    trendingInStock: "",
    trendingPrice: "",
    trendingDescrition: "",
    trendingImage: null,
    trendingImageURL: "",
    trendingImagesub: null,
    trendingImagesubURL: "",
    trendingImagesubT: null,
    trendingImagesubURLT: "",
    trendingImagesubTH: null,
    trendingImagesubURLTH: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editRecordKey, setEditRecordKey] = useState("");
  // initall editable data storing
  const [editedtrendingData, setEditedtrendingData] = useState({
    trendingName: "",
    trendingWeight: "",
    trendingInStock: "",
    trendingPrice: "",
    trendingDescrition: "",
    trendingImage: null,
    trendingImageURL: "",
    trendingImagesub: null,
    trendingImagesubURL: "",
    trendingImagesubT: null,
    trendingImagesubURLT: "",
    trendingImagesubTH: null,
    trendingImagesubURLTH: "",
  });

  useEffect(() => {
    const trendRef = ref(db, "trendingProducts");
    onValue(trendRef, (snapshot) => {
      let records = [];

      snapshot.forEach((childSnapshot) => {
        let keyname = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyname, data: data });
      });
      setTrendingRecords(records);
    });
    // console.log(mineralRecords)
  }, []);

  const createNewRecord = () => {
    const specialRef = ref(db, "trendingProducts");
    push(specialRef, {
      ...newtrenData,
      trendingPrice: parseFloat(newtrenData.trendingPrice),
    })
      .then(() => {
        alert("New mineral record created successfully!");
        setNewtrenData({
          trendingName: "",
          trendingWeight: "",
          trendingInStock: "",
          trendingPrice: "",
          trendingDescrition: "",
          trendingImage: null,
          trendingImageURL: "",
          trendingImagesub: null,
          trendingImagesubURL: "",
          trendingImagesubT: null,
          trendingImagesubURLT: "",
          trendingImagesubTH: null,
          trendingImagesubURLTH: "",
        });
      })
      .catch((error) => {
        alert("Error creating mineral record: ", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewtrenData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewtrenData((prevData) => ({
          ...prevData,
          trendingImage: imageFile,
          trendingImageURL: reader.result,
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
        setNewtrenData((prevData) => ({
          ...prevData,
          trendingImagesub: imageFile,
          trendingImagesubURL: reader.result,
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
        setNewtrenData((prevData) => ({
          ...prevData,
          ImagesubT: imageFile,
          trendingImagesubURLT: reader.result,
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
        setNewtrenData((prevData) => ({
          ...prevData,
          trendingImagesubTH: imageFile,
          trendingImagesubURLTH: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };





  const handleInputChangeEidt = (event) => {
    const { name, value } = event.target;
    setEditedtrendingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChangeEidt = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedtrendingData((prevData) => ({
          ...prevData,
          trendingImage: imageFile,
          trendingImageURL: reader.result,
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
        setEditedtrendingData((prevData) => ({
          ...prevData,
          trendingImagesub: imageFile,
          trendingImagesubURL: reader.result,
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
        setEditedtrendingData((prevData) => ({
          ...prevData,
          trendingImagesubT: imageFile,
          trendingImagesubURLT: reader.result,
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
        setEditedtrendingData((prevData) => ({
          ...prevData,
          trendingImagesubTH: imageFile,
          trendingImagesubURLTH: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };


  const startEditing = (key, data) => {
    setEditMode(true);
    setEditRecordKey(key);
    setIsOpenEdit(true)
    setEditedtrendingData({
      ...data,
      trendingImageURL: data.trendingImageURL,
      trendingImagesubURL: data.trendingImagesubURL,
      trendingImagesubURLT: data.trendingImagesubURLT,
      trendingImagesubURLTH: data.trendingImagesubURLTH,
    });
  };

  const saveEditedRecord = () => {
    const trendRef = ref(db, `trendingProducts/${editRecordKey}`);
    update(trendRef, editedtrendingData)
      .then(() => {
        console.log("Mineral record updated successfully!");
        setEditMode(false);
        setEditRecordKey("");
        setEditedtrendingData({
          trendingName: "",
          trendingWeight: "",
          trendingInStock: "",
          trendingPrice: "",
          trendingDescrition: "",
          trendingImage: null,
          trendingImageURL: "",
          trendingImagesub: null,
          trendingImagesubURL: "",
          trendingImagesubT: null,
          trendingImagesubURLT: "",
          trendingImagesubTH: null,
          trendingImagesubURLTH: "",
        });
      })
      .catch((error) => {
        console.error("Error updating offer record: ", error);
      }).finally(() => {
  setIsOpenEdit(false);
});
  };

  const cancelEditing = () => {
    setEditMode(false);
    setEditRecordKey("");
    setEditedtrendingData({
      trendingName: "",
      trendingWeight: "",
      trendingInStock: "",
      trendingPrice: "",
      trendingDescrition: "",
      trendingImage: null,
      trendingImageURL: "",
      trendingImagesub: null,
      trendingImagesubURL: "",
      trendingImagesubT: null,
      trendingImagesubURLT: "",
      trendingImagesubTH: null,
      trendingImagesubURLTH: "",
    });
  };

  const deleteRecord = (key) => {
    const trendRef = ref(db, `trendingProducts/${key}`);
    remove(trendRef)
      .then(() => {
        console.log("offer record deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting offer record: ", error);
      });
  };

  return (
    <div className="Dashboardconatainer">
   
    

    <div className="">
    
    
       



      <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Trending Product</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the Trending Product in your account including their name, price , stock  and images.
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
                Create a New 
              </DialogTitle>

              <div className="max-h-[80vh] overflow-y-auto">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700"> item Name</label>
                  <input
                    type="text"
                    name="trendingName"
                    value={newtrenData.trendingName}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700"> item Weight</label>
                  <input
                    type="text"
                    name="trendingWeight"
                  value={newtrenData.trendingWeight}
      
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">  item InStock </label>
                  <input
                    type="text"
                    name="trendingInStock"
                  value={newtrenData.trendingInStock}
                  onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700"> item Price ($)</label>
                  <input
                    type="number"
                    name="trendingPrice"
                  value={newtrenData.trendingPrice}
                  onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                         name="trendingDescrition"
                         value={newtrenData.trendingDescrition}
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
                  {newtrenData.trendingImageURL && (
                    <img src={newtrenData.trendingImageURL} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                  {newtrenData.trendingImagesubURL && (
                    <img src={newtrenData.trendingImagesubURL} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                  {newtrenData.trendingImagesubURLT && (
                    <img src={newtrenData.trendingImagesubURLT} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                  {newtrenData.trendingImagesubURLTH && (
                    <img src={newtrenData.trendingImagesubURLTH} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                {trendingRecords.map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="size-11 shrink-0">
                          <img
                            alt={item.data.trendingName}
                            src={item.data.trendingImageURL || "https://via.placeholder.com/50"}
                            className=" w-20 h-14 object-cover"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                      {item.data.trendingName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      $ {item.data.trendingPrice}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {item.data.trendingWeight}
                    </td>
                    {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${item.data.offerInStock.toLowerCase() === "yes"
                          ? "bg-green-50 text-green-700 ring-green-600/20"
                          : "bg-red-50 text-red-700 ring-red-600/20"
                          }`}
                      >
                        {item.data.offerInStock}
                      </span>
                    </td> */}
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
                Edit  a  Trending 
              </DialogTitle>

              <div className="max-h-[80vh] overflow-y-auto">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700"> item Name</label>
                  <input
                    type="text"
                    name="trendingName"
                    value={editedtrendingData.trendingName}
                    onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700"> item Weight</label>
                  <input
                    type="text"
                    name="trendingWeight"
                  value={editedtrendingData.trendingWeight}
      
                    onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">  item InStock </label>
                  <input
                    type="text"
                    name="trendingInStock"
                  value={editedtrendingData.trendingInStock}
                  onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700"> item Price ($)</label>
                  <input
                    type="number"
                    name="trendingPrice"
                  value={editedtrendingData.trendingPrice}
                  onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                         name="trendingDescrition"
                         value={editedtrendingData.trendingDescrition}
                         onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    rows="3"
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">  Itme Main Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {editedtrendingData.trendingImageURL && (
                    <img src={editedtrendingData.trendingImageURL} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                  {editedtrendingData.trendingImagesubURL && (
                    <img src={editedtrendingData.trendingImagesubURL} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                  {editedtrendingData.trendingImagesubURLT && (
                    <img src={editedtrendingData.trendingImagesubURLT} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                  {editedtrendingData.trendingImagesubURLTH && (
                    <img src={editedtrendingData.trendingImagesubURLTH} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
                  )}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-2">
                  <Button
                    className="bg-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-400"
                    onClick={() => setIsOpenEdit(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-indigo-600 px-4 py-2 text-white rounded-md hover:bg-indigo-500"
                    onClick={saveEditedRecord}
                  >
                    update
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

    </div >
    </div>
    
    </div>




  );
};

export default Trendingproduct;
