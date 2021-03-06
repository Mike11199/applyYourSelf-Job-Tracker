# applyYourSelf-Job-Tracker
Full stack MERN Project.

-Used NPM to add normalized CSS and styled-components to provide cross browser consistency, prevent name collisions, and allow stylizing of entire react components using wrappers.

-Used React Router to allow for the website to be a multi-page application.  Set up routes for if user is logged in, a registration page, a landing page, and a catch all error page for URLs not defined.

-Added an isMember function to toggle FormRow components on the login/register screen. Utilized conditional rendering with inline ternarny operators to display different form fields if the user is already registered and can log in, or needs to register.

-Set up a global context using createContext and a useContext hook to pass values deep into the component tree.  This allows the alert function to be used globally as oppossed to passed to each prop.



<img src="https://user-images.githubusercontent.com/91037796/171723508-c90523fd-f41f-4338-a6f5-f372adc5fc66.png" width=50% height=50%>


-Used a reducer (a function that take the current state and an action as arguments, and return a new state result) and dispatch functions to enable alerts to show and clear after a brief period of time (user not inputting all values into the form, etc.)


<img src="https://user-images.githubusercontent.com/91037796/171750486-4053e32c-028b-4690-9281-7f4e01e18475.png" width=50% height=50%>

-Used Postman to test express routes for user authentication:

<img src="https://user-images.githubusercontent.com/91037796/178851283-ce8a3bf0-369d-4a4a-bcf8-a67d72c42ba8.png" width=50% height=50%>




-Created a user model to with Mongoose schema for use with MongoDB.  Used a validator package from npm to validate the email.

<img src="https://user-images.githubusercontent.com/91037796/178848537-40aae12d-bdfa-48e5-9989-2e555298968b.png" width=50% height=50%>

-MongoDB dummy values:

<img src="https://user-images.githubusercontent.com/91037796/178851418-406245e6-dbe9-49aa-8cb0-4470243310ad.png" width=50% height=50%>

-Used npm to install packages such as express-async-errors  to avoid numerous try/catch statements for controllers, and http-status-codes to prevent hard coding of status codes.

