import type { User } from '../../types/user';

interface ProfileFamilyMembersProps {
  members: User[];
}

export function ProfileFamilyMembers({ members }: ProfileFamilyMembersProps) {
  return (
    <div className="card p-4">
      <h2 className="text-base font-medium text-gray-800 mb-4">家庭成员</h2>
      <div className="grid grid-cols-2 gap-4">
        {members.map((member) => (
          <button
            key={member.id}
            className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-primary-50 transition-all duration-300 group"
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="ml-3 text-left">
              <p className="font-medium text-gray-800 group-hover:text-primary-600">{member.name}</p>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}