// function to open the popup window
function referencebrowser_openBrowser(path, fieldName, at_url, fieldRealName)
{
    atrefpopup = window.open(path + '/referencebrowser_popup?fieldName=' + fieldName + '&fieldRealName=' + fieldRealName +'&at_url=' + at_url,'referencebrowser_popup','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=550');
}

// function to return a reference from the popup window back into the widget
function referencebrowser_setReference(widget_id, uid, label, multi)
{
    // differentiate between the single and mulitselect widget
    // since the single widget has an extra label field.
    if (multi==0) {
        element=document.getElementById(widget_id)
        label_element=document.getElementById(widget_id + '_label')
        element.value=uid
        label_element.value=label
     }  else {
         list=document.getElementById(widget_id)
         // check if the item isn't already in the list
          for (var x=0; x < list.length; x++) {
            if (list[x].value == uid) {
              return false;
            }
          }         
          // now add the new item
          theLength=list.length;
          list[theLength] = new Option(label);
          list[theLength].selected='selected';
          list[theLength].value=uid
     }
}

// function to clear the reference field or remove items
// from the multivalued reference list.
function referencebrowser_removeReference(widget_id, multi)
{
    if (multi) {
        list=document.getElementById(widget_id)
        for (var x=list.length-1; x >= 0; x--) {
          if (list[x].selected) {
            list[x]=null;
          }
        }
        for (var x=0; x < list.length; x++) {
            list[x].selected='selected';
          }        
    } else {
        element=document.getElementById(widget_id);
        label_element=document.getElementById(widget_id + '_label');
        label_element.value = "";
        element.value="";
    }
}


