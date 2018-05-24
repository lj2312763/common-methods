# 积累公用方法
使用ES6语法
#

## jtools 积累的常规方法
#### findZhiShu [Function]
###### @param{Number}:num   求1-num以内的质数
###### @returns{String}   以','分隔开
#### get_primes [Function]
##### 参数
###### @param{Array}:arr   求1-num以内的质数
###### @returns{undefined|Array} 如果有质数则返回数组，没有则返回undefined
#### makeUID(num)
描述：使用生成函数制作不重复的key或者key，里面包含字母和数字，返回为字符串

#### 参数
##### @param{Number}:要创建ID或者key的字符长度
##### 调用方式 
             var uid=makeUID(16);
             var key=uid.next();
--------------------------------------------------------------------------
</br>
</br>
</br>

## Constrouctor 构造函数对象
###### 每一个文件都是一个构造函数，并且一个文件内只有一个构造函数，函数名为文件名
-----------------------------------------------------------------------------
</br>
</br>
</br>

## prototype 新增原型方法
###### Array.prototype.unique() 数组去重
###### Array.prototype.intersect(array) 数组交集
###### Array.prototype.Format(formart) 日期格式对象 format:'yyyy-MM-dd hh:mm:ss' 可以自定义格式






#Constrouctor 构造函数对象
###每一个文件都是一个构造函数，并且一个文件内只有一个构造函数，函数名为文件名



#prototype 新增原型方法
###Array.prototype.unique 数组去重
###Array.prototype.intersect 数组交集
###Array.prototype.Format 日期格式对象



