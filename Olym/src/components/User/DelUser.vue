 <template>
	<div id="yy">
     <span style="width:15%">Screen loginName：</span><el-input  v-model="tableDataName"  style="margin-top:10px;margin-bottom:10px;width:80%" size="mini" placeholder="Input keyword search" @change="doFilter"/>
        <!-- <span style="width:15%">Screen loginName：</span><el-input v-model="search" style="margin-top:10px;margin-bottom:10px;width:80%" size="mini" placeholder="Input keyword search"/> -->
       <el-table  :data="tableData3.filter(data =>!search||data.loginName.toLowerCase().includes(search.toLowerCase()))" :row-class-name="tableRowClassName"   :cell-style="{padding:'0px',fontSize:'13px'}"  :header-cell-style="{background:'#000',color:'#fff',padding:'0px',fontSize:'16px'}" style="width: 100%;"  height="33rem"> 
          <el-table-column    type=index  label="#"  align="center" ></el-table-column>
          <el-table-column    prop="loginName" label="Name"  align="center"  width="110" style="text-align:left;"></el-table-column>
          <el-table-column    prop="password"     label="password"  align="center"    width="180"> </el-table-column>
          <el-table-column prop="email" align="center" label="email" width="200"></el-table-column>
          <el-table-column prop="createTime" align="center" label="createTime" width="120"></el-table-column>
          <el-table-column prop="managerCode"  label="managerCode" align="center" width="150"> </el-table-column>
          <el-table-column  prop="managerEmail"  align="center" label=" managerEmail"  min-width='200px'></el-table-column>
          <el-table-column prop="userRoleId" label="userRoleId" align="center" width="150" > </el-table-column>
          <el-table-column  prop="deleteFlag"  label="deleteFlag"  align="center"  width="150"> </el-table-column>
          <el-table-column label="Edit" align="center" width="170" >
            <template slot-scope="scope">
              <span v-if="scope.row.isset">
              <el-button  size="mini"  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button  size="mini"  type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button></span>  
              <span v-else> <el-button  size="mini"  @click="recoveDelete(scope.$index, scope.row)">Recovery</el-button></span>
            </template>
    </el-table-column>
   </el-table>
   <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[ 15, 20, 25]"
  :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"  :total="totalItems"> </el-pagination>
<!-- 修改 -->
      <el-dialog title="Change" :visible.sync="dialogFormVisible" >
        <el-form :model="form" class="onechang">
          <el-form-item label="Name" :label-width="formLabelWidth" style="width:94%;">
            <el-input v-model="form.loginName"></el-input></el-form-item>
          <el-form-item label="password" :label-width="formLabelWidth">
            <el-input v-model="form.password" ></el-input>
          </el-form-item>
          <el-form-item label="email" :label-width="formLabelWidth">
            <el-input v-model="form.email" ></el-input>
          </el-form-item>
          <el-form-item label="managerCode" :label-width="formLabelWidth">
            <el-input v-model="form.managerCode" ></el-input>
          </el-form-item>
          <el-form-item label="managerEmail" :label-width="formLabelWidth">
            <el-input v-model="form.managerEmail" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleYe()">Confirm</el-button>
        </div>
      </el-dialog>
	</div>

</template>

<script>
 
       import api from '../../api/indexapi';
    // import api,{ setCookie,getCookie} from '../api/indexapi';
	export default {
		data() {
			return {
               apiUrl:api.apiUrl,
                model:[],
                tableDataName: "",
                tableDataEnd: [],
                currentPage: 1,
                pageSize: 25,
                tableData3:[],
                totalItems: 0,
                filterTableDataEnd:[],
                flag:false,
                name: '',
                min:"",
                dialogFormVisible:false,
                formLabelWidth: '100px',
                LabelWidth:"50px",
                LabelWidth:"220px",
                userList: [],
                pickerOptions:{
                    disabledDate(time){  
                        return time.getTime() > Date.now()
                    }
                },
                form:{
                    loginName:"",
                    password:"",
                    email:"",
                    createTime:"",
                    userRoleId:"",
                    managerEmail:"",
                    managerCode:"",
                    deleteFlag:"",
                    isset:true,
                },
                search:""
            
            }
			
		},
		
		mounted() {
           this.first();
        },
       
		methods: {
      tableRowClassName({row, rowIndex}) {
        if (row.deleteFlag == "Deleted"&&row.deleteFlag == "0") {
          return 'warning-row';
        } 
        return '';
      },
			handleSelect(item) {
			},
            //获取表格信息
      first(){
        //  this.$http.post('http://10.111.107.245:8888/user/selectUserCase').then(function(data) {
          this.$http.post(this.apiUrl+'/user/selectUserCase').then(function(data) {
           this.userList=[];                  
                   this.userList = data.data.result;
                    this.userList.map(i => {   
                     i.createTime=i.createTime.slice(0,10);
                     (i.deleteFlag==0)?i.isset=true:i.isset=false;
                     (i.deleteFlag==0)?i.deleteFlag="Existence":i.deleteFlag="Deleted";
                      if(i.userRoleId==1){ i.userRoleId="Super Admin" }else if(i.userRoleId==2){ i.userRoleId="Administrators"}else{ i.userRoleId="User" }
                     return i;
            });

             this.totalItems = this.userList.length;
                    if (this.totalItems > this.pageSize) {
                      for (let index = 0; index < this.pageSize; index++) {
                      this.tableData3.push(this.userList[index]);
                      }
                    } else {
                      this.tableData3 = this.userList;
                    }   
				}, function(res) {
					alert('error');
				});
  },
            
       handleEdit(index, row) {
                  this.form.loginName=row.loginName;
                  this.form.password= row.password,
     	            this.form.email= row.email,
                  this.form.managerEmail= row.managerEmail,
                  this.form.managerCode= row.managerCode,
                  this.dialogFormVisible = true;
                  this.min=index;
      },
      recoveDelete(index, row){
         this.$confirm('This action will permanently restoring the file, Whether to continue?', 'Tips', {
          confirmButtonText: 'Sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
              this.$http.post(this.apiUrl+'/user/restoreUser', {
						loginName:row.loginName,
					}).then(function(data) {
              if(data.data.status==0){
                  this.$message({ type: 'success',   message: 'Recovery successful!' }); 
                    row.isset=true;
                    row.deleteFlag="Existence";
                }else{
                   this.$message({ type: 'info',   message: 'Recovery failed!' });
                   row.isset=false;
                }
                		

          }, function(res) {
                 alert('error');
          });  
          
          
        }).catch(() => {
          this.$message({ type: 'info', message: 'Canceled Recovery' });   
        }); 
          
                  },
      handleDelete(index, row){
         this.$confirm('This action will permanently delete the file, Whether to continue?', 'Tips', {
          confirmButtonText: 'Sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
            // this.$http.post('http://10.111.107.245:8888/user/delUserCase', {
              this.$http.post(this.apiUrl+'/user/delUserCase', {
						loginName:row.loginName,
					}).then(function(data) {
              if(data.data.status==0){
                  this.$message({ type: 'success',   message: 'Delete successful! Please check your mailbox!' });
                    row.isset=false;
                    row.deleteFlag="Deleted";
                }else{
                   this.$message({ type: 'info',   message: 'Delete successful! Canceled mail delivery!' });
                   row.isset=false;
                   row.deleteFlag="Deleted";
                }		

          }, function(res) {
                 alert('error');
          });  
          
          
        }).catch(() => {
          this.$message({ type: 'info', message: 'Canceled deletion' });   
        }); 
          
                  },
      //修改表格信息
      handleYe(index, row) {
            this.$http.post(this.apiUrl+'/user/updateProfile', {
						loginName: this.form.loginName,
						password: this.form.password,
						email: this.form.email,
						managerCode: this.form.managerCode,
						managerEmail: this.form.managerEmail,
					}).then(function(data) {
              if(data.data.status==0){
                    this.tableData3[this.min].loginName=this.form.loginName;
                    this.tableData3[this.min].password=this.form.password;
                    this.tableData3[this.min].email=this.form.email;
                    this.tableData3[this.min].managerCode=this.form.managerCode;
                    this.tableData3[this.min].managerEmail=this.form.managerEmail;
                    this.dialogFormVisible = false;
                }else{
                    this.$message.warning("The modification failed, please contact the administrator");  
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
      doFilter() {
  if (this.tableDataName == "") {
  this.$message.warning("查询条件不能为空！");
  return;
  }
  this.tableData3 = []
  //每次手动将数据置空,因为会出现多次点击搜索情况
  this.filterTableDataEnd=[]
  this.userList.forEach((value, index) => {
  if(value.loginName){
   if(value.loginName.indexOf(this.tableDataName)>=0){
   this.filterTableDataEnd.push(value)
   }
  }
  });
  //页面数据改变重新统计数据数量和当前页
  this.currentPage=1
  this.totalItems=this.filterTableDataEnd.length
  //渲染表格,根据值
  this.currentChangePage(this.filterTableDataEnd)
  //页面初始化数据需要判断是否检索过
  this.flag=true
 },
 openData() {},
 handleSizeChange(val) {
  console.log(`每页 ${val} 条`);
  this.pageSize = val;
  this.handleCurrentChange(this.currentPage);
 },
 handleCurrentChange(val) {
  console.log(`当前页: ${val}`);
  this.currentPage = val;
  //需要判断是否检索
  if(!this.flag){
  this.currentChangePage(this.userList)
  }else{
  this.currentChangePage(this.filterTableDataEnd)  
  }
 }, //组件自带监控当前页码
 currentChangePage(list) {
   console.log(list);
  let from = (this.currentPage - 1) * this.pageSize;
  let to = this.currentPage * this.pageSize;
  this.tableData3 = [];
  for (; from < to; from++) {
    console.log(list[from]);
  if (list[from]) {
   this.tableData3.push(list[from]);
  }
  }
 },

		}
	};
</script>
<style scoped>
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