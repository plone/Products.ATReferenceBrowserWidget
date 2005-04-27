## Script (Python) "referencebrowser_startupDirectory"
##bind container=container
##bind context=context
##bind namespace=
##bind script=script
##bind subpath=traverse_subpath
##parameters=directory=''
##title=
##

from Products.CMFCore.utils import getToolByName

# Mapping works as follows:
#
#  directory == ''                  => Current object
#  directory == '/absolute/url'     => Portal root + absolute url
#  directory == '../relative/url'   => Current object + relative url
#
# If the object is in the portal_factory, remove the factory from the equation.
# This creates an inconsistency with the case when directory is not set,
# because the current object is in the factory and thus not generally useful
# as a starting point for browsing (it won't contain any sub-objects, and the
# parent object is the factory's temporary folder). Hence, in this case, the
# startup directory is the parent folder.
#
# Similarly, if directory is a relative path starting with '../' and the object
# is in the factory, let the first '../' part of the relative URL refer to the
# destination parent folder, not the factory.

def filterPortalFactory (url):
    """Return context's url + the relative url given, but remove any
    reference to portal_factory.
    """

    portal_factory = getToolByName (context, 'portal_factory')

    # Prepend / to ensure proper path separation, and ensure url is a string
    if url:
        url = '/' + url
    else:
        url = ''
    basePath = ''

    if portal_factory.isTemporary (context):
        pathParts = context.getPhysicalPath ()

        # Remove the factory from the path
        pathParts = pathParts[:-3]

        # If the object is in the portal factory, we'll be relative to the
        # parent folder, not the temporary object which does not yet exist,
        # so remove any explicit ../ from the relative path
        if url.startswith ('/..'):
            url = url[3:]

        basePath = '/'.join (pathParts)
    else:
        basePath = context.absolute_url (relative = 1)


    # Resolve the URL
    try:
        targetPath = basePath + url
        object = context.restrictedTraverse (targetPath)
        return object.absolute_url ()
    except:
        return context.absolute_url ()

#
# Main execution
#

# Default case - if no directory is given, use the current folder
if not directory:
    return filterPortalFactory (None)

# If we have an absolute URL, return it relative to the portal root
if directory.startswith ('/'):
    portal_url = getToolByName (context, 'portal_url')
    return portal_url () + directory

# Else, if we have a relative URL, get it relative to the context.
return filterPortalFactory (directory)
