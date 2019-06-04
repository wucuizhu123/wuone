<template>
	
		<el-row :gutter="20">
			<el-col :span="16">
				<div class="littetop"><p class="comelitte">PC Industry Trend View <span style="font-size:15px">(PSI Score Range [-10,+10])</span></p></div>
				<div id="myChart" :style="{width: '100%', height: '22rem'}" class="ko"></div>
			</el-col>
			<el-col :span="8" id="po">
				<div class="littetop"><p class="comelitte"> Mentions Quantity <i class="el-icon-zoom-in" style="float:right;" @click="big"></i></p> </div>
				<div class=" ko">
					<div class="table1">
					<table>
						<tr>
							<th>Brand</th>
							<th v-for='zz in val1'>{{zz}}</th>
						</tr>
						<tr v-for="jj in vval">
							<td v-for="uu in jj">{{uu}}</td>
						</tr>
					</table> 
					</div>
				</div>
			</el-col>
		</el-row>

</template>
<script>
	import api from '../api/indexapi';
	export default {
		name: 'child',
		data() {
			return {
				val1: [],
				vval: [],
				nomol:false,
				nomolLock:true,
				onelistp:true,
			}
		},

		props: {
			soce:{
					type:String,
					default: ""
				},
				"brand": Array,
				"startime": String,
				"endtime": String,
		},
		watch: {
			brand: {　　　　
				handler(newValue, oldValue) {　　　　　　
					for(let i = 0; i < newValue.length; i++) {　　　　　　　　
						if(oldValue[i] != newValue[i]) {　　　　　　　　　　　　　　　　
						}　　　　　　
					}
				},
				deep: true
			},
			soce: function(newValue, oldValue) {
			},
			startime: function(newValue, oldValue) {
			},
			endtime: function(newValue, oldValue) {
			}

	
		},
		mounted() {
		},
		methods: {
			big(){
					var vm=this;
				var tableson=[];
				tableson.push(vm.val1,vm.vval);
					// this.onelistp=false;
				
							 vm.$emit('vall', tableson);	 
							 console.log("chuanguoqule")

			 
			},
				small(){
						this.onelistp=true;
			      document.getElementById("po").className ="dd";                     
			 
			},
			fromParent(id,time,time1) {
				(this.startime=="")?time=time:time=this.startime;
				(this.endtime=="")?time1=time1:time1=this.endtime;         
        var vm=this;
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById(id))
				window.onresize = function () {
		    //重置容器高宽
		    myChart.resize();
				}
				// 绘制图表
				myChart.showLoading();

				this.souce = this.value;
				this.value6 = [];
				this.value6 = this.value5;
				var that = this;
				var obj = {};
				var objo = [];
				var vNum = 0;
				var k = 0;
				var vnum = 0;
				var vArray = [];
				that.lend = [];
				this.val1 = [];
				this.vval = [];
				var v2 = 7.25;
				var v1 = 6.52;
				this.val1 = [];
				this.vval = [];
				var vArray2 = { //All
					name: "FY18 Target",
					data: [],
					type: 'line',
					symbol: 'circle',
					symbolSize: 2,
					smooth: false, //这是设置虚线所需属性
					itemStyle: { /*设置折线颜色*/
						normal: {
							color: 'red',
							borderColor: 'red',
							//							color:'orange',
							//           borderColor:'orange',						borderColor: '#4C8E9F',
							lineStyle: {
								width: 2,
								type: 'dotted',
								color: '#f00' //线条样式，虚线
							}
						}
					},
				};
				var vArray1 = { //360buy
					name: "FY18 Target",
					data: [],
					type: 'line',
					symbolSize: 2,
					symbol: 'circle',
					smooth: false, //这是设置虚线所需属性
					itemStyle: { /*设置折线颜色*/
						normal: {
							color: 'red',
							borderColor: 'red',

							lineStyle: {
								width: 2,
								type: 'dotted',
								color: '#f00' //线条样式，虚线
							}
						}
					},
				};
				if(this.soce == "All Sources") {
					this.soce = "";
				} else {
					this.soce = this.soce;
				};
				this.$http.post(api.apiUrl + '/pcIndustry/trendProxy', {
					"source": this.soce,
					"brand": this.brand,
					"startTime": time,
					"endTime": time1
				}).then(function(data) {
					if(data.data.status == "0") {
						obj = data.data.result;
 
						objo = data.data.result.pcTrend.result[0].List;
						for(var i = 0; i < objo.length; i++) {
							this.val1.push(objo[i].publishTime);
						}
						if(data.data.result.PcAllTrend.result.length > 0) {
							for(let p in data.data.result.PcAllTrend.result) {
								let vTempAry = {};
								let vvav = [];
								let vIndex = 0;
								vvav[vIndex++] = obj.PcAllTrend.result[0].brand;
								vTempAry.name = data.data.result.PcAllTrend.result[p].brand;
								vTempAry.type = "line";
								vTempAry.data = [];
								vTempAry.symbol = "circle";
								vTempAry.symbolSize = 2;

								vTempAry.itemStyle = {
									//								symbol: 'arrow',
									symbolSize: 2,
									symbol: 'circle',
									normal: {

										label: {
											show: true,
											position: [7, 7],
											//										backgroundColor: '#f00'
										}
									}
								};

								let k = 0;
								for(let i = 0; i < data.data.result.PcAllTrend.result[p].List.length; i++) {
									vTempAry.data[k++] = Math.round(obj.PcAllTrend.result[p].List[i].psi * 100) / 100;
									//								vvav[vIndex++] = obj.PcAllTrend.result[p].List[i].mentions;
									vvav[vIndex++] = (obj.PcAllTrend.result[p].List[i].mentions || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
								}

								vArray[vNum++] = vTempAry;
								this.vval[vnum++] = vvav;
							}
						}

						// 数组2: 
						if(data.data.result.pcTrend.result.length > 0) {
							for(let p in data.data.result.pcTrend.result) {
								if((data.data.result.pcTrend.result[p].brand == "MECHREVO") || (data.data.result.pcTrend.result[p].brand == "OTHER")) {

								} else {
									//								console.log("名称为： " + data.data.result.pcTrend.result[p].brand);
									let vTempAry = {};
									let vvav = [];
									let vIndex = 0;

									vvav[vIndex++] = obj.pcTrend.result[p].brand;

									vTempAry.name = data.data.result.pcTrend.result[p].brand;
									vTempAry.type = "line";
									vTempAry.data = [];
									vTempAry.symbol = "circle";
									vTempAry.symbolSize = 2;

									let k = 0;
									for(let i = 0; i < data.data.result.pcTrend.result[p].List.length; i++) {
										//                                   if(data.data.result.pcTrend.result[p].brand=="MECHREVO"){
										//                                   	vTempAry.data[k++] = [];
										//									   vvav[vIndex++] = "";
										//     }
										vTempAry.data[k++] = Math.round(obj.pcTrend.result[p].List[i].psi * 100) / 100;
										//									vvav[vIndex++] = obj.pcTrend.result[p].List[i].mentions;
										vvav[vIndex++] = (obj.pcTrend.result[p].List[i].mentions || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

									}

									vArray[vNum++] = vTempAry;
									this.vval[vnum++] = vvav;
								}

							}
						}

						var vLjsArray = [];
						for(let k = 0; k < vArray.length; k++) {
							var vLen = vArray[k].data.length;
							vArray[k].psi = vArray[k].data[vLen - 1];
						}


						for(let i = 0; i < vArray.length - 1; i++) {
							for(var j = 0; j < vArray.length - i - 1; j++) {
								if(vArray[j].psi < vArray[j + 1].psi) {
									let vvv = vArray[j].psi;
									let vName = vArray[j].name;
									let vType = vArray[j].type;
									let vTempArray = vArray[j].data;

									vArray[j].psi = vArray[j + 1].psi
									vArray[j].name = vArray[j + 1].name;
									vArray[j].type = vArray[j + 1].type;
									vArray[j].data = vArray[j + 1].data;

									vArray[j + 1].psi = vvv;
									vArray[j + 1].name = vName;
									vArray[j + 1].type = vType;
									vArray[j + 1].data = vTempArray;
								}
							}
						}
						var commentw = [];
						var hColor = [];
						var kou = [];
						for(var t = 0; t < vArray.length; t++) {
							if(vArray[t].name == "PC ALL") {
								vArray[t].itemStyle = {

									normal: {
										color: "#8C8FB5",
										borderColor: '#8C8FB5',
										label: {
											show: true,
											position: [18, 18],
											backgroundColor: "8C8FB5",
											width: 20,
											color: "#fff",
											borderRadius: 2,
											padding: [5, 5, 5, 5]

										},
										lineStyle: {
											color: "#8C8FB5",
											width: 2.5,

										}
									}
								}
								commentw.push(vArray[t]);
								hColor.push("#8C8FB5");
							} else if(vArray[t].name == "THINK") {
								vArray[t].itemStyle = {

									normal: {
										color: "#674B4E",
										borderColor: "#674B4E",
										label: {
											show: true,
											position: [7, 7],
											backgroundColor: "#674B4E",
											width: 20,
											color: "#fff",
											borderRadius: 2,
											padding: [5, 5, 5, 5]

										},
										lineStyle: {
											color: "#674B4E",
											width: 3.5,

										}
									}
								}
								commentw.push(vArray[t]);
								hColor.push("#674B4E");
							} else if(vArray[t].name == "LENOVO") {
								vArray[t].itemStyle = {
									normal: {
										color: "#F3BF54",
										borderColor: "#F3BF54",
										label: {
											show: true,
											position: [-18, -18],
											backgroundColor: "#F3BF54",
											width: 20,
											color: "#fff",
											padding: [5, 5, 5, 5],
											borderRadius: 2.5,
										},
										lineStyle: {
											color: "#F3BF54",
											width: 3.5,

										}
									}
								}
								commentw.push(vArray[t]);
								hColor.push("#F3BF54");
							} else if(vArray[t].name == "ASUS") {
								vArray[t].itemStyle = {
									normal: {
										color: "#028B8A",
										borderColor: "#028B8A",

									}
								};
								commentw.push(vArray[t]);
								hColor.push("#028B8A");
							} else if(vArray[t].name == "DELL") {
								vArray[t].itemStyle = {
									normal: {
										color: "#014DB5",
										borderColor: "#014DB5",

									}
								};
								commentw.push(vArray[t]);
								hColor.push("#014DB5");
							} else if(vArray[t].name == "HP") {
								vArray[t].itemStyle = {
									//	symbol: 'arrow',

									normal: {
										color: "#23396A",
										borderColor: "#23396A",

									}
								};
								commentw.push(vArray[t]);
								hColor.push("#23396A");
							} else if(vArray[t].name == "ACSR") {
								vArray[t].itemStyle = {
									//							
									normal: {
										color: "#7D7DFF",
										borderColor: "#7D7DFF",

									}
								};
								commentw.push(vArray[t]);
								hColor.push("#7D7DFF");
							} else if(vArray[t].name == "MI") {
								vArray[t].itemStyle = {
									normal: {
										color: "#E37542",
										borderColor: "#E37542",

									}
								};
								commentw.push(vArray[t]);
								hColor.push("#E37542");
							} else if(vArray[t].name == "APPLE") {
								vArray[t].itemStyle = {
									//						
									normal: {
										color: "#B2ae9b",
										borderColor: "#B2ae9b",

									}
								};
								commentw.push(vArray[t]);
								hColor.push("#B2ae9b");
							} else if(vArray[t].name == "HUAWEI") {
								vArray[t].itemStyle = {
									//							
									normal: {
										color: "#d54b44",
										borderColor: "#d54b44",

									}
								};
								commentw.push(vArray[t]);
								hColor.push("#d54b44");
							}
						}
						var vIndex = 0;

						for(let k = 0; k < commentw.length; k++) {

							if(commentw[k].name == "PC ALL") {
								commentw[k].name = "Base" + " " + commentw[k].name;
							} else {
								commentw[k].name = "No" + (vIndex + 1) + " " + commentw[k].name;
								vIndex++;
							}
						}
						if(this.soce == "") {
							for(let u = 0; u < data.data.result.pcTrend.result[0].List.length; u++) {
								vArray2.data.push(v2);
							}
							commentw.unshift(vArray2);
							hColor.unshift("#f00")
						} else {
							commentw = commentw;
						};
						if(this.soce == "360buy") {
							for(let u = 0; u < data.data.result.pcTrend.result[0].List.length; u++) {
								vArray1.data.push(v1);
							}
													commentw.unshift(vArray1);
							hColor.unshift("#f00")
						} else {
							commentw = commentw;
						};
						var hihi = [];
						for(let h = 0; h < commentw.length; h++) {
							hihi.push(commentw[h].name);
						}
					} else {
						this.$message.warning("If there is a problem with the data, please contact the administrator.");
					}
					myChart.hideLoading();
					myChart.setOption({
	         title:{
								text:"PC Industry Trend View (PSI Score Range [-10,+10])",
	              show:this.nomol,
								left:'center',
								
					 },
						tooltip: {
							trigger: 'item',
							axisPointer: {
								type: 'cross',

								crossStyle: {
									color: '#999'
								}
							},
							textStyle: {

								align: 'left'
							}
						},
						toolbox: {
							orient:'vertical',
							type:"jpeg",
							show: vm.nomolLock,
						feature: {
							saveAsImage: {
								title: 'Save',
								show: true,

							},
							myTool2: {
						show: true,
						title: 'Full',
							icon: 'image://data:image/png;base64,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',
						onclick: function () {	
								vm.$emit('ee', "")	;	 
								vm.nomol=true;
								vm.nomolLock=false;
								vm.fromParent("mainn");
						       }
							}
						}
					},
						grid: {
							left: '6%',
							right: "14%",
							top: "8%",
							bottom: "17%"
						},
						color: hColor,
						legend: {
//							
							orient: 'vertical',
							 icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
							
							itemGap:13,
							width:12,
							height:"95%",
	                        right: 0,
							top: "4%",
							bottom: 0,						
                             textStyle:{
                             	fontSize:11,
                             },
							data: hihi,
						},
						xAxis: {
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
							nameTextStyle: {
								fontSize: 18
							},
							type: 'category',

							data: this.val1
						},
						yAxis: {
							
							boundaryGap: true,
							scale: true,
							axisTick: {
								show: false
							},
							axisLine: {
								show: false
							},

							nameTextStyle: {
								fontSize: 18
							},
							type: 'value',
							axisLabel: {
								formatter: function(value, index) {
									return value.toFixed(2);
								}
							}
						},
						series: commentw,
					}, true);
						window.addEventListener("resize", () => { myChart.resize();});
				}, function() {
					alert("error");
				})

			},
		}
	}
</script>
<style scoped>
		@import"../css/Trend.css";
</style>