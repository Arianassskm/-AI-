import { useNavigate } from 'react-router-dom';
import { PlanCard } from '../components/PlanCard';
import { MedicineCard } from '../components/MedicineCard';
import { medicationPlans } from '../data/sampleData';
import { medicines } from '../data/medicines';
import { SpaceHeader } from '../components/SpaceHeader';

export function SpacePage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="px-4 pt-safe-top pb-24">
        <SpaceHeader />
        
        {/* Plans Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              用药计划
            </h2>
            <button 
              onClick={() => navigate('/medication-plans')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              管理
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {medicationPlans.map((plan) => (
              <PlanCard key={plan.name} {...plan} />
            ))}
          </div>
        </section>

        {/* Medicine Cabinet Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              家庭药箱
            </h2>
            <button 
              onClick={() => navigate('/medication-cabinet')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              管理
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4 -mx-4 px-4 scrollbar-hide">
              {medicines.map((medicine) => (
                <MedicineCard key={medicine.name} {...medicine} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}