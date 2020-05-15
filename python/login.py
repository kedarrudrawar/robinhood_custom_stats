from pyrh import Robinhood, dump_session, load_session
from pyrh.exceptions import InvalidCacheFile
from dotenv import load_dotenv
import os


def login():
    load_dotenv()
    try:
        rh = load_session()
    except InvalidCacheFile:
        rh = Robinhood(username=os.getenv("username"), password=os.getenv("password"))
        rh.login()
        dump_session(rh) # so you don't have to do mfa again
    return rh


if __name__=='__main__':
    rh = login()
    print(rh.positions()['results'])
