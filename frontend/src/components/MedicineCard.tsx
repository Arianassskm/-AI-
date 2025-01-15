import { useState } from "react";
import { MedicineDetailModal } from "./MedicineDetailModal";
import { Medicine } from "@/services/medicineService";

export function MedicineCard(medicine: Medicine) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="flex-shrink-0 w-40 cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="card overflow-hidden relative group-hover:shadow-md transition-all duration-300">
          <img
            src={medicine.image}
            alt={medicine.name}
            className="w-full h-40 object-cover"
          />
          {/* Progress bar overlay */}
          {/* <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/30 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-white flex-shrink-0 w-8">
                {progress}%
              </span>
            </div>
          </div> */}
        </div>
        <div className="mt-3">
          <h3 className="text-sm font-medium text-gray-800 truncate text-center">
            {medicine.name}
          </h3>
        </div>
      </div>

      <MedicineDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        medicine={medicine}
      />
    </>
  );
}
