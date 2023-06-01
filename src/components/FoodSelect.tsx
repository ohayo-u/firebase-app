import React, { useEffect, useState } from "react";
import Select from "react-select";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { DishType } from "../models/dish.model";

interface Props {
  setFoodlist: (value: string[]) => void;
  isModify: boolean;
  defaultDish: DishType | undefined;
}

type option = {
  value: string;
  label: string;
};

export const FoodSelect: React.FC<Props> = (props) => {
  const [vegeOptions, setVegeOptions] = useState<option[]>([]);
  const [fruitsOptions, setFruitsOptions] = useState<option[]>([]);
  const [meatOptions, setMeatOptions] = useState<option[]>([]);
  const [fishOptions, setFishOptions] = useState<option[]>([]);
  const [otherOptions, setOtherOptions] = useState<option[]>([]);
  const [displayOptions, setDisplayOptions] = useState<readonly option[]>([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const groups: {
          groupName: string;
          setFn: (value: option[]) => void;
        }[] = [
          { groupName: "vegetables", setFn: setVegeOptions },
          { groupName: "fruits", setFn: setFruitsOptions },
          { groupName: "meat", setFn: setMeatOptions },
          { groupName: "fish", setFn: setFishOptions },
          { groupName: "others", setFn: setOtherOptions },
        ];

        const fetchOptionData = (
          groupName: string,
          setFn: (value: option[]) => void
        ) => {
          const CollectionRef = query(
            collection(db, "food"),
            where("group", "==", groupName)
          );
          getDocs(CollectionRef).then((querySnapshot) => {
            setFn(
              querySnapshot.docs.map((doc) => ({
                value: doc.id,
                label: doc.data().name,
              }))
            );
          });
        };

        groups.forEach((group) => {
          fetchOptionData(group.groupName, group.setFn);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const groupedOptions: { label: string; options: option[] }[] = [
    { label: "野菜", options: vegeOptions },
    { label: "果物", options: fruitsOptions },
    { label: "肉", options: meatOptions },
    { label: "魚", options: fishOptions },
    { label: "その他", options: otherOptions },
  ];

  useEffect(
    () => {
      if (props.isModify) {
        const allOptions = [
          ...vegeOptions,
          ...fruitsOptions,
          ...meatOptions,
          ...fishOptions,
          ...otherOptions,
        ];
        const defaultFoodId = props.defaultDish!.usedFoodId;
        const defaultOptions = allOptions.filter((option) =>
          defaultFoodId.includes(option.value)
        );
        setDisplayOptions(defaultOptions);
      }
      console.log("useEffect");
    },
    groupedOptions.map((groupedOption) => {
      return groupedOption.options;
    })
  );

  const optionChange = (selectedOptions: readonly option[]) => {
    setDisplayOptions(selectedOptions);
    const selectedFood: string[] = [];
    selectedOptions.forEach((selectedOption: option) => {
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
        value={displayOptions}
        onChange={optionChange}
      />
    </div>
  );
};
