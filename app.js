


// FB.getLoginStatus(function(response) {
//   if (response.status === 'connected') {
//     // the user is logged in and has authenticated your
//     // app, and response.authResponse supplies
//     // the user's ID, a valid access token, a signed
//     // request, and the time the access token
//     // and signed request each expire
//     var uid = response.authResponse.userID;
//     var accessToken = response.authResponse.accessToken;
//     if(localStorage)
//   } else if (response.status === 'not_authorized') {
//       console.log("You Are Not Authorized By this App Developer")
//     // the user is logged in to Facebook,
//     // but has not authenticated your app
//   } else {
//
//     // the user isn't logged in to Facebook.
//     //get access token from uriHash
//
//   }
$(document).ready(function(){
  //this is provided by FB under when creating a developer acct. which initializes and sets up FB sdk (require to play w/ fb API)
  window.fbAsyncInit = function() {
    FB.init({
      appId            : '1923777371268689',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.12'
    });
  };
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  $(".fbLogin").on("click", function(){
    logIn();
  })
})
 // });
//function above is redirect for FB API

 function logIn(){
   FB.login(function(response){
     var person= {userID:"", accessToken: "", picture: "", email:""}

     if(response.status == "connected"){
       $(".fbLogin").remove();
       //accessToken and userID are properties of the object(the data retrieved, user profile)
       // add these to the new object's(person) parameters
       person.accessToken = response.authResponse.accessToken;
       person.userID = response.authResponse.userID;

       //this allows you to get other information from the user profile
       //the 1st parameter specifies the GRAPH object we want to grab
       // the 2nd parameter is an nonaymous fxn that has a paramter for userData
       //fields allows me to return properties from the current user
       FB.api('/me',{fields: 'name, first_name,last_name,email,picture'}, function (userData){
          // console.log(userData) //to see what data we have available

         //now add the name, last name, and picture by adding the data to the person object
         person.name = userData.name; //b/c userData is holding the array of data! (the object!)
         person.email = userData.email;
         person.picture = userData.picture.data.url; //to access the pics

         $(".hidden").removeClass("hidden");
         $(".result-name").html(person.name);
         $(".result-email").html(person.email);
         $(".result-pic").attr("src", person.picture);
         $(".result-pic").css("height", "150px").css("width", "150px").css("margin", "0 auto");

       });
     }
     console.log(response) //check for object (user data)
   }, {scope: 'public_profile email publish_actions'})


}
