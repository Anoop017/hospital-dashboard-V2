Responsibilities
<==============>

1. Develop and maintain server-side applications, logic and APIs

2. Authentication - the backend handles whether a user is logged in or not. it also involes various things like login credential, tokens, multi-factor authentication etc

3. Role-Based Access Control(RBAC) - After loggin in- the RBAC decides who can do what, like the patient can book appointment, the doctor can approve appointment and edit timings, and the super user Admin can do all this and can also edit and update any information in the system. 

4. Data Access and Management - All interactions with the database wll be handled in this backend. like for example, fetching patients details, blood group, health condition etc. Also it includes fetching details about doctors, for example dates and timings. Admin can see and edit all this information

5. Audit logging - For compliance purpose, the backend is responsible for maintaining detailed logs like who logged in, what are the actions they made, have they updated any information etc.

6.Jobs - Other details and informations like reports, processingl large data set, and sending emails or push notifications

7.Caching - To improve performance and reduce the load on the database


NON-Goals
<=======>

1. Frontend - UI/UX
2. Payments - Razorpay/Stripe - for now we do not need anything
3. Analytics - Yes we need, but we will be sending the data to frontend, the graphs and all the related things will be done at the frontend.