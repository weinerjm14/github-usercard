/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/


/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/



function cardMaker(data){
  let holder = document.querySelector('.cards');
  let single = document.createElement('div');
  single.classList.add('card');
  holder.appendChild(single);

  let pic = document.createElement('img');
  pic.src = data.avatar_url;
  single.appendChild(pic);

  let infoHolder = document.createElement('div');
  infoHolder.classList.add('card-info');
  single.appendChild(infoHolder);

  let name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = data.name;
  infoHolder.appendChild(name);

  let userName = document.createElement('p');
  userName.classList.add('username');
  infoHolder.appendChild(userName);

  let location = document.createElement('p');
  location.textContent = `Location: ${data.location}`;
  infoHolder.appendChild(location);

  let profile = document.createElement('p');
  profile.textContent = 'Profile: '
  infoHolder.appendChild(profile);

  let profileLink = document.createElement('a');
  profileLink.setAttribute('href', data.html_url);
  profileLink.textContent = data.html_url;
  profile.appendChild(profileLink);

  let followers = document.createElement('p');
  followers.textContent = `Followers: ${data.followers}`;
  infoHolder.appendChild(followers);

  let following = document.createElement('p');
  following.textContent = `Following: ${data.following}`;
  infoHolder.appendChild(following);

  let bio = document.createElement('p');
  bio.textContent = `Bio: ${data.bio}`;
  infoHolder.appendChild(bio);
}
axios.get('https://api.github.com/users/weinerjm14')
.then( (response) => {
  cardMaker(response.data);
})
.catch( (err) => {
  console.log(err);
})

followersArray.forEach((item) => {
  axios.get(`https://api.github.com/users/${item}`)
  .then( (response) => {
    cardMaker(response.data);
  })
  .catch( (err) => {
    console.log(err);
  })
})

// stretch
// Programatically getting followers
// axios.get(`https://api.github.com/users/weinerjm14/followers`)
// .then(response => response.data.forEach((item) => {
//   axios.get(item.url)
//     .then ((newResponse) => {
//       cardMaker(newResponse.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     }
//     )}
// ))
      // .catch((err) => {
      //   console.log(err);
      // }

// Progamattically getting following
axios.get(`https://api.github.com/users/weinerjm14/following`)
.then(response => response.data.forEach((item) => {
  axios.get(item.url)
    .then ((newResponse) => {
      cardMaker(newResponse.data);
    })
    .catch((err) => {
      console.log(err);
    }
    )}
))
.catch((err) => {
  console.log(err);
})
