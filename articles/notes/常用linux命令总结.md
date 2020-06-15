# 常用linux shell命令总结
为了不每次需要敲命令实现一个简单任务的时候都去google（虽然回来翻这篇文章也需要时间），我决定记录一下自己常用的一些linux shell命令，同时也考虑一些常用工具的用法总结。对于一些的特殊的功能，将独立成其他的文章（比如内网穿透一文）。本文将对linux的不断熟悉过程中进行不定期更新:-D！

## 系统状态

```sh
# 运行时间和重启记录
who -b
last reboot

# 系统负载
uptime

```



## 进程操作
```sh
# 删除一组特定的进程(其中cut截取的列数可能需要根据系统不同动态调整)
ps aux | grep keyword | cut -c 9-15 | xargs kill -9
```
## 文件
```sh
# 文件校验
md5sum
sha1sum
# 查看剩余空间（-h, --human-readable;  -l, --local）
df -hl
# 递归替换所有jpeg后缀图片为jpg后缀（其中-print0和xargs -0是为了防止文件名带有空格）
find . -type f -name '*.jpeg' -print0 | xargs -0 rename 's/\.jpeg/\.jpg/'

# 查看文件夹所占空间
du -sh
```
## 网络
```shell
# 查看所有监听端口
# t: tcp, l: listen, p: process info, n: disable name resolution
netstat -tlpn
# 查看端口占用情况
lsof -i :port
# 查看端口是否开放
telnet ip port
```
## docker
```sh
# 删除所有exited的container
docker rm $(docker ps -a -f status=exited -q)
# Purging All Unused or Dangling Images, Containers, Volumes, and Networks
docker system prune

# image socks5 proxy
# 创建 /etc/systemd/system/docker.service.d/http-proxy.conf
# [Service]
Environment="HTTP_PROXY=socks5://localhost:1080/" "HTTPS_PROXY=socks5://localhost:1080/"

# container proxy
https://docs.docker.com/network/proxy/

# container communication

```
## ssh
```sh
ssh-keygen -t rsa
ssh-copy-id [-i pub_file] username@destination
# 通过ssh远程挂载
sshfs $user@$host:$remote_dir_path $local_dir_path 
# 利用ssh进行端口映射（详见《内网穿透的几种姿势》）
ssh -CqTnNf -L srcIP:srcPort:desIP:desPort user@middle_server
```
## git
```sh
# 从最近的commit恢复特定文件（checkout被拆分成了restore和switch）
git restore file

# 在上一个commit加入更多文件
git add .
git commit --amend --no-edit
```



## conda

```
conda create -n name python=version
conda remove -n name --all
```



## python

```sh
# 线程池
# https://www.cnblogs.com/scios/p/8651758.html
```



## crontab

```
@reboot command
```

