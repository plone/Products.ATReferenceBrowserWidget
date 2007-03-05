Intro

    ATReferenceBrowserWidget is an add-on to Archtetypes. It adds a new
reference widget that allows you to search or browse the portal when creating
references.  This new widget inherits from the standard reference widget so you
can use all it's properties.

When you use this widget, there are two buttons presented for each widget. One
that opens a popup-window that let's you do the search/browsing and one that
let's you clear the reference or selected references (will be in effect after
the form's Save). 

The popop window basically consists of two parts. The top half is a search form
and the bottom half is the browser/search results part. Both parts can be
turned off or on using the widget's properties.

The search part has additional configuration in the widget (see properties below).

Properties

    The popup window can be configured using the following widget properties:

    * default_search_index: when a user searches in the popup, this index is
      used by default

    * show_indexes: in the popup, when set to True, a drop-down list is shown
      with the index to be used for searching. If set to False,
     default_search_index will be used.

    * size: in case of single-select widget, the default is set to 30. In case
      of multi-select, default is 8.

    * available_indexes: optional dictionary that lists all the indexes that
      can be used for searching. Format: {'<catalog index>':'<friendly name'>,
      ... } The friendly name is what the end-users sees to make the indexes more
      sensible for him. If you do not use this property then all the indexes will be
      shown (I think nobody should allow this to happen!).

    * allow_search: shows the search section in the popup

    * allow_sorting: allows you change the order of referenced objects (requires multiValued=1)
    
    * allow_browse: shows the browse section in the popup
    
    * startup_directory: directory where the popup opens. Optional. When
      omitted, the current folder is used or in the case where a property 
      refwidget_startupdirectories under site_properties is found it is 
      searched for a startup_directory.

      Property is a lines field having the following
      format:
        path1:path2
      path1 is the path where all widgets being under it set startup_directory
      to path2 if no startup_directory is set.

    * restrict_browsing_to_startup_directory: allows you to restrict the
      breadcrumbs ('allow_browse' property) to contents inside the 
      'startup_directory' only. So you are not able to walk up in the hierarchy.
      (default: 0 = disabled)

    * image_portal_types: specify a list of image portal_types. Instances of
      these portal types are being previewed within the popup widget

    * image_method: specifies the name of a method that is added to the image
      URL to preview the image in a particular resolution (e.g. 'mini' for
      thumbnails)

    * show_review_state: allows you to display the workflow state for objects
      (off by default)

    * show_path: display the relative path (relative to the portal object) of
      referenced objects 

    * only_for_review_states: items are only referencable if their workflow
      state matches the ones
      a specified (default: None = no filtering by workflow state) 

    * history_length: enable a history feature that show the paths of the last
      N visited folders (default : 0 = no history)
      
    * force_close_on_insert: closes the popup when the user choses insert. This
      overrides the behavior in multiselect mode.

    * base_query: defines query terms that will apply to all searches, mainly
      useful to create specific restrictions when allow_browse=0.  Can be
      either a dictonary with query parameters, or the name of a method or
      callable available in cotext that will return such a dictionary.
    
This add-on comes with an example content type that uses this widget. You can
enable the installation of the type by uncommenting the appropriate line in
Install.py under Extension. See ATReferenceBrowserDemo.py.

Installing

    Copy this folder and its subfolders in your products directory and install
it using the Quickinstaller in your Plone portal.

This product requires Archetypes 1.5+

Design notes

    Both the templates (widget and popup) are prototypes. There are still some
inline styles, especially in the popup because I didn't want to tweak with
plone's css stuff and I didn't want to do hacking and tricking to incorporate a
stylesheet myself.  So, that's still a point of interest.

Furthermore I made some design decisions. Right now, in the popup window, all
objects are shown (when browsing) and objects that may be referenced to are
bold and the other objects are greyed out.  I chose to show the
non-referenceable objects too because they may be an important part of the
context that help the user search for the desired objects to browse to.
Another thing that I chose for is that in case of a multi-value widget, the
popup remains open so that you can continue to add references without having to
reopen the popup over and over again. Problem is that you have to close the
window yourself. This may change if it turns out to be an annoyance.

A thing that is more related to forms in general is that the items in the
multiselect listbox need to be selected before Save is clicked otherwise only
the selected items are submitted. That kinda sucks usability-wise because now
the user basically has to make two selections: first by choosing the items in
the popup and secondly by selecting them again in the listbox. Right now I made
it so that the items are selected by default but if the user starts clicking in
the list, then there might be an issue. Btw, the inandout widget has the same
problem.  Best would be to select all the items in a script just before the
form is submitted so that the complete list is submitted. But that requires
changes in the base_edit form I think. But it's something to think about since
there are now already two widgets that needs to be prepared like this (inandout
and this one, haven't looked at picklist though, could have the same problem).

Anyway, have fun with it and if you have suggestions please let me know. If you see problems, please fix
them when you can.

Danny Bloemendaal
danny.bloemendaal@companion.nl
