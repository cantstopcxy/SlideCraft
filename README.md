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

* When a particular presentation on the dashboard is clicked, the user should be taken to a new unique route that is parameterised by the presentation ID, which always loads the first slide in the slideshow deck. This route is for editing a specific presentation, users can add/delete/edit(Info on this later) slides in this presentation within this page.
* When on this edit presentation page, Two key controls should always be visible and functional, regardless of which slide users are on:
  * "Back" that takes users back to the dashboard.
  * "Delete Presentation" which prompts "Are you sure?", where if "Yes" is clicked, the presentation is deleted and users are taken to the dashboard. If "No" is clicked, then the prompt disappears and the page remains still.

#### 2.2.4. Title & Thumbnail editing

* When viewing a particular presentation, the title of the presentation should be visible at all times somewhere on or above the slideshow deck regardless of which slide users are on.
  * Somewhere near the title should have some text/icon/graphic/button that user can click to bring up a modal to edit the title of the presentation.

* There should be a way on presentation screen which allows user to update the thumbnail of the presentation. 

#### 2.2.5. Creating slides & moving between

* When visiting a particular slide, a button should be visible off the slides that allows users to create a new slide.
* Creating a new slide will add another slide at the end of the slideshow deck.
* Once the slideshow deck has at least two slides, controls should appear at a reasonable position in the slideshow deck:
  * These controls should be two arrows, left and right.
  * When users click on these arrows, it takes them to the next or previous slide
  * When users click the associated keyboard keys(**left key** and **right key** in this case), the same corresponding action should happen
  * If users are viewing the first slide, there should be no previous arrow
  * If users are viewing the last slide, there should be no next arrow

#### 2.2.6. Deleting slides

* When visiting a particular slide, a button should be visible off the slide, which allows users to delete that slide.
* If a user tried to delete the only slide in the slideshow deck, an error should appear instead asking to delete the presentation.

Note: The behaviour after current slide is deleted could be implemented entirely up to your design. E.G. *redirect user to the previous slide*

#### 2.2.7. Slide numbers

* When viewing a particular slide, the slide number should be visible within the slide, position at the **bottom left**. The font-size should be `1em` of any colour, and it should be visible only within a `50px` by `50px` area. When you only have one slide left, this number will just be "1".

### 2.3. Feature Set 3. Putting Elements on a slide (14%)

* Any time when users are prompted for the "size" of an element below, size is always represented in percentage(%) as a number between 0 and 100 where:
  * For width, 100 represents the full width of the deck, 50 represents half the width, etc etc
  * For height, 100 represents the full height of the deck, 50 represents half the height, etc etc
* When any element is first added to the slide, it is always positioned at the top left corner of the slide.
* Double clicking (within 0.5 seconds) on any element in a slide will allow you to edit the initial properties(discussed in later scope) that are set when this element was created, as well as an extra property called *position* that describes where the top left of the element will appear on the slide. This property is expressed as an `x` and `y` co-ordinate between `0` and `100` (similar to what is described above).
* You can order the "layer" property of each element by having the most recent created element be higher than the previous one. This will help in situations where they are layered on top of one another.
* Each element in a slide can be deleted by right clicking anywhere within its block.

#### 2.3.1. Putting TEXT on the slide

* Somewhere on the slideshow edit screen, for each slide, there should be an action that is clearly described as adding a text box to the current slide. This action can be immediately visible in a list of tools, or can be hidden away by some kind of collapsable panel.
  * When this action is clicked, a modal should appear and accept inputs from users for 
    1) The size of the text area 
    2) The text in the textarea 
    3) The font size of the text in `em` as a decimal
    4) The colour the text as a [HEX color code](https://www.w3schools.com/css/css_colors_hex.asp).
  * The text is always top-down and left-aligned.
  * If any text overflows, it can simply be cut off.
* Each block should have a soft grey border around the outside of it.

#### 2.3.2. Putting an IMAGE on the slide

* Somewhere on the slideshow edit screen, for each slide, there should be an action that is clearly described as adding an image to the current slide. This action can be immediately visible in a list of tools, or can be hidden away by some kind of collapsable panel.
  * When this action is clicked, a modal should appear and accept inputs from users for 
    1) The size of the image area 
    2) Either the URL or a file from local system being parsed to base64 string encoding of the whole image itself 
    3) A description of the image for an `alt` tag
  
#### 2.3.3. Putting a VIDEO on the slide

* Somewhere on the slideshow edit screen, for each slide, there should be an action that is clearly described as adding a video to the current slide. This action can be immediately visible in a list of tools, or can be hidden away by some kind of collapsable panel.
  * When this action is clicked, a modal should appear and accept inputs from users for 
    1) The size of the video area
    2) The URL of the youtube video to display 
    3) Whether or not the video should auto-play
  
#### 2.3.4. Putting CODE on the slide

* Somewhere on the slideshow edit screen, for each slide, there should be an action that is clearly described as adding a code block to the current slide. Code block is presented by a `textarea`. This action can be immediately visible in a list of tools, or can be hidden away by some kind of collapsable panel. Each code block only contains one programming language.
  * When this action is clicked, a modal should appear and accept inputs from users for 
    1) The size of the textarea
    2) The code in the textarea 
    3) The font size of the text in `em` as a decimal 
* The code entered should have whitespace preserved when displayed on screen
* The code should not have its `font-family` changed if you completed `2.4.1`
* The code should also be syntax highlighted appropriately to the language being chosen:
  * Valid languages are C, Python, Javascript
  * This element should be able to distinguish between different programming languages based on the input automatically

#### 2.3.5. 🙉🙉🙉 Making elements movable

* For all of `2.3.1`, `2.3.2`, `2.3.3`, `2.3.4`, and `2.3.5`, change it so that:
  * When you double click on a block, it no longer displays the position as an option to edit the location of the block
  * When you click on a block once, each of the 4 corners should now have a small `5px` x `5px` solid box on it, whereby:
    * If the user clicks and drags the box, they can change the position of the box (maintaining aspect ratio).
    * The block cannot have any of its corners extend beyond the edges of the slide.


### 2.4. Feature Set 4. Further Features

#### 2.4.1. Font adjustment

* For each text box on the slide, on the slideshow edit screen, the user should be able to change its `font-family`, the user should be able to choose from at least 3 different font-famlies.

#### 2.4.2. Theme and background picker

* There should be a button, visible on all slides, when users click on it and it brings up a modal.
* In this modal, you can specify both:
  * The current slide's background in one solid colour, or in a colour gradient; 
  * The default background solid colour or colour gradient of all slides
    * This is the colour that a slide background is set to by default instead of white.
  * When user has a current slide background, it will overwrite the default slide background

  Note: You are free to choose from different gradient directions(E.G. top to down/left to right). It's fully up to you to design a UI that allow users to choose different background options and colours

#### 2.4.3. Preview viewing

* Each slideshow deck should have a button somewhere (immediately visible or behind a panel) that users can click to preview the presentation
* Previewing the presentation simply opens another tab/window where:
  * The slideshow deck is visible to the full size of the screen in your browser
  * The arrow controls and slide numbers are still visible and functional, clicking on the arrows should display the previous/next slide accordingly.
  * Each block should have no border around it.

#### 2.4.4. URL Updating

* For both editing a slideshow deck and previewing presentation, when on a particular slide, the slide number should be reflected in the URL such that if the page is refreshed, the current user will be navigated to the same page.
 


### 3.1. The Frontend

Navigate to the `frontend` folder and run `npm install` to install all of the dependencies necessary to run the ReactJS app. Then run `npm start` to start the ReactJS app.

<!-- You will not need to do any meannigful work in the backend. However, some properties that the backend takes in are defined as blank objects. These are objects that can be defined by you, as the backend will simply store your object on some routes and then return it to you on other routes (i.e. the backend doesn't need to understand the schema of some objects you pass it). The property of interest is the `questions` component. It will appear in the backend API as an empty object, but you will need to define it.

This approach we've taken is actually designed to make the assignment _easier_, as it gives you control without having to worry about backend architecture. -->

Don't forget to check out our helpful resources about [ReactJS](https://cgi.cse.unsw.edu.au/~cs6080/NOW/help/resources/reactjs).

### 3.2. The Backend (provided)

You are prohibited from modifying the backend. No work needs to be done on the backend. It's provided to you simply to power your frontend.

The backend server exists in your individual repository. After you clone this repo, you must run `npm install` in `backend` directory once.

To run the backend server, simply run `npm start` in the `backend` directory. This will start the backend.

To view the API interface for the backend you can navigate to the base URL of the backend (e.g. `http://localhost:5005`). This will list all of the HTTP routes that you can interact with.

Your backend is persistent in terms of data storage. That means the data will remain even after your express server process stops running. If you want to reset the data in the backend to the original starting state, you can run `npm run reset` in the backend directory. If you want to make a copy of the backend data (e.g. for a backup) then simply copy `database.json`. If you want to start with an empty database, you can run `npm run clear` in the backend directory.

Once the backend has started, you can view the API documentation by navigating to `http://localhost:[port]` in a web browser.

The port that the backend runs on (and that the frontend can use) is specified in `frontend/src/config.js`. You can change the port in this file. This file exists so that your frontend knows what port to use when talking to the backend.

Please note: You **CANNOT** modify the backend for bonus marks.

## 4. Constraints & Assumptions

### 4.1. Languages

 * You must implement this assignment in ReactJS. You cannot use other declarative frameworks, such as Angular, or Vue.
 * You must use ReactJS solutions wherever possible, and avoid doing any direct DOM manipulation unless completely unavoidable (check with course staff).
 * You can use any CSS libraries and UI libraries that you would like, such as react-bootstrap or material-ui.
 * You are able to use and install any library that is available to install via `npm install`. You MUST commit `package.json` changes.

### 4.2. Browser Compatibility
 * You should ensure that your programs have been tested on one of the following two browsers:
   * Locally, Google Chrome (various operating systems) - make sure is latest version.
   * On CSE machines.

### 4.3. Using code found online
 * You may use small amounts (&lt; 10 lines) of general purpose code (not specific to the assignment) obtained from a site such as Stack Overflow or other publically available resources. You should attribute clearly the source of this code in a comment with it. You can not otherwise use code written by another person.

### 4.4. Other Requriements
 * The specification is intentionally vague to allow you to build frontend components however you think are visually appropriate. Their size, positioning, colour, layout, is in virtually all cases completely up to you. We require some basic criteria, but it's mainly dictating elements and behaviour.
 * Besides those described to avoid, you may use any other packages available on npm.
 * The use of universal CSS is **banned** - you must use either CSS libraries (E.G. material-ui) or [styled components](https://styled-components.com/docs/basics).

## 5. Teamwork

This assignment may be completed in a team of two (pair). However, you are also welcome to complete it on your own, if you choose. The groups were organised and coordinated by the course coordinator separately.

If you formed a pair, you will be unable to leave your pair unless under extreme circumstances. You will be assessed together for the assignment.

If your contributions to the assignment are not approximately equal, then the teaching staff may make discretionary calls based on your gitlab history to award different marks to each student.

<b>Please note: Your contributions will be measured based on the lines and commits contributed via gitlab. Please commit via your own machine or account.</b> If you're in a pair, your contributions will not be considered yours if it is your partner who pushes the code to gitlab.

<b>Please note: When special consideration is granted for one individual in a pair, it will only either 1) extend the deadline for the person who gets special consideration (it does not extend for the other individual); or 2) Result in a scale of the mark. To determine which outcome is appropriate, the person who receives special consideration is required to email the lecturer to notify them of how the work is split up prior to deadline.</b>

## 6. Marking Criteria

Your assignment will be hand-marked by tutor(s) in the course according to the criteria below.

<table>
  <tr>
    <th>Criteria</th>
    <th>Weighting</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Functionality of the Feature Set</td>
    <td>50%</td>
    <td>
      <ul>
        <li>Features implemented that satisfy requirements as outlined in section 2.</li>
        <li>You <b>MUST</b> update the <code>progress.csv</code> file in the root folder of this repository as you complete things partially or fully. The valid values are "NO", "PARTIAL", and "YES". Updating this is necessary so that your tutor knows what to focus on and what to avoid - giving them the best understanding of your work and provide you with marks you have earned. Failure to correctly fill in this file will result in a 5% penalty.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Responsiveness</td>
    <td>15%</td>
    <td>
      <ul>
        <li>Features implemented in a mobile responsive way that work on screens as small as 400px wide, 700px high</li>
        <li>Responsive design will contribute up to one quarter of the marks of this section</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>UI/UX</td>
    <td>10%</td>
    <td>
      <ul>
        <li>Your application is usable and easy to navigate. No obvious usability issues or confusing layouts/flows.</li>
        <li>Your application makes intelligent use of UI/UX principles and patterns discussed in the UI/UX lectures.</li>
        <li>Describe any attempts you've made to improve the UI/UX in `UIUX.md`. This section will ONLY be marked on things described in that file.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Code Style</td>
    <td>10%</td>
    <td>
      <ul>
        <li>Your code is clean, well commented, with well-named variables, and well laid out as highlighted in the course style guide.</li>
        <li>Code follows common ReactJS patterns that have been discussed in lectures and as highlighted in the course style guide.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Linted Code</td>
    <td>5%</td>
    <td>
      <ul>
        <li>Submitted code is completely `eslint` compliant based on provided eslint configuration file. There are no partial marks.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Testing</td>
    <td>5%</td>
    <td>
      <ul>
        <li>60% of the marks(3/5) received from complying with requirements in section `2.7` in relation to **component testing**</li>
        <li>40% of the marks(2/5) received from complying with requirements in section `2.7` in relation to **ui testing**</li>
        <li>Describe your approach to testing in `TESTING.md`. This section will ONLY be marked on things described in that file.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Accessibility</td>
    <td>5%</td>
    <td>
      <ul>
        <li>Your application follows standard accessibility lessons covered in lectures.</li>
        <li>Describe any attempts you've made to improve the Accessibility in `A11Y.md`. This section will ONLY be marked on things described in that file.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>(Bonus Marks) Extra Features</td>
    <td>5%</td>
    <td>
      <ul>
        <li>Implementation of extra features that are not included in the spec.</li>
        <li>Extra features should be non-trivial, have a clear justification for existing, and show either a form of technical, product, or creative flare.</li>
        <li>Any extra features written down in `BONUS.md` in the project folder</li>
        <li>Any bonus marks that extend your ass4 mark above 100% will bleed into other assignment marks, but cannot contribute outside of the 80% of the course that is allocated for assignment marks</li>
        <li><b>Expectations placed on solo groups will be half of that of pairs to achieve the same mark.</b></li>
        <li>If you are working individually and complete Advanced Features (section 2.5) in it's entirety (and high quality) you can receive full marks for bonus marks.</li>
      </ul>
    </td>
  </tr>
</table>

## 7. Originality of Work

The work you submit must be your own work.  Submission of work partially or completely derived from
any other person or jointly written with any other person is not permitted.

The penalties for such an offence may include negative marks, automatic failure of the course and
possibly other academic discipline. Assignment submissions will be examined both automatically and
manually for such submissions.

Relevant scholarship authorities will be informed if students holding scholarships are involved in
an incident of plagiarism or other misconduct.

Do not provide or show your assignment work to any other person &mdash; apart from the teaching
staff of COMP6080.

If you knowingly provide or show your assignment work to another person for any reason, and work
derived from it is submitted, you may be penalised, even if the work was submitted without your
knowledge or consent.  This may apply even if your work is submitted by a third party unknown to
you.

Every time you make commits or pushes on this repository, you are acknowledging that the work you
submit is your own work (as described above).

Note you will not be penalised if your work has the potential to be taken without your consent or
knowledge.

**PLEASE NOTE: To ensure the originality of your work, we are requiring that you regularly commit your work to git throughout the weeks this assignment has been released. Regular and small commits (essentially at least once a day that you work on the assignment) are critical. Failures to commit regularly (or at minimum, failures to commit in small chunks) may results in either penalties of up to 20% of result in allegations of plagiarism.**

## 8. Submission

This assignment is due *Friday 19th April, 10pm*.

To submit your assignment, you must you've pushed all of your code to your gitlab master branch. You can check if you've done this properly by seeing what code is on the gitlab site on your master branch.
 
We will collect the latest work on your master branch of gitlab at the time of submission.

It is your responsibiltiy to ensure that your code can run successfully when cloned fresh from Gitlab.

### Dryrun

You can run a dryrun to sanity check your code runs basically by:
1. Pushing your code to master on gitlab
2. On a CSE terminal (vlab or lab machine), run `6080 ass4dryrun presto GROUP_NAME` where GROUP_NAME is the name of your group

## 9. Late Submission Policy

No late submission are accepted.
