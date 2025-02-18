import { useEffect, useState } from "react";
import { db } from "../components/firebase";
import { onValue, push, ref, remove, update } from "firebase/database";




import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'


const MineralsDashboard = () => {


  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);


  
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const [mineralRecords, setMineralRecords] = useState([]);
  const [newMineralData, setNewMineralData] = useState({
    mineralName: "",
    mineralWeight: "",
    mineralInStock: "",
    mineralPrice: "",
    mineralDescrition: "",
    mineralImage: null,
    mineralImageURL: "",
    mineralImagesub: null,
    mineralImagesubURL: "",
    mineralImagesubT: null,
    mineralImagesubURLT: "",
    mineralImagesubTH: null,
    mineralImagesubURLTH: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editRecordKey, setEditRecordKey] = useState("");
  const [editedMineralData, setEditedMineralData] = useState({
    mineralName: "",
    mineralWeight: "",
    mineralInStock: "",
    mineralPrice: "",
    mineralDescrition: "",
    mineralImage: null,
    mineralImageURL: "",
    mineralImagesub: null,
    mineralImagesubURL: "",
    mineralImagesubT: null,
    mineralImagesubURLT: "",
    mineralImagesubTH: null,
    mineralImagesubURLTH: "",
  });

  useEffect(() => {
    const mineralsRef = ref(db, "minerals");
    onValue(mineralsRef, (snapshot) => {
      let records = [];

      snapshot.forEach((childSnapshot) => {
        let keyname = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyname, data: data });
      });
      setMineralRecords(records);
      
    });
    // console.log(mineralRecords)
  }, []);

  const createNewRecord = () => {
    const mineralsRef = ref(db, "minerals");
    push(mineralsRef, {
      ...newMineralData,
      mineralPrice: parseFloat(newMineralData.mineralPrice),
    })
      .then(() => {
        alert("New mineral record created successfully!");
        setNewMineralData({
          mineralName: "",
          mineralWeight: "",
          mineralInStock: "",
          mineralPrice: "",
          mineralDescrition: "",
          mineralImage: null,
          mineralImageURL: "",
          mineralImagesubT: null,
          mineralImagesubURLT: "",
          mineralImagesubTH: null,
          mineralImagesubURLTH: "",
        });
      })
      .catch((error) => {
        alert("Error creating mineral record: ", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMineralData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewMineralData((prevData) => ({
          ...prevData,
          mineralImage: imageFile,
          mineralImageURL: reader.result,
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
        setNewMineralData((prevData) => ({
          ...prevData,
          mineralImagesub: imageFile,
          mineralImagesubURL: reader.result,
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
        setNewMineralData((prevData) => ({
          ...prevData,
          mineralImagesubT: imageFile,
          mineralImagesubURLT: reader.result,
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
        setNewMineralData((prevData) => ({
          ...prevData,
          mineralImagesubTH: imageFile,
          mineralImagesubURLTH: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const startEditing = (key, data) => {
    setEditMode(true);
    setIsOpenEdit(true)
    setEditRecordKey(key);
    setEditedMineralData({
      ...data,
      mineralImageURL: data.mineralImageURL,
      mineralImagesubURL: data.mineralImagesubURL,
      mineralImagesubURLT: data.mineralImagesubURLT,
      mineralImagesubURLTH: data.mineralImagesubURLTH,
    });
  };



  const handleInputChangeEidt = (event) => {
    const { name, value } = event.target;
    setEditedMineralData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleImageChangeEdit = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedMineralData((prevData) => ({
          ...prevData,
          mineralImage: imageFile,
          mineralImageURL: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesubEdit = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedMineralData((prevData) => ({
          ...prevData,
          mineralImagesub: imageFile,
          mineralImagesubURL: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesub2Edit = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedMineralData((prevData) => ({
          ...prevData,
          mineralImagesubT: imageFile,
          mineralImagesubURLT: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };
  const handleImageChangesub3Edit = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedMineralData((prevData) => ({
          ...prevData,
          mineralImagesubTH: imageFile,
          mineralImagesubURLTH: reader.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const saveEditedRecord = () => {
    const mineralsRef = ref(db, `minerals/${editRecordKey}`);
    update(mineralsRef, editedMineralData)
      .then(() => {
        console.log("Mineral record updated successfully!");
        setEditMode(false);
        setEditRecordKey("");
        setEditedMineralData({
          mineralName: "",
          mineralWeight: "",
          mineralInStock: "",
          mineralPrice: "",
          mineralDescrition: "",
          mineralImage: null,
          mineralImageURL: "",
          mineralImagesub: null,
          mineralImagesubURL: "",
          mineralImagesubT: null,
          mineralImagesubURLT: "",
          mineralImagesubTH: null,
          mineralImagesubURLTH: "",
        });
        setIsOpenEdit(false)
      })
      .catch((error) => {
        console.error("Error updating mineral record: ", error);
      });
  };

  const cancelEditing = () => {
    setEditMode(false);
    setEditRecordKey("");
    setEditedMineralData({
      mineralName: "",
      mineralWeight: "",
      mineralInStock: "",
      mineralPrice: "",
      mineralDescrition: "",
      mineralImage: null,
      mineralImageURL: "",
      mineralImagesub: null,
      mineralImagesubURL: "",
      mineralImagesubT: null,
      mineralImagesubURLT: "",
      mineralImagesubTH: null,
      mineralImagesubURLTH: "",
    });
  };

  const deleteRecord = (key) => {
    const mineralsRef = ref(db, `minerals/${key}`);
    remove(mineralsRef)
      .then(() => {
        console.log("Mineral record deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting mineral record: ", error);
      });
  };

  return (
    <div className="">
    
    
       



      <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Minerals</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the Minerals in your account including their name, price , stock  and images.
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
                Create a New Mineral
              </DialogTitle>

              <div className="max-h-[80vh] overflow-y-auto">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Mineral Name</label>
                  <input
                    type="text"
                    name="mineralName"
                    value={newMineralData.mineralName}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Mineral Weight</label>
                  <input
                    type="text"
                    name="mineralWeight"
                    value={newMineralData.mineralWeight}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Mineral In Stock</label>
                  <input
                    type="text"
                    name="mineralInStock"
                    value={newMineralData.mineralInStock}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Mineral Price ($)</label>
                  <input
                    type="number"
                    name="mineralPrice"
                    value={newMineralData.mineralPrice}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="mineralDescrition"
                    value={newMineralData.mineralDescrition}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    rows="3"
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Mineral Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {newMineralData.mineralImageURL && (
                    <img src={newMineralData.mineralImageURL} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                  {newMineralData.mineralImagesubURL && (
                    <img src={newMineralData.mineralImagesubURL} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                  {newMineralData.mineralImagesubURLT && (
                    <img src={newMineralData.mineralImagesubURLT} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                  {newMineralData.mineralImagesubURLTH && (
                    <img src={newMineralData.mineralImagesubURLTH} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                {mineralRecords.map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="size-11 shrink-0">
                          <img
                            alt={item.data.mineralName}
                            src={item.data.mineralImageURL || "https://via.placeholder.com/50"}
                            className=" w-20 h-14 object-cover"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                      {item.data.mineralName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      $ {item.data.mineralPrice}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {item.data.mineralWeight}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${item.data.mineralInStock.toLowerCase() === "yes"
                          ? "bg-green-50 text-green-700 ring-green-600/20"
                          : "bg-red-50 text-red-700 ring-red-600/20"
                          }`}
                      >
                        {item.data.mineralInStock}
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
                Create a New Mineral
              </DialogTitle>

              <div className="max-h-[80vh] overflow-y-auto">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Mineral Name</label>
                  <input
                    type="text"
                    name="mineralName"
                    value={editedMineralData.mineralName}
                    onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Mineral Weight</label>
                  <input
                    type="text"
                    name="mineralWeight"
                    value={editedMineralData.mineralWeight}
                    onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Mineral In Stock</label>
                  <input
                    type="text"
                    name="mineralInStock"
                    value={editedMineralData.mineralInStock}
                    onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Mineral Price ($)</label>
                  <input
                    type="number"
                    name="mineralPrice"
                    value={editedMineralData.mineralPrice}
                    onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="mineralDescrition"
                    value={editedMineralData.mineralDescrition}
                    onChange={handleInputChangeEidt}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    rows="3"
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Mineral Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangeEdit}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {editedMineralData.mineralImageURL && (
                    <img src={editedMineralData.mineralImageURL} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Sub Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangesubEdit}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {editedMineralData.mineralImagesubURL && (
                    <img src={editedMineralData.mineralImagesubURL} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Sub Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangesub2Edit}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {editedMineralData.mineralImagesubURLT && (
                    <img src={editedMineralData.mineralImagesubURLT} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Sub Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangesub3Edit}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {editedMineralData.mineralImagesubURLTH && (
                    <img src={editedMineralData.mineralImagesubURLTH} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                    Update
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

export default MineralsDashboard;
