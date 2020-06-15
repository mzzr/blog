# Pandas cheatsheet

1. 缺失值处理

   ```python
   def useless_cols(df, maxNullRatio=0.9, maxFreqRatio=0.9):
       useless_cols = set()
       for col in df.columns:
           if (train[col].nunique() <= 1 or
              train[col].isnull().sum()/train.shape[0] > maxNullRatio or
              train[col].value_counts(
                  dropna=False, normalize=True).values[0] > maxFreqRatio):
               useless_cols.add(col)
       return list(useless_cols)
   ```

   

   1. null值

      ```python
      many_null_cols = [col for col in train.columns if train[col].isnull().sum() / train.shape[0] > 0.9]
      
      def clean_inf_nan(df):
          return df.replace([np.inf, -np.inf], np.nan)   
      
      def missing_data(data):
          total = data.isnull().sum()
          percent = (data.isnull().sum()/data.isnull().count()*100)
          tt = pd.concat([total, percent], axis=1, keys=['Total', 'Percent'])
          types = []
          for col in data.columns:
              dtype = str(data[col].dtype)
              types.append(dtype)
          tt['Types'] = types
          return(np.transpose(tt))
      ```

   2. unique值

      ```python
      one_value_cols = [col for col in train.columns if train[col].nunique() <= 1]
      big_top_value_cols = [col for col in train.columns if train[col].value_counts(dropna=False, normalize=True).values[0] > 0.9]
      ```

      

2. 数据可视化

   1. 图表类型
      - sns.countplot
      - sns.distplot 直方图
      - sns.kdeplot 核密度估计图

3. jupyter

   ```python
   # 自动reload修改的模块
   %load_ext autoreload
   %autoreload 2
   ```

   

4. mongodb
   
   - [dataframe document](https://gist.github.com/jdthorpe/93145e8093258a3b73b2bd458533176d)

5. [框架式笔记](https://www.jianshu.com/p/4ff1d2b23ab3)

6. numpy计算各种距离

   https://blog.csdn.net/qq_19707521/article/details/78479532

   