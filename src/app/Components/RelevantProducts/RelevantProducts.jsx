'use client';
import React, { useEffect, useState } from 'react';
import { useProducts } from '@/ContextApi/AllProductsContext';
import { useSingleProduct } from '@/ContextApi/SingleProductContex';

const RelevantProducts = () => {
    const { allProducts, loading } = useProducts();
    const { singleProduct, SingleLoading } = useSingleProduct();

    const [relevantProducts, setRelevantProducts] = useState([]);

    useEffect(() => {
        if (!allProducts || !singleProduct) return;

        // Single product এর সব variation attribute option ids
        const singleVariationAttrs = singleProduct.variations
          ?.flatMap(variation => 
            variation.variation_attributes.map(attr => attr.attribute_option_id)
          ) || [];

        const relevant = allProducts.filter(product =>
            product.id !== singleProduct.id &&
            (
                product.brand_id === singleProduct.brand?.id ||
                product.category_id === singleProduct.category_id ||
                product.variations?.some(variation =>
                    variation.variation_attributes.some(attr =>
                        singleVariationAttrs.includes(attr.attribute_option_id)
                    )
                )
            )
        );

        setRelevantProducts(relevant);
        console.log('Relevant Products with variations:', relevant);
    }, [allProducts, singleProduct]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-[20px]">Relevant Products</h2>
            {relevantProducts.length === 0 ? (
                <p>No relevant products found.</p>
            ) : (
                <ul className="list-disc pl-6">
                    {relevantProducts.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RelevantProducts;