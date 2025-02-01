import LoginStyles from "../styles/Login.module.css";
import Layout from "../components/Layout";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import { useRouter } from "next/router";
import { usePocket } from "../hooks/UsePocket";
import { Product, ProductCard } from "../components/product/card";
import DashboardStyle from "../styles/Dashboard.module.css";
import { RecordModel } from "pocketbase";
const Page: NextPageWithLayout = () => {
  const pb = usePocket();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await pb.collection("products").getFullList<Product>();
      setProducts(
        products.map((product) => ({
          ...product,
          selectedCount: 0,
        }))
      );
    };
    getProducts();
  }, []);


  const increase = (_index:number) => {
    setProducts(products.map((product,index)=>{
      if(index === _index){
        return {...product, selectedCount: product.selectedCount + 1};
      }
      return product;
    }))
  }
  const decrease = (_index:number) => {
    setProducts(products.map((product,index)=>{
      if(index === _index){
        return {...product, selectedCount: Math.max(0, product.selectedCount - 1)};
      }
      return product;
    }))
  }

  const pay = () => {
    try {
      const cart = products.filter(x=>x.selectedCount > 0);
      cart.forEach((product) => {
        pb.collection("orders").create({
          user: pb.authStore.record?.id,
          product: product.id,
          count: product.selectedCount,
        });
      });
      pb.collection("users").update(pb.authStore.record?.id, {
        credit: pb.authStore.record?.credit - cart.reduce((value, current) => value + (current.selectedCount * (current.price || 0)), 0),
      });
      pb.authStore.record.credit -= cart.reduce((value, current) => value + (current.selectedCount * (current.price || 0)), 0)
      setProducts(products.map(x=>({...x, selectedCount: 0})));
    } catch (ex: any) {
      
    }
  }

  return (
    <div className={DashboardStyle.dashboard_container}>
      {products.find(x=>x.selectedCount > 0) && (
        <div className={DashboardStyle.cart}>
          <div>مجموع سبد خرید: <strong>{products.reduce((value, current) => value + (current.selectedCount * (current.price || 0)), 0)}</strong> ریال</div>
          <button onClick={pay}>پرداخت</button>
        </div>
      )}
      <div className={DashboardStyle.products}>
        {products.map((product,index) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={() => {
              increase(index)
            }}
            onMinus={() => {
              decrease(index)
            }}
          />
        ))}
      </div>
    </div>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
