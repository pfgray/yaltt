FROM postgres:15.1

RUN mkdir /scripts
COPY model.sql /scripts 

RUN cp "/scripts/model.sql" /docker-entrypoint-initdb.d/
