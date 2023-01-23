

docker-compose up -d db

set -x PGHOST localhost
set -x PGUSER yaltt
set -x PGPASSWORD password
set -x PGDATABASE yaltt
set -x PGPORT 5432


yarn workspace @yaltt/frontend start && yarn workspace @yaltt/backend start 
