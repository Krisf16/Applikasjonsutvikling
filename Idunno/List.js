function newElementOnList() {
    console.log("Clicked on NewElementOnList")
    
  let list = document.createElement("li");
  let inputValue = document.getElementById("ListInput").value;
  let mylist = document.getElementsByTagName("LI");
  let close = document.getElementsByClassName("close");  
    
  let t = document.createTextNode(inputValue);
  list.appendChild(t);
  if (inputValue === '') {
    alert("Skriv noe!");
  } else {
    document.getElementById("mainList").appendChild(list);
  }
    
  document.getElementById("ListInput").value = "";

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  list.appendChild(span);

// Click on a close button to hide the current list item

 for (i = 0; i < mylist.length; i++) {
  span.className = "close";
  span.appendChild(txt);
  mylist[i].appendChild(span);
}

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      let div = this.parentElement;
      div.style.display = "none";
    }
  }
}
