# esc_project Group C5G6
<h1>Introduction</h1>
<p>A web application created as a user interface for hotel bookings by Ascendas. It utilizes the MERN (MongoDB, Express, React, Node.js) stack and is composed of the following features: </p>
<ul>
  <li><strong>Feature 1</strong>: A text-based autocomplete search for the user's choice of destination as well as options to choose the check in and check out dates, number of adults, number of children, and the number of rooms.</li>
  <li><strong>Feature 2</strong>: After the user has searched for their desired destination, a list of hotels will be generated for the user to choose. The user is able to select their desired hotel to proceed to the hotel information page or view summarized information about a specific hotel.</li>
  <li><strong>Feature 3</strong>: After selecting their desired hotel, the user will be brought to the hotel information page. The hotel will display hotel and amenities ratings, hotel descriptions and the hotel location. It will also display a list of hotel rooms that are available for the user to book. The user is able to select their preferred room and proceed to the bookings page.</li>
  <li><strong>Feature 4</strong>: After selecting their desired room, the user will be brought to the booking page. Here, the user will be prompted to provide their personal information as well as their credit card details for booking. The user will also be provided with a booking summary to inform them of their selections.</li>

<h3>Setup</h3>
<ol>
  <li><code>git clone</code> this repository to your local folder</li>
  <li>Make sure you have <code>npm</code> and <code>node</code> installed.</li>
  <li>Run <code>npm install</code> in <code>esc_ascendas_hb/ahb_frontend</code> and <esc_ascendas_hb/ahb_backend> to install any dependencies.
  </ol>
<h3>Running the server</h3>
    <h4>Frontend:</h4>
<ol>
  <li><code>npm start</code> in <code>esc_ascendas_hb/ahb_frontend</code> to start the frontend server.</li>
  <li>Access the frontend server at <code>localhost:3000</code>.</li>
    </ol>
    <h4>Backend:</h4>
    <ol>
  <li><code>node app.js (or nodemon if u have it)</code> in <code>esc_ascendas_hb/ahb_backend</code> to start the backend server.</li>
    </ol>
   
<h1>Backend</h1>
<h2>Express</h2>

<h3>Feature-4 Guide <h3>
    
Follow the steps above to start the server! 
    <h4>Backend:</h4>
    <ol>
  <li><code>node index.js (or nodemon if u have it)</code> in <code>esc_ascendas_hb/ahb_backend</code> to start the backend server.</li>
   <li>In the backend server ensure, you have installed mongoose database.</li>
    <li>Mongoose Atlas (cloud-based mongoose) uses my private key, so do message me if you want to access the database itself, I'll pass you my credientials</li>
    </ol>
  <h4>Frontend:</h4>
    <ol>
  <li><code>Before starting ensure you have bootstrap installed along with <code>react-credit-cards</code> and then <code>npm start</code></li>
   <li>In the frontend server, we are left with the props from feature 3</li>
    <li>We need to create a dynamic button for guest names limited by the guest number props</li>
     <li>We need create a navigation button to go back (integrate)</li>
      <li>Form details and validation is performed- except for checking expire date, although date format is validated</li>
      <li>We generally need to improve ui of the form</li>
    </ol>
  

 
    
