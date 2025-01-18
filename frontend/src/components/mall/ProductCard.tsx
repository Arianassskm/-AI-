interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice: number;
  discount: string;
}

export function ProductCard({
  image,
  title,
  price,
  originalPrice,
  discount,
}: ProductCardProps) {
  return (
    <div className="flex gap-4 p-2">
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#ff5f4c]">¥{price}</span>
          <span className="text-sm text-muted-foreground line-through">
            ¥{originalPrice}
          </span>
        </div>
        <div className="mt-1 text-sm text-[#ff5f4c]">{discount}</div>
      </div>
      <button className="self-end rounded-full bg-[#ff5f4c] text-white w-6 h-6 flex items-center justify-center">
        +
      </button>
    </div>
  );
}
