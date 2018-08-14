## 新的日期和时间API

### 概述
源码位置：rt.jar 下面 java.time 包，常用类：
- Clock
- DateTimeException
- DayOfWeek
- Duration
- Instant
- LocalDate
- LocalDateTime
- LocalTime
- Month
- MonthDay
- OffsetDateTime
- OffsetTime
- Period
- Ser
- Year
- YearMonth
- ZonedDateTime
- ZoneId
- ZoneOffset
- ZoneRegion

下属包：
- chrono
- format
- temporal
- zone

## 常用类

### Instant 时间线

一个 Instant 对象表示时间轴上的一个点。 元点被规定为 1970年1月1日的午夜。

### LocalDate 本地日期

本地日期/时间 表示一个日期或（一天中的）某个时间
LocalDate today= LocalDate.now()

### TemporalAdjusters 日期校正器

### LocalTime 本地时间

### ZonedDateTime 带时区的时间

## 其他

### 格式化和解析

[http://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html](http://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)

DateTimeFormatter 类提供了三种格式化方法来打印日期/时间
- 预定义的标准格式
- 语言环境相关的格式
- 自定义的格式

formatter=DateTimeFormatter.ofPattern("yyyy-MM-dd")

### 与遗留代码互操作
作为一个全新的API，Java 日期和时间API不得不和已有的类之间互操作

- java.util.Date
- java.util.GregorianCalendar
- java.sql.Date/Time/TimeStamp

Instant 类类似与 java.util.Date 类， ZonedDateTime 类类似于java.util.GregorianCalendar.

|    新类   | 遗留类  | TO遗留类 | From遗留类 | 
| -------- | :-----: |  :----:  | :----: | 
| Instant| java.util.Date | Date.from(instant) |date.toInstant |
| ZonedDateTime | java.util.GregorianCalendar | GregorianCalendar.from(zonedDateTime ) |cal.toZonedDateTime  |
| Instant| java.sql.TimeStamp |TimeStamp.from(instant)  | timeStamp.toInstant|
| LocalDateTime| java.sql.TimeStamp |TimeStamp.valueOf(loocalDateTime)  | timeStamp.toLocalDateTime()|
| LocalDate| java.sql.Time |Date.valueOf(localDate)  |date.toLocalDate() |
| LocalTime| java.sql.Time |Time.valueOf(localDate)  |time.toLocalDate() |
| DateTimeFormatter| java.text.DateFormat | formatter.toFormat() | 无|
| java.util.TimeZone| ZoneId | TimeZone.getTimeZone(id) |timeZone.toZoneId() |
| java.nio.file.attribute.FileTime| Instant | FileTime.from(instant) | fileTime.toInstant|





