import { useEffect, useState } from "react";
import Select from "react-select";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const FoodSelect = () => {
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const foodCollectionRef = collection(db, 'food');
        getDocs(foodCollectionRef).then((querySnapshot) => {
            setOptions(querySnapshot.docs.map((doc) => ({ value: doc.id, label: doc.data().name})))
        });
        
    }, []);

    return (
        <div>
            <Select 
                options={options}
                isMulti
                />
        </div>
    );
};


