document.addEventListener('DOMContentLoaded', function() {
    var rPHO = decodeURIComponent('%2B%33%36%2D%33%30%2D%38%31%33%2D%35%32%2D%31%31');
    var rPHIL = decodeURIComponent('%74%65%6C%3A%2B%33%36%33%30%38%31%33%35%32%31%31');

    var rEML = decodeURIComponent('%62%61%61%6C%69%6E%74%2E%6E%61%67%79%40%67%6D%61%69%6C%2E%63%6F%6D');
    var rEMLL = decodeURIComponent('%6D%61%69%6C%74%6F%3A%62%61%61%6C%69%6E%74%2E%6E%61%67%79%40%67%6D%61%69%6C%2E%63%6F%6D');


    var p = document.getElementById('PHO');
    var e = document.getElementById('EML');

    p.addEventListener('mouseenter', function() {
        this.textContent = rPHO;
        this.href = rPHIL;
    });
    p.addEventListener('focus', function() {
        this.textContent = rPHO;
        this.href = rPHIL;
    });
    e.addEventListener('mouseenter', function() {
        this.textContent = rEML;
        this.href = rEMLL;
    });
    e.addEventListener('focus', function() {
        this.textContent = rEML;
        this.href = rEMLL;
    });
});
