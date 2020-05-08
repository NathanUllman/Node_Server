console.log("Javascript loaded");
document.getElementById("123").onclick = () => console.log("Click");

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log(JSON.parse(this.response));
  }
};
xhttp.open("GET", "/controller/fancyController/fancy", true);
xhttp.send();
