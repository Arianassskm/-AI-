import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, CircleX } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { SearchResultCard } from "@/components/mall/SearchResultCard";

export function SearchPage() {
  const navigate = useNavigate();
  const { keyword } = useParams<{ keyword: string }>();
  const [inputText, setInputText] = useState(keyword ?? "");
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Snipaste_2025-01-18_17-53-45-VU0VprVm7b6ontucLvCIBnxOyg2r38.png",
      title: "[999]感冒灵颗粒10g*9袋/盒",
      description: "用于感冒引起的头痛、发热、流涕等",
      price: 15.5,
      originalPrice: 19.9,
      storeName: "海王星辰 (南山店)",
      rating: 4.8,
      distance: "1.5km",
      deliveryTime: "22分钟",
      monthlySales: 1000,
      tags: ["领5元满品券", "领15元商品券"],
    },
    {
      id: 2,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Snipaste_2025-01-18_17-53-10-2Una2MXIuVEYDzz4FoMeud0wskhEti.png",
      title: "[999]感冒灵颗粒10g*9袋/盒",
      description: "用于感冒引起的头痛、发热、流涕等",
      price: 15,
      originalPrice: 20,
      storeName: "九州大药房 (西海明珠分店)",
      rating: 3.4,
      distance: "241m",
      deliveryTime: "29分钟",
      monthlySales: 56,
      tags: ["满0.01得赠品"],
    },
    {
      id: 3,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Snipaste_2025-01-18_17-53-10-2Una2MXIuVEYDzz4FoMeud0wskhEti.png",
      title: "[999]感冒灵颗粒10g*9袋/盒",
      description: "用于感冒引起的头痛、发热、流涕等",
      price: 14.43,
      originalPrice: 19.9,
      storeName: "华州大药房 (前海店)",
      rating: 4.9,
      distance: "2756m",
      deliveryTime: "32分钟",
      monthlySales: 300,
      tags: ["新客减1"],
    },
  ]);

  const clearSearch = () => {
    setInputText("");
    setSearchResults([]);
  };

  const handleInputTextChange = (text: string) => {
    setInputText(text);
  };

  const handleDetail = () => {
    navigate("/store");
  };
  return (
    <div className="bg-background min-h-screen">
      <header className="flex items-center gap-4 p-4 border-b">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="relative flex-1">
          <Input
            value={inputText}
            className="pl-10 h-10"
            onChange={(e) => handleInputTextChange(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
          {inputText && inputText?.length > 0 && (
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <CircleX className="h-4 w-4" onClick={clearSearch} />
            </button>
          )}
        </div>
      </header>

      <div className="flex items-center justify-between p-4 text-sm">
        <span className="text-primary">综合排序</span>
        <div className="flex gap-4 text-muted-foreground">
          <span>价格最低</span>
          <span>速度最快</span>
        </div>
      </div>

      <div className="space-y-4 p-4">
        {searchResults.length > 0 &&
          searchResults.map((searchResult) => (
            <SearchResultCard
              key={searchResult.id}
              product={searchResult}
              onClick={handleDetail}
            />
          ))}

        {searchResults.length === 0 && (
          <div className="text-center">暂无搜索结果</div>
        )}
      </div>
    </div>
  );
}
