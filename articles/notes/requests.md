# Requests reference

```python
# HTTP请求类型
# get类型
r = requests.get('https://github.com/timeline.json')
# post类型
r = requests.post("http://m.ctrip.com/post")
# put类型
r = requests.put("http://m.ctrip.com/put")
# delete类型
r = requests.delete("http://m.ctrip.com/delete")
# head类型
r = requests.head("http://m.ctrip.com/head")
# options类型
r = requests.options("http://m.ctrip.com/get")

# 获取响应内容
print(r.content) #以字节的方式去显示，中文显示为字符
print(r.text) #以文本的方式去显示

#URL传递参数
payload = {'keyword': '香港', 'salecityid': '2'}
r = requests.get("http://m.ctrip.com/webapp/tourvisa/visa_list", params=payload) 
print（r.url） #示例为http://m.ctrip.com/webapp/tourvisa/visa_list?salecityid=2&keyword=香港

#获取/修改网页编码
r = requests.get('https://github.com/timeline.json')
print （r.encoding）


#json处理
r = requests.get('https://github.com/timeline.json')
print（r.json()） # 需要先import json    

# 定制请求头
url = 'http://m.ctrip.com'
headers = {'User-Agent' : 'Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 4 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19'}
r = requests.post(url, headers=headers)
print （r.request.headers)

#复杂post请求
url = 'http://m.ctrip.com'
payload = {'some': 'data'}
r = requests.post(url, data=json.dumps(payload)) #如果传递的payload是string而不是dict，需要先调用dumps方法格式化一下

# post多部分编码文件
url = 'http://m.ctrip.com'
files = {'file': open('report.xls', 'rb')}
r = requests.post(url, files=files)

# 响应状态码
r = requests.get('http://m.ctrip.com')
print(r.status_code)
    
# 响应头
r = requests.get('http://m.ctrip.com')
print (r.headers)
print (r.headers['Content-Type'])
print (r.headers.get('content-type')) #访问响应头部分内容的两种方式
    
# Cookies
url = 'http://example.com/some/cookie/setting/url'
r = requests.get(url)
r.cookies['example_cookie_name']    #读取cookies
    
url = 'http://m.ctrip.com/cookies'
cookies = dict(cookies_are='working')
r = requests.get(url, cookies=cookies) #发送cookies

#设置超时时间
r = requests.get('http://m.ctrip.com', timeout=0.001)

#设置访问代理
proxies = {
           "http": "http://10.10.1.10:3128",
           "https": "http://10.10.1.100:4444",
          }
r = requests.get('http://m.ctrip.com', proxies=proxies)


#如果代理需要用户名和密码，则需要这样：
proxies = {
    "http": "http://user:pass@10.10.1.10:3128/",
}
```

