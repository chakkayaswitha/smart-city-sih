
import "./style.css";

import {
  openDesigner3D,
  closeDesigner3D,
  uploadRoomPhoto,
  changeWallColor,
  changeFloorColor,
  changeCeilingColor,
  setLighting,
  addSofa,
  addBed,
  addTable,
  addChair,
  addWardrobe,
  addBookshelf,
  addTVUnit,
  addLamp,
  addPlant,
  addDecor,
  resetDesigner,
  saveDesign
} from "./designer3d.js";


// ======================================================
// SMART CITY - MAIN FRONTEND
// ======================================================

document.querySelector("#app").innerHTML = `

<!-- ====================================================
     NAVBAR
     ==================================================== -->

<header class="navbar">
  <div class="logo">
    <span class="logo-icon">🏙️</span>
    <span>
      SMART<span class="logo-highlight">CITY</span>
    </span>
  </div>
<nav>
  <a href="#home">
      Home
    </a>

    <a href="#properties">
      Properties
    </a>

    <a href="#remodel">
      3D Remodeling
    </a>

    <a href="#planner">
      Planner
    </a>

    <a href="#contact">
      Contact
    </a>

  </nav>


  <!-- AUTH / PROFILE AREA -->

  <div
    class="nav-buttons"
    id="navButtons"
  >

    <button
      class="login-btn"
      onclick="loginUser()"
    >
      Login
    </button>

    <button
      class="signup-btn"
      onclick="signupUser()"
    >
      Sign Up
    </button>

  </div>

</header>



<!-- ====================================================
     MAIN
     ==================================================== -->

<main>


<!-- ====================================================
     HERO
     ==================================================== -->

<section
  class="hero"
  id="home"
>

  <div class="hero-content">

    <div class="badge">
      ✨ SMART LIVING • SMART PLANNING
    </div>


    <h1>
      Design Your
      <span>
        Dream Home
      </span>
    </h1>


    <p>
      Find the perfect house or apartment and
      visualize your dream remodeling in an
      interactive 3D environment.
    </p>


    <div class="hero-buttons">

      <button
        class="primary-btn"
        onclick="startPlanning()"
      >
        Start Planning →
      </button>


      <button
        class="secondary-btn"
        onclick="showProperties()"
      >
        Explore Properties
      </button>

    </div>


    <div class="stats">

      <div>
        <strong>
          500+
        </strong>

        <span>
          Properties
        </span>
      </div>


      <div>
        <strong>
          120+
        </strong>

        <span>
          3D Designs
        </span>
      </div>


      <div>
        <strong>
          98%
        </strong>

        <span>
          Happy Customers
        </span>
      </div>

    </div>

  </div>



  <div class="hero-image">

    <div class="image-card">

      <img
        src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80"
        alt="Modern smart home"
      />


      <div class="floating-card">

        <span class="check">
          ✓
        </span>

        <div>

          <strong>
            Smart Home
          </strong>

          <small>
            Ready to customize
          </small>

        </div>

      </div>

    </div>

  </div>

</section>



<!-- ====================================================
     PROPERTY TYPES
     ==================================================== -->

<section
  class="section"
  id="properties"
>

  <div class="section-heading">

    <span class="section-tag">
      01 • CHOOSE YOUR SPACE
    </span>


    <h2>
      What kind of home are
      <span>
        you looking for?
      </span>
    </h2>


    <p>
      Choose a property type and start creating
      your perfect living space.
    </p>

  </div>



  <div class="property-grid">


    <!-- HOUSE -->

    <div
      class="property-card"
      onclick="selectProperty('House')"
    >

      <div class="property-image">

        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
          alt="Modern house"
        />

      </div>


      <div class="property-content">

        <span class="property-icon">
          🏡
        </span>

        <h3>
          House
        </h3>

        <p>
          Independent homes with private spaces,
          gardens and parking.
        </p>

        <button>
          Choose House →
        </button>

      </div>

    </div>



    <!-- APARTMENT -->

    <div
      class="property-card"
      onclick="selectProperty('Apartment')"
    >

      <div class="property-image">

        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80"
          alt="Modern apartment"
        />

      </div>


      <div class="property-content">

        <span class="property-icon">
          🏢
        </span>

        <h3>
          Apartment
        </h3>

        <p>
          Modern apartments with convenient
          facilities and city views.
        </p>

        <button>
          Choose Apartment →
        </button>

      </div>

    </div>



    <!-- INDIVIDUAL -->

    <div
      class="property-card"
      onclick="selectProperty('Individual')"
    >

      <div class="property-image">

        <img
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80"
          alt="Luxury interior"
        />

      </div>


      <div class="property-content">

        <span class="property-icon">
          ✨
        </span>

        <h3>
          Individual Space
        </h3>

        <p>
          Create a personalized space based
          on your lifestyle.
        </p>

        <button>
          Choose Space →
        </button>

      </div>

    </div>

  </div>

</section>



<!-- ====================================================
     3D REMODELING
     ==================================================== -->

<section
  class="remodel-section"
  id="remodel"
>

  <div class="remodel-content">

    <span class="section-tag">
      02 • 3D REMODELING
    </span>


    <h2>
      See your ideas
      <span>
        come to life.
      </span>
    </h2>


    <p>
      Customize your home before making a decision.
      Experiment with furniture, colors, lighting
      and different room arrangements.
    </p>


    <div class="feature-list">

      <div class="feature">

        <span>
          🛋️
        </span>

        <div>

          <strong>
            Furniture
          </strong>

          <p>
            Choose furniture for every room.
          </p>

        </div>

      </div>


      <div class="feature">

        <span>
          🎨
        </span>

        <div>

          <strong>
            Painting
          </strong>

          <p>
            Experiment with different colors.
          </p>

        </div>

      </div>


      <div class="feature">

        <span>
          💡
        </span>

        <div>

          <strong>
            Lighting
          </strong>

          <p>
            Create natural, warm or cool lighting.
          </p>

        </div>

      </div>


      <div class="feature">

        <span>
          🌳
        </span>

        <div>

          <strong>
            Smart Spaces
          </strong>

          <p>
            Plan your space according to your needs.
          </p>

        </div>

      </div>

    </div>


    <button
      class="primary-btn"
      onclick="open3D()"
    >
      Open 3D Designer →
    </button>

  </div>



  <div class="three-d-preview">

    <div class="room">

      <div class="room-wall"></div>

      <div class="room-floor"></div>


      <div class="window">

        <div></div>
        <div></div>
        <div></div>
        <div></div>

      </div>


      <div class="sofa">

        <div class="sofa-back"></div>
        <div class="sofa-seat"></div>

        <div class="sofa-arm left"></div>
        <div class="sofa-arm right"></div>

      </div>


      <div class="table"></div>


      <div class="plant">
        🌿
      </div>

    </div>


    <div class="three-d-label">

      <span>
        ●
      </span>

      LIVE 3D PREVIEW

    </div>

  </div>

</section>



<!-- ====================================================
     HOME PLANNER
     ==================================================== -->

<section
  class="planner-section"
  id="planner"
>

  <div class="section-heading">

    <span class="section-tag">
      03 • HOME PLANNER
    </span>


    <h2>
      Tell us what your
      <span>
        dream home needs.
      </span>
    </h2>


    <p>
      Select your requirements and we'll find
      suitable properties for you.
    </p>

  </div>



  <div class="planner-box">


    <!-- PROPERTY TYPE -->

    <div class="planner-step">

      <h3>
        Property Type
      </h3>


      <div class="option-grid">

        <label class="option">

          <input
            type="radio"
            name="property"
            value="House"
          />

          <span>
            🏡
          </span>

          House

        </label>


        <label class="option">

          <input
            type="radio"
            name="property"
            value="Apartment"
          />

          <span>
            🏢
          </span>

          Apartment

        </label>

      </div>

    </div>



    <!-- PURPOSE -->

    <div class="planner-step">

      <h3>
        Looking to
      </h3>


      <div class="option-grid">

        <label class="option">

          <input
            type="radio"
            name="purpose"
            value="Rent"
          />

          <span>
            🔑
          </span>

          Rent

        </label>


        <label class="option">

          <input
            type="radio"
            name="purpose"
            value="Own"
          />

          <span>
            🏠
          </span>

          Own

        </label>

      </div>

    </div>



    <!-- FEATURES -->

    <div class="planner-step">

      <h3>
        What do you need?
      </h3>


      <div class="checkbox-grid">

        <label>
          <input
            type="checkbox"
            name="feature"
            value="Water"
          />
          💧 Water
        </label>


        <label>
          <input
            type="checkbox"
            name="feature"
            value="Grocery"
          />
          🛒 Grocery nearby
        </label>


        <label>
          <input
            type="checkbox"
            name="feature"
            value="Electricity"
          />
          ⚡ Electricity
        </label>


        <label>
          <input
            type="checkbox"
            name="feature"
            value="Parking"
          />
          🚗 Parking
        </label>


        <label>
          <input
            type="checkbox"
            name="feature"
            value="Garden"
          />
          🌳 Garden
        </label>


        <label>
          <input
            type="checkbox"
            name="feature"
            value="Balcony"
          />
          🌇 Balcony
        </label>


        <label>
          <input
            type="checkbox"
            name="feature"
            value="Terrace"
          />
          🏙️ Terrace
        </label>


        <label>
          <input
            type="checkbox"
            name="feature"
            value="Pet"
          />
          🐕 Pet friendly
        </label>

      </div>

    </div>



    <div class="planner-submit">

      <button
        class="submit-btn"
        onclick="findHomes()"
      >
        Find My Perfect Home →
      </button>

    </div>

  </div>

</section>



<!-- ====================================================
     RESULTS
     ==================================================== -->

<section
  class="results-section"
  id="results"
>

  <div class="section-heading">

    <span class="section-tag">
      04 • MATCHING PROPERTIES
    </span>


    <h2>
      Homes selected
      <span>
        for you.
      </span>
    </h2>


    <p id="result-message">
      Submit your requirements to see
      available properties.
    </p>

  </div>


  <div
    class="results-grid"
    id="resultsGrid"
  ></div>

</section>



<!-- ====================================================
     CONTACT
     ==================================================== -->

<section
  class="contact-section"
  id="contact"
>

  <div>

    <span class="section-tag">
      SMART CITY
    </span>


    <h2>
      Build a home that
      <span>
        feels like you.
      </span>
    </h2>


    <p>
      Smart planning.
      Better living.
      A smarter future.
    </p>

  </div>


  <button
    class="primary-btn"
    onclick="startPlanning()"
  >
    Start Planning →
  </button>

</section>

</main>



<!-- ====================================================
     FOOTER
     ==================================================== -->

<footer>

  <div class="footer-logo">
    🏙️ SMARTCITY
  </div>

  <p>
    © 2026 Smart City.
    Smart homes, smarter living.
  </p>

</footer>



<!-- ====================================================
     3D DESIGNER
     ==================================================== -->

<div
  id="designer3d"
  class="designer3d"
>

  <div class="designer3d-box">

    <div class="designer3d-header">

      <div>

        <span class="section-tag">
          SMART CITY • 3D DESIGNER
        </span>


        <h2>
          Design Your
          <span>
            Dream Room
          </span>
        </h2>

      </div>


      <button
        class="designer-close"
        onclick="closeDesigner3D()"
      >
        ✕
      </button>

    </div>



    <div class="designer3d-content">


      <!-- CONTROLS -->

      <div class="designer-controls">

        <h3>
          Customize Your Space
        </h3>


        <!-- PHOTO -->

        <div class="designer-control">

          <label>
            📷 Upload Room Photo
          </label>


          <input
            type="file"
            id="roomPhotoInput"
            accept="image/*"
            onchange="handleRoomUpload(event)"
          />


          <img
            id="uploadedPhotoPreview"
            class="uploaded-photo-preview"
            alt="Uploaded room"
          />

        </div>



        <!-- COLORS -->

        <div class="designer-section">

          <h3>
            🎨 Room Customization
          </h3>


          <label class="designer-label">
            Wall Color
          </label>


          <input
            type="color"
            value="#e8e2d8"
            onchange="set3DWallColor(this.value)"
          />


          <label class="designer-label">
            Ground / Floor Color
          </label>


          <input
            type="color"
            value="#b89d7c"
            onchange="set3DFloorColor(this.value)"
          />


          <label class="designer-label">
            Top / Ceiling Color
          </label>


          <input
            type="color"
            value="#ffffff"
            onchange="set3DCeilingColor(this.value)"
          />

        </div>



        <!-- FURNITURE -->

        <div class="designer-section">

          <h3>
            🛋️ Furniture
          </h3>


          <div class="designer-furniture-grid">


            <button
              class="designer-action"
              onclick="addSofa()"
            >
              🛋️ Sofa
            </button>


            <button
              class="designer-action"
              onclick="addBed()"
            >
              🛏️ Bed
            </button>


            <button
              class="designer-action"
              onclick="addTable()"
            >
              🪑 Table
            </button>


            <button
              class="designer-action"
              onclick="addChair()"
            >
              🪑 Chair
            </button>


            <button
              class="designer-action"
              onclick="addWardrobe()"
            >
              🚪 Wardrobe
            </button>


            <button
              class="designer-action"
              onclick="addBookshelf()"
            >
              📚 Bookshelf
            </button>


            <button
              class="designer-action"
              onclick="addTVUnit()"
            >
              📺 TV Unit
            </button>


            <button
              class="designer-action"
              onclick="addLamp()"
            >
              💡 Lamp
            </button>


            <button
              class="designer-action"
              onclick="addPlant()"
            >
              🪴 Plant
            </button>


            <button
              class="designer-action"
              onclick="addDecor()"
            >
              🏺 Decor
            </button>

          </div>

        </div>



        <!-- LIGHTING -->

        <div class="designer-section">

          <h3>
            💡 Lighting
          </h3>


          <div class="designer-furniture-grid">


            <button
              class="designer-action"
              onclick="set3DLighting('natural')"
            >
              ☀️ Natural
            </button>


            <button
              class="designer-action"
              onclick="set3DLighting('warm')"
            >
              🔆 Warm
            </button>


            <button
              class="designer-action"
              onclick="set3DLighting('white')"
            >
              💡 White
            </button>


            <button
              class="designer-action"
              onclick="set3DLighting('cool')"
            >
              ❄️ Cool
            </button>

          </div>

        </div>


        <button
          class="designer-reset"
          onclick="resetDesigner()"
        >
          🔄 Reset Design
        </button>


        <button
          class="designer-save"
          onclick="saveDesign()"
        >
          💾 Save 3D Design
        </button>

      </div>



      <!-- 3D VIEW -->

      <div class="designer-view">

        <canvas
          id="designerCanvas"
        ></canvas>


        <div class="designer-help">

          🖱️ Drag = Rotate
          <br>

          🔍 Scroll = Zoom
          <br>

          🖱️ Right Drag = Pan

        </div>

      </div>

    </div>

  </div>

</div>



<!-- ====================================================
     LOGIN / SIGNUP MODAL
     ==================================================== -->

<div
  id="authModal"
  class="auth-modal"
>

  <div class="auth-box">


    <!-- CLOSE -->

    <button
      class="auth-close"
      onclick="closeAuthModal()"
    >
      ✕
    </button>



    <!-- =================================================
         LOGIN
         ================================================= -->

    <div
      id="loginForm"
      class="auth-form"
    >

      <div class="auth-icon">
        🏙️
      </div>


      <h2>
        Welcome Back
      </h2>


      <p class="auth-subtitle">
        Login to continue your
        Smart City journey.
      </p>


      <div class="auth-input-group">

        <label>
          Email Address
        </label>


        <input
          type="email"
          id="loginEmail"
          placeholder="Enter your email"
        />

      </div>


      <div class="auth-input-group">

        <label>
          Password
        </label>


        <input
          type="password"
          id="loginPassword"
          placeholder="Enter your password"
        />

      </div>


      <div class="auth-options">

        <label>

          <input
            type="checkbox"
            id="rememberMe"
          />

          Remember me

        </label>


        <button
          class="forgot-btn"
          onclick="forgotPassword()"
        >
          Forgot Password?
        </button>

      </div>


      <button
        class="auth-submit"
        onclick="submitLogin()"
      >
        Login →
      </button>


      <p class="auth-switch">

        Don't have an account?

        <button
          onclick="showSignupForm()"
        >
          Create Account
        </button>

      </p>

    </div>



    <!-- =================================================
         SIGN UP
         ================================================= -->

    <div
      id="signupForm"
      class="auth-form"
      style="display:none;"
    >

      <div class="auth-icon">
        ✨
      </div>


      <h2>
        Create Your Account
      </h2>


      <p class="auth-subtitle">
        Join Smart City and design
        your dream home.
      </p>


      <div class="auth-input-group">

        <label>
          Full Name
        </label>


        <input
          type="text"
          id="signupName"
          placeholder="Enter your full name"
        />

      </div>


      <div class="auth-input-group">

        <label>
          Email Address
        </label>


        <input
          type="email"
          id="signupEmail"
          placeholder="Enter your email"
        />

      </div>


      <div class="auth-input-group">

        <label>
          Phone Number
        </label>


        <input
          type="tel"
          id="signupPhone"
          placeholder="Enter your phone number"
        />

      </div>


      <div class="auth-input-group">

        <label>
          Password
        </label>


        <input
          type="password"
          id="signupPassword"
          placeholder="Create a password"
        />

      </div>


      <div class="auth-input-group">

        <label>
          Confirm Password
        </label>


        <input
          type="password"
          id="signupConfirmPassword"
          placeholder="Confirm your password"
        />

      </div>


      <label class="terms-check">

        <input
          type="checkbox"
          id="termsCheck"
        />

        I agree to the Smart City
        Terms & Conditions.

      </label>


      <button
        class="auth-submit"
        onclick="submitSignup()"
      >
        Create Account →
      </button>


      <p class="auth-switch">

        Already have an account?

        <button
          onclick="showLoginForm()"
        >
          Login
        </button>

      </p>

    </div>

  </div>

</div>



<!-- ====================================================
     PROFILE MODAL
     ==================================================== -->

<div
  id="profileModal"
  class="profile-modal"
>

  <div class="profile-box">


    <button
      class="profile-close"
      onclick="closeProfile()"
    >
      ✕
    </button>


    <div class="profile-icon">
      👤
    </div>


    <h2>
      My Profile
    </h2>


    <p class="profile-welcome">
      Welcome to Smart City!
    </p>


    <div class="profile-details">


      <div class="profile-detail">

        <span>
          👤
        </span>

        <div>

          <small>
            Full Name
          </small>

          <strong id="profileName">
            -
          </strong>

        </div>

      </div>



      <div class="profile-detail">

        <span>
          📧
        </span>

        <div>

          <small>
            Email Address
          </small>

          <strong id="profileEmail">
            -
          </strong>

        </div>

      </div>



      <div class="profile-detail">

        <span>
          📱
        </span>

        <div>

          <small>
            Phone Number
          </small>

          <strong id="profilePhone">
            -
          </strong>

        </div>

      </div>


    </div>


    <button
      class="profile-done-btn"
      onclick="closeProfile()"
    >
      Done
    </button>

  </div>

</div>

`;



// ======================================================
// NAVIGATION
// ======================================================

function startPlanning() {

  document
    .querySelector("#planner")
    .scrollIntoView({
      behavior: "smooth"
    });

}


function showProperties() {

  document
    .querySelector("#properties")
    .scrollIntoView({
      behavior: "smooth"
    });

}


function selectProperty(type) {

  const radio =
    document.querySelector(
      `input[name="property"][value="${type}"]`
    );

  if (radio) {

    radio.checked = true;

  }

  startPlanning();

}



// ======================================================
// 3D DESIGNER
// ======================================================

function open3D() {

  openDesigner3D();

}


function handleRoomUpload(event) {

  const file =
    event.target.files[0];

  if (!file) {

    return;

  }

  uploadRoomPhoto(file);

}


function set3DWallColor(color) {

  changeWallColor(color);

}


function set3DFloorColor(color) {

  changeFloorColor(color);

}


function set3DCeilingColor(color) {

  changeCeilingColor(color);

}


function set3DLighting(type) {

  setLighting(type);

}



// ======================================================
// LOGIN
// ======================================================

function loginUser() {

  const modal =
    document.querySelector("#authModal");

  const loginForm =
    document.querySelector("#loginForm");

  const signupForm =
    document.querySelector("#signupForm");


  if (!modal) {

    return;

  }


  modal.classList.add("active");

  loginForm.style.display =
    "block";

  signupForm.style.display =
    "none";

}



// ======================================================
// SIGN UP
// ======================================================

function signupUser() {

  const modal =
    document.querySelector("#authModal");

  const loginForm =
    document.querySelector("#loginForm");

  const signupForm =
    document.querySelector("#signupForm");


  if (!modal) {

    return;

  }


  modal.classList.add("active");

  loginForm.style.display =
    "none";

  signupForm.style.display =
    "block";

}



// ======================================================
// SHOW LOGIN
// ======================================================

function showLoginForm() {

  document.querySelector(
    "#loginForm"
  ).style.display = "block";


  document.querySelector(
    "#signupForm"
  ).style.display = "none";

}



// ======================================================
// SHOW SIGN UP
// ======================================================

function showSignupForm() {

  document.querySelector(
    "#loginForm"
  ).style.display = "none";


  document.querySelector(
    "#signupForm"
  ).style.display = "block";

}



// ======================================================
// CLOSE AUTH
// ======================================================

function closeAuthModal() {

  const modal =
    document.querySelector("#authModal");

  if (modal) {

    modal.classList.remove("active");

  }

}



// ======================================================
// SUBMIT LOGIN
// ======================================================

function submitLogin() {

  const email =
    document
      .querySelector("#loginEmail")
      .value
      .trim()
      .toLowerCase();


  const password =
    document
      .querySelector("#loginPassword")
      .value;


  // -------------------------------
  // VALIDATION
  // -------------------------------

  if (!email) {

    alert(
      "Please enter your email address."
    );

    return;

  }


  if (!email.includes("@")) {

    alert(
      "Please enter a valid email address."
    );

    return;

  }


  if (!password) {

    alert(
      "Please enter your password."
    );

    return;

  }



  // -------------------------------
  // GET REGISTERED USER
  // -------------------------------

  const savedUser =
    localStorage.getItem(
      "smartCityUser"
    );


  if (!savedUser) {

    alert(
      "No account found.\n\nPlease create an account first."
    );

    return;

  }


  let user;


  try {

    user =
      JSON.parse(savedUser);

  }

  catch (error) {

    alert(
      "User data is corrupted. Please sign up again."
    );

    localStorage.removeItem(
      "smartCityUser"
    );

    return;

  }



  // -------------------------------
  // CHECK EMAIL
  // -------------------------------

  if (
    user.email.toLowerCase() !== email
  ) {

    alert(
      "Incorrect email address."
    );

    return;

  }



  // -------------------------------
  // CHECK PASSWORD
  // -------------------------------

  if (
    user.password !== password
  ) {

    alert(
      "Incorrect password."
    );

    return;

  }



  // -------------------------------
  // LOGIN SUCCESS
  // -------------------------------

  localStorage.setItem(
    "smartCityLoggedIn",
    "true"
  );


  closeAuthModal();


  updateNavbar();


  alert(
    `Welcome back, ${user.name}!`
  );


  // Clear login fields

  document.querySelector(
    "#loginPassword"
  ).value = "";

}



// ======================================================
// SUBMIT SIGN UP
// ======================================================

function submitSignup() {

  const name =
    document
      .querySelector("#signupName")
      .value
      .trim();


  const email =
    document
      .querySelector("#signupEmail")
      .value
      .trim()
      .toLowerCase();


  const phone =
    document
      .querySelector("#signupPhone")
      .value
      .trim();


  const password =
    document
      .querySelector("#signupPassword")
      .value;


  const confirmPassword =
    document
      .querySelector("#signupConfirmPassword")
      .value;


  const terms =
    document
      .querySelector("#termsCheck")
      .checked;



  // -------------------------------
  // VALIDATION
  // -------------------------------

  if (!name) {

    alert(
      "Please enter your full name."
    );

    return;

  }


  if (!email) {

    alert(
      "Please enter your email address."
    );

    return;

  }


  if (!email.includes("@")) {

    alert(
      "Please enter a valid email address."
    );

    return;

  }


  if (!phone) {

    alert(
      "Please enter your phone number."
    );

    return;

  }


  if (!password) {

    alert(
      "Please create a password."
    );

    return;

  }


  if (password.length < 6) {

    alert(
      "Password must contain at least 6 characters."
    );

    return;

  }


  if (
    password !== confirmPassword
  ) {

    alert(
      "Passwords do not match."
    );

    return;

  }


  if (!terms) {

    alert(
      "Please accept the Terms & Conditions."
    );

    return;

  }



  // -------------------------------
  // CREATE USER OBJECT
  // -------------------------------

  const user = {

    name: name,

    email: email,

    phone: phone,

    password: password

  };



  // -------------------------------
  // SAVE USER
  // -------------------------------

  localStorage.setItem(
    "smartCityUser",
    JSON.stringify(user)
  );


  // -------------------------------
  // LOGIN USER AUTOMATICALLY
  // -------------------------------

  localStorage.setItem(
    "smartCityLoggedIn",
    "true"
  );


  // -------------------------------
  // CLOSE MODAL
  // -------------------------------

  closeAuthModal();


  // -------------------------------
  // UPDATE NAVBAR
  // -------------------------------

  updateNavbar();


  // -------------------------------
  // SUCCESS MESSAGE
  // -------------------------------

  alert(
    `Account created successfully!\n\nWelcome ${name}!`
  );


  // Clear signup form

  document.querySelector(
    "#signupName"
  ).value = "";

  document.querySelector(
    "#signupEmail"
  ).value = "";

  document.querySelector(
    "#signupPhone"
  ).value = "";

  document.querySelector(
    "#signupPassword"
  ).value = "";

  document.querySelector(
    "#signupConfirmPassword"
  ).value = "";

  document.querySelector(
    "#termsCheck"
  ).checked = false;

}



// ======================================================
// FORGOT PASSWORD
// ======================================================

function forgotPassword() {

  const email =
    document
      .querySelector("#loginEmail")
      .value
      .trim();


  if (!email) {

    alert(
      "Please enter your email address first."
    );

    return;

  }


  alert(
    `Password reset instructions will be sent to:\n${email}`
  );

}



// ======================================================
// UPDATE NAVBAR
// ======================================================

function updateNavbar() {

  const navButtons =
    document.querySelector(
      "#navButtons"
    );


  if (!navButtons) {

    return;

  }


  const isLoggedIn =
    localStorage.getItem(
      "smartCityLoggedIn"
    ) === "true";


  const savedUser =
    localStorage.getItem(
      "smartCityUser"
    );


  let user = null;


  if (savedUser) {

    try {

      user =
        JSON.parse(savedUser);

    }

    catch (error) {

      user = null;

    }

  }



  // --------------------------------
  // USER LOGGED IN
  // --------------------------------

  if (
    isLoggedIn &&
    user
  ) {

    navButtons.innerHTML = `

      <div class="logged-user-area">

        <span class="welcome-user">
          Hi, ${escapeHTML(user.name)}
        </span>


        <button
          class="profile-btn"
          onclick="showProfile()"
        >
          👤 Profile
        </button>


        <button
          class="logout-btn"
          onclick="logoutUser()"
        >
          Logout
        </button>

      </div>

    `;

    return;

  }



  // --------------------------------
  // USER NOT LOGGED IN
  // --------------------------------

  navButtons.innerHTML = `

    <button
      class="login-btn"
      onclick="loginUser()"
    >
      Login
    </button>


    <button
      class="signup-btn"
      onclick="signupUser()"
    >
      Sign Up
    </button>

  `;

}



// ======================================================
// SHOW PROFILE
// ======================================================

function showProfile() {

  const modal =
    document.querySelector(
      "#profileModal"
    );


  const savedUser =
    localStorage.getItem(
      "smartCityUser"
    );


  if (!savedUser) {

    alert(
      "Please login first."
    );

    return;

  }


  let user;


  try {

    user =
      JSON.parse(savedUser);

  }

  catch (error) {

    alert(
      "Unable to load profile."
    );

    return;

  }



  // Fill profile information

  document.querySelector(
    "#profileName"
  ).textContent =
    user.name || "-";


  document.querySelector(
    "#profileEmail"
  ).textContent =
    user.email || "-";


  document.querySelector(
    "#profilePhone"
  ).textContent =
    user.phone || "-";



  modal.classList.add(
    "active"
  );

}



// ======================================================
// CLOSE PROFILE
// ======================================================

function closeProfile() {

  const modal =
    document.querySelector(
      "#profileModal"
    );


  if (modal) {

    modal.classList.remove(
      "active"
    );

  }

}



// ======================================================
// LOGOUT
// ======================================================

function logoutUser() {

  const confirmLogout =
    confirm(
      "Are you sure you want to logout?"
    );


  if (!confirmLogout) {

    return;

  }


  localStorage.setItem(
    "smartCityLoggedIn",
    "false"
  );


  closeProfile();


  updateNavbar();


  alert(
    "You have been logged out successfully."
  );

}



// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(value) {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}



// ======================================================
// FIND HOMES
// ======================================================

async function findHomes() {

  console.log(
    "FIND HOMES BUTTON CLICKED"
  );


  const property =
    document.querySelector(
      'input[name="property"]:checked'
    );


  const purpose =
    document.querySelector(
      'input[name="purpose"]:checked'
    );


  const selectedFeatures =
    Array.from(
      document.querySelectorAll(
        'input[name="feature"]:checked'
      )
    )
    .map(
      checkbox =>
        checkbox.value
    );



  // -------------------------------
  // VALIDATION
  // -------------------------------

  if (!property) {

    alert(
      "Please select House or Apartment."
    );

    return;

  }


  if (!purpose) {

    alert(
      "Please select Rent or Own."
    );

    return;

  }



  const resultsSection =
    document.querySelector(
      "#results"
    );


  const resultsGrid =
    document.querySelector(
      "#resultsGrid"
    );


  const message =
    document.querySelector(
      "#result-message"
    );


  resultsSection.classList.add(
    "visible"
  );


  message.textContent =
    "Finding the best properties for you...";


  resultsGrid.innerHTML = `

    <div class="no-results">

      <div>
        🔎
      </div>

      <h3>
        Searching properties...
      </h3>

      <p>
        Please wait while we find suitable homes.
      </p>

    </div>

  `;


  resultsSection.scrollIntoView({
    behavior: "smooth"
  });



  // -------------------------------
  // BACKEND
  // -------------------------------

  try {

    const response =
      await fetch(
        "https://smart-city-backend-97sd.onrender.com/api/houses/search",
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify({

              type:
                property.value,

              purpose:
                purpose.value,

              features:
                selectedFeatures

            })

        }
      );


    if (!response.ok) {

      throw new Error(
        `Backend returned status ${response.status}`
      );

    }


    const data =
      await response.json();


    console.log(
      "Backend response:",
      data
    );



    // -------------------------------
    // NORMALIZE RESPONSE
    // -------------------------------

    let houses = [];


    if (
      Array.isArray(data)
    ) {

      houses = data;

    }

    else if (
      data &&
      Array.isArray(data.houses)
    ) {

      houses =
        data.houses;

    }

    else if (
      data &&
      Array.isArray(data.results)
    ) {

      houses =
        data.results;

    }

    else if (
      data &&
      Array.isArray(data.data)
    ) {

      houses =
        data.data;

    }


    console.log(
      "Properties found:",
      houses.length
    );


    displayResults(
      houses,
      property.value,
      purpose.value,
      selectedFeatures
    );

  }


  catch (error) {

    console.error(
      "Backend error:",
      error
    );


    message.textContent =
      "Unable to load properties.";


    resultsGrid.innerHTML = `

      <div class="no-results">

        <div>
          ⚠️
        </div>

        <h3>
          Something went wrong
        </h3>

        <p>
          We could not load the property data.
        </p>

        <p>
          Make sure your backend is running.
        </p>

      </div>

    `;

  }

}



// ======================================================
// DISPLAY RESULTS
// ======================================================

function displayResults(
  houses,
  propertyType,
  purpose,
  selectedFeatures
) {

  const resultsSection =
    document.querySelector(
      "#results"
    );


  const resultsGrid =
    document.querySelector(
      "#resultsGrid"
    );


  const message =
    document.querySelector(
      "#result-message"
    );


  resultsSection.classList.add(
    "visible"
  );



  // -------------------------------
  // INVALID DATA
  // -------------------------------

  if (
    !Array.isArray(houses)
  ) {

    message.textContent =
      "Unable to load properties.";


    resultsGrid.innerHTML = `

      <div class="no-results">

        <div>
          ⚠️
        </div>

        <h3>
          Property data error
        </h3>

        <p>
          The backend did not return
          a valid property list.
        </p>

      </div>

    `;

    return;

  }



  // -------------------------------
  // NO RESULTS
  // -------------------------------

  if (
    houses.length === 0
  ) {

    message.textContent =
      `No ${propertyType} properties found for ${purpose}.`;


    resultsGrid.innerHTML = `

      <div class="no-results">

        <div>
          🔍
        </div>

        <h3>
          No matching properties
        </h3>

        <p>
          Try selecting fewer requirements
          or another property type.
        </p>

      </div>

    `;

    return;

  }



  message.textContent =
    `${houses.length} ${propertyType.toLowerCase()} option(s) available for ${purpose.toLowerCase()}.`;



  // -------------------------------
  // CREATE PROPERTY CARDS
  // -------------------------------

  resultsGrid.innerHTML =
    houses
      .map(
        house => {


          // -------------------------
          // FEATURES
          // -------------------------

          const houseFeatures = [];


          if (
            house.parking === true
          ) {

            houseFeatures.push(
              "🚗 Parking"
            );

          }


          if (
            house.garden === true
          ) {

            houseFeatures.push(
              "🌳 Garden"
            );

          }


          if (
            house.balcony === true
          ) {

            houseFeatures.push(
              "🌿 Balcony"
            );

          }


          if (
            house.terrace === true
          ) {

            houseFeatures.push(
              "🏡 Terrace"
            );

          }


          if (
            house.petFriendly === true
          ) {

            houseFeatures.push(
              "🐶 Pet Friendly"
            );

          }


          if (
            house.remodeling === true
          ) {

            houseFeatures.push(
              "🛠 Remodeling"
            );

          }



          const featureHTML =
            houseFeatures.length

              ? houseFeatures

                  .map(
                    feature => `

                      <span class="feature-tag">
                        ${feature}
                      </span>

                    `
                  )

                  .join("")

              : `

                  <span class="feature-tag">
                    Smart Living
                  </span>

                `;



          // -------------------------
          // PRICE
          // -------------------------

          let priceText;


          if (
            purpose === "Rent"
          ) {

            priceText =
              `₹${Number(
                house.rent || 0
              ).toLocaleString("en-IN")}/month`;

          }

          else {

            priceText =
              `₹${Number(
                house.price || 0
              ).toLocaleString("en-IN")}`;

          }



          // -------------------------
          // DETAILS
          // -------------------------

          const image =
            house.image ||

            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80";


          const name =
            house.name ||
            "Smart Home";


          const location =
            house.location ||
            "Hyderabad";


          const bedrooms =
            house.bedrooms ?? 0;


          const bathrooms =
            house.bathrooms ?? 0;


          const familySize =
            house.familySize ?? 0;



          // -------------------------
          // CARD
          // -------------------------

          return `

            <article
              class="property-card result-card"
            >

              <div class="property-image">

                <img
                  src="${image}"
                  alt="${escapeHTML(name)}"

                  onerror="
                    this.src='https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80'
                  "
                />


                <span class="match-badge">
                  ✓ MATCHED FOR YOU
                </span>

              </div>


              <div class="property-info">

                <h3>
                  ${escapeHTML(name)}
                </h3>


                <p class="property-location">
                  📍 ${escapeHTML(location)}
                </p>


                <p class="property-price">
                  ${priceText}
                </p>


                <div class="property-stats">

                  <span>
                    🛏 ${bedrooms} Bedrooms
                  </span>

                  <span>
                    🚿 ${bathrooms} Bathrooms
                  </span>

                  <span>
                    👨‍👩‍👧‍👦 Family ${familySize}
                  </span>

                </div>


                <div class="property-features">

                  ${featureHTML}

                </div>


                <button
                  class="btn-primary"
                  onclick="viewHome('${escapeQuotes(name)}')"
                >
                  View Property →
                </button>

              </div>

            </article>

          `;

        }
      )
      .join("");

}



// ======================================================
// ESCAPE PROPERTY NAME
// ======================================================

function escapeQuotes(text) {

  return String(text)

    .replace(
      /\\/g,
      "\\\\"
    )

    .replace(
      /'/g,
      "\\'"
    );

}



// ======================================================
// VIEW PROPERTY
// ======================================================

function viewHome(name) {

  alert(
    `Welcome to ${name}!\n\nProperty details and 3D viewing will be available here.`
  );

}



// ======================================================
// MAKE FUNCTIONS AVAILABLE TO HTML
// ======================================================


// ---------------- PLANNER ----------------

window.findHomes =
  findHomes;


window.startPlanning =
  startPlanning;


window.showProperties =
  showProperties;


window.selectProperty =
  selectProperty;



// ---------------- 3D ----------------

window.open3D =
  open3D;


window.closeDesigner3D =
  closeDesigner3D;


window.handleRoomUpload =
  handleRoomUpload;



// ---------------- COLORS ----------------

window.set3DWallColor =
  set3DWallColor;


window.set3DFloorColor =
  set3DFloorColor;


window.set3DCeilingColor =
  set3DCeilingColor;



// ---------------- LIGHTING ----------------

window.set3DLighting =
  set3DLighting;



// ---------------- FURNITURE ----------------

window.addSofa =
  addSofa;


window.addBed =
  addBed;


window.addTable =
  addTable;


window.addChair =
  addChair;


window.addWardrobe =
  addWardrobe;


window.addBookshelf =
  addBookshelf;


window.addTVUnit =
  addTVUnit;


window.addLamp =
  addLamp;


window.addPlant =
  addPlant;


window.addDecor =
  addDecor;



// ---------------- 3D ACTIONS ----------------

window.resetDesigner =
  resetDesigner;


window.saveDesign =
  saveDesign;



// ---------------- PROPERTY ----------------

window.viewHome =
  viewHome;



// ---------------- AUTHENTICATION ----------------

window.loginUser =
  loginUser;


window.signupUser =
  signupUser;


window.showLoginForm =
  showLoginForm;


window.showSignupForm =
  showSignupForm;


window.closeAuthModal =
  closeAuthModal;


window.submitLogin =
  submitLogin;


window.submitSignup =
  submitSignup;


window.forgotPassword =
  forgotPassword;



// ---------------- PROFILE ----------------

window.updateNavbar =
  updateNavbar;


window.showProfile =
  showProfile;


window.closeProfile =
  closeProfile;


window.logoutUser =
  logoutUser;



// ======================================================
// INITIALIZE NAVBAR
// ======================================================

updateNavbar();



// ======================================================
// CLOSE MODALS WHEN CLICKING OUTSIDE
// ======================================================

document.addEventListener(
  "click",
  function(event) {

    const authModal =
      document.querySelector(
        "#authModal"
      );


    const profileModal =
      document.querySelector(
        "#profileModal"
      );


    if (
      event.target === authModal
    ) {

      closeAuthModal();

    }


    if (
      event.target === profileModal
    ) {

      closeProfile();

    }

  }
);
