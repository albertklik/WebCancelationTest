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
          <div id="insertEditTestGroupsMsg">
          </div>
          <form id="insertEditTestGroupsForm">
            <div class="form-group">
              <label for="name">{{__('interface.name')}}</label>
              <input type="text" maxlength="250" name="name" class="form-control" id="name">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" name="aligned" value="1" id="aligned">
                <label class="form-check-label" for="aligned">
                  {{__('interface.aligned')}}
                </label>
              </div>
            </div>
            <div class="form-group">
              <label for="goals">{{__('interface.goals')}}</label>
              <input type="number" maxlength="10" class="form-control" name="targets" id="goals">
            </div>
            <div class="form-group">
              <label for="name">{{__('interface.distractors')}}</label>
              <input type="number" maxlength="10" class="form-control"  name="distractors" id="distractors">
            </div>
            
            <div class="form-group">
              <label for="target_id">{{__('interface.goalType')}}</label>
              <select title="Select your surfboard" name="target_id" id="target_id" class="form-control selectpicker">
                <option>Select...</option>
                <option value="1">{{__('interface.car')}}</option>
                <option value="2">{{__('interface.house')}}</option>
                <option value="3">{{__('interface.tree')}}</option>
                <option value="4">{{__('interface.teapot')}}</option>
                <option value="5">{{__('interface.sun')}}</option>
                <option value="6">{{__('interface.chicken')}}</option>
                <option value="7">{{__('interface.rabbit')}}</option>
                <option value="8">{{__('interface.cat')}}</option>
                <option value="9">{{__('interface.flower')}}</option>
                <option value="10">{{__('interface.fish')}}</option>
                <option value="11">{{__('interface.star')}}</option>
                <option value="12">{{__('interface.airplane')}}</option>
                <option value="13">{{__('interface.boat')}}</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" onclick="saveTestGroup()" >{{ __('interface.btnSave') }}</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('interface.btnCancel') }}</button>
        </div>
      </div>
    </div>
  </div>