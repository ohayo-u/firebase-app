import { useEffect, useState } from "react";
import Select from "react-select";
import { db, storage } from "../firebase";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { deleteObject, ref, uploadBytes } from "firebase/storage";

export function ModifyModal({ setIsModifyModalOpen, user, defaultDish }) {
  const [vegiOptions, setVegiOptions] = useState([]);
  const [meatOptions, setMeatOptions] = useState([]);
  const [fishOptions, setFishOptions] = useState([]);
  const [otherOptions, setOtherOptions] = useState([]);
  const [displayOptions, setDisplayOptions] = useState([]);
  const [image, setImage] = useState();
  const [foodlist, setFoodlist] = useState(defaultDish.usedFoodId);
  const [dishName, setDishName] = useState(defaultDish.name);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vegitablesCollectionRef = query(
          collection(db, "food"),
          where("group", "==", "vegitables")
        );
        getDocs(vegitablesCollectionRef).then((querySnapshot) => {
          setVegiOptions(
            querySnapshot.docs.map((doc) => ({
              value: doc.id,
              label: doc.data().name,
            }))
          );
        });
        const meatCollectionRef = query(
          collection(db, "food"),
          where("group", "==", "meat")
        );
        getDocs(meatCollectionRef).then((querySnapshot) => {
          setMeatOptions(
            querySnapshot.docs.map((doc) => ({
              value: doc.id,
              label: doc.data().name,
            }))
          );
        });
        const fishCollectionRef = query(
          collection(db, "food"),
          where("group", "==", "fish")
        );
        getDocs(fishCollectionRef).then((querySnapshot) => {
          setFishOptions(
            querySnapshot.docs.map((doc) => ({
              value: doc.id,
              label: doc.data().name,
            }))
          );
        });
        const otherCollectionRef = query(
          collection(db, "food"),
          where("group", "==", "others")
        );
        getDocs(otherCollectionRef).then((querySnapshot) => {
          setOtherOptions(
            querySnapshot.docs.map((doc) => ({
              value: doc.id,
              label: doc.data().name,
            }))
          );
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const allOptions = [
      ...vegiOptions,
      ...meatOptions,
      ...fishOptions,
      ...otherOptions,
    ];

    const defaultFoodId = defaultDish.usedFoodId;
    const defaultOptions = allOptions.filter((option) =>
      defaultFoodId.includes(option.value)
    );

    setDisplayOptions(defaultOptions);
  }, [vegiOptions, meatOptions, fishOptions, otherOptions]);

  const groupedOptions = [
    { label: "野菜", options: vegiOptions },
    { label: "肉", options: meatOptions },
    { label: "魚", options: fishOptions },
    { label: "その他", options: otherOptions },
  ];

  const optionChange = (selectedOptions) => {
    setDisplayOptions(selectedOptions);
    const selectedFood = [];
    selectedOptions.forEach((selectedOption) => {
      selectedFood.push(selectedOption.value);
    });
    setFoodlist(selectedFood);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dishName = e.target.elements.dishName.value;

    const defaultDishDocRef = doc(
      db,
      "users",
      user.uid,
      "dish-list",
      defaultDish.id
    );
    defaultDish.imageURL && deleteObject(ref(storage, defaultDish.imageURL));
    if (image) {
      const imageUrl = `images/dish/${user.uid}/${image.name}`;
      const dishImageRef = ref(storage, imageUrl);
      uploadBytes(dishImageRef, image).then(() => {
        setDoc(defaultDishDocRef, {
          name: dishName,
          usedFoodId: foodlist,
          imageURL: imageUrl,
        });
      });
    } else {
      setDoc(defaultDishDocRef, {
        name: dishName,
        usedFoodId: foodlist,
      });
    }
    setIsModifyModalOpen(false);
  };

  return (
    <>
      <div className="modal" onClick={() => setIsModifyModalOpen(false)}></div>
      <div className="modal-inner">
        <form onSubmit={handleSubmit}>
          <input
            accept=".png, .jpg, .jpeg"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
          <input
            name="dishName"
            onChange={(e) => setDishName(e.target.value)}
            placeholder="料理名"
            type="text"
            value={dishName}
          ></input>
          <div className="food-select">
            <h3>使った食材</h3>
            <Select
              options={groupedOptions}
              isMulti
              id="select_list"
              value={displayOptions}
              onChange={optionChange}
            />
          </div>
          <button className="save-btn">保存</button>
        </form>
        <button
          className="modal-close-btn"
          onClick={() => setIsModifyModalOpen(false)}
        >
          ×
        </button>
      </div>
    </>
  );
}
