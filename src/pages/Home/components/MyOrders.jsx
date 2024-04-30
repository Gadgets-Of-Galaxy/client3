import { Header } from "../../CommonComponents/components/Header";
import "../styles/Cart.css";
import { useState, useEffect } from "react";
import axios from "axios";

export const MyOrders = ({ user }) => {
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    const fetchChekoutItems = async () => {
      try {
        const response = await axios.get(
          `https://server2-acel.onrender.com/api/checkouts/${user._id}`
        );
        setCheckoutItems(response.data.checkoutItems || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (user && user._id) {
      fetchChekoutItems();
    }
  }, [user]);
  return (
    <>
      <Header user={user} />
      <div className="myAccount">
        <h1 className="cart-head-title">My Orders</h1>
        <div className="cart">
        {checkoutItems.length === 0 ? (
          <p className="nullmessage">No Orders Yet</p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th className="cart-image-column">Image</th>
                  <th className="cart-title-column">Title</th>
                  <th className="cart-price-column">Price</th>
                  <th className="cart-qty-column">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {checkoutItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.imagePath}
                        alt={item.title}
                        className="cart-item-image"
                      />
                    </td>
                    <td className="cart-title">{item.title}</td>
                    <td className="cart-price">Rs.{item.price}</td>
                    <td className="cart-qty">{item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      </div>
    </>
  );
};
