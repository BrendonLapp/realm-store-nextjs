interface ProductImageProps {
  imageSource: string;
  imageAlt: string;
}

const ProductImage = ({ imageSource, imageAlt }: ProductImageProps) => {
  return <img className="card-img-top p-2" src={imageSource} alt={imageAlt} />;
};

export default ProductImage;
