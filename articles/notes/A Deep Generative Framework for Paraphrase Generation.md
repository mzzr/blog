# A Deep Generative Framework for Paraphrase Generation
简单记录一下对论文思想以及代码实现的理解。
## Intuition
- Traditional VAEs when combined with recurrent neural networks can generate free text but they are not suitable for paraphrase generation for a given sentence.
- Address this problem by conditioning the both, encoder and decoder sides of VAE, on the original sentence.
## Background
- VAE
  - 参考[这篇](https://www.sohu.com/a/226209674_500659)post进行学习

