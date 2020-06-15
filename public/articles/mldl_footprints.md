# MLDL  Reading Footprints

Tags: 深度学习，笔记

在各种model和paper日新月异的当下，每天繁杂的信息往往难以进行有效的阅读整理和消化，光是各种公众号的推送每天值得点开的就有十数篇之多。再加上懒惰的天性，许多文章是读了一遍之后就抛诸脑后。今日突发奇想，不如在读的时候简单记录一下内容，留下hooks方便日后回调。



## 2020/03/16

- [Google 半监督学习 slides](https://mp.weixin.qq.com/s/U1Qdt53zVy4lmcwnPckVyg)
  - Unlabeled data augmentation
  - Noisy Student
  - Meena chatbot （evolved Transformer found by NAS？）
  - Paper FixMatch （experiments on 小数据集）
- Yann LeCuna NYU Pytorch DL course
  - [自己实现forward/backward](https://atcold.github.io/pytorch-Deep-Learning/en/week05/05-3/)

- [GraphSAGE: GCN落地必读论文](https://zhuanlan.zhihu.com/p/62750137)
  - 4种aggregate方法
  - 无监督损失：随机游走邻居和负采样节点
- [Embedding论文list](https://zhuanlan.zhihu.com/p/58805184)

### 2020/03/17

- GCN [code](https://github.com/tkipf/gcn) [paper](https://arxiv.org/pdf/1609.02907.pdf)
- GlusterGCN [code](https://github.com/benedekrozemberczki/ClusterGCN) [paper](https://arxiv.org/pdf/1905.07953)
- SOTA [list](https://paperswithcode.com/sota/node-classification-on-citeseer)

## 2020/03/18

今天读了3篇利用gnn预测股票的paper，作为之后毕设的参考

- HATS: A Hierarchical Graph Attention Network for Stock Movement Prediction [code](https://github.com/dmis-lab/hats)
- Exploring Graph Neural Networks for Stock Market Predictions with Rolling Window Analysis
- Incorporating Corporation Relationship via Graph Convolutional Neural Networks for Stock Price Prediction

## 2020/03/19

- **Word2vec的解释性论文** Word2vec Parameter Learning Explained (UMich 2016).pdf 
  - 看了一半，稍微有点枯燥...
- [知识图谱融合综述slides](https://github.com/nju-websoft/KnowledgeGraphFusion)
  - 好jier难，基础的工作太多。其中也总结了两三个基于图神经网络的KG融合模型，暂时认为与毕设关系不大。
- [GNN benchmarking](https://github.com/graphdeeplearning/benchmarking-gnns)

## 2020/03/20

- [KGCNs: Machine Learning over Knowledge Graphs with TensorFlow](https://blog.grakn.ai/kgcns-machine-learning-over-knowledge-graphs-with-tensorflow-a1d3328b8f02)
  - 需要使用Grakn作为KG的storage，暂时略过