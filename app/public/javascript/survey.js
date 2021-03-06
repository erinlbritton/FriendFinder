// Set up survey object to contain survey question, Likert scale values for positively and
// negatively keyed questions, and a default score of neutral to handle non-response    
// Scale from https://ipip.ori.org/newNEOKey.htm#Adventurousness
var survey = [
    {item: 1, question: "Prefer to stick with things that I know.", values: [5, 4, 3, 2, 1], choice: 3},
    {item: 2, question: "Like to visit new places.", values: [1, 2, 3, 4, 5], choice: 3},
    {item: 3, question: "Dislike changes.", values: [5, 4, 3, 2, 1], choice: 3},
    {item: 4, question: "Am attached to conventional ways.", values: [5, 4, 3, 2, 1], choice: 3},
    {item: 5, question: "Interested in many things.", values: [1, 2, 3, 4, 5], choice: 3},
    {item: 6, question: "Am a creature of habit.", values: [5, 4, 3, 2, 1], choice: 3},
    {item: 7, question: "Dislike new foods.", values: [5, 4, 3, 2, 1], choice: 3},
    {item: 8, question: "Prefer variety to routine.", values: [1, 2, 3, 4, 5], choice: 3},
    {item: 9, question: "Like to begin new things.", values: [1, 2, 3, 4, 5], choice: 3},
    {item: 10, question: "Don't like the idea of change.", values: [5, 4, 3, 2, 1], choice: 3}
];

// Use the survey object to construct the html for survey.html
$.each(survey, function(i) {
    var itemNumber = survey[i].item;
    var index = i;
    var newRow = 
        `<div class="row">
            <div class="col-md-3 col-md-offset-2 vcenter item-border">
                ${survey[i].question}    
            </div>`;
        $.each(survey[index].values, function(i) {
            newRow += 
            `<div class="col-md-1 item-border">
                <div class="radio">
                    <label class="radio-inline">
                        <input type="radio" name="item${itemNumber}" value="${survey[index].values[i]}">
                    </label>
                </div>
            </div>`
        });
    newRow += `</div>`;
    $(".survey").append(newRow); 
}); 

// Grab each value associated with each item and store them as the questions are ordered
// not necessarily in the order they are answered; this also allows the user to change their response 
// prior to submitting their survey
$.each(survey, function(i) {
    $("input[type='radio']").click(function() {
        var radioValue = $(`input[name='item${survey[i].item}']:checked`).val();
        radioValue = parseInt(radioValue);
        if (radioValue) {
            survey[i].choice = radioValue;
        }
    });
});