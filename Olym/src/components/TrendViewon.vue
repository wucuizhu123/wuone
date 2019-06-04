<template>
	<div id="yy">
		<div id="scorll" >
			<el-row :gutter="20">
				<el-col :span="20">
					<h1 class="label-top" style="text-align:left;font-size:2.18rem;padding-left:0.5rem;"> FY1819 PSI Result <span style="font-size:1.4rem"> (With FY1819 Fixed Weighting)</span> </h1></el-col>
	<el-col :span="4"><p  class="label-top" style="text-align:center;margin-left:5rem;" @click="Old()"><el-button style="color:#5b5a5a;border-radius:20px;"> Back</el-button></p></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="20">
					<div class="littetop"><p class="comelitte">FY1819 Lenovo+Think</p></div>
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
				<el-col :span="4" >
					<a v-bind:href="apiUrl+'/pcOverAll/trendExcelDownloads?startTime=2018-04-01&endTime=2019-03-31&source=&brand='" target="tune" style="width:80%;height:40px; border:1px solid #dcdfe6;display: inline-block; border-radius:20px; font-size:0.875rem;line-height:40px; color: #606266; margin-top:5rem ">Data Export</a>
				</el-col>
			  </el-row>
			    <childon ref="childon"  @ee="consly"></childon>
			  <el-row :gutter="20" class="centerboton" >
				<div class="littetop"><p class="comelitte">FY1819 Lenovo+Think Segment YTD</p></div>
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
			<Threeon ref="Threeon"  @ee="consly"></Threeon>
			<div id="main" style="width:86%;height:91%;position:absolute;z-index:2500;background:#fff;top:60px;display:none;text-align:left;">

				<el-button type="info" round @click="haowan" style="margin-bottom:0.5%;margin-top:0.5%; margin-left:1%;">Back</el-button>
				<div id="mainn" style="width:86%;height:90%;margin-left:5%"></div>
			</div>	
			<iframe name="tune" style="display:none;"></iframe>
		</div>
	</div>
</template>
<script>
	import api,{ setCookie,getCookie}from '../api/indexapi';
	import childon from "./consolon.vue";
	import Threeon from "./Threeon.vue";
	export default {
		name: 'parent',
		components: {
			childon,
			Threeon
		},
		data() {
			return {
				souces: "",
				souse: "",
				name: '',
				soucn:0,
				brand: [],
     			timePc:"",
				type: "",
				apiUrl: api.apiUrl,
			};
		},
		mounted() {
      
						/*如果cookie不存在，则跳转到登录页*/            
					var Height = window.innerHeight - 60;
					document.getElementById("yy").style.height = Height + "px";
					this.summr();
					this.$refs.childon.fromParent("myChart",);
					this.$refs.Threeon.fromParent("myChart0","myChart1","myChart2",);	
		
		},
		methods: {	
			 consly(){
        		document.getElementById("main").style.display="block";
			 },
			 Old(){
	         this.$router.push('/Overall');
			 },
			
			 haowan(){
				document.getElementById("main").style.display="none";
				this.nomol=false;
				this.nomo=false;
				this.nom=false;
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
				this.$http.post(api.apiUrl+'/byOverAllSegement/topTable', {
					"source": ""
				}).then(function(data) {
					if(data.data.status == "0") {		
				    	var	tag = data.data.result;
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
						var ytdQ = Math.round(tag.PcOverAll[0].ytd * 100) / 100;
						var color = [];
						var ytd1 = Math.round(tag.Commercial[0].DT[0].ytd * 100) / 100;
						var ytd2 = Math.round(tag.Commercial[0].NB[0].ytd * 100) / 100;
						var ytd3 = Math.round(tag.Consumer[0].DT[0].ytd * 100) / 100;
						var ytd4 = Math.round(tag.Consumer[0].NB[0].ytd * 100) / 100;
						var ytd5 = Math.round(tag.SMB[0].DT[0].ytd * 100) / 100;
						var ytd6 = Math.round(tag.SMB[0].NB[0].ytd * 100) / 100;

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
										text: ' YTD ',
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
										text: "Q3",
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
											value: Q1psi,
											//		name: 'PSI'
										}]
									}, ]

					}, true);
					myChartp.setOption({
						title: [{
							left: 'center',
							text:"Q4",
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
 a {
	 width:50px;
	 height:50px;
	 border:1px soild #ccc;
   border-radius: 20px;
}
	/*.ko{
	
	border:0.2px solid #dedede;
	 box-shadow:2px 5px 1px 1px #dedede;
	}*/
</style>