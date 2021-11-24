rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  
  //artist collection
     match /artist/{artistID}/{documents=**} {
      allow create: if false;
      allow read: if request.auth.uid != null;
      allow update : if request.auth.uid == artistID || (request.resource.data.keys().hasOnly(
        ['no_of_followers', 'total_streams', 'previous_month_streams']));
    }
    
    //album collection
    match /album/{albumID}/{documents=**} {
      allow create: if request.auth != null && exists(/databases/$(database)/documents/artist/$(request.auth.uid));
      allow read;
      allow update:  if request.auth != null && (request.resource.data.keys().hasOnly(
        ['no_of_streams']));
    }
    
    //playlists collection
    match /playlist/{playlistID}/{documents=**} {
    	allow write, read:  if request.auth != null;
    }
    
    //producer collection
    match /producer/{producerID}/{documents=**} {
      allow read, write: if request.auth != null && request.auth.uid == producerID;
    }
    
    //song collection
    match /song/{songID}/{documents=**} {
    	allow create: if request.auth != null && exists(/databases/$(database)/documents/artist/$(request.auth.uid));
      allow read : if request.auth != null;
      allow update : if request.auth != null && (request.resource.data.keys().hasOnly(
        ['no_of_streams', 'no_of_likes'])); 
      
    }
    
    //user collection
    match /user/{userID}/{documents=**} {
      allow write;
      allow read : if request.auth.uid == userID;
    }
    
    
    
  }
}