<div class="modal fade" id="insertEditTestGroupsModal" tabindex="-1" role="dialog" aria-labelledby="insertEditTestGroupsModalTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="insertEditTestGroupsModalTitle">{{__('interface.testGroups')}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          {{ view('base.loadingModal') }}
          <div class="modalContent">
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
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="automaticDistractors" aria-describedby="automaticDistractorHelp">
                  <label class="form-check-label" for="automaticDistractors">
                    {{__('interface.automatic')}}
                  </label>
                  <small id="automaticDistractorHelp" class="text-muted">
                    {{__('interface.automaticHelpTxt')}}
                  </small>
                </div>
              </div>
              
              <div class="form-group">
                <label for="target_id">{{__('interface.goalType')}}</label>
                <select title="Select your surfboard" name="target_id" id="target_id" class="form-control">
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
  
              <div class="form-group">
                <label for="time_limit">{{__('interface.time_limit')}}</label>
                <select title="Select your surfboard" name="time_limit" id="time_limit" class="form-control">
                  <option value="30">{{__('interface.thirtySeconds')}}</option>
                  <option value="60">{{__('interface.oneMinute')}}</option>
                  <option value="120">{{__('interface.twoMinutes')}}</option>
                  <option value="180">{{__('interface.threeMinutes')}}</option>
                  <option value="300">{{__('interface.fiveMinutes')}}</option>
                  <option value="600">{{__('interface.TenMinutes')}}</option>
                  <option value="1800">{{__('interface.thirtyMinutes')}}</option>
                  <option value="3600">{{__('interface.oneHour')}}</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" onclick="saveTestGroup()" >{{ __('interface.btnSave') }}</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('interface.btnCancel') }}</button>
        </div>
      </div>
    </div>
  </div>