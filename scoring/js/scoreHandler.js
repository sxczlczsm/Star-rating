/**
 * Created by ldjk on 2016/12/26.
 */

var ScoringUtils = {
    scoreStatus: [0, 0, 0, 0, 0], //判断每个问题的打分情况
    scoringHandler: function (selector) {
        var num, liArr;
        var count = 0;
        var isSelected = false;//五角星被选中时为true，此时mouseover事件
        var that = this;
        $(selector).mouseover(function () {
            var parentNodeName = selector.split(" ")[0];
            parentNodeName = parentNodeName.substring(1);
            var parentNode = document.getElementsByClassName(parentNodeName)[0];
            liArr = parentNode.getElementsByClassName('score_i');
            if (!isSelected) {
                var index = $(this).attr('score_v');
                num = parseInt(index);

                for (var i = 0; i < num; i++) {
                    liArr[i].style.background = "url(images/score_type_2.png) no-repeat";
                }
            }
        }).mouseout(function () {
            if (!isSelected) {
                for (var i = 0; i < num; i++) {
                    liArr[i].style.background = "url(images/score_type_1.png) no-repeat";
                }
            }
        }).click(function () {//点击事件
			count = 0;
            isSelected = true;
            var parentNodeName = selector.split(" ")[0];
            var parIndex = parentNodeName.slice(-1);

            var index = $(this).attr('score_v');
            num = parseInt(index);
            for (var i = 0; i < num; i++) {
                liArr[i].style.background = "url(images/score_type_2.png) no-repeat";
                count ++;
            }
            that.scoreStatus[parIndex - 1] = count;
            //num之后的五角星置于未选中状态
            for (var j = num; j < liArr.length; j++) {
                liArr[j].style.background = "url(images/score_type_1.png) no-repeat";
            }
        });

        $('.submit span').click(function () {
            console.log(that.scoreStatus);
            if (that.scoreStatus.indexOf(0) != -1) {
                $('.question_box .score_warn').html("请为所有选项打分");
            } else {
                $('.question_box .score_warn').html("");
            }
        });
    }
};

//为每一个五角星(li元素)绑定事件
var scoreList = document.getElementsByClassName('score_list');
for(var i = 0, len = scoreList.length; i< len ; i++){
    var className = '.list'+(i+1)+ ' .score_i';
    ScoringUtils.scoringHandler(className);
}

