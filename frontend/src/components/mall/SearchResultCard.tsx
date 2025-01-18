export interface SearchResultCardProps {
  product: {
    image: string;
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    storeName: string;
    rating: number;
    distance: string;
    deliveryTime: string;
    monthlySales: number;
    tags: string[];
  };
  onClick: () => void;
}

export function SearchResultCard({ product, onClick }: SearchResultCardProps) {
  const {
    image,
    title,
    description,
    price,
    originalPrice,
    storeName,
    rating,
    distance,
    deliveryTime,
    monthlySales,
    tags,
  } = product;

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg" onClick={onClick}>
      <div className="flex gap-4">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-24 h-24 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#ff5f4c]">¥{price}</span>
            <span className="text-sm text-muted-foreground line-through">
              ¥{originalPrice}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#ff5f4c] border border-[#ff5f4c] rounded px-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span>{storeName}</span>
          <span className="text-orange-500">★ {rating}</span>
        </div>
        <div className="text-muted-foreground">
          {distance} | {deliveryTime}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">月售{monthlySales}+</div>
    </div>
  );
}
