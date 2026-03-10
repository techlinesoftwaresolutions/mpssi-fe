import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import teamData from '../data/teamData.json';
import '../styles/ProfileCard.css';

interface ProfileGalleryProps {
  section: 'founders' | 'committee' | 'donors' | 'patrons' | 'staff' | 'advisory';
  committeeTerm?: number; // For committee section
  language?: 'hi' | 'en';
}

const ProfileGallery: React.FC<ProfileGalleryProps> = ({
  section,
  committeeTerm,
  language = 'en'
}) => {
  const [activeLanguage] = useState(language);

  const renderFounders = () => {
    return (
      <div className="profile-grid">
        {teamData.founders.map((founder) => (
          <ProfileCard
            key={founder.id}
            image={founder.image}
            nameHi={founder.nameHi}
            nameEn={founder.nameEn}
            designationHi={founder.designationHi}
            designationEn={founder.designationEn}
            bioHi={founder.bio?.hi}
            bioEn={founder.bio?.en}
            language={activeLanguage}
          />
        ))}
      </div>
    );
  };

  const renderCommittee = () => {
    const committee = committeeTerm
      ? teamData.committees.find((c) => c.year === committeeTerm)
      : teamData.committees[0];

    if (!committee) return <p>No committee found for year {committeeTerm}</p>;

    return (
      <div>
        <h2 className="committee-term">
          {activeLanguage === 'hi' ? committee.termHi : committee.termEn}
        </h2>
        <div className="profile-grid">
          {committee.members.map((member) => (
            <ProfileCard
              key={`${committee.year}-${member.id}`}
              image={member.image}
              nameHi={member.nameHi}
              nameEn={member.nameEn}
              designationHi={member.positionHi}
              designationEn={member.positionEn}
              language={activeLanguage}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderDonors = () => {
    return (
      <div className="profile-grid">
        {teamData.donors.map((donor) => (
          <ProfileCard
            key={donor.id}
            image={donor.image}
            nameHi={donor.nameHi}
            nameEn={donor.nameEn}
            designationHi={donor.donationTypeHi}
            designationEn={donor.donationTypeEn}
            organizationHi={donor.organizationHi}
            organizationEn={donor.organizationEn}
            language={activeLanguage}
          />
        ))}
      </div>
    );
  };

  const renderPatrons = () => {
    return (
      <div className="profile-grid">
        {teamData.patrons.map((patron) => (
          <ProfileCard
            key={patron.id}
            image={patron.image}
            nameHi={patron.nameHi}
            nameEn={patron.nameEn}
            designationHi={patron.designationHi}
            designationEn={patron.designationEn}
            organizationHi={patron.organizationHi}
            organizationEn={patron.organizationEn}
            language={activeLanguage}
          />
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (section) {
      case 'founders':
        return renderFounders();
      case 'committee':
        return renderCommittee();
      case 'donors':
        return renderDonors();
      case 'patrons':
        return renderPatrons();
      default:
        return <p>Section not found</p>;
    }
  };

  return <div className="profile-gallery">{renderContent()}</div>;
};

export default ProfileGallery;
