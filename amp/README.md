# AMP Demo
## AMP 7規範，加速頁面讀取，還有優化Google Search
* AMP就是 `7項規範` + `AMP HTML` = `AMP-ify` App
* https://www.youtube.com/watch?v=9Cfxm7cikMY
* https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/

### AMP 7規範

#### Never Stop the Content
* 瀏覽器渲染機制關係，JS沒載入其他工作無法完成
* **YOU SHALL NOT USE JAVASCRIPT!** 所有JS工作請在AMP component階段完成
* 只允許非同步載入JS

#### Layout 優先
* 不等其他資源下載，AMP優先知道整個頁面的配置如何

#### inline, size limited CSS
* 只允許 inline css
* 50KB only

#### WebFonts WILL BLOCK all
* AMP會停止做 **任何** 請求，直到font載入

#### Minimize style recalculations
* AMP知道Layout的樣子，所以再重新渲染時會有優化加成

#### GPU 加速
* AMP只允許使用GPU加速的CSS動畫
* transform & opacity ONLY

#### 資源優先序列
* AMP(組件)，只使用必須的js，並且會使用Lazy load來避免資源浪費

### AMP化組件
* 來個DEMO