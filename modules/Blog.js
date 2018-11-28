module.exports = function(app) {
  return {
    home: function(req,res,next) {
      return new Promise((resolve,reject) => {
        let myName = "BlogHome";
        req.appData.notes = [];
        app.log("Retrieving public notes",myName,6);
        app.controllers["notes"].getPublicNotes()
        .then(notes => {
          app.log("Got " + notes.length + " notes",myName,6);
          return (req.appData.notes = req.appData.notes.concat(notes));
        })
        .then(() => {
          if(req.session.user) {
            return app.controllers["notes"].getNotesByUserId(req.session.user.id)
          } else {
            return [];
          }
        })
        .then(notes => {
          app.log("Got " + notes.length + " user's notes",myName,6);
          let noteIds = req.appData.notes.map(note => {
            return note.id;
          });
          for(let note of notes) {
            if(noteIds.indexOf(note.id)<0) req.appData.notes.push(note);
          }
          req.appData.notes.sort(function(a,b){
            if(a.updatedAt < b.updatedAt) return 1;
            if(a.updatedAt > b.updatedAt) return -1;
            return 0;
          });
          req.appData.view = "bloghome";
          resolve(true);
        });
      })
    }
  }
}