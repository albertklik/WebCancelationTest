<div class="modal fade" id="testResultModal" tabindex="-1" role="dialog" aria-labelledby="testResultModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="testResultModalTitle">{{__('interface.testResult')}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{ view('base.loadingModal') }}
          <div class="modalContent">
            <div id="testResultModalMsg">
            </div>
            
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('interface.btnClose') }}</button>
        </div>
      </div>
    </div>
  </div>