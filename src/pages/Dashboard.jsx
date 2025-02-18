
import { useEffect, useState } from "react";
import "../css/gems.css";
import Logout from "./Logout";
import { db } from "../components/firebase";
import { onValue, push, ref, remove, update } from "firebase/database";

import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react'

export default function Example() {

  const [records, setRecords] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  useEffect(() => {
    const dbRef = ref(db, "gems");
    onValue(dbRef, (snapshot) => {
      let records = [];

      snapshot.forEach((childSnapshot) => {
        let keyname = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyname, data: data });
      });
      setRecords(records);
    });
  }, []);


  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const [newGemData, setNewGemData] = useState({
    gemName: "",
    gemWeight: "",
    gemInstock: "",
    gemPrice: "",
    gemDescription: "",
    gemImage: null,
    gemImageURL: "",
    gemImagesub: null,
    gemImageURLsub: "",
    gemImagesubt: null,
    gemImageURLT: "",
    gemImagesubth: null,
    gemImageURLTh: "",
  });



  useEffect(() => {
    const dbRef = ref(db, "gems");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyname = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyname, data: data });
      });
      setRecords(records);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewGemData((prevData) => ({
        ...prevData,
        gemImage: file,
        gemImageURL: URL.createObjectURL(file),
      }));
    }
  };
  const handleImageChangesub1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewGemData((prevData) => ({
        ...prevData,
        gemImagesub: file,
        gemImageURLsub: URL.createObjectURL(file),
      }));
    }
  };
  const handleImageChangesub2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewGemData((prevData) => ({
        ...prevData,
        gemImagesubt: file,
        gemImageURLT: URL.createObjectURL(file),
      }));
    }
  };
  const handleImageChangesub3 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewGemData((prevData) => ({
        ...prevData,
        gemImagesubth: file,
        gemImageURLTh: URL.createObjectURL(file),
      }));
    }
  };

  const createNewRecord = () => {
    if (!newGemData.gemName || !newGemData.gemPrice) {
      alert("Please fill in all required fields!");
      return;
    }

    const gemOneRef = ref(db, "gems");
    push(gemOneRef, {
      ...newGemData,
      gemPrice: parseFloat(newGemData.gemPrice),
    })
      .then(() => {
        alert("New gem added successfully!");
        setNewGemData({
          gemName: "",
          gemWeight: "",
          gemInstock: "",
          gemPrice: "",
          gemDescription: "",
          gemImage: null,
          gemImageURL: "",
          gemImagesub: null,
          gemImageURLsub: "",
          gemImagesubt: null,
          gemImageURLT: "",
          gemImagesubth: null,
          gemImageURLTh: "",
        });
        setIsOpen(false);
      })
      .catch((error) => {
        alert("Error creating gem: " + error.message);
      });
  };





  const deleteRecord = (key) => {
    const dbRef = ref(db, `gems/${key}`);
    remove(dbRef)
      .then(() => {
        console.log("Gems  record deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting Gems  record: ", error);
      })
  }




  const handleInputChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditGemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChangeEdit = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditGemData((prevData) => ({
        ...prevData,
        gemImage: file,
        gemImageURL: URL.createObjectURL(file),
      }));
    }
  };
  const handleImageChangesub1Edit = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditGemData((prevData) => ({
        ...prevData,
        gemImagesub: file,
        gemImageURLsub: URL.createObjectURL(file),
      }));
    }
  };
  const handleImageChangesub2Edit = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditGemData((prevData) => ({
        ...prevData,
        gemImagesubt: file,
        gemImageURLT: URL.createObjectURL(file),
      }));
    }
  };
  const handleImageChangesub3Edit = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditGemData((prevData) => ({
        ...prevData,
        gemImagesubth: file,
        gemImageURLTh: URL.createObjectURL(file),
      }));
    }
  };



  const [editMode, setEditMode] = useState(false);
  const [editRecordKey, setEditRecordKey] = useState("");


  const [editGemData, setEditGemData] = useState({
    gemName: "",
    gemWeight: "",
    gemInstock: "",
    gemPrice: "",
    gemDescription: "",
    gemImage: null,
    gemImageURL: "",
    gemImagesub: null,
    gemImageURLsub: "",
    gemImagesubt: null,
    gemImageURLT: "",
    gemImagesubth: null,
    gemImageURLTh: "",
  });


  const startEditing = (key, data) => {
    setEditMode(true);
    setIsOpenEdit(true)
    setEditRecordKey(key);
    setEditGemData({
      ...data,
      gemName: data.gemName,
      gemWeight: data.gemWeight,
      gemInstock: data.gemInstock,
      gemPrice: data.gemPrice,
      gemDescription: data.gemDescription,
      gemImage: data.gemImage,
      gemImageURL: data.gemImageURL,
      gemImagesub: data.gemImagesub,
      gemImagesubt: data.gemImage,
    });
  };

  const saveEditedRecord = () => {
    const dbRef = ref(db, `gems/${editRecordKey}`);

    // Filter out undefined fields
    const cleanedData = Object.fromEntries(
      Object.entries(editGemData).filter(([_, value]) => value !== undefined)
    );

    update(dbRef, cleanedData)
      .then(() => {
        console.log("Gems record updated successfully!");
        setEditMode(false);
        setEditRecordKey("");
        setEditGemData({
          gemName: "",
          gemWeight: "",
          gemInstock: "",
          gemPrice: "",
          gemDescription: "",
          gemImage: null,
          gemImageURL: "",
          gemImagesub: null,
          gemImageURLsub: "",
          gemImagesubt: null,
          gemImageURLT: "",
          gemImagesubth: null,
          gemImageURLTh: "",
        });
        setIsOpenEdit(false)
      })
      .catch((error) => {
        console.error("Error updating Gems record: ", error);
      });
  };



  console.log("data", records)

  console.log("key", editRecordKey)


  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>

        <Button
          onClick={open}
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Gems
        </Button>


        <Dialog open={isOpen} as="div" className="relative z-50" onClose={close}>
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-4 shadow-lg">
              <DialogTitle as="h3" className="text-lg font-medium text-gray-900">
                Create a New Gem
              </DialogTitle>

              <div className="max-h-[80vh] overflow-y-auto">
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Gem Name</label>
                  <input
                    type="text"
                    name="gemName"
                    value={newGemData.gemName}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Gem Weight</label>
                  <input
                    type="text"
                    name="gemWeight"
                    value={newGemData.gemWeight}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Gem In Stock</label>
                  <input
                    type="text"
                    name="gemInstock"
                    value={newGemData.gemInstock}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Gem Price ($)</label>
                  <input
                    type="number"
                    name="gemPrice"
                    value={newGemData.gemPrice}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="gemDescription"
                    value={newGemData.gemDescription}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    rows="3"
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Gem Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {newGemData.gemImageURL && (
                    <img src={newGemData.gemImageURL} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Sub Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangesub1}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  />
                  {newGemData.gemImageURLsub && (
                    <img src={newGemData.gemImageURLsub} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                  {newGemData.gemImageURLT && (
                    <img src={newGemData.gemImageURLT} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                  {newGemData.gemImageURLTh && (
                    <img src={newGemData.gemImageURLTh} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                {records.map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="size-11 shrink-0">
                          <img
                            alt={item.data.gemName}
                            src={item.data.gemImageURL || "https://via.placeholder.com/50"}
                            className=" w-20 h-14 object-cover"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900">
                      {item.data.gemName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      $ {item.data.gemPrice}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {item.data.gemWeight}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${item.data.gemInstock.toLowerCase() === "yes"
                          ? "bg-green-50 text-green-700 ring-green-600/20"
                          : "bg-red-50 text-red-700 ring-red-600/20"
                          }`}
                      >
                        {item.data.gemInstock}
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

      <Dialog open={isOpenEdit} as="div" className="relative z-50" onClose={close}>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-4 shadow-lg ">
            <DialogTitle as="h3" className="text-lg font-medium text-gray-900">
              Create a New Gem
            </DialogTitle>

            <div className="max-h-[80vh] overflow-y-auto">
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Gem Name</label>
                <input
                  type="text"
                  name="gemName"
                  value={editGemData.gemName}
                  onChange={handleInputChangeEdit}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Gem Weight</label>
                <input
                  type="text"
                  name="gemWeight"
                  value={editGemData.gemWeight}
                  onChange={handleInputChangeEdit}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Gem In Stock</label>
                <input
                  type="text"
                  name="gemInstock"
                  value={editGemData.gemInstock}
                  onChange={handleInputChangeEdit}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Gem Price ($)</label>
                <input
                  type="number"
                  name="gemPrice"
                  value={editGemData.gemPrice}
                  onChange={handleInputChangeEdit}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="gemDescription"
                  value={editGemData.gemDescription}
                  onChange={handleInputChangeEdit}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  rows="3"
                ></textarea>
              </div>

              {/* Image Upload */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Gem Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangeEdit}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
                {editGemData.gemImageURL && (
                  <img src={editGemData.gemImageURL} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
                )}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Sub Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChangesub1Edit}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                />
                {editGemData.gemImagesub && (
                  <img src={editGemData.gemImagesub} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                {editGemData.gemImagesubt && (
                  <img src={editGemData.gemImagesubt} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
                {editGemData.gemImagesubth && (
                  <img src={editGemData.gemImagesubth} alt="Preview" className="mt-2 w-32 h-32 rounded-lg" />
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
  )
}
