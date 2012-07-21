

function start() {
    if (console)
        console.log("starting simulation");
};

function buildUI() {
    var items = [];

    //$('#toolbar_buttons').append( items.join('') );

    for (var element in CirSim.elementMap) {
        var classname = "";
        var buttonName = CirSim.elementMap[element];
        if (buttonName[0] === '+') {
            classname = 'class="testedworking"';
            buttonName[0] = '';
        } else if (buttonName[0] === '/') {
            classname = 'class="notyettested"';
            buttonName[0] = '';
        } else if (buttonName[0] === '-') {
            classname = 'class="notyetimplemented"';
            buttonName[0] = '';
        }

        buttonName = buttonName.replace('-', '');
        buttonName = buttonName.replace('+', '');
        buttonName = buttonName.replace('#', '');

        var elmHTML = '<li ' + classname + '><a href="#"  onclick="CirSim.addElm(\'' + element.toString() + '\');">' + buttonName + '</a></li>';
        items.push(elmHTML);
    }

    $('#toolbar_buttons').append(items.join(''));

};

function getCanvasBounds() {
    var canvas = $('#canvas_container');

    return new Rectangle(canvas.offset().left, canvas.offset().top, canvas.width(), canvas.height());
};


$(document).ready(function (e) {

    console.log("Started!");

    var canvas = $('#canvas_container');

    paper = new Raphael(document.getElementById('canvas_container'), canvas.width(), canvas.height());

    $("#canvas_container").css({
        'background-color':Color.color2HexString(Settings.BG_COLOR), 'border-width':'2px'
    });

    $("#canvas_container").click(function (event) {
        event.preventDefault();
        CirSim.onMouseClicked(event);
    });

    $("#canvas_container").mouseenter(function (event) {
        CirSim.onMouseEntered(event);
    });

    $("#canvas_container").mouseleave(function (event) {
        event.preventDefault();
        CirSim.onMouseReleased(event);
        CirSim.onMouseExited(event);
    });

    $("#canvas_container").mousemove(function (event) {
        event.preventDefault();
        CirSim.onMouseMove(event);
    });

    $("#canvas_container").mousedown(function (event) {
        event.preventDefault();
        CirSim.onMousePressed(event);
    });

    $("#canvas_container").mouseup(function (event) {
        event.preventDefault();
        CirSim.onMouseReleased(event);
    });

    $(document).keydown(function (event) {
        //alert(event.which);
        CirSim.onKeyPressed(event);
    });

    $(document).keyup(function (event) {
        CirSim.onKeyReleased(event);
    });


    /*
     $('a').click( function() {
     alert("link clicked");
     });
     */
    /*
     $('#test').dialog({
     // properties ...
     buttons: [{
     id:"btn-accept",
     text: "Accept",
     click: function() {
     $(this).dialog("close");
     }
     },{
     id:"btn-cancel",
     text: "Cancel",
     click: function() {
     $(this).dialog("close");
     }
     }]
     });
     */
    //$("#test").append( label );
//    $("#test").append( createTextFieldHTML('TestLabel: ') );
    /*
     $("#test").append( createDivButtonHTML('TestButton') ).button();

     $("#test").append( createSliderHTML('Slider') ).slider({
     range: true,
     values: [17, 50]
     });

     $("#test").append( createRangedSliderHTML('RangedSlider') ).slider({
     range: "min",
     value: 17
     });
     */
//    $("#test").append( createCheckboxHTML('Checkbox') );
//
//    $("#test").append( createToggleButtonsHTML('toggle', 'one two three four') ).buttonset();
//    $("#test").append( createTextFieldHTML('TestLabel: ') );

    /*
     // Button
     $("#divButton, #linkButton, #submitButton, #inputButton").button();

     // Button Set
     $("#radio1").buttonset();


     // Horizontal Slider
     $('#horizSliderRange').slider({
     range: true,
     values: [17, 50]
     }).width(200);

     $('#horizSlider').slider({
     range: "min",
     value: 17
     }).width(200);


     var countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic", "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Mongolia", "Morocco", "Monaco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino", " Sao Tome", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
     $("#countries").autocomplete({
     source: countryList
     });
     */

    start();
});


function start() {
    CirSim.init();

    buildUI();
    console.log("Starting simulation");
    setInterval(function () {
        CirSim.updateCircuit();
    }, 40);
}




