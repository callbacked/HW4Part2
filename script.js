/*
GUI Assignment: Homework 4
Date: 11/07/2023
Name: Alexander Vasquez Romero Jr
Email: alexander_vasquez1@student.uml.edu
Description: My JS file for generating the multiplication table, now with jQuery form validation, sliders, and tabs.
*/

$(document).ready(function() {
    // Initialize jQuery UI sliders
    initSliders();

    // Initialize jQuery UI components for the initial tab
    $("#tabs").tabs();

    // jQuery Validation setup
    /* Cited:
    https://www.sitepoint.com/basic-jquery-form-validation-tutorial/
    */
    $("#tableForm").validate({
    // rules for input validation
        rules: {
            multiplierStart: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            multiplierEnd: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            multiplicandStart: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            multiplicandEnd: {
                required: true,
                number: true,
                range: [-50, 50]
            }
        },
        // Messages thrown for validation errors
        messages: {
            multiplierStart: {
                required: "This field is required",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50"
            },
            multiplierEnd: {
                required: "This field is required",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50"
            },
            multiplicandStart: {
                required: "This field is required",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50"
            },
            multiplicandEnd: {
                required: "This field is required",
                number: "Please enter a valid number",
                range: "Value must be between -50 and 50"
            }
        },
        submitHandler: function(form) {
            addTab();
            console.log('Form is valid and submitted');
            return false; // Prevent form submission
        }
    });
});

/*
Added sliders, with the minimum and maximum values the user can put in (-50,50)
            !!!!!SLIDERS ONLY WORK FOR THE INITIAL TAB (labelled "Creation Tab")!!!!!!!
My reasoning for this is when a user creates a tab, if they want to make a new table, they go back to the initial tab to generate a new table
that way any tables from pre-existing tabs don't get overwritten.
*/
function initSliders() {
    // Created sliders for the input forms, with a minimum and maxmium defined as -50 and 50 respectively
    // Slider for 'Multiplier Start'
    $("#multiplierStartSlider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#multiplierStart").val(ui.value);
            generateTable("tabs-1");
        }
    });
    $("#multiplierStart").on("input", function() {
        $("#multiplierStartSlider").slider("value", this.value);
        generateTable("tabs-1");
    });

    // Slider for 'Multiplier End'
    $("#multiplierEndSlider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#multiplierEnd").val(ui.value);
            generateTable("tabs-1");
        }
    });
    $("#multiplierEnd").on("input", function() {
        $("#multiplierEndSlider").slider("value", this.value);
        generateTable("tabs-1");
    });

    // Slider for 'Multiplicand Start'
    $("#multiplicandStartSlider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#multiplicandStart").val(ui.value);
            generateTable("tabs-1");
        }
    });
    $("#multiplicandStart").on("input", function() {
        $("#multiplicandStartSlider").slider("value", this.value);
        generateTable("tabs-1");
    });

    // Slider for 'Multiplicand End'
    $("#multiplicandEndSlider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#multiplicandEnd").val(ui.value);
            generateTable("tabs-1");
        }
    });
    $("#multiplicandEnd").on("input", function() {
        $("#multiplicandEndSlider").slider("value", this.value);
        generateTable("tabs-1");
    });
}

function addTab() {
    // Get form values for table dimensions
    var multiplierStart = $("#multiplierStart").val();
    var multiplierEnd = $("#multiplierEnd").val();
    var multiplicandStart = $("#multiplicandStart").val();
    var multiplicandEnd = $("#multiplicandEnd").val();
    // Create label for tab 
    var tabLabel = `Table (${multiplierStart}, ${multiplierEnd}, ${multiplicandStart}, ${multiplicandEnd})`; // tab name is simply the parameters the user put in
    var tabId = `tabs-${$("#tabs ul li").length + 1}`;
    var newTab = `<li class='tab-item'><a href='#${tabId}'>${tabLabel}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>`; // Newly created tab
    var newContent = `<div id='${tabId}'></div>`;
    
    // Add new tab item and panel to interface
    $("#tabs ul").append(newTab);
    $("#tabs").append(newContent);
    $("#tabs").tabs("refresh");

    // Generate table based on form values
    generateTable(tabId);
}

// Table generation function, ((REDONE FOR TABS))
function generateTable(tabId) {

    // Retrieve start and end values for the multiplier from the form
    var multiplierStart = parseInt($("#multiplierStart").val());
    var multiplierEnd = parseInt($("#multiplierEnd").val());

    // Retrieve start and end values for the multiplicand from the form
    var multiplicandStart = parseInt($("#multiplicandStart").val());
    var multiplicandEnd = parseInt($("#multiplicandEnd").val());

    var table = '<table border="1"><tr><th></th>';
    // Loop to create the header row for multipliers.
    // It adds a table header (<th>) for each multiplier from multiplierStart to multiplierEnd.
    for (var i = multiplierStart; i <= multiplierEnd; i++) {
        table += '<th>' + i + '</th>';
    }
    table += '</tr>';

    // Rows for multiplicands and calculations
    // Outer loop: Iterates through each multiplicand, creating a new row (<tr>) for each.
    // Inner loop: Within each row, iterates through multipliers, calculating and adding the product of multiplicand and multiplier in table data cells (<td>).
    for (var j = multiplicandStart; j <= multiplicandEnd; j++) {
        table += '<tr><th>' + j + '</th>';
        for (var k = multiplierStart; k <= multiplierEnd; k++) {
            table += '<td>' + (j * k) + '</td>';
        }
        table += '</tr>';
    }
    table += '</table>';

    $('#' + tabId).html(table);
}

/* Cited:
using loops to add on to elements -> https://www.w3schools.com/js/js_loop_for.asp
picture of a table to help me visualize how my for loop should work -> https://learnerszonehome.files.wordpress.com/2019/07/html_table_structure.gif
Sliders in jQuery -> https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/jQueryUI1.8_Ch06_SliderWidget.pdf
Tabs in jQuery -> https://jesseheines.com/~heines/91.461/91.461-2015-16f/461-assn/jQueryUI1.8_Ch06_SliderWidget.pdf
*/

// Event handler to close tabs (Page 12 in the PDF for tabs in jQuery really helped me on this a lot)
$("#tabs").on("click", "span.ui-icon-close", function() {
    var panelId = $(this).closest("li").remove().attr("aria-controls");
    $("#" + panelId).remove();
    $("#tabs").tabs("refresh");
});

// Function that closes all tabs (except the first one)
$("#closeAllTabs").click(function() {

    // Loop through tabs and remove all except Creation Tab
    $("#tabs ul li").each(function() {
      if ($(this).attr("aria-controls") !== "tabs-1") {
        $(this).remove();
      }
    });
    // Remove all panel divs except Creation Tab
    $(".ui-tabs-panel").each(function() {
      if (this.id !== "tabs-1") {
        $(this).remove();
      }
    });
    $("#tabs").tabs("refresh");
  });