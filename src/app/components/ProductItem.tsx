import Image from "next/image";
import Link from "next/link";

export function ProductItem ({ slug, name, description }: {slug: string, name: string, description: string}) {
    return (
        <div className="product-item">
            <div className="product-summary">
                <p className="product-price">$200.00</p>
                <p className="product-title">
                    <Link href={`/product/${slug}/${name}`}>
                        {name}
                    </Link> </p>
                <p className="product-description">{description}</p>
            </div>
            <div className="product-image">
                <Link href={`/product/${slug}/${name}`}>
                <Image src={`/images/products/product-${slug}.JPG`} width={450} height={650} alt="Product Image" />
                </Link>
            </div>
        </div>
    )
}