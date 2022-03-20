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

            <div id="studentData">
              

            <div id="testResultTable">
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
            </div>

            <div id="result-graph">
              <div class="row">
                <div class="col">
                    <div class="card card-body">
                      <canvas id="showBoardCanvasResult" width="760" height="500"></canvas>
                    </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('interface.btnClose') }}</button>
        </div>
      </div>
    </div>
  </div>
</div>