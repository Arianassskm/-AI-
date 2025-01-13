interface MedicationListItemProps {
  name: string;
  nameEn: string;
  image: string;
  quantity: number;
  expiryDate: string;
  description: string;
  onEdit: () => void;
}

export function MedicationListItem({
  name,
  nameEn,
  image,
  quantity,
  expiryDate,
  description,
  onEdit
}: MedicationListItemProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex gap-4">
        <img src={image} alt={name} className="w-20 h-20 rounded-xl object-cover" />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium text-gray-800">{name}</h3>
              <p className="text-sm text-gray-500">{nameEn}</p>
            </div>
            <button
              onClick={onEdit}
              className="px-3 py-1 text-sm text-blue-500 bg-blue-50 rounded-full"
            >
              编辑
            </button>
          </div>
          
          <div className="flex gap-8 mb-2">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-medium text-gray-800">{quantity}</span>
                <span className="text-sm text-gray-500">库存量(盒)</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500">有效期至</span>
                <span className="text-sm text-gray-800">{expiryDate}</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <button className="text-sm text-blue-500 mt-1">更多药品说明 ›</button>
        </div>
      </div>
    </div>
  );
}