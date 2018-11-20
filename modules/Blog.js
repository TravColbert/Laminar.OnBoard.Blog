module.exports = function(app) {
  return {
    home: function(req,res,next) {
      return new Promise((resolve,reject) => {
        let myName = "BlogHome";
        // If the user is not logged-in only get 'public' notes
        // If the user is logged-in get **'your'** notes plus public notes of everybody else
        let searchObj = {
          where:{
            public: true
          },
          include: [
            {
              model: app.models["domains"],
              where: {
                public: true
              },
              as:"domain"
            },
            {
              model: app.models["users"],
              as:"user"
            }
          ]  
        }
        req.appData.notes = [];
        app.controllers["notes"].__get(searchObj)
        .then((notes) => {
          app.log(notes,myName,6);
          req.appData.notes = notes;
          req.appData.view = "bloghome";
          resolve(true);
        })
      })
    }
  }
}