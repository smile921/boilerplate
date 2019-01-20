## 设置

1. 默认设置 `scrapy/settings/default_setting.py`
2. 命令级别
3. 项目级别: `<project_name>/settings.py`
4. 爬虫设置; `custom_settings`
5. 命令行: `-s`
6. `unset http_proxy`



## 中文编码

* `FEED_EXPORT_ENCODING = 'utf-8'`
* `response.body.decode('utf-8')`
* `json.dumps(dict(item), ensure_ascii=False).encode('utf-8')`


## pipeline

* `scrapy.pipelines.images.ImagesPipeline`


## Item

* `process_item()`
* `DropItem`
* `open_spider()`
* `close_spider()`


## extension