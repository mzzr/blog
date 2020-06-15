```python
from data.mongo_models import *

from tqdm import tqdm
import pandas as pd

stock_list = meta_model.MetaModel.get_list_data("stock_list")

for symbol in tqdm(stock_list):
    data = []   
    df = pd.read_pickle("../stockGNN_old/data/stock/%s/daily.pkl" % symbol)
    for row in df.values:
        (ts_code, trade_date, open_price, high, low, close_price, pre_close, 
         change, pct_chg, vol, amount) = row
        stock_code = ts_code[:6]
        data.append(stock_price.StockPrice(stock_code=stock_code, trade_date=trade_date, 
                                           open_price=open_price, high=high, low=low, close_price=close_price,
                                           pre_close=pre_close, change=change, pct_chg=pct_chg, vol=vol, amount=amount))
    stock_price.StockPrice.objects.insert(data, load_bulk=False)
```

