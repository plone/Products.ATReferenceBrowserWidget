import os
from setuptools import setup, find_packages

version = '3.0.1'

setup(name='Products.ATReferenceBrowserWidget',
      version=version,
      description="ATReferenceBrowserWidget is reference widget for Archetypes.",
      long_description=open("README.txt").read() + "\n" +
                       open(os.path.join("Products", "ATReferenceBrowserWidget", "HISTORY.txt")).read(),
      classifiers=[
        "Framework :: Plone",
        "License :: OSI Approved :: GNU General Public License (GPL)",
        "Programming Language :: Python",
      ],
      keywords='CMF Plone Archetypes reference widget',
      author='Danny Bloemendaal',
      author_email='plone-developers@lists.sourceforge.net',
      url='http://pypi.python.org/pypi/Products.ATReferenceBrowserWidget',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['Products'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
        'setuptools',
        'archetypes.referencebrowserwidget',
        'zope.deprecation',
      ],
)
