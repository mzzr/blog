- 参数初始化

  https://blog.csdn.net/ys1305/article/details/94332007
  
- 张量操作

  - https://blog.csdn.net/TH_NUM/article/details/83088915?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1

- pytorch cookbook

  - https://zhuanlan.zhihu.com/p/59205847

- Attention

  - ```python
    def attention_net(self, lstm_output, final_state):
            hidden = final_state.view(-1, n_hidden * 2, 1)   # hidden : [batch_size, n_hidden * num_directions(=2), 1(=n_layer)]
            attn_weights = torch.bmm(lstm_output, hidden).squeeze(2) # attn_weights : [batch_size, n_step]
            soft_attn_weights = F.softmax(attn_weights, 1)
            # [batch_size, n_hidden * num_directions(=2), n_step] * [batch_size, n_step, 1] = [batch_size, n_hidden * num_directions(=2), 1]
            context = torch.bmm(lstm_output.transpose(1, 2), soft_attn_weights.unsqueeze(2)).squeeze(2)
            return context, soft_attn_weights.data.numpy() # context : [batch_size, n_hidden * num_directions(=2)]
    
    ```

  - 

http://theorangeduck.com/page/neural-network-not-working#final

https://pcc.cs.byu.edu/2017/10/02/practical-advice-for-building-deep-neural-networks/

http://karpathy.github.io/2019/04/25/recipe/