ssh app@littlist.no 'cd /srv/littlist.no; git fetch origin; git reset --hard origin/master; kill -HUP `cat gunicorn.pid`'
