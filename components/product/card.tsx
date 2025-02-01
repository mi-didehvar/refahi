import Image from "next/image";
import Link from "next/link";
import ProductStyle from "../../styles/Product.module.css";
import emptyImage from "../../public/emptyImage.jpg";
import { usePocket } from "../../hooks/UsePocket";
import { useEffect } from "react";
export class Product {
  public id: string;
  public name: string;
  public price: number;
  public image: string[];
  public selectedCount: number = 0;
}

export function ProductCard({
  product,
  onAdd,
  onMinus,
}: {
  product: Product;
  onAdd: () => void;
  onMinus: () => void;
}) {
  return (
    <div className={ProductStyle.card}>
      <div className={ProductStyle.image}>
        {product.image.length ? (
          <Image src={`https://goofy-varahamihira-b7cr8sxp2.liara.run/api/files/cvx9v04t76nuy15/${product.id}/${product.image[0]}`} alt={product.name} fill />
        ) : (
          <Image src={emptyImage} alt={product.name} fill />
        )}
      </div>
      <div className={ProductStyle.description}>
        <p>{product?.name}</p>
        <p>{product?.price}ریال</p>
        <div className={ProductStyle.counter}>
          <button onClick={onAdd}>+</button>
          <span>{product.selectedCount}</span>
          <button onClick={onMinus}>-</button>
        </div>
      </div>
    </div>
  );
}
