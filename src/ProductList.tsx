import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

interface Product {
  name: string;
}

function ProductList() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [product, setProduct] = useState<Product[]>([]);
  const [newData, setNewData] = useState<string>("");

  const fetchDataFromFs = async () => {
    const querySnapshot = await getDocs(collection(db, "product"));
    const fetchedData: Product[] = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data() as Product;
      fetchedData.push({ name: docData.name });
    });
    setProduct(fetchedData);
  };

  useEffect(() => {
    fetchDataFromFs();
  }, []);

  const addData = async () => {
    if (newData) {
      await addDoc(collection(db, "product"), {
        name: newData,
      });
      setNewData("");
      fetchDataFromFs();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewData(e.target.value);
  };

  return (
    <div>
      <h2>Lisää tuote</h2>
      <ul>
        {product.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newData}
        onChange={handleInputChange}
        placeholder="Lisää tietoa"
      />
      <button onClick={addData}>Lisää</button>
    </div>
  );
}

export default ProductList;
