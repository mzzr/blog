# Neo4j



- [时间序列建模](https://stackoverflow.com/questions/24748556/how-to-filter-edges-by-time-stamp-in-neo4j) 等熟悉了Cypher之后看
- [python driver](https://neo4j.com/docs/pdf/neo4j-driver-manual-1.7-python.pdf)



## CQL

```sql
# ref1: https://www.cnblogs.com/jpfss/p/10874001.html
# ref2: https://neo4j.com/docs/getting-started/current/cypher-intro

# delete all rels&nodes
MATCH ()-[r]-() DELETE e
MATCH (e) DELETE e

# MERGE = CREATE + MATCH
```



## py2neo

```
from py2neo import Node, Relationship, Graph, NodeMatcher, RelationshipMatcher
graph = Graph(NEO4J_DB, username=NEO4J_USERNAME, password=NEO4J_PASSWORD)

a = Node('stock', name = 'a' )
b = Node('holder', name = 'b' )
graph.create(a)
graph.create(b)
r1 = Relationship(a, 'to', b, name = 'hold', timestamp="20100202") #可以增加一些属性，也可以省略
graph.create(r1)
```

