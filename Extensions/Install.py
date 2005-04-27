from StringIO import StringIO
from Products.CMFCore.utils import getToolByName
from Products.Archetypes.public import listTypes
from Products.Archetypes.Extensions.utils import installTypes, install_subskin

from Products.ATReferenceBrowserWidget.config import *
        
def install(self):
    out = StringIO()
    
    # remove comments if you whish to install the demo type
    # installTypes(self, out, listTypes(PROJECTNAME), PROJECTNAME)
    
    
    install_subskin(self, out, GLOBALS)
    out.write("Successfully installed %s." % PROJECTNAME)
    return out.getvalue()
