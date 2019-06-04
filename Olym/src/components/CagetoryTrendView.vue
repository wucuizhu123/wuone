<template>
	<div id="yy">
		<div id="scorll">
			<el-row :gutter="20">
				<el-col :span="24">
					<h1 style="text-align:left;font-size:2.18rem;padding-left:0.5rem;"> Category View<span style="font-size:1.2rem;color:#d55a57;">——To give you the landscape of categories for a selected brand/segment; Click the category you focus on for deep dive </span></h1>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="24">
					<el-select v-model="soce" clearable placeholder="source" class="cou" >
						<el-option v-for="item in this.source" :key="item.commentSource" :label="item.commentSource" :value="item.websiteId"></el-option>
					</el-select>
					<el-select v-model="brad" clearable placeholder="brand" class="cou">
						<el-option v-for="item in op" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-select v-model="cate" clearable placeholder="type" class="cou">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" ></el-option>
					</el-select>
				  <el-select v-model="segn" class="cou" placeholder="segement" >
				  	<el-option   v-for="item in opt"  :key="item.value" :label="item.label"  :value="item.value" ></el-option>
					</el-select>
					<el-date-picker  v-model="starta" class="cou"  clearable type="month"  value-format="yyyy-MM" placeholder="Comment StartDate" :picker-options="pickerOptions" ></el-date-picker>
	        <el-date-picker  v-model="enda" class="cou" clearable type="month"  value-format="yyyy-MM"  placeholder="Comment StartDate" :picker-options="pickerOptions"></el-date-picker>			
				  <el-button round @click="allClick()"  class="coue">Search</el-button>
					<el-tooltip class="item" effect="dark" :content=one  placement="top">
					  <a v-bind:href="apiUrl+'/byCategory/exportSegmentModelExcel.do?startTime='+starta+'&endTime='+enda+'&source='+soce+'&brand='+brad+'&type='+cate+'&segment='+segn" target="tune" style="width:10%;height:40px; border:1px solid #dcdfe6;display: inline-block; border-radius:20px; font-size:0.875rem;line-height:40px; color: #606266; "  @click="port()" ><i class="el-icon-loading" v-show="cpm"></i>Data Export</a>
					</el-tooltip>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="littetop">
						  <p class="comelitte" >Category Ordered by <el-select v-model="panOne"  collapse-tags  @change="drawLine('myChartv','myCharti');"  placeholder="Order" style="width:20%">
							<el-option v-for="item in this.pan" :key="item.label" :label="item.label" :value="item.value" ></el-option></el-select> Mentions</p>
					</div>
					<div id="myChartv" :style="{width: '100%', height: '32rem'}" class="ko"></div>
				</el-col>
				<el-col :span="12">
					<div class="littetop"><p class="comelitte" > {{compon}} Sub-Category </p></div>
					<div id="myChartu" :style="{width: '100%', height: '32rem'}" class="ko"></div>
				</el-col>
			</el-row>
            <el-row :gutter="20" >
            	<el-col :span="24" class="myharti">
            		<div class="littetop"><p class="comelitte" > Category Trend by Quarter</p></div>
            		  <div id="myCharti" :style="{width: '100%', height: '37.5rem'}" class="ko"></div>	
            	</el-col>         
            </el-row>			
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="littetop"><p class="comelitte" >{{compon}} PSI by Model</p></div>
					<div id="myChartg" :style="{width: '100%', height: '34.3rem'}" class="ko"></div>
				</el-col>
				<el-col :span="12">
					<div class="littetop"><p class="comelitte" > {{modellast}} {{compon}} PSI Trend</p></div>
					<div id="myCharts" :style="{width: '100%', height: '34.3rem'}" class="ko"></div>
				</el-col>				
			</el-row>			
		</div>
		<div id="main" style="width:88.3%;height:91%;position:absolute;z-index:2500;background:#fff;top:60px;display:none;text-align:left;">
			<el-button type="info" round @click="haowan" style="margin-bottom:0.5%;margin-top:0.5%; margin-left:1%;">Back</el-button>
			<div id="mainn" style="width:88.7%;height:90%;margin-left:5%"></div>
		</div>
		<iframe name="tune" style="display:none"></iframe>
	</div>
</template>

<script>
	import api,{ setCookie,getCookie} from '../api/indexapi';
	export default {

		data() {
			return {
				    op: [{
									value: '',
									label: 'All Brand'
								},{
									value: 'THINK',
									label: 'THINK'
								}, {
									value: 'LENOVO',
									label: 'LENOVO'
								}],
		        opt: [{
									value: '',
									label: 'All Segement'
								},{
									value: 'Consumer',
									label: 'Consumer'
								}, {
									value: 'Commercial',
									label: 'Commercial'
								},{
									value: 'SMB',
									label: 'SMB'
								}],
						pan: [{
									value: 'Negative',
									label: 'Negative'
								},{
									value: 'Positive',
									label: 'Positive'
								}, {
									value: 'Total',
									label: 'Total'
								}],
						options: [{
								value: '',
								label: 'All Type '
								},{
									value: '0',
									label: 'DT '
								}, {
									value: '1',
									label: 'NB '
								}],
			    	panOne:"Negative",
						cpm:false,	
						nomol:true,
						nomolLock:true,
						nameLock:false,
						namLock:false,
						source: [],			
						modellast:"",
						name: '',	
				    pickerOptions:{
            disabledDate(time){
              let _now = Date.now(),					
									date1=new Date(2019,4,1),
									date2=new Date(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()),
									datez=(date2.getTime()-date1.getTime())/(1000*60*60*24),/*不用考虑闰年否*/
									seven =(1090+datez)* 24 * 3600000,
									sevenDays = _now - seven;		
              return time.getTime() > _now || time.getTime() < sevenDays;
                //  return time.getTime() > Date.now()
            }
        },
						band: [],
						models:[],		
						apiUrl: api.apiUrl,
						soce:"",
						soceo:"",
						brad:"",
						cate:"",
						starta:"",
						enda:"",
						compon:"",
						segn:"",
						nomo:true,
						segno:"",
						one:"Response time may be longer",
					}
				},
		mounted() {
							let uname = getCookie('username')
							this.name = uname
							/*如果cookie不存在，则跳转到登录页*/
							if(uname == ""){
									this.$router.push('/Login')
							}
							var Height2 = window.innerHeight - 60;
							document.getElementById("yy").style.height = Height2 + "px";
							var pre = new Date();
							var year = pre.getFullYear() - 1;
							var month = pre.getMonth() + 1; //js从0开始取 
							var date = pre.getDate();
							if(month < 10) {
								month = "0" + month;
							}
							var time = year + "-" + month;
							var now = new Date();
							var year1 = pre.getFullYear();
							var time1 = year1 + "-" + month;
							this.starta = time;
							this.enda = time1;
							this.soce="";
							this.compon="DISPLAY";
							this.record();
							this.restaurants = this.loadAll();		
							this.drawLine("myChartv","myCharti");
							this.aa("myChartu","myChartg");
							this.last("myCharts");			
	     	},
	  methods:{			
		  	allClick(){
					this.drawLine("myChartv","myCharti");
					this.aa("myChartu","myChartg");
					this.last("myCharts");
		  	},
		  	record: function() {	
					let  sou={"commentSource":"All Sources","websiteId":"",};
					//	显示数据brand source
					this.$http.get(api.apiUrl + '/pcIndustry/dicProxy').then(function(data) {
							this.source = data.data.result.source;
							this.band = data.data.result.brand;
							this.source.unshift(sou);
					}, function(res) {
						alert('error');
					});
			},
			haowan(){
					this.nomol=true;
					this.nomo=true;
					this.nameLock=false;
					this.namLock=false;
          document.getElementById("main").style.display="none";
			},
			querySearchAsync(queryString, cb) {
					var restaurants = this.restaurants;
					var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

      clearTimeout(this.timeout);
        	this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
         return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
      },
	  	loadAll(){
		  	this.$http.get(api.apiUrl + '/byCategory/seriesLikeCase').then(function(data) {
          for(let i=0;i<data.data.result.length;i++){
                			let coco={};
											coco.value="";
											coco.value=data.data.result[i];
                	  	this.models.push(coco);
          }                   
				}, function(res) {
					alert('error');
				});		
				return this.models	
	  	},		
		  port(){
         this.$http.post(api.apiUrl + '/byCategory/isExport').then(function(data) {		 
                       if(data.data){
									   	this.cpm=false;
											this.one="Response time may be longer";
											}else{
												this.cpm=true;this.one="Loading";
											this.port();	
					          	}     
									
							}, function(res) {
								alert('error');
							});
		  },	
			drawLine(Chartv,Charti) {
              let myChartv = this.$echarts.init(document.getElementById(Chartv));
							myChartv.showLoading();
							let myCharti = this.$echarts.init(document.getElementById(Charti));
							myCharti.showLoading();	
							let nat1 = [];
							let post1 = [];
							let psoi1 = [];
							let leve1 = [];
							let sizeq=[];
							var apiPam="";
							if(this.panOne=="Negative"){
									apiPam='/byCategory/categoryTrendCase';
							}else if(this.panOne=="Positive"){
								apiPam='/byCategory/categoryPositiveCase';
							}else if(this.panOne=="Total"){
								apiPam="/byCategory/categoryToalCase";
							}
							this.$http.post(api.apiUrl + apiPam, {
								"source": this.soce,
								"type": this.cate,
								"brand": this.brad,
								"segment": this.segn,
								"startTime": this.starta,
								"endTime": this.enda,	
							}).then(function(data) {	
								var vm=this;	
					//三饼图
								if(data.data.status=="-2"){
								}else{
										let tag = {};
										var sizeq = "";
										tag = data.data.result;
											if(this.soce==""){
												this.soceo="All Souces";
											}else{
												this.soceo=this.soce;
											}
											if(this.segn==""){
												this.segno="All Type";
											}else{
												this.segno=this.segn;
										}
				       	this.tableOE = data.data.result.modelCategoryList.topList;
								for(let p = 0; p < data.data.result.modelCategoryList.topList.length; p++) {
									nat1.unshift(data.data.result.modelCategoryList.topList[p].negative);
									post1.unshift(data.data.result.modelCategoryList.topList[p].positive);
									psoi1.unshift(Math.round(data.data.result.modelCategoryList.topList[p].psi * 100) / 100);
									leve1.unshift(data.data.result.modelCategoryList.topList[p].components);
								}	
					      sizeq = 100 - (2000 / leve1.length);
			        }; 
	            myChartv.hideLoading();
				     	myChartv.setOption({
							title:{
									text:"Model Ordered by Negative Mentions",
									show:this.nameLock,
									left:'center',								
							},
							noDataLoadingOption: {
								text: '暂无数据',
								effect: 'bubble',
								effectOption: {
									effect: {
										n: 0
									}
								}
							},					
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'cross',
								crossStyle: {
									color: '#999'
								}
							},
							textStyle: {
								align: 'left'
							},
					  },
						legend: {
							itemGap: 5,
							top: "95%",
		          left:"center",
							data: ['Negative', 'Positive', "PSI"],
							y: 'left',
							icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，
							    itemWidth: 12,  // 设置宽度							
							    itemHeight: 12, // 设置高度
							    itemGap: 15,
						},
						axisPointer: {
							link: {
								xAxisIndex: 'all'
							}
						},
						dataZoom: [{
									type: 'inside',
									realtime: true,
									start:100,//默认为0
									end:sizeq,
									zoomLock:this.nomol,
									yAxisIndex: [0, 1]
              },{
									start:100,//默认为0
									end:sizeq,
									type: 'slider',
									show: true,
									yAxisIndex: [0,1],
									zoomLock: this.nomol,
                  width:8,
									handleSize: 15,//滑动条的 左右2个滑动条的大小
									right: "8%",
									handleColor: '#ddd',//h滑动图标的颜色
									handleStyle: {
                   borderColor: "#ddd",
                   borderWidth: "1",
                   shadowBlur: 2,
                   background: "#ddd",
                   shadowColor: "#ddd",
                  },
									fillerColor: '#5ccbb1' ,
									backgroundColor: '#ddd',//两边未选中的滑动条区域的颜色
									showDataShadow: false,//是否显示数据阴影 默认auto
									showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
										handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAA60GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE4LTEyLTI1VDE0OjMyOjE0KzA4OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxOC0xMi0yNVQxNDozMjoxNSswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTgtMTItMjVUMTQ6MzI6MTUrMDg6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjk0MDAyNWRjLWQ2MzAtYTE0Ni05NWFkLWEyY2Y3OTE0MDFhYTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDpmMTE3ZDg3OC0yNzAzLTgwNDQtYmVlYi01YWM3ZjU0YTAwNmM8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpmMTE3ZDg3OC0yNzAzLTgwNDQtYmVlYi01YWM3ZjU0YTAwNmM8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZjExN2Q4NzgtMjcwMy04MDQ0LWJlZWItNWFjN2Y1NGEwMDZjPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE4LTEyLTI1VDE0OjMyOjE0KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo5NDAwMjVkYy1kNjMwLWExNDYtOTVhZC1hMmNmNzkxNDAxYWE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTgtMTItMjVUMTQ6MzI6MTUrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgICAgPHJkZjpCYWc+CiAgICAgICAgICAgICAgIDxyZGY6bGk+QjQ0MTUxRDY0RDY1RjcwRUJDMDQwMkMyQUFGMDRFODA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPnNSR0IgSUVDNjE5NjYtMi4xPC9waG90b3Nob3A6SUNDUHJvZmlsZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pi3riMEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAQxJREFUeNqk1L1KY1EUhuEnG6aLV6DNKtIFxFoQYiWD2ngFU0T0DsZCsLabQvAyLBwm2KiFhTYOzOmXFja2opWaaZJwYMj4c95uw/7ezV58rNZwOFQnMwOrWMYCZnGLKxzhV0Q81DOtuiQz+9gehadxhu8RcfmPJDN3sYfibZ6wERGDiSQzt3DwTsGYByxGxJ+SmR1sflAAM/hhFFx7Ywb/o5eZ3wqWNGO9YL6hZKFgrqFkruCuoeSm4HcDwRCnBecNJM8R0S/4ietPSo6rqmo1aexjRLTHZRMRh9jBywe+0R4fJi9HxD6+YoDnaWGcRMSXqaugthJ6WBm1uYN7XEREv6qq0u12X+v3/w4Afg1YJjkMH0wAAAAASUVORK5CYII=',
									filterMode: 'filter',
            }],
						grid: [{
								left: "1%",
								top:"6%",
								height: '88%',
								width: "68%",
								containLabel: true
							},
							{
								left: "69%",
								top:"6%",

								height: '84%',
								width: "17%",

						}],
						xAxis: [{
								type: 'value',
								axisTick: {
									show: false
								},
								axisLabel: {
									interval: 0, 
					            formatter: function(value,index){
					        		var value;
					        		if (value >=1000) {
					        			value = value/1000+'k';
					        		}else if(value <1000){
					        			value = value;
					        		}
					        		return value
					        	}
          },
							},
							{
								gridIndex: 1,
								type: 'value',
								axisTick: {
									show: false,
								},
								inverse: false,
								position: "top",
								nameLocation: "start",
							}
						],
						toolbox: {
							orient:'vertical',
              show: vm.nomol,
						  feature: {
								// dataView: {readOnly: false},
								saveAsImage: {
								title: 'Save',
							},
							myTool2: {
						show: true,
						title: 'Full',
							icon: 'image://data:image/png;base64,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',
						onclick: function () {			 
								vm.nomol=false;
								// vm.nomo=true;
								vm.nameLock=true,
								document.getElementById("main").style.display="block";
								vm.drawLine("mainn","myCharti");
						}
							}
						}
					},
						yAxis: [{
								type: 'category',
								triggerEvent: true,
                                
								axisLine: {
									onZero: true
								},
								splitLine: {
									show: true,
								},
								axisLabel: {
                  interval: 0, 
								},
								axisPointer: {
									type: 'shadow'
								},
								data: leve1,
								
							},
							 
							{
								gridIndex: 1,
								type: 'category',
								name: "PSI Score",
								nameRotate: 90,
								nameLocation: "middle",
								axisLabel: {
                  interval: 0, 
									color: "transparent"
								},
								axisTick: {
									show: false
								},
								nameTextStyle: {
									fontSize: 20,
									fontWeight: "bold",
								},
								axisPointer: {
									type: 'shadow'
								},
								axisLine: {
									show: false,
								},
								data: leve1,
								show: true,
								position: 'top',
								splitLine: {
									show: true,
								},

							}

						],
						series: [{
								name: 'Negative',
								type: 'bar',				
								color: ['#d55a57'],
								symbolSize: 8,
								stack: '总量',
								smooth: true,
								hoverAnimation: true,
								data: nat1,
								animationDelay: function (idx) {
							   return idx * 15;
							        }
							},
							{
								name: 'Positive',
								type: 'bar',							
								stack: '总量',
								color: ['#91c7ae'],
								symbolSize: 8,
								smooth: true,
								data: post1,
								animationDelay: function (idx) {
							   return idx * 15;
							        }
							},
							
							{
								name: 'PSI',
								type: 'line',
								xAxisIndex: 1,
								yAxisIndex: 1,
								right: ['80%', '30%'],
								data: psoi1,
								symbol: 'diamond', //拐点样式
								symbolSize: 7,
								itemStyle: {
									normal: {
										color: '#0073be',
										lineStyle: {
											color: '#acacac'
										}
									}
								},
	
							}
						],
						animationEasing: 'elasticOut',
						animationDelayUpdate: function (idx) {
						        return idx * 5;
						      } 
					}, true);
					
						window.addEventListener("resize", () => { myChartv.resize();});
					
					myChartv.on('click', (params) => {
						if(params.componentType =="yAxis" ){
						this.compon = params.value;
						}else{
						this.compon = params.name;
				}
								this.aa("myChartu","myChartg");
						
	});

					
					//三饼图
				
					let tag = {};			
					tag=data.data.result; 				
                    this.tableOE=data.data.result.modelCategoryList.topList
                    let native1=[];
                    let positive1=[];
                    let psi1=[];
										let lend1=[];
										let lengeder=[];
										let comments=[];
										let Xasic=[];
				          	let c=0
                    for(let p=0;p<data.data.result.modelCategoryList.topList.length;p++){
                    	native1.push(data.data.result.modelCategoryList.topList[p].negative);
                    	positive1.push(data.data.result.modelCategoryList.topList[p].positive);
                    	psi1.push(data.data.result.modelCategoryList.topList[p].psi);
                    	lend1.push(data.data.result.modelCategoryList.topList[p].components);
                    }
                    
					if(tag.modelCategoryList.compentsList.length>0){
						for(let j=0;j<tag.modelCategoryList.compentsList[0].compentsList.length;j++){
							let grande={};let k=0;
							grande.name=tag.modelCategoryList.compentsList[0].compentsList[j].publishTime;
							grande.type="bar";
							grande.barGap=0;
							grande.data=[];						
							lengeder.push(tag.modelCategoryList.compentsList[0].compentsList[j].publishTime);
							for(let i=0;i<tag.modelCategoryList.compentsList.length;i++){								
							if(tag.modelCategoryList.compentsList[i].brand==tag.modelCategoryList.compentsList[i].compentsList[j].components){						
								grande.data[k++]=Math.round(tag.modelCategoryList.compentsList[i].compentsList[j].psi*100)/100;
																
							}							
						}
							comments.push(grande);
						}
						for(let e=0;e<tag.modelCategoryList.compentsList.length;e++){
							Xasic[c++]=tag.modelCategoryList.compentsList[e].brand;
						}
					}		
					myCharti.hideLoading();
					myCharti.setOption({
						title:{
								text:"Category Trend by Quarter",
	              show:this.namLock,
								left:'left',
								
					 },
						
						xAxis: {
							data: Xasic,
							 minInterva:1,
							 
							axisLine: {
						          show: false
						        },
						        
                           axisLabel: {
														 
								interval: 0,
								  rotate:40
							},
						        axisTick: {
						          show: false
						        }, 
							 
							 
						},
						legend: {
							data: lengeder,
							top: "1%",
							left: "center",
							icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，
							    itemWidth: 12,  // 设置宽度							
							    itemHeight: 12, // 设置高度
						},
						 grid:{
							 top:"6%",
							 bottom:"23%"
						 },
						 toolbox: {
							 orient:'vertical',
              show: vm.nomo,
						feature: {
							// dataView: {readOnly: false},
							saveAsImage: {
								title: 'Save',
							},
							myTool2: {
						show: true,
						title: 'Full',
							icon: 'image://data:image/png;base64,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',
						onclick: function () {
								vm.nomo=false;
								vm.namLock=true;
								document.getElementById("main").style.display="block";
								vm.drawLine("myChartv","mainn");
						}
							}
						}
					},
				dataZoom: [{
					type: 'inside',
					realtime: true,
					start: 1,
					end: 18,
					zoomLock:this.nomo,
					xAxisIndex: [0],
        },{
						 
                type: 'slider',
                start: 1,
                end: 18,
                show: true,
                xAxisIndex: [0],
                handleSize: 15,//滑动条的 左右2个滑动条的大小
                zoomLock: this.nomo,
                bottom:"3%",
                height: 8,//组件高度
                handleColor: '#ddd',//h滑动图标的颜色
                handleStyle: {
                    borderColor: "#ddd",
                    borderWidth: "1",
                    shadowBlur: 2,
                    background: "#ddd",
                    shadowColor: "#ddd",
                },
                fillerColor: '#5ccbb1' ,
                backgroundColor: '#ddd',//两边未选中的滑动条区域的颜色
                showDataShadow: false,//是否显示数据阴影 默认auto
                showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
                  handleIcon: 'image://data:image/png;base64,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0p8zAAA60GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE4LTEyLTI1VDE0OjMyOjE0KzA4OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxOC0xMi0yNVQxNDozMjoxNSswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTgtMTItMjVUMTQ6MzI6MTUrMDg6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjk0MDAyNWRjLWQ2MzAtYTE0Ni05NWFkLWEyY2Y3OTE0MDFhYTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDpmMTE3ZDg3OC0yNzAzLTgwNDQtYmVlYi01YWM3ZjU0YTAwNmM8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpmMTE3ZDg3OC0yNzAzLTgwNDQtYmVlYi01YWM3ZjU0YTAwNmM8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZjExN2Q4NzgtMjcwMy04MDQ0LWJlZWItNWFjN2Y1NGEwMDZjPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE4LTEyLTI1VDE0OjMyOjE0KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo5NDAwMjVkYy1kNjMwLWExNDYtOTVhZC1hMmNmNzkxNDAxYWE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTgtMTItMjVUMTQ6MzI6MTUrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgICAgPHJkZjpCYWc+CiAgICAgICAgICAgICAgIDxyZGY6bGk+QjQ0MTUxRDY0RDY1RjcwRUJDMDQwMkMyQUFGMDRFODA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPnNSR0IgSUVDNjE5NjYtMi4xPC9waG90b3Nob3A6SUNDUHJvZmlsZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pi3riMEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAQxJREFUeNqk1L1KY1EUhuEnG6aLV6DNKtIFxFoQYiWD2ngFU0T0DsZCsLabQvAyLBwm2KiFhTYOzOmXFja2opWaaZJwYMj4c95uw/7ezV58rNZwOFQnMwOrWMYCZnGLKxzhV0Q81DOtuiQz+9gehadxhu8RcfmPJDN3sYfibZ6wERGDiSQzt3DwTsGYByxGxJ+SmR1sflAAM/hhFFx7Ywb/o5eZ3wqWNGO9YL6hZKFgrqFkruCuoeSm4HcDwRCnBecNJM8R0S/4ietPSo6rqmo1aexjRLTHZRMRh9jBywe+0R4fJi9HxD6+YoDnaWGcRMSXqaugthJ6WBm1uYN7XEREv6qq0u12X+v3/w4Afg1YJjkMH0wAAAAASUVORK5CYII=',
                filterMode: 'filter',
            },	 
						 
					  ],
                        tooltip:{
							//  trigger: 'axis',
							axisPointer: {
								type: 'cross',
								crossStyle: {
									color: '#999'
								}
							},
							textStyle: {
								align: 'left'
							},
						},
						yAxis: {
							axisLine: {
								show: false
							},
							axisLabel: {
								interval: 0, 
								formatter: function(value, index) {
									return value.toFixed(2);

								},
								textStyle: {
									color: '#999'
								}},
							axisTick: {
								show: false
							},},
						 series: comments,
					   animationEasing: 'elasticOut',
						 animationDelayUpdate: function (idx) {
						        return idx * 5;      
						   }
				  	}, true);
						window.addEventListener("resize", () => { myCharti.resize();});
				}, function(res) {
				});
		 	},
			aa(Chartu,Chartg) {
				let myChartu = this.$echarts.init(document.getElementById(Chartu));
        myChartu.showLoading();
        let myChartg = this.$echarts.init(document.getElementById(Chartg));
        myChartg.showLoading();
				var vm=this;
				this.showPrise = false;
				this.$http.post(api.apiUrl + '/byCategory/levelTrendCase', {
								"series":"",
								"source":this.soce,
								"type":this.cate,
								"brand":this.brad,
								"startTime":this.starta,
								"endTime":this.enda,
								"components":this.compon,	
								"segment":this.segn,
		    }).then(function(data) {			     
          let nativeFor=[];
					let postiveFor=[];
					let lengedFor=[];
					let psiFor=[];				
					for(let i=0;i<data.data.result.levelCategoryList.mentionLevelTopList.length;i++){
						lengedFor.unshift(data.data.result.levelCategoryList.mentionLevelTopList[i].level3);
						nativeFor.unshift(data.data.result.levelCategoryList.mentionLevelTopList[i].negative);
						postiveFor.unshift(data.data.result.levelCategoryList.mentionLevelTopList[i].positive);
						psiFor.unshift(Math.round(data.data.result.levelCategoryList.mentionLevelTopList[i].psi * 100) / 100);
					}
                 
                   var size="";
				size= 100-(1000/lengedFor.length);     
                        
              myChartu.hideLoading();
				myChartu.setOption({
					title:{
								text:this.compon+" Sub-Category",
	              show:this.nameLock,
								left:'center',
								
					 },
    
				legend: {
						itemGap: 5,
						top: "95%",
						left:"center",
						data: ['Negative','Positive', "PSI"],
						y: 'left',
						icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
											itemWidth: 12,  // 设置宽度							
											itemHeight: 12, // 设置高度
											itemGap: 15,
						},
					axisPointer: {
						link: {xAxisIndex: 'all'}
						}, 
						grid:{
							 top:"6%",
							 bottom:"23%"
						 },
						 toolbox: {
							orient:'vertical',
             show: vm.nomol,
						feature: {
							// dataView: {readOnly: false},
						saveAsImage: {
								title: 'Save',
							},
							myTool2: {
						show: true,
						title: 'Full',
							icon: 'image://data:image/png;base64,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',
						onclick: function () {			 
								vm.nomol=false;
								vm.nameLock=true;
								document.getElementById("main").style.display="block";
								vm.aa("mainn","myChartg");
						}
							}
						}
					},
       	 dataZoom: [
						{
				type: 'inside',
				realtime: true,
				start:100,//默认为0
        end:size,
				zoomLock:this.nomol,
				yAxisIndex: [0, 1]
        }, {
              start:100,//默认为0
               end:size,
               type: 'slider',
               show: true,
               yAxisIndex: [0,1],
               zoomLock: this.nomol,
               width:8,
               handleSize: 15,
               right: "12%",
               handleColor: '#ddd',//h滑动图标的颜色
               handleStyle: {
                   borderColor: "#ddd",
                   borderWidth: "1",
                   shadowBlur: 2,
                   background: "#ddd",
                   shadowColor: "#ddd",
               },
               fillerColor: '#5ccbb1' ,
               backgroundColor: '#ddd',//两边未选中的滑动条区域的颜色
               showDataShadow: false,//是否显示数据阴影 默认auto
               showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
                 handleIcon: 'image://data:image/png;base64,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0p8zAAA60GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE4LTEyLTI1VDE0OjMyOjE0KzA4OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxOC0xMi0yNVQxNDozMjoxNSswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTgtMTItMjVUMTQ6MzI6MTUrMDg6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjk0MDAyNWRjLWQ2MzAtYTE0Ni05NWFkLWEyY2Y3OTE0MDFhYTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDpmMTE3ZDg3OC0yNzAzLTgwNDQtYmVlYi01YWM3ZjU0YTAwNmM8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpmMTE3ZDg3OC0yNzAzLTgwNDQtYmVlYi01YWM3ZjU0YTAwNmM8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZjExN2Q4NzgtMjcwMy04MDQ0LWJlZWItNWFjN2Y1NGEwMDZjPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE4LTEyLTI1VDE0OjMyOjE0KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo5NDAwMjVkYy1kNjMwLWExNDYtOTVhZC1hMmNmNzkxNDAxYWE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTgtMTItMjVUMTQ6MzI6MTUrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgICAgPHJkZjpCYWc+CiAgICAgICAgICAgICAgIDxyZGY6bGk+QjQ0MTUxRDY0RDY1RjcwRUJDMDQwMkMyQUFGMDRFODA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPnNSR0IgSUVDNjE5NjYtMi4xPC9waG90b3Nob3A6SUNDUHJvZmlsZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pi3riMEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAQxJREFUeNqk1L1KY1EUhuEnG6aLV6DNKtIFxFoQYiWD2ngFU0T0DsZCsLabQvAyLBwm2KiFhTYOzOmXFja2opWaaZJwYMj4c95uw/7ezV58rNZwOFQnMwOrWMYCZnGLKxzhV0Q81DOtuiQz+9gehadxhu8RcfmPJDN3sYfibZ6wERGDiSQzt3DwTsGYByxGxJ+SmR1sflAAM/hhFFx7Ywb/o5eZ3wqWNGO9YL6hZKFgrqFkruCuoeSm4HcDwRCnBecNJM8R0S/4ietPSo6rqmo1aexjRLTHZRMRh9jBywe+0R4fJi9HxD6+YoDnaWGcRMSXqaugthJ6WBm1uYN7XEREv6qq0u12X+v3/w4Afg1YJjkMH0wAAAAASUVORK5CYII=',
               filterMode: 'filter',
             },

            ],
               tooltip : {
									trigger: 'axis',
									axisPointer: {
										type: 'cross',

										crossStyle: {
											color: '#999'
										}
									},
									textStyle: {

										align: 'left'
									},
									},
								grid: [{
										left: "1%",
										top:"6%",

										height: '88%',
										width: "64%",
										containLabel: true
									},
									{
										left: "65%",
										//right: 0,
										top:"6%",
										height: '84%',
										width: "17%",

									}],
									xAxis:[
											{
										type : 'value',
										axisLabel: {
											interval: 0, 
					            formatter: function(value,index){
					        		var value;
					        		if (value >=1000) {
					        			value = value/1000+'k';
					        		}else if(value <1000){
					        			value = value;
					        		}
					        		return value
					        	}
						        },
													axisTick: {
																show: false
														},
												
										},
										{
												gridIndex: 1,
												type :'value',
												
													axisTick: {
												show: false
														},
												inverse: false,
												position:"top",
												nameLocation:"start",
										}
								],
								yAxis: [
									{
												type : 'category',
												axisLine: {onZero: true},
												axisLine: {
															onZero: true
														},
														splitLine: {
															show: true,
														},
														axisPointer: {
															type: 'shadow'
														},
														axisLabel: {
                              interval: 0, 
									
														},
														
												data: lengedFor,
										},
										{
											
											
														gridIndex: 1,
														type: 'category',
														name: "PSI Score",
														nameRotate: 90,
														nameLocation: "middle",

														axisLabel: {
                              interval: 0, 
															color: "transparent"
														},
														axisTick: {
															show: false
														},
														axisPointer: {
															type: 'shadow'
														},
														nameTextStyle: {
															fontSize: 20,
															fontWeight: "bold",
														},
														axisLine: {
															show: false,
														},
														data: lengedFor,
														show: true,
														position: 'top',
														splitLine: {
															show: true,
														}
						}
       
								],
								series: [
								{
												name:'Negative',
												type:'bar',
												cursor:"default",
												color:['#d55a57'],
												symbolSize: 8,
												stack: '总量',
												smooth:true,
											
												hoverAnimation: true,
												data:nativeFor,
													animationDelay: function (idx) {
														return idx * 10;
																	}
										},
										{
												name:'Positive',
												type:'bar',
												cursor:"default",
												stack: '总量',
												color:['#91c7ae'],
												symbolSize: 8,
												smooth:true,
												data:postiveFor,
												animationDelay: function (idx) {
																			return idx * 10;
																	}
										},
										{
												name:'PSI',
												type: 'line',
												xAxisIndex: 1,
												yAxisIndex: 1,
												right: ['80%', '30%'],
												data: psiFor,
												symbol:'diamond',//拐点样式
										symbolSize:7,
										itemStyle : {  
														normal : {  
													color:'#0073be',  
												lineStyle:{  
												color:'#acacac'  
															}  
														}  
												}, 
										}   
								],
								animationEasing: 'elasticOut',
														animationDelayUpdate: function (idx) {
																return idx * 5;
															} 
															
									},true);
									let  nage=[];
									let  posti=[];
									let  psii=[];
									let lenn=[];

for(let p = 0; p < data.data.result.levelCategoryList.levelByModelList.length; p++) {
						nage.unshift(data.data.result.levelCategoryList.levelByModelList[p].negative);
						posti.unshift(data.data.result.levelCategoryList.levelByModelList[p].positive);
						psii.unshift(Math.round(data.data.result.levelCategoryList.levelByModelList[p].psi * 100) / 100);
						lenn.unshift(data.data.result.levelCategoryList.levelByModelList[p].model);
					}
					let sizes = "";
					sizes = 100 - (2000 / lenn.length);

	               myChartg.hideLoading();
					myChartg.setOption({
						title:{
								text: this.compon+"PSI by Model",
	              show:this.namLock,
								left:'center',
								
					 },
						noDataLoadingOption: {
							text: '暂无数据',
							effect: 'bubble',
							effectOption: {
								effect: {
									n: 0
								}
							}
						},
						tooltip: {
							 trigger: 'axis',
							axisPointer: {
								type: 'cross',

								crossStyle: {
									color: '#999'
								}
							},
							textStyle: {

								align: 'left'
							},
						},
						legend: {
							itemGap: 5,
							top: "95%",
		            left:"center",
							data: ['Negative', 'Positive', "PSI"],
							y: 'left',
							 icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
							    itemWidth: 12,  // 设置宽度							
							    itemHeight: 12, // 设置高度
							    itemGap: 15,
							
						},
						axisPointer: {
							link: {
								xAxisIndex: 'all'
							}
						},
						toolbox: {
							orient:'vertical',
            show: vm.nomo,
						feature: {
							// dataView: {readOnly: false},
							saveAsImage: {
								title: 'Save',
							},
							myTool2: {
						show: true,
						title: 'Full',
							icon: 'image://data:image/png;base64,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',
						onclick: function () {			 
								vm.nomo=false;
								vm.namLock=true;
								document.getElementById("main").style.display="block";
								vm.aa("myChartu","mainn",);
						}
							}
						}
					},
						dataZoom: [{
				type: 'inside',
				realtime: true,
				start:100,//默认为0
        end:sizes,
				zoomLock:this.nomo,
				yAxisIndex: [0, 1]
        },{
                 start:100,//默认为0
               end:sizes,
               type: 'slider',
               show: true,
               yAxisIndex: [0,1],
               zoomLock: this.nomo,
               handleSize: 15,//滑动条的 左右2个滑动条的大小
                  width: 8,
                  right: "9%",
               handleColor: '#ddd',//h滑动图标的颜色
               handleStyle: {
               	
                   borderColor: "#ddd",
                   borderWidth: "1",
                   shadowBlur: 2,
                   background: "#ddd",
                   shadowColor: "#ddd",
               },
                   fillerColor: '#5ccbb1' ,
               backgroundColor: '#ddd',//两边未选中的滑动条区域的颜色
               showDataShadow: false,//是否显示数据阴影 默认auto
               showDetail: false,//即拖拽时候是否显示详细数值信息 默认true
               filterMode: 'filter',
                handleIcon: 'image://data:image/png;base64,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0p8zAAA60GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE4LTEyLTI1VDE0OjMyOjE0KzA4OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxOC0xMi0yNVQxNDozMjoxNSswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTgtMTItMjVUMTQ6MzI6MTUrMDg6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjk0MDAyNWRjLWQ2MzAtYTE0Ni05NWFkLWEyY2Y3OTE0MDFhYTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDpmMTE3ZDg3OC0yNzAzLTgwNDQtYmVlYi01YWM3ZjU0YTAwNmM8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpmMTE3ZDg3OC0yNzAzLTgwNDQtYmVlYi01YWM3ZjU0YTAwNmM8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZjExN2Q4NzgtMjcwMy04MDQ0LWJlZWItNWFjN2Y1NGEwMDZjPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE4LTEyLTI1VDE0OjMyOjE0KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo5NDAwMjVkYy1kNjMwLWExNDYtOTVhZC1hMmNmNzkxNDAxYWE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTgtMTItMjVUMTQ6MzI6MTUrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgICAgPHJkZjpCYWc+CiAgICAgICAgICAgICAgIDxyZGY6bGk+QjQ0MTUxRDY0RDY1RjcwRUJDMDQwMkMyQUFGMDRFODA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPnNSR0IgSUVDNjE5NjYtMi4xPC9waG90b3Nob3A6SUNDUHJvZmlsZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pi3riMEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAQxJREFUeNqk1L1KY1EUhuEnG6aLV6DNKtIFxFoQYiWD2ngFU0T0DsZCsLabQvAyLBwm2KiFhTYOzOmXFja2opWaaZJwYMj4c95uw/7ezV58rNZwOFQnMwOrWMYCZnGLKxzhV0Q81DOtuiQz+9gehadxhu8RcfmPJDN3sYfibZ6wERGDiSQzt3DwTsGYByxGxJ+SmR1sflAAM/hhFFx7Ywb/o5eZ3wqWNGO9YL6hZKFgrqFkruCuoeSm4HcDwRCnBecNJM8R0S/4ietPSo6rqmo1aexjRLTHZRMRh9jBywe+0R4fJi9HxD6+YoDnaWGcRMSXqaugthJ6WBm1uYN7XEREv6qq0u12X+v3/w4Afg1YJjkMH0wAAAAASUVORK5CYII=',
         },
						],
						grid: [{
			left: "2%",
			top:"5%",
			height: '87%',
			width: "65%",
			containLabel: true
		},
		{
			left: "67%",
			top:"5%",
			height: '83.2%',
			width: "17%",

		}
						],
						xAxis: [{
								type: 'value',
								axisTick: {
									show: false
								},
								axisLabel: {
								interval: 0, 
								  formatter: function(value,index){
					        		var value;
					        		if (value >=1000) {
					        			value = value/1000+'k';
					        		}else if(value <1000){
					        			value = value;
					        		}
					        		return value
					        	}
                                },
								nameLocation: "start",

							},
							{
								gridIndex: 1,
								type: 'value',
								axisTick: {
									show: false,
								},
								inverse: false,
								position: "top",
								nameLocation: "start",
							}
						],
						yAxis: [{
								type: 'category',
								triggerEvent: true,

								axisLine: {
									onZero: true
								},
								axisPointer: {
									type: 'shadow'
								},
									axisLabel: {
                 interval: 0, 

								},
								data: lenn,
								splitLine: {
									show: true,
								},
							},
							{
								gridIndex: 1,
								type: 'category',
								name: "PSI Score",
								nameRotate: 90,
								nameLocation: "middle",

								axisLabel: {
                 interval: 0, 
									color: "transparent"
								},
								axisPointer: {
									type: 'shadow'
								},
								axisTick: {
									show: false
								},
								nameTextStyle: {
									fontSize: 20,
									fontWeight: "bold",
								},
								axisLine: {
									show: false,
								},
								data: lenn,
								show: true,
								position: 'top',
								splitLine: {
									show: true,
								},

							}

						],
						series: [{
								name: 'Negative',								
								type: 'bar',
								color: ['#d55a57'],
								symbolSize: 8,
								stack: '总量',
								smooth: true,
								hoverAnimation: true,
								data: nage,
								animationDelay: function (idx) {
							            return idx * 10;
							        }
							},
							{
								name: 'Positive',
								
								type: 'bar',
								stack: '总量',
								color: ['#91c7ae'],
								symbolSize: 8,
								smooth: true,
								data: posti,
								animationDelay: function (idx) {
							            return idx * 10;
							        }
							},
							{
								name: 'PSI',
								type: 'line',
								xAxisIndex: 1,
								yAxisIndex: 1,
								right: ['80%', '30%'],
								data: psii,
								symbol: 'diamond', //拐点样式
								symbolSize: 7,
								itemStyle: {
									normal: {
										color: '#0073be',
										lineStyle: {
											color: '#acacac'
										}
									}
								},
							},
							
						],
						  animationEasing: 'elasticOut',
						    animationDelayUpdate: function (idx) {
						        return idx * 5;
						      } 
						      
					}, true);
					
     	window.addEventListener("resize", () => { myChartu.resize();});
		window.addEventListener("resize", () => { myChartg.resize();});
					 myChartg.on('click', (params) => {
						 if(params.componentType =="yAxis" ){
						this.modellast = params.value;
						}else{
						this.modellast = params.name;
				}			
	         this.last("myCharts");

					});




				}, function(res) {
				});
			},
			last(charts){
				var vm=this;
				if(this.modellast=="All Model"){
						this.modellast="";
					}else{
						this.modellast=this.modellast;
					}
				this.$http.post(api.apiUrl + '/byCategory/modelTrendCase', {					
							"source":this.soce,
							"type":this.cate,
							"brand":this.brad,
							"startTime":this.starta,
							"endTime":this.enda,
	            "model":this.modellast,	
							"segment":this.segn,
							"components":this.compon
				
				}).then(function(data) {
					//三饼图
					if(data.data.status = "0") {
					if(this.modellast==""){
						this.modellast="All Model";
					}else{
						this.modellast=this.modellast;
					}
						let myCharts = this.$echarts.init(document.getElementById(charts));
						myCharts.showLoading();

						let dataPositive = [];
						let dataNegative = [];
						let dataPsi = [];
						let dataTarget = [];
						let publishtime = [];
						let k = 0;
						let a = 0;
						let b = 0;
						let c = 0;
						let p = 0;

						if(data.data.result.modelList.length > 0) {
							for(let i = 0; i < data.data.result.modelList.length; i++) {
								dataPsi[k++] = Math.round(data.data.result.modelList[i].psi * 100) / 100;
								dataNegative[b++] = data.data.result.modelList[i].negative;
								dataPositive[c++] = data.data.result.modelList[i].positive;
								publishtime[p++] = data.data.result.modelList[i].publishTime;
							}
						}

						myCharts.hideLoading();
						myCharts.setOption({
							title:{
								text:this.modellast+this.compon+" PSI Trend",
	              show:this.nameLock,
								left:'center',
								
					 },
							tooltip: {
								 trigger: 'axis',
							axisPointer: {
								type: 'cross',

								crossStyle: {
									color: '#999'
								}
							},
							textStyle: {

								align: 'left'
							},
							},

							legend: {
								top: "93%",
		            left:"center",
		             icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
									itemWidth: 12,  // 设置宽度							
							  	itemHeight: 12, // 设置高度
									itemGap: 15,
								data: ['Positive', 'Negative', 'PSI']
							},
							grid: {
								left: ' 15%',
								right: "15%",
								top: "5%",
								bottom: "19%"

							},
							toolbox: {
							orient:'vertical',
               show: vm.nomol,
						feature: {
							// dataView: {readOnly: false},
							saveAsImage: {
								title: 'Save',
							},
							myTool2: {
						show: true,
						title: 'Full',
							icon: 'image://data:image/png;base64,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',
						onclick: function () {			 
								vm.nomol=false;
								vm.nameLock=true;
								document.getElementById("main").style.display="block";
								vm.last("mainn");
						}
							}
						}
					},
							xAxis: [{
								type: 'category',
								data: publishtime,
								axisTick: {
									show: false
								},
								axisLine: {
									show: false
								},
								axisLabel: {
									interval: 0,
									rotate: 40
								},

								axisPointer: {
									type: 'shadow'
								}
							}],
							yAxis: [{
									type: 'value',
									name: "PSI Score",
								nameRotate: 90,
								boundaryGap: true,
								 scale: true,
								 
								 nameGap:40,
								 nameTextStyle: {
									fontSize: "95%",
									fontWeight: "bold",
								},
								axisLabel: {
									interval: 0, 
								formatter: function(value, index) {
									return value.toFixed(2);
								}
							},
								nameLocation: "middle",
								},
								{
								name: "Mentions Qty",
								nameRotate: 270,
								nameGap:40,
								boundaryGap: true,
								 scale: true,
                                 axisLabel: {
																	 interval: 0, 
								  formatter: function(value,index){
					        		var value;
					        		if (value >=1000) {
					        			value = value/1000+'k';
					        		}else if(value <1000){
					        			value = value;
					        		}
					        		return value
					        	}
                                },
								 nameTextStyle: {
									fontSize: "95%",
									fontWeight: "bold",
								},
								nameLocation: "middle",
									type: 'value',
									splitLine: {
										show: false,
									},

								}
							],
							series: [{
									name: 'Negative',
									color: ['#d55a57'],
									type: 'bar',
									cursor:"default",
									stack: '总量',
									yAxisIndex: 1,
									data: dataNegative,
									animationDelay: function (idx) {
							            return idx * 10;
							        }
								},
								{
									name: 'Positive',
									type: 'bar',
									cursor:"default",
									color: ['#91c7ae'],
									stack: '总量',
									yAxisIndex: 1,
									data: dataPositive,
									animationDelay: function (idx) {
							            return idx * 10 + 100;
							        }
								},
								{
									name: 'PSI',
									type: 'line',
									symbol: 'diamond',
								symbolSize:7,
								itemStyle: {
									normal: {
										color: '#0073be',
										lineStyle: {
											color: '#acacac'
										}
									}
								},
								label: {
									normal: {
										show: true,
									}
								
							},

									data: dataPsi
								},
						
							],
							animationEasing: 'elasticOut',
						    animationDelayUpdate: function (idx) {
						        return idx * 5;
						       
						    }
						}, true);
							window.addEventListener("resize", () => { myCharts.resize();});
						

					} else {
						this.$message.warning("If there is a problem with the data, please contact the administrator.");
					}

				}, function(res) {
					alert('error');
				});
			},
			}
		}
	
</script>

<style scoped>
	@import"../css/categroy.css";
	
</style>