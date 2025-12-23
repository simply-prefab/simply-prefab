import { products } from '@/data/products';
import ProductDetail from '@/components/ProductDetail';

interface Params {
  id: string;
}

export default async function ProductPage({ params }: { params: Params }) {
 const { id } = await params;
  const product = products.find(p => p.id === id);
  if (!product) return <div className="text-center pt-20 text-red-600">Product not found</div>;
  return <ProductDetail product={product} />;
}
