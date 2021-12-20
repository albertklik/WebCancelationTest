<div class="modal fade" id="insertEditTestGroupsModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{__('interface.testGroups')}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="name">{{__('interface.name')}}</label>
              <input type="text" maxlength="250" class="form-control" id="name">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="aligned">
                <label class="form-check-label" for="aligned">
                  {{__('interface.aligned')}}
                </label>
              </div>
            </div>
            <div class="form-group">
              <label for="name">{{__('interface.goals')}}</label>
              <input type="number" maxlength="10" class="form-control" id="distractors">
            </div>
            <div class="form-group">
              <label for="name">{{__('interface.distractors')}}</label>
              <input type="number" maxlength="10" class="form-control" id="distractors">
            </div>
            <fieldset class="form-group">
              <div class="row">
                <legend class="col-form-label col-sm-2 pt-0">{{__('interface.goalType')}}</legend>
                <div class="col-sm-8">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="target_id" id="target1" value="1">
                    <label class="form-check-label" for="target1">
                      Car
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="target_id" id="target2" value="2">
                    <label class="form-check-label" for="target2">
                      House
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="target_id" id="target3" value="3">
                    <label class="form-check-label" for="target3">
                      Tree
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">{{ __('interface.btnSave') }}</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('interface.btnCancel') }}</button>
        </div>
      </div>
    </div>
  </div>