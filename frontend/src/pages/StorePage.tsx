import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, CircleX } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge1";
import { ProductCard } from "@/components/mall/ProductCard";

export function StorePage() {
  const navigate = useNavigate();
  return (
    <div className="bg-background">
      <div className="bg-gray-700">
        <header className="flex items-center justify-between p-4">
          <button
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-medium text-white">海王星辰 (南山店)</h1>
          <div className="flex gap-2"></div>
        </header>
        <div className="flex items-center gap-2 pl-5 pr-5 pt-5 pb-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Snipaste_2025-01-18_17-53-45-VU0VprVm7b6ontucLvCIBnxOyg2r38.png"
            alt="Store logo"
            className="w-12 h-12 rounded"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white">配送约22分钟</span>
              <Badge variant="secondary">美团专送</Badge>
            </div>
            <div className="text-sm text-muted-foreground text-gray-500">
              公告: 91440300MA5FWA7E0E 粤CB7525271
            </div>
          </div>
          <Badge variant="outline">收藏</Badge>
        </div>

        <div className="flex gap-2 overflow-x-auto pl-5 pr-5 pb-5">
          <Badge variant="destructive">49减5</Badge>
          <Badge variant="destructive">69减10</Badge>
          <Badge variant="destructive">99减15</Badge>
          <Badge variant="destructive">减5元满送券</Badge>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="relative flex-1">
          <Input className="pl-10 h-10" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
        </div>

        <nav className="grid grid-cols-5 gap-4 py-4">
          <button className="flex flex-col items-center">
            <span className="text-orange-500">推荐</span>
          </button>
          <button className="flex flex-col items-center">
            <span>活动</span>
          </button>
          <button className="flex flex-col items-center">
            <span>感冒用药</span>
          </button>
          <button className="flex flex-col items-center">
            <span>退烧止痛</span>
          </button>
          <button className="flex flex-col items-center">
            <span>胃肠感冒</span>
          </button>
        </nav>

        <div className="space-y-4">
          <ProductCard
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Snipaste_2025-01-18_17-53-45-VU0VprVm7b6ontucLvCIBnxOyg2r38.png"
            title="[999]感冒灵颗粒10g*9袋/盒"
            price={15.5}
            originalPrice={19.9}
            discount="7.79折 限2份"
          />
          <ProductCard
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Snipaste_2025-01-18_17-53-45-VU0VprVm7b6ontucLvCIBnxOyg2r38.png"
            title="[科达琳]复方氨酚肾素片12片/盒"
            price={30.4}
            originalPrice={36}
            discount="8.44折 限5份"
          />
        </div>
      </div>
    </div>
  );
}
