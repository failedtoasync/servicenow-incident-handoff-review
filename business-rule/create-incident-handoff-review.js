(function executeRule(current, previous /*null when async*/ ) {


    var IHR_Table = 'x_1880631_incide_0_incident_handoff_review';
    var Handoff_Threshold = 3;

    var reassignmentCount = parseInt(current.getValue('reassignment_count'), 10) || 0;
    var incReopenCount = parseInt(current.getValue('reopen_count'), 10) || 0;


    //CONDITION

    // Incident must be active : New (1) / On Hold (2) / In Progress (3)

    var state = current.getValue('state');
    if (state !== '1' && state !== '2' && state !== '3') {
        return;
    }

    /*----------------------------------------------------------------------------------------------------------------------*/

    //Finding the most recent IHR record for this incident.

    var ihr = new GlideRecord(IHR_Table);
    ihr.addQuery('incident', current.getUniqueValue().toString());
    ihr.orderByDesc('sys_created_on');
    ihr.setLimit(1);
    ihr.query();


    /*Case A : No IHR exists for this incident.
	First IHR (Create an IHR when the Incident's reassignent count reaches or exceeds the handoff threshold(3))*/

    if (!ihr.next()) {

        if (reassignmentCount < Handoff_Threshold) {
            return;
        }

        var firstIHR = new GlideRecord(IHR_Table);
        firstIHR.initialize();

        firstIHR.setValue('incident', current.getUniqueValue().toString());
        firstIHR.setValue('handoff_count', reassignmentCount);
        firstIHR.setValue('reopen_count', incReopenCount);
        firstIHR.setValue('review_required', true);
        firstIHR.setValue('review_status', 'pending');

        var firstIHRId = firstIHR.insert();

        if (!firstIHRId) {
            gs.error('Incident Handoff Review: Failed to create IHR for Incident ' +
                current.getDisplayValue('number'));
            return;
        }

        return;
    }

    /*----------------------------------------------------------------------------------------------------------------------*/

    /*Case B : An IHR already exists and is active.
	Existing IHR (update handoff count with the latest Incident's reassignment count & reopen count)*/

    var ihrStatus = ihr.getValue('review_status');

    if (ihrStatus === 'pending' || ihrStatus === 'under_review') {

        var existingHandoffCount = parseInt(ihr.getValue('handoff_count'), 10) || 0;
        var existingReopenCount = parseInt(ihr.getValue('reopen_count'), 10) || 0;

        var updateRequired = false;

        // Reassignment count increased
        if (reassignmentCount > existingHandoffCount) {
            ihr.setValue('handoff_count', reassignmentCount);
            updateRequired = true;
        }

        // Reopen count increased
        if (incReopenCount > existingReopenCount) {
            ihr.setValue('reopen_count', incReopenCount);
            updateRequired = true;
        }

        // Update only when at least one count changed
        if (updateRequired) {
            
			var updatedIHRId = ihr.update();
            
			if (!updatedIHRId) {
                gs.error(
                    'Incident Handoff Review: Failed to update IHR for Incident ' +
                    current.getDisplayValue('number')
                );
            }
        }

        return;
    }

    /*----------------------------------------------------------------------------------------------------------------------*/


    /* CASE C: Existing IHR is inactive.
     Create a new IHR when the Incident has at least 3 new reassignments since the previous IHR.*/

    var previousReassignmentCount =
        parseInt(ihr.getValue('handoff_count'), 10) || 0;
    var newReassignments =
        reassignmentCount - previousReassignmentCount;
    if (newReassignments < Handoff_Threshold) {
        return;
    }

    // Create a new IHR.

    var newIHR = new GlideRecord(IHR_Table);
    newIHR.initialize();

    newIHR.setValue('incident', current.getUniqueValue());
    newIHR.setValue('handoff_count', reassignmentCount);
    newIHR.setValue('reopen_count', incReopenCount);
    newIHR.setValue('review_required', true);
    newIHR.setValue('review_status', 'pending');
    
	var newIHRId = newIHR.insert();

    if (!newIHRId) {
        gs.error(
            'Incident Handoff Review: Failed to create new IHR for Incident ' +
            current.getDisplayValue('number')
        );
    }


})(current, previous);
