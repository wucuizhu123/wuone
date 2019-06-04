<template>
	<div id="yy">
		<div class="scorll">
			<el-row :gutter="20">
				<el-col :span="24">
					<h1 style="text-align:left;font-size:2.18rem;padding-left:0.5rem;"> Product View <span style="font-size:1.2rem;color:#d55a57;"> —— To give you the landscape of models for a selected brand/segment; Click the model you focus on for deep dive</span></h1>
				</el-col>
			</el-row >
			<el-row :gutter="20">
				<el-col :span="24" class="top-two">
					<el-select v-model="soce" class="comm" clearable placeholder="source" @change="currentSel">
					<el-option v-for="item in this.source" :key="item.commentSource" :label="item.commentSource" :value="item.websiteId" @click="cc()" class="mar">
					</el-option>
				</el-select>
				<el-select v-model="bard" class="comm" clearable placeholder="brand">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-select v-model="type" class="comm" clearable placeholder="product type">
					<el-option v-for="item in opti" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>		
				<el-select v-model="segn" class="comm" clearable placeholder="segment">
					<el-option v-for="item in opt" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-date-picker
				v-model="startime"	class="comm" clearable	type="month" value-format="yyyy-MM" placeholder="Comment StartDate" :picker-options="pickerOptions">
				</el-date-picker>
			<el-date-picker	v-model="endtime"	class="comm"	type="month"				value-format="yyyy-MM"	clearable placeholder="Comment EndDate" :picker-options="pickerOptions">	</el-date-picker>				
				<el-button round class="comme" @click="sech()">Search</el-button>
				<el-tooltip class="item" effect="dark" :content=one  placement="top">
                   <a  target="tune"  v-bind:href="apiUrl+'/pcModel/exportProductViewExcel.do?startTime='+startime+'&endTime='+endtime+'&source='+soce+'&brand='+bard+'&category='+type+'&segment='+segn"    style="width:9%;height:40px; border:1px solid #dcdfe6;display: inline-block; border-radius:20px; font-size:0.875rem;line-height:40px; color: #606266; "  @click="port()"><i class="el-icon-loading" v-show="cpmw"></i>Data Export</a>
                </el-tooltip>
				</el-col>
			</el-row>
			</div>
			<div>
				<div class="scorll">
			<el-row :gutter="20">
				<el-col :span="12">
					<div class="littetop"><p class="comelitte">Model Ordered by Negative Mentions <el-autocomplete v-model="comme" :fetch-suggestions="querySearchAsync" placeholder="Query" clearable  @select="handleSelect" class="secou"></el-autocomplete> </p> </div>
					<div id="myChartx" :style="{width: '100%', height: '33rem'}" class="ko"></div>
					 
				</el-col>
				<el-col :span="12">
					<div class="littetop"><p class="comelitte">{{come}}  Category Ordered By
						   <el-select v-model="mun" @change="chan" collapse-tags class="comu">
							<el-option v-for="item in this.optio" :key="item.label" :label="item.label" :value="item.value" class="mar">
							</el-option>
						</el-select></p></div>
					<div id="myChartd" :style="{width: '100%', height: '33rem'}" class="ko"></div>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="maychart">
				<el-col :span="24">
					<div class="littetop"><p class="comelitte"> {{come}} Box Level PSI Trend</p></div>
					<div id="myCharts" :style="{width: '100%', height: '22rem'}" class="ko"></div>
				</el-col>
			</el-row>

			<el-row :gutter="20" class="maychart">
				<el-col :span="24">
					<div class="littetop"><p class="comelitte">{{come}} Category Level PSI Trend  <span style="font-size:0.7rem;">(Ordered by {{muno}})</span></p></div>
					<div id="myCharty" :style="{width: '100%', height: '37.5rem'}" class="ko"></div>
				</el-col>
			</el-row>
			<el-row :gutter="20" class="maychart">
				<el-col :span="24">
				<div class="littetop"><p class="comelitte"> Comments  <span style="font-size:0.9rem;"> Click above Bar-Chart to get comments for a selected category</span></p></div>
					<div id="itable" class="ko">
						<table>
							<!--相关评论 -->
							<tr>
								<td>
								<el-radio-group v-model="radi" @change="dsds()" >
									<el-radio label=""  style="margin-left:0px !important;">All</el-radio>
									<el-radio label="正面" style="margin-left:0px !important;">Positive</el-radio>
									<el-radio label="UE" style="margin-left:0px !important;">Negative</el-radio>
								</el-radio-group></td>
								
							<td >
							<el-tooltip class="item" effect="dark" :content=one  placement="top">
							  <a target="tune" v-bind:href="apiUrl+'/byModel/exportCommentsPartExcel.do?startTime='+startime+'&endTime='+endtime+'&model='+come+'&scope='+diou+'&level='+compon+'&source='+soce+'&segment='+segn"  style="height:40px;display:inline-block; line-height:40px;color:#606266;"  @click="porten(); return false;" download=""  mce_href="#"  ><i class="el-icon-loading" v-show="covm" ></i>Comments Export</a>
							</el-tooltip></td>
							</tr>

							<tr v-for='sug in tableSug'>
								<td class="leftone">用户：{{sug.user}} </br>
									来源：{{sug.source}}</br>
									时间：{{sug.publishTime}}
								</td>
								<td class="contentcolor" v-html="sug.content"></td>
							</tr>
						</table>
						
						<el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total,  prev, pager, next, jumper" :total="tatolnumer"></el-pagination>
					</div>
					<div v-if="cpmo" id="covertop"><!---->
							<img src="../assets/timg.gif" width="700px" height="500px" id="ss">
						</div>
				</el-col>				
			</el-row>
			</div>
			<div id="main" style="width:88.3%;height:91%;position:absolute;z-index:2500;background:#fff;top:60px;display:none;text-align:left;">
				<el-button type="info" round @click="haowan" style="margin-bottom:0.5%;margin-top:0.5%; margin-left:1%;">Back</el-button>
				<div id="mainn" style="width:88.7%;height:90%;margin-left:5%"></div>
			</div>	
			<iframe name="tune" style="display:none"></iframe>
			
			</div>
					
		</div>
			
		
	<!-- </div> -->
</template>

<script>
	import api,{ setCookie,getCookie} from '../api/indexapi';
	import {comm} from '../api/index';
	export default {
		name: 'Model',
		data() {
			return {
				cityOptions:["正面","UE"],
				soce: this.$route.query.souc,	
				bard: "",
				type: this.$route.query.band,
				segn: this.$route.query.segn,
				startime: this.$route.query.start,
				endtime: this.$route.query.end,
				soue: "",				
				mun: "",
				checkAll: false,     
                isIndeterminate: true,
				input10: "",
				source: "",
				comme: "",
				come: "RESCUER Y7000",
				compon: "",
				nomo:true,
				nameLock:false,
				namLock:false,
				muno:"",
				cover: "",
				tag: {},
				one:"Response time may be longer",
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
				nomol:true,
				mololl:false,
				cpmw:false,
				covm:false,
				cpmo:false,
				tatolnumer: 0,
				options: [{
					value: '',
					label: 'Lenovo+Think'
				 }, {
					value: 'THINK',
					label: 'THINK '
				 }, {
					value: 'LENOVO',
					label: 'LENOVO '
				}],
				opt: [{
					value: '',
					label: 'All Segment'
				 }, {
					value: 'Consumer',
					label: 'Consumer'
				 }, {
					value: 'Commercial',
					label: 'Commercial'
				 }, {
					value: 'SMB',
					label: 'SMB'
				 }, ],
				optio: [{
						value: '1',
						label: 'Total '
					},
					{
						value: '2',
						label: 'Negative '
					}, {
						value: '3',
						label: 'Positive'
					}
				],
				model: [],
				opti: [{
					value: '',
					label: 'All Type'
					}, {
						value: '1',
						label: 'NB '
					}, {
					value: '0',
					label: 'DT'
				}],				
				apiUrl: api.apiUrl,
				currentPage: 1, //初始页
				pagesize: 7,
				radiou:[],
				radi:"正面",
				diou:[],
				source: [],
				soces: [],
				restaurants:[],
				tableSug: [],
			}
		},
		 created(){
         window.devicePixelRatio = 1;
  },
		mounted() {
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
			console.log(this.startime);
			console.log(this.endtime);         
			if(this.soce==0||this.soce==undefined){
					console.log("本页");
					this.soce="";					
				}else{
					this.soce=this.soce;					
				}
				if(this.segn==""||this.segn==undefined){
					console.log("本页");
					this.segn="";					
				}else{
					this.segn=this.segn;					
				}
				if(this.type==""||this.type==undefined){
					console.log("本页");
					this.type="";					
				}else{
					this.type=this.type;					
				}
				if(this.startime==""||this.startime==undefined){
					console.log("本页");
					this.startime=time;
				}else{
					this.startime=this.startime;
				}
				if(this.endtime==""||this.endtime==undefined){
					console.log("本页");
						this.endtime = time1;
				}else{
					this.endtime=this.endtime;
				}
            let uname = getCookie('username')
            this.name = uname
            /*如果cookie不存在，则跳转到登录页*/
            if(uname == ""){
                this.$router.push('/Login')
			}
			this.mun = "1";
			this.cover = "a";
			this.diou=encodeURI(encodeURI(this.radi));
		    this.record();
			this.drawLine("myChartx");
			this.naver("myCharts");
			this.pan("myChartd","myCharty");
		},
		methods: {
		querySearchAsync(queryString, cb) {
				var restaurants = this.restaurants;
				console.log(this.restaurants);
				var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					cb(results);
				}, 3000 * Math.random());
			},
		createStateFilter(queryString) {
				return(state) => {
					return(state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			
		chan(){
            this.pan("myChartd","myCharty");
			},
		handleSelect(item) {
				console.log("hjijijijiji");
				this.drawLine("myChartx");
			
			},
		haowan(){
				this.nomol=true;
				this.nomo=true;
				this.nameLock=false;
				this.namLock=false;
				document.getElementById("main").style.display="none";
			},

		handleSizeChange: function(size) {
				this.pagesize = 7;
			},
		handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				this.dsds();
				//点击第几页
			},
		
			porten(){
				this.covm=true;
                 this.$http.post(api.apiUrl + '/byModel/isExport').then(function(data) {
                        if(data.data){		
							this.covm=false;
							this.one="Response time may be longer"
						}else{	
							this.covm=true;					
							this.one="Loading";							
						    this.porten();	
						}  
						   
				}, function(res) {
					this.porten();
					this.covm=false;
					console.log('导出评论的error');
				});
				 
			},
			port(){
                this.$http.post(api.apiUrl + '/pcModel/isExport').then(function(data) {				 
                        if(data.data){							
							this.cpmw=false;
							this.one="Response time may be longer"
						}else{
							this.cpmw=true;
							this.one="Loading";
						this.port();	
						}     
                	
             
				}, function(res) {
				});
		},
			
		sech: function() {
			this.drawLine("myChartx");
			this.naver("myCharts");
			this.pan("myChartd","myCharty");
			},
		record: function() {

				var sou = {
					"commentSource": "All Sources",
					"websiteId": "",
				};
				//	显示数据brand source
				this.$http.get(this.apiUrl + '/pcIndustry/dicProxy').then(function(data) {
					this.source = data.data.result.source;
					this.band = data.data.result.brand;
					this.source.unshift(sou);                  
				}, function(res) {
					console.log('dicProxy error');
				});
			},
		currentSel(comvalue) {
				if(comvalue == "All Sources") {
					comvalue = "";
				}
			},
		
		
		drawLine(id) {
                 this.soces = [];
				if(this.soce == "") {
					this.soces = [];
				} else {					
					this.soces.push(this.soce);
				}		 
				this.restaurants=[];
				// 基于准备好的dom，初始化echarts实例
				let myChartx = this.$echarts.init(document.getElementById(id));
				myChartx.showLoading();
				var da = [];
				var ta = [];
				var le = [];
				var me = [];
				var np1 = [];
				np1 = [];
				da = [];
				ta = [];
				le = [];
				me = [];
				  var vm=this;
				  
				this.$http.post(this.apiUrl + '/pcModel/modelView1Proxy', {
					"startTime": this.startime,
					"endTime": this.endtime,
					"source": this.soces,
					"brand": this.bard,
					"category": this.type,
					"model": this.input10,
					"segment": this.segn
				}).then(function(data) {
					//左边图 Neggetive mentions
					if(data.data.status=="0") {
					
						for(let i = 0; i < data.data.result.list.length; i++) {
							da.unshift(data.data.result.list[i].negative);
							ta.unshift(data.data.result.list[i].positive);
							le.unshift(data.data.result.list[i].series);
							me.unshift(Math.round(data.data.result.list[i].psi * 100) / 100);

							if(data.data.result.target != null) {
								np1.unshift(data.data.result.target);
							}
                           var coco = {};
							coco.value = "";
							coco.value = data.data.result.list[i].series;
                           this.restaurants.push(coco);	
						}
						var oneo=this.comme;
						// console.log(this.restaurants);
					    var allTop=le.indexOf(this.comme)+10;				
						var size = "";
						size=le.indexOf(this.comme)-10;
						console.log(size);
						 if(size<0){
							  size=0
						  }
                          if(allTop>le.length){
							  allTop=le.length-1;
							  size=le.length-21
						  }
						  if(this.comme==""){
							 allTop=le.length-1;
							  size=le.length-21
						}

					} else {
						this.$message.warning("If there is a problem with the data, please contact the administrator.");
					}			
					myChartx.hideLoading();
					// 基于准备好的dom，初始化echarts实例
					// 绘制图表
					var Option={
						 title:{
								text:"Model Ordered by Negative Mentions",
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
							top: "93.5%",
							left: "center",
							data: ['Negative', 'Positive', "PSI", "Tgt"],
							icon: "circle",   //  这个字段控制形状  
							itemWidth: 12,  // 设置宽度							
							itemHeight: 12, // 设置高度							
							itemGap: 40 // 设置间距
						},
						axisPointer: {
							triggerTooltip:true,
							link: {
								xAxisIndex: 'all'
							}
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
								vm.drawLine("mainn");
						}
							}
						}
					},
					dataZoom: [ {
				type: 'inside',
				realtime: true,
				startValue:allTop,//默认为0
				endValue:size,
				zoomLock:this.nomol,
				yAxisIndex: [0, 1]
                },{

				 startValue:allTop,//默认为0
                 endValue:size,
               type: 'slider',
               show: true,
               yAxisIndex: [0,1],
               zoomLock:this.nomol, 
                //滑动条的 左右2个滑动条的大小
			   right: "6%",
			   width:11,
               handleSize: 17,
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
			   showDetail: false,
			//即拖拽时候是否显示详细数值信息 默认true
                handleIcon: 'image://data:image/png;base64,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0p8zAAA60GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE4LTEyLTI1VDE0OjMyOjE0KzA4OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxOC0xMi0yNVQxNDozMjoxNSswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTgtMTItMjVUMTQ6MzI6MTUrMDg6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjk0MDAyNWRjLWQ2MzAtYTE0Ni05NWFkLWEyY2Y3OTE0MDFhYTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDpmMTE3ZDg3OC0yNzAzLTgwNDQtYmVlYi01YWM3ZjU0YTAwNmM8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpmMTE3ZDg3OC0yNzAzLTgwNDQtYmVlYi01YWM3ZjU0YTAwNmM8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZjExN2Q4NzgtMjcwMy04MDQ0LWJlZWItNWFjN2Y1NGEwMDZjPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE4LTEyLTI1VDE0OjMyOjE0KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo5NDAwMjVkYy1kNjMwLWExNDYtOTVhZC1hMmNmNzkxNDAxYWE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTgtMTItMjVUMTQ6MzI6MTUrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgICAgPHJkZjpCYWc+CiAgICAgICAgICAgICAgIDxyZGY6bGk+QjQ0MTUxRDY0RDY1RjcwRUJDMDQwMkMyQUFGMDRFODA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPnNSR0IgSUVDNjE5NjYtMi4xPC9waG90b3Nob3A6SUNDUHJvZmlsZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pi3riMEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAQxJREFUeNqk1L1KY1EUhuEnG6aLV6DNKtIFxFoQYiWD2ngFU0T0DsZCsLabQvAyLBwm2KiFhTYOzOmXFja2opWaaZJwYMj4c95uw/7ezV58rNZwOFQnMwOrWMYCZnGLKxzhV0Q81DOtuiQz+9gehadxhu8RcfmPJDN3sYfibZ6wERGDiSQzt3DwTsGYByxGxJ+SmR1sflAAM/hhFFx7Ywb/o5eZ3wqWNGO9YL6hZKFgrqFkruCuoeSm4HcDwRCnBecNJM8R0S/4ietPSo6rqmo1aexjRLTHZRMRh9jBywe+0R4fJi9HxD6+YoDnaWGcRMSXqaugthJ6WBm1uYN7XEREv6qq0u12X+v3/w4Afg1YJjkMH0wAAAAASUVORK5CYII=',
               filterMode: 'filter',
          },
						],
						grid: [{
						top:"6%",
						bottom:"5%",
						left: "5%",
						height: '87%',
						width: "66.3%",
						containLabel: true
					},
					{
						left: "71%",
							top:"6%",
							bottom:"5%",
						   right: "1%",
						   height: '83%',
						   width: "17%",
			
					}
						],
						xAxis: [{
								type: 'value',
								axisTick: {
									show: false,
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
								axisLine: {
									onZero: true
								},
								nameLocation: "start",

							},
							{
								gridIndex: 1,
								type: 'value',
								axisTick: {
									show: false
								},
								axisLine: {
									onZero: true
								},
								inverse: false,
								position: "top",
								nameLocation: "start",
							}
						],
						yAxis: [{
								type: 'category',
								axisLine: {
									onZero: true
								},
								
								data: le,
								triggerEvent: true,
						        axisLabel: {
                                    interval: 0,                             
						            color: function (value) {
						                return value == oneo ? '#0bb0a7' : 'black';
						            },
						      },
								axisTick: {
									show: true
								},
								axisPointer: {
									type: 'shadow'
								},
								splitLine: {
									show: true,
								},
						},
							{
								gridIndex: 1,
								type: 'category',
								name: "PSI Score",
								nameRotate: 90,
								boundaryGap: true,
							     scale: true,
								nameLocation: "middle",
								axisTick: {
									show: false
								},
								axisLabel: {
                                    interval: 0, 
									color: "transparent"
								},
								nameTextStyle: {
									fontSize: 20,
									fontWeight: "bold",
								},
								axisLine: {
									show: false
								},
								axisPointer: {
									type: 'shadow'
								},
								data: le,
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
								data: da,
								 animationDelay: function (idx) {
							            return idx * 10 + 100;
							        }
							},
							{
								name: 'Positive',
								type: 'bar',
								stack: '总量',
								color: ['#91c7ae'],
								symbolSize: 8,
								smooth: true,
								data: ta,
								 animationDelay: function (idx) {
							            return idx * 10 + 100;
							        }
							},
							{
								name:'PSI',
								// smooth: true,
								type: 'line',
								xAxisIndex: 1,
								yAxisIndex: 1,
								right: ['80%', '30%'],
								//  hoverAnimation: true,
								data: me,
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
							{
								name: 'Tgt',
								smooth: true,
								type: 'line',
								xAxisIndex: 1,
								yAxisIndex: 1,
								right: ['80%', '30%'],
								data: np1,
								symbol: 'none',
								itemStyle: { /*设置折线颜色*/
									normal: {
										lineStyle: {
											width: 2,
											type: 'dotted' //线条样式，虚线
										}
									}
								} //拐点样式
							}
						],
						  animationDelayUpdate: function (idx) {
						        return idx * 5;						        
						    }		   
					}
					
                   myChartx.clear();
					myChartx.setOption(Option, true);
					window.addEventListener("resize", () => { myChartx.resize();});
					myChartx.on('click', (params) => {
						if(params.componentType =="yAxis" ){
						console.log(params);
						this.come = params.value;
						}else{
						console.log(params);
						this.come = params.name;
				}
						var that = this;
						this.cover = "a";
						this.naver("myCharts");
						this.pan("myChartd","myCharty");
					})
                
				}, function() {
					console.log("error");
				})
			},
			 naver(two) {
				var vm=this;
				this.soces = [];
				if(this.soce == "") {
					this.soces = [];
				} else {
					this.soces.push(this.soce);
				}
				let myCharts = this.$echarts.init(document.getElementById(two));

						myCharts.showLoading();
				this.$http.post(api.apiUrl+'/byModel/modelSeriesLevel', {
					"startTime": this.startime,
					"endTime": this.endtime,
					"source": this.soces,
					"model": this.come,
					"brand": this.bard,
					"category": this.type,				
					"segment": this.segn
				}).then(function(data) {
					//三饼图
					if(data.data.status = "0") {
					if(data.data.result != null) {
						console.log(data);
						this.tag = data.data.result;
						var dataPositive = [];
						var dataNegative = [];
						var dataPsi = [];
						var dataTarget = [];
						var publishtime = [];
						var k = 0;
						var a = 0;
						var b = 0;
						var c = 0;
						var p = 0;
						if(this.tag.modelList.length > 0) {
							for(var i = 0; i < this.tag.modelList.length; i++) {
								dataPsi[k++] = Math.round(this.tag.modelList[i].psi * 100) / 100;
								dataTarget[a++] = data.data.result.target;
								dataNegative[b++] = this.tag.modelList[i].negative;
								dataPositive[c++] = this.tag.modelList[i].positive;
								publishtime[p++] = this.tag.modelList[i].publishTime;
							}
						}
						}
						myCharts.hideLoading();

						myCharts.setOption({
							title:{
								text:this.come+" Box Level PSI Trend",
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
							left: "center",
							data: ['Positive', 'Negative', 'PSI', 'Tgt'],
							icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
							itemWidth: 12,  // 设置宽度							
							itemHeight: 12, // 设置高度							
							itemGap: 40 // 设置间距
							},
							grid: {
								left: '8%',
								right: "8%",
								top: "4%",
								bottom: "25%"
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
									vm.naver("mainn");
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
									nameGap: 45,
								    boundaryGap: true,
								    scale: true,
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
								nameGap: 45,
								boundaryGap: true,
								 scale: true,
								 nameTextStyle: {
									fontSize: "95%",
									fontWeight: "bold",
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
									stack: '总量',
									yAxisIndex: 1,
									cursor:"default",
									smooth: true,
								hoverAnimation: true,
									data: dataNegative,
									animationDelay: function (idx) {
							            return idx * 10;
							        }
								},
								{
									name: 'Positive',
									type: 'bar',
									color: ['#91c7ae'],
									stack: '总量',
									yAxisIndex: 1,
									cursor:"default",
								smooth: true,
								hoverAnimation: true,
									data: dataPositive,
									animationDelay: function (idx) {
							            return idx * 10 + 100;
							        }
								},
								{
									name: 'PSI',
									type: 'line',
									cursor:"default",
									symbol: 'diamond',
								   symbolSize:7,
                                    label: {
										normal: {
											show: true,
										}
									},
									itemStyle: {
									normal: {
										color: '#0073be',
										lineStyle: {
											color: '#acacac'
										}
									}
								},	
									data: dataPsi
								},
								{
									name: 'Tgt',
									cursor:"default",
									symbol: 'none',
									itemStyle: { /*设置折线颜色*/
									normal: {
										lineStyle: {
											width: 2,
											type: 'dotted' //线条样式，虚线
										}
									},
									},
									type: 'line',                                  
									data: dataTarget
								}
							],
							animationEasing: 'elasticOut',
						    animationDelayUpdate: function (idx) {
						        return idx * 5;        
							}			    
						}, true);
					window.addEventListener("resize", () => { myCharts.resize();});
					
						// this.pan();
					} else {
						this.$message.warning("If there is a problem with the data, please contact the administrator. ");
					}
				}, function(res) {
					console.log('error');
				});
			},
			pan(id,io) {
				let vm = this;
				let myChartd = vm.$echarts.init(document.getElementById(id));
			     myChartd.showLoading();
				let myCharty = vm.$echarts.init(document.getElementById(io));
				myCharty.showLoading();
				var native1 = [];
				var positive1 = [];
				var psi1 = [];
				var lend1 = [];
				var size = [];
				var nativ1 = [];
				var positiv1 = [];
				var psii1 = [];
				var len1 = [];
				var sizea = [];	
				if(vm.mun == 1) {
					vm.muno="Total";
					var apiPan="/byModel/modelTotalSeriesLevel"
					}else if(vm.mun == 2){
					vm.muno="Negative";
					var apiPan="/byModel/modelNegativeSeriesLevel"
					}else{
                    vm.muno="Positive";
					var apiPan="/byModel/modelPositiveSeriesLevel"
					}
				this.$http.post(api.apiUrl+apiPan, {
					"startTime": this.startime,
					"endTime": this.endtime,
					"source": this.soces,
					"model": this.come,
					"brand": this.bard,
					"category": this.type,
					"segment": this.segn
				}).then(function(data) {	
					console.log(this.tag);
					if(data.data.status = "0") {
						this.tag = data.data.result;		
					for(let p = 0; p < vm.tag.amountList.length; p++) {
						nativ1.unshift(vm.tag.amountList[p].negative);
						positiv1.unshift(vm.tag.amountList[p].positive);
						psii1.unshift(Math.round(vm.tag.amountList[p].psi * 100) / 100);
						len1.unshift(vm.tag.amountList[p].components);
					}
					var sizea = 100 - (2000 / len1.length);
					var vArray = [];
					var vNum = 0;
					var temmer = [];
					var publish = [];
						if(this.tag.componentList.length > 0) {
						for(var e = 0; e < vm.tag.componentList[0].componentList.length; e++) {
							var vTempAry = {};
							vTempAry.name = vm.tag.componentList[0].componentList[e].publishTime;
							vTempAry.type = "bar";
							vTempAry.data = [];
							vTempAry.barGap=0;

							publish.push(vm.tag.componentList[0].componentList[e].publishTime)
							vTempAry.data.push(0);
							var k = 0;
							for(var p = 0; p < vm.tag.componentList.length; p++) {
								vTempAry.data[k++] = Math.round(vm.tag.componentList[p].componentList[e].psi * 100) / 100;
							}
							vArray[vNum++] = vTempAry;
						}
					}
					if(vm.tag.componentList.length > 0) {
						for(var r = 0; r < vm.tag.componentList.length; r++) {
							temmer.push(vm.tag.componentList[r].brand); //
						}
					}

				myChartd.hideLoading();
				myChartd.setOption({	
					title:{
								text:this.come+"Category Ordered By"+this.muno,
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
						top: "95%",
						left: "center",
						data: ['Negative', 'Positive', "PSI"],
						y: 'left',
						icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
						itemWidth: 12,  // 设置宽度	
						itemHeight: 12, // 设置高度							
						itemGap: 40 // 设置间距
					},
					axisPointer: {
						link: {
							xAxisIndex: 'all'
						}
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
								vm.pan("mainn","myCharty");
						       }
							}
						}
					},
			dataZoom: [
				{
				type: 'inside',
				realtime: true,
				start:100,//默认为0
                 end:sizea,
				zoomLock:this.nomol,
				yAxisIndex: [0, 1]
                },{    
			     start:100,//默认为0
                 end:sizea,
                 type: 'slider',
                 show: true,
                 yAxisIndex: [0,1],
                 zoomLock: this.nomol,     
                 width:11,
                 handleSize: 17,//滑动条的 左右2个滑动条的大小
                 right: "3%",
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
			   showDetail: false,
		//即拖拽时候是否显示详细数值信息 默认true
               handleIcon: 'image://data:image/png;base64,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0p8zAAA60GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE4LTEyLTI1VDE0OjMyOjE0KzA4OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxOC0xMi0yNVQxNDozMjoxNSswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTgtMTItMjVUMTQ6MzI6MTUrMDg6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjk0MDAyNWRjLWQ2MzAtYTE0Ni05NWFkLWEyY2Y3OTE0MDFhYTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDpmMTE3ZDg3OC0yNzAzLTgwNDQtYmVlYi01YWM3ZjU0YTAwNmM8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpmMTE3ZDg3OC0yNzAzLTgwNDQtYmVlYi01YWM3ZjU0YTAwNmM8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZjExN2Q4NzgtMjcwMy04MDQ0LWJlZWItNWFjN2Y1NGEwMDZjPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE4LTEyLTI1VDE0OjMyOjE0KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo5NDAwMjVkYy1kNjMwLWExNDYtOTVhZC1hMmNmNzkxNDAxYWE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTgtMTItMjVUMTQ6MzI6MTUrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgICAgPHJkZjpCYWc+CiAgICAgICAgICAgICAgIDxyZGY6bGk+QjQ0MTUxRDY0RDY1RjcwRUJDMDQwMkMyQUFGMDRFODA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPnNSR0IgSUVDNjE5NjYtMi4xPC9waG90b3Nob3A6SUNDUHJvZmlsZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pi3riMEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAQxJREFUeNqk1L1KY1EUhuEnG6aLV6DNKtIFxFoQYiWD2ngFU0T0DsZCsLabQvAyLBwm2KiFhTYOzOmXFja2opWaaZJwYMj4c95uw/7ezV58rNZwOFQnMwOrWMYCZnGLKxzhV0Q81DOtuiQz+9gehadxhu8RcfmPJDN3sYfibZ6wERGDiSQzt3DwTsGYByxGxJ+SmR1sflAAM/hhFFx7Ywb/o5eZ3wqWNGO9YL6hZKFgrqFkruCuoeSm4HcDwRCnBecNJM8R0S/4ietPSo6rqmo1aexjRLTHZRMRh9jBywe+0R4fJi9HxD6+YoDnaWGcRMSXqaugthJ6WBm1uYN7XEREv6qq0u12X+v3/w4Afg1YJjkMH0wAAAAASUVORK5CYII=',
               filterMode: 'filter',
            },
					],
					grid: [{
						left: 0,
						  top: "6%",
						height: '88%',
						width: "76%",
						containLabel: true
					},
					{
						top: "6%",
						left: "73%",
//						right: "1%",
						height: '83.8%',
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
//							triggerEvent: true,

							axisLine: {
								onZero: true
							},
							data: len1,
							splitLine: {
								show: true,
							},
							axisPointer: {
									type: 'shadow'
								}
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
							//          boundaryGap : false,
							axisLine: {
								show: false,
							},
							data: len1,
							show: true,
							position: 'top',
							splitLine: {
								show: true,
							},
							axisPointer: {
									type: 'shadow'
								}
						}

					],
					series: [{
							name: 'Negative',
							type: 'bar',
							color: ['#d55a57'],
							symbolSize: 8,
							stack: '总量',
							cursor:"default",
							smooth: true,
							hoverAnimation: true,
							data: nativ1,
							animationDelay: function (idx) {
							            return idx * 10 + 100;
							        }						
						},
						{
							name: 'Positive',
							type: 'bar',
							cursor:"default",
							stack: '总量',
							color: ['#91c7ae'],
							symbolSize: 8,
							smooth: true,
							data: positiv1,
							animationDelay: function (idx) {
							            return idx * 10 + 100;
							        }
						},
						{
							name: 'PSI',
							type: 'line',
							xAxisIndex: 1,
							yAxisIndex: 1,
							cursor:"default",
							right: ['80%', '30%'],
							data: psii1,
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
				window.addEventListener("resize", () => { myChartd.resize();});
				myCharty.hideLoading();
				myCharty.setOption({
					title:{
								text:this.come+" Category Level PSI Trend",
	                            show:this.namLock,
								left:'center',
								
					 },
					calculable: true,
					xAxis: {
						axisLine: {
							show: false
						},
						tooltip: {
							trigger: 'item',
							axisPointer: {
								type: 'cross',

								crossStyle: {
									color: '#999'
								}
							},
							axisPointer: {
									type: 'shadow'
							},
							textStyle: {

								align: 'left'
							},
						},
						axisLabel: {
							interval: 0,
							rotate: 40
						},
					
						axisTick: {
							show: false
						},

						data: temmer,
					},
					toolbox: {
						orient:'vertical',
                        show: vm.nomol,
						feature: {
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
								vm.pan("myChartd","mainn");
						}
							}
						}
					},
					dataZoom: [	{
				type: 'inside',
				realtime: true,
				start: 1,
                end: 18,
				zoomLock:this.nomo,
				xAxisIndex: [0]
                },{
						 
                type: 'slider',
                start: 1,
                end: 18,
                show: true,
                xAxisIndex: [0],
                handleSize: 17,//滑动条的 左右2个滑动条的大小
                zoomLock: this.nomo,
                height: 11,//组件高度
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
				showDetail: false,
			//即拖拽时候是否显示详细数值信息 默认true
               handleIcon: 'image://data:image/png;base64,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0p8zAAA60GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE4LTEyLTI1VDE0OjMyOjE0KzA4OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxOC0xMi0yNVQxNDozMjoxNSswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTgtMTItMjVUMTQ6MzI6MTUrMDg6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjk0MDAyNWRjLWQ2MzAtYTE0Ni05NWFkLWEyY2Y3OTE0MDFhYTwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDpmMTE3ZDg3OC0yNzAzLTgwNDQtYmVlYi01YWM3ZjU0YTAwNmM8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpmMTE3ZDg3OC0yNzAzLTgwNDQtYmVlYi01YWM3ZjU0YTAwNmM8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZjExN2Q4NzgtMjcwMy04MDQ0LWJlZWItNWFjN2Y1NGEwMDZjPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE4LTEyLTI1VDE0OjMyOjE0KzA4OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo5NDAwMjVkYy1kNjMwLWExNDYtOTVhZC1hMmNmNzkxNDAxYWE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTgtMTItMjVUMTQ6MzI6MTUrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgICAgPHJkZjpCYWc+CiAgICAgICAgICAgICAgIDxyZGY6bGk+QjQ0MTUxRDY0RDY1RjcwRUJDMDQwMkMyQUFGMDRFODA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPnNSR0IgSUVDNjE5NjYtMi4xPC9waG90b3Nob3A6SUNDUHJvZmlsZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTc8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pi3riMEAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAQxJREFUeNqk1L1KY1EUhuEnG6aLV6DNKtIFxFoQYiWD2ngFU0T0DsZCsLabQvAyLBwm2KiFhTYOzOmXFja2opWaaZJwYMj4c95uw/7ezV58rNZwOFQnMwOrWMYCZnGLKxzhV0Q81DOtuiQz+9gehadxhu8RcfmPJDN3sYfibZ6wERGDiSQzt3DwTsGYByxGxJ+SmR1sflAAM/hhFFx7Ywb/o5eZ3wqWNGO9YL6hZKFgrqFkruCuoeSm4HcDwRCnBecNJM8R0S/4ietPSo6rqmo1aexjRLTHZRMRh9jBywe+0R4fJi9HxD6+YoDnaWGcRMSXqaugthJ6WBm1uYN7XEREv6qq0u12X+v3/w4Afg1YJjkMH0wAAAAASUVORK5CYII=',
                filterMode: 'filter',
            }],
					legend: {
						width: "90%",
						left: "center",
						data: publish,
						top: "2%",
						icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
							itemWidth: 12,  // 设置宽度							
							itemHeight: 12, // 设置高度
							itemGap: 10 // 设置间距											
					},
					grid: {
						top: "8%",
						bottom: "30%"
					},
					tooltip:{
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
						axisTick: {
							show: false
						},

						axisLabel: {
							interval: 0, 
								formatter: function(value, index) {
									return value.toFixed(2);
								},
								textStyle: {
								color: '#999'
							}
							},
						
					},
					series: vArray,
					animationEasing: 'elasticOut',
						    animationDelayUpdate: function (idx) {
						        return idx * 5;
						        
						    }
					
				}, true);
				window.addEventListener("resize", () => { myCharty.resize();});
				myCharty.on('click', (params) => {
					this.compon = params.name;
					this.dsds();
				});
				} else {
						this.$message.warning("If there is a problem with the data, please contact the administrator. ");
					}
				}, function(res) {
					console.log('error');
				});

			},
			//评论表格 颜色改变
			dsds() {
				this.cpmo=true;
				var sel = this;
				sel.soces = [];
				if(sel.soce == "") {
					sel.soces = [];
				} else {
					sel.soces.push(sel.soce);
				};

				if(this.radi=="正面"){
					this.radiou=["正面"];
					this.diou=encodeURI(encodeURI("正面"));
				}else if(this.radi=="UE"){
					this.radiou=["UE","故障"];
					this.diou=encodeURI(encodeURI("UE,故障"));
				}else{
				this.radiou=[];	
				this.diou=[];
				}


           this.$http.post(api.apiUrl + '/byModel/modelCommentPartCase', {
					"endTime": this.endtime,
					"level": this.compon,
					"source": this.soces,
					"startTime":this.startime,
					"model": this.come,
					"scope": this.radiou,
					"limit": 7,
					"page": this.currentPage,
					"segment": "",
				}).then(function(data) {
					if(data.data.status == "0") {
						this.tatolnumer = data.data.result.count;
						
						this.tableSug = data.data.result.modelCommentList.map
						var xs = data.data.result.modelCommentList.map;
						var xsxf = document.getElementsByClassName('contentcolor');                     
						for(var i = 0; i < data.data.result.modelCommentList.map.length; i++) {
						 var greatop=data.data.result.modelCommentList.map[i].contentList;
                         //清楚时间的时分秒
						 xs[i].publishTime=xs[i].publishTime.slice(0,10);
						 console.log(xs[i].publishTime.length)
						 //判断正负评论改变颜色
                         if(data.data.result.modelCommentList.map[i].contentList instanceof Array){
							 for(let h=0;h<data.data.result.modelCommentList.map[i].contentList.length;h++){	
								var str = greatop[h].opinionPart;	
								for(let z=0;z<str.length;z++){
                                if(str[z]=="?"){
									str=str.replace("?","")
									z=z-1;
							 }
						 }	
								var reg = eval("/" + str + "/gi"); 
								if(this.radi=="正面") {
									 xs[i].content =  xs[i].content.replace(reg, "<font color='#409EFF'>" + str + "</font>");		
								}else if(this.radi=="UE"){
									xs[i].content =  xs[i].content.replace(reg, "<font color='#FF0000'>" + str + "</font>");  
								}else{
								 xs[i].content =  xs[i].content.replace(reg, "<font color='#000000'>" + str + "</font>");  	
								}
						}
						 }else{
                                  for(var j in data.data.result.modelCommentList.map[i].contentList){  
									  //解决？不能被匹配的问题
								 var trans=data.data.result.modelCommentList.map[i].contentList[j];
								 var str=trans;
								 console.log(data.data.result);
								 for(let z=0;z<str.length;z++){
                                if(str[z]=="?"){
									str=str.replace("?","")
									z=z-1;
							 }
						 }
								var reg = eval("/" + str + "/gi");
								if(this.radi=="正面") {
									 xs[i].content =  xs[i].content.replace(reg, "<font color='#409EFF'>" + str + "</font>");
									
								}else if(this.radi=="UE"){
									xs[i].content =  xs[i].content.replace(reg, "<font color='#FF0000'>" + str + "</font>");  
								}else{
								 xs[i].content =  xs[i].content.replace(reg, "<font color='#000000'>" + str + "</font>");  	
								}
							}
						 }
						}
						this.cpmo=false;
					} else {
						this.$message.warning("If there is a problem with the data, please contact the administrator. ");
					}

				}, function(res) {
					console.log('error');
				});

			}
			//		
		}
	}
</script>
<style>
.el-autocomplete-suggestion li{
	overflow: inherit !important;
     text-overflow: inherit!important;	
	}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import"../css/pucduct.css";
	.dou{
		border:none
	}
	 .bok{
			position:absolute;
			z-index:100000;
			background:#fff;
			width:49%;
			height:34.3rem;
			top:0px;
			animation:myfirst 1s;
			-moz-animation:myfirst 0.5s; 
			-o-animation:myfirst 0.5s;
			-webkit-animation:myfirst 0.5s;
			animation-fill-mode:forwards;
			-moz-animation-fill-mode:forwards; 
			-o-animation-fill-mode:forwards;
			-webkit-animation-fill-mode:forwards;

  }

@keyframes myfirst{
    from {top:0px;width:50%;height:34.5rem;}
    to {top:-80px;width:100%;height:45rem;}
}
@-webkit-keyframes myfirst  /*Safari 和 Chrome*/ 
{
       from {top:0px;width:50%;height:34.5rem;}
        to {top:-80px;width:100%;height:45rem;}
         }
@-moz-keyframes myfirst  /*Firefox*/
{
       from {top:0px;width:50%;height:34.5rem;}
        to {top:-80px;width:100%;height:45rem;}
}

@-o-keyframes myfirst  /*Opera*/
{
       from {top:0px;width:50%;height:34.5rem;}
      to {top:-80px;width:100%;height:45rem;}
}
.con{
	width:88.6%;  
    width: -moz-calc(100% - 200px); 
    width: -webkit-calc(100% - 200px); 
    width: calc(100% - 200px); 
	height: 90%;  
    height: -moz-calc(100% - 75px); 
    height: -webkit-calc(100% - 75px); 
    height: calc(100% - 72px); position:absolute;z-index:2500;background:#fff;top:60px;display:none;text-align:left;
}
	
</style>