import json
from collections import Counter
import pandas as pd
from collections import defaultdict

dogDB = pd.read_csv('data\\dogs-clean.csv')
flightDB = pd.read_csv('data\\flights-clean.csv')
flightDBFull = pd.read_csv('data\Flights-Database.csv')

flightDB.head()
dogDB.head()
flightDBFull.head()
# len(flightDB)
# len(dogDB)

dlistflights = []
for r in range(len(flightDB)):
    md = {}
    md["rocket"] = flightDB.iloc[r]['rocket']
    md["altitude"] = flightDB.iloc[r]['altitude_km']
    md["mresult"] = flightDB.iloc[r]['result']
    md["date"] = flightDB.iloc[r]['date_flight']
    md["year"] = flightDB.iloc[r]['date_flight'][:4]
    dlistflights.append(md)


len(dlistflights)

# dlistdogs = []
# for r in range(len(dogDB)):
#     mdog = {}
date_list = []
for i in dlistflights:
    date_list.append(i["date"])
len(date_list)

num_flights = Counter(dogDB["name_latin"].to_list())

# dd = dogDB.loc[dogDB['date_flight'] == '1951-07-22']
# dd
for dct in range(len(dlistflights)):
    cd = []
    partd = dogDB.loc[dogDB['date_flight'] == dlistflights[dct]["date"]]
    for r in range(len(partd)):
        cd_row = {}
        cd_row["dogname"] = partd.iloc[r]['name_latin']
        cd_row["gender"] = partd.iloc[r]['gender']
        cd_row["fate"] = 0 if partd.iloc[r]['flight_fate'] == "Survived" else 1
        cd_row["notes"] = partd.iloc[r]['notes']
        cd_row["mission"] = dlistflights[dct]['mresult']
        cd_row["rckt"] = dlistflights[dct]['rocket']
        cd_row["numflights"] = num_flights[partd.iloc[r]['name_latin']]
        cd_row["img"] = "imgs\\dogPictures\\" + \
            partd.iloc[r]['name_latin']+".jpg"
        cd.append(cd_row)
    dlistflights[dct]["children"] = cd

print(dlistflights)

with open('data\\dogdata1.json', 'w') as f:
    json.dump(dlistflights, f)
