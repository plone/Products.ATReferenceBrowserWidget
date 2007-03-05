/*
* A lame library to manipulate HTML SELECT elements through Javascript
*
* (C) 1997-2004, Andreas Jung
* 
* Released as freeware under the DoWhateverYouWantWithThisSoftware license.
*
* $Id: select_lists.js,v 1.14 2005/04/20 09:35:00 hrs2test Exp $
*/


/*
* return the index of the selected element
*/
function selected_index(el) {
    return el.selectedIndex;
}

/*
* empty list
*/

function empty_list(el) {
    var num = el.options.length;

    for (var i=num; i >= 0; i--) {
         el.options[i]=null;
    }
}

/*
* append a new option to a list
*/

function add_to_list(el, val, txt) {

    var op = new Option(txt, val, "", "");
    var op_len = el.options.length;

    el.options[op_len] = op;
    el.options.length = op_len+1;

    return true;
}

/*
* append a new option to a list at position pos
*/

function add_to_list_position(el, val, txt, pos) {

    if (pos >= el.options.length) {
        alert('Parameter pos=' + pos + ' is longer than the length of the options.array');
    }

    // Save all key-value pairs with positions larger than 'pos'
    
    var txt_arr = new Array();
    var val_arr = new Array();

    for (var i=pos+1; i<el.options.length; i++) {
        txt_arr[i-pos-1] = el.options[i].text;
        val_arr[i-pos-1] = el.options[i].value;
    }

    // Insert new option
    var old_length = el.options.length;
    var op = new Option(txt, val, "", "");
    el.options[pos+1] = op;
    el.options.length = pos + 2;

    // re-add options
    for (var i=0; i<txt_arr.length; i++) 
        add_to_list(el, val_arr[i], txt_arr[i]);

    return true;
}


/*
* remove an element from the list
*/

function delete_from_list(el, pos) {
    if (pos==-1) return;
    el.options[pos] = null;
}

/*
* move selected element to bottom of list
*/

function entry_to_bottom(el, pos) {
    if (pos==-1) return;

    var val = el.options[pos].value;
    var txt = el.options[pos].text;

    delete_from_list(el,pos);

    var op = new Option(txt, val, "", "");
    var op_len = el.options.length;

    el.options[op_len] = op;
    el.options.length = op_len+1;

    el.selectedIndex = el.options.length-1;
}

/*
* move selected element to top of list 
*/

function entry_to_top(el, pos) {
    if (pos==-1) return;

    var val = el.options[pos].value;
    var txt = el.options[pos].text;

    var txt_arr = new Array();
    var val_arr = new Array();

    for (var i=0; i<el.options.length; i++) {
        txt_arr[i] = el.options[i].text;
        val_arr[i] = el.options[i].value;
    }

    empty_list(el);

    add_to_list(el, val, txt);

    for (i=0;i<txt_arr.length;i++) {
        if (val != val_arr[i]) {
            add_to_list(el, val_arr[i], txt_arr[i]);
        }
    }

    el.selectedIndex = 0;
}


/*
* move element up
*/

function entry_up(el, pos) {

    if (pos <= 0) return;

    var val  = el.options[pos].value;
    var txt  = el.options[pos].text;
    var val1 = el.options[pos-1].value;
    var txt1 = el.options[pos-1].text;

    el.options[pos-1].value = val;
    el.options[pos-1].text = txt;
    el.options[pos].value = val1;
    el.options[pos].text = txt1;

    el.selectedIndex = pos-1;	
}

/*
* move element down 
*/

function entry_down(el,pos) {

    if (pos==-1 || pos==el.options.length-1) return;

    var val  = el.options[pos].value;
    var txt  = el.options[pos].text;
    var val1 = el.options[pos+1].value;
    var txt1 = el.options[pos+1].text;

    el.options[pos+1].value = val;
    el.options[pos+1].text = txt;
    el.options[pos].value = val1;
    el.options[pos].text = txt1;

    el.selectedIndex=pos+1;	
}


/*
* unselect all elements
*/

function unselect_list(el) {
    var type = el.type;
    var len  = el.options.length;

    if (len==-1) return false;

    for (i=0;i<len;i++)
        if (el.options[i].selected != 0)
            el.options[i].selected = 0;

    el.selectedIndex = -1;
    return true;
}

/*
* select all elements
*/

function select_list(el) {
    var type = el.type;
    var len  = el.options.length;

    if (len==-1) return false;

    for (i=0;i<len;i++)
        el.options[i].selected = 1;
    return true;
}

/*
* change an element in the list
*/

function change_in_list(el, pos, val, txt) {
    if (pos==-1)  return;

    el.options[pos].value = val;
    el.options[pos].text = txt;
    el.options[pos].selected = true;
    el.selectedIndex = pos;
}

/*
sort a selection list assuming key==value for all entries

2005-04-18 FRP fixed for non-string type values; we have in a: typeof a == "unknown"
move them to the end of the list
*/

function LowerCaseSortGerman(v1, v2) {
   var a = v1;    // hack to get around obscure MSIE JS failures
   var b = v2;    // hack to get around obscure MSIE JS failures

   if (typeof a == "string") {
     a = a.toLowerCase();
     a = a.replace(/ä/g,"ae");
     a = a.replace(/ö/g,"oe");
     a = a.replace(/ü/g,"ue");
     a = a.replace(/ß/g,"ss");
     
     if (typeof b == "string") {
       b = b.toLowerCase();
       b = b.replace(/ä/g,"ae");
       b = b.replace(/ö/g,"oe");
       b = b.replace(/ü/g,"ue");
       b = b.replace(/ß/g,"ss");
       return a < b ? -1 : (a > b ? 1 : 0);
     }
     else { return 0; }
   }
   else { return 1; }

}




function LowerCaseSort(a, b) {
    var a1 = a.toLowerCase();
    var b1 = b.toLowerCase();

    if (a1 < b1) return -1;
    if (a1 > b1) return 1;
    return 0;
}

function sort_list(el, cmp_method) {

    var data = new Array();
    var values = new Array();
    var num =  el.options.length;

    for (i=0; i < num; i++) {
        var key = el.options[i].text;
        var value = el.options[i].value;
        data[i] = key;
        values[key] = value;
    }
    
    empty_list(el);
    if (! cmp_method) 
        data.sort(LowerCaseSortGerman);
    else
        data.sort(cmp_method);
    
    for (i=0; i < num; i++) {
        key = data[i];
        add_to_list(el, values[key], key);
    }
}

/* 
Move the selected items from s_from to s_to
*/

function move_selected(s_from, s_to) {
    
    // Adding 
    var num =  s_from.options.length;

    for (var i=num-1; i >= 0;  i--) { 
        var key = s_from.options[i].text;
        var value = s_from.options[i].value;
        if (s_from.options[i].selected) {
            add_to_list(s_to, value, key);
        }
    }

    // Sorting
    sort_list(s_to);

    // Deletion
    for (var i=num-1; i >= 0;  i--) { 
        var key = s_from.options[i].text;
        var value = s_from.options[i].value;
        if (s_from.options[i].selected) {
            s_from.options[i] = null;
        }
    }
}

/*
Select option elements by value
*/

function select_by_value(el, v) {
    for (var i=0; i<el.options.length; i++) {
        if (el.options[i].value == v)
            el.options[i].selected = 1;
    }
}

/*
Check if an option exists (check by value)
*/

function select_exists_value(el, v) {
    for (var i=0; i<el.options.length; i++) {
        if (el.options[i].value == v) return 1;
    }
    return 0;
}

/*
    return value of selected element (only for select-one)
*/

function selected_value(el) {
    if (el.type == "select-one")  {
        var pos = el.selectedIndex;
        if (pos == -1)
            return;
        return el.options[pos].value;
    }
    else
        alert('Element must be of type select-one');
}
