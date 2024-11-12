# Employee-Portal-with-Full-Backend-Integration

This Employee Portal is an internal web platform designed for an organization. It serves as a centralized hub, giving employees access to a range of departmental tools, applications, and information. This redesigned portal focuses on providing an intuitive, user-friendly interface with streamlined navigation and consistent design to improve accessibility and productivity.

## Overview

This portal addresses previous usability issues by offering:
- A modern, clean design with improved navigation.
- Key functionalities such as a collapsible navigation menu, dynamic search, and enhanced table operations.
- Integration with a Node.js backend and an SQL Server database using Prisma.

## Key Functionalities

1. **Navigation**
   - Collapsible navigation menu for easy access.
   - Search bar for quick information retrieval.

2. **Data Management**
   - Enhanced table functionalities including row searching and cell editing.

3. **Integration**
   - Seamless SQL Server integration with Prisma for data access.
   - Node.js backend handling server-side logic.

4. **User Interface**
   - Responsive design using HTML, CSS, and JavaScript.
   - Consistent styling for a modern user experience.

5. **Notifications and Updates**
   - Real-time notifications for updates.
   - Regular updates to maintain portal functionality.

## Non-Functional Requirements

- **Performance**: Fast loading and efficient processing.
- **Scalability**: Scalable to handle increased data volumes.
- **Security**: Secure authentication and regular security updates.
- **Reliability**: High availability and minimal downtime.
- **Usability**: Intuitive interface with consistent user experience.
- **Maintainability**: Well-documented, modular codebase.
- **Compatibility**: Cross-browser and multi-device support.

## Architecture

- **Prototyping**: Built 3 to 4 prototypes for this portal using Figma.
- **Frontend**: Built with HTML, CSS, and JavaScript for a responsive, modern UI.
- **Backend**: Node.js server that utilizes Prisma Framework for SQL Server interaction.
- **Database**: SQL Server, managing application data and facilitating secure access.

## Database Tables

- **Applications**: Stores application details displayed on the portal.
- **Category Master**: Lists application categories.
- **Employee Access Requests**: Tracks user access requests.
- **Favorites**: Placeholder for user-added favorites (pending AD integration).
- **HR Updates**: Stores HR announcements shown on the main portal.
- **Important Contacts**: Contains manager contact information.
- **Support**: Stores support team contact details.
- **Holidays**: Manages holiday calendar data.

## Key Components

1. **Main Portal (index.html)**: Centralized interface with category listings, contacts, support, and HR updates.
2. **HR Updates Page (hrpage.html)**: Lists HR announcements along with the date and time and the updates get arranged in descending order automatically.
3. **HR Admin Page (hradmin.html)**: Allows HR Admin to put category wise updates on HR Updates page.
4. **IT Admin Page (addportals.html)**: Allows IT admins to add applications.
5. **Contacts Page (contacts.html)**: Displays manager contact info(phone numbers and email IDs) along with their designation.
6. **Support Page (support.html)**: Displays contact info(phone numbers and email IDs) of various support teams.
7. **Request Access Page (requestaccess.html)**: Allows users to request application access.

## Future Enhancements

- **AD Integration**: To enable adding applications to user favorites.
- **Access Request Notifications**: Sends email notifications to application owners upon access requests.

## Installation and Setup

1. **Run Prisma Dependencies**
   Initialize Prisma dependencies by running:
   ```bash
   npx prisma generate
   ```

2. **Migrate Setup**
   Apply this command for migrations to set up the on your system:
   ```bash
   npm run prisma:migrate
   ```

5. **Start the Development Server**
   Run the development server:
   ```bash
   npm run start:dev
   ```

After completing these steps, the portal should be up and running locally.
