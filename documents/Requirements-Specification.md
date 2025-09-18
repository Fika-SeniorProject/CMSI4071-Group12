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


### **5.3 Functional Requirements**      
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
















## **1.3 Preliminary Design Description**

Fika will be an application that primarily relies on the iPhone as the place of interaction for the user’s to initiate certain actions, such as view flashcards and study decks, and have more direct interactions with the system. 

### **System Architecture Design**
<img src="img/prelim_system_architecture.png" alt ="diagram of system architecture" height="250">

As seen in the figure above, the user will interact directly with the iPhone as the main interface. The MVVM structure of the iOS app will handle user interaction between the software and the consumer, while the Firebase Auth will communicate with the app to manage user login via Google sign in and email/password connection. The app will also interact with the Firestore Database to store user data, including but not limited to: the user themself, user created flashcards, IDs of saved flashcards, and known friends. 

### **User Flow Diagram**
<img src="img/prelim_user_flow.jpg" alt ="diagram of user flow" height="250">

The user will follow this general outline to navigate through StudyStacks. Users will be presented with a splash screen upon opening the app while not signed in, and be presented with the option to either sign back in, or sign up for an account. Signing back in will lead the user directly to the dashboard, whereas signing up will take the user through the onboarding process before navigating to the dashboard. Here, they can continue to navigate to the social section to see their friend’s progress, the flashcard library to view all public and created decks, or to their profile to see their saved decks, current progress in studying, and access their settings. 

## **1.4 Preliminary Development Schedule**

For this project, we decided on scheduling 4 two-week sprints (with some wiggle-room at the end for a 5th sprint if needed), with once a week stand-ups. With this in mind, our SWAG of a timeline is illustrated below: 

* **Sprint 1**: Set up project repository, implement Firebase authentication, design UI layouts  
* **Sprint 2**: Implement basic flashcard mechanisms, user profiles, and onboarding  
* **Sprint 3**: Implement deck sharing, social features, and badges  
* **Sprint 4**: Implement spaced repetition system, test for edge cases and errors  
* (if needed) **Sprint 5**: Clean up, final testing, bug fixes, and submission

An example of our Sprint 1 development progress can be seen below:

<img src="img/prelim_sprint_tracker.png" alt ="Trello sprint 1 tracking" height="250">
<img src="img/prelim_sprint_backlog.png" alt ="Trello sprint backlog" height="250">

## **1.5 Development Tools**

To efficiently develop, test, and manage the iOS application, a combination of software, design, and project management tools will be utilized. These tools will support the frontend and backend development process and are outlined below. 

* **Design & Prototyping:** Figma  
* **Programming Language & Framework:** SwiftUI, Swift (in Xcode)  
* **Backend & Database:** Google Firebase (Authentication and Firestore)  
* **Version Control:** GitHub  
* **Project Management Tool:** Trello   
* **Testing Tools:** Xcode Simulator  
* **Editor**: Xcode
