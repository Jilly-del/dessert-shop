import { useState } from "react";

let data = [
  {
    image: {
      thumbnail: "./images/image-waffle-thumbnail.jpg",
      mobile: "./images/image-waffle-mobile.jpg",
      tablet: "./images/image-waffle-tablet.jpg",
      desktop: "./images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    image: {
      thumbnail: "./images/image-creme-brulee-thumbnail.jpg",
      mobile: "./images/image-creme-brulee-mobile.jpg",
      tablet: "./images/image-creme-brulee-tablet.jpg",
      desktop: "./images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    image: {
      thumbnail: "./images/image-macaron-thumbnail.jpg",
      mobile: "./images/image-macaron-mobile.jpg",
      tablet: "./images/image-macaron-tablet.jpg",
      desktop: "./images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image: {
      thumbnail: "./images/image-tiramisu-thumbnail.jpg",
      mobile: "./images/image-tiramisu-mobile.jpg",
      tablet: "./images/image-tiramisu-tablet.jpg",
      desktop: "./images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: {
      thumbnail: "./images/image-baklava-thumbnail.jpg",
      mobile: "./images/image-baklava-mobile.jpg",
      tablet: "./images/image-baklava-tablet.jpg",
      desktop: "./images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    image: {
      thumbnail: "./images/image-meringue-thumbnail.jpg",
      mobile: "./images/image-meringue-mobile.jpg",
      tablet: "./images/image-meringue-tablet.jpg",
      desktop: "./images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: {
      thumbnail: "./images/image-cake-thumbnail.jpg",
      mobile: "./images/image-cake-mobile.jpg",
      tablet: "./images/image-cake-tablet.jpg",
      desktop: "./images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./images/image-brownie-thumbnail.jpg",
      mobile: "./images/image-brownie-mobile.jpg",
      tablet: "./images/image-brownie-tablet.jpg",
      desktop: "./images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./images/image-panna-cotta-thumbnail.jpg",
      mobile: "./images/image-panna-cotta-mobile.jpg",
      tablet: "./images/image-panna-cotta-tablet.jpg",
      desktop: "./images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];

export default function App() {
  const [cartNum, setCartNum] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  return (
    <div className=" lg:flex w-full p-10 ">
      <div className=" lg: w-3/ md:w-2/3">
        <h1 className="text-3xl font-semibold mb-6">Dessert</h1>
        <Carts
          setCartNum={setCartNum}
          cartNum={cartNum}
          setCartItem={setCartItem}
        />
      </div>

      <div className=" lg:w-2/5 m-5">
        <Cart
          cartNum={cartNum}
          cartItem={cartItem}
          setCartItem={setCartItem}
          setCartNum={setCartNum}
        />
      </div>
    </div>
  );
}

function Carts({ setCartNum, cartNum, setCartItem }) {
  return (
    <div className="grid lg:grid-cols-3 gap-6  ">
      {data.map((item) => (
        <Card
          item={item}
          setCartNum={setCartNum}
          cartNum={cartNum}
          setCartItem={setCartItem}
          key={item.name}
        />
      ))}
    </div>
  );
}

function Card({ item, setCartNum, cartNum, setCartItem }) {
  const [clicked, setClicked] = useState(false);
  const [num, setNum] = useState(1);
  const { name, image, category, price } = item;

  function handleCart() {
    setClicked(true);
    setCartItem((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.name === item.name
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [
          ...prevItems,
          { name: item.name, price: item.price, quantity: 1 },
        ];
      }
    });
    setCartNum(cartNum + 1);
  }

  function plus() {
    setCartItem((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
    setCartNum(cartNum + 1);
    setNum((prevNum) => {
      const newNum = prevNum + 1;
      return newNum;
    });
  }
  function minus() {
    setCartItem((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.name === item.name && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );

    if (num > 0) {
      setNum((prevNum) => {
        const newNum = prevNum - 1;
        setCartNum(cartNum - 1);
        return newNum;
      });
    }
  }

  return (
    <div className="relative border  rounded-lg shadow-lg hover:shadow-xl transition-all">
      <img className="w-full  rounded-lg" src={image.desktop} alt={item.name} />
      <div>
        {clicked ? (
          <div className="text-white absolute top-64  left-1/3 w-32 border-2 border-rose-400 rounded-2xl h-8 flex justify-evenly bg-red-800">
            <span className="cursor-pointer rounded-lg" onClick={minus}>
              -
            </span>
            <p> {num}</p>
            <span className="cursor-pointer rounded-lg" onClick={plus}>
              +
            </span>
          </div>
        ) : (
          <button
            onClick={handleCart}
            className="absolute top-64  left-1/3 w-32 border-2 border-rose-400 rounded-2xl bg-white h-8"
          >
            🛒 Add to Cart
          </button>
        )}
        <div className="py-8 px-4">
          <p className="text-rose-500">{category}</p>
          <p className="font-semibold text-rose-900  "> {name}</p>
          <p className="text-rose-600 font-semibold">
            {" "}
            {`$${price.toFixed(2)}`}
          </p>
        </div>
      </div>
    </div>
  );
}

function Cart({ cartNum, cartItem, setCartItem, setCartNum }) {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedItems, setConfirmedItems] = useState([]);
  const [confirmedTotalPrice, setConfirmedTotalPrice] = useState(0);

  const totalPrice = cartItem
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  function confirmOrder() {
    setConfirmedItems(cartItem);
    setConfirmedTotalPrice(totalPrice);
    setOrderConfirmed(true);
    setCartItem([]);
    setCartNum(0);
  }

  function removeItem(name) {
    setCartItem((prevItems) => {
      const itemToRemove = prevItems.find((item) => item.name === name);
      const newItems = prevItems.filter((item) => item.name !== name);
      setCartNum(
        (prevCartNum) =>
          prevCartNum - (itemToRemove ? itemToRemove.quantity : 0)
      );
      return newItems;
    });
  }

  return (
    <div className="relative">
      {orderConfirmed && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-40"></div>
      )}
      <div className="relative z-50 w-full rounded-xl  p-4 bg-white right-1000">
        {orderConfirmed ? (
          <div className="bg-white ml-2 p-1">
            <img src="images/icon-order-confirmed.svg" alt="Order Confirmed" />
            <h2 className="text-3xl font-bold my-2">Order Confirmed</h2>
            <p className="text-rose-500 my-2">We hope you enjoy your food</p>
            {confirmedItems.length > 0 &&
              confirmedItems.map((item, index) => (
                <div
                  className="flex justify-between py-2 my-2 pl-2 bg-red-100 rounded-lg"
                  key={index}
                >
                  <div>
                    <p className="text-l py-2 text-rose-900 font-semibold">
                      {item.name}
                    </p>
                    <span className="text-rose-600 pr-4 py-4">
                      {item.quantity}x
                    </span>
                    <span className="text-rose-400 pr-2">
                      ${item.price.toFixed(2)}
                    </span>
                    <span className="text-rose-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            <div className="flex justify-between py-3">
              <p>Order Total</p>
              <p>${confirmedTotalPrice}</p>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-semibold text-2xl text-rose-600">
              Your Cart ({cartNum})
            </p>
            {cartItem.length > 0 ? (
              <div>
                {cartItem.map((item, index) => (
                  <div
                    className="flex justify-between border-b-2 pt-5 pb-5"
                    key={index}
                  >
                    <div>
                      <p className="text-l py-2 text-rose-900 font-semibold">
                        {item.name}
                      </p>
                      <span className="text-rose-600 pr-4 py-4">
                        {item.quantity}
                      </span>
                      <span className="text-rose-400 pr-2">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-rose-500">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    <img
                      className="hover:font-bold cursor-pointer"
                      src="images/icon-remove-item.svg"
                      alt="Remove item"
                      onClick={() => removeItem(item.name)}
                    />
                  </div>
                ))}
                <div className="flex justify-between py-3">
                  <p>Order Total</p>
                  <p>${totalPrice}</p>
                </div>
                <div className="my-5 flex items-center justify-center bg-red-50 rounded-md py-2">
                  <img
                    src="images/icon-carbon-neutral.svg"
                    alt="Carbon Neutral"
                  />
                  <p className="p-2">
                    This is a <span className="font-bold">carbon-neutral</span>{" "}
                    delivery
                  </p>
                </div>
                <button
                  onClick={confirmOrder}
                  className="w-full py-3 rounded-3xl bg-rose-800 text-white"
                >
                  Confirm Order
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center py-8">
                <img
                  src="/images/illustration-empty-cart.svg"
                  alt="Empty Cart"
                />
                <p className="text-rose-500">
                  Your added items will appear here
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
