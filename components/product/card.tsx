import Image from "next/image";
import ProductStyle from "../../styles/Product.module.css";
import emptyImage from "../../public/emptyImage.jpg";
import { pocketbaseUrl } from "../../hooks/UsePocket";
import { usePriceFormatter } from "../../hooks/UseFormatters";
import { ReactNode } from "react";
export class Product {
  public id: string;
  public name: string;
  public price: number;
  public image: string[];
  public supplier?: string;
  public selectedCount?: number = 0;
  public deleted?: Date = null
}

export function ProductCard({
  product,
  onAdd,
  onMinus,
  disableCounter,
  children
}: {
  product: Product;
  onAdd?: () => void;
  onMinus?: () => void;
  disableCounter?: boolean;
  children?: ReactNode
}) {
  return (
    <div className="w-full flex flex-col gap-1">
        <div className={ProductStyle.card}>
      <div className={ProductStyle.image}>
        {product.image.length ? (
          <Image src={`${pocketbaseUrl}/api/files/cvx9v04t76nuy15/${product.id}/${product.image[0]}`} alt={product.name} fill />
        ) : (
          <Image src={emptyImage} alt={product.name} fill />
        )}
      </div>
      <div className={ProductStyle.description}>
        <p>{product?.name}</p>
        <p>{usePriceFormatter(product?.price)}ریال</p>
        {!disableCounter && (
          <div className={ProductStyle.counter}>
            <button onClick={onAdd}>+</button>
            <span>{product.selectedCount}</span>
            <button onClick={onMinus}>-</button>
          </div>
        )}
      </div>
    </div>
    {children}
    </div>
  );
}
