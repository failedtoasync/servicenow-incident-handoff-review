// 1. CLIENT-SIDE CODE: Runs in the browser first
function runClientCode() {

    g_form.hideFieldMsg('review_notes', true);

    var reviewNotes = g_form.getValue('review_notes');

    // Check if the field is empty
    if (!reviewNotes || reviewNotes.trim() === '') {
        g_form.setMandatory('review_notes', true);
        
        g_form.showFieldMsg('review_notes', 'Review Notes are required before completing the review.', 'error');
        g_form.addErrorMessage('Cannot complete review: Review Notes are missing.');
        
        return false;
    }

    // If valid, trigger the server-side function
    gsftSubmit(null, g_form.getFormElement(), 'complete_review'); 
}

// 2. SERVER-SIDE CODE: Runs only if the client-side check passes
if (typeof window == 'undefined') {
    runServerCode();
}

function runServerCode() {
    current.setValue('review_status', 'complete');
    current.update();
    
    action.setRedirectURL(current);
}

