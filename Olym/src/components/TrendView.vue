<template>
	<div id="yy">
		<div id="scorll" >
			<el-row :gutter="20">
				<el-col :span="19">
					<h1 class="label-top" style="text-align:left;font-size:2.18rem;padding-left:0.5rem;"> PSI Overall View <span style="font-size:1.4rem"> ( For PC)</span> </h1></el-col>
					<el-col :span="5"><p  class="label-top" style="text-align:left;color:#5b5a5a;font-size:1rem; margin-left:0.5rem;" @click="Old()"><a style="color:#5b5a5a;"> For FY1819 PSI fixed,click here ></a></p></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="16">
					<div class="littetop"><p class="comelitte">FY1920 Lenovo+Think</p></div>
					<el-row :gutter="20" class="consol">
						<el-col :span="8">
							<div id="myCharta" ref="echarts" :style="{width: '100%', height: '10rem'}" class="tre "></div>
						</el-col>
						<el-col :span="8">
							<div id="myChartb" :style="{width: '100%', height: '10rem'}" class="tre "></div>
						</el-col>
						<el-col :span="8">
							<div id="myChartp" :style="{width: '100%', height: '10rem'}" class="tre "></div>
						</el-col>
					</el-row> 
				</el-col>
				<el-col :span="8" >
					<div style="width:100%;height:2rem;"></div>
					<el-select v-model="souces" class="comen" clearable placeholder="Data Source" @change="current">
						<el-option v-for="item in this.source" :key="item.commentSource" :label="item.commentSource" :value="item.shortBrand"  class="mar">
						</el-option>
					</el-select>
					<el-date-picker  v-model="startime"  class="contwo" style=" padding-right: 0px !important;  " clearable  type="month"   value-format="yyyy-MM"  placeholder="Comment StartDate" :picker-options="pickerOptions"> </el-date-picker>
					<!-- <el-button round class="fokl" > -->
						<a v-bind:href="apiUrl+'/pcIndustry/trendExcelDownloads?startTime='+startime+'&endTime='+endtime+'&source='+souces+'&brand='+brand" target="tune" style="width:22% ;height:40px; border:1px solid #dcdfe6;display: inline-block; border-radius:20px; font-size:0.875rem;line-height:40px; color: #606266; ">Data Export</a>
					<!-- </el-button> -->
					<!--<span class="demonstration">默认</span>-->
					<el-select v-model="brand" class="comen" multiple collapse-tags @change="currentBel" placeholder="Brands">
						<el-option v-for="item in this.band" :key="item.endBrand" :label="item.endBrand" :value="item.shortBrand"></el-option>
					</el-select>
                    <el-date-picker   v-model="endtime"   class="contwo"   type="month"   value-format="yyyy-MM"   clearable   placeholder="Comment EndDate" :picker-options="pickerOptions"> </el-date-picker>
					<el-button round class="fokl" @click="toChild()">Search</el-button>
					<span style="font-size:1.1rem;color:#ffd04b;text-align:left;">Notes：YTD time frame is Apr～valid data month </span>
				</el-col>
			  </el-row>
			  
			    <child ref="child" :soce="souces" :brand="brand" :startime="startime" :endtime="endtime" @ee="consly" @vall="vaa"></child>
			  <el-row :gutter="20" class="centerboton" >
				<div class="littetop"><p class="comelitte">FY1920 Lenovo+Think Segment YTD</p></div>
				<el-col :span="4">
					<div id="myChartq" :style="{width: '100%', height: '11rem'}" ></div>
				</el-col>
				<el-col :span="4">
					<div id="myChartw" :style="{width: '100%', height: '11rem'}" ></div>
				</el-col>
				<el-col :span="4">
					<div id="myCharte" :style="{width: '100%', height: '11rem'}" ></div>
				</el-col>
				<el-col :span="4">
					<div id="myChartr" :style="{width: '100%', height: '11rem'}" ></div>
				</el-col>
				<el-col :span="4">
					<div id="myChartt" :style="{width: '100%', height: '11rem'}" ></div>
				</el-col>
				<el-col :span="4">
					<div id="myChartc" :style="{width: '100%', height: '11rem'}" ></div>
				</el-col>
			</el-row>
			<Three ref="Three"  :soce="souces" :startime="startime" :endtime="endtime" :mou="soucn"  @ee="consly"  ></Three>
			<div id="main" style="width:86%;height:91%;position:absolute;z-index:2500;background:#fff;top:60px;display:none;text-align:left;">
				<el-button type="info" round @click="haowan" style="margin-bottom:0.5%;margin-top:0.5%; margin-left:1%;">Back</el-button>
				<div id="mainn" style="width:86%;height:90%;margin-left:5%;display:none;"></div>
				<div id="mainbiao" style="width:86%;height:90%;margin-left:5%;display:none;">
					<div ><p class="comelitte"> Mentions Quantity</p></div>
			  	<div class=" ko">
					<div class="table1">
					<table>
						<tr>
							<th>Brand</th>
							<th v-for='zz in tableheader'>{{zz}}</th>
						</tr>
						<tr v-for="jj in tablerom">
							<td v-for="uu in jj">{{uu}}</td>
						</tr>
					</table> 
					</div>
				</div>
				</div>
				
			</div>	
			<iframe name="tune" style="display:none;"></iframe>
		</div>
	</div>
</template>
<script>
	import api,{ setCookie,getCookie}from '../api/indexapi';
	import child from "./cosol.vue";
	import Three from "./three.vue";
	export default {
		name: 'parent',
		components: {
			child,
			Three
		},
		data() {
			return {
				souces: "",
				souse: "",
				name: '',
				soucn:0,
				brand: [],
				tableheader:[],
				tablerom:[],
				startime: "",
				endtime: "",
				tableif:true,
				timePc:"",
				source: [],
				band: [],
				type: "",
			   pickerOptions:{
            disabledDate(time){
							  	let _now = Date.now(),					
							     date1=new Date(2019,4,1),
                   date2=new Date(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()),
                   datez=(date2.getTime()-date1.getTime())/(1000*60*60*24),/*不用考虑闰年否*/
									 seven =(1090+datez)* 24 * 3600000,
									 sevenDays = _now - seven;
									(new Date().getDate()<15)?_now=_now-(1000*60*60*24*60):_now=_now-(1000*60*60*24*30);					
                return time.getTime() > _now || time.getTime() < sevenDays;
　　　　　　　　　　　　　　//大于当前的禁止，小于7天前的禁止
                //  return time.getTime() > Date.now()
            }
        },
				apiUrl: api.apiUrl,
			};
		},
created(){
 window.devicePixelRatio = 1;
},
		mounted() {
            let uname = getCookie('username')
            this.name = uname
						/*如果cookie不存在，则跳转到登录页*/
						if(window.location.hash.indexOf("Quality_Portal")==-1){
						if(uname == ""){
								this.$router.push('/Login');
						}
						}else{
							this.$router.push('/Overall');
							 setCookie('username',"Quality_Portal",10000*60);
						}
            
						//  console.log(window.location.hash.indexOf("wang")); 
					var Height = window.innerHeight - 60;
					document.getElementById("yy").style.height = Height + "px";
					var pre = new Date();
					var year = pre.getFullYear() - 1;
					var month = pre.getMonth() + 1; //js从0开始取 
					var date = pre.getDate();
					if(month < 10) {	month = "0" + month;}			
					let _now = Date.now();
					var time = year + "-" + month;
					var now = new Date();
					var year1 = pre.getFullYear();
					var month2=pre.getMonth();
					(date>15)?month2=month2:month2=month2-1;
							if(month2 < 10) {	month2 = "0" + month2;}	
					var time1 = year1 + "-" + month2;
					this.startime = time;
					this.endtime = time1;
					this.record();
					this.summr();
					this.$refs.child.fromParent("myChart",time,time1);
					this.$refs.Three.fromParent("myChart0","myChart1","myChart2",time,time1);	
		
		},
		methods: {
		   comee(time){
			   const self = this
					return {
						disabledDate(time){
							this.$http.get(api.apiUrl + '/time/segmentTimeCase').then(function(data) {
						if(data.data.status == "0") {
							var cc=data.data.result.startTime;
													let _now = Date.now(),
											seven =1030* 24 * 3600000,
						sevenDays = _now - seven;
										return new Date(self.startime).getTime() < time.getTime()

						} else {
							this.$message.warning("If there is a problem with the data, please contact the administrator.");
						}
						

					}, function(res) {
						alert('error');
					});
						}
					}

			 },
			 vaa(value){
			
				 this.tableheader=value[0];
				  this.tablerom=value[1];
				document.getElementById("main").style.display="block";
					document.getElementById("mainbiao").style.display="block";
						document.getElementById("mainn").style.display="none";
				
			 },
			 Old(){
            	this.$router.push('/Overallon');
			 },
			 consly(){
				   this.tableif=false;
						document.getElementById("main").style.display="block";
							document.getElementById("mainn").style.display="block";
								document.getElementById("mainbiao").style.display="none";
			 },
			
			 haowan(){
				document.getElementById("main").style.display="none";
				 this.tableif=true;
				this.nomol=false;
				this.nomo=false;
				this.nom=false;
			},
			toChild() {
				this.summr();
				/** this.$refs.child返回child组件实例 **/
				// 调用子组件的fromParent方法
				this.$refs.child.fromParent("myChart");
			this.$refs.Three.fromParent("myChart0","myChart1","myChart2");

			},

			record: function() {
				var sou = {
					"commentSource": "All Sources",
					"shortBrand": "",
					"websiteId":0,
				}
				var bard = {
					"endBrand": "All Brand",
					"shortBrand": ""
				}
				//	显示数据brand source
				this.$http.get(api.apiUrl + '/pcIndustry/dicProxy').then(function(data) {
					if(data.data.status == "0") {
						for(var i = 0; i < data.data.result.brand.length; i++) {
							if(data.data.result.brand[i].endBrand=="OTHER"||data.data.result.brand[i].endBrand=="MECHPEVO"){

							}else{
								this.band.push(data.data.result.brand[i]) ;
                            data.data.result.brand[i].shortBrand = data.data.result.brand[i].endBrand;
							}
							
						}
						this.source = data.data.result.source;
						for(var i = 0; i < data.data.result.source.length; i++) {
							data.data.result.source[i].shortBrand = data.data.result.source[i].commentSource;
						}
						// this.band = data.data.result.brand;

						this.source.unshift(sou);
						this.band.unshift(bard);
					} else {
						this.$message.warning("If there is a problem with the data, please contact the administrator.");
					}

				}, function(res) {
					alert('error');
				});
			},
			current(val) {
			      for(var i=0;i<this.source.length;i++){
						if(val==this.source[i].commentSource){
						this.soucn=this.source[i].websiteId;
						console.log(this.soucn);
					} 
					 }
			},
			currentBel(val) {
				let allValues = []
				for(let item of this.band) {
					if(item.shortBrand == "") {} else {
						allValues.push(item.shortBrand);
					}
				}
				if(val.length == 10) {
					if(val[10] == undefined) {
						this.brand = [];
					}
				} else if(val.length == 1) {
					(val == "")?this.brand = allValues:this.brand = this.brand
				} else {
					for(var c = 0; c < val.length; c++) {
		
						if(val[c] == "") {
							this.brand = allValues;
						}
					}

				}
			},
			summr() {

				let myCharta = this.$echarts.init(document.getElementById('myCharta'));
				let myChartb = this.$echarts.init(document.getElementById('myChartb'));
				let myChartp = this.$echarts.init(document.getElementById('myChartp'));
				let myChartq = this.$echarts.init(document.getElementById('myChartq'));
				let myChartw = this.$echarts.init(document.getElementById('myChartw'));
				let myCharte = this.$echarts.init(document.getElementById('myCharte'));
				let myChartr = this.$echarts.init(document.getElementById('myChartr'));
				let myChartt = this.$echarts.init(document.getElementById('myChartt'));
				let myChartc = this.$echarts.init(document.getElementById('myChartc'));
				
				myCharta.showLoading();
				myChartb.showLoading();
				myChartp.showLoading();
				myChartq.showLoading();
				myChartw.showLoading();
				myCharte.showLoading();
				myChartr.showLoading();
				myChartt.showLoading();
				myChartc.showLoading();
				//		myChartf.showLoading();
				var that = this;
				var tag = [];
				var cons = [];
				var chang = [];
				var Q1psi = "";
				var Q2psi = "";
				var zhu = [];
				this.$http.post(api.apiUrl+'/byBrandAndBySegement/topTable', {
					"source": this.souces
				}).then(function(data) {
					if(data.data.status == "0") {		
					var	tag = data.data.result;
						console.log(tag);
						this.da1 = [];
						this.da = [];
						var labelQ1 = "";
						var labelQ2 = "";

						zhu = tag.PcOverAll[0];
						this.timePc=tag.PcOverAll[0].time;
						Q1psi =Math.round(zhu.Qfirst * 100) / 100;
						Q2psi =Math.round(zhu.Qsecond * 100) / 100;
						var factVal = 5;
						var planVal = 19;
            var targetQ=tag.PcOverAll[0].Target;				
						 var f = parseFloat(targetQ);
						   if (isNaN(f)) {
						      return false;
						   }
						   var f = Math.round(targetQ*100)/100;
						   var s = f.toString();
						   var rs = s.indexOf('.');
						   if (rs < 0) {
						      rs = s.length;
						      s += '.';
						   }
						   while (s.length <= rs + 2) {
						      s += '0';
						   }
						   if(this.souces==""||this.souces=="360buy"){
						   	targetQ=s;
						   
						   }else{
						   	targetQ="n/a";
						   }
						   
            labelQ1 = targetQ;
					  labelQ2 = targetQ;
						var color = []; 
						var ytdQ = Math.round(tag.PcOverAll[0].ytd * 100) / 100;
						var ytd1 = Math.round(tag.Commercial[0].DT[0].ytd * 100) / 100;
						var ytd2 = Math.round(tag.Commercial[0].NB[0].ytd * 100) / 100;
						var ytd3 = Math.round(tag.Consumer[0].DT[0].ytd * 100) / 100;
						var ytd4 = Math.round(tag.Consumer[0].NB[0].ytd * 100) / 100;
						var ytd5 = Math.round(tag.SMB[0].DT[0].ytd * 100) / 100;
						var ytd6 = Math.round(tag.SMB[0].NB[0].ytd * 100) / 100;
						
						if(this.souces=="360buy"){
							var targetX="6.15"
								var colortolX=[[(targetX-4) / 5, '#d54b44'],[1, '#4bb052']]
						}else if(this.souces == "") {
							var targetX="6.80"
							var colortolX=[[(targetX-4) / 5, '#d54b44'],[1, '#4bb052']]
						}else{
							var targetX = 'n/a';
							var colortolX=[[0, '#8C8FB5'],[1, '#8C8FB5']]
						}

						// 绘制图表
					if(this.souces == "360buy"||this.souces == "") {
							  	var targetCN =tag.Consumer[0].NB[0].target;
									var targetCD = tag.Consumer[0].DT[0].target; 
									var targetCNB = tag.Commercial[0].NB[0].target;	
									var targetCDT = tag.Commercial[0].DT[0].target;
						    	var targetSN = tag.SMB[0].NB[0].target;
									var targetSD = tag.SMB[0].DT[0].target;
				
						  var colorCN = [	[(targetCN-4)/ 5, '#d54b44'],[1, '#4bb052']];
							var colorCD = [[(targetCD-4)/ 5 , '#d54b44'],[1, '#4bb052']];						
							var colorCNB = [[(targetCNB-4)/ 5 , '#d54b44'],[1, '#4bb052']];					
							var colorCDT = [[(targetCDT-4)/ 5 , '#d54b44'],[1, '#4bb052']];					
							var colorSN = [[(targetSN-4) / 5, '#d54b44'],[1, '#4bb052']];
							var colorSD = [[(targetSD-4)/ 5, '#d54b44'],[1, '#4bb052']];
							var colortol=[[(targetQ-4) / 5, '#d54b44'],[1, '#4bb052']]

					}else{
							var colortol=[[0, '#8C8FB5'],[1, '#8C8FB5']]
									var colorCN = [[0, '#8C8FB5'],[1, '#8C8FB5']];
									var colorCD = [[0, '#8C8FB5'],[1, '#8C8FB5']];							
									var colorCNB = [[0, '#8C8FB5'],[1, '#8C8FB5']];							
									var colorCDT = [[0, '#8C8FB5'],[1, '#8C8FB5']];						
									var colorSN = [[0, '#8C8FB5'],[1, '#8C8FB5']];
									var colorSD = [[0, '#8C8FB5'],[1, '#8C8FB5']];								
									var targetCN = "n/a";							
									var targetCD = "n/a";							
									var targetCNB = "n/a";							
									var targetCDT = "n/a";							
									var targetSN = "n/a";							
									var targetSD = 'n/a';
					}
							
					} else {
						this.$message.warning("If there is a problem with the data, please contact the administrator.");
					}
					myCharta.hideLoading();
					myChartb.hideLoading();
					myChartp.hideLoading();
					myChartq.hideLoading();
					myChartw.hideLoading();
					myCharte.hideLoading();
					myChartr.hideLoading();
					myChartt.hideLoading();
					myChartc.hideLoading();
					if(this.souces == "") {
						this.souse = "All Sources";
					} else {
						this.souse = this.souces;
					}
					myCharta.setOption({

									title: [{
										left: 'center',
										text: 'FY1920 YTD ',
										top:"3%",
										textStyle: {
													fontWeight: 'bolder',
													fontFamily:"Arial, Helvetica, sans-serif",
													// fontSize: 17,
													color: '#000',
													shadowColor: '#fff', //默认透明
													shadowBlur: 10
										},
										subtext: this.souse+"  " +"Tgt:"+targetQ,
										itemGap: 4,
									}],
									//						backgroundColor: '#f4f4f4',
									tooltip: {
										formatter: "{a} <br/>{c} {b}"
									},
									toolbox: {
										show: true,
										feature: {},
									},
									series: [{
										name: 'YTD',
										type: 'gauge',
										min: 4,
										max: 9,
										startAngle: 180,
										endAngle: 0,
										splitNumber: 5,
										radius: '100%',
										center: ['50%', '82%'],
										//          top:100,
										axisLine: { // 坐标轴线
													show: true,
													lineStyle: { // 属性lineStyle控制线条样式
												color: colortol,
												width: 20,
												shadowColor: '#fff', //默认透明
												shadowBlur: 10
											}
										},
										axisTick: {
											show: false,
										},
										axisLabel: {
											show: true,
										},
										splitLine: { // 分隔线
											length: 28, // 属性length控制线长
											lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
												width: 3,
												color: 'auto',

											}
										},
										pointer: {
											length: '80%',
											width: '5px',
											color: "#000", // 分隔线
											shadowColor: '#fff', //默认透明
											shadowBlur: 5,

										},
										itemStyle: {
											color: "#000"
										},
										markPoint: {
									           	   symbol:'circle',
									               //设置符号大小
									               symbolSize: 10,
									               itemStyle:{  
					                               normal:{
																					label:{  
							                               show: true,  
							                               color: '#333333',
							                               position: 'bottom',  
							                               formatter: function (value) {  
							                               	
							                               		return value;
					                               	
					                                      }    
													     }  
													}
													}
				
																				},
										detail: {
											formatter: function(value) {						
												return value 
											},
											shadowBlur: 3,
											offsetCenter: ["2%", '25%'], // x, y，单位px
											textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
												fontSize: 20,
												// fontWeight: "bold",
												color: '#000'
											}
										},
										data: [{
											value: ytdQ,
											//								name: 'PSI'
										}]
									}]

								}, true);
										myChartb.setOption({
									title: [{
										left: 'center',
										text: "FY1819"+zhu.QfirstName,
										top:"3%",
										textStyle: {
											fontWeight: 'bolder',
											// fontSize: 17,
											fontFamily:"Arial, Helvetica, sans-serif",
											color: '#000',
											shadowColor: '#fff', //默认透明
											shadowBlur: 10
										},
										subtext: this.souse+"  " +"Tgt:"+targetX,
										itemGap: 4,
									}],
									//		backgroundColor: '#f4f4f4',
									tooltip: {
										formatter: "{a} <br/>{c} {b}"
									},
									toolbox: {
										show: true,
										feature: {},
									},
									series: [{
										name: 'YTD',
										type: 'gauge',
										min: 4,
										max: 9,
										startAngle: 180,
										endAngle: 0,
										splitNumber: 5,
										radius: '100%',
										center: ['50%', '82%'],
										//          top:100,							
										axisLine: { // 坐标轴线
											show: true,
											lineStyle: { // 属性lineStyle控制线条样式
												color: colortolX,	
												width: 20,
												shadowColor: '#fff', //默认透明
												shadowBlur: 10
											}
										},
										axisTick: {
											show: false,
										},
										axisLabel: {
											show: true,
										},
										splitLine: { // 分隔线
											length: 28, // 属性length控制线长
											lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
												width: 3,
												color: 'auto',
											}
										},
										pointer: {
											length: '80%',
											width: '5px',
											color: "#000", // 分隔线
											shadowColor: '#fff', //默认透明
											shadowBlur: 5,

										},
										itemStyle: {
											color: "#000"
										},
										markPoint: {      
											symbol: 'circle',
											         //设置符号大小
											        symbolSize: 10,
											        itemStyle: {           
												normal: {
													label: {                 
														show: true,
														  color: '#333333',
														 position: 'bottom',
															 formatter: function(value) { 		                                
															return value;               
														}                 
													}               
												}  
											}
										},
										detail: {
											formatter: function(value) {
									
												return value
											},
											shadowBlur: 3,
											offsetCenter: ["2%", '25%'], // x, y，单位px
											textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
												fontSize: 20,
												// fontWeight: "bold",
												color: '#000'
											}
										},
										data: [{
											value: Q1psi,
											//		name: 'PSI'
										}]
									}, ]

					}, true);
					myChartp.setOption({
						title: [{
							left: 'center',
							text:"FY1920"+zhu.QsecondName,
							top:"3%",
							textStyle: {
								fontWeight: 'bolder',
								// fontSize: 17,
								fontFamily:"Arial, Helvetica, sans-serif",
								color: '#000',
								shadowColor: '#fff', //默认透明
								shadowBlur: 10
							},
							subtext: this.souse+"  " +"Tgt:"+targetQ,
							itemGap: 4,
						}],
						//		backgroundColor: '#f4f4f4',
						tooltip: {
							formatter: "{a} <br/>{c} {b}"
						},
						toolbox: {
							show: true,
							feature: {},
						},
						series: [{
							name: 'YTD',
							type: 'gauge',
							min: 4,
							max: 9,
							startAngle: 180,
							endAngle: 0,
							splitNumber: 5,
							radius: '100%',
							center: ['50%', '82%'],
							//          top:100,
							axisLine: { // 坐标轴线
								show: true,
								lineStyle: { // 属性lineStyle控制线条样式
									color: colortol,
									width: 20,
									shadowColor: '#fff', //默认透明
									shadowBlur: 10
								}
							},
							axisTick: {
								show: false,
							},
							axisLabel: {
								show: true,
							},
							splitLine: { // 分隔线
								length: 28, // 属性length控制线长
								lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
									width: 3,
									color: 'auto',

								}
							},
							pointer: {
								length: '80%',
								width: '5px',
								color: "#000", // 分隔线
								shadowColor: '#fff', //默认透明
								shadowBlur: 5,

							},
							itemStyle: {
								color: "#000"
							},
							markPoint: {      
								symbol: 'circle',
								         //设置符号大小
								        symbolSize: 10,
								        itemStyle: {           
									normal: {
										label: {                 
											show: true,
											                 color: '#333333',
											                position: 'bottom',
											                 formatter: function(value) { 	                                
												return value;               
											}                 
										}               
									}  
								}
							},
							detail: {
								formatter: function(value) {
					
									return value
								},
								shadowBlur: 3,
								offsetCenter: ["2%", '25%'], // x, y，单位px
								textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontSize: 20,
									// fontWeight: "bold",
									color: '#000'
								}
							},
							data: [{
								value: Q2psi,
								//name: 'PSI'
							}]
						}, ]

					}, true);
					myChartq.setOption({
						title: [{
							left: 'center',
							text: 'Consumer NB',
							top:"4.5%",
							textStyle: {
								fontWeight: 'bolder',
								// fontSize: 17,
								fontFamily:"Arial, Helvetica, sans-serif",
								color: '#000',
								shadowColor: '#fff', //默认透明
								shadowBlur: 10
							},
							subtext: this.souse+"    "+'Tgt: ' + targetCN,
							itemGap: 4,
						}],
						//	backgroundColor: '#f4f4f4',
						tooltip: {
							formatter: "{a} <br/>{c} {b}"
						},
						toolbox: {
							show: true,
							feature: {},
						},
						series: [{
							name: 'YTD',
							type: 'gauge',
							min: 4,
							max: 9,
							startAngle: 180,
							endAngle: 0,
							splitNumber: 5,
							radius: '100%',
							center: ['50%', '81%'],
							//          top:100,
							axisLine: { // 坐标轴线
								show: true,
								lineStyle: { // 属性lineStyle控制线条样式
									color: colorCN,
									width: 20,
									shadowColor: '#fff', //默认透明
									shadowBlur: 10
								}
							},
							axisTick: {
								show: false,
							},
							axisLabel: {
								show: true,
							},
							splitLine: { // 分隔线
								length: 28, // 属性length控制线长
								lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
									width: 3,
									color: 'auto',

								}
							},
							pointer: {
								length: '80%',
								width: '5px',
								color: "#000", // 分隔线
								shadowColor: '#fff', //默认透明
								shadowBlur: 5,

							},
							itemStyle: {
								color: "#000"
							},
							markPoint: {      
								symbol: 'circle',
								         //设置符号大小
								        symbolSize: 10,
								        itemStyle: {           
									normal: {
										label: {                 
											show: true,
							                color: '#333333',
							                position: 'bottom',
							                formatter: function(value) { 		                                
										    return value;               
											}                 
										}               
									}  
								}
							},
							detail: {
								formatter: function(value) {
									return value
								},
								shadowBlur: 3,
								offsetCenter: ["2%", '24%'], // x, y，单位px
								textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontSize: 20,
									// fontWeight: "bold",
									color: '#000'
								}
							},
							data: [{
								value: ytd4,
								//								name: 'PSI'
							}]
						}, ]

					}, true);
					myChartw.setOption({

						title: [{
							left: 'center',
							text: 'Consumer DT ',
							top:"4.5%",
							textStyle: {
								fontWeight: 'bolder',
								fontFamily:"Arial, Helvetica, sans-serif",
								// fontSize: 17,
								color: '#000',
								shadowColor: '#fff', //默认透明
								shadowBlur: 10
							},
							subtext: this.souse+"    "+'Tgt: ' + targetCD,
							itemGap: 4,
						}],
						//						backgroundColor: '#f4f4f4',
						tooltip: {
							formatter: "{a} <br/>{c} {b}"
						},
						toolbox: {
							show: true,
							feature: {},
						},
						series: [{
							name: 'YTD',
							type: 'gauge',
							min: 4,
							max: 9,
							startAngle: 180,
							endAngle: 0,
							splitNumber: 5,
							radius: '100%',
							center: ['50%', '81%'],
							//          top:100,
							axisLine: { // 坐标轴线
								show: true,
								lineStyle: { // 属性lineStyle控制线条样式
									color: colorCD,
									width: 20,
									shadowColor: '#fff', //默认透明
									shadowBlur: 10
								}
							},
							axisTick: {
								show: false,
							},
							axisLabel: {
								show: true,
							},
							splitLine: { // 分隔线
								length: 28, // 属性length控制线长
								lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
									width: 3,
									color: 'auto',

								}
							},
							pointer: {
								length: '80%',
								width: '5px',
								color: "#000", // 分隔线
								shadowColor: '#fff', //默认透明
								shadowBlur: 5,

							},
							itemStyle: {
								color: "#000"
							},
						
							markPoint: {      
								symbol: 'circle',
								         //设置符号大小
								        symbolSize: 10,
								        itemStyle: {           
									normal: {
										label: {                 
											show: true,
							                 color: '#333333',
							                position: 'bottom',
							                 formatter: function(value) { 
												//		                                
												return value;               
											}                 
										}               
									}  
								}
							},
							detail: {
								formatter: function(value) {

									
									return value
								},
								shadowBlur: 3,
								offsetCenter: ["2%", '24%'], // x, y，单位px
								textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontSize: 20,
									// fontWeight: "bold",
									color: '#000'
								}
							},
							data: [{
								value: ytd3,
								//								name: 'PSI'
							}]
						}, ]

					}, true);
					myCharte.setOption({
						title: [{
							left: 'center',
							text: 'Commercial NB ',
							top:"4.5%",
							textStyle: {
								fontWeight: 'bolder',
								fontFamily:"Arial, Helvetica, sans-serif",
								color: '#000',
								shadowColor: '#fff', //默认透明
								shadowBlur: 10
							},
							subtext: this.souse+"    "+'Tgt: ' + targetCNB,
							itemGap: 4,
						}],
						//						backgroundColor: '#f4f4f4',
						tooltip: {
							formatter: "{a} <br/>{c} {b}"
						},
						toolbox: {
							show: true,
							feature: {},
						},
						series: [{
							name: 'YTD',
							type: 'gauge',
							min: 4,
							max: 9,
							startAngle: 180,
							endAngle: 0,
							splitNumber: 5,
							radius: '100%',
							center: ['50%', '81%'],
							//          top:100,
							axisLine: { // 坐标轴线
								show: true,
								lineStyle: { // 属性lineStyle控制线条样式
									color: colorCNB,
									width: 20,
									shadowColor: '#fff', //默认透明
									shadowBlur: 10
								}
							},
							axisTick: {
								show: false,
							},
							axisLabel: {
								show: true,
							},
							splitLine: { // 分隔线
								length: 28, // 属性length控制线长
								lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
									width: 3,
									color: 'auto',

								}
							},
							pointer: {
								length: '80%',
								width: '5px',
								color: "#000", // 分隔线
								shadowColor: '#fff', //默认透明
								shadowBlur: 5,

							},
							itemStyle: {
								color: "#000"
							},
							markPoint: {      
								symbol: 'circle',
								         //设置符号大小
								        symbolSize: 10,
								        itemStyle: {           
									normal: {
										label: {                 
											show: true,
											                 color: '#333333',
											                position: 'bottom',
											                 formatter: function(value) { 
												//		                                
												return value;               
											}                 
										}               
									}  
								}
							},
							detail: {
								formatter: function(value) {
									return value
								},
								shadowBlur: 3,
								offsetCenter: ["2%", '24%'], // x, y，单位px
								textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontSize: 20,
									// fontWeight: "bold",
									color: '#000'
								}
							},
							data: [{
								value: ytd2,
								//								name: 'PSI'
							}]
						}, ]

					}, true);
					myChartr.setOption({

						title: [{
							left: 'center',
							text: ' Commercial DT ',
							top:"4.5%",
							textStyle: {
								fontWeight: 'bolder',
								fontFamily:"Arial, Helvetica, sans-serif",
								// fontSize: 17,
								color: '#000',
								shadowColor: '#fff', //默认透明
								shadowBlur: 10
							},
							subtext: this.souse+"    "+'Tgt: ' + targetCDT,
							itemGap: 4,
						}
						],
						//						backgroundColor: '#f4f4f4',
						tooltip: {
							formatter: "{a} <br/>{c} {b}"
						},
						toolbox: {
							show: true,
							feature: {},
						},
						series: [{
							name: 'YTD',
							type: 'gauge',
							min: 4,
							max: 9,
							startAngle: 180,
							endAngle: 0,
							splitNumber: 5,
							radius: '100%',
							center: ['50%', '81%'],
							//          top:100,
							axisLine: { // 坐标轴线
								show: true,
								lineStyle: { // 属性lineStyle控制线条样式
									color: colorCDT,
									width: 20,
									shadowColor: '#fff', //默认透明
									shadowBlur: 10
								}
							},
							axisTick: {
								show: false,
							},
							axisLabel: {
								show: true,
							},
							splitLine: { // 分隔线
								length: 28, // 属性length控制线长
								lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
									width: 3,
									color: 'auto',

								}
							},
							pointer: {
								length: '80%',
								width: '5px',
								color: "#000", // 分隔线
								shadowColor: '#fff', //默认透明
								shadowBlur: 5,

							},
							itemStyle: {
								color: "#000"
							},
							markPoint: {      
								symbol: 'circle',
								         //设置符号大小
								        symbolSize: 10,
								        itemStyle: {           
									normal: {
										label: {                 
											show: true,
											                 color: '#333333',
											                position: 'bottom',
											                 formatter: function(value) { 
												//		                                
												return value;               
											}                 
										}               
									}  
								}
							},
							detail: {
								formatter: function(value) {
									return value
								},
								shadowBlur: 3,
								offsetCenter: ["2%", '24%'], // x, y，单位px
								textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontSize: 20,
									// fontWeight: "bold",
									color: '#000'
								}
							},
							data: [{
								value: ytd1,
								//								name: 'PSI'
							}]
						}, ]

					}, true);
					myChartt.setOption({

						title: [{
							left: 'center',
							text: 'SMB NB ',
							top:"4.5%",
							textStyle: {
								fontWeight: 'bolder',
								fontFamily:"Arial, Helvetica, sans-serif",
								// fontSize: 17,
								color: '#000',
								shadowColor: '#fff', //默认透明
								shadowBlur: 10
							},
							subtext: this.souse+"    "+'Tgt: ' + targetSN,
							itemGap: 4,
						}],
						//						backgroundColor: '#f4f4f4',
						tooltip: {
							formatter: "{a} <br/>{c} {b}"
						},
						toolbox: {
							show: true,
							feature: {},
						},
						series: [{
							name: 'YTD',
							type: 'gauge',
							min: 4,
							max: 9,
							startAngle: 180,
							endAngle: 0,
							splitNumber: 5,
							radius: '100%',
							center: ['50%', '81%'],
							//          top:100,
							axisLine: { // 坐标轴线
								show: true,
								lineStyle: { // 属性lineStyle控制线条样式
									color: colorSN,
									width: 20,
									shadowColor: '#fff', //默认透明
									shadowBlur: 10
								}
							},
							axisTick: {
								show: false,
							},
							axisLabel: {
								show: true,
							},
							splitLine: { // 分隔线
								length: 28, // 属性length控制线长
								lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
									width: 3,
									color: 'auto',

								}
							},
							pointer: {
								length: '80%',
								width: '5px',
								color: "#000", // 分隔线
								shadowColor: '#fff', //默认透明
								shadowBlur: 5,

							},
							itemStyle: {
								color: "#000"
							},
							markPoint: {      
								symbol: 'circle',
								         //设置符号大小
								        symbolSize: 10,
								        itemStyle: {           
									normal: {
										label: {                 
											show: true,
											                 color: '#333333',
											                position: 'bottom',
											                 formatter: function(value) { 
												//		                                
												return value;               
											}                 
										}               
									}  
								}
							},
							detail: {
								formatter: function(value) {
                                       
							
									return value
									
									
								},
								shadowBlur: 3,
								offsetCenter: ["2%", '25%'], // x, y，单位px
								textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontSize: 20,
									// fontWeight: "bold",
									color: '#000'
								}
							},
							data: [{
								value: ytd6,
								//								name: 'PSI'
							}]
						}, ]

					}, true);
					myChartc.setOption({

						title: [{
							left: 'center',
							text: ' SMB DT ',
							top:"4.5%",
							textStyle: {
								fontWeight: 'bolder',
								fontFamily:"Arial, Helvetica, sans-serif",
								// fontSize: 17,
								
								color: '#000',
								shadowColor: '#fff', //默认透明
								shadowBlur: 10
							},
							subtext: this.souse+"    "+'Tgt: ' + targetSD,
							itemGap: 4,
						}],
						//						backgroundColor: '#f4f4f4',
						tooltip: {
							formatter: "{a} <br/>{c} {b}"
						},
						toolbox: {
							show: true,
							feature: {},
						},
						series: [{
							name: 'YTD',
							type: 'gauge',
							min: 4,
							max: 9,
							startAngle: 180,
							endAngle: 0,
							splitNumber: 5,
							radius: '100%',
							center: ['50%', '81%'],
							//          top:100,
							axisLine: { // 坐标轴线
								show: true,
								lineStyle: { // 属性lineStyle控制线条样式
									color: colorSD,
									width: 20,
									shadowColor: '#fff', //默认透明
									shadowBlur: 10
								}
							},
							axisTick: {
								show: false,
							},
							axisLabel: {
								show: true,
							},
							splitLine: { // 分隔线
								length: 28, // 属性length控制线长
								lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
									width: 3,
									color: 'auto',

								}
							},
							pointer: {
								length: '80%',
								width: '5px',
								color: "#000", // 分隔线
								shadowColor: '#fff', //默认透明
								shadowBlur: 5,

							},
							itemStyle: {
								color: "#000"
							},
							markPoint: {      
								symbol: 'circle',
								         //设置符号大小
								        symbolSize: 10,
								        itemStyle: {           
									normal: {
										label: {                 
											show: true,
											                 color: '#333333',
											                position: 'bottom',
											                 formatter: function(value) { 
												//		                                
												return value;               
											}                 
										}               
									}  
								}
							},
							detail: {
								formatter: function(value) {
									return value
								},
								shadowBlur: 3,
								offsetCenter: ["2%", '25%'], // x, y，单位px
								textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontSize: 20,
									// fontWeight: "bold",
									color: '#000'
								}
							},
							data: [{
								value: ytd5,
								//								name: 'PSI'
							}]
						}, ]

					}, true);
				window.addEventListener("resize", () => { myCharta.resize();});
				window.addEventListener("resize", () => { myChartb.resize();});
				window.addEventListener("resize", () => { myChartp.resize();});
				window.addEventListener("resize", () => { myChartq.resize();});
				window.addEventListener("resize", () => { myChartw.resize();});
				window.addEventListener("resize", () => { myCharte.resize();});
				window.addEventListener("resize", () => { myChartr.resize();});
				window.addEventListener("resize", () => { myChartt.resize();});
				window.addEventListener("resize", () => { myChartc.resize();});

					//					  
				}, function(res) {
					alert('error');
				});

			},

		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import"../css/Trend.css";
	h1,
	h2 {
		font-weight: normal;
	}
	.el-button.is-round {
    /* border-radius: 20px; */
	padding: 12px 10px !important;
	text-align:center;
}

a:hover{color:#00f !important;} 
	/*.ko{
	
	border:0.2px solid #dedede;
	 box-shadow:2px 5px 1px 1px #dedede;
	}*/
</style>