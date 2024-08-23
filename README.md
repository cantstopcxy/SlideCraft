### The Frontend

Navigate to the `frontend` folder and run `npm install` to install all of the dependencies necessary to run the ReactJS app. Then run `npm start` to start the ReactJS app.


### The Backend

After you clone this repo, you must run `npm install` in `backend` directory once.

To run the backend server, simply run `npm start` in the `backend` directory. This will start the backend.

To view the API interface for the backend you can navigate to the base URL of the backend (e.g. `http://localhost:5005`). This will list all of the HTTP routes that you can interact with.

Your backend is persistent in terms of data storage. That means the data will remain even after your express server process stops running. If you want to reset the data in the backend to the original starting state, you can run `npm run reset` in the backend directory. If you want to make a copy of the backend data (e.g. for a backup) then simply copy `database.json`. If you want to start with an empty database, you can run `npm run clear` in the backend directory.

Once the backend has started, you can view the API documentation by navigating to `http://localhost:[port]` in a web browser.

The port that the backend runs on (and that the frontend can use) is specified in `frontend/src/config.js`. You can change the port in this file. This file exists so that your frontend knows what port to use when talking to the backend.


### Feature Set 1. Login & presentation Creation

This feature set focuses on the ability to register, login, and logout.

#### 1.1. Login Screen
 * A unique route exists for this screen
 * If the form submission fails when you tried to login, an error message will be shown
 * The login form can be able to be submitted on enter key, pressing enter key to login should be an alternative option along with clicking a button
 * Successfully login will take you to the dashboard screen

#### 1.2. Register Screen
 * A unique route exists for this screen
 * If the form submission fails when user tried to register, a reasonable error message should be shown
 * The register form can be able to be submitted on enter key, pressing enter key to register should be an alternative option along with clicking a button
 * Successfully register will take user to the dashboard screen

#### 1.3. Logout Button
 * On all screens that require an authorised user, a logout button exists.
 * This logout button, when clicked, returns you to the login screen.


### Feature Set 2. Setting up slides

#### 2.1. New presentation on Dashboard

* When logged in, users should be presented with a dashboard that contains a button, only visible on the dashboard, called "New presentation".
* When this button is pressed, a modal appears, where you can enter the name of a new presentation
* This modal contains a "Create" button for user to click and create presentation. The modal will disappear after user clicked "Create" button, a new presentation is created and appears on the dashboard. A default presentation contains a single empty slide.

#### 2.2. List of presentations on Dashboard 

* On the dashboard, the card for each presentation is shown.
* Each rectangle includes the name, a thumbnail, a description and the number of slides it contains

#### 2.3. Basics of a presentation controls

* When a particular presentation on the dashboard is clicked, the user will be taken to a new unique route that is parameterised by the presentation ID, which always loads the first slide in the slideshow deck. This route is for editing a specific presentation, users can add/delete/edit(Info on this later) slides in this presentation within this page.
* When on this edit presentation page, Two key controls should always be visible and functional, regardless of which slide users are on:
  * "Back" that takes users back to the dashboard.
  * "Delete Presentation" which prompts "Are you sure?", where if "Yes" is clicked, the presentation is deleted and users are taken to the dashboard. If "No" is clicked, then the prompt disappears and the page remains still.

#### 2.4. Title editing

* When viewing a particular presentation, the title of the presentation should be visible at all times somewhere on or above the slideshow deck regardless of which slide users are on.
  * Somewhere near the title should have some text/icon/graphic/button that user can click to bring up a modal to edit the title of the presentation.

#### 2.5. Creating slides & moving between

* When visiting a particular slide, a button is visible off the slides that allows users to create a new slide.
* Creating a new slide will add another slide at the end of the slideshow deck.
* Once the slideshow deck has at least two slides, controls will appear at a reasonable position in the slideshow deck:
  * These controls consist of two arrows, left and right.
  * When users click on these arrows, it takes them to the next or previous slide
  * When users click the associated keyboard keys(**left key** and **right key** in this case), the same corresponding action should happen
  * If users are viewing the first slide, there should be no previous arrow
  * If users are viewing the last slide, there should be no next arrow

#### 2.6. Deleting slides

* When visiting a particular slide, a button is visible off the slide, which allows users to delete that slide.
* If a user tried to delete the only slide in the slideshow deck, an error should appear instead asking to delete the presentation.
* After current slide is deleted, will redirect user to the previous slide

#### 2.7. Slide numbers

* When viewing a particular slide, the slide number should be visible within the slide, position at the **bottom left**.

### 3. Feature Set 3. Putting Elements on a slide

* Any time when users are prompted for the "size" of an element below, size is always represented in percentage(%) as a number between 0 and 100 where:
  * For width, 100 represents the full width of the deck, 50 represents half the width, etc etc
  * For height, 100 represents the full height of the deck, 50 represents half the height, etc etc
* When any element is first added to the slide, it is always positioned at the top left corner of the slide.
* Double clicking (within 0.5 seconds) on any element in a slide will allow you to edit the initial properties(discussed in later scope) that are set when this element was created, as well as an extra property called *position* that describes where the top left of the element will appear on the slide. This property is expressed as an `x` and `y` co-ordinate between `0` and `100` (similar to what is described above).
* ordered the "layer" property of each element by having the most recent created element be higher than the previous one. This will help in situations where they are layered on top of one another.
* Each element in a slide can be deleted by right clicking anywhere within its block.

#### 3.1. Putting TEXT on the slide

* On the slideshow edit screen, for each slide, there should be an action that can add a text box to the current slide. This action can be immediately visible in a list of tools, or can be hidden away by collapsable panel.
  * When this action is clicked, a modal should appear and accept inputs from users for 
    1) The size of the text area 
    2) The text in the text area 
    3) The font size of the text in `em` as a decimal
    4) The colour the text as a [HEX color code](https://www.w3schools.com/css/css_colors_hex.asp).
  * The text is always top-down and left-aligned.
  * If any text overflows, it can simply be cut off.
* Each block have a soft grey border around the outside of it.

#### 3.2. Putting an IMAGE on the slide

* On the slideshow edit screen, for each slide, there should be an action that can add an image to the current slide. This action can be immediately visible in a list of tools, or can be hidden away by collapsable panel.
  * When this action is clicked, a modal should appear and accept inputs from users for 
    1) The size of the image area 
    2) Either the URL or a file from local system being parsed to base64 string encoding of the whole image itself 
    3) A description of the image for an `alt` tag
  
#### 3.3. Putting a VIDEO on the slide

* Somewhere on the slideshow edit screen, for each slide, there should be an action that is clearly described as adding a video to the current slide. This action can be immediately visible in a list of tools, or can be hidden away by some kind of collapsable panel.
  * When this action is clicked, a modal should appear and accept inputs from users for 
    1) The size of the video area
    2) The URL of the youtube video to display 
    3) Whether or not the video should auto-play
  
#### 3.4. Putting CODE on the slide

* On the slideshow edit screen, for each slide, there should be an action that can add a code block to the current slide. Code block is presented by a `textarea`. This action can be immediately visible in a list of tools, or can be hidden away by some kind of collapsable panel. Each code block only contains one programming language.
  * When this action is clicked, a modal should appear and accept inputs from users for 
    1) The size of the textarea
    2) The code in the textarea 
    3) The font size of the text in `em` as a decimal 
* The code entered should have whitespace preserved when displayed on screen
* The code should also be syntax highlighted appropriately to the language being chosen:
  * Valid languages are C, Python, Javascript
  * This element should be able to distinguish between different programming languages based on the input automatically

#### 3.5. Making elements movable

* For all of `2.3.1`, `2.3.2`, `2.3.3`, `2.3.4`, and `2.3.5`:
  * When you double click on a block, it no longer displays the position as an option to edit the location of the block
  * When you click on a block once, each of the 4 corners should now have a small `5px` x `5px` solid box on it, whereby:
    * If the user clicks and drags the box, they can change the position of the box (maintaining aspect ratio).
    * The block cannot have any of its corners extend beyond the edges of the slide.


### 4. Feature Set 4. Further Features

#### 4.1. Font adjustment

* For each text box on the slide, on the slideshow edit screen, the user should be able to change its `font-family`, the user can be able to choose from at least 3 different font-famlies.

#### 4.2. Theme and background picker

* There should be a button, visible on all slides, when users click on it and it brings up a modal.
* In this modal, you can specify both:
  * The current slide's background in one solid colour, or in a colour gradient; 
  * The default background solid colour or colour gradient of all slides
    * This is the colour that a slide background is set to by default instead of white.
  * When user has a current slide background, it will overwrite the default slide background

  Note: You are free to choose from different gradient directions(E.G. top to down/left to right). It's fully up to you to design a UI that allow users to choose different background options and colours

#### 4.3. Preview viewing

* Each slideshow deck should have a button somewhere (immediately visible or behind a panel) that users can click to preview the presentation
* Previewing the presentation simply opens another tab/window where:
  * The slideshow deck is visible to the full size of the screen in your browser
  * The arrow controls and slide numbers are still visible and functional, clicking on the arrows should display the previous/next slide accordingly.
  * Each block should have no border around it.

#### 4.4. URL Updating

* For both editing a slideshow deck and previewing presentation, when on a particular slide, the slide number should be reflected in the URL such that if the page is refreshed, the current user will be navigated to the same page.
