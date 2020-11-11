#!/usr/bin/env python3
import json
import re
import os

regex=r"postgres:\/\/([a-zA-Z]+):([a-zA-Z0-9]+)@([a-zA-Z0-9\-\.]+):([0-9]+)\/([a-zA-Z0-9]+)"
db = os.environ['DATABASE_URL']

groups = re.findall(regex, db)

# print(groups)
# print(groups[0][0])
with open("config/config.json", 'r+') as fp:
    config = json.load(fp)

    config["production"]["username"] = groups[0][0]
    config["production"]["password"] = groups[0][1]
    config["production"]["database"] = groups[0][4]
    config["production"]["host"] = groups[0][2]

    fp.seek(0)  # rewind
    json.dump(config, fp)
    fp.truncate()

