# Go语言入门
闲来无事瞄到了今日GitHub trending中的7days-golang项目，趁机入个门。
### 0. Reference
[Go 语言简明教程](https://geektutu.com/post/quick-golang.html)
[builtin function](https://golang.org/pkg/builtin/)
### 1. Hello World
```go
package main
import "fmt"
func main() {
  fmt.Println("Hello World")
}
```
```shell
 go run main.go #等价于先build在执行
```
### 2. 注释
go中的注释与C语言类似，[这里](https://studygolang.com/articles/21791?fr=sidebar)有一些奇怪的注释例子。
### 3. 变量
```go
// 三种定义方式，自带变量推断
var a int
var a int = 1
var a = 1
// 奇怪的空值
var a []int = nil
/* 常见变量类型 **********************************
int, int8, int16, int32, int64, uint8, uint16...
float32, float64
byte = uint8
string
boolean
rune 汉字字符？
************************************************/
// 数组
arr := [5]int{1, 2, 3, 4, 5}
for i := 0; i < len(arr); i++ {
	arr[i] += 100
}
fmt.Println(arr)  // [101 102 103 104 105]
```
```go
// 切片，可以利用内置函数make（可用于分配空间和初始化slice, map, or chan，返回“引用”）
slice1 := make([]float32, 0) // 长度为0的切片
slice2 := make([]float32, 3, 5) // [0 0 0] 长度为3容量为5的切片
fmt.Println(len(slice2), cap(slice2)) // 3 5
// 添加元素，切片容量可以根据需要自动扩展
slice2 = append(slice2, 1, 2, 3, 4) // [0, 0, 0, 1, 2, 3, 4]
fmt.Println(len(slice2), cap(slice2)) // 7 12
// 子切片 [start, end)
sub1 := slice2[3:] // [1 2 3 4]
sub2 := slice2[:3] // [0 0 0]
sub3 := slice2[1:4] // [0 0 1]
// 合并切片
combined := append(sub1, sub2...) // [1, 2, 3, 4, 0, 0, 0] ...是解构语法，类似py和js
```
```go
// 字典
m1 := make(map[string]int)
m2 := map[string]string{
	"Sam": "Male",
	"Alice": "Female",
}
m1["Tom"] = 18
// 指针，类似c语言，常用于传参
str := "Golang"
var p *string = &str 
*p = "Hello"
fmt.Println(str) // Hello
```
### 4. 流程控制
```go
# if else
if age := 18; age < 18 {
	fmt.Printf("Kid")
} else {
	fmt.Printf("Adult")
}
# switch
switch() {
case 1:
	doSomething
  fallthrough
case 2:
  fmt.Println("Will skip this line if no fallthrough")
}
# for loop
for i := 0; i < 10; i++ {
	doSomething
}
for index, value := range(arr){  
}
for key, value := range(Map){
}
```
### 5. 函数
```go
func funcName(param1 Type1, param2 Type2, ...) (return1 Type3, ...) {
    return // 可以给返回值命名 简化return
}
```
### 6. Error & Panic
```go
// 常见用法
_, err := os.Open("filename.txt")
if err != nil {
}
// 自定义错误
errors.New("error: name is null")
// 异常处理，在函数体内使用defer
defer func() {
  if r := recover(); r != nil {
    fmt.Println("Some error happened!", r)
    ret = -1
}
```
### 7. 面向对象
- 结构体
```go
type Student struct {
	name string
	age  int
}
// 成员函数：函数头增加一个实例名称以及实例的指针类型
func (stu *Student) hello(person string) string {
}
// 实例化方法1
stu := &Student{
		name: "Tom",
}
// 实例化方法2
stu2 := new(Student)
```
- 接口
```go
// 定义了一组方法的集合
type Person interface {
	getName() string
}
// 实例转换为接口
var p Person = &Student{
  name: "Tom",
  age:  18,
}
// 检测实例是否实现了接口的方法（不调用相关转换函数的话不检测）
var _ Person = (*Student)(nil)
// 空接口可以表示任意类型
m := make(map[string]interface{}) // 该字典value可以为任何类型
```
### 8. 并发编程
- Sync
```go
var wg sync.WaitGroup
// 类似pv操作
wg.Add(1)
wg.Done()
// 使用go func启用协程，wait函数等待所有的协程执行结束
wg.Wait()
```
- Channel(类似python中的yield)
```go
var ch = make(chan string, 10) // 创建大小为 10 的缓冲信道
ch <- url // 将 url 发送给信道
msg := <-ch // 等待信道返回消息。
```

