<div id="{{uuid}}" class="list-group-item test{{#pass}} passed{{/pass}}{{#fail}} failed{{/fail}}{{#pending}} pending{{/pending}}{{#skipped}} skipped{{/skipped}}">
  <!-- Test Heading -->
  <div class="test-heading">
    <h4 class="test-title">
      <span class="text-muted hidden"> it </span>
      {{title}}
    </h4>
    {{^pending}}
    <div class="pull-right">
      {{#scr}}<button type="button" class="btn btn-link btn-sm toggle-btn toggle-scr collapsed" data-toggle="collapse" data-target="#{{../uuid}} .test-scr" aria-expanded="false"><span class="btn-text">Show Screenshot</span></button>{{/scr}}
      {{#code}}<button type="button" class="btn btn-link btn-sm toggle-btn toggle-code collapsed" data-toggle="collapse" data-target="#{{../uuid}} .test-code" aria-expanded="false"><span class="btn-text">Show Code</span></button>{{/code}}
      <span class="test-duration {{speed}}">{{formatDuration duration}}</span>
    </div>
    {{/pending}}
  </div>
  <!-- Test Errors -->
  {{#err}}
    <p class="test-error-message">{{name}}: {{message}}
      <button type="button" class="btn btn-link btn-sm toggle-btn toggle-stack collapsed" data-toggle="collapse" data-target="#{{../uuid}} .test-error-stack" aria-expanded="false"><span class="btn-text">Show Stack</span></button>
    </p>
  {{/err}}
  <!-- Test Code -->
  {{#code}}
  <div class="test-code collapse">
    <pre><code class="hljs javascript small">{{{.}}}</code></pre>
  </div>
  {{/code}}
  <!-- Test Error Stack -->
  {{#err}}
  <div class="test-error-stack collapse">
    <pre><code class="hljs small">{{{stack}}}</code></pre>
  </div>
  {{/err}}
  <!-- Screenshot -->
  {{#scr}}
  <div class="test-scr collapse">
    <div class="test-scr-wrap">
      {{{.}}}
    </div>
  </div>
  {{/scr}}
</div>