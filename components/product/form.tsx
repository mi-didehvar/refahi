import { useState, useEffect, FormEventHandler } from "react";
import { usePocket } from "../../hooks/UsePocket";
import { Product } from "./card";

export default function ProductModal({ isOpen, onClose, product }: {isOpen: boolean,product: Product, onClose:(boolean)=>void}) {
    const pb = usePocket();
    const [formData, setFormData] = useState<Product>();

    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id || "",
                name: product.name || "",
                price: product.price || 0,
                image: [],

            });
        } else {
            setFormData({ id: "", name: "", price: 0, image: [] });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "image") {
            const file = e.target.files[0];
            setImageFile(file);
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = formData.image;
            const imageFormData = new FormData();
            if (imageFile) {

                imageFormData.append("image", imageFile);
                imageFormData.append("name", formData.name);
                imageFormData.append("price", String(formData.price));
                imageFormData.append("supplier", pb.authStore.record.id)
            }


            const dataToSave = imageFile ? imageFormData : {
                name: formData.name,
                price: formData.price,
                supplier: pb.authStore.record.id
            } as Product;

            if (formData.id) {
                await pb.collection("products").update(formData.id, dataToSave);
            } else {
                await pb.collection("products").create(dataToSave);
            }

            onClose(true);
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const onClickOutline = (e) => {
        if (e.target === e.currentTarget) {
            e.stopPropagation();
            onClose(false);
        }
    }

    return (
        isOpen && (<div className="dialog-overlay" onClick={onClickOutline}>
            <dialog open={isOpen} className="dialog">
                <article>
                    <header>
                        <h2>{formData?.id ? `ویرایش محصول ${product.name}` : "ساخت محصول"}</h2>
                    </header>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label>
                            نام محصول
                            <input type="text" name="name" value={formData?.name} onChange={handleChange} required />
                        </label>
                        <label>
                            قیمت (به ریال)
                            <input type="number" name="price" value={formData?.price} onChange={handleChange} required />
                        </label>
                        <label>
                            انتخاب تصویر
                            <input type="file" name="image" onChange={handleChange} />
                            {formData?.id && "اگر تصویر جدید انتخاب نکنید، تصویر قبلی باقی می‌ماند"}
                        </label>
                        <footer>
                            <button type="submit">ذخیره</button>
                            <button type="button" onClick={()=>onClose(false)}>انصراف</button>
                        </footer>
                    </form>
                </article>
            </dialog>
        </div>)
    );
}
