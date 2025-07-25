import "./Style/Card.css";
import Button from "../Button/Button";

const Card = ({
  product,
  title,
  image,
  price,
  rating,
  clicked,
  fetchSingleProduct,
  handleWishlist,
  handleAddToCart,
}) => {

  return (
    <div className={`mx-lg-3 card-comp`} onClick={fetchSingleProduct}>
      <div className="card card-style">
        <div className="wishlist-location">
          <img src={image} className="card-img-top my-2" alt="Image" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWishlist(product);
            }}
            className="prod-wishlist-btn"
          >
            <i
              className={`${
                clicked ? "fas text-danger" : "far text-muted"
              } fa-heart prod-wishlist-icon`}
            ></i>
          </button>
        </div>
        <div className="card-area">
          <h5 className="card-title-text-size">
            {title ? title.slice(0, 16) : "No Title."}...
          </h5>
          <p className="mb-1 fw-semibold form-text-size"> ${price}</p>
          <p className="mb-1 form-text-size review-rating">
            <span style={{ color: "gold", fontSize: "1.3rem" }}>★ </span>
            <span>{rating.rate}</span>
          </p>
          <p className="mb-1 fw-semibold form-text-size review-rating">
            Reviews {rating.count}
          </p>
          <div className="btns d-flex justify-content-between">
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent propagation to the card
                handleAddToCart(product); // Pass the product object to the handleAddToCart function
              }}
              className={"btn btn-success form-text-size"}
              btnName={"Add to Cart"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
