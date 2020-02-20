# 常见算法题模版
Tags: Python
因为秋招准备面试的缘故，总结了一些python解决常见算法题的模板。在大多数情况下，python相比于cpp有着更短的代码长度和更容易的实现方式，除了缺少内置的平衡二叉树，刷题中并没有发现其他缺点。本文中的许多算法参考了leetcode discuss中的解法，此外仍然有许多内容因为时间原因没有补上（但是找到工作之后就懒了）。

## 最值
```python
float('-inf')
```

## standard IO和文件IO
```python
s = input() # python3, return a 'str'

f = open("filepath", "r")
for line in f:
  pass
```

## 数据结构
### 字符串
- O(n)找最长回文子串（马拉车算法）
一般面试写出枚举中心点的O(n^2)算法即可，下面是O(n)的Manacher算法
```python
def longestPalindrome(self, s):
        # convert 'aabba' -> '#a#a#b#b#a#'
        ss = "#"
        for c in s:
            ss += c + "#"
        
        # p[i]代表以i为中心的回文子串的最大半边长度(如b#a#b以a为中心对应半边长度值为3)
        # mx表示当前发现的回文串中的最大终点
        # center表示当前找到的终点最大的回文串中心点
        n = len(ss)
        center = mx = 0
        p = [1] * n
        
        for i in range(n):
            if mx > i:
                p[i] = min(p[2*center-i], mx - i)
            while i - p[i] >= 0 and i + p[i] < n and ss[i-p[i]] == ss[i+p[i]]:
                p[i] += 1
            if i + p[i] > mx:
                center = i
                mx = i + p[i]
                
        center = p.index(max(p))
        width = p[center] - 1
        return ss[center-width+1:center+width:2]
```
- KMP
```python
src = "abababcababababab"
pattern = "abababa"


def getNext(pattern):
    Next = [-1]
    j, k = 0, -1
    while j < len(pattern):
        if k == -1 or pattern[j] == pattern[k]:
            j += 1
            k += 1
            if j == len(pattern) or pattern[j] != pattern[k]:
                Next.append(k)
            else:
                Next.append(Next[k])
        else:
            k = Next[k]
    return Next

def KMP(src, pattern):
    i = j = 0
    ans = []
    Next = getNext(pattern)
    
    while i < len(src):
        if j == -1 or src[i] == pattern[j]:
            i += 1
            j += 1
            if j == len(pattern):
                ans.append(i-j)
                j = Next[j]
        else:
            j = Next[j]
    return ans

print(KMP(src, pattern))
```

- Trie
```python
# 定义
T = lambda: collections.defaultdict(T)
self.trie = T()

#建树
for w in words:
  functools.reduce(dict.__getitem__, w, self.trie)['#'] = True
```

- AC自动机
[有空还是来记一下原理](https://www.luogu.org/blog/3383669u/qiang-shi-tu-xie-ac-zi-dong-ji)
```python
# LC1032
class StreamChecker():

    def __init__(self, words):
        T = lambda: collections.defaultdict(T)
        self.trie = T()
        for w in words: functools.reduce(dict.__getitem__, w, self.trie)['#'] = True
        q = collections.deque()
        q.append(self.trie)
        root = self.trie
        root["fail"] = root
        while q:
            node = q.popleft()
            for c in node:
                if c == "#" or c == "fail": continue
                if node == root:
                    node[c]["fail"] = root
                else:
                    t = node["fail"]
                    while True:
                        if c in t:
                            node[c]["fail"] = t[c]
                            break
                        if t == root:
                            node[c]["fail"] = root
                            break
                        else:
                            t = t["fail"]
                q.append(node[c])
        self.cur = root
    def query(self, letter):
        while letter not in self.cur and self.cur != self.trie:
            self.cur = self.cur["fail"]
        if letter in self.cur:
            self.cur = self.cur[letter]
            return '#' in self.cur or '#' in self.cur["fail"]
        return False
```

### 链表
- 定义
- 翻转
- 快慢指针法


### 数组
- 线段树

### 二叉树
- 一些没那么直观的递归题目

- Morris周游
```python
def morris(root):
  predecessor = None
        while root:
            # If there is a left child
            # then compute the predecessor.
            # If there is no link predecessor.right = root --> set it.
            # If there is a link predecessor.right = root --> break it.
            if root.left:       
                # Predecessor node is one step left 
                # and then right till you can.
                predecessor = root.left
                while predecessor.right and predecessor.right != root:
                    predecessor = predecessor.right

                # set link predecessor.right = root
                # and go to explore left subtree
                if predecessor.right is None:
                    predecessor.right = root
                    root = root.left
                # break link predecessor.right = root
                # link is broken : time to change subtree and go right
                else:
                    visit(root)  # !!!
                    predecessor.right = None
                    root = root.right
            # If there is no left child
            # then just go right.
            else:
                visit(root)  # !!!
                root = root.right
```

### 图
- 拓扑排序
```python
# Use leetcode 269 as an example.
def alienOrder(self, words: List[str]) -> str:
    n = len(words)
    order = collections.defaultdict(int)
    for word in words: # error here!
        for c in word:
            order[c] = 0 

    graph = collections.defaultdict(dict)
    for i in range(1, n):
        pre, cur = words[i-1], words[i]
        l = min(len(pre), len(cur))
        for j in range(0, l):
            if cur[j] != pre[j]:
                if cur[j] not in graph[pre[j]]: # error here!
                    graph[pre[j]][cur[j]] = 1
                    order[cur[j]] += 1
                break
            if j == l-1 and len(pre) > l:
                return ""
    # topological sort
    q = collections.deque()
    for node in order:
        if order[node] == 0:
            q.append(node)
    ans = ""
    while q:
        c = q[0]
        q.popleft()
        ans += c
        for i in graph[c]:
            order[i] -= 1
            if order[i] == 0:
                q.append(i)
    if max(order.values()) != 0:
        return ""
    else:
        return ans
```
- 二部图匹配（匈牙利算法）

- 堆优化的dijkstra
```python
## 感觉还是不是很对，边太多咋办
def dijkstra(edges):
  graph = collections.defaultdict(list)
  for u, v, w in edges:
      graph[u].append((v, w))

  pq = [(0, K)]
  dist = {}
  while pq:
      d, node = heapq.heappop(pq)
      if node in dist: continue
      dist[node] = d
      for nei, d2 in graph[node]:
          if nei not in dist:
              heapq.heappush(pq, (d+d2, nei))
  return dist
```

### 并查集
```python
# 只使用路径压缩find,union的最坏复杂度是lgn级别的
# [参考](https://oi-wiki.org/ds/dsu/#_5)
class DSU:
    def __init__(self, N):
        self.par = range(N)
    def find(self, x):
        if self.par[x] != x:
            self.par[x] = self.find(self.par[x])
        return self.par[x]
    def union(self, x, y):
        self.par[self.find(x)] = self.find(y)
```

## 算法
### 二分
- [套路总结](https://www.cnblogs.com/grandyang/p/6854825.html)

### 动态规划
- 状压DP中枚举子集的方法
```python
x = S # 用S的二进制表示一个集合
subset = []
while x:
  subset.append(x)
  x = (x-1) & S
subset.append(0)
```
### 分治
### 排序

### 数学
- 逆元
```python
inv(a) = a^(p-2) (mod p) # 快速幂求
```

- 快速幂
```python
def power(a, n):
    ans = 1
    base = a
    while n:
        if n % 2 == 1:
            ans *= base
        base *= base
        n >>= 1
    return ans
```

- 两种素数筛法和一种概率筛法
```python
mark = [1] * n
for i in range(2, int(math.sqrt(n)) + 1):
    if mark[i]:
        for j in range(2*i, n, i):
            mark[j] = 0
```

```python
# O(n)筛法
nums = [1] * M
primes = []

for i in range(2, M):
    if nums[i]:
        primes.append(i)

    for prime in primes:
        if i * prime >= M: break
        nums[i*prime] = 0
        if i % prime == 0: break
```

```python
# 随机算法-素数判定(Miller-Rabin算法) 
# http://www.matrix67.com/blog/archives/234
# 这东西太难记了...
# 定理 1 ：若 p 是质数，则对于任意 0<a<p ，有 a^(p−1)≡1 (mod  p) 。
# 引理 2 ：若 p 是质数，且 x^2≡1 (mod  p)，那么 x≡1 (mod  p) 和 x≡p−1 (mod  p)中的一个成立。
# 这个筛法tm的就是在同时测试上面两个东西
# https://blog.csdn.net/qq_39972971/article/details/82317212
def isPrime(n):
    def mr(a, p):
        if a == p: return True
        k, q = 0, p-1
        while q & 1 == 0:
            q >>= 1
            k += 1
        v = pow(a, q, p)
        if v == 1 or v == p-1:
            return True
        while k:
            v = v*v % p
            if v == p-1:
                return True
            k -= 1
        return False
    if n < 2: return False
    return all(mr(a, n) for a in [2, 7, 61])
```


### 杂七杂八
- 迷宫生成算法(感觉掌握dfs即可)
  - [ref1](https://github.com/theJollySin/mazelib/blob/master/docs/MAZE_GEN_ALGOS.md)
  - [wikipedia](https://en.wikipedia.org/wiki/Maze_generation_algorithm)
