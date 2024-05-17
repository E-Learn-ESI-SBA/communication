import os


os.system('cassandra-migrate -H cassandra -p 9042 -c db_config.yml migrate')


print('Migration completed')