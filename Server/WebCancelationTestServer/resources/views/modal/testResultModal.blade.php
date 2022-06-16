<div class="modal fade" id="testResultModal" tabindex="-1" role="dialog" aria-labelledby="testResultModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
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


            <div class="card" id="studentData">
              <div class="card-footer">
                <h5>{{__('interface.testInfoTitle')}}<h5>
              </div>
              <div class="card-body">
                <p><b>{{__('interface.studentName')}}: </b><span id="studentName"></span></p>
                <p><b>{{__('interface.hits')}}: </b><span id="hits"></span><b>  {{__('interface.misses')}}: </b><span id="misses"></span></p>
                <p><b>{{__('interface.realizedAt')}}: </b><span id="realizedAt"></span></p>
              </div>
            </div>

            {{-- <div id="testResultTable">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th>Nº</th>
                    <th>Tempo</th>
                    <th>posição</th>
                    <th>Icone</th>
                    <th>Nome</th>
                    <th>acerto</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div> --}}
            <br/>
            <div id="result-graph">
              <div class="row">
                <div class="col">
                    <div class="card">
                      <div class="card-footer">
                        <h5>{{__('interface.board')}}<h5>
                      </div>
                      <div class="card-body">
                        <canvas id="showBoardCanvasResult" width="700" height="500"></canvas>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div class="modal-footer">

          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('interface.btnClose') }}</button>
          <button type="button" class="btn btn-success" >{{ __('interface.btnShareResult') }}</button>
          <button type="button" class="btn btn-primary" id="seeMoreBtn" >{{ __('interface.btnSeeMore') }}</button>
        </div>
      </div>
    </div>
  </div>
</div>