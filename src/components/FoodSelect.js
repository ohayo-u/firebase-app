import { useEffect, useState } from "react";
import Select from "react-select";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export function FoodSelect({
  displayOptions,
  setDisplayOptions,
  setFoodlist,
  isModify,
  defaultDish,
}) {
  const [vegiOptions, setVegiOptions] = useState([]);
  const [fruitsOptions, setFruitsOptions] = useState([]);
  const [meatOptions, setMeatOptions] = useState([]);
  const [fishOptions, setFishOptions] = useState([]);
  const [otherOptions, setOtherOptions] = useState([]);

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
        const fruitsCollectionRef = query(
          collection(db, "food"),
          where("group", "==", "fruits")
        );
        getDocs(fruitsCollectionRef).then((querySnapshot) => {
          setFruitsOptions(
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

  const groupedOptions = [
    { label: "野菜", options: vegiOptions },
    { label: "果物", options: fruitsOptions },
    { label: "肉", options: meatOptions },
    { label: "魚", options: fishOptions },
    { label: "その他", options: otherOptions },
  ];

  useEffect(() => {
    if (isModify) {
      const allOptions = [
        ...vegiOptions,
        ...fruitsOptions,
        ...meatOptions,
        ...fishOptions,
        ...otherOptions,
      ];

      const defaultFoodId = defaultDish.usedFoodId;
      const defaultOptions = allOptions.filter((option) =>
        defaultFoodId.includes(option.value)
      );

      setDisplayOptions(defaultOptions);
    }
  }, [vegiOptions, fruitsOptions, meatOptions, fishOptions, otherOptions]);

  const optionChange = (selectedOptions) => {
    setDisplayOptions(selectedOptions);
    const selectedFood = [];
    selectedOptions.forEach((selectedOption) => {
      selectedFood.push(selectedOption.value);
    });
    setFoodlist(selectedFood);
  };

  return (
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
  );
}
