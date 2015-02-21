# Unfortunatly bibsys uses the Java Session to determine what
# document to export, this means we need to send two http reqs
# per export.
curl --data "eksportFormat=refmanager&cmd=sendtil" --cookie "JSESSIONID=CEB3DB638C41D6C4A7C68FE52296457E" http://ask.bibsysk/action/show -L | iconv -f iso8859-1 -t utf-8
