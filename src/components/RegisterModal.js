import { useEffect, useState } from "react";
import Select from "react-select"; 
import { db } from "../firebase";
import { doc, collection, getDocs, addDoc, query, where, updateDoc } from "firebase/firestore";

export function RegisterModal({
  setIsModalOpen, setIsModifyModalOpen, user, defaultDish, isNewRegistration}) {
  const [vegiOptions,  setVegiOptions] = useState([]);
  const [meatOptions,  setMeatOptions] = useState([]);
  const [fishOptions,  setFishOptions] = useState([]);
  const [otherOptions, setOtherOptions] = useState([]);
  const [displayOptions, setDisplayOptions] = useState([]);
  const [foodlist, setFoodlist] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vegitablesCollectionRef = query(collection(db, 'food'), where('group', '==', 'vegitables'));
          getDocs(vegitablesCollectionRef).then((querySnapshot) => {
            setVegiOptions(querySnapshot.docs.map((doc) => ({ value: doc.id, label: doc.data().name})))
          });
        const meatCollectionRef = query(collection(db, 'food'), where('group', '==', 'meat'));
          getDocs(meatCollectionRef).then((querySnapshot) => {
            setMeatOptions(querySnapshot.docs.map((doc) => ({ value: doc.id, label: doc.data().name})))
          });
        const fishCollectionRef = query(collection(db, 'food'), where('group', '==', 'fish'));
          getDocs(fishCollectionRef).then((querySnapshot) => {
            setFishOptions(querySnapshot.docs.map((doc) => ({ value: doc.id, label: doc.data().name})))
            });
        const otherCollectionRef = query(collection(db, 'food'), where('group', '==', 'others'));
          getDocs(otherCollectionRef).then((querySnapshot) => {
            setOtherOptions(querySnapshot.docs.map((doc) => ({ value: doc.id, label: doc.data().name})))
          });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
        
    fetchData();

  }, []);

  useEffect(() => {
    if( isNewRegistration == false ) {
      const allOptions = [
        ...vegiOptions, 
        ...meatOptions,
        ...fishOptions,
        ...otherOptions
      ];

      const defaultFoodId = defaultDish.usedFoodId;
      const defaultOptions = allOptions.filter((option) =>
        defaultFoodId.includes(option.value));

      setDisplayOptions(defaultOptions);
    } 
  }, [vegiOptions, meatOptions, fishOptions, otherOptions]);      

  const groupedOptions = [
    { label: '野菜',  options: vegiOptions },
    { label: '肉',    options: meatOptions },
    { label: '魚',    options: fishOptions },
    { label: 'その他', options: otherOptions },
  ];

  // もう少し簡潔に書く方法がありそう
  const handleChange = (selectedOptions) => {
    setDisplayOptions(selectedOptions);
    const selectedFood = [];
    selectedOptions.forEach((selectedOption) => {
        selectedFood.push(selectedOption.value);   
    });
    setFoodlist(selectedFood);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const dishName = e.target.elements.dishName;

    if( isNewRegistration == true ) {
      const dishListCollectionRef = collection(db, 'users', user.uid, 'dish-list');
      addDoc(dishListCollectionRef, {
        name: dishName.value,
        usedFoodId: foodlist
      });
      setIsModalOpen(false);
    } else {
      // dishName.value, foodlistを元にfirestoreのドキュメントを修正する処理
      const defaultDishDocRef = doc(db, 'users', user.uid, 'dish-list', defaultDish.id);
      updateDoc(defaultDishDocRef, {
        name: dishName.value,
        usedFoodId: foodlist
      });
      setIsModifyModalOpen(false);
    }
  }

  const modalClose = () => {
    if( isNewRegistration == true ) {
      setIsModalOpen(false);
    } else {
      setIsModifyModalOpen(false);
    }
  };

  return (
    <div className='modal'>
      <div className='modal-inner'>
        <form onSubmit={handleSubmit}>
          <input type='text' 
          // placeholderじゃなくてvalueにしたい
          placeholder={defaultDish !== undefined ? defaultDish.name : '料理名'}
          name="dishName"></input>
          <div className="food-select">
            <h3>使った食材</h3>
            <Select
              options={groupedOptions}
              isMulti
              id="select_list"
              value={displayOptions}
              onChange={handleChange}
            />
          </div>
          <button className="save-btn">保存</button>
        </form>
        <button
          className='modal-close-btn'
          onClick={() => modalClose()}
        >
          ×
        </button>
      </div>
    </div>
  );
}