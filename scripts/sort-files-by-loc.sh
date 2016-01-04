 find . -type f -exec wc -l {} + \
 | grep -v '__init__'            \
 | grep -v 'csl'                 \
 | grep -v 'pyc$'                \
 | grep \./src                   \
 | grep \.py                     \
 | sort -rn 
