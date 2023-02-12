Only registered users can work on the system. **Each User login with his username & email** – Those
credentials are verified against the https://jsonplaceholder.typicode.com/users.
The jsonplaceholder demonstrate use data from external source.
Every user authenticate by JWT(Json Web Token).
Because this poject it demonstration the user not take password Although this not secure idea.

After user login his Full Name will be shown in EVERY page and have "Log-Out" button that return user to this page.
Each user has a limited actions per day.
# UI

 - email text box
- username text box
- login button

#  queries
when user press the login button use **userLogin** to send email, username and get the accessToken.
the token save in the memory.
in every page use the **getUser** to get the full name.