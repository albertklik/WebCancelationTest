<div class="modal fade" id="insertEditResearchesModal" tabindex="-1" role="dialog" aria-labelledby="insertEditResearchesModalTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="insertEditResearchesModalTitle">{{__('interface.researches')}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{ view('base.loadingModal') }}
          <div class="modalContent">
            <small class="text-muted">
              {{__('interface.requiredTxt')}}
            </small>
            <div id="insertEditResearchesModalMsg">
            </div>
            <form id="insertEditResearchesForm">
              <input type="hidden" maxlength="250" name="id" value="-1" class="form-control" id="id">
              <div class="form-group required">
                <label for="title">{{__('interface.title')}}</label>
                <input type="text" maxlength="250" name="title" class="form-control" id="title">
              </div>
              <div class="form-group">
                <label for="instructor_name">{{__('interface.instructorName')}}</label>
                <input type="text" maxlength="250" name="instructor_name" class="form-control" id="instructor_name">
              </div>
              <div class="form-group required">
                <label for="description">{{__('interface.description')}}</label>
                <textarea rows="8" class="form-control" name="description" id="description"></textarea>
                <small id="researchDescriptionHelp" class="text-muted">
                    {{__('interface.researchDescriptionHelpTxt')}}
                </small>
              </div>
              <div class="form-group">
                <label for="keywords">{{__('interface.keywords')}}</label>
                <input type="text" maxlength="250" name="keywords" class="form-control" id="keywords">
                <small id="researchKeywordsHelp" class="text-muted">
                    {{__('interface.researchKeywordsHelpTxt')}}
                </small>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" onclick="saveResearch()" >{{ __('interface.btnSave') }}</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('interface.btnCancel') }}</button>
        </div>
      </div>
    </div>
  </div>