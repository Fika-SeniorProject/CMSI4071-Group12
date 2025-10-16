## 6.1 Introduction         
This document presents the architecture and detailed design for the fika web application. The project is a dedicated platform for discovering, reviewing, and logging visits to coffee shops based on specific criteria like parking, seating, and amenity availability. The application condenses scattered coffee shop information from various platforms (e.g., Google Reviews, TikTok) into a single, specialized tool.      

### 6.1.1 System Objectives              
The primary objective of the fika application is to provide a single, specialized web-based tool for coffee shop enthusiasts to discover, review, and log their visits, focusing on details often missing from general review platforms.        

The key goals and objectives are:       
* **Discovery and Filtering:** To provide a simple interface for searching and filtering cafes based on criteria pertinent to coffee shop goers, such as parking availability, seating capacity, Wi-Fi, and outlet availability.
* **Comprehensive Cafe Information:** To display individual cafe pages with user-provided reviews, aggregated ratings, and crucial metadata like hours, address, and amenities.
* **User Engagement:** To enable authenticated users to submit new reviews and maintain a personalized log/favorites list of the cafes they have visited.
* **Data Visualization:** To display charts visualizing trends in cafe data to help users make informed choices.
* **Performance and Scalability:** To maintain a smooth and responsive experience, ensuring search results are returned within 3 seconds, and the system can support at least 5,000 concurrent users with 99% monthly uptime.

### 6.1.2 Hardware Interfaces     
The fika application interfaces with specific hardware, software, and human elements in both its execution environment and its use of third-party APIs.      

#### 6.1.2.1 Hardware Interfaces         
* **Client Hardware**: The system relies on standard client-side hardware interfaces, including the Network (Broadband internet connection is required for access) , Display (minimum 1280x800 resolution), Mouse/Trackpad, and Keyboard for user input and navigation.
* **Deployment Hardware:** The application is hosted on cloud infrastructure. The backend/database uses a Cloud-hosted Processor (minimum 2 vCPUs) and RAM (4 GB minimum, scalable with usage). It requires Public internet access with HTTPS/TLS for network communication.     

#### 6.1.2.2 Software Interfaces      
The system integrates with several third-party software components and APIs:  

* **Next.js (latest LTS):** Used for the Frontend development framework, providing server-side rendering and a modern React development environment.
* **PostgreSQL 15+:** The primary database, managed via Supabase, stores cafe records, user accounts, and reviews. It is essential for storing cafe metadata using advanced indexing and JSONB support.
* **Supabase:** Serves as the hosting platform for the backend and managed PostgreSQL database. It is chosen for its ease of integration with PostgreSQL and real-time APIs.
* **Vercel:** Used for hosting the Next.js frontend, ensuring automatic CI/CD integration for frontend code changes.
* **Supabase Authentication:** Handles all user login, signup, and account management, securing access to logging features.
* **OpenStreetMaps API:** Used to provide geographical data on cafes and to visualize cafe locations on the Discover Page map. It is a free and open alternative to commercial mapping APIs.    

#### 6.1.2.3 Human Interfaces
* **User Interface (UI):** The system provides a web-based Graphical User Interface (GUI) accessible via a standard web browser (Chrome, Safari, etc.). The interface is divided into key areas:
  * **Discover Page:** Provides the interface to search, filter, and view cafes on an interactive map.
  * **Cafe Page:** Displays individual cafe details, reviews, and data trends.
  * **User Logging (Favorites/Reviews):** Allows users to save cafes and input new reviews.
  * **Authentication UI:** Provides dedicated login/register screens.      

## 6.2 Architectural Design      
The fika application is based on a three-tier architecture consisting of the Presentation Layer (Frontend), the Application/Business Layer (Backend API and Logic), and the Data Layer (Database). This structure ensures separation of concerns, scalability, and maintainability.        

The system is partitioned into the following four top-level Computer Software Configuration Items (CSCI):   
1. **Frontend CSC:** The user-facing web application.    
2. **Backend CSC:** The core business logic, data management, and API endpoints.
3. **Authentication CSC:** The dedicated system for user account management, managed by Supabase.
4. **Hosting & Infrastructure CSC:** The deployment and environment configuration.         
 
### 6.2.1 Major Software Components       
The major software components are derived from the CSCI breakdown:      
* **Frontend CSC (Presentation Layer):** Built with Next.js. It contains the user interface components:
  * **Discover Page CSU:** Manages cafe search, filtering, and map visualization (using OpenStreetMaps).
  * **Cafe Page CSU:** Renders individual cafe details, aggregated ratings, and trend visualizations (using Vega charts).
  * **User Logging CSU:** Manages user-specific actions like saving favorite cafes and providing an interface for writing new reviews.
    
* **Backend CSC (Application/Data Layer):** Hosted on Supabase and powered by PostgreSQL
  * **Database CSU:** Manages the database schema for storing CafeTable (details, attributes), Review Table (user reviews, ratings), and UserTable (authentication-linked user data).

* **Authentication CSC:** A dedicated Supabase-based system for user login, signup, and account management
  * **Auth CSU:** Manages the core login, logout, and secure session management.
  * **AuthUI module:** Provides the user interface for login and registration screens.
  
* **Hosting & Infrastructure CSC:**
  * **Hosting CSU:** Manages the CI/CD pipelines and deployment of the application components. This includes VercelDeploy (frontend) and SupabaseDeploy (backend services).

### 6.2.2 Major Software Interactions
Communication in the fika architecture is primarily through a client-server model over HTTPS/TLS.     

* **Frontend-Backend/API Interaction:**     
  * The Frontend CSC (Next.js) communicates with the Backend CSC's API CSU via REST/GraphQL endpoints.     
  * The Backend API calls abstract the direct connection to the PostgreSQL database (Database CSU), ensuring business logic is enforced before data retrieval or persistence.   

* **Authentication Interaction:**
  * The Frontend CSC interfaces with the Supabase Authentication CSC for user sign-up and login.
  * The Supabase system provides a secure authentication token upon successful login, which the Frontend uses in subsequent API calls to the Backend.
  * The Backend uses the authentication token to verify the user's identity and restrict access to features like submitting reviews or accessing saved cafes.

* **External API Interaction:**
  * The Frontend's MapView module uses the OpenStreetMaps API to render geographical data and cafe locations.
  * The Frontend's Cafe Page CSU uses the Vega/Vega-Lite library to render visualizations after retrieving the necessary aggregated data from the Backend API

