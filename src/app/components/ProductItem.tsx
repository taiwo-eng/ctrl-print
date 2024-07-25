import Image from "next/image";
import Link from "next/link";

export function ProductItem ({ slug, name }: {slug: string, name: string}) {
    return (
        <div className="product-item">
            <div className="product-summary">
                <p className="product-price">$200.00</p>
                <p className="product-title">
                    <Link href={`/product/${slug}/${name}`}>
                        {name}
                    </Link> </p>
                <p className="product-description">Our signature Agbada in blue and pink with hand-woven asooke in a contrasting color. 
                This versatile yet sophisticated loungewear in these colors and bold prints is your new wardrobe staple.</p>
            </div>
            <div className="product-image">
                <Link href={`/product/${slug}/${name}`}>
                <Image src={`/images/products/product-${slug}.JPG`} width={450} height={650} alt="Product Image" />
                </Link>
            </div>
        </div>
    )
}