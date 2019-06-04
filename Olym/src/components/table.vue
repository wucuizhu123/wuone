<template>
	<div id="yy">
    <div><el-button type="primary" @click="newclm" icon="el-icon-edit" class="hao">Add</el-button></div>
     
     <!-- <el-table v-for="(item ,index) in tableData3"   style="width: 100%" :key="index">  -->
       <el-table :data="tableData3" stripe  ref="filterTable" :cell-style="{padding:'0px',fontSize:'13px'}" :header-cell-style="{background:'#000',color:'#fff',padding:'0px',fontSize:'16px'}" :span-method="arraySpanMethod" style="width: 100%;"  height="39rem"> 
          <el-table-column    type=index  label="#"  align="center" ></el-table-column>
          <el-table-column    prop="series" :filters="nameList"  column-key="series"  :filter-method="filterHandler" label="Model Name"  align="center"  width="150" style="text-align:left;"></el-table-column>
          <el-table-column    prop="langTime"     label="SS Month"  align="center"    width="100"> </el-table-column>
          <el-table-column prop="todayPsi" align="center" label="PSI from SS" width="90"> 
              <template slot-scope="scope">
                <span v-if="scope.row.flagOne">{{scope.row.todayPsi}}</span>
                <el-button  size="mini" v-else @click="goePsi(scope.row,scope.$index)" >Click</el-button>          
              </template>
         </el-table-column>
         <el-table-column prop="monthPsi" align="center" label="Current Mth" width="90"> 
          <template slot-scope="scope">
            <span v-if="scope.row.flagTwo">{{scope.row.monthPsi}}</span>
            <el-button   size="mini" v-else @click="MothPsi(scope.row,scope.$index)">Click</el-button>
          </template>
        </el-table-column>
        <el-table-column  prop="contractProduct"  align="center" label=" Compare  with  N-1  /  Competitor"  min-width='110px'></el-table-column>
        <el-table-column  prop="status"  label="Status" align="center"   column-key="status" width="90" :filters="[{text: 'On-going', value: 'On-going'},{text: 'Close', value: 'Close'},{text: 'Monitor', value: 'Monitor'},{text: 'Open', value: 'Open'}]"
      :filter-method="filterHandler"> </el-table-column>
        <el-table-column  align="center" label="Key Items for Technical Analysis"  >
        <el-table-column align="center" label="Problem Description" width="300">
                 <template slot-scope="scope">
        <table v-for="(item,index) in scope.row.list"  :key="index" style="width: 100%" >
          <tr><td style="width:300px;border-right: 0px;">{{item.problem}}</td><td style="width:417px;border-right: 0px;">{{item.solution}}</td><td style="width:80px;text-align:center;border-right: 0px;">{{item.status}}</td></tr> 
        </table>
        </template>
              </el-table-column>
            <el-table-column   label="Solution" align="center" width="400"> </el-table-column>
        <el-table-column  label="Status" align="center" width="80" > </el-table-column>
        
         </el-table-column>
    <el-table-column  prop="owner"  label="Owner"  align="center"  width="100" column-key="owner" v-bind:filters="ownerList"
      :filter-method="filterHandler"> </el-table-column>
    <el-table-column label="Edit" align="center" width="80" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>




<!-- 修改 -->
<el-dialog title="Change" :visible.sync="dialogFormVisible" >
  <el-form :model="form" class="onechang">
    <el-form-item label="Model Name" :label-width="formLabelWidth" style="width:94%;">
      <!-- <el-input v-model="form.series" ></el-input> -->
      <el-autocomplete v-model="form.series"  :fetch-suggestions="querySearchAsync" style="width:100%;" clearable @select="handleSelect"></el-autocomplete>
    </el-form-item>
    <el-form-item label="SS Month" :label-width="formLabelWidth">
      <el-date-picker v-model="form.langTime" type="month"  value-format="yyyy-MM" placeholder="langTime" :picker-options="pickerOptions"></el-date-picker>
    </el-form-item>
     <el-form-item label="Compare with N-1 / Competitor" :label-width="LabelWidth">
      <el-select v-model="form.contractProduct" placeholder="status">
        <el-option label="Better" value="Better"></el-option>
        <el-option label="Worse" value="Worse"></el-option>
        <el-option label="Close" value="Close"></el-option>
        <el-option label="N/A" value="N/A"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="Status" :label-width="formLabelWidth">
      <el-select v-model="form.status" placeholder="status">
        <el-option label="Close" value="1"></el-option>
        <el-option label="On-going" value="2"></el-option>
        <el-option label="Monitor" value="3"></el-option>
        <el-option label="Open" value="4"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="Owner" :label-width="formLabelWidth">
      <el-input v-model="form.owner" ></el-input>
    </el-form-item>
    <p>Key Items for Technical Analysis 
    <el-button type="primary" icon="el-icon-plus" circle @click="addDomain" ></el-button></p>
    <div class="log">
    <span  v-for="(item, index) in form.list" :key="index" class="prob">
    <el-form-item
    :label="'problem' "
    :prop="'list.' + index + '.problem'"
    :label-width="formLabelWidth"
     style="width:60%;">
    <el-input v-model="item.problem" type="textarea"></el-input>
    </el-form-item>
      <el-form-item
    :label="'status' "
   :prop="'list.' + item + '.status'"
   style="width:35%;">
       <el-select v-model="item.status" placeholder="status" style="width:45%;">
        <el-option label="Close" value="Close"></el-option>
        <el-option label="On-going" value="On-going"></el-option>
        <el-option label="Monitor" value="Monitor"></el-option>
        <el-option label="Open" value="Open"></el-option>
      </el-select> 
      <el-button type="primary" icon="el-icon-delete" circle @click.prevent="remoDomain(list)"></el-button>
    </el-form-item>
    <el-form-item
    :label="'solution' "
    :label-width="formLabelWidth"
   :prop="'list.' + index + '.solution'"
    style="width:95%;">
    <el-input v-model="item.solution"  type="textarea" class="all"></el-input>
    </el-form-item>
      
    </span>
    </div>
     <!-- </el-form-item> -->
     
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="handleYe()">Confirm</el-button>
  </div>
</el-dialog>


<!-- 新增 -->
<el-dialog title="New" :visible.sync="dialogForm">
  <el-form :model="forme" class="onechang">
    <el-form-item label="Model Name" :label-width="formLabelWidth" style="width:94%;">
      <!-- <el-input v-model="forme.series" ></el-input> -->
      <el-autocomplete style="width:100%;" v-model="forme.series"  :fetch-suggestions="querySearchAsync"  clearable @select="handleSelect"></el-autocomplete>
    </el-form-item>
    <el-form-item label="SS Month" :label-width="formLabelWidth">
      <el-date-picker v-model="forme.langTime" type="month"  value-format="yyyy-MM" placeholder="langTime" :picker-options="pickerOptions"></el-date-picker>
    </el-form-item>
     <el-form-item label="Compare with N-1 / Competitor" :label-width="LabelWidth">
      <el-select v-model="forme.contractProduct" placeholder="status">
        <el-option label="Better" value="Better"></el-option>
        <el-option label="Worse" value="Worse"></el-option>
        <el-option label="Close" value="Close"></el-option>
        <el-option label="N/A" value="N/A"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="Status" :label-width="formLabelWidth">
      <el-select v-model="forme.status" placeholder="status">
        <el-option label="Close" value="1"></el-option>
        <el-option label="On-going" value="2"></el-option>
        <el-option label="Monitor" value="3"></el-option>
        <el-option label="Open" value="4"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Owner" :label-width="formLabelWidth">
      <el-input v-model="forme.owner" ></el-input>
    </el-form-item>
    
    <p>Key Items for Technical Analysis 
    <el-button type="primary" icon="el-icon-plus" circle @click="addFome" ></el-button></p>
    <div class="log">
    <span  v-for="(item, index) in forme.list" :key="index"  class="prob">
    <el-form-item :label="'problem' " :prop="'list.' + index + '.problem'" :label-width="formLabelWidth" class="all" >
             <el-input v-model="item.problem"></el-input>
    </el-form-item>
    <el-form-item :label="'solution' " :prop="'list.' + index + '.solution'" :label-width="formLabelWidth"  style="width:60%;">
       <el-input v-model="item.solution" style="width:95%;"></el-input>
    </el-form-item>
    <el-form-item   :label="'status'" :prop="'list.' + item + '.status'" style="width:35%;" >
       <el-select v-model="item.status" placeholder="status" :label-width="LabelWidth" style="width:45%;">
        <el-option label="Close" value="Close"></el-option>
        <el-option label="On-going" value="On-going"></el-option>
        <el-option label="Monitor" value="Monitor"></el-option>
        <el-option label="Open" value="Open"></el-option>
      </el-select> 
      <el-button type="primary" icon="el-icon-delete" circle @click.prevent="removeDomain(list)"></el-button>
       <!-- <el-button @click.prevent="removeDomain(list)">删除 -->

    </el-form-item>
    
    </span>
    </div>
     <!-- </el-form-item> -->
     
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="resetFields(forme)">Cancel</el-button>
    <el-button type="primary" @click="newcon()">Confirm</el-button>
  </div>
</el-dialog>
	</div>



</template>

<script>
    import api,{ setCookie,getCookie} from '../api/indexapi';
	export default {
     name: 'parent',
		data() {
			return {
        model:[],
				name: '',
        dialogFormVisible:false,
        dialogForm:false,
        formLabelWidth: '100px',
        LabelWidth:"50px",
        nameList:[{ "text": "XIAOXIN CHAO7000 2018 15", "value": "XIAOXIN CHAO7000 2018 15" }],
        ownerList:[{ "text": "Wang He", "value": "Wang He" }],
        LabelWidth:"220px",
        tableData3: [],
         pickerOptions:{
            disabledDate(time){
              
                 return time.getTime() > Date.now()
            }
        },
        form: {
          series: "",
          langTime: "",
          user: "",
          contractProduct: "",
          problemStatus:"",
          status: "",
          list:[{
            problem: "",
            solution:"",
            status:"",
          }],
          owner: "",    
        },
        forme: {
          series: "",
					langTime: "",
					addport: "",
          user: "",   
          problemStatus:"",
					contractProduct: "",
          status: "",
          list:[{
           problem: "",
            solution:"",
            status:""      
          }],
         PsiOne:"",
         PsiTwo:"",
      
      },
      }
			
		},
		
		mounted() {
            let uname = getCookie('username')
            this.name = uname
            /*如果cookie不存在，则跳转到登录页*/
            if(uname == ""){ this.$router.push('/Login')}
            this.restaurants = this.loadAll();
            this.first();
        },
       
		methods: {
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
       
          if (columnIndex === 7) {
            return {
              rowspan: 1,
              colspan: 3
            }
            }else if (columnIndex === 8) {
            return [0,0];
          }else if (columnIndex === 9) {
            return [0,0];
          }
       
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
				return(state) => {
					return(state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				// console.log(item);
			},

			loadAll() {
				this.$http.get(api.apiUrl + '/byModel/modelLikeCase').then(function(data) {
					if(data.data.status == "0") {
						for(var i = 0; i < data.data.result.length; i++) {
							var coco = {};
							coco.value = "";
							coco.value = data.data.result[i];
							this.model.push(coco);
						}
					} else {
						this.$message.warning("If there is a problem with the data, please contact the administrator.");
					}

				}, function(res) {
					alert('error');
				});

				return this.model
			},
      addDomain() {
       this.form.list.push({
          problem: '',
          solution: "",
          status:"",
        });
      },
       addFome() {
         var vm=this;
         var com={
           problem: "",
            solution:"",
            status:""
        }
        vm.forme.list.push(com);
      
      },
      resetFields(){
                          this.dialogForm = false;
                          this.forme.series="";
                          this.forme.langTime="";                    
                          this.forme.contractProduct="";
                          this.forme.status="";
                          this.forme.list=[{
                            problem:"",
                            solution:"",
                            status:"",
                          }];	
                          this.forme.problemStatus="";
                          this.forme.list.problem="";
                          this.forme.list.solution="";
                          this.forme.list.satus="";
                          this.forme.owner="";
      },
            //获取表格信息
  first(){
     var LList =[]; var pList =[];
         this.$http.post(api.apiUrl + '/byOwner/selectOwnerCase').then(function(data) {                  
             
                   this.tableData3 = data.data.result;
				 	for(var e = 0; e < data.data.result.length; e++) {
               if(data.data.result[e].status == 1) {
                  data.data.result[e].status = "Close";
                } else if(data.data.result[e].status == 2) {
                  data.data.result[e].status = "On-going";

                } else if(data.data.result[e].status == 3) {
                  data.data.result[e].status = "Monitor";

                } else if(data.data.result[e].status == 4) {
                  data.data.result[e].status = "Open";
                } else {
                  data.data.result[e].status = data.data.result[e].status;
                }
               
                 LList.push({text:data.data.result[e].series,value:data.data.result[e].series});
                pList.push({text:data.data.result[e].owner,value:data.data.result[e].owner});                    
                var list={};              
                 let anly=data.data.result[e].analyzeCategory;
                 let advice=data.data.result[e].advice;
                 let listState=data.data.result[e].problemStatus;
                this.tableData3[e].list=[];
               if(anly==""||anly==null){ 
               }else{
                for(var c=1;c<6;c++){
	                   	if(anly.indexOf("|")>1){
                         var problemhuo=""
                         var num=anly.indexOf("|");
                         var numr=advice.indexOf("|");
                         var numd=listState.indexOf("|");
                          this.tableData3[e].list.push({"problem":c+"."+anly.slice(0,num),"solution":advice.slice(0,numr),"status":listState.slice(0,numd)});
                          anly=anly.slice(num+1,anly.length);
                           advice=advice.slice(numr+1,advice.length);
                           listState=listState.slice(numd+1,listState.length);
                      }else{
                         
                          break;
                      }
                  }
               }
                 }
                //  console.log(LList)
                //  const LList =[];const pList =[];
                   for(let val of pList){ 
                          if(!this.ownerList.some(item=>item.text==val.text)){
                            if(val.text==""){

                            } else{
                               this.ownerList.push(val) 
                          }
                         
                          } 
                          } 
                          for(let val of LList){ 
                          if(!this.nameList.some(item=>item.text==val.text)){ 
                          this.nameList.push(val) 
                          } 
                          } 
				}, function(res) {
					alert('error');
				});
  },
  removeDomain(item) {
        var index = this.forme.list.length
        if (index !== 1) {
          this.forme.list.splice(index-1, 1)
        }
      },
      remoDomain(item){
        var index = this.form.list.length
        if (index !== 1) {
          this.form.list.splice(index-1, 1)
        }
     
      },
                 //当月的psi
 goePsi(indexs, row){
                      var pre = new Date();
				var year = pre.getFullYear();
				var month = pre.getMonth() + 1; //js从0开始取 
        var date = pre.getDate();
				if(month < 10) {
					month = "0" + month;
				}
				if(date < 10) {
					date = "0" + date;
				}
				var time = year + "-" + month + "-" + date;
				this.PsiOne = time;
				this.$http.post(api.apiUrl + '/byOwner/getPsiCase', {
					startTime: indexs.langTime,
					endTime: this.PsiOne,
					series:indexs.series,
				}).then(function(data) {
          indexs.todayPsi =Math.round(data.data.result.psi * 100) / 100;
					indexs.flagOne="s";
				}, function(res) {
					alert('error');
				});
                 },
       //上一月的psi
    MothPsi(indexs, row){
				//获取psi
				var pre = new Date();
				var year = pre.getFullYear();
				var month = pre.getMonth(); //js从0开始取 
        var date = pre.getDate();
				if(month==0){ year=year-1;  month=12;}
				if(month < 10) {month = "0" + month;} 
				if(date < 10) {date = "0" + date;}
				var time = year + "-" + month + "-" + date;
				this.PsiTwo = time;            
				this.$http.post(api.apiUrl + '/byOwner/getPsiCase', {
            startTime: indexs.langTime,
            endTime: this.PsiTwo,
            series: indexs.series,
				}).then(function(data) {
           indexs.monthPsi =Math.round(data.data.result.psi * 100) / 100;
              indexs.flagTwo = "h";
				}, function(res) {
					alert('error');
				});
                 },             
                 //新增表格
         newclm(){
           this.dialogForm = true;
         },
         newcon(){
                    var list=[];
                    var advice=[];
                    var listStatus=[];
             for(var i=0;i<this.forme.list.length;i++){
              list[i]=this.forme.list[i].problem+"|";    
              advice[i]=this.forme.list[i].solution+"|"; 
              listStatus[i]=this.forme.list[i].status+"|"; 
            }
              this.forme.analyzeCategory=list.join('');
              this.forme.advice=advice.join('');
              this.forme.problemStatus=listStatus.join('');
              this.$http.post(api.apiUrl + '/byOwner/insertOwnerCase', {                        
                  series: this.forme.series,
                  langTime: this.forme.langTime,
                  contractProduct: this.forme.contractProduct,
                  status:this.forme.status,
                  problemStatus:this.forme.problemStatus,
                  analyzeCategory: this.forme.analyzeCategory,
                  advice:this.forme.advice,
                  owner: this.forme.owner,
				     	}).then(function(data) {
                 if(data.data.status==0){
                     for(var e = 0; e < data.data.result.length; e++)
                     if(data.data.result[e].status == 1) {
                        data.data.result[e].status = Close;
                      } else if(data.data.result[e].status == 2) {
                      data.data.result[e].status = On - going;

                    } else if(data.data.result[e].status == 3) {
                      data.data.result[e].status = Monitor;

                    } else if(data.data.result[e].status == 4) {
                      data.data.result[e].status = Open;
                    } else {
                      data.data.result[e].status = data.data.result[e].status;
                    }
                    
                     let j = {
                          "series": this.forme.series,
                          "langTime": this.forme.langTime,
                          "flagOne": null,
                          "flagTwo": null,
                          "contractProduct": this.forme.contractProduct,
                          "status": this.forme.status,
                          "list":this.forme.list,	
                          "analyzeCategory": this.forme.list.problem,
                          "advice": this.forme.list.solution,
                          "problemStatus":this.forme.list.status,
                          "owner": this.forme.owner,	
                     }
                     
			          	this.tableData3.push(j);
              
                 this.resetFields();
                
			
            }else{
              this.$message.warning("保存失败");    
            }
						

					}, function(res) {
						alert('error');
					});
                },
   
             handleEdit(index, row) {
                  this.form.name=row.city;
                  this.form.series= row.series,
     	            this.form.langTime= row.langTime,
	                this.form.addport= row.addport,
                  this.form.user= row.user,
                  this.form.contractProduct= row.contractProduct,
                  this.form.status= row.status,
                  this.form.analyzeCategory= row.isSet,
                  this.form.advice= row.advice,
                  this.form.owner= row.owner,
                  this.form.list=row.list;


        this.dialogFormVisible = true;
        this.min=index;
      },
      //修改表格信息
      handleYe(index, row) {
         var list=[];
         var advice=[];
         var listStatus=[];
         for(var i=0;i<this.form.list.length;i++){
              list[i]=this.form.list[i].problem+"|";    
              advice[i]=this.form.list[i].solution+"|"; 
              listStatus[i]=this.form.list[i].status+"|"; 
          }
              this.form.analyzeCategory=list.join('');
              this.form.advice=advice.join('');
              this.form.problemStatus=listStatus.join('');
          this.$http.post(api.apiUrl + '/byOwner/updateOwnerCase', {
                id: this.tableData3[this.min].id,
                series: this.form.series,
                langTime: this.form.langTime,
                contractProduct: this.form.contractProduct,
                status:this.form.status,
                problemStatus:this.form.problemStatus,
                analyzeCategory: this.form.analyzeCategory,
                advice:this.form.advice,
                owner: this.form.owner,
					}).then(function(data) {
              if(data.data.status==0){
                     if(this.form.status == 1) {
                  this.form.status = "Close";
                } else if(this.form.status  == 2) {
                  this.form.status = "On-going";

                } else if(this.form.status  == 3) {
                  this.form.status = "Monitor";

                } else if(this.form.status  == 4) {
                  this.form.status = "Open";
                } else {
                  this.form.status = this.form.status;
                }
                    this.tableData3[this.min].series=this.form.series;
                    this.tableData3[this.min].langTime=this.form.langTime;
                    this.tableData3[this.min].addport=this.form.addport;
                    this.tableData3[this.min].contractProduct=this.form.contractProduct;
                    this.tableData3[this.min].status=this.form.status;
                    this.tableData3[this.min].analyzeCategory=this.form.analyzeCategory;
                    this.tableData3[this.min].advice=this.form.advice;
                    this.tableData3[this.min].owner=this.form.owner;
                    this.tableData3[this.min].list=this.form.list;
                    this.dialogFormVisible = false;
                }else{
                    this.$message.warning("修改失败");  
                }						
          }, function(res) {
                 alert('error');
          });       
                  },
       
			currentBel(val){
				this.master_user.data.map(i => {
					i.id = generateId.get(); //插入成功后有了id
					i.isSet = false; //给后台返回数据添加`isSet`标识
					return i;
				});
			},

		}
	};
</script>

 Add "scoped" attribute to limit CSS to this component only 
<style scoped>
@import"../css/table.css";
	h1,
	h2 {
		font-weight: normal;
    }
    .el-table .cell{
    white-space:pre-line;
}
    #yy{
        width:98%;
        margin:0 auto;
    }
</style>