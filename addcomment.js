class Header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <style>
      #formContainer{
        margin:auto;
        width: 100%;
        padding-bottom:20px;
        justify-content:center;
        text-align:center;
      }
      #submitButton{
        padding:10px;
        border: 1px solid gray;
        border-radius: 10px;
        background:black;
        color: #FFD700;
      }
      #commentsHeader{
        margin:10px 0;
      }
      .formfieldswrapper{
        display:flex;
        flex-direction:row;
        align-items: center;
        justify-content: center;
      }
      .formfieldswrapper input,textarea{
        margin: 0 20px;
      }
      </style>
      <div id="formContainer">
        <h4 id="commentsHeader">ADD A COMMENT</h4>
        <div class="formfieldswrapper">
          <p class="marginlessP">Name</p>
          <input id="nameinput" type="text" name="name"/>
          <p class="marginlessP">Comment</p>
          <textarea type="text" id="commentinput" name="comment"></textarea>
          <button id="submitButton" type="submit">Submit</button>
        </div>
      </div>
      <div id="loadingScreen" style="display: none;">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
    `;
    document.getElementById("submitButton").addEventListener('click', this.submitComment); 
  }
  submitComment(){
    event.preventDefault();
    let name = document.getElementById("nameinput").value;
    let comment = document.getElementById("commentinput").value;
    if(!name || !comment) {
      alert("Please provide name and comment");
      return
    }
    else{
      document.getElementById("nameinput").value = "";
      document.getElementById("commentinput").value = "";
      let newComment = {
        comment,name
      }
      let movies = JSON.parse(sessionStorage.getItem("movies"));
      let currentID = document.getElementsByTagName("comment-component")[0].id.replace('comment','');
      let currMovie= movies.find(o=>o.id==currentID);
      let CurrMovieType = currentID.replace(/\d+$/, '');
      if(currMovie?.comments){
        currMovie.comments.push(newComment);
      }
      else{
        currMovie = {
          type:CurrMovieType,
          id: currentID,
          likes:0,
          comments: [newComment]
        }
        movies.push(currMovie);
      }
      sessionStorage.setItem("movies", JSON.stringify(movies));
      submitCommentToDatabase(currentID, currMovie);
    }
  }
}
customElements.define('comment-component', Header);