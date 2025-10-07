## 4.1 Plan Introduction      
This Software Development Plan provides the details of the planned development for the Fika Web Application CSCI, a dedicated platform for discovering, reviewing, and logging visits to coffee shops based on specific criteria like parking, seating, and amenity availability.      

The Fika application addresses the current fragmentation of coffee shop information by condensing data from various platforms (e.g., Google Reviews, TikTok) into a single, specialized tool. Its core value lies in providing specific details relevant to coffee shop goers, such as Wi-Fi, outlets, and seating capacity, which are often absent from general restaurant review sites. The application will be developed using a Next.js frontend, a PostgreSQL database managed by Supabase, and integrated with OpenStreetMaps for geographical data visualization. Development activities include architectural design, implementation of the frontend (Discover, Cafe, and User Logging pages) and backend APIs, integration of third-party services (Firebase for authentication, Vega for visualization), and continuous testing.      

### 4.1.1 Project Deliverables      
The following items will be delivered to the customer (instructor) during the course of the project:

* Software Requirements Specification (SRS): [Delivery Date: 09/24/2025]    
    * This document provides a complete and detailed outline of the functional (5.3), performance (5.4), and environmental (5.5) requirements for the Fika application, serving as the foundational contract for development.      

* Software Design Document (SDD): [Delivery Date: 09/24/2025]    
    * Details the architectural design, including the CSCI component breakdown (Frontend, Backend, Auth), the PostgreSQL database schema, and interface specifications for the API and all third-party services (OpenStreetMaps, Firebase).     

* Project Plan (SDP): [Delivery Date: 10/08/2025]       
    * Outlines the development approach, resource allocation (hardware, software, human), and the high-level task schedule for the project development lifecycle.       

* Fika Minimum Viable Product (MVP): [Delivery Date: 11/05/2025]     
    * A functional, publicly hosted version of the application using Vercel and Supabase. This version includes the core user flow: user Authentication (5.3.3), display of the Home Page and a basic Discover Page list (5.3.1.1), and a fundamental Cafe Page displaying static metadata.     

* Fika Final Web Application: [Delivery Date: 12/10/2025]     
    * The complete, production-ready web application meeting all functional requirements. This includes advanced features such as:     
        * Full filtering and search capability on the Discover Page (5.3.1.5).     
        * OpenStreetMaps integration for geographical display (5.3.1.4).    
        * Vega Charts displaying trends on the Cafe Page (5.3.1.9).    
        * Complete User Logging subsystem (saving cafes, submitting reviews) (5.3.1.8, 5.3.1.10).     

* Final Repository & Documentation: Includes the full source code, deployment configuration, and a final demonstration of all features.    


## 4.2 Project Resources      
### 4.2.1 Hardware Resources      
### 4.2.2 Software Resources     

## 4.3 Project Organization             

## 4.4 Schedule

This section provides schedule information for the **fika** project.

---

### 4.4.1 PERT Chart or GANTT Chart
**GANTT Chart**

![GANNT Chart](../documents/gannt.png)
****

---

### 4.4.2 Task/Resource Table

This table details the relationship between each task and the resources required to complete it. This ensures that the workload is distributed properly among team members and other resources.

| Task | Estimated Duration | Assigned To | Resources (Hardware/Software) |
|---|---|---|---|
| **Setting up dev enviorment** | 2 days | All Members | VSCode, Supabase, Vercel, GitHub, Node.js, npm |
| **Create UX Designs** | 2 weeks | All Members | Figma, Gemini mocks, Photoshop |
| **Create Home Page** | 2 weeks | Kate | Next.js, VSCode, Gemini mocks, Figma, CSS help tools |
| **Create Cafe Page** | 2 weeks | Jillian | Next.js, VSCode, Gemini mocks, Figma, UI kits |
| **Create Basic Discover Page** | 2 week | Ahtziri | VSCode, Gemini mocks, Figma |
| **Write Unit and Intergration Tests** | 6 weeks | All members | VSCode |
| **Manually Testing** | 2 weeks | All members | VSCode |
| **Add Filtering Functionality** | 2-3 days | Giselle | VSCode, Supabase |
| **Add Map Functionality** | 1 week | Jillian | OpenStreetsMap API |
| **Add Data Visualizations** | 2 weeks | Kate | Vega, VSCode |
| **Create Logging Functionality** | 1 week | Giselle | Supabase, VSCode |
| **Manually Input Cafes** | 5 weeks | All members | VSCode, Google maps, Yelp, Google |
| **Experiment with APIs** | 3 weeks | All members | OpenStreetsMap, GooglePlaces, Yelp Fusion |     
