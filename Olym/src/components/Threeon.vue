<template>
	<el-row :gutter="20">

				<el-col :span="8">
					<div class="littetop"><p class="comelitte">Consumer <span style="font-size:15px">(Allsource)</span></p></div>
					<div id="myChart0" :style="{width: '100%', height: '15rem'}"  class="ko"></div>
				</el-col>
				<el-col :span="8">
					<div class="littetop"><p class="comelitte">Commercial <span style="font-size:15px">(Allsource)</span></p></div>
					<div id="myChart1" :style="{width: '100%', height: '15rem'}"  class="ko"></div>
				</el-col>
				<el-col :span="8">
                   <div class="littetop"><p class="comelitte">SMB <span style="font-size:15px">(Allsource)</span></p></div>
					<div id="myChart2" :style="{width: '100%', height: '15rem'}"  class="ko"></div>
				</el-col>
			</el-row>
</template>

<script>
	import api from '../api/indexapi';
  export default {
      name: 'Threeon',
      data(){
    return {
       value: "",
				source: [],
				source:"",
				apiUrl:api.apiUrl,
				
				valuew:"",
				typed:"",
				threeBand:"",
				firsttime:"",
				lastime:"",
				nomol:false,
				nomo:false,
				nom:false

				
    }
  },
//   props:{
// 				soce:{
// 					type:String,
// 					default: ""
// 				},
// 				mou:{
// 					type:Number,
// 					default: 2
// 				},
				
// 				// "mou":Number,
//         "brand":Array,
//         "startime":String ,
// 				"endtime":String ,
// 				"brand": Array,
//    }, 
//  watch:{
//    soce:function(newValue, oldValue){
//         console.log(newValue)
//        },
//  startime:function(newValue, oldValue){
//         console.log(newValue)
//        },
//  endtime:function(newValue, oldValue){
//         console.log(newValue)
// 				},
// 	mou:function(newValue, oldValue){
//         console.log(newValue)
//        },
 	
// 	},
      mounted(){
      
			this.valuew="All Souces"
      },
     methods:{
	fromParent(cha,char,chart,timeo,timep){

				// 基于准备好的dom，初始化echarts实例
				let myChart0 = this.$echarts.init(document.getElementById(cha));
				let myChart1 = this.$echarts.init(document.getElementById(char));
				let myChart2 = this.$echarts.init(document.getElementById(chart));
				// 绘制图表
				myChart0.showLoading();
				myChart1.showLoading();
				myChart2.showLoading();

				this.souce = this.value;
				var tag = [];
				var table1 = {};
				var name1 = [];
				var name2 = [];
				var name3 = [];
				var time1 = [];
				var table2 = {};
				var table3 = {};
				var table = [];
				var two = [];
				var two1 = {};
				var two2 = {};
				var two3 = {};
				var three = [];
				var three1 = {};
				var three2 = {};
				var three3 = {};
				var vm=this;
				var vArray1 = {
					name: "FY18 Tgt",
					type: 'line',
					symbolSize:2,
					symbol:'circle',
					smooth: false, //这是设置虚线所需属性
					itemStyle: { /*设置折线颜色*/
						normal: {
							color:"red",
							backgroundColor:"red",
							borderColor: 'red',
							lineStyle: {
								width: 2,
								type: 'dotted' //线条样式，虚线
							}
						}
					}
				};
				var vArray2 = {
					name: "FY18 Tgt",
					type: 'line',
					symbolSize:2,
					symbol:'circle',
					smooth: false, //这是设置虚线所需属性
					itemStyle: { /*设置折线颜色*/
						normal: {
							color:"red",
							backgroundColor:"red",
							borderColor: 'red',
							lineStyle: {
								width: 2,
								type: 'dotted' //线条样式，虚线
							}
						}
					}
				};
				var vArray3 = {
					name: "FY18 Tgt",
					type: 'line',
					symbolSize:2,
					symbol:'circle',
					
					smooth: false, //这是设置虚线所需属性
					itemStyle: { /*设置折线颜色*/
						normal: {
							color:"red",
							backgroundColor:"red",
							borderColor: 'red',
							lineStyle: {
								width: 2,
								type: 'dotted' //线条样式，虚线
							}
						}
					}
				};
                
				this.$http.post(this.apiUrl + '/byOverAllSegement/botTable', {
					"startTime": "2018-04",
					"endTime": "2019-03",
					"source": ""
				}).then(function(data) {
					console.log(data);
					if(data.data.status==-2){
						console.log(this.soce+"2")
						
					}else{			
						if(this.soce == "") {
					this.valuew = "All Sources";
				}else{
					this.valuew = this.soce;
			
				};
					
					var that = this;
					tag = data.data.result;
					console.log(tag);
					if(tag.CommercialGraph[0].DT.length > 0) {
						for(var i = 0; i < tag.CommercialGraph[0].DT.length; i++) {
							time1.push(tag.CommercialGraph[0].DT[i].publishTime);
						};
					} else if(tag.ConsumerGraph[0].DT.length > 0) {
						for(var i = 0; i < tag.ConsumerGraph[0].DT.length; i++) {
							time1.push(tag.ConsumerGraph[0].DT[i].publishTime);
						};

					} else if(tag.SMBGraph[0].DT.length > 0) {
						for(var i = 0; i < tag.SMBGraph[0].DT.length; i++) {
							time1.push(tag.SMBGraph[0].DT[i].publishTime);
						};
					}
//					console.log(time1);
					//table1
					table1.name = "Commercial all";
					table1.type = "line";
					table1.data = [];
					table1.symbol = "circle";
					table1.symbolSize =2;
					vArray1.data = [];
					table1.itemStyle = {
						symbol: 'arrow',
						normal: {
						}
					};
					var k = 0;
					for(var i = 0; i < tag.CommercialGraph[0].ConmmercialAll.length; i++) {
						table1.data[k++] = Math.round(tag.CommercialGraph[0].ConmmercialAll[i].psi * 100) / 100;

					};
					for(var i = 0; i < tag.CommercialGraph[0].ConmmercialAll.length; i++) {
						vArray1.data[i] = Math.round(tag.CommercialGraph[0].FY19 * 100) / 100;

					};

					// table2
					table2.name = "DT";
					table2.type = "line";
					table2.data = [];
					table2.symbol = "circle";
					table2.symbolSize =2;
					table2.itemStyle = {
						symbol: 'arrow',
						normal: {
							label: {
								show: true,
								position: [-25, -25],
							}
						}
					};
					var k = 0;
					for(var i = 0; i < tag.CommercialGraph[0].DT.length; i++) {
						table2.data[k++] = Math.round(tag.CommercialGraph[0].DT[i].psi * 100) / 100;
					};

					//table3
					table3.name = "NB";
					table3.type = "line";
					table3.data = [];
					table3.symbol = "circle";
					table3.symbolSize =2;
					table3.itemStyle = {
						symbol: 'arrow',
						normal: {
							color:"#ffd04b",
							backgroundColor:"#ffd04b",
							borderColor: '#ffd04b',
							label: {
								show: true,
								position: [20, 20],
							}
						}
					};
					var k = 0;
					for(var i = 0; i < tag.CommercialGraph[0].NB.length; i++) {
						table3.data[k++] = Math.round(tag.CommercialGraph[0].NB[i].psi * 100) / 100;
					};
					table.push(table1, table2, table3);
					if(this.soce == "" ||
						this.soce == "360buy") {
						table.unshift(vArray1);
					} else {
						table = table;
					};
					//第二个图表
					two1.name = "Consumer all";
					two1.type = "line";
					two1.data = [];
					vArray2.data = [];
					two1.symbol = "circle";
					two1.symbolSize =2;
					two1.itemStyle = {
						symbol: 'arrow',
						normal: {
						}
					};

					var k = 0;
					for(var i = 0; i < tag.ConsumerGraph[0].ConsumerAll.length; i++) {
						two1.data[k++] = Math.round(tag.ConsumerGraph[0].ConsumerAll[i].psi * 100) / 100;
					};
					for(var i = 0; i < tag.ConsumerGraph[0].ConsumerAll.length; i++) {
						vArray2.data[i] = Math.round(tag.ConsumerGraph[0].FY19 * 100) / 100;

					};
					// table2
					two2.name = "DT";
					two2.type = "line";
					two2.data = [];
					two2.symbol = "circle";
					two2.symbolSize =2;
					two2.itemStyle = {
						symbol: 'arrow',
						normal: {
							label: {
								show: true,
								position: [-25, -25],
							}
						}
					};
					var k = 0;
					for(var i = 0; i < tag.ConsumerGraph[0].DT.length; i++) {
						two2.data[k++] = Math.round(tag.ConsumerGraph[0].DT[i].psi * 100) / 100;
					};

					//table3
					two3.name = "NB";
					two3.type = "line";
					two3.data = [];
					two3.symbol = "circle";
					two3.symbolSize =2;
					two3.itemStyle = {
						symbol: 'arrow',
						normal: {
							color:"#ffd04b",
							backgroundColor:"#ffd04b",
							borderColor: '#ffd04b',
							label: {
								show: true,
								position: [20, 20],
							}
						}
					};
					var k = 0;
					for(var i = 0; i < tag.ConsumerGraph[0].NB.length; i++) {
						two3.data[k++] = Math.round(tag.ConsumerGraph[0].NB[i].psi * 100) / 100;
					};

					two.push(two1, two2, two3);
					if(this.soce == "" ||
						this.soce == "360buy") {
						two.unshift(vArray2);
					} else {
						two = two;
					};
					//第三个图表
					three1.name = "SMB all";
					three1.type = "line";
					three1.data = [];
					three1.symbol = "circle";
					three1.symbolSize =2;
					vArray3.data = [];
					three1.itemStyle = {
						symbol: 'arrow',
						normal: {
//							label: {
//								show: true,
//								position: [25, 25],
//							}
						}
					};
					var k = 0;
					for(var i = 0; i < tag.SMBGraph[0].SMBAll.length; i++) {
						three1.data[k++] = Math.round(tag.SMBGraph[0].SMBAll[i].psi * 100) / 100;
					};
					for(var i = 0; i < tag.SMBGraph[0].SMBAll.length; i++) {
						vArray3.data[i] = Math.round(tag.SMBGraph[0].FY19 * 100) / 100;

					};
					// table2
					three2.name = "DT";
					three2.type = "line";
					three2.data = [];
					three2.symbol = "circle";
					three2.symbolSize =2;
					three2.itemStyle = {
						symbol: 'arrow',
						normal: {
							label: {
								show: true,
								position: [-18, -18],
							}
						}
					};
					var k = 0;
					for(var i = 0; i < tag.SMBGraph[0].DT.length; i++) {
						three2.data[k++] = Math.round(tag.SMBGraph[0].DT[i].psi * 100) / 100;
					};
					//table3
					three3.name = "NB";
					three3.type = "line";
					three3.data = [];
					three3.symbol = "circle";
					three3.symbolSize =2;
					three3.itemStyle = {
						symbol: 'arrow',
						normal: {
							color:"#ffd04b",
							backgroundColor:"#ffd04b",
							borderColor: '#ffd04b',
							label: {
								show: true,
								position: [20, 20],
							}
						}
					};
					var k = 0;
					for(var i = 0; i < tag.SMBGraph[0].NB.length; i++) {
						three3.data[k++] = Math.round(tag.SMBGraph[0].NB[i].psi * 100) / 100;
					};
					three.push(three1, three2, three3);
					if(this.soce == "" ||
						this.soce == "360buy") {
						three.unshift(vArray3);
					} else {
						three = three;
					};
					for(var i = 0; i < three.length; i++) {
						// 	name3.push(three[i].name); 
						var lenged = {};
						lenged.name = three[i].name;
						name3.push(lenged);
					};
					for(var i = 0; i < two.length; i++) {
						//					  	name2.push(two[i].name);
						var leng = {};
						leng.name = two[i].name;
						name2.push(leng);
					};

					for(var i = 0; i < table.length; i++) {
						var lenge = {};
						lenge.name = table[i].name;
						name1.push(lenge);
					};
}
					myChart0.hideLoading();
					myChart1.hideLoading();
					myChart2.hideLoading();

//					this.valuew = this.value;

					// 基于准备好的dom，初始化echarts实例

					// 绘制图表
					
				
					myChart0.setOption({
						 title:{
								text:"Consumer "+"("+this.valuew+")",
	              show:this.nomol,
								left:'center',
								
					 },
						tooltip: {
											trigger: 'axis',
											textStyle: {
												align: 'left'

											},
											axisPointer: {
												type: 'cross',
												crossStyle: {
													color: '#999'
												}
											},

						},
					   	toolbox: {
											orient:'vertical',
											show: true,
									  	feature: {
										  	saveAsImage: {
												title: 'Save',
											},
											myTool2: {
										show: true,
										title: 'Full',
											icon: 'image://data:image/png;base64,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',
										onclick: function () {	
												vm.$emit('ee', "")	;	 
												vm.nomol=true;
												vm.nomo=false;
												vm.nom=false;
												vm.fromParent("mainn","myChart1","myChart2");
												
													}
											}
										}
					},
						xAxis: {
										nameTextStyle: {
											fontSize: 14
										},
										type: 'category',
										axisTick: {
											show: false
										},
										axisLabel: {
											interval: 0,
												rotate:40
										},
										axisLine: {
											show: false
										},
										data: time1
						},
						yAxis: {
										type: 'value',
										axisTick: {
											show: false
										},
										axisLine: {
											show: false
										},
										max: 10,
										boundaryGap: [0.2, 0.2],
										axisLabel: {
											formatter: function(value, index) {
												return value.toFixed(2);
											}
										}
						},
						grid: {
										top:"8%",
										left: '12%',
										right: "5%",
										//	top:"25%",
										bottom: "25%"
						},
						legend: {
										orient: 'horizontal',
										itemGap: 5,
										top: "65%",
 	                  icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
										itemWidth: 12,  // 设置宽度							
										itemHeight: 12, // 设置高度
							      data: name2
						},
						series: two
					}, true);

					// 绘制图表
					myChart1.setOption({
						 title:{
								text:"Commercial  "+"("+this.valuew+")",
	              show:this.nomo,
								left:'center',
								
					 },
						tooltip: {
							trigger: 'axis',
							textStyle: {

								align: 'left'

							},
							
							axisPointer: {
								type: 'cross',
								crossStyle: {
									color: '#999'
								}
							}
						},
						toolbox: {
							orient:'vertical',
							show: true,
						feature: {
							saveAsImage: {
								title: 'Save',
							},
							myTool2: {
						show: true,
						title: 'Full',
							icon: 'image://data:image/png;base64,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',
						onclick: function () {	
								vm.$emit('ee', "")	;	
								vm.nomo=true;
								vm.nomol=false;
								vm.nom=false; 
								vm.fromParent("myChart0","mainn","myChart2");
						       }
							}
						}
					},
						xAxis: {

							type: 'category',
							axisTick: {
								show: false
							},
							axisLine: {
								show: false
							},

							axisLabel: {
								interval: 0,
								  rotate:40
							},
							nameTextStyle: {
								fontSize: 14
							},
							data: time1
						},
						grid: {
							top:"8%",
							left: '12%',
							right: "5%",
							//							top:"25%",
							bottom: "25%"
						},
						legend: {
							orient: 'horizontal',
							itemGap: 5,
							top: "65%",
 	                            icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
							    itemWidth: 12,  // 设置宽度							
							    itemHeight: 12, // 设置高度
							data: name1
						},
						yAxis: {
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							max: 10,
							//                  min: 4,
							boundaryGap: [0.2, 0.2],
							type: 'value',
							axisLabel: {
								formatter: function(value, index) {
									return value.toFixed(2);
								}
							}
						},
						series: table
					}, true);

					// 绘制图表
					myChart2.setOption({
						 title:{
								text:"SMB "+"("+this.valuew+")",
	              show:this.nom,
								left:'center',
								
					 },
						tooltip: {
							trigger: 'axis',
							textStyle: {

								align: 'left'

							},
							axisPointer: {
								type: 'cross',
								crossStyle: {
									color: '#999'
								}
							}
						},
						toolbox: {
							orient:'vertical',
							show: true,
						feature: {
							saveAsImage: {
								title: 'Save',
							},
							myTool2: {
						show: true,
						title: 'Full',
							icon: 'image://data:image/png;base64,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',
						onclick: function () {	
								vm.$emit('ee', "");	 
								vm.nom=true;
								vm.nomol=false;
								vm.nomo=false;
								vm.fromParent("myChart0","myChart1","mainn");
						       }
							}
						}
					},
						grid: {
							top:"8%",
							left: '12%',
							right: "5%",
							//							top:"25%",
							bottom: "25%"
						},
						xAxis: {

							type: 'category',
							axisTick: {
								show: false
							},
							axisLine: {
								show: false
							},

							axisLabel: {
								interval: 0,
								  rotate:40
							},
							nameTextStyle: {
								fontSize: 14
							},
							data: time1
						},
						yAxis: {
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							max: 10,
							//                  min: 4,
							boundaryGap: [0.2, 0.2],
							type: 'value',
							axisLabel: {
								formatter: function(value, index) {
									return value.toFixed(2);
								}
							}
						},
						legend: {
									orient: 'horizontal',
									itemGap: 5,
									top: "65%",
 	                icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
							    itemWidth: 12,  // 设置宽度							
							    itemHeight: 12, // 设置高度
							data: name3
						},
						series: three
					}, true);


						  window.addEventListener("resize", () => { myChart0.resize();});
							window.addEventListener("resize", () => { myChart1.resize();});
							window.addEventListener("resize", () => { myChart2.resize();});
					 console.log(this.value+"2");
					 
						if(this.value == "All Sources") {

					this.value = "";
				} 	
				}, function() {
					console.log(this.value+"2")
						if(this.value == "All Sources") {
					    this.value = "";
				}
					alert("error");
				})
				
				
			
	},
	}
     }
</script>

<style scoped>
		@import"../css/Trend.css";

</style>