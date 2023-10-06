"""
This module is used for the password generation mechanics.
"""

import secrets
import requests

API_KEY = "DKRY8TYocA9BlbwB2NLWy1ExugbRrzeW2zwi914E"  # replace with your secret API-KEY

#--------------- Only Change Something Below This Line If You Know What You Are Doing ---------------

QRN_URL = "https://api.quantumnumbers.anu.edu.au/"
DTYPE = "uint16"
LENGTH = 1
BLOCKSIZE = 1
params = {"length": LENGTH, "type": DTYPE, "size": BLOCKSIZE}
headers = {"x-api-key": API_KEY}
response = requests.get(QRN_URL, headers = headers, params = params)
glob = 39697
#6

#--------------- Only Change Something Above This Line If You Know What You Are Doing ---------------
def init():
    global glob
    if response.status_code == 200:
        js = response.json()
        if js["success"] == True:
            glob = list(js["data"])[0]
        else:
            print(js["message"])

    else:
        print(f"Got an unexpected status-code: {response.status_code}")


def gen_pass(flag1, flag2, length):
    global glob
    secrets_gen = secrets.SystemRandom()

    mod_glob = glob * secrets_gen.random()

    mod_seed = str(mod_glob).encode('utf-8')

    secrets_gen.seed(mod_seed)

    #Actual Generation
    pasw = ""

    if(flag1 == 1 and flag2 == 1):
        
        for _ in range(length):
            chkr1 = secrets_gen.randint(0, 4)
            if(chkr1 == 0):
                pasw += chr(secrets_gen.randint(48, 57))
            elif(chkr1 == 1):
                pasw += chr(secrets_gen.randint(65, 90))
            elif(chkr1 == 2):
                pasw += chr(secrets_gen.randint(33, 47))
            else:
                pasw += chr(secrets_gen.randint(97, 122))
        return pasw
    
    if(flag1 == 1 and flag2 == 0):

        for _ in range(length):
            chkr = secrets_gen.randint(0, 2)
            if(chkr == 0):
                pasw += chr(secrets_gen.randint(48, 57))
            elif(chkr == 1):
                pasw += chr(secrets_gen.randint(65, 90))
            else:
                pasw += chr(secrets_gen.randint(97, 122))
        return pasw

    else:
        return "Something Went Wrong!"


#get the updated positions
#multiply it with the secrets random float every time the generation is on number


