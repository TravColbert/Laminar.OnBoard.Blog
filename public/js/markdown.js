
function convertMarkdownDivs() {
  let converter = showdown.Converter();
  let markdownDiv = document.querySelector('.markdown-div');
  let htmldownDiv = document.querySelector('.htmldown-div');
  htmldownDiv.innerHTML = converter.makeHtml(markdownDiv.innerHTML);
}

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  convertMarkdownDivs();
});
