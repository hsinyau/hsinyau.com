---
title: MySQL 学习笔记
tag: 笔记本
created: 2019-09-18
summary: 本文介绍了数据库和表的操作，包括创建数据库和表、删除数据库和表、复制表、修改表结构等操作。此外，还涉及到数据完整性的概念和使用SQL语句为表创建和删除约束的方法。同时，还介绍了数据的插入、更新和删除操作。
---

## MySQL 的存储引擎

在 MySQL 这种关系型数据库来说，数据是以表的方式来存储的，因此，简单点来说，存储引擎就是存储和操作此表的类型。

### 存储引擎的种类

`InnoDB` 存储引擎：`事务型`数据库引擎，提供了`事务`、`回滚`、`崩溃修复`能力、`多版本并发控制的事务安全`。在`MySQL 5.5版本开始`成为默认存储引擎。

`MyISAM` 存储引擎：MyISAM 存储引擎是 MySQL 中常见的存储引擎，是`MySQL 5.0之前`版本的`默认`存储引擎。`不支持事务`。

`MEMORY` 存储引擎：MEMORY 存储引擎是 MySQL 中的一个特殊的存储引擎。所有数据放在`内存`中，拥有极高的`插入`、`更新`、`查询效率`。会占用与数据量成正比的内存空间。MySQL`重启后数据会丢失`。

## MySQL 数据类型

| 分类 | 数据类型 | 范例格式 |
| --- | --- | --- |
| 整型 | int | 100 |
| 浮点型 | double | 9.9 |
| 字符串型 | varchar (20) | ‘云南省昆明市’ |
| 日期类型 | date | ‘2019-09-09’ |
| datetime (timestamp) |  | ‘2019-09-09 10:20:30’ |

## MySQL 数据类型属性

| 属性名称 | 作用 | 使用的数据类型范 |
| --- | --- | --- |
| PRIMARY KEY | 主键，确保该行的唯一性。（常与 AUTO_INCREMENT合用） | 所有数据类型 |
| AUTO_INCREMENT | 为新插入的行赋上唯一的整数标识符。 | 整数（如ID） |
| UNIQUE | 确保该列所有值都不同。(NULL值可以重复) | 所有数据类型 |
| NOT NULL | 不允许该列为NULL。 —>null 表示该列不存在值 | 所有数据类型 |
| NULL | 允许该列为NULL。 | 所有数据类型 |
| ZEROFILL | 用0填充剩余字段空间，如INT类型的表示为： 0000000008 | 所有数据类型 |
| BINARY | 对字符串以区分大小写的方式排序。（按照ASCII 表） | CHAR, VARCHAR |
| DEFAULT | 在没有任何值的情况下，赋予某个常量。 | BLOB和TEXT列不可用 |
| INDEX | 为该列创建一个索引。（有序的键值组） | 所有数据类型 |
| NATIONAL | 确保该列使用默认字符集。 | CHAR, VARCHAR |

---

## 数据库和表操作

创建数据库

```sql
create database 数据库名称;
```

注意事项：

information_schema是MySQL自带的数据库，存储MySQL服务器管理的信息；

mysql是MySQL的系统数据库；

test是用户学习和测试练习使用的数据库；

MySQL中的数据库名称不能超过64字符，不能由纯数字组成，不能包含：“/”、“:”、“\*”、“?”、“>”、"\<" 等符号；

如果要创建的数据库名称已经存在，也会发生错误。（可以用”if exists 数据库名称 ”来判断是否存在，以避免发生错误）。Eg:

```sql
-- 判断student数据库存在就删除
drop database if exists student;
-- 重新创建student数据库
create database student;
-- 创建数据库后，如果需要使用数据库，使用：”use 数据库名；”如：use student;
```

### 删除数据库

```sql
drop database 数据库名称；
```

```sql
Eg： drop database user; -- 删除了名叫“user”的数据库；
drop database if exists user; -- 也可以用if exists做判断，避免发生错误；
```

### 创建表

```sql
create table 表名(
  字段名称1 数据类型 [ null / not null ] [ DEFAULT 默认值 ] [ AUTO_INCREMENT ] [ PRIMARY_KEY ] [ COMMENT ‘注释内容’ ] ,
......
  字段名称N 数据类型 [ null / not null ] [ DEFAULT 默认值 ] [ AUTO_INCREMENT ] [ PRIMARY_KEY ] [ COMMENT ‘注释内容’ ]
);
```

```sql
Eg:
drop table if exists teacher ; -- 首先判断是否存在teacher表，如果存在就删除
create table teacher(
  id int not null auto_increment primary key ,
  name varchar(20) not null
);
-- 创建了teacher表，里面有int、 name两个字段, 其中id是主键，非空，自增
-- 创建数据库后，如果需要使用数据库，使用：”use 数据库名；”如：use teacher;
```

### 删除表

```sql
drop table 表名;
```

```sql
Eg: drop table teacher;
或者删除多个表格： drop table teacher, student;
```

### 复制表

```sql
-- 完全复制的格式：
create table 表02 select * from 表01;
Eg: create table teacher02 select * from teacher;
-- 复制一张和teacher表完全一样的teacher02表；
```

```sql
-- 复制指定列的格式：
create table 表02 select 字段a，字段b，...... from 表01;
Eg: create table teacher02 select id, name from teacher;
-- 复制一张teacher02表，里面包含teacher表里的id，name；
```

```sql
-- 完全复制表结构（包括键key），但是不复制里面的内容，格式是：
create table 表02 like 表01;
Eg: create table teacher02 like teacher;
-- 复制一张teacher02表，其结构和teacher表相同，但没有teacher里的内容；
```

### 修改表

```sql
1. 增加字段：add
Eg: alter table teacher add age int null; -- 添加age列，int类型，可以为null；

2. 删除字段：drop
Eg: alter table teacher drop age; -- 删除age列；

3.修改字段：change
Eg: alter table teacher change name teacher_name varchar(30) not null;
-- 修改name列为teacher_name，varchar类型最大30个字符，不能为null；

4. 增加主键：add primary key()
Eg: alter table teacher add primary key(id); -- 设置id为主键（id是已有字段）；

5. 修改表名：rename to
Eg: alter table teacher rename to user; -- 把teacher表改名为user；
```

## 数据完整性

数据完整性的概念：确保数据正确性和一致性的机制。

域完整性：即列的完整性。如：年龄不能超过150岁，id不能为null。

实体完整性：即行的完整性。如：实体“张三”具有区别于实体“李四”的特征。

参照完整性：主关系表（被参照表）和从关系表（参照表）中数据的一致性。

用户定义完整性：用户根据具体需求来定义约束条件。

## 使用SQL语句为表创建和删除约束

如果要修改已创建的约束，最简单实用的方式就是先删除已有的约束，再建立同名的约束。

### 添加约束

```sql
格式：alter table 表名 add [constraint] [约束名称] 约束类型（约束内容[可多个字段]）;
```

### 主键约束

```sql
主键约束:
alter table user add constraint PK_user_id primary key(id);
-- 把user表的id添加主键约束，约束名称是PK_user_id。（PK是主键的简写）

设置联合主键的方式：
alter table user add primary key(id，name);
-- 设置了联合主键id和name； 补充： 在创建表的时候也可以直接设置主键约束。
```

#### 唯一约束

```sql
唯一约束：alter table 表名 add [constraint] unique(id);
```

#### 默认约束

```sql
默认约束：alter table 表名 alter column列名 set DEFAULT 默认值;
-- 默认值可以为常量或者为空（null）；
```

#### 检查约束

```sql
检查约束：（与SQL Server中的检查约束有语法区别）可以使用**枚举**。
Eg：create table student ( ...... sex **enum**(‘男’, ‘女’) not
null -- 学员性别 );
-- 默认值可以为常量或者为空（null）；
```

#### 外键约束

```sql
外键约束： 格式：alter table 表名 add constraint 约束名称 约束类型;
(外键约束简称为“FK”)
Eg：alter table student add constraint FK_student_class_classid foreign key (classid) references class(classid);
-- 为student表所在的班级字段classid设置了外键约束。

创建时设置外键：
create table student (
......
classid int not null, foreign key(classid) references class(classid)
-- 设置名称为classid的外键，指向class表的classid；
);
```

#### 设置级联操作

```sql
设置级联操作：
restrict和no action表示在子表有关联记录的情况下父表不能更新；
cascade 表示父表在更新或者删除时，同时更新或删除子表对应的记录；
set null 表示父表在更新或者删除时，子表对应的字段设置为null；

Eg：
(1).alter table student add constraint FK_student_class_classid foreign key (classid) references class(classid) on delete set null;
-- 如：删除class表中classid=1对应的字段时，student表中的classid字段的值设置为null

(2).alter table student add constraint FK_student_class_classid foreign key (classid) references class(classid) on delete set cascade;
-- 如：删除class表中classid=1对应的字段时，同时删除student表中所有classid=1的该行数据。
```

### 删除约束

```sql
语法：alter table 表名 drop [constraint] 约束名称;
-- constraint关键字可省略 -- 如果将表删除了，那么相关的约束也就删除了。

Eg01: alter table student drop primary key;
-- 存在一个主键约束，可用此操作；

Eg02: alter table student drop foreign key FK_class_student_id；
-- 删除外键
```

## 数据操作

### 插入数据

```sql
--（最常用）
-- 插入值的顺序必须与表中字段的顺序完全一致。
1. "insert...values"
语法：insert into 表名 values(值);

--插入一行数据
Eg01: insert into student values (1, ‘zhangsan’ );

--插入多行数据，用逗号隔开；
Eg02: insert into student values (2,‘jack’)，(3, ‘rose’);

补充：当插入的记录会引发主键或唯一约束冲突时，可以用 **on duplicate key update** 条件。
Eg: insert into student values (1, ‘mike’ ) **on duplicate key update id =10**;
-- 由于id是主键，id=1与上面zhangsan行冲突，所以自动把zhangsan的id设置为10，然后再把id=1的mike数据插入进去；

-- 按照每一列对应的值插入数据
2. ”insert...set”
语法：insert into 表名 set 列名1=值1, 列名2=值2,......;

--插入的数据是：id为5，姓名’abc’ 3）”insert...select”
-- 把从其他表查询到的数据插入到该表中，类似于like属性 Eg01: insert into user
Eg01: insert into student set id =5, name=’abc’;

--把从student中查询到的数据插入到user中；
select * from student;
```

### 更新数据

```sql
格式：update 表名 set 列名1=值1 [,列名2=值2,......] [where...] [order by...] [limit 行数]
--把id=3的列的name改为wangwu；
eg： update student set name = 'wangwu' where id = 003;
```

### 删除数据

```sql
格式：delete from 表名 where 列名=值；
--删除id＝３的列的数据。
eg：delete from student where id=3；
```

---

## 连接查询

在数据库中join操作被称为连接，作用是能连接多个表的数据（通过连接条件），从多个表中获取数据合并在一起作为结果集返回给客户端。

### 交叉连接

交叉连接：将两张表的数据与另外一张表彼此交叉

```sql
select * from 表1 cross join 表2
eg：
select class.cname, student.sname from student cross join class on class.cid =
student.classid;
--其中的on代表两个表的连接条件
```

### 内连接

```sql
方式一：
select * from 表1,表2 where 表1.列=表2.列
方式二：
select * from 表1
inner join 表2 on 表1.列=表2.列
```

### 外连接

左连接: 左连接基础语法是 `a left outer join b` ，其中的 `outer` 可以省略，与内连接相比就是在与内连接相同条件下，在内连接的结果集中添加`a`表在`b`表中找不到匹配的记录，换句话说就是，结果集中会包含`a`表中的所有记录，如果`b`表中有匹配的记录就出现在结果集，否则使用 `NULL` 代替，也就是把`a`表看成根本，不可缺失记录。

```sql
select * from 表1
left join 表2 on 表1.列=表2.列
```

右连接: 右外连接基础语法是 `a right outer join b` ，其中的 `outer` 可以省略，与内连接相比就是在与内连接相同条件下，在内连接的结果集中添加b表在a表中找不到匹配的记录，换句话说就是，结果集中会包含b表中的所有记录，如果a表中有匹配的记录就出现在结果集，否则使用 NULL 代替，也就是把b表看成根本，不可缺失记录，作用与左外连接恰好相反。

```sql
select * from 表1
right join 表2 on 表1.列=表2.列
```

自连接: 自连接就是表与它自身相关联，进行自连接时通过给表起不同的别名来区分一个表的两个实例。

```sql
select 表.字段1,表.字段2,表.字段3
from 表1 as 别名,表2 as 别名
where 别名.字段2=别名2.字段3；
```

## 子查询

子查询指嵌套在查询内部，且必须始终出现在圆括号。子查询可以包含多个关键字或条件，如 `DISTINCT`、`GROUP BY`、`ORDER BY`、`LIMIT`、`函数`等。

子查询的外层查询可以是：`SELECT`，`INSERT`，`UPDATE`，`SET` 或 `DO`。

子查询可以返回标量，一行，一列或子查询。

### 将子查询作为派生表

```sql
select * from 表1 where 字段1 = （select 字段2 from 表2）;
```

### 把子查询用在 where 子句中

```sql
eg：
select ename,sal from emp where sal>(select avg(sal) form emp);
```

### 在 from 语句中使用子查询

```sql
eg：
select t.deptno,t.avgsal,s.grade
from (select deptno,avg(sal) as avgsal from emp group by deptno) t
join salgrade s
on t.avgsal between s.losal and s.hisal;
```

## 集合操作(UNION)

union 作用：合并查询结果集

```sql
Eg：
select ename,job from emp where job='manager'
union
select ename,job from emp where job='salesman';
```

**limit**

```sql
limit 起始下标，长度
如果起始下标没有指定，默认从0开始，0表示表中第一条记录。
Eg：
--按照工资降序排列取前5个
select ename,sal from emp order by sal desc limit 5;
```

通用的分页 SQL(只适用于 mysql 数据库管理系统)

```sql
select t.* from t
order by t.x desc/asc
limit (pageNo-1)*pageSize,pageSize;
```

---

## 视图

视图本身是一张虚拟表，不存放任何数据。在使用 SQL 语句访问视图的时候，获取的数据是 MySQL 从其它表中生成的，视图和表在同一个命名空间。视图查询数据相对安全，视图可以隐藏一些数据和结构，只让用户看见权限内的数据，使复杂的查询易于理解和使用。

**视图用法**

```sql
-- 基本语法
CREATE OR REPLACE VIEW view_name
AS select_statement
注意事项：表和视图共享数据库中相同的名称空间，因此，数据库不能包含具有相同名称的表和视图。
```

**视图调用**

和 MySQL 的表查询基本一致，可以使用各种查询条件。

```sql
SELECT * FROM user_order_view WHERE user_name='Cicada';
```

**查看视图**

```sql
SHOW CREATE VIEW user_order_view ;
```

**修改视图**

```sql
ALTER VIEW view_name AS select_statement ;
```

**删除视图**

```sql
DROP VIEW [IF EXISTS] view_name ;
```

**视图更新**

在指定条件允许的情况下，可以通过在视图上操作更新，删除，甚至写入数据，进而更新视图所涉及的相关表。

```sql
UPDATE user_order_view SET user_name='smile' WHERE id='1';
```

如果视图定义时使用聚合函数，分组等特殊操作，则无法更新。

MySQL 不支持在视图上创建触发器。

**注意事项**

MySQL 并不支持在视图中创建索引，使用视图的时候可能会引发很多查询性能问题。

## 索引

**索引的优缺点**

优点

- 索引大大减小了服务器需要扫描的数据量
- 索引可以帮助服务器避免排序和临时表
- 索引对于InnoDB（对索引支持行级锁）非常重要，因为它可以让查询锁更少的元组。

缺点

- 虽然索引大大提高了查询速度，同时却会降低更新表的速度，如对表进行INSERT、UPDATE和DELETE。因为更新表时，MySQL不仅要保存数据，还要保存索引文件。
- 建立索引会占用磁盘空间的索引文件。
- 如果某个数据列包含许多重复的内容，为它建立索引就没有太大的实际效果。
- 对于非常小的表，大部分情况下简单的全表扫描更高效；

**索引创建语法**

```sql
-- 普通索引
CREATE index index1 on student (id);

-- 唯一索引
CREATE UNIQUE INDEX index2 on student(id);

-- 全文索引
CREATE FULLTEXT INDEX index3 on student(adress(20));

-- 创建单列索引
CREATE INDEX INDEX5 on student(name(10));

-- 联合索引
CREATE INDEX INDEX6 ON student (name,id);

-- 普通索引
ALTER TABLE student ADD INDEX index1(id);

-- 唯一索引
ALTER TABLE student ADD UNIQUE INDEX index2(id);

-- 全文索引
ALTER TABLE student add FULLTEXT INDEX index3 (NAME(20));

-- 单列索引
ALTER TABLE student ADD INDEX index4 (adress(20));

-- 联合索引
ALTER TABLE student ADD INDEX INDEX5 (name,id);
```

---

## MySQL 触发器

**触发器定义与用法实例**

语法

```sql
--触发器必须有名字，最多64个字符，可能后面会附有分隔符.它和MySQL中其他对象的命名方式基本相象.
CREATE TRIGGER 触发器名称
--触发器有执行的时间设置：可以设置为事件发生前或后。
{ BEFORE | AFTER }
--同样也能设定触发的事件：它们可以在执行insert、update或delete的过程中触发。
{ INSERT | UPDATE | DELETE }
--触发器是属于某一个表的:当在这个表上执行插入、 更新或删除操作的时候就导致触发器的激活. 我们不能给同一张表的同一个事件安排两个触发器。
ON 表名称
--触发器的执行间隔：FOR EACH ROW子句通知触发器 每隔一行执行一次动作，而不是对整个表执行一次。
FOR EACH ROW
--触发器包含所要触发的SQL语句：这里的语句可以是任何合法的语句， 包括复合语句，但是这里的语句受的限制和函数的一样。
<触发器SQL语句>
```

实例准备工作

```sql
-- 创建表tab1
DROP TABLE IF EXISTS tab1;
CREATE TABLE tab1(
  tab1_id varchar(11)
);
-- 创建表tab2
DROP TABLE IF EXISTS tab2;
CREATE TABLE tab2(
  tab2_id varchar(11)
);
```

- 实例1：新增一条，触发另外一张表的新增

```sql
-- 创建触发器:t_afterinsert_on_tab1
-- 作用：增加tab1表记录后自动将记录增加到tab2表中
DROP TRIGGER IF EXISTS t_afterinsert_on_tab1;
CREATE TRIGGER t_afterinsert_on_tab1
AFTER INSERT ON tab1
FOR EACH ROW
BEGIN
   insert into tab2(tab2_id) values(new.tab1_id);
END;
-- 测试一下
INSERT INTO tab1(tab1_id) values('0001');
-- 看看结果
SELECT * FROM tab1;
SELECT * FROM tab2
```

- 实例2：删除一条，触发另外一张表的删除

```sql
-- 创建触发器:t_afterdelete_on_tab1
-- 作用：删除tab1表记录后自动将tab2表中对应的记录删去
DROP TRIGGER IF EXISTS t_afterdelete_on_tab1;
CREATE TRIGGER t_afterdelete_on_tab1
AFTER DELETE ON tab1
FOR EACH ROW
BEGIN
   delete from tab2 where tab2_id=old.tab1_id;
END;
-- 测试一下
DELETE FROM tab1 WHERE tab1_id='0001';
-- 看看结果
SELECT * FROM tab1;
SELECT * FROM tab2;
```

- 实例3：更新一条，触发另外一张表的更新

```sql
-- 创建触发器:t_afterupdate_on_tab1
-- 作用：修改tab1表记录后自动将tab2表中对应的记录更新
DROP TRIGGER IF EXISTS t_afterupdate_on_tab1;
CREATE TRIGGER t_afterupdate_on_tab1
AFTER UPDATE ON tab1
FOR EACH ROW
BEGIN
   update tab2 set tab2_id=new.tab1_id where tab2_id=old.tab1_id;
END;
-- 测试一下
update tab1 set tab1_id='0002' WHERE tab1_id='0001';
-- 看看结果
SELECT * FROM tab1;
SELECT * FROM tab2;
```

## 课后习题

1. 在 product 表上分别创建 BEFORE INSERT 、 AFTER UPDATE 和 AFTER DELETE 3 个触发器，触发器名称分别为 product_bf_insert 、 product_af_update 和 product_af_del 。执行语句部分都是向 operate 表插入操作方法和操作时间。

2. 对 product 表分别执行 INSERT 、 UPDATE 和 DELETE 操作

3. 删除 product_bf_insert 和 product_af_update 这两个触发器

**题解代码**

建立 operate 和 product 表 并向 product 表中插入数据

```sql
-- 建表 operate
DROP TABLE IF EXISTS `operate`;
CREATE TABLE `operate` (
  `Op_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `Op_type` varchar(20) NOT NULL COMMENT '操作方式',
  `Op_time` time NOT NULL COMMENT '操作时间',
  PRIMARY KEY (`Op_id`),
  UNIQUE KEY `Op_id` (`Op_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 建表 product
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(10) NOT NULL COMMENT '产品编号',
  `Name` varchar(20) NOT NULL COMMENT '产品名称',
  `Function` varchar(50) DEFAULT NULL COMMENT '产品功能',
  `Company` varchar(20) NOT NULL COMMENT '生产厂家',
  `Address` varchar(20) DEFAULT NULL COMMENT '家庭住址',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 插入数据
INSERT INTO product(id,`NAME`,`Function`,Company,Address) VALUES
	(1,'Strawberry','通便','中国','北京'),
	(2,'Watermelon','利尿','中国','杭州'),
	(3,'cherry','养颜驻容','中国','深圳');
```

触发器的创建

```sql
-- 创建 BEFORE INSERT 触发器
CREATE TRIGGER product_bf_insert
BEFORE INSERT on product
FOR EACH ROW
INSERT INTO operate VALUES(NULL,'数据插入成功！',TIME(NOW()));

-- 插入数据
INSERT INTO product(id,`NAME`,`Function`,Company,Address) VALUES
	(4,'peach','补益气血，养阴生津','中国','北京');

-- 创建 AFTER UPDATE 触发器
CREATE TRIGGER product_af_update
AFTER UPDATE on product
FOR EACH ROW
INSERT INTO operate VALUES(NULL,'数据更新成功！',TIME(NOW()));

-- 更新数据
UPDATE product SET Address='北京海淀区' WHERE id=1;

-- 创建 AFTER DELETE 触发器
CREATE TRIGGER product_af_del
AFTER DELETE on product
FOR EACH ROW
INSERT INTO operate VALUES(NULL,'数据删除成功！',TIME(NOW()));

-- 删除数据
DELETE FROM product WHERE id=4;
```

删除触发器

```sql
-- 删除 product_bf_insert 和 product_af_update 触发器
DROP TRIGGER product_bf_insert;
DROP TRIGGER product_af_update;
```

---

## 存储过程

存储程序是被存储在服务器中的组合SQL语句，经编译创建并保存在数据库中，用户可通过存储过程的名字调用执行。存储过程核心思想就是数据库SQL语言层面的封装与重用性。使用存储过程可以较少应用系统的业务复杂性，但是会增加数据库服务器系统的负荷。

**基本语法**

```sql
CREATE PROCEDURE sp_name ([proc_parameter[,...]])
    [characteristic ...] routine_body
```

**案例**

```sql
-- 查询学生表中性别为男的学生总数
CREATE PROCEDURE u_pro(IN v_sex VARCHAR(5) CHARACTER SET utf8 ,OUT num INT)
  BEGIN
  SELECT COUNT(*) INTO num FROM student WHERE v_sex=sex;
end

CALL u_pro('男',@num);
SELECT @num;
```

```sql
-- 计算1+到n的值
CREATE PROCEDURE addresult(IN n INT)
BEGIN
  DECLARE i INT;
  DECLARE sum INT;
  SET sum =0;
  SET i =1;

  WHILE i<n DO
  SET sum=sum+i;
  SET i=i+1;
  END WHILE;

  SELECT sum ;
END

call addresult(50);
```

```sql
-- 计算1+到n的值
CREATE PROCEDURE addresult2(in n INT,out sum INT)
BEGIN
  DECLARE i INT;
  DECLARE sum INT;
  SET sum =0;
  SET i =1;

  WHILE i<n DO
  SET sum=sum+i;
  SET i=i+1;
  END WHILE;

  SELECT sum ;
END

call addresult2(50,@sum);
```

```sql
-- 判断变量
CREATE PROCEDURE user_main_pro3(INOUT v_id INT)
BEGIN
  # 定义变量
  DECLARE v_count INT(11);
  # 判断
  IF v_id > 3 THEN
     SET v_count = 100;
  ELSE
     SET v_count = 500;
  END IF;
  # 返回赋值
  SET v_id = v_count;
END

SET @v_id=1;
call user_main_pro3(@v_id);
SELECT @v_id;
```

## 事务处理

注意点：MySQL中Innodb支持事务，而MyISAM不支持事务

事务的特性

1. 原子性（Atomicity）：事务开始后的所有操作，要么全部做完，要么全部不做。事务执行过程中出错，会回滚到事务开始前的状态，所有的操作就像没有发生一样。

2. 一致性（Consistency）：事务开始前和结束后，数据库的完整性约束没有被破坏 。比如A向B转账，不可能A扣了钱，B却没收到。

3. 隔离性（Isolation）：同一时间，只允许一个事务请求同一数据，不同的事务之间彼此没有任何干扰。比如A正在从一张银行卡中取钱，在A取钱的过程结束前，B不能向这张卡转账。

4. 持久性（Durability）：事务完成后，事务对数据库的所有更新将被保存到数据库，不能回滚。

并发问题

1. 脏读：事务A读取了事务B更新的数据，然后B回滚操作，那么A读取到的数据是脏数据
2. 不可重复读：事务 A 多次读取同一数据，事务 B 在事务A多次读取的过程中，对数据作了更新并提交，导致事务A多次读取同一数据时，结果 不一致。
3. 幻读：系统管理员A将数据库中所有学生的成绩从具体分数改为ABCDE等级，但是系统管理员B就在这个时候插入了一条具体分数的记录，当系统管理员A改结束后发现还有一条记录没有改过来，就好像发生了幻觉一样，这时就叫幻读。

**注:不可重复读的和幻读很容易混淆，不可重复读侧重于修改，幻读侧重于新增或删除。解决不可重复读的问题只需锁住满足条件的行，解决幻读需要锁表。**

事务隔离级别

| 事务隔离级别 | 脏读 | 不可重复读 | 幻读 |
| --- | --- | --- | --- |
| 读未提交（read-uncommitted） | 是 | 是 | 是 |
| 不可重复读（read-committed） | 否 | 是 | 是 |
| 可重复读（repeatable-read） | 否 | 否 | 是 |
| 串行化（serializable） | 否 | 否 | 否 |

设置隔离级别

```sql
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
```

注意：只有增删改语句才支持事务。

---

## MySQL常用函数整理

**数学函数**

1. `ABS(x)` 返回 x 的绝对值
2. `BIN(x)` 返回 x 的二进制（ OCT 返回八进制， HEX 返回十六进制）
3. `CEILING(x)` 返回大于 x 的最小整数值
4. `EXP(x)` 返回值 e（自然对数的底）的 x 次方
5. `FLOOR(x)` 返回小于 x 的最大整数值
6. `GREATEST(x1,x2,...,xn)` 返回集合中最大的值
7. `LEAST(x1,x2,...,xn)` 返回集合中最小的值
8. `LN(x)` 返回 x 的自然对数
9. `LOG(x,y)` 返回 x 的以 y 为底的对数
10. `MOD(x,y)` 返回 x/y 的模（余数）
11. `PI()` 返回 pi 的值（圆周率）
12. `RAND()` 返回０到１内的随机值 ,可以通过提供一个参数 (种子 )使 RAND() 随机数生成器生成一个指定的值。
13. `ROUND(x,y)` 返回参数 x 的四舍五入的有 y 位小数的值
14. `SIGN(x)` 返回代表数字 x 的符号的值
15. `SQRT(x)` 返回一个数的平方根
16. `TRUNCATE(x,y)` 返回数字 x 截短为 y 位小数的结果

**聚合函数**: 常用于 GROUP BY 从句的 SELECT 查询中

1. `AVG(col)` 返回指定列的平均值
2. `COUNT(col)` 返回指定列中非 NULL 值的个数
3. `MIN(col)` 返回指定列的最小值
4. `MAX(col)` 返回指定列的最大值
5. `SUM(col)` 返回指定列的所有值之和
6. `GROUP_CONCAT(col)` 返回由属于一组的列值连接组合而成的结果

**字符串函数**

1. `ASCII(char)` 返回字符的 ASCII 码值
2. `BIT_LENGTH(str)` 返回字符串的比特长度
3. `CONCAT(s1,s2...,sn)` 将 s1,s2…,sn 连接成字符串
4. `CONCAT_WS(sep,s1,s2...,sn)` 将 s1,s2…,sn 连接成字符串，并用 sep 字符间隔
5. `INSERT(str,x,y,instr)` 将字符串 str 从第 x 位置开始，y 个字符长的子串替换为字符串 instr, 返回结果
6. `FIND_IN_SET(str,list)` 分析逗号分隔的 list 列表，如果发现 str，返回 str 在 list 中的位置
7. `LCASE(str) 或 LOWER(str)` 返回将字符串 str 中所有字符改变为小写后的结果
8. `LEFT(str,x)` 返回字符串 str 中最左边的 x 个字符
9. `LENGTH(s)` 返回字符串 str 中的字符数
10. `LTRIM(str)` 从字符串 str 中切掉开头的空格
11. `POSITION(substr,str)` 返回子串 substr 在字符串 str 中第一次出现的位置
12. `QUOTE(str)` 用反斜杠转义 str 中的单引号
13. `REPEAT(str,srchstr,rplcstr)` 返回字符串 str 重复 x 次的结果
14. `REVERSE(str)` 返回颠倒字符串 str 的结果
15. `RIGHT(str,x)` 返回字符串 str 中最右边的 x 个字符
16. `RTRIM(str)` 返回字符串 str 尾部的空格
17. `STRCMP(s1,s2)` 比较字符串 s1 和 s2
18. `TRIM(str)` 去除字符串首部和尾部的所有空格
19. `UCASE(str)` 或 `UPPER(str)` 返回将字符串 str 中所有字符转变为大写后的结果

**日期和时间函数**

1. `CURDATE() 或 CURRENT_DATE()` 返回当前的日期
2. `CURTIME() 或 CURRENT_TIME()` 返回当前的时间
3. `DATE_ADD(date,INTERVAL int keyword)` 返回日期 date 加上间隔时间 int 的结果
    - (int 必须按照关键字进行格式化 ), 如：`SELECT DATE_ADD(CURRENT_DATE,INTERVAL 6 MONTH);`
4. `DATE_FORMAT(date,fmt)` 依照指定的 fmt 格式格式化日期 date 值
5. `DATE_SUB(date,INTERVAL int keyword)` 返回日期 date 加上间隔时间 int 的结果
    - (int 必须按照关键字进行格式化 ),如： `SELECT DATE_SUB(CURRENT_DATE,INTERVAL 6 MONTH);`
6. `DAYOFWEEK(date)` 返回 date 所代表的一星期中的第几天 (1~7)
7. `DAYOFMONTH(date)` 返回 date 是一个月的第几天 (1~31)
8. `DAYOFYEAR(date)` 返回 date 是一年的第几天 (1~366)
9. `DAYNAME(date)` 返回 date 的星期名，如： `SELECT DAYNAME(CURRENT_DATE);`
10. `FROM_UNIXTIME(ts,fmt)` 根据指定的 fmt 格式，格式化 UNIX 时间戳 ts
11. `HOUR(time)` 返回 time 的小时值 (0~23)
12. `MINUTE(time)` 返回 time 的分钟值 (0~59)
13. `MONTH(date)` 返回 date 的月份值 (1~12)
14. `MONTHNAME(date)` 返回 date 的月份名，如： `SELECT MONTHNAME(CURRENT_DATE);`
15. `NOW()` 返回当前的日期和时间
16. `QUARTER(date)` 返回 date 在一年中的季度 (1~4) ，如 `SELECT QUARTER(CURRENT_DATE);`
17. `WEEK(date)` 返回日期 date 为一年中第几周 (0~53)
18. `YEAR(date)` 返回日期 date 的年份 (1000~9999)

一些示例：

```sql
-- 返回当前时间
SELECT FROM_UNIXTIME(UNIX_TIMESTAMP());

SELECT EXTRACT(YEAR_MONTH FROM CURRENT_DATE);

SELECT EXTRACT(DAY_SECOND FROM CURRENT_DATE);

SELECT EXTRACT(HOUR_MINUTE FROM CURRENT_DATE);

-- 返回两个日期值之间的差值(月数)
SELECT PERIOD_DIFF(200302,199802);

-- 返回当前日期和生日之间的年龄 这样，如果 Brithday 是未来的年月日的话，计算结果为 0。
SELECT DATE_FORMAT(FROM_DAYS(TO_DAYS(NOW())-TO_DAYS(birthday)),'%Y')+0 AS age FROM employee;

-- 下面的 SQL 语句计算员工的绝对年龄，即当 Birthday 是未来的日期时，将得到负值。
SELECT DATE_FORMAT(NOW(), '%Y') - DATE_FORMAT(birthday, '%Y') -(DATE_FORM AT(NOW(), '00-%m-%d') <DATE_FORMAT(birthday, '00-%m-%d')) AS age from employee;
```

**加密函数**

1. `AES_ENCRYPT(str,key)` 返回用密钥 key 对字符串 str 利用高级加密标准算法加密后的结果，调用 AES\_ENCRYPT 的结果是一个二进制字符串，以 BLOB 类型存储
2. `AES_DECRYPT(str,key)` 返回用密钥 key 对字符串 str 利用高级加密标准算法解密后的结果
3. `DECODE(str,key)` 使用 key 作为密钥解密加密字符串 str
4. `ENCRYPT(str,salt)` 使用 UNIXcrypt() 函数，用关键词 salt( 一个可以惟一确定口令的字符串，就像钥匙一样 ) 加密字符串 str
5. `ENCODE(str,key)` 使用 key 作为密钥加密字符串 str ，调用 ENCODE()的结果是一个二进制字符串，它以 BLOB类型存储
6. `MD5()` 计算字符串 str 的 MD5校验和
7. `PASSWORD(str)` 返回字符串 str 的加密版本，这个加密过程是不可逆转的，和UNIX密码加密过程使用不同的算法。
8. `SHA()` 计算字符串 str 的安全散列算法 (SHA)校验和

示例：

```sql
SELECT ENCRYPT('root','salt');

SELECT ENCODE('xufeng','key');

-- 加解密放在一起
SELECT DECODE(ENCODE('xufeng','key'),'key');

SELECT AES_ENCRYPT('root','key');

SELECT AES_DECRYPT(AES_ENCRYPT('root','key'),'key');

SELECT MD5('123456');

SELECT SHA('123456');
```

**控制流函数**

MySQL 有 4 个函数是用来进行条件操作的，这些函数可以实现 SQL 的条件逻辑，允许开发者将一些应用程序业务逻辑转换到数据库后台。

MySQL 控制流函数：

```sql
CASE WHEN[test1] THEN [result1]...ELSE [default] END
-- 如果 testN 是真，则返回 resultN，否则返回 default
```

```sql
CASE [test] WHEN[val1] THEN [result]...ELSE [default] END
--  如果 test 和 valN 相等，则返回 resultN ，否则返回 default
```

`IF(test,t,f)` 如果 test 是真，返回 t；否则返回 f

`IFNULL(arg1,arg2)` 如果 arg1 不是空，返回 arg1 ，否则返回 arg2

`NULLIF(arg1,arg2)` 如果 arg1=arg2 返回 NULL；否则返回 arg1

`IFNULL()` ，它有两个参数，并且对第一个参数进行判断。如果第一个参数不是 NULL，函数就会向调用者返回第一个参数；如果是 NULL,将返回第二个参数。

如：

```sql
SELECT IFNULL(1,2), IFNULL(NULL,10),IFNULL(4*NULL,'false');
```

**NULLIF()** 函数将会检验提供的两个参数是否相等，如果相等，则返回 NULL，如果不相等，就返回第一个参数。

如： SELECT NULLIF(1,1),NULLIF(‘A’,‘B’),NULLIF(2+3,4+1);

和许多脚本语言提供的 IF() 函数一样，MySQL 的 IF() 函数也可以建立一个简单的条件测试，这个函数有三个参数，第一个是要被判断的表达式，如果表达式为真，IF() 将会返回第二个参数，如果为假， IF() 将会返回第三个参数。

如：

```sql
SELECT IF(1 < 10,2,3),IF(56>100,'true','false');
```

**IF()** 函数在只有两种可能结果时才适合使用。然而，在现实世界中，我们可能发现在条件测试中会需要多个分支。在这种情况下， MySQL 提供了 **CASE** 函数，它和 PHP 及 Perl 语言的 switch-case 条件例程一样。

CASE函数的格式有些复杂，通常如下所示：

```sql
CASE [expression to be evaluated]
WHEN [val 1] THEN [result 1]
WHEN [val 2] THEN [result 2]
WHEN [val 3] THEN [result 3]
......
WHEN [val n] THEN [result n]
ELSE [default result]
END
```

这里，第一个参数是要被判断的值或表达式，接下来的是一系列的 WHEN-THEN 块，每一块的第一个参数指定要比较的值，如果为真，就返回结果。

所有的 WHEN-THEN 块将以 ELSE 块结束，当 END 结束了所有外部的 CASE 块时，如果前面的每一个块都不匹配就会返回 ELSE 块指定的默认结果。

如果没有指定 ELSE 块，而且所有的 WHEN-THEN 比较都不是真，MySQL 将会返回 NULL。

CASE函数还有另外一种句法，有时使用起来非常方便，如下：

```sql
WHEN [conditional test 1] THEN [result 1]
WHEN [conditional test 2] THEN [result 2]
ELSE [default result]
END
```

这种条件下，返回的结果取决于相应的条件测试是否为真。

示例：

```sql
SELECT CASE 'green' WHEN 'red' THEN 'stop' WHEN 'green' THEN 'go' END;

SELECT CASE 9 WHEN 1 THEN 'a' WHEN 2 THEN 'b' ELSE 'N/A' END;

SELECT CASE WHEN (2+2)=4 THEN 'OK' WHEN(2+2)<>4 THEN 'not OK' END ASST ATUS;

SELECT Name,IF((IsActive = 1),' 已激活 ',' 未激活 ') AS RESULT FROMUserLoginInfo;

SELECT fname,lname,(math+sci+lit) AS total,
  CASE WHEN (math+sci+lit) < 50 THEN 'D'
  WHEN (math+sci+lit) BETWEEN 50 AND 150 THEN 'C'
  WHEN (math+sci+lit) BETWEEN 151 AND 250 THEN 'B'
  ELSE 'A' END AS grade
FROM marks;

SELECT IF(ENCRYPT('sue','ts')=upass,'allow','deny') AS LoginResultFROM users WHERE uname = 'sue';
```

**格式化函数**

1. `DATE_FORMAT(date,fmt)` 依照字符串 fmt 格式化日期 date 值
2. `FORMAT(x,y)` 把 x 格式化为以逗号隔开的数字序列， y 是结果的小数位数
3. `INET_ATON(ip)` 返回 IP 地址的数字表示
4. `INET_NTOA(num)` 返回数字所代表的 IP 地址
5. `TIME_FORMAT(time,fmt)` 依照字符串 fmt 格式化时间 time 值
6. `FORMAT()` 它可以把大的数值格式化为以逗号间隔的易读的序列。

示例：

```sql
SELECT FORMAT(34234.34323432,3);

SELECT DATE_FORMAT(NOW(),'%W,%D %M %Y %r');

SELECT DATE_FORMAT(NOW(),'%Y-%m-%d');

SELECT DATE_FORMAT(19990330,'%Y-%m-%d');

SELECT DATE_FORMAT(NOW(),'%h:%i %p');

SELECT INET_ATON('10.122.89.47');

SELECT INET_NTOA(175790383);
```

**类型转化函数**

为了进行数据类型转化， MySQL 提供了 `CAST()` 函数，它可以把一个值转化为指定的数据类型。类型有： `BINARY`,`CHAR`,`DATE`,`TIME`,`DATETIME`,`SIGNED`,`UNSIGNED` .

示例：

```sql
SELECT CAST(NOW() AS SIGNED INTEGER),CURDATE()+0;

SELECT 'f'=BINARY 'F','f'=CAST('F' AS BINARY);
```

**系统信息函数**

1. `DATABASE()` 返回当前数据库名
2. `BENCHMARK(count,expr)` 将表达式 expr 重复运行 count 次
3. `CONNECTION_ID()` 返回当前客户的连接 ID
4. `FOUND_ROWS()` 返回最后一个 SELECT 查询进行检索的总行数
5. `USER()` 或 `SYSTEM_USER()` 返回当前登陆用户名
6. `VERSION()` 返回 MySQL 服务器的版本

示例：

```sql
SELECT DATABASE(),VERSION(),USER();

SELECT BENCHMARK(9999999,LOG(RAND()*PI()));
-- 该例中 ,MySQL 计算 LOG(RAND()*PI()) 表达式 9999999 次。
```
