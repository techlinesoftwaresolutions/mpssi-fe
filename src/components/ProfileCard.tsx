import React, { useState, useEffect } from 'react';
import '../styles/ProfileCard.css';

interface ProfileCardProps {
  image: string;
  nameHi: string;
  nameEn: string;
  designationHi: string;
  designationEn: string;
  bioHi?: string;
  bioEn?: string;
  organizationEn?: string;
  organizationHi?: string;
  language?: 'hi' | 'en';
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  image,
  nameHi,
  nameEn,
  designationHi,
  designationEn,
  bioHi,
  bioEn,
  organizationEn,
  organizationHi,
  language = 'en'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(image);
  const [isLoading, setIsLoading] = useState(true);

  const name = language === 'hi' ? nameHi : nameEn;
  const designation = language === 'hi' ? designationHi : designationEn;
  const bio = language === 'hi' ? bioHi : bioEn;
  const organization = language === 'hi' ? organizationHi : organizationEn;

  useEffect(() => {
    setImgSrc(image);
    setIsLoading(true);
  }, [image]);

  const handleImageError = () => {
    console.warn(`Image failed to load: ${imgSrc}`);
    // Use a reliable placeholder
    const fallbackUrl = `https://via.placeholder.com/200x200?text=${encodeURIComponent(name.substring(0, 2))}`;
    setImgSrc(fallbackUrl);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      className="profile-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Avatar Container */}
      <div className="avatar-container">
        {isLoading && (
          <div className="avatar-loader">
            <div className="loader-spinner"></div>
          </div>
        )}
        <img
          src={imgSrc}
          alt={name}
          className="avatar-image"
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      </div>

      {/* Info Section */}
      <div className={`info-section ${isHovered ? 'show-bio' : ''}`}>
        <div className="profile-info">
          <h3 className="profile-name">{name}</h3>
          <p className="profile-designation">{designation}</p>
          {organization && <p className="profile-organization">{organization}</p>}
        </div>

        {/* Bio Section - Shows on Hover */}
        {bio && (
          <div className="profile-bio">
            <p>{bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
