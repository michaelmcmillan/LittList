ssh app@littlist.no 'cd /srv/littlist.no; git fetch origin; git reset --hard origin/master; make install && kill -HUP `cat data/.gunicorn.pid`'
