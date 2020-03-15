import os
import sys
import json
import re
import uuid
import shutil
import time

def parseImg(line):
    for (name, path) in re.findall( "!\[(.*?)\]\((.*?)\)", line):
        imgDesDir = os.path.abspath('public/imgs')
        imgSrcDir = os.path.dirname(path)
        # skip imgs already in public folders
        if imgSrcDir == "../imgs": 
            continue
        
        # avoid uuid collision
        while True:
            newImageName = str(uuid.uuid4()).replace('-', '')
            ext = os.path.splitext(os.path.basename(path))[1]
            imgPath = os.path.join(imgDesDir, newImageName+ext)
            if not os.path.isfile(imgPath):
                break

        # copy img and modify markdown file
        shutil.copy(path, imgPath)
        line = line.replace(path, '../imgs/' + newImageName + ext)
        line = line.replace(name, newImageName)
    return line
        



def main():
    articleList = json.load(open("public/articles.json"))
    output = []
    meta = {}
    articlePath = sys.argv[1]

    # parse markdown file
    with open(articlePath) as article:
        lines = article.readlines()
        for line in lines:
            if line == "\n": continue
            if "tags" not in meta and (
                "Tags:" in line or "tags:" in line 
                or "Tags：" in line or "tags：" in line):
                meta["tags"] = re.split("[,，]", re.split("[:：]", line)[1].strip())
                meta["tags"] = list(map(str.strip, meta["tags"]))
                continue
            # set second non-empty&no-tag line as description
            if "title" in meta and "description" not in meta:
                meta["description"] = line.strip()
            # set first non-empty line as title
            if "title" not in meta:
                meta["title"] = line.replace("#", "").strip()
            output.append(parseImg(line))

    # save markdown file
    mdDesDir = os.path.abspath('public/articles')
    mdFileName = os.path.basename(articlePath)
    with open(os.path.join(mdDesDir, mdFileName), "w") as fout:
        print(''.join(output), file=fout)
    
    # update meta data
    meta["date"] = time.strftime("%Y年%m月%d日", time.localtime())
    meta["href"] = "blog/" + mdFileName.replace('.md', '')
    for i, article in enumerate(articleList):
        if article['title'] == meta["title"]:
            article = {**article, **meta}
            articleList[i] = article
            print(meta, article, articleList)
            break
    else:
        articleList = [meta] + articleList
    json.dump(articleList, open("public/articles.json", "w"), ensure_ascii=False)

    # rebuild react project
    # os.system("npm run build")


if __name__ == "__main__": 
    if len(sys.argv) < 2:
        print("Usage: python3 addArticle.py markdownFilePath")
        exit(-1)
    main()

    # s = "![image-20200218221203950](/Users/rui.miao/Library/Application Support/typora-user-images/image-20200218221203950.png)aaaa![image-20200218221203950](/Users/rui.miao/Library/Application Support/typora-user-images/image-20200218221203950.png)[腾讯AI Lab的GNN分享](https://www.bilibili.com/video/av83519765)"

    # for (name, path) in re.findall( "!\[(.*?)\]\((.*?)\)", s):
    #     print(name, path)

    # path = '/Users/rui.miao/Library/Application Support/typora-user-images/image-20200218221203950.png'
    # print(os.path.basename(path))
    # print(os.path.dirname(path))
    # print(os.path.abspath('public/img'))
    # print(os.path.splitext(os.path.basename(path)))