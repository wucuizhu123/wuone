
<template>
	<div id="yy">
				<div class="el-table-add-row" style="width: 99.2%; margin-bottom:10px;" @click="addMasterUser()"><span>+ 添加</span></div>
            <el-form :rules="model.rules" :model="model"  ref="form">
                <el-table   :data="model.tableData" style="width: 100%;"  :cell-style="{padding:'0px',fontSize:'13px'}" :header-cell-style="{background:'#000',color:'#fff',padding:'0px',fontSize:'16px'}"  height="39rem">
                 <el-table-column    type=index  label="#"  align="center" ></el-table-column>
                <el-table-column   label="LoginName"  align="center">
                    <template slot-scope="scope">
                      <span v-if="scope.row.isSet">
                            <el-form-item :prop="'tableData.' + scope.$index + '.loginName'" :rules='model.rules.loginName'>
                                <el-input  style="width: 95%;margin-top:8px;" v-model="scope.row.loginName" ></el-input>
                            </el-form-item>
                          </span>
                          <span v-else>{{scope.row.loginName}}</span>
                    </template>
                </el-table-column>
                <el-table-column  align="center"
                    label="Password">
                        <template slot-scope="scope">
                           <span v-if="scope.row.isSet">
                                <el-form-item :prop="'tableData.' + scope.$index + '.password'" :rules='model.rules.password'>
                                   <el-input style="width: 95%;margin-top:8px;"  v-model="scope.row.password" ></el-input>
                                </el-form-item>
                                </span>
                          <span v-else>{{scope.row.password}}</span>
                        </template>
                    </el-table-column>
                <el-table-column   align="center"         
                    label="Email">             
                        <template slot-scope="scope">
                          <span v-if="scope.row.isSet">
                                <el-form-item :prop="'tableData.' + scope.$index + '.email'" :rules='model.rules.email'>
                                    <el-input style="width: 95%;margin-top:8px;" v-model="scope.row.email" ></el-input>
                                </el-form-item>
                                </span>
                          <span v-else>{{scope.row.email}}</span>
                        </template>
                </el-table-column>
                <el-table-column
                align="center"
                    label="ManagerCode">
                        <template slot-scope="scope">
                          <span v-if="scope.row.isSet">
                                <el-form-item :prop="'tableData.' + scope.$index + '.managerCode'" :rules='model.rules.managerCode'>
                                    <el-input style="width: 95%;margin-top:8px;" v-model="scope.row.managerCode" ></el-input>
                                </el-form-item>
                                </span>
                          <span v-else>{{scope.row.managerCode}}</span>
                        </template>
                </el-table-column>
                <el-table-column
                     align="center"
                    label="ManagerEmail">
                        <template slot-scope="scope">
                          <span v-if="scope.row.isSet">
                                <el-form-item :prop="'tableData.' + scope.$index + '.managerEmail'" :rules='model.rules.managerEmail'>
                                    <el-input style="width: 95%;margin-top:8px;" v-model="scope.row.managerEmail" ></el-input>
                                </el-form-item>
                                </span>
                          <span v-else>{{scope.row.managerEmail}}</span>
                        </template>
                </el-table-column>
               <el-table-column >
                    <template slot-scope="scope">
                      <span v-if="scope.row.isSet" >
							<span class="el-tag el-tag--info el-tag--mini"  style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">                                                                                  保存
                            </span>				
							<span  class="el-tag  el-tag--mini" style="cursor: pointer;" @click="poverChange(scope.row,scope.$index,false)">                                                                      取消
                            </span>
                            </span>
                            <span v-else>The saved</span>
						</template>
            <!-- @click="resetForm('ruleForm')" -->
                </el-table-column>
            </el-table>
            </el-form>
  
	</div>

</template>

<script>
    // import api,{ setCookie,getCookie} from '../api/indexapi';
   
		import api from '../../api/indexapi';
	export default {
		data() {
			return {
        apiUrl:api.apiUrl,
         form:{
                supplier2:"",
                type:"",
                desc:"",
                input:""
            },
            model:{
                rules:{
                    loginName:{ type:"string",required:true,message:"Can not be empty",trigger:"blur"},
                    email: { type: 'email', message: 'Enter the correct address', trigger:'change' },
                    password:{ type:"string",required:true,message:"Can not be empty",trigger:"blur"},
                    managerCode:{ type:"string",required:true,message:"Can not be empty",trigger:"blur"},
                    managerEmail: { type: 'email', message: 'Enter the correct address', trigger:  'change' }
   
                },
                tableData:[]
            }
            
            }
			
		},
		
		mounted() {
          //  this.first();
        },
       
		methods: {
        poverChange (row, index, cg) {
          console.log(this.model.tableData.length-1);
          this.model.tableData.splice(this.model.tableData.length-1,1);
        },
      addMasterUser() {
        // for(let i of this.master_user.data) {
				// 	if(i.isSet) return this.$message.warning("请先保存当前编辑项");
				// }
        console.log("jjjj");

				let j = {
					         "loginName":"",
                    "password":"",
                    "email":"",
                    "managerEmail":"",
                    "managerCode":"",
                    "isSet": true,

				};

				this.model.tableData.push(j);
				// this.tableData = JSON.parse(JSON.stringify(j));

      },
      	pwdChange(row, index, cg) {
        if(row.loginName=="" && row.password =="" && row.createTime==""&& row.email==""){
           this.$message({ type: 'info', message: 'Please fill in the information' });
        }else{
          			//新增信息
				let vm = this;
					//新增信息
					// vm.$http.post('http://10.111.107.245:8888/user/insertUserCase', {
            vm.$http.post(this.apiUrl+'/user/insertUserCase', {
						loginName: row.loginName,
						password: row.password,
						email: row.email,
						managerCode: row.managerCode,
						managerEmail: row.managerEmail,
					}).then(function(data) {
				const confirmText = ['This content will be sent to the mailbox?',  ' LoginName : '+ row.loginName+" ; " +"  password : "+row.password,"whether to continue?"] 
        const newDatas = []
        const h = this.$createElement
        for (const i in confirmText) {
          newDatas.push(h('p', null, confirmText[i]))
        }
        this.$confirm(
          'Tips',
          {
            title: 'Tips',
            message: h('div', null, newDatas),
            showCancelButton: true,
            confirmButtonText: 'Sure',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
								// this.$http.post('http://10.111.107.245:8888/user/sendEmailUserPassword', {
                  this.$http.post(this.apiUrl +'/user/sendEmailUserPassword', {    
								itcode:row.loginName,
								email:row.email,
								password :row.password,
							}).then(function(data) {
									if(data.data.status==0){
											this.$message({ type: 'success',   message: 'Send successfully!' });
										}else{
											this.$message({ type: 'info',   message: 'Send failure please contact administrator!' });
										}						
							}, function(res) {
										alert('error');
							})           
        }).catch(() => {
          this.$message({ type: 'info', message: 'Delivery cancelled' });   
        }); 
            console.log(data);
            console.log(row.isSet);
            row.isSet=false;
					}, function(res) {
						alert('error');
					});

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
    .el-table-add-row {
		margin-top: 10px;
		width: 100%;
		height: 34px;
		border: 1px dashed #c1c1cd;
		border-radius: 3px;
		cursor: pointer;
		justify-content: center;
		display: flex;
		line-height: 34px;
	}
	.el-table{
		width:100%;
		height:auto;
    border:0px;
		
	}
	.center{
	   width: 93%;
		margin: 0 auto;
	}

    #yy{
        width:98%;
        margin:0 auto;
    }
</style>