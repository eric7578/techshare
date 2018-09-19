# React patterns

```
腦闆說：今天我們來做個簡單的POC，你應該很快就寫好惹
POC: 顯示現在時間，然後點一下按鈕時間就會更新，hen好用對8...
```

## GeneralUsage
* 簡單直覺率性有個性，94 man

### What happended?
* 組件重用怎麼辦？ ... 拷貝一份 （誤
* 數據操作邏輯和頁面邏輯混在一起惹

## CompoundComponent
* 切分顯示組件
* 利用複製的方式把props注入進去

### What happended?
* 每次render都跑一次clone很好嘛你

## HigherOrderComponent
* 利用一個connect function 產生一個新的class
* redux like

### What happended?
* props哪裡來的呢?
* 語意表達不清

## Render props
* 把所有props/callback操作都 **顯式** 在children function中帶出

### What happended?
* 幫多層組件QQ了

## React Context API
* 透過Provider/Consumer達成資料深層傳遞
* 其實可以和 **Render props** 混合運用
* React 16.x 限定
