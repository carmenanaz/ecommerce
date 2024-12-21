import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { addDoc, collection, documentId, getDocs, query, where, writeBatch } from "firebase/firestore";
import { db } from "../../services/firebase";

function Checkout() {
  const [orderCreated, setOrderCreated] = useState(false)

  const {cart, totalQuantity, getTotal, clearCart} = useCart();

  const total = getTotal()

  const createOrder = async() =>{
    try{
    const objOrder= {
      buyer:{
        firstName: "Matias",
        lastName: "Perez",
        phone: 123456789,
        address: "Calle alsa 123",
        email: "ab@example.com"
      },
      items: cart,
      totalQuantity,
      total,
      date: new Date()
    }
    const ids = cart.map((item)=> item.id)
    const productRef = collection(db, "products")

    const productsAddedFromFirestore = await getDocs(
      query(productRef, where(documentId(), "in", ids)))

      const {docs} = productsAddedFromFirestore

      const outOfStock =[]

      const batch = writeBatch(db)

      docs.forEach((doc) => {
        const dataDoc = doc.data()
        const stockDb =  dataDoc.stock

        const productAddToCart = cart.find((prod) => prod.id ===doc.id)
        const prodQuantity = productAddToCart.quantity

        if (stockDb >= prodQuantity){
          batch.update(doc.ref, {stock: stockDb - prodQuantity})
        }else{
          outOfStock.push({id: doc.id, ...dataDoc})
        }
      })

      if (outOfStock.length===0){
        await batch.commit();
        const orderRef = collection(db, "orders")
        const orderAdded = await addDoc(orderRef, objOrder)
        alert(`El id de su orden es: ${orderAdded.id}`)
        setOrderCreated(true) 
        clearCart()
      }else{
        console.log("Hay productos sin stock")
      }
    }catch(error){
      console.log(error)
    }
  }

  if(orderCreated){
    <h1>La orden fue creada con exito</h1>
  }

  return (
    <div>
        {/* <form onSubmit={createOrder}>
            <label>Nombre</label>
            <input type="text" />
            <label>Apellido</label>
            <input type="text" />
            <label>Email</label>
            <input type="email" />
            <label>Telefono</label>
            <input type="number" />
           
           <button type="submit">Finalizar compra</button>
        </form> */}
        <button onClick={createOrder}>Generar orden de compra</button>
    </div>
  );
}

export default Checkout