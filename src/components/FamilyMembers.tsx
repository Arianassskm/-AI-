interface FamilyMember {
  id: string;
  name: string;
  avatar: string;
}

interface FamilyMembersProps {
  members: FamilyMember[];
}

export function FamilyMembers({ members }: FamilyMembersProps) {
  return (
    <div className="flex flex-wrap gap-6">
      {members.map(member => (
        <div 
          key={member.id}
          className="flex flex-col items-center"
        >
          <img
            src={member.avatar}
            alt={member.name}
            className="w-16 h-16 rounded-full object-cover shadow-md"
          />
          <span className="mt-2 text-sm font-medium text-gray-700">
            {member.name}
          </span>
        </div>
      ))}
    </div>
  );
}