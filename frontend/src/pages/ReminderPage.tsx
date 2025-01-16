import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  Bell,
  Trash2,
  Plus,
  Search,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import {
  medicinePlanService,
  MedicinePlan,
  MedicinePlanDetail,
} from "@/services/medicinePlanService";
import { PlanCard } from "@/components/PlanCard";
import { useToast } from "@/hooks/useToast";
import { getValue } from "@/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

interface ReminderTime {
  period: string;
  hour: string;
  minute: string;
}

interface MedicationReminder {
  planId: string;
  planName: string;
  times: ReminderTime[];
  notes: string;
}

export function ReminderPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [medicinePlans, setMedicationPlans] = useState<MedicinePlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [reminder, setReminder] = useState<MedicationReminder>({
    planId: "",
    planName: "",
    times: [
      { period: "空腹", hour: "07", minute: "00" },
      { period: "早餐", hour: "08", minute: "00" },
      { period: "午餐", hour: "12", minute: "00" },
      { period: "晚餐", hour: "18", minute: "00" },
      { period: "睡前", hour: "22", minute: "00" },
    ],
    notes: "",
  });
  const [repeatType, setRepeatType] = useState("每天");
  const [repeatValue, setRepeatValue] = useState("1");

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMedicinePlans = async () => {
      try {
        const userInfo = getValue("userInfo");
        if (userInfo === undefined || userInfo.id === undefined) {
          toast("请先登录", "error");
          return;
        }

        const ret = await medicinePlanService.getUserPlans(userInfo.id);
        console.log("用户药品", ret);
        if (ret.success) {
          setMedicationPlans(ret.data);
        } else {
          toast(ret.message, "error");
        }
      } catch (err) {
        toast("获取药品数据失败", "error");
      }
    };

    fetchMedicinePlans();
  }, []);

  const filteredPlans = medicinePlans.filter((plan) =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (
    field: keyof MedicationReminder,
    value: string
  ) => {
    setReminder((prev) => ({ ...prev, [field]: value }));
  };

  const handleTimeChange = (
    index: number,
    field: keyof ReminderTime,
    value: string
  ) => {
    const newTimes = [...reminder.times];
    newTimes[index] = { ...newTimes[index], [field]: value };
    setReminder((prev) => ({ ...prev, times: newTimes }));
  };

  const addTime = () => {
    setReminder((prev) => ({
      ...prev,
      times: [...prev.times, { period: "其他", hour: "12", minute: "00" }],
    }));
  };

  const removeTime = (index: number) => {
    setReminder((prev) => ({
      ...prev,
      times: prev.times.filter((_, i) => i !== index),
    }));
  };

  const scrollPlans = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // 可以根据需要调整滚动距离
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePlanSelect = (plan: MedicinePlan) => {
    setSelectedPlan(plan.id);
    setReminder((prev) => ({
      ...prev,
      planId: plan.id,
      planName: plan.name,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-white z-10">
        <div className="flex items-center justify-between h-14 px-4 border-b">
          <div className="flex items-center">
            <button className="p-2 -ml-2" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-medium ml-2">确认用药提醒</h1>
          </div>
        </div>
      </header>

      <main className="pt-16 px-4 pb-24">
        <div className="mb-6">
          <Label className="text-sm font-medium mb-2 block">选择用药计划</Label>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="搜索用药计划"
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 p-1 rounded-full shadow"
              onClick={() => scrollPlans("left")}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 p-1 rounded-full shadow"
              onClick={() => scrollPlans("right")}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide space-x-4 pb-2 pt-2"
              style={{ scrollBehavior: "smooth" }}
            >
              <Card className="flex-shrink-0 w-24 cursor-pointer">
                <CardContent className="p-2 flex flex-col items-center justify-center h-full">
                  <Plus className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-xs text-center">新建计划</span>
                </CardContent>
              </Card>
              {filteredPlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`flex-shrink-0 w-56 cursor-pointer ${
                    selectedPlan === plan.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  <div className="mb-auto">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-800">{plan.name}</h3>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          plan.status === "active"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {plan.status === "active" ? "进行中" : "已完成"}
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500">
                      {plan.startDate} - {plan.endDate}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">提醒时间</Label>
            {reminder.times.map((time, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Select
                  value={time.period}
                  onValueChange={(value) =>
                    handleTimeChange(index, "period", value)
                  }
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="空腹">空腹</SelectItem>
                    <SelectItem value="早餐">早餐</SelectItem>
                    <SelectItem value="午餐">午餐</SelectItem>
                    <SelectItem value="晚餐">晚餐</SelectItem>
                    <SelectItem value="睡前">睡前</SelectItem>
                    <SelectItem value="其他">其他</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={time.hour}
                  onValueChange={(value) =>
                    handleTimeChange(index, "hour", value)
                  }
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <SelectItem
                        key={hour}
                        value={hour.toString().padStart(2, "0")}
                      >
                        {hour.toString().padStart(2, "0")}时
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={time.minute}
                  onValueChange={(value) =>
                    handleTimeChange(index, "minute", value)
                  }
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                      <SelectItem
                        key={minute}
                        value={minute.toString().padStart(2, "0")}
                      >
                        {minute.toString().padStart(2, "0")}分
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTime(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={addTime} className="mt-2" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              添加提醒时间
            </Button>
          </div>

          <div>
            <Label className="text-sm font-medium">重复</Label>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroup
                value={repeatType}
                onValueChange={setRepeatType}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="每天" id="r1" />
                  <Label htmlFor="r1">每天</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="自定义" id="r2" />
                  <Label htmlFor="r2">自定义</Label>
                </div>
              </RadioGroup>
              {repeatType === "自定义" && (
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={repeatValue}
                    onChange={(e) => setRepeatValue(e.target.value)}
                    className="w-16"
                    min="1"
                  />
                  <Select defaultValue="天">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="天">天</SelectItem>
                      <SelectItem value="周">周</SelectItem>
                      <SelectItem value="月">月</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="text-sm font-medium">
              备注
            </Label>
            <Textarea
              id="notes"
              value={reminder.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="添加备注信息（选填）"
              className="mt-1"
            />
          </div>

          <div className="text-sm font-medium">
            <Button className="w-full h-12 text-base bg-emerald-500 hover:bg-emerald-600">
              <Bell className="h-5 w-5 mr-2" />
              确认设置提醒
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
