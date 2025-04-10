[English Version](README_EN.md) | [中文版本](#)

# SVG to PNG Chrome扩展

一个简单实用的Chrome扩展程序，可以将SVG代码快速转换为PNG图片格式。

## 功能特点

- 支持SVG代码直接粘贴转换
- 实时预览SVG效果
- 自定义输出文件名
- 一键下载PNG格式图片
- 简洁直观的用户界面

## 安装方法

1. 下载本扩展程序源代码
2. 打开Chrome浏览器，进入扩展程序管理页面（chrome://extensions/）
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"按钮
5. 选择本扩展程序的文件夹

## 使用说明

1. 点击Chrome工具栏中的扩展图标，打开转换界面
2. 在文本框中粘贴SVG代码
3. 实时预览SVG效果
4. 可选：在文件名输入框中设置自定义文件名
5. 点击"下载PNG"按钮，将自动下载转换后的PNG图片

## 注意事项

- 请确保输入的SVG代码格式正确
- 如果未指定文件名，将使用默认名称"image.png"
- 转换后的PNG图片将保存到浏览器默认的下载目录

## 技术实现

- 使用原生JavaScript实现SVG到PNG的转换
- 利用Canvas API进行图像处理
- 采用Chrome Extension Manifest V3规范开发