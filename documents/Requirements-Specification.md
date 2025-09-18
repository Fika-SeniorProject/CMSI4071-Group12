# **Requirements Specification**

CMSI 4071: Senior Project I      
24 September 2025      
        
Collaborators: Giselle Eliasi, Jillian Hunter, Kate Galvin, Ahtziri Gutierrez       

## **5.1 Introduction** 

**Project Name:** Fika

### **Project Description** 

Our proposed web application, fika, is a tool for discovering new coffee shops. Currently for many the process of trying new cafes involves prior research on criteria such as the difficulty of finding parking or seating, the quality of the drinks, or the availability of wifi and outlets. This information is scattered between various reviewing platforms, such as Tiktok and Google Reviews. Our project idea is to condense this information into one application specifically made for reviewing and discovering cafes. While there are a few similar applications such as beli or Yelp made for reviewing restaurants, none are dedicated to cafes and therefore they lack the specific details that are of interest to coffee shop goers. The most important features of fika are the logging feature for users to save and review cafes they have visited, the individual cafe page that displays the user provided information on the cafe, and the discover page where users can apply filters to discover cafes near them. The frontend of the web-app will be created using Next.js and the backend will include a database made using PostgreSQL. Additionally we will use the free Open Streets Maps API for geographical data on cafes and Vega charts to visualize trends in coffee shop data. For authentication we will use Firebase and for hosting we will use Vercel and Supabase. If time permits and the free tiers support our use cases we will look into incorporating APIs such as Google Places and Gemini.

### **Project Management Style**

As a group, we felt that taking a **Scrum** approach to the development of Fika would be the most beneficial due to the focus on shorter iteration cycles, easy adaptability to changing vision, and the continuous feedback with each other. While we’re taking a very collaborative approach, we did define the roles of product owner and scrum master on the team, designating them to Giselle and Ahtziri respectively.

### **Potential Users** 

The primary users are people who are very passionate about trying new coffee spots.

Secondary users include students and remote works.


### **Key Features**

* Home Page → all general information and featured cafes
* Explore Page → will display coffee shops and can by filter by certain features 
* Individual Cafe Page → will display about informationm community ratings, popularity over time, general reviews
* User Profiles → each user has a profile with their saved coffee shops and reviews 
* Firebase Authentication → supports Google sign-in and email/password sign in  

## **5.2 CSCI Components** 
CSCI fika is composed of the following CSCs:       


* **5.2.1 Frontend CSC**: The user-facing portion of fika, built with Next.js. It is responsible for rendering the interface where users can browse, filter, and review cafes.      

  * 5.2.1.1 Discover Page CSU — Provides the interface to search and filter cafes using location and user-specified criteria (parking, seating, wifi, etc.).      
    * DiscoverFilter module — Implements filter UI components (checkboxes, dropdowns).      
    * MapView module — Integrates OpenStreetMaps to visualize cafe locations.      
   
  * 5.2.1.2 Cafe Page CSU — Displays individual cafe details, reviews, and ratings.          
    * ReviewDisplay module — Shows user reviews and aggregated ratings.        
    * CafeInfo module — Displays cafe metadata such as parking, outlets, wifi availability.       
   
  * 5.2.1.3 User Logging CSU — Allows users to log and save cafes they’ve visited.        
    * Favorites module — Manages user’s saved cafe list.        
    * ReviewInput module — Provides UI for writing reviews.
      
   
* **5.2.2 Backend CSC**: The application’s backend services, hosted on Supabase and PostgreSQL, responsible for business logic, data storage, and API endpoints.             

  * 5.2.2.1 Database CSU — PostgreSQL database schema for storing cafes, reviews, and user data.          
    * CafeTable module — Stores cafe details.
    * ReviewTable module — Stores user reviews and ratings.           
    * UserTable module — Stores authentication-linked user data.            
   
  * 5.2.2.2 API CSU — Provides REST/GraphQL endpoints for frontend communication.                  
    * CafeAPI module — Handles queries and filters for cafes.         
    * ReviewAPI module — Handles creation and retrieval of reviews.
                
          
* **5.2.3 Authentication CSC**: Authentication CSC — Firebase-based system for user login, signup, and account management.                  

  * 5.2.3.1 Auth CSU — Manages login, logout, and account sessions.               
    * AuthUI module — Provides login/register screens.     
    * AuthLogic module — Handles token management and secure sessions.

      
* **5.2.4 Data Visualization CSC**: Handles analytics and insights about cafes using Vega charts.                         

  * 5.2.4.1 Trend Visualization CSU — Displays aggregated statistics (popular cafes, average ratings, etc.).                     
    * Charts module — Generates Vega-based charts.
   

* **5.2.5 Hosting & Infrastructure CSC**: Deployment and hosting configuration using Vercel (frontend) and Supabase (backend).                             

  * 5.2.5.1 Hosting CSU — Manages CI/CD pipelines and deployment.                          
    * VercelDeploy module — Handles frontend deployment.
    * SupabaseDeploy module — Handles backend services.       


## **5.3 Functional Requirements**      
Each subsection below corresponds to a CSC defined in the CSCI breakdown.       

* **5.3.1 Graphical User Interface**:                                
    * Description: The frontend shall provide the primary interface for users to interact with fika. It shall include pages for discovering cafes, viewing cafe details, and logging user experiences.         
    * Requirements:     
      * 5.3.1.1 The Discover Page subsystem shall display a searchable and filterable list of cafes.     
      * 5.3.1.2 The Discover Page subsystem shall display cafes on a map using OpenStreetMaps.      
      * 5.3.1.3 The Discover Page subsystem shall allow filtering cafes by criteria such as parking availability, seating capacity, wifi availability, and outlet availability.      
      * 5.3.1.4 The Cafe Page subsystem shall display user-provided reviews for the selected cafe.          
      * 5.3.1.5 The Cafe Page subsystem shall display metadata for each cafe, including address, hours, and amenities.       
      * 5.3.1.6 The Cafe Page subsystem shall allow users to submit new reviews.         
      * 5.3.1.7 The User Logging subsystem shall allow users to save cafes they have visited.          
      * 5.3.1.8 The User Logging subsystem shall display a personalized list of cafes the user has saved.
     
* **5.3.2 Database and API**:                                
    * Description: The backend shall provide services for storing, retrieving, and managing data related to cafes, users, and reviews. It shall expose APIs to enable frontend communication.                  
    * Requirements:      
      * 5.3.2.1 The Database subsystem shall store cafe records with attributes including name, location, hours, and amenities.       
      * 5.3.2.2 The Database subsystem shall store user reviews linked to specific cafes and users.      
      * 5.3.2.3 The Database subsystem shall store user account information linked to Firebase authentication.     
      * 5.3.2.4 The API subsystem shall provide endpoints for retrieving a list of cafes.    
      * 5.3.2.5 The API subsystem shall provide endpoints for retrieving cafes filtered by user-specified criteria.     
      * 5.3.2.6 The API subsystem shall provide endpoints for submitting new reviews.      
      * 5.3.2.7 The API subsystem shall provide endpoints for retrieving user-saved cafes.     

* **5.3.3 Authentication CSC**:                                
    * Description: The authentication subsystem shall provide secure account management, enabling users to log in, log out, and manage their session.                          
    * Requirements:        
      * 5.3.3.1 The system shall allow users to create an account using Firebase authentication.
      * 5.3.3.2 The system shall allow users to log in with an existing account.
      * 5.3.3.3 The system shall allow users to log out of their account.
      * 5.3.3.4 The system shall restrict access to logging and saving features to authenticated users.
      * 5.3.3.5 The system shall ensure secure storage of authentication tokens.      

* **5.3.4 Data Visualization CSC**:                                
    * Description: The visualization subsystem shall provide users with aggregated insights and trends about cafes.                                
    * Requirements:        
      * 5.3.4.1 The system shall generate visualizations of popular cafes based on number of reviews.
      * 5.3.4.2 The system shall generate visualizations of average cafe ratings.
      * 5.3.4.3 The system shall generate visualizations of amenities availability trends (e.g., % of cafes with wifi).
      * 5.3.4.4 The system shall display visualizations using Vega charts.      
     
* **5.3.5 Hosting & Infrastructure CSC**:                                
    * Description: The hosting and infrastructure subsystem shall ensure fika is deployable, scalable, and available to users.                               
    * Requirements:        
      * 5.3.5.1 The system shall host the frontend using Vercel.      
      * 5.3.5.2 The system shall host the backend and database using Supabase.       
      * 5.3.5.3 The system shall automatically redeploy on updates using CI/CD pipelines.      


## **5.4 Performance Requirements** 
The fika system shall provide a smooth and responsive experience for users. This section specifies the measurable performance requirements for system responsiveness, scalability, usability, and resource usage.

* **5.4.1 Search Results Returned in 3 Seconds**:
  * Description: When users perform a search or apply filters in the Discover Page, the results must load quickly to maintain usability.
  * Requirements:       
    * 5.4.1.1 The system shall return search or filter results within 3 seconds of the user submitting a query under normal operating conditions.

* **5.4.2 Cafe Page Load Performance**:
  * Description: When users click on an individual cafe, the details page should load quickly to avoid frustration.     
  * Requirements:     
    * 5.4.2.1 The system shall load a cafe’s information (reviews, details, and metadata) within 2 seconds under normal operating conditions.      

* **5.4.3 Authentication Performance**:
  * Description: Logging into the system should be responsive to encourage user adoption.          
  * Requirements:      
    * 5.4.3.1 The system shall complete the login process within 3 seconds.       

* **5.4.4 Visualization Performance**:
  * Description: The data visualization subsystem must provide responsive chart rendering when aggregating reviews and cafe data.          
  * Requirements:      
    * 5.4.4.1 The system shall render visualizations (e.g., trends, ratings) within 5 seconds after data retrieval.      
 
* **5.4.5 Scalability Requirement**:
  * Description: The system must support growth in user traffic without major performance degradation.          
  * Requirements:       
    * 5.4.5.1 The system shall support at least 5,000 concurrent users without exceeding specified response time limits.                  

* **5.4.6 Availability Requirement**:
  * Description: As a web app, fika should remain available and reliable for users.                  
  * Requirements:     
    * 5.4.6.1 The system shall maintain 99% uptime availability over a monthly period, excluding scheduled maintenance.
 
* **5.4.7 Storage Requirement**:
  * Description: The system must efficiently handle storage for cafes, reviews, and user data.                       
  * Requirements:     
    * 5.4.7.1 The system shall store up to 1 million cafe entries and 10 million user reviews without requiring major database restructuring.


## **5.5 Environment Requirements**: 
The following subsections describe the hardware, software, and other resources required for the **development** and **deployment/execution** of the fika application. These requirements reflect the finalized environment for the project rather than preliminary design assumptions.  

---

### 5.5.1 Development Environment Requirements  

Following are the hardware requirements for development of fika:  

| Category          | Requirement                              |  
|-------------------|------------------------------------------|  
| Processor         | Intel i5 (8th Gen) or Apple M1 or higher |  
| Hard Drive Space  | 20 GB free space                         |  
| RAM               | 8 GB minimum, 16 GB recommended          |  
| Display           | 1280x800 resolution or higher            |  
| Network           | Broadband internet connection required   |  

Following are the software requirements for development of fika:  

| Category          | Requirement                                   |  
|-------------------|-----------------------------------------------|  
| Operating System  | macOS 12+, Windows 10+, or Ubuntu 22.04       |  
| Framework         | Next.js (latest LTS)                          |  
| Database          | PostgreSQL 15+                                |  
| Hosting Tools     | Vercel CLI, Supabase CLI                      |  
| Authentication    | Firebase SDK                                  |  
| API Integration   | OpenStreetMaps API, optional Google Places API |  
| Visualization     | Vega/Vega-Lite                                |  
| Programming Tools | Node.js 18+, npm or yarn, Git, VS Code        |  

**Notes:**  
- Node.js 18+ is required for compatibility with Next.js.  
- PostgreSQL 15+ provides advanced indexing and JSONB support, necessary for cafe metadata.  
- Supabase is chosen for ease of integration with PostgreSQL and real-time APIs.  

---

### 5.5.2 Deployment / Execution Environment Requirements  

Following are the hardware requirements for deployment of fika:  

| Category          | Requirement                                   |  
|-------------------|-----------------------------------------------|  
| Hosting Platform  | Vercel (frontend), Supabase (backend + DB)    |  
| Processor         | Cloud-hosted; minimum 2 vCPUs                 |  
| RAM               | 4 GB minimum, scalable with usage             |  
| Storage           | 50 GB initial database storage, scalable      |  
| Network           | Public internet access with HTTPS/TLS         |  

Following are the software requirements for deployment of fika:  

| Category          | Requirement                                   |  
|-------------------|-----------------------------------------------|  
| Operating System  | Linux-based (cloud managed)                   |  
| Database          | PostgreSQL (managed via Supabase)             |  
| Hosting Tools     | Vercel deployment pipelines                   |  
| Authentication    | Firebase Auth                                 |  
| Analytics         | Vega/Vega-Lite rendering in frontend          |  

**Notes:**  
- Hosting on Vercel ensures automatic CI/CD integration for frontend code changes.  
- Supabase provides managed PostgreSQL and authentication integration, reducing setup overhead.  
- The use of OpenStreetMaps API is justified as a free and open alternative to commercial mapping APIs, ensuring cost-effectiveness for the project.  
- If APIs such as Google Places or Gemini are adopted, they will be included only if their free tiers meet usage requirements.  

