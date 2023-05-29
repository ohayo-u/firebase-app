import React, { useEffect, useState } from "react";
import Select from "react-select";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Props {
  displayOptions: any;
  setDisplayOptions: any;
  setFoodlist: any;
  isModify: boolean;
  defaultDish: any;
}

export const FoodSelect: React.FC<Props> = (props) => {
  const [vegeOptions, setVegeOptions] = useState<any>([]);
  const [fruitsOptions, setFruitsOptions] = useState<any>([]);
  const [meatOptions, setMeatOptions] = useState<any>([]);
  const [fishOptions, setFishOptions] = useState<any>([]);
  const [otherOptions, setOtherOptions] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vegetablesCollectionRef = query(
          collection(db, "food"),
          where("group", "==", "vegetables")
        );
        getDocs(vegetablesCollectionRef).then((querySnapshot) => {
          setVegeOptions(
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
    { label: "野菜", options: vegeOptions },
    { label: "果物", options: fruitsOptions },
    { label: "肉", options: meatOptions },
    { label: "魚", options: fishOptions },
    { label: "その他", options: otherOptions },
  ];

  useEffect(() => {
    if (props.isModify) {
      const allOptions = [
        ...vegeOptions,
        ...fruitsOptions,
        ...meatOptions,
        ...fishOptions,
        ...otherOptions,
      ];

      const defaultFoodId = props.defaultDish.usedFoodId;
      const defaultOptions = allOptions.filter((option) =>
        defaultFoodId.includes(option.value)
      );

      props.setDisplayOptions(defaultOptions);
    }
  }, [vegeOptions, fruitsOptions, meatOptions, fishOptions, otherOptions]);

  const optionChange = (selectedOptions: any) => {
    props.setDisplayOptions(selectedOptions);
    const selectedFood: any[] = [];
    selectedOptions.forEach((selectedOption: any) => {
      selectedFood.push(selectedOption.value);
    });
    props.setFoodlist(selectedFood);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3 style={{ paddingRight: "20px" }}>使った食材</h3>
      <Select
        options={groupedOptions}
        isMulti
        value={props.displayOptions}
        onChange={optionChange}
      />
    </div>
  );
};
