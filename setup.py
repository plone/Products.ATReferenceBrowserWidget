from setuptools import setup, find_packages
import sys, os

version = '2.0b1'

setup(name='Products.ATReferenceBrowserWidget',
      version=version,
      description="ATReferenceBrowserWidget is reference widget for Archetypes.",
      long_description="""\
      """,
      classifiers=[
        "Framework :: Plone",
        "Framework :: Zope2",
        "License :: OSI Approved :: GNU General Public License (GPL)",
        "Programming Language :: Python",
        "Topic :: Software Development :: Libraries :: Python Modules",
      ],
      keywords='CMF Plone Archetypes reference widget',
      author='Danny Bloemendaal',
      author_email='plone-developers@lists.sourceforge.net',
      url='http://svn.plone.org/svn/archetypes/MoreFieldsAndWidgets/ATReferenceBrowserWidget/trunk',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['Products'],
      include_package_data=True,
      zip_safe=False,
      download_url='http://plone.org/products/atreferencebrowserwidget/releases',
      install_requires=[
        'setuptools',
      ],
      entry_points="""
      # -*- Entry points: -*-
      """,
)
