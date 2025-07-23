/* Author: Michal Ondrejka
Login: xondre15 */

// Importing Fragment from React for creating a wrapper without a DOM element
import { Fragment } from "react";

// Importing styling for the ProfileInfo component
import "./style/ProfilePage.css";

// Component representing the profile information
function ProfileInfo() {
  // JSX structure for the profile information
  return (
    <Fragment>
      {/* Container for the profile name */}
      <div className="profile-name"></div>

      {/* Container for the profile image */}
      <div className="profile-image">
        {/* Profile image with a placeholder source */}
        <img
          src="https://static.republika.co.id/uploads/images/inpicture_slide/film_220529153459-786.jpeg"
          alt="cook profile picture"
        />
      </div>

      {/* Container for the user information */}
      <div className="info-container">
        {/* Username display */}
        <div className="profile-username">Username: Ratatouille2002</div>

        {/* Name display */}
        <div className="profile-name">Name: Mr. Ratatouille</div>

        {/* Email display */}
        <div className="profile-email">E-mail: Ratatouille2002@gmail.com</div>
      </div>

      {/* Edit profile button */}
      <div className="profile-edit-button btn">Edit profile</div>
    </Fragment>
  );
}

// Exporting the ProfileInfo component as the default export
export default ProfileInfo;
