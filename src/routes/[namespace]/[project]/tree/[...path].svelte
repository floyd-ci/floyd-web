<script context="module">
  import {fetch_json} from "../../../../request.ts";
  import {get_file} from "../../../../service/github.js";

  const filterCov = n => (n === -1 ? "" : n);

  function getDiagnosticsForLine(diagnostics, n) {
    return diagnostics.filter(diag => diag.line_nr === n);
  }

  function combine([content, coverage, diagnostics]) {
    const lines = content.replace(/\s+$/, "").split("\n");
    const cov = coverage[0].line_coverage;
    return {
      lines: lines.map((line, i) => [
        line,
        filterCov(cov[i]),
        getDiagnosticsForLine(diagnostics, i + 1),
      ]),
    };
  }

  export function preload({namespace, project, path}) {
    const content = get_file(namespace, project, "", path);
    const coverage = fetch_json(`coverage?file_path=eq.${path}`);
    const diagnostics = fetch_json(`diagnostics?file_path=eq.${path}`);
    return Promise.all([content, coverage, diagnostics]).then(combine);
  }
</script>

<script>
  export let path = "";
  export let lines = [];
</script>

<style>
  .line-number {
    width: 1%;
    min-width: 50px;
    padding-right: 10px;
    padding-left: 10px;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
      monospace;
    font-size: 12px;
    line-height: 20px;
    color: rgba(27, 31, 35, 0.3);
    text-align: right;
    white-space: nowrap;
    vertical-align: top;
    /* cursor: pointer; */
    user-select: none;
  }
  .line-number::before {
    content: attr(data-line-number);
  }

  .line-content {
    overflow: visible;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
      monospace;
    font-size: 12px;
    color: #24292e;
    word-wrap: normal;
    white-space: pre;

    position: relative;
    padding-right: 10px;
    padding-left: 10px;
    line-height: 20px;
    vertical-align: top;
  }

  .line-coverage {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
      monospace;
    font-size: 12px;
    line-height: 20px;
    color: rgba(27, 31, 35, 0.3);
    vertical-align: top;
    user-select: none;
  }
  .line-coverage::after {
    content: attr(data-line-coverage);
  }
</style>

<div class="card">
  <div class="card-header">
    <p class="card-header-title">{path}</p>
  </div>
  <div class="card-content">
    <table>
      <tbody>
        {#each lines as [line, cov, diag], i}
          <tr>
            <td class="line-number" data-line-number={i + 1} />
            <td class="line-content">{line}</td>
            <td class="line-coverage" data-line-coverage={cov} />
          </tr>
          {#each diag as {type, message}}
            <tr>
              <td />
              <td class="line-content">{message}</td>
              <td />
            </tr>
          {/each}
        {/each}
      </tbody>
    </table>
  </div>
</div>
