//SIDE BAR//

function adjust_column(){
	
    if (document.getElementById("links") != null) {
  if ( document.getElementById("content").offsetHeight < document.getElementById("links").offsetHeight ){
      document.getElementById("content").style.height = document.getElementById("links").offsetHeight + "px" ;
  }
  if ( document.getElementById("content").offsetHeight > document.getElementById("links").offsetHeight ){
      document.getElementById("links").style.height = document.getElementById("content").offsetHeight + "px" ;
  }
    }
    if (document.getElementById("links-left") != null) {
  if( document.getElementById("content").offsetHeight < document.getElementById("links-left").offsetHeight ){
      document.getElementById("content").style.height = document.getElementById("links-left").offsetHeight + "px" ;
  }
  if( document.getElementById("content").offsetHeight > document.getElementById("links-left").offsetHeight ){
      document.getElementById("links-left").style.height = document.getElementById("content").offsetHeight + "px" ;
  }
    }
}


function getElementsByClass(className) {

 var al_ele = document.getElementsByTagName('*');
 var ele_len = al_ele.length;
 var pattern = new RegExp("(^|\\s)"+className+"(\\s|$)");
 var node_List = new Array();

 for(var i=0, j=0; i<ele_len; i++){
   var ele = al_ele[i];

   if(! ele.className){
     continue;
   }
   if(! pattern.test(ele.className)){
     continue;
   }
                 
   node_List[j++] = ele;
 }

 return node_List;
}



function clearp(element){
   var Div = document.createElement('p');
   Div.style.clear='both';

   var parent_node = element.parentNode;

   var new_element = parent_node.appendChild(Div);
   parent_node.insertBefore(new_element,element.nextSibling);

 }


//HEADER//
function adjust_headarea(){
 
 var head_left = getElementsByClass("title_description_with_address");
 var head_right = getElementsByClass("header_address");

 var left_len = head_left.length;

 for (var k=0; k<left_len; k++) {

  if (head_right[k].offsetHeight > head_left[k].offsetHeight ){
   clearp(head_right[k]);
  }

  if (head_right[k].offsetHeight < head_left[k].offsetHeight ){
   clearp(head_right[k]);
  }

 }

}


//Eventlister

if (window.addEventListener) {
	window.addEventListener('load', adjust_column, false);
	window.addEventListener('load', adjust_headarea, false);
}

else if (window.attachEvent) {
	window.attachEvent('onload', adjust_column);
	window.attachEvent('onload', adjust_headarea);
}


