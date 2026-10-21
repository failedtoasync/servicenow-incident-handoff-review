current.setValue('review_status', 'under_review');
current.setValue('review_started_on', new GlideDateTime());
current.update();
action.setRedirectURL(current);
