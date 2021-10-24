interface CartBoxProps {
  numberInCart: Number;
}

const CartBox = ({ numberInCart }: CartBoxProps) => {
  return (
    <div className="d-flex">
      <button className="btn btn-outline-light" type="submit">
        <i className="bi-cart-fill me-1"></i>
        Cart
        <span className="badge bg-dark text-white ms-1 rounded-pill">
          {numberInCart}
        </span>
      </button>
    </div>
  );
};

export default CartBox;
