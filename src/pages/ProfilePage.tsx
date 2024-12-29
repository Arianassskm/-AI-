import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileStats } from '../components/profile/ProfileStats';
import { ProfileActions } from '../components/profile/ProfileActions';
import { ProfileHealthInfo } from '../components/profile/ProfileHealthInfo';
import { ProfileFamilyMembers } from '../components/profile/ProfileFamilyMembers';
import { users } from '../data/users';

const medicationData = {
  yearlyUsage: 35,
  averageSteps: 8500,
  age: 35,
  riskScore: 25
};

export function ProfilePage() {
  const currentUser = users[0];

  return (
    <div className="page-container">
      <div className="px-4 pt-safe-top pb-24 space-y-6">
        <ProfileHeader user={currentUser} />
        <ProfileStats stats={medicationData} />
        <ProfileActions />
        <ProfileHealthInfo user={currentUser} />
        <ProfileFamilyMembers members={users} />
      </div>
    </div>
  );
}