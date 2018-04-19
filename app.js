const express = require('express');
const app = express();
const request = require('request');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/searchresults", function (req, res) {

    /* http://api.wunderground.com/api/62fa30955fb6ab18/conditions/q/' + state + '/' + city + '/.json USE!!!!*/

    var state = req.query.state;
    var city = req.query.city;
    var weatherRequest = 'http://api.wunderground.com/api/62fa30955fb6ab18/conditions/q/' + state + '/' + city + '.json';
    request(weatherRequest, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body); // Show the HTML for the WeatherUnderground api page.
        }
    });

    request(weatherRequest, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("searchresults", { data: data });
        }
    });
});

//************************************ Ending Statements ********************************************************* */

app.get('*', function (req, res) {
    res.send("Sorry, the page you're looking for doesn't exist.");
});


app.listen(3000, function () {
    console.log('Listening on port 3000')
});

/* below is jquery approach, may use if feeling evil like Waleed */

/* <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
    <script>
        jQuery(document).ready(function($) {
            $.ajax({
                url: "http://api.wunderground.com/api/62fa30955fb6ab18/geolookup/conditions/q/IA/Cedar_Rapids.json",
                dataType: "jsonp",
                success: function (parsed_json) {
                    var location = parsed_json['location']['city'];
                    var temp_f = parsed_json['current_observation']['temp_f'];
                    alert("Current temperature in " + location + " is: " + temp_f);
                }
            });
        });
</script> */