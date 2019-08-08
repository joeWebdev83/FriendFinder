let friendsArr = require("../data/friends");


module.exports = function (app) {
    
    app.get("/api/friends", function (req, res) {
        return res.json(friendsArr);
    });

    app.post("/api/friends", function (req, res) {
        let newUser = req.body;

        
        let totalDiffArr = [];
        let index;
        
        for (i = 0; i < friendsArr.length; i++) {
            let diffArr = []
           
            for (j = 0; j < friendsArr[i].scores.length; j++) {
                
                quesDiff = Math.abs(newUser.scores[j] - friendsArr[i].scores[j]);
                
                diffArr.push(quesDiff);
            }
            
            let totalDiff = diffArr.reduce(add, 0);
            function add(a, b) {
                return a + b
            }
            add(totalDiff)
            

            
            totalDiffArr.push(totalDiff);
            
            
            
            let minDiff = Math.min.apply(null, totalDiffArr);
            
            index = totalDiffArr.indexOf(minDiff)
            
        }

        friendsArr.push(newUser);
        
        res.json(friendsArr[index])
        
        console.log("your new best friend is: " + friendsArr[index].name);
        
    })

}
