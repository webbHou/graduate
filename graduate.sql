/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50527
Source Host           : localhost:3306
Source Database       : graduate

Target Server Type    : MYSQL
Target Server Version : 50527
File Encoding         : 65001

Date: 2017-05-19 20:07:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for guestbook
-- ----------------------------
DROP TABLE IF EXISTS `guestbook`;
CREATE TABLE `guestbook` (
  `cid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) unsigned DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `dateline` int(10) unsigned DEFAULT '0',
  `support` int(11) unsigned DEFAULT '0',
  `oppose` int(11) unsigned DEFAULT '0',
  PRIMARY KEY (`cid`),
  KEY `oppose` (`oppose`),
  KEY `uid` (`uid`),
  KEY `support` (`support`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of guestbook
-- ----------------------------
INSERT INTO `guestbook` VALUES ('1', '1', 'dddd', '1494818906', '0', '0');
INSERT INTO `guestbook` VALUES ('2', '1', 'dddd', '1494818973', '0', '0');
INSERT INTO `guestbook` VALUES ('3', '1', 'dddddsqqqq', '1494818980', '0', '0');
INSERT INTO `guestbook` VALUES ('4', '1', 'ddddaaaaaaaa', '1494819042', '0', '0');
INSERT INTO `guestbook` VALUES ('5', '1', 'aa', '1494819815', '0', '0');
INSERT INTO `guestbook` VALUES ('6', '1', 'dd', '1495155341', '0', '0');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `Nid` int(255) NOT NULL AUTO_INCREMENT COMMENT '新闻列表id',
  `title` varchar(255) CHARACTER SET gb2312 NOT NULL COMMENT '新闻标题',
  `content` text CHARACTER SET gb2312 NOT NULL COMMENT '新闻内容',
  `date` date NOT NULL COMMENT '新闻日期',
  PRIMARY KEY (`Nid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '习近平欢迎宴会上的祝酒辞', '今天，“一带一路”国际合作高峰论坛高级别会议成功举行，大家讨论热烈、成果丰硕。明天，我们将在雁栖湖畔举行圆桌峰会，共同规划“一带一路”建设合作大计。“一带一路”建设正站在新的起点上，开启新的征程。\r\n我们正走在一条充满希望的道路上。我相信，只要我们相向而行，心连心，不后退，不停步，我们终能迎来路路相连、美美与共的那一天。我相信，我们的事业会像古丝绸之路一样流传久远、泽被后代。', '2017-05-15');
INSERT INTO `news` VALUES ('2', '李克强会见金融机构负责人', '李克强指出，当前中国经济正处在转型升级过程中，既要改造传统产能，也要大力培育新动能。中国愿同世界银行加强合作，围绕培育新动能等问题开展共同研究，助力中国经济加快实现转型升级。\r\n金墉表示，世界银行同中国合作良好。世行高度赞赏中方积极推进医疗体制改革，这将为其他国家提供有益经验。世行对中方深化改革、加强科技创新、培育发展新动能的前景充满信心，愿同中方继续加强合作。', '2017-05-15');
INSERT INTO `news` VALUES ('3', '张高丽致辞', '张高丽说，习近平主席提出共建“一带一路”倡议以来，全球100多个国家和国际组织积极支持和参与，“一带一路”建设逐渐从理念转化为行动，从愿景转化为现实。习近平主席在“一带一路”国际合作高峰论坛开幕式上发表热情洋溢的讲话，描绘了“一带一路”建设的美好愿景和前进方向。要着力推动合作共赢，打造对话不对抗、结伴不结盟的伙伴关系，将“一带一路”建成和平之路；', '2017-05-15');
INSERT INTO `news` VALUES ('4', '辽宁遭暴雨侵袭致城市内涝 紧急转移12万人', '【环球网报道】此前，乌克兰媒体发布了一张乌克兰总统波罗申科小儿子身着“Russia”字样T恤的照片，引发很多乌克兰民众的不满与批判。俄罗斯卫星网5月15日报道称，波罗申科已就此事对自己的儿子进行了批评教育。', '2017-05-15');
INSERT INTO `news` VALUES ('5', '辽宁遭暴雨侵袭致城市内涝 紧急转移12万人', '【环球网报道】此前，乌克兰媒体发布了一张乌克兰总统波罗申科小儿子身着“Russia”字样T恤的照片，引发很多乌克兰民众的不满与批判。俄罗斯卫星网5月15日报道称，波罗申科已就此事对自己的儿子进行了批评教育。', '2017-05-15');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `pid` int(255) NOT NULL AUTO_INCREMENT COMMENT '作品id',
  `name` varchar(255) CHARACTER SET gb2312 NOT NULL COMMENT '作品名称',
  `author` varchar(30) CHARACTER SET gb2312 NOT NULL COMMENT '作者姓名',
  `teacher` varchar(10) CHARACTER SET gb2312 NOT NULL COMMENT '指导教师',
  `description` char(255) CHARACTER SET gb2312 NOT NULL COMMENT '作品描述',
  `honor` varchar(30) CHARACTER SET gb2312 NOT NULL COMMENT '作品奖项',
  `src` char(255) CHARACTER SET gb2312 NOT NULL COMMENT '作品链接',
  `type` enum('平面作品','音频作品','影视作品','3d与虚拟现实作品') CHARACTER SET gb2312 NOT NULL DEFAULT '平面作品' COMMENT '作品类型',
  `competition` varchar(255) CHARACTER SET gb2312 NOT NULL,
  `studio` varchar(255) CHARACTER SET gb2312 NOT NULL,
  `typeid` int(11) DEFAULT NULL COMMENT '类型id',
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', '出发 ', '侯江伟', '褚丹', '该作品是第七届大学生广告艺术大赛作品，荣获国家级平面类三等奖，运用夸张的手法体现出了产品的特色和定位。', '国家级三等奖', '/product/web/1.jpg,/product/web/2.jpg,/product/web/3.jpg', '平面作品', '大学生广告艺术大赛', '平面工作室', '1');
INSERT INTO `product` VALUES ('2', '出发 ', '侯江伟', '褚丹', '该作品是第七届大学生广告艺术大赛作品，荣获国家级平面类三等奖，运用夸张的手法体现出了产品的特色和定位。', '国家级三等奖', '/product/web/1.jpg', '平面作品', '大学生广告艺术大赛', '平面工作室', '1');
INSERT INTO `product` VALUES ('3', '出发 ', '侯江伟', '褚丹', '该作品是第七届大学生广告艺术大赛作品，荣获国家级平面类三等奖，运用夸张的手法体现出了产品的特色和定位。', '国家级三等奖', '/product/web/1.jpg', '音频作品', '大学生广告艺术大赛', '平面工作室', '2');
INSERT INTO `product` VALUES ('4', '出发 ', '侯江伟', '褚丹', '该作品是第七届大学生广告艺术大赛作品，荣获国家级平面类三等奖，运用夸张的手法体现出了产品的特色和定位。', '国家级三等奖', '/product/web/1.jpg', '平面作品', '大学生广告艺术大赛', '3d工作室', '1');
INSERT INTO `product` VALUES ('5', '出发 ', '侯江伟', '褚丹', '该作品是第七届大学生广告艺术大赛作品，荣获国家级平面类三等奖，运用夸张的手法体现出了产品的特色和定位。', '国家级三等奖', '/product/web/1.jpg', '音频作品', '大学生广告艺术大赛', '音频工作室', '2');
INSERT INTO `product` VALUES ('6', '出发 ', '侯江伟', '褚丹', '该作品是第七届大学生广告艺术大赛作品，荣获国家级平面类三等奖，运用夸张的手法体现出了产品的特色和定位。', '国家级三等奖', '/product/web/1.jpg', '影视作品', '大学生广告艺术大赛', '音频工作室', '3');
INSERT INTO `product` VALUES ('7', '出发 ', '侯江伟', '褚丹', '该作品是第七届大学生广告艺术大赛作品，荣获国家级平面类三等奖，运用夸张的手法体现出了产品的特色和定位。', '国家级三等奖', '/product/web/1.jpg', '平面作品', '大学生广告艺术大赛', '音频工作室', '1');
INSERT INTO `product` VALUES ('8', '出发 ', '侯江伟', '褚丹', '该作品是第七届大学生广告艺术大赛作品，荣获国家级平面类三等奖，运用夸张的手法体现出了产品的特色和定位。', '国家级三等奖', '/product/web/1.jpg', '平面作品', '大学生广告艺术大赛', '音频工作室', '1');
INSERT INTO `product` VALUES ('9', '出发 ', '侯江伟', '褚丹', '该作品是第七届大学生广告艺术大赛作品，荣获国家级平面类三等奖，运用夸张的手法体现出了产品的特色和定位。', '国家级三等奖', '/product/web/1.jpg', '音频作品', '大学生广告艺术大赛', '音频工作室', '2');
INSERT INTO `product` VALUES ('10', '出发 ', '侯江伟', '褚丹', '该作品是第七届大学生广告艺术大赛作品，荣获国家级平面类三等奖，运用夸张的手法体现出了产品的特色和定位。', '国家级三等奖', '/product/web/1.jpg', '3d与虚拟现实作品', '大学生广告艺术大赛', '音频工作室', '4');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `tid` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET gb2312 NOT NULL,
  `position` varchar(255) CHARACTER SET gb2312 NOT NULL,
  `description` text CHARACTER SET gb2312 NOT NULL,
  `type` enum('平面工作室','音频工作室','影视工作室','3d与虚拟现实工作室') CHARACTER SET gb2312 DEFAULT '平面工作室' COMMENT '所属工作室',
  `src` char(255) CHARACTER SET gb2312 DEFAULT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1', '侯江伟', '2013级数字媒体技术专业', '曾获大学生广告艺术大赛国家级平面类三等奖曾获大学生广告艺术大赛国家级平面类三等奖', '平面工作室', '/student/1.jpg');
INSERT INTO `student` VALUES ('2', '侯江伟', '2013级数字媒体技术专业', '曾获大学生广告艺术大赛国家级平面类三等奖', '平面工作室', '/student/1.jpg');
INSERT INTO `student` VALUES ('3', '侯江伟', '2013级数字媒体技术专业', '曾获大学生广告艺术大赛国家级平面类三等奖', '平面工作室', '/student/1.jpg');
INSERT INTO `student` VALUES ('4', '侯江伟', '2013级数字媒体技术专业', '曾获大学生广告艺术大赛国家级平面类三等奖', '平面工作室', '/student/1.jpg');
INSERT INTO `student` VALUES ('5', '侯江伟', '2013级数字媒体技术专业', '曾获大学生广告艺术大赛国家级平面类三等奖', '平面工作室', '/student/1.jpg');
INSERT INTO `student` VALUES ('6', '侯江伟', '2013级数字媒体技术专业', '曾获大学生广告艺术大赛国家级平面类三等奖', '平面工作室', '/student/1.jpg');
INSERT INTO `student` VALUES ('7', '侯江伟', '2013级数字媒体技术专业', '曾获大学生广告艺术大赛国家级平面类三等奖', '平面工作室', '/student/1.jpg');
INSERT INTO `student` VALUES ('8', '侯江伟', '2013级数字媒体技术专业', '曾获大学生广告艺术大赛国家级平面类三等奖', '平面工作室', '/student/1.jpg');
INSERT INTO `student` VALUES ('9', '侯江伟', '2013级数字媒体技术专业', '曾获大学生广告艺术大赛国家级平面类三等奖', '平面工作室', '/student/1.jpg');
INSERT INTO `student` VALUES ('10', '侯江伟', '2013级数字媒体技术专业', '曾获大学生广告艺术大赛国家级平面类三等奖', '平面工作室', '/student/1.jpg');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `tid` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET gb2312 NOT NULL,
  `position` varchar(20) CHARACTER SET gb2312 NOT NULL,
  `description` text CHARACTER SET gb2312 NOT NULL,
  `type` enum('平面工作室','音频工作室','影视工作室','3d与虚拟现实工作室') CHARACTER SET gb2312 DEFAULT '平面工作室' COMMENT '所属工作室',
  `src` varchar(255) CHARACTER SET gb2312 DEFAULT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('1', '褚丹', '高级讲师', '信息技术与传媒学院极教师，平面与网络工作室主要负责人。多次指导成员获得国家级奖项。', '平面工作室', '/teacher/1.jpg');
INSERT INTO `teacher` VALUES ('2', '褚丹', '高级讲师', '信息技术与传媒学院极教师，平面与网络工作室主要负责人。多次指导成员获得国家级奖项。', '平面工作室', '/teacher/1.jpg');
INSERT INTO `teacher` VALUES ('3', '褚丹', '高级讲师', '信息技术与传媒学院极教师，平面与网络工作室主要负责人。多次指导成员获得国家级奖项。', '平面工作室', '/teacher/1.jpg');
INSERT INTO `teacher` VALUES ('4', '褚丹', '高级讲师', '信息技术与传媒学院极教师，平面与网络工作室主要负责人。多次指导成员获得国家级奖项。', '平面工作室', '/teacher/1.jpg');
INSERT INTO `teacher` VALUES ('5', '褚丹', '高级讲师', '信息技术与传媒学院极教师，平面与网络工作室主要负责人。多次指导成员获得国家级奖项。', '平面工作室', '/teacher/1.jpg');
INSERT INTO `teacher` VALUES ('6', '褚丹', '高级讲师', '信息技术与传媒学院极教师，平面与网络工作室主要负责人。多次指导成员获得国家级奖项。', '平面工作室', '/teacher/1.jpg');
INSERT INTO `teacher` VALUES ('7', '褚丹', '高级讲师', '信息技术与传媒学院极教师，平面与网络工作室主要负责人。多次指导成员获得国家级奖项。', '平面工作室', '/teacher/1.jpg');
INSERT INTO `teacher` VALUES ('8', '褚丹', '高级讲师', '信息技术与传媒学院极教师，平面与网络工作室主要负责人。多次指导成员获得国家级奖项。', '平面工作室', '/teacher/1.jpg');
INSERT INTO `teacher` VALUES ('9', '褚丹', '高级讲师', '信息技术与传媒学院极教师，平面与网络工作室主要负责人。多次指导成员获得国家级奖项。', '平面工作室', '/teacher/1.jpg');
INSERT INTO `teacher` VALUES ('10', '褚丹', '高级讲师', '信息技术与传媒学院极教师，平面与网络工作室主要负责人。多次指导成员获得国家级奖项。', '平面工作室', '/teacher/1.jpg');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` char(16) DEFAULT NULL,
  `password` char(32) DEFAULT NULL,
  `login_key` varchar(32) DEFAULT NULL,
  `isAdmin` enum('true','false') DEFAULT 'false',
  PRIMARY KEY (`uid`),
  KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '123456', 'e10adc3949ba59abbe56e057f20f883e', null, 'false');
INSERT INTO `users` VALUES ('2', 'sss', '2d02e669731cbade6a64b58d602cf2a4', null, 'false');
INSERT INTO `users` VALUES ('3', 'ssss', 'e10adc3949ba59abbe56e057f20f883e', null, 'false');
INSERT INTO `users` VALUES ('4', 'jjjj', 'e10adc3949ba59abbe56e057f20f883e', null, 'false');
INSERT INTO `users` VALUES ('5', 'admin', 'admin', null, 'true');
INSERT INTO `users` VALUES ('6', '444', '6074c6aa3488f3c2dddff2a7ca821aab', null, 'false');
INSERT INTO `users` VALUES ('7', '888', 'e10adc3949ba59abbe56e057f20f883e', null, 'false');
