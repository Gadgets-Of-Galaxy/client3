import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalfAlt as halfStar,
  faCartShopping,
  faHeart,
  faShare,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faTelegram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Header } from "../../CommonComponents/components/Header";
import "../styles/ProductDetailsPage.css";

const ProductDetailsPage = ({ user }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://server2-acel.onrender.com/api/products/${productId}`
        );
        setProduct(response.data.product);
        setCurrentImage(response.data.product.imagePath);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleThumbnailClick = (imagePath) => {
    setCurrentImage(imagePath);
  };
  const maxRating = 5;
  const solidStars = product ? Math.floor(product.rating) : 0;
  const hasHalfStar = product ? product.rating % 1 !== 0 : false;
  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    if (i <= solidStars) {
      stars.push(
        <FontAwesomeIcon key={i} icon={solidStar} className="solid-star" />
      );
    } else if (hasHalfStar && i === solidStars + 1) {
      stars.push(
        <FontAwesomeIcon key={i} icon={halfStar} className="half-star" />
      );
    } else {
      stars.push(
        <FontAwesomeIcon key={i} icon={regularStar} className="regular-star" />
      );
    }
  }

  const addToCart = async (item) => {
    try {
      // console.log(item);
      const response = await axios.post(
        `https://server2-acel.onrender.com/api/carts/addToCart`,
        {
          productId: item._id,
          userId: user._id,
        }
      );
      if (response.status === 200) {
        window.alert("Product added to cart successfully");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const toggleShareDropdown = () => {
    setShowShareDropdown(!showShareDropdown);
  };
  const shareToGmail = () => {
    // Construct the WhatsApp share URL
    const url = `mailto:?subject=${encodeURIComponent(
      product.title
    )}&body=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank");
  };
  const shareToWhatsApp = () => {
    // Construct the WhatsApp share URL
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      product.title
    )}: ${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank");
  };

  const shareToFacebook = () => {
    // Construct the Facebook share URL
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, "_blank");
  };

  const shareToTwitter = () => {
    // Construct the Twitter share URL
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      window.location.href
    )}&text=${encodeURIComponent(product.title)}`;
    window.open(url, "_blank");
  };



  const shareToTelegram = () => {
    // Construct the Telegram share URL
    const url = `https://telegram.me/share/url?url=${encodeURIComponent(
      window.location.href
    )}&text=${encodeURIComponent(product.title)}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <Header user={user} />
      {product && (
        <div className="crd-wrpr">
          <div className="crd">
            <div className="prd-imgs">
              <div className="img-dsply">
                <img src={`/${currentImage}`} alt="" />
              </div>
              <div className="img-shwcse">
                <img
                  src={`/${product.imagePath}`}
                  alt=""
                  onClick={() => handleThumbnailClick(product.imagePath)}
                />
                <img
                  src={`/${product.imagethumbnail1}`}
                  alt=""
                  onClick={() => handleThumbnailClick(product.imagethumbnail1)}
                />
                <img
                  src={`/${product.imagethumbnail2}`}
                  alt=""
                  onClick={() => handleThumbnailClick(product.imagethumbnail2)}
                />
                <img
                  src={`/${product.imagethumbnail3}`}
                  alt=""
                  onClick={() => handleThumbnailClick(product.imagethumbnail3)}
                />
              </div>
            </div>
            <div className="prd-ctnt">
              <h3 className="prd-ttl">{product.title}</h3>
              <div className="prd-rating">
                <div className="rating-stars">
                  <p>
                    <span>{stars}</span> ({product.rating})
                  </p>
                </div>
              </div>
              <div>
                <div className="prd-price">
                  <p className="lst-prc">
                    INR.{product.price}
                    <span>INR.{product.mrp}</span>
                  </p>
                </div>
                <div className="prd-dtl">
                  <h2>About this item:</h2>
                  <p>{product.description}</p>
                  <h2 className="feauters">Feauters</h2>
                  <ul>
                    <li>{product.features1}</li>
                    <li>{product.features2}</li>
                    <li>{product.features3}</li>
                    <li>{product.features4}</li>
                  </ul>
                </div>
                <div className="pchs-info">
                  <button
                    className="add-wshlst-btn"
                    id="addtocart"
                    data-product-id-w={product._id}
                  >
                    <FontAwesomeIcon
                      className="heart-icon-single"
                      icon={faHeart}
                    />
                    Add to Wishlist
                  </button>
                  <button
                    className="add-cr-btn"
                    id="addtowishlist"
                    data-product-id-c={product._id}
                    onClick={() => addToCart(product)}
                  >
                    <FontAwesomeIcon
                      className="cart-icon-single"
                      icon={faCartShopping}
                    />
                    Add to Cart
                  </button>
                  <div className="share-dropdown">
                    <button
                      className="sharre-btn"
                      onClick={toggleShareDropdown}
                    >
                      <FontAwesomeIcon icon={faShare} size="2x" />
                    </button>
                    {showShareDropdown && (
                      <div className="share-dropdown-content">
                        <button className="share-btn" onClick={shareToGmail}>
                          <FontAwesomeIcon icon={faEnvelope} size="2x" />
                        </button>
                        <button
                          className="share-btn"
                          id="whatsapp"
                          onClick={shareToWhatsApp}
                          icon={faCartShopping}
                        >
                          <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                        </button>
                        <button className="share-btn" onClick={shareToFacebook}>
                          <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </button>
                        <button className="share-btn" onClick={shareToTwitter}>
                          <FontAwesomeIcon icon={faTwitter} size="2x" />{" "}
                        </button>
                        <button className="share-btn" onClick={shareToTelegram}>
                          <FontAwesomeIcon icon={faTelegram} size="2x" />{" "}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
