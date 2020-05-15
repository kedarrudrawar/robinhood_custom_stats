from pyrh import Robinhood
import private_cfg 

rh = Robinhood(username= private_cfg.username, password=private_cfg.password)

rh.login()
rh.print_quote("AAPL")