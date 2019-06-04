<template>
	<div id="yy">
		<div class="center">
      <div class="onechang">	
				<h1 style="margin-bottom:20px;">Add</h1>
     <el-form :model="forme" ref="forme" class="formto">
    <el-form-item prop="loginName" label="loginName" :label-width="formLabelWidth" style="width:94%;" :rules="[
      { required: true, message: 'LoginName Can not be empty', trigger: 'blur' }, ]">
     <el-input v-model="forme.loginName" ></el-input>
    </el-form-item>
    <el-form-item  prop="password" label="password" :label-width="formLabelWidth" style="width:94%;" :rules="[
      { required: true, message: 'Password Can not be empty', trigger: 'blur' }, ]">
     <el-input v-model="forme.password" ></el-input>
    </el-form-item>
     <el-form-item prop="userRoleId" label="userRoleId" :label-width="formLabelWidth" :rules="[
      { required: true, message: 'UserRoleId Can not be empty', trigger: 'blur' }, ]" style="width:94%;">
      <el-select v-model="forme.userRoleId" placeholder="Please choose" style="width:100%;">
        <el-option label="Super Admin" value="1"></el-option>
        <el-option label="Administrators" value="2"></el-option>
				<el-option label="User" value="2"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item prop="deleteFlag" label="deleteFlag" :label-width="formLabelWidth" :rules="[
      { required: true, message: 'DeleteFlag Can not be empty', trigger: 'blur' },]" style="width:94%;">
      <el-select v-model="forme.deleteFlag" placeholder="Please choose" style="width:100%;">
        <el-option label="Existence" value="0"></el-option>
        <el-option label="Deleted" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="email" label="Email" :label-width="formLabelWidth" style="width:94%;" :rules="[
      { required: true, message: 'Please enter the Manager E-mail address', trigger: 'blur' },
      { type: 'email', message: 'Please enter the correct Manager E-mail address', trigger: ['blur', 'change'] }
    ]">
      <el-input v-model="forme.email" ></el-input>
    </el-form-item>
    <el-form-item prop="createTime" label="createTime" :label-width="formLabelWidth" style="width:94%;" :rules="[
      { required: true, message: 'CreateTime Can not be empty', trigger: 'blur' },]" >
      <el-input v-model="forme.createTime" ></el-input>
    </el-form-item>
    <el-form-item  prop="managerEmail" label="managerEmail" style="width:94%;" :label-width="formLabelWidth" :rules="[
      { required: true, message: 'Please enter the Manager E-mail address', trigger: 'blur' },
      { type: 'email', message: 'Please enter the correct Manager E-mail address', trigger: ['blur', 'change']}
    ]">
      <el-input v-model="forme.managerEmail" ></el-input>
    </el-form-item>
    <el-form-item prop="managerCode" label="managerCode" style="width:94%;" :label-width="formLabelWidth" :rules="[
      { required: true, message: 'ManagerCode Can not be empty', trigger: 'blur' },]">
      <el-input v-model="forme.managerCode" ></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
		 <el-button @click="resetForm('forme')">Reset</el-button>
    <el-button type="primary" @click="pwdChange()">Confirm</el-button>
  </div>
  
  </div>
	</div>
	</div>
</template>
<script>
	// import api from '../api/indexapi';
	//id生成工具 这个比用看 示例而已 模拟后台返回的id
	export default {
		data() {
			return {
           dialogForm:true,
          forme:{
            loginName:"",
            password:"",
            email:"",
            createTime:"",
            userRoleId:"",
            managerEmail:"",
            managerCode:"",
            deleteFlag:"",

          },
        formLabelWidth: '100px',
        LabelWidth:"50px",
        LabelWidth:"220px",
			}
		},
		mounted() {
			// this.readMasterUser();
		},
		methods: {
			 resetForm(formName) {
        this.$refs[formName].resetFields();
      },
			//添加账号,
			pwdChange() {
				let vm = this;
					//新增信息
					vm.$http.post('http://10.111.107.245:8888/user/insertUserCase', {
						loginName: vm.forme.loginName,
						password: vm.forme.password,
						email: vm.forme.email,
						createTime: vm.forme.createTime,
						managerCode: vm.forme.managerCode,
						managerEmail: vm.forme.managerEmail,
						owuserRoleIdner: vm.forme.userRoleId,
					}).then(function(data) {
						
						 this.$confirm('Whether to send mail, whether to continue?', 'Tips', {
							confirmButtonText: 'Sure',
							cancelButtonText: 'Cancel',
							type: 'warning'
						}).then(() => {
								this.$http.post('http://10.111.107.245:8888/user/sendEmailUserPassword', {
								itcode:vm.forme.loginName,
								email:vm.forme.email,
								password :vm.forme.password,
							}).then(function(data) {
									if(data.data.status==0){
											this.$message({ type: 'success',   message: 'Send successfully!' });
										}else{
											this.$message({ type: 'info',   message: 'Send failure please contact administrator!' });
										}						
							}, function(res) {
										alert('error');
							});  
          
        }).catch(() => {
          this.$message({ type: 'info', message: 'Delivery cancelled' });   
        }); 
						console.log(data);
					}, function(res) {
						alert('error');
					});
			}
		}
	};
</script>
<style scoped>
	.el-table-add-row {
		margin-top: 10px;
		width: 100%;
		height: 34px;
		/* border: 1px dashed #c1c1cd; */
		border-radius: 3px;
		cursor: pointer;
		justify-content: center;
		display: flex;
		line-height: 34px;
	}
	.el-table{
		width:100%;
		height:auto;
		
	}
	.center{
	   width: 93%;
	 	margin: 0 auto;
	}
  .onechang{
    width:70%;
    height:600px;
    margin:0 auto;
    /* border:1px solid #eee; */
    margin-top:30px;
  }
 .formto{
     width:90%;
      height:500px;
      margin:0 auto;
  }
</style>