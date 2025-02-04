import LoginStyles from "../styles/Login.module.css";
import Layout from "../components/Layout";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import { useRouter } from "next/router";
import { usePocket } from "../hooks/UsePocket";
import { Product, ProductCard } from "../components/product/card";
import DashboardStyle from "../styles/Dashboard.module.css";
import { RecordModel } from "pocketbase";
import { usePriceFormatter } from "../hooks/UseFormatters";
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


  const increase = (_index: number) => {
    setProducts(products.map((product, index) => {
      if (index === _index) {
        return { ...product, selectedCount: product.selectedCount + 1 };
      }
      return product;
    }))
  }
  const decrease = (_index: number) => {
    setProducts(products.map((product, index) => {
      if (index === _index) {
        return { ...product, selectedCount: Math.max(0, product.selectedCount - 1) };
      }
      return product;
    }))
  }

  const pay = async () => {
    try {
      let hasError = false
      const cart = products.filter(x => x.selectedCount > 0);
      const price = cart.reduce((value, current) => value + (current.selectedCount * (current.price || 0)), 0)
      const newCredit = pb.authStore.record?.credit - price
      const transaction = pb.createBatch()
      cart.forEach((product) => {
        if (product.selectedCount > product.inventory) {
          alert(`موجودی ${product.name} در مرکز تنقلات کافی نیست`)
          hasError = true
        }
        transaction.collection("orders").create({
          user: pb.authStore.record?.id,
          product: product.id,
          count: product.selectedCount,
        });
        transaction.collection("products").update(product.id, {
          inventory: product.inventory - product.selectedCount,
          mode: "buy"
        })
      });
      transaction.collection("users").update(pb.authStore.record?.id, {
        credit: newCredit,
      });
      if (!hasError) {
        await transaction.send()
        pb.authStore.save(pb.authStore.token, {...pb.authStore.record, credit: newCredit})
        console.log(pb.authStore.record)
        setProducts(products.map(x => ({ ...x, selectedCount: 0 })));
        alert("سفارش شما با موفقیت ثبت شد")
      }
    } catch (ex: any) {

    }
  }

  return (
    <div className={DashboardStyle.dashboard_container}>
      {products.find(x => x.selectedCount > 0) && (
        <div className={DashboardStyle.cart}>
          <div>مجموع سبد خرید: <strong>{usePriceFormatter(products.reduce((value, current) => value + (current.selectedCount * (current.price || 0)), 0))}</strong> ریال</div>
          <button onClick={pay}>پرداخت</button>
        </div>
      )}
      <div className={DashboardStyle.products}>
        {products.map((product, index) => (
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
