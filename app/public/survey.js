// Set up survey object to contain survey question, Likert scale values for positively and
// negatively keyed questions, and a default score of "neither accura"    
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
$.each(survey, function(i) {
    $("input[type='radio']").click(function() {
        var radioValue = $(`input[name='item${survey[i].item}']:checked`).val();
        radioValue = parseInt(radioValue);
        if (radioValue) {
            survey[i].choice = radioValue;
        }
    });
});

function showModal(name, photo) {
    var html = `
    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Your Best Match is ${name}!</h4>
            </div>
            <div class="modal-body">
                <img src="${photo}">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->`
    $('body').append(html);
    $("#dynamicModal").modal();
    $("#dynamicModal").modal('show');

    $('#dynamicModal').on('hidden.bs.modal', function (e) {
        $(this).remove();
    });
}
