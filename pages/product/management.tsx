import type { NextPage } from "next";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product, ProductCard } from "../../components/product/card";
import { NextPageWithLayout } from "../_app";
import { usePocket } from "../../hooks/UsePocket";
import Layout from "../../components/Layout";
import ProductModal from "../../components/product/form";

const Page: NextPageWithLayout = () => {
    const pb = usePocket();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const products = await pb.collection("products").getFullList<Product>();
        setProducts(
            products.map((product) => ({
                ...product,
                selectedCount: 0,
            }))
        );
    };
    
    const deleteProduct = async (product: Product) => {
        const confirmed = await confirm(`از حذف ${product.name} اطمینان دارد؟`)

        if (confirmed) {
            await pb.collection("products").update(product.id, {
                deleted: new Date()
            })
            alert("محصول انتخابی با موفقیت حذف شد.")
            getProducts()
        }

        
    }

    const handleOpenModal = (product = null) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = (isSuccess: boolean = false) => {
        setIsModalOpen(false);
        if(isSuccess)
            getProducts()
        // setSelectedProduct(null);
    };

    return (
        <div className="w-full flex flex-col items-start gap-4">
            <h1>مدیریت محصولات</h1>
            <button onClick={() => handleOpenModal(null)}>افزودن محصول</button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {
                    products.length && products.map(product => (
                        <ProductCard product={product} disableCounter key={product.id}>
                            <div className="w-full flex justify-between">
                                <div className="flex gap-1">
                                    <button onClick={() => deleteProduct(product)}>حذف محصول</button>
                                    <button onClick={() => handleOpenModal(product)}>ویرایش محصول</button>
                                </div>
                                {/* {product.deleted ? "حذف شده" : 'فعال'} */}
                            </div>
                        </ProductCard>
                    ))
                }
            </div>

            <ProductModal isOpen={isModalOpen} onClose={(isSuccess) => handleCloseModal(isSuccess)} product={selectedProduct} />
        </div>
    );
};
Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
export default Page;
