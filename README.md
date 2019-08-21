# netease-spa

> 基于vue框架的模仿网易云音乐web网站，利用[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)提供的api集成，UI框架VUE-ANT-DESIGN。

## 后端API

> 请移步到[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi),感谢大佬！

## 主要功能

+ 用户
   1.手机密码登录
   2.用户基本信息

+ 首页
   1.banner
   2.推荐歌单
   3.最新音乐
   4.推荐mv
   5.推荐电台节目

+ 排行榜
   1.各类排行榜
   2.排行榜详情页

+ mv
   1.mv详情页（播放mv，mv评论）

+ 歌单
   1.首页展示全部分类推荐歌单
   2.点击不同分类展示推荐歌单
   3.歌单详情页（单首播放/歌单加入播放列表）

+ 主播电台
   1.电台分类（点击展示分类推荐）
   2.精彩节目推荐
   3.精选电台
   4.今日优选
   5.电台台主详情页（单首节目播放/所有节目加入播放列表）

+ 歌手
   1.首页展示推荐歌手（入驻歌手10个+热门歌手20个）
   2.歌手分类
   3.歌手详情页（热门歌曲、mv、专辑、歌手简介）

+ 新碟上架
   1.最新专辑（12张）
   2.全部新碟（5页数据）
   3.专辑详情页（单首播放/专辑加入播放列表）

+ 我的音乐（需要登录）
   1.我创建的歌单
   2.我收藏的歌单
   3.歌单详情页（单首播放/歌单加入播放列表）
   4.每日推荐歌曲、歌单

+ 音乐详情页
   1.歌曲基本信息
   2.歌曲评论（可评论）
   3.相似歌曲推荐
   4.包含这首歌的歌单

+ 搜索
   1.歌曲搜索
   2.专辑搜索
   3.歌单搜索
   4.歌手搜索
   5.MV搜索

+ 播放器

+ 播放列表
   1.展示播放列表所有歌曲
   2.支持点击单首播放、删除
   3.当前播放歌曲根据专辑封面颜色自适应背景色高亮
   4.清空播放列表

+ 更多功能开发中...

## 播放器
> [音频播放器Aplayer](https://github.com/MoePlayer/APlayer)
> [视频播放器chimee](http://chimee.org/)

## NGINX部署

```
gzip  on;

gzip_types text/plain application/x-javascript application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;

location ~ /api/{
	rewrite ^/api/(.*)$ /$1 break;
	proxy_pass xxx(后端地址);
}
```

